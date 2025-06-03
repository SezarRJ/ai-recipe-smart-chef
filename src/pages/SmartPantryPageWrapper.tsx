
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import SmartPantry from '@/SmartPantry';

const SmartPantryPageWrapper: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Smart Pantry',
        showBackButton: true
      }}
    >
      <SmartPantry />
    </PageContainer>
  );
};

export default SmartPantryPageWrapper;
