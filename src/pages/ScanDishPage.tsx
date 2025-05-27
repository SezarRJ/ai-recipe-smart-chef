import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
// You might rename or refactor ScanDishComponent to handle both camera and upload
import { ScanDishComponent, ScanDishResult } from '@/components/dish/ScanDishComponent';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRTL } from '@/contexts/RTLContext';
import { CameraIcon, UploadIcon } from 'lucide-react'; // Assuming you have lucide-react for icons

export default function ScanDishPage() {
  const { t } = useRTL();
  const [scanResult, setScanResult] = useState<ScanDishResult | null>(null);
  const [scanMethod, setScanMethod] = useState<'camera' | 'upload' | null>(null); // New state for selection

  const handleScanResult = (result: ScanDishResult) => {
    setScanResult(result);
  };

  const addToTracking = () => {
    // In a real app, this would add the scanned dish to health tracking
    alert(t('Added to health tracking!', 'تمت الإضافة إلى تتبع الصحة!'));
  };

  return (
    <PageContainer header={{ title: t('Scan Dish', 'مسح الطبق'), showBackButton: true }}>
      <div className="space-y-6 pb-6">
        {!scanResult && !scanMethod && ( // Show selection buttons if no result and no method chosen
          <div className="flex flex-col space-y-4">
            <Button
              onClick={() => setScanMethod('camera')}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal flex items-center justify-center space-x-2"
            >
              <CameraIcon className="w-5 h-5" />
              <span>{t('Open Camera', 'فتح الكاميرا')}</span>
            </Button>
            <Button
              onClick={() => setScanMethod('upload')}
              className="w-full border border-wasfah-bright-teal text-wasfah-bright-teal bg-white hover:bg-wasfah-light-gray flex items-center justify-center space-x-2"
              variant="outline"
            >
              <UploadIcon className="w-5 h-5" />
              <span>{t('Upload Image', 'تحميل صورة')}</span>
            </Button>
          </div>
        )}

        {scanMethod && ( // Render ScanDishComponent only when a method is chosen
          <ScanDishComponent scanMethod={scanMethod} onScanResult={handleScanResult} />
        )}

        {scanResult && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-wasfah-deep-teal">{scanResult.name}</h2>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-wasfah-light-gray/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">{t('Calories', 'سعرات حرارية')}</p>
                  <p className="font-bold">{scanResult.calories} kcal</p>
                </div>
                <div className="bg-wasfah-light-gray/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">{t('Protein', 'بروتين')}</p>
                  <p className="font-bold">{scanResult.protein}g</p>
                </div>
                <div className="bg-wasfah-light-gray/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">{t('Carbs', 'كربوهيدرات')}</p>
                  <p className="font-bold">{scanResult.carbs}g</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">{t('Ingredients', 'المكونات')}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {scanResult.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-sm">{ingredient}</li>
                  ))}
                </ul>
              </div>

              <Button onClick={addToTracking} className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                {t('Add to Health Tracking', 'أضف إلى تتبع الصحة')}
              </Button>
              <Button onClick={() => setScanResult(null)} variant="outline" className="w-full mt-2">
                {t('Scan Another Dish', 'مسح طبق آخر')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
