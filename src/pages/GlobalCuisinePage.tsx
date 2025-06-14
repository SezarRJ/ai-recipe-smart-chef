
import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, ChefHat, MapPin, Star } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const GlobalCuisinePage = () => {
  const { t, direction } = useRTL();

  const cuisines = [
    {
      name: t("Italian", "إيطالي"),
      image: "/images/Globalcuisine.png",
      dishes: t("120 Dishes", "120 طبق"),
      rating: 4.8
    },
    {
      name: t("Mexican", "مكسيكي"),
      image: "/images/Globalcuisine.png",
      dishes: t("85 Dishes", "85 طبق"),
      rating: 4.6
    },
    {
      name: t("Asian", "آسيوي"),
      image: "/images/Globalcuisine.png",
      dishes: t("200 Dishes", "200 طبق"),
      rating: 4.9
    },
    {
      name: t("French", "فرنسي"),
      image: "/images/Globalcuisine.png",
      dishes: t("95 Dishes", "95 طبق"),
      rating: 4.7
    }
  ];

  return (
    <MobileLayout
      header={{
        title: t("Global Cuisine", "المطبخ العالمي"),
        showBackButton: true
      }}
    >
      <div className={`space-y-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="text-center py-4">
          <Globe className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-2" />
          <h2 className="text-xl font-bold text-gray-900">
            {t("Explore World Cuisines", "استكشف المطابخ العالمية")}
          </h2>
          <p className="text-gray-600 text-sm">
            {t("Discover authentic recipes from around the world", "اكتشف وصفات أصيلة من حول العالم")}
          </p>
        </div>

        {/* Cuisine Grid */}
        <div className="grid grid-cols-1 gap-4">
          {cuisines.map((cuisine, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="flex items-center p-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                  <img 
                    src={cuisine.image} 
                    alt={cuisine.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{cuisine.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ChefHat className="h-4 w-4" />
                    <span>{cuisine.dishes}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{cuisine.rating}</span>
                  </div>
                </div>
                <Button size="sm" className="bg-wasfah-bright-teal">
                  {t("Explore", "استكشف")}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Featured Section */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal/10 to-wasfah-mint/10 border-wasfah-bright-teal/20">
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("Featured This Week", "مميز هذا الأسبوع")}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {t("Mediterranean cuisine with healthy and delicious options", "المطبخ المتوسطي بخيارات صحية ولذيذة")}
            </p>
            <Button className="bg-wasfah-bright-teal">
              {t("View Recipes", "عرض الوصفات")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default GlobalCuisinePage;
