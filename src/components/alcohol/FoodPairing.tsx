
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const FoodPairing = () => {
  const { t } = useRTL();

  const mockPairings = [
    {
      drink: t('Whiskey Sour', 'ويسكي سور'),
      foods: [
        t('Grilled Salmon', 'سلمون مشوي'),
        t('Dark Chocolate', 'شوكولاتة داكنة'),
        t('Cheese Board', 'طبق الأجبان')
      ]
    },
    {
      drink: t('Gin & Tonic', 'جين أند تونيك'),
      foods: [
        t('Fresh Oysters', 'محار طازج'),
        t('Light Salads', 'سلطات خفيفة'),
        t('Citrus Desserts', 'حلويات الحمضيات')
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockPairings.map((pairing, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Utensils className="h-5 w-5 text-wasfah-bright-teal" />
              {pairing.drink}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              {t('Pairs well with:', 'يتناسب جيداً مع:')}
            </p>
            <div className="flex flex-wrap gap-2">
              {pairing.foods.map((food, foodIndex) => (
                <Badge key={foodIndex} variant="outline">
                  {food}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FoodPairing;
