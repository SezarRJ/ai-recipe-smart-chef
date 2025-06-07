
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Clock } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const Favorites = () => {
  const { t } = useRTL();

  const mockFavorites = [
    {
      id: 1,
      name: t('Classic Martini', 'مارتيني كلاسيكي'),
      rating: 4.9,
      prepTime: 5,
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: t('Old Fashioned', 'أولد فاشيند'),
      rating: 4.7,
      prepTime: 8,
      difficulty: 'Medium',
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            {t('Your Favorites', 'مفضلاتك')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {t('Your saved drink recipes', 'وصفات المشروبات المحفوظة')}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockFavorites.map((drink) => (
          <Card key={drink.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={drink.image}
                alt={drink.name}
                className="w-full h-32 object-cover"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 h-8 w-8 p-0"
              >
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{drink.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{drink.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{drink.prepTime}m</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">{drink.difficulty}</Badge>
                <Button size="sm">
                  {t('Make Drink', 'تحضير المشروب')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
