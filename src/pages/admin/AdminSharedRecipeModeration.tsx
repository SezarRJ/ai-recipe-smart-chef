
import React from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';

const AdminSharedRecipeModeration = () => {
  return (
    <AdminPageWrapper title="Shared Recipe Moderation">
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recipe Moderation</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Review and moderate user-submitted recipes.
          </p>
        </div>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminSharedRecipeModeration;
