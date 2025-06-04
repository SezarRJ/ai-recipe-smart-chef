
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { MobileSmartPantry } from '@/components/pantry/MobileSmartPantry';
import { useRTL } from '@/contexts/RTLContext';

export default function SmartPantryPageWrapper() {
  const { t } = useRTL();
  
  return (
    <PageContainer 
      header={{ 
        title: t('smartPantry.title') || 'Smart Pantry', 
        showBackButton: true 
      }}
    >
      <MobileSmartPantry />
    </PageContainer>
  );
}
