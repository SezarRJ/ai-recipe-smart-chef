
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdminAuthenticated } from '@/lib/adminAuth';

interface AdminAuthGuardProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ 
  children, 
  requireSuperAdmin = false 
}) => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

  useEffect(() => {
    // In a real application, you would check the validity of the admin token/session
    const checkAdminAuth = () => {
      const adminAuth = isAdminAuthenticated();
      const adminRole = localStorage.getItem('adminRole');
      
      setIsAdmin(adminAuth);
      setIsSuperAdmin(adminRole === 'superadmin');
    };
    
    checkAdminAuth();
  }, []);

  // Show nothing while checking authentication
  if (isAdmin === null) {
    return null;
  }

  // Redirect to admin login if not authenticated
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check super admin requirement
  if (requireSuperAdmin && !isSuperAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">Super Admin access required for this section.</p>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AdminAuthGuard;
