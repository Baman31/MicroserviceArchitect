import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { adminAuthService } from '../services/admin-auth-service';

/**
 * Security headers middleware using Helmet
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "wss:", "ws:"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  } : false, // Disable CSP in development
  hsts: process.env.NODE_ENV === 'production' ? {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  } : false, // Disable HSTS in development
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});

/**
 * General rate limiting for all endpoints
 */
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Trust proxy but validate it
  validate: {
    trustProxy: false, // Disable automatic trust proxy validation
  },
  // Skip rate limiting for static files
  skip: (req) => {
    const staticFileRegex = /\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/i;
    return staticFileRegex.test(req.path);
  }
});

/**
 * Strict rate limiting for admin login attempts
 */
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login attempts per windowMs
  message: {
    error: 'Too many login attempts from this IP, please try again later',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: {
    trustProxy: false,
  },
  skipSuccessfulRequests: true // Don't count successful requests
});

/**
 * Very strict rate limiting for admin routes
 */
export const adminRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 admin requests per 5 minutes
  message: {
    error: 'Too many admin requests from this IP, please try again later',
    retryAfter: '5 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: {
    trustProxy: false,
  }
});

/**
 * CORS middleware for admin routes - very restrictive
 */
export const adminCors = (req: Request, res: Response, next: NextFunction) => {
  // Only allow same origin for admin routes
  const origin = req.get('Origin');
  const host = req.get('Host');
  
  if (origin && !origin.includes(host || '')) {
    return res.status(403).json({ 
      error: 'Cross-origin requests not allowed for admin endpoints' 
    });
  }

  // Set restrictive CORS headers
  res.setHeader('Access-Control-Allow-Origin', req.get('Origin') || 'null');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
};

/**
 * Input validation and sanitization middleware
 */
export const validateAndSanitize = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run validations
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    next();
  };
};

/**
 * Common validation rules
 */
export const validationRules = {
  adminLogin: [
    body('username')
      .trim()
      .isLength({ min: 3, max: 50 })
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('Username must be 3-50 characters, alphanumeric with _ or -'),
    body('password')
      .isLength({ min: 8, max: 128 })
      .withMessage('Password must be 8-128 characters')
  ],
  adminCreation: [
    body('username')
      .trim()
      .isLength({ min: 3, max: 50 })
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('Username must be 3-50 characters, alphanumeric with _ or -'),
    body('password')
      .isLength({ min: 12, max: 128 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must be 12+ characters with uppercase, lowercase, number, and special character'),
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Must be a valid email'),
    body('role')
      .isIn(['admin', 'moderator', 'content_manager'])
      .withMessage('Role must be admin, moderator, or content_manager'),
    body('permissions')
      .isArray({ min: 1 })
      .withMessage('Permissions must be a non-empty array')
  ]
};

/**
 * Session-based admin authentication middleware
 */
export const requireAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Admin authentication required',
        code: 'NO_TOKEN'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Invalid authentication token',
        code: 'INVALID_TOKEN'
      });
    }

    const { valid, admin } = await adminAuthService.validateSession(token);
    
    if (!valid || !admin) {
      return res.status(401).json({ 
        error: 'Invalid or expired session',
        code: 'EXPIRED_SESSION'
      });
    }

    // Add admin info to request
    (req as any).admin = admin;
    
    // Log admin activity
    await adminAuthService.logActivity({
      adminId: admin.id,
      action: 'api_access',
      entity: req.route?.path || req.path,
      details: { 
        method: req.method,
        endpoint: req.path,
        params: req.params,
        query: req.query
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    
    // Log security event
    await adminAuthService.createSecurityEvent({
      eventType: 'authentication_error',
      severity: 'medium',
      details: { 
        error: error instanceof Error ? error.message : 'Unknown error',
        path: req.path,
        method: req.method
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(500).json({ 
      error: 'Authentication service error',
      code: 'AUTH_SERVICE_ERROR'
    });
  }
};

/**
 * Permission-based authorization middleware
 */
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const admin = (req as any).admin;
    
    if (!admin) {
      return res.status(401).json({ 
        error: 'Authentication required',
        code: 'NO_ADMIN'
      });
    }

    if (!adminAuthService.hasPermission(admin, permission)) {
      // Log unauthorized access attempt
      adminAuthService.logActivity({
        adminId: admin.id,
        action: 'unauthorized_access',
        entity: req.path,
        details: { 
          requiredPermission: permission,
          userPermissions: admin.permissions,
          userRole: admin.role
        },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      return res.status(403).json({ 
        error: 'Insufficient permissions',
        code: 'INSUFFICIENT_PERMISSIONS',
        required: permission
      });
    }

    next();
  };
};

/**
 * Role-based authorization middleware
 */
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const admin = (req as any).admin;
    
    if (!admin) {
      return res.status(401).json({ 
        error: 'Authentication required',
        code: 'NO_ADMIN'
      });
    }

    if (!roles.includes(admin.role)) {
      // Log unauthorized access attempt
      adminAuthService.logActivity({
        adminId: admin.id,
        action: 'unauthorized_access',
        entity: req.path,
        details: { 
          requiredRoles: roles,
          userRole: admin.role
        },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      return res.status(403).json({ 
        error: 'Insufficient role privileges',
        code: 'INSUFFICIENT_ROLE',
        required: roles,
        current: admin.role
      });
    }

    next();
  };
};

/**
 * IP Whitelist middleware for super sensitive operations
 */
export const ipWhitelist = (allowedIPs: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIP = req.ip;
    
    if (!allowedIPs.includes(clientIP)) {
      // Log security event
      adminAuthService.createSecurityEvent({
        eventType: 'ip_not_whitelisted',
        severity: 'high',
        details: { 
          clientIP,
          allowedIPs,
          path: req.path
        },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      return res.status(403).json({ 
        error: 'Access denied: IP not whitelisted',
        code: 'IP_NOT_ALLOWED'
      });
    }

    next();
  };
};

/**
 * Log security events middleware
 */
export const logSecurityEvent = (eventType: string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const admin = (req as any).admin;
    
    await adminAuthService.createSecurityEvent({
      adminId: admin?.id,
      eventType,
      severity,
      details: {
        method: req.method,
        path: req.path,
        params: req.params,
        query: req.query,
        body: req.body
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    next();
  };
};

export default {
  securityHeaders,
  generalRateLimit,
  loginRateLimit,
  adminRateLimit,
  adminCors,
  validateAndSanitize,
  validationRules,
  requireAdminAuth,
  requirePermission,
  requireRole,
  ipWhitelist,
  logSecurityEvent
};