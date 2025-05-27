
/**
 * Admin Authentication Helper
 * 
 * This file provides functions for admin authentication including super admin functionality.
 * In a real application, these would interact with a secure backend.
 */

// Default admin credentials for demo purposes only
// In a production environment, never hardcode credentials
const DEFAULT_ADMIN = {
  email: 'admin@wasfahai.com',
  password: 'admin123',
  role: 'admin'
};

const DEFAULT_SUPER_ADMIN = {
  email: 'superadmin@wasfahai.com',
  password: 'superadmin123',
  role: 'superadmin'
};

/**
 * Initialize admin accounts for demo purposes
 * This would not exist in a real application
 */
export function initializeAdminDemo() {
  // Check if this is a first run
  const adminInitialized = localStorage.getItem('adminInitialized');
  
  if (!adminInitialized) {
    // Store a flag indicating we've set up the demo admin
    localStorage.setItem('adminInitialized', 'true');
    console.log('Admin demo initialized with default credentials');
    console.log('Regular Admin - Email:', DEFAULT_ADMIN.email, 'Password:', DEFAULT_ADMIN.password);
    console.log('Super Admin - Email:', DEFAULT_SUPER_ADMIN.email, 'Password:', DEFAULT_SUPER_ADMIN.password);
  }
}

/**
 * Verify admin login credentials
 * In a real application, this would make a secure API call
 */
export function verifyAdminCredentials(email: string, password: string): { success: boolean; role?: string } {
  // This is only for demonstration purposes
  // In a real application, NEVER check credentials client-side
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return { success: true, role: 'admin' };
  }
  if (email === DEFAULT_SUPER_ADMIN.email && password === DEFAULT_SUPER_ADMIN.password) {
    return { success: true, role: 'superadmin' };
  }
  return { success: false };
}

/**
 * Check if a user is authenticated as an admin
 * In a real application, this would validate a token with the backend
 */
export function isAdminAuthenticated(): boolean {
  return localStorage.getItem('adminAuth') === 'true';
}

/**
 * Check if a user is authenticated as a super admin
 */
export function isSuperAdminAuthenticated(): boolean {
  return localStorage.getItem('adminRole') === 'superadmin';
}

/**
 * Get current admin role
 */
export function getAdminRole(): string | null {
  return localStorage.getItem('adminRole');
}

/**
 * Set admin authentication
 */
export function setAdminAuth(role: string): void {
  localStorage.setItem('adminAuth', 'true');
  localStorage.setItem('adminRole', role);
}

/**
 * Log out the admin user
 */
export function adminLogout(): void {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminRole');
}
