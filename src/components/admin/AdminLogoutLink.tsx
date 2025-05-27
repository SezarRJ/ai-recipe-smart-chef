
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { adminLogout } from '@/lib/adminAuth';
import { Button } from '@/components/ui/button';

export const AdminLogoutLink = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleLogout}
      className="text-white/80 hover:text-white"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
};

export default AdminLogoutLink;
