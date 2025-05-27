
import React from 'react';
import { AdminAuthGuard } from './AdminAuthGuard';

interface SuperAdminGuardProps {
  children: React.ReactNode;
}

export const SuperAdminGuard: React.FC<SuperAdminGuardProps> = ({ children }) => {
  return (
    <AdminAuthGuard requireSuperAdmin={true}>
      {children}
    </AdminAuthGuard>
  );
};

export default SuperAdminGuard;
