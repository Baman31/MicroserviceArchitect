import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { eq, and, gt, lt, desc, count } from 'drizzle-orm';
import { db } from '../db';
import {
  users,
  admins,
  loginAttempts,
  adminSessions,
  securityEvents,
  activityLogs,
  type User,
  type Admin,
  type InsertUser,
  type InsertAdmin,
  type InsertLoginAttempt,
  type InsertAdminSession,
  type InsertSecurityEvent,
  type InsertActivityLog,
  type LoginAttempt,
  type SecurityEvent,
} from '@shared/schema';

export class AdminAuthService {
  private static readonly SALT_ROUNDS = 12;
  private static readonly MAX_LOGIN_ATTEMPTS = 5;
  private static readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  private static readonly SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours
  private static readonly SESSION_CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

  constructor() {
    // Clean up expired sessions periodically
    setInterval(() => {
      this.cleanupExpiredSessions();
    }, AdminAuthService.SESSION_CLEANUP_INTERVAL);
  }

  /**
   * Hash password with bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, AdminAuthService.SALT_ROUNDS);
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Check if IP/username is currently locked out due to failed attempts
   */
  async isLockedOut(username: string, ipAddress: string): Promise<boolean> {
    const cutoffTime = new Date(Date.now() - AdminAuthService.LOCKOUT_DURATION);
    
    const recentFailures = await db
      .select({ count: count() })
      .from(loginAttempts)
      .where(
        and(
          eq(loginAttempts.username, username),
          eq(loginAttempts.ipAddress, ipAddress),
          eq(loginAttempts.success, false),
          gt(loginAttempts.createdAt, cutoffTime)
        )
      );

    return recentFailures[0]?.count >= AdminAuthService.MAX_LOGIN_ATTEMPTS;
  }

  /**
   * Log login attempt
   */
  async logLoginAttempt(attemptData: InsertLoginAttempt): Promise<void> {
    await db.insert(loginAttempts).values(attemptData);
  }

  /**
   * Create security event
   */
  async createSecurityEvent(eventData: InsertSecurityEvent): Promise<void> {
    await db.insert(securityEvents).values(eventData);
  }

  /**
   * Log admin activity
   */
  async logActivity(activityData: InsertActivityLog): Promise<void> {
    await db.insert(activityLogs).values(activityData);
  }

