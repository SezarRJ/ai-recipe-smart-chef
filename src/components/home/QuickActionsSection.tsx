
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, ArrowLeftRight, ShoppingCart, Target, ChefHat, History, Heart, Share2, Camera, SubscriptIcon } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export const QuickActionsSection: React.FC = () => {
  const { t } = useRTL();
  
  const actions = [
    { icon: <Activity className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: t("Track Health", "تتبع الصحة"), path: "/health-tracking-home" },
    { icon: <ArrowLeftRight className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: t("Swap Ingredients", "تبديل المكونات"), path: "/ingredient-swap" },
    { icon: <ShoppingCart className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: t("Shopping List", "قائمة التسوق"), path: "/shopping-list" },
    { icon: <Target className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: t("Set Goals", "تعيين الأهداف"), path: "/nutrition-goals" },
  ];

  const historyFavoritesActions = [
    { icon: <Heart className="h-6 w-6 mx-auto text-wasfah-coral-red" />, label: t("Favorites", "المفضلة"), path: "/favorites" },
    { icon: <History className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: t("History", "السجل"), path: "/history" },
    { icon: <Camera className="h-6 w-6 mx-auto text-wasfah-deep-teal" />, label: t("Scan Dish", "مسح الطبق"), path: "/scan-dish" },
    { icon: <SubscriptIcon className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: t("Subscription", "الاشتراك"), path: "/subscription" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-wasfah-deep-teal">{t('Quick Actions', 'إجراءات سريعة')}</h2>
      
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action, index) => (
          <Link to={action.path} key={action.path}>
            <Card 
              className="text-center p-2 hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-gray-50" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-1 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                {action.icon}
                <div className="text-xs mt-1 font-medium">{action.label}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <h2 className="text-lg font-bold text-wasfah-deep-teal">{t('Favorites & Tools', 'المفضلة والأدوات')}</h2>
      
      <div className="grid grid-cols-4 gap-2">
        {historyFavoritesActions.map((action, index) => (
          <Link to={action.path} key={action.path}>
            <Card 
              className="text-center p-2 hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-gray-50" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-1 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                {action.icon}
                <div className="text-xs mt-1 font-medium">{action.label}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
