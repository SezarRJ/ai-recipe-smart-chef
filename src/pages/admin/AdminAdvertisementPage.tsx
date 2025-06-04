
import React from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import AdminAdvertisementManager from './AdminAdvertisementManager';

const AdminAdvertisementPage = () => {
  return (
    <AdminPageWrapper title="Advertisement Management">
      <AdminAdvertisementManager />
    </AdminPageWrapper>
  );
};

export default AdminAdvertisementPage;
