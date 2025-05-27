
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const AdminLink = () => {
  return (
    <Link 
      to="/admin/login" 
      className="fixed bottom-6 right-6 bg-gray-800 dark:bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      aria-label="Admin Access"
      title="Admin Access"
    >
      <Shield className="h-6 w-6" />
    </Link>
  );
};

export default AdminLink;
