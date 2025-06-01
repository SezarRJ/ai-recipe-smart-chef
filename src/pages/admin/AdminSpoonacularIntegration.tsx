
import React from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';

const AdminSpoonacularIntegration = () => {
  return (
    <AdminPageWrapper title="Spoonacular Integration">
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Spoonacular API Integration</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure Spoonacular API settings and manage recipe imports.
          </p>
        </div>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminSpoonacularIntegration;
