import { db } from './db';
import { users, admins } from '@shared/schema';
import { adminAuthService } from './services/admin-auth-service';
import { eq } from 'drizzle-orm';

/**
 * Initialize the first super admin user
 * This script should only be run once to set up initial admin access
 */
async function initializeDefaultAdmin() {
  try {
    console.log('🔐 Initializing default admin user...');

    // Check if admin already exists
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.username, 'admin'))
      .limit(1);

    if (existingAdmin.length > 0) {
      console.log('✅ Default admin user already exists');
      return;
    }

    // Create the user first without logging
    const hashedPassword = await adminAuthService.hashPassword('SecureAdmin123!');
    
    const [user] = await db
      .insert(users)
      .values({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@yourdomain.com',
        firstName: 'Super',
        lastName: 'Admin',
        verified: true,
        status: 'active'
      })
      .returning();

    const [admin] = await db
      .insert(admins)
      .values({
        userId: user.id,
        role: 'super_admin',
        permissions: [
          'manage_users',
          'view_users',
          'manage_admins',
          'view_security_events',
          'view_activity_logs',
          'manage_content',
          'manage_system_settings',
          'view_analytics'
        ]
      })
      .returning();

    console.log('✅ Default admin user created successfully');
    console.log('📝 Username: admin');
    console.log('🔑 Password: SecureAdmin123!');
    console.log('⚠️  IMPORTANT: Change this password immediately after first login');
    console.log(`👤 Admin ID: ${admin.id}`);
    console.log(`🆔 User ID: ${user.id}`);

    // Log the initialization
    await adminAuthService.logActivity({
      adminId: admin.id,
      action: 'create',
      entity: 'system_init',
      details: {
        message: 'Default admin user initialized',
        initialSetup: true
      } as any,
      ipAddress: '127.0.0.1',
      userAgent: 'system-init'
    });

    console.log('🎉 Admin portal is ready!');
    console.log('🌐 Access at: /admin/login');

  } catch (error) {
    console.error('❌ Failed to initialize admin user:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDefaultAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Initialization failed:', error);
      process.exit(1);
    });
}

export { initializeDefaultAdmin };