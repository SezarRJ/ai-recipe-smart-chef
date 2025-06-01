
import React from 'react';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Don't show navigation on certain pages
  if (pathname === '/splash' || pathname === '/' || pathname.startsWith('/admin') || pathname === '/auth') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-wasfah-deep-teal">Wasfah</h1>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
