import React, { useRef, useState } from 'react';

import { PageContainer } from '@/components/layout/PageContainer';
import { ScanDishComponent, ScanDishResult } from '@/components/dish/ScanDishComponent';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRTL } from '@/contexts/RTLContext';

export default function ScanDishPage() {
  const { t } = useRTL();
  const [scanResult, setScanResult] = useState<ScanDishResult | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScanResult = (result: ScanDishResult) => {
    setScanResult(result);
    setShowCamera(false); // Stop camera after scan
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Replace this mock with real image scanning logic
      console.log('Image uploaded:', file);
      handleScanResult({
        name: 'Uploaded Dish',
        calories: 420,
        protein: 25,
        carbs: 50,
        ingredients: ['Chicken', 'Rice', 'Broccoli'],
      });
    }
  };

  const openCamera = () => {
    setShowCamera(true);
  };

  const addToTracking = () => {
    alert(t('Added to health tracking!', 'تمت الإضافة إلى تتبع الصحة!'));
  };

  const addToMealPlan = () => {
    alert(t('Added to meal plan!', 'تمت الإضافة إلى خطة الوجبات!'));
  };

  return (
    <PageContainer header={{ title: t('Scan Dish', 'مسح الطبق'), showBackButton: true }}>
      <div className="space-y-6 pb-6">
        {/* Buttons */}
        <div className="flex gap-4">
          <Button onClick={openCamera}>{t('Open Camera', 'افتح الكاميرا')}</Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <Button onClick={() => fileInputRef.current?.click()}>
            {t('Upload Image', 'تحميل صورة')}
          </Button>
        </div>

        {/* Camera View */}
        {showCamera && <ScanDishComponent onScanResult={handleScanResult} />}

        {/* Result Card */}
        {scanResult && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-wasfah-deep-teal">{scanResult.name}</h2>
              </div>

              {/* Nutrition */}
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

              {/* Ingredients */}
              <div>
                <h3 className="font-medium mb-2">{t('Ingredients', 'المكونات')}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {scanResult.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-sm">{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={addToTracking}
                  className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                >
                  {t('Add to Health Tracking', 'أضف إلى تتبع الصحة')}
                </Button>
                <Button
                  onClick={addToMealPlan}
                  className="w-full bg-wasfah-light-teal hover:bg-wasfah-teal"
                >
                  {t('Add to Meal Plan', 'أضف إلى خطة الوجبات')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
