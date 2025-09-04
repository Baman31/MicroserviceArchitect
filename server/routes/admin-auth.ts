import { Router } from 'express';
import { adminAuthService } from '../services/admin-auth-service';
import {
  loginRateLimit,
  adminRateLimit,
  adminCors,
  validateAndSanitize,
  validationRules,
  requireAdminAuth,
  requirePermission,
  requireRole,
  logSecurityEvent
} from '../middleware/security';

const router = Router();

// Apply admin-specific middleware to all routes
router.use(adminCors);
router.use(adminRateLimit);

/**
 * Admin Login - Hidden behind non-obvious URL
 */
router.post('/authenticate', 
  loginRateLimit,
  validateAndSanitize(validationRules.adminLogin),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const ipAddress = req.ip || 'unknown';
      const userAgent = req.get('User-Agent') || 'unknown';

      const result = await adminAuthService.authenticateAdmin(
        username,
        password,
        ipAddress,
        userAgent
      );

      if (result.success) {
        // Set secure HTTP-only cookie
        res.cookie('admin_session', result.sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 8 * 60 * 60 * 1000 // 8 hours
        });

        res.json({
          success: true,
          admin: {
            id: result.admin!.id,
            role: result.admin!.role,
            permissions: result.admin!.permissions,
            username: result.admin!.user.username,
            firstName: result.admin!.user.firstName,
            lastName: result.admin!.user.lastName
          }
        });
      } else {
        res.status(401).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Log security event for login errors
      await adminAuthService.createSecurityEvent({
        eventType: 'login_error',
        severity: 'medium',
        details: { 
          error: error instanceof Error ? error.message : 'Unknown error',
          username: req.body.username
        },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      res.status(500).json({
        success: false,
        error: 'Authentication service error'
      });
    }
  }
);

/**
 * Admin Logout
 */
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const sessionToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    
    if (sessionToken) {
      await adminAuthService.logout(
        sessionToken,
        req.ip || 'unknown',
        req.get('User-Agent') || 'unknown'
      );
    }

    // Clear cookie
    res.clearCookie('admin_session');
    
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Logout service error'
    });
  }
});

/**
 * Validate current session
 */
router.get('/session', requireAdminAuth, (req, res) => {
  const admin = (req as any).admin;
  
  res.json({
    valid: true,
    admin: {
      id: admin.id,
      role: admin.role,
      permissions: admin.permissions,
      username: admin.user.username,
      firstName: admin.user.firstName,
      lastName: admin.user.lastName
    }
  });
});

/**
 * Create new admin (Super Admin only)
 */
router.post('/admin', 
  requireAdminAuth,
  requireRole(['super_admin']),
  validateAndSanitize(validationRules.adminCreation),
  logSecurityEvent('admin_creation', 'high'),
  async (req, res) => {
    try {
      const { username, password, email, firstName, lastName, role, permissions } = req.body;
      const creatorAdmin = (req as any).admin;

      const { user, admin } = await adminAuthService.createAdmin(
        {
          username,
          password,
          email,
          firstName,
          lastName
        },
        {
          role,
          permissions
        },
        creatorAdmin.id
      );

      res.status(201).json({
        success: true,
        admin: {
          id: admin.id,
          role: admin.role,
          permissions: admin.permissions,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        }
      });
    } catch (error) {
      console.error('Admin creation error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create admin'
      });
    }
  }
);

/**
 * Get security events (Admin+ only)
 */
router.get('/security-events',
  requireAdminAuth,
  requirePermission('view_security_events'),
  async (req, res) => {
    try {
      const { limit = 50 } = req.query;
      const events = await adminAuthService.getRecentSecurityEvents(Number(limit));
      
      res.json({
        success: true,
        events
      });
    } catch (error) {
      console.error('Error fetching security events:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch security events'
      });
    }
  }
);

/**
 * Get activity logs (Admin+ only)
 */
router.get('/activity-logs',
  requireAdminAuth,
  requirePermission('view_activity_logs'),
  async (req, res) => {
    try {
      const { adminId, limit = 100 } = req.query;
      const logs = await adminAuthService.getAdminActivityLogs(
        adminId as string,
        Number(limit)
      );
      
      res.json({
        success: true,
        logs
      });
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch activity logs'
      });
    }
  }
);

/**
 * Get login attempts (Admin+ only)
 */
router.get('/login-attempts',
  requireAdminAuth,
  requirePermission('view_security_events'),
  async (req, res) => {
    try {
      const { hours = 24 } = req.query;
      const attempts = await adminAuthService.getLoginAttempts(Number(hours));
      
      res.json({
        success: true,
        attempts
      });
    } catch (error) {
      console.error('Error fetching login attempts:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch login attempts'
      });
    }
  }
);

/**
 * Admin health check
 */
router.get('/health', requireAdminAuth, (req, res) => {
  const admin = (req as any).admin;
  
  res.json({
    success: true,
    status: 'healthy',
    admin: admin.user.username,
    role: admin.role,
    timestamp: new Date().toISOString()
  });
});

export { router as adminAuthRouter };