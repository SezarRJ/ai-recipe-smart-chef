
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ScanDishComponent, ScanDishResult } from '@/components/dish/ScanDishComponent';
import { useRTL } from '@/contexts/RTLContext';

const ScanDishPage: React.FC = () => {
  const { t } = useRTL();

  const handleScanResult = (result: ScanDishResult) => {
    console.log('Scan result:', result);
    // Handle the scan result here
  };

  return (
    <PageContainer
      header={{
        title: t('Scan Dish', 'مسح الطبق'),
        showBackButton: true
      }}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('Scan Your Dish', 'امسح طبقك')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Take a photo or upload an image to analyze your dish', 'التقط صورة أو قم بتحميل صورة لتحليل طبقك')}
          </p>
        </div>
        
        <ScanDishComponent onScanResult={handleScanResult} />
      </div>
    </PageContainer>
  );
};

export default ScanDishPage;
