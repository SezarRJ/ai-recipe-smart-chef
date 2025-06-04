
import React from 'react';

interface AdminPageWrapperProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

export const AdminPageWrapper: React.FC<AdminPageWrapperProps> = ({ 
  title, 
  children, 
  description 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};
