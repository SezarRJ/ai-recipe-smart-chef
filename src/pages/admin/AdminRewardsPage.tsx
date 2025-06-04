
import React from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import AdminRewardsManager from './AdminRewardsManager';

const AdminRewardsPage = () => {
  return (
    <AdminPageWrapper title="Rewards Management">
      <AdminRewardsManager />
    </AdminPageWrapper>
  );
};

export default AdminRewardsPage;