  /**
   * Create admin user (only for super admins)
   */
  async createAdmin(
    userData: Omit<InsertUser, 'id'>,
    adminData: Omit<InsertAdmin, 'id' | 'userId'>,
    creatorAdminId: string
  ): Promise<{ user: User; admin: Admin }> {
    const hashedPassword = await this.hashPassword(userData.password);
    
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        password: hashedPassword,
        verified: true,
        status: 'active'
      })
      .returning();

    const [admin] = await db
      .insert(admins)
      .values({
        ...adminData,
        userId: user.id
      })
      .returning();

    // Log the admin creation
    await this.logActivity({
      adminId: creatorAdminId,
      action: 'create',
      entity: 'admins',
      entityId: admin.id,
      details: { 
        role: adminData.role, 
        permissions: adminData.permissions,
        createdUser: user.id
      }
    });

    return { user, admin };
  }

  /**
   * Authenticate admin login
   */
  async authenticateAdmin(
    username: string,
    password: string,
    ipAddress: string,
    userAgent?: string
  ): Promise<{ success: boolean; sessionToken?: string; admin?: Admin & { user: User }; error?: string }> {
    
    // Check if locked out
    const isLockedOut = await this.isLockedOut(username, ipAddress);
    if (isLockedOut) {
      await this.logLoginAttempt({
        username,
        ipAddress,
        success: false,
        failureReason: 'account_locked',
        userAgent
      });

      await this.createSecurityEvent({
        eventType: 'brute_force_attempt',
        severity: 'high',
        details: { username, attemptCount: AdminAuthService.MAX_LOGIN_ATTEMPTS },
        ipAddress,
        userAgent
      });

      return { success: false, error: 'Account temporarily locked due to multiple failed attempts' };
    }

    // Find user and admin
    const [result] = await db
      .select({
        user: users,
        admin: admins
      })
      .from(users)
      .innerJoin(admins, eq(admins.userId, users.id))
      .where(eq(users.username, username));

    if (!result) {
      await this.logLoginAttempt({
        username,
        ipAddress,
        success: false,
        failureReason: 'invalid_credentials',
        userAgent
      });
      return { success: false, error: 'Invalid credentials' };
    }

    const { user, admin } = result;

    // Check if admin account is active
    if (admin.status !== 'active') {
      await this.logLoginAttempt({
        username,
        ipAddress,
        success: false,
        failureReason: 'account_suspended',
        userAgent
      });
      return { success: false, error: 'Account is suspended' };
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) {
      await this.logLoginAttempt({
        username,
        ipAddress,
        success: false,
        failureReason: 'invalid_credentials',
        userAgent
      });
      return { success: false, error: 'Invalid credentials' };
    }

    // Create session
    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + AdminAuthService.SESSION_DURATION);

    await db.insert(adminSessions).values({
      adminId: admin.id,
      sessionToken,
      ipAddress,
      userAgent,
      expiresAt
    });

    // Log successful login
    await this.logLoginAttempt({
      username,
      ipAddress,
      success: true,
      userAgent
    });

    await this.logActivity({
      adminId: admin.id,
      action: 'login',
      entity: 'admin_sessions',
      details: { sessionToken: sessionToken.slice(0, 8) + '...' },
      ipAddress,
      userAgent
    });

    // Update last login time
    await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id));

    return { 
      success: true, 
      sessionToken, 
      admin: { ...admin, user } 
    };
  }

  /**
   * Validate admin session
   */
  async validateSession(sessionToken: string): Promise<{ valid: boolean; admin?: Admin & { user: User } }> {
    const [result] = await db
      .select({
        session: adminSessions,
        admin: admins,
        user: users
      })
      .from(adminSessions)
      .innerJoin(admins, eq(admins.id, adminSessions.adminId))
      .innerJoin(users, eq(users.id, admins.userId))
      .where(
        and(
          eq(adminSessions.sessionToken, sessionToken),
          eq(adminSessions.active, true),
          gt(adminSessions.expiresAt, new Date())
        )
      );

    if (!result) {
      return { valid: false };
    }

    const { session, admin, user } = result;

    // Update last activity
    await db
      .update(adminSessions)
      .set({ lastActivityAt: new Date() })
      .where(eq(adminSessions.id, session.id));

    return { 
      valid: true, 
      admin: { ...admin, user } 
    };
  }

  /**
   * Logout admin
   */
  async logout(sessionToken: string, ipAddress: string, userAgent?: string): Promise<void> {
    const session = await db
      .select({ adminId: adminSessions.adminId })
      .from(adminSessions)
      .where(eq(adminSessions.sessionToken, sessionToken))
      .limit(1);

    if (session[0]) {
      await this.logActivity({
        adminId: session[0].adminId,
        action: 'logout',
        entity: 'admin_sessions',
        details: { sessionToken: sessionToken.slice(0, 8) + '...' },
        ipAddress,
        userAgent
      });
    }

    await db
      .update(adminSessions)
      .set({ active: false })
      .where(eq(adminSessions.sessionToken, sessionToken));
  }

  /**
   * Clean up expired sessions
   */
  async cleanupExpiredSessions(): Promise<void> {
    await db
      .update(adminSessions)
      .set({ active: false })
      .where(
        and(
          eq(adminSessions.active, true),
          lt(adminSessions.expiresAt, new Date())
        )
      );
  }

  /**
   * Get recent security events
   */
  async getRecentSecurityEvents(limit = 50): Promise<SecurityEvent[]> {
    return db
      .select()
      .from(securityEvents)
      .orderBy(desc(securityEvents.createdAt))
      .limit(limit);
  }

  /**
   * Get admin activity logs
   */
  async getAdminActivityLogs(adminId?: string, limit = 100): Promise<any[]> {
    const query = db
      .select({
        log: activityLogs,
        admin: admins,
        user: users
      })
      .from(activityLogs)
      .leftJoin(admins, eq(admins.id, activityLogs.adminId))
      .leftJoin(users, eq(users.id, admins.userId))
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit);

    if (adminId) {
      return query.where(eq(activityLogs.adminId, adminId));
    }

    return query;
  }

  /**
   * Check admin permissions
   */
  hasPermission(admin: Admin, permission: string): boolean {
    return admin.permissions.includes(permission) || admin.role === 'super_admin';
  }

  /**
   * Get login attempts for monitoring
   */
  async getLoginAttempts(hours = 24): Promise<LoginAttempt[]> {
    const cutoffTime = new Date(Date.now() - (hours * 60 * 60 * 1000));
    
    return db
      .select()
      .from(loginAttempts)
      .where(gt(loginAttempts.createdAt, cutoffTime))
      .orderBy(desc(loginAttempts.createdAt));
  }
}

export const adminAuthService = new AdminAuthService();