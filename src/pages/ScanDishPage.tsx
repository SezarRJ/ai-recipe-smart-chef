
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import ScanDishComponent, { ScanDishResult } from '@/components/dish/ScanDishComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ScanDishPage() {
  const [scanResult, setScanResult] = useState<ScanDishResult | null>(null);

  const handleScanComplete = (result: ScanDishResult) => {
    setScanResult(result);
  };

  return (
    <PageContainer
      header={{
        title: 'Scan Your Dish',
        showBackButton: true,
      }}
      className="max-w-2xl mx-auto"
    >
      <div className="space-y-6">
        <ScanDishComponent onScanComplete={handleScanComplete} />
        
        {scanResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {scanResult.name}
                <Badge variant="secondary">{scanResult.confidence}% confidence</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="text-lg font-semibold">{scanResult.calories}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Protein</p>
                  <p className="text-lg font-semibold">{scanResult.nutritionInfo.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="text-lg font-semibold">{scanResult.nutritionInfo.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fat</p>
                  <p className="text-lg font-semibold">{scanResult.nutritionInfo.fat}g</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Ingredients</p>
                <div className="flex flex-wrap gap-2">
                  {scanResult.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
