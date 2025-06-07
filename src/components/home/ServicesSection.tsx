
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  ShoppingCart, 
  ChefHat, 
  Share2, 
  Users, 
  Camera,
  Package,
  Utensils
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export const ServicesSection: React.FC = () => {
  const { t } = useRTL();

  const services = [
    {
      icon: <Calendar className="h-8 w-8 text-wasfah-bright-teal" />,
      title: t("Meal Plan", "خطة الوجبات"),
      description: t("Plan your weekly meals", "خطط وجباتك الأسبوعية"),
      path: "/meal-plan",
      color: "bg-blue-500/10"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-wasfah-bright-teal" />,
      title: t("Shopping List", "قائمة التسوق"),
      description: t("Organize your grocery shopping", "نظم تسوق البقالة"),
      path: "/shopping-list",
      color: "bg-green-500/10"
    },
    {
      icon: <ChefHat className="h-8 w-8 text-wasfah-bright-teal" />,
      title: t("Create Recipe", "إنشاء وصفة"),
      description: t("Share your culinary creations", "شارك إبداعاتك الطبخية"),
      path: "/create-recipe",
      color: "bg-orange-500/10"
    },
    {
      icon: <Share2 className="h-8 w-8 text-wasfah-bright-teal" />,
      title: t("Shared Recipes", "الوصفات المشتركة"),
      description: t("Discover community recipes", "اكتشف وصفات المجتمع"),
      path: "/shared-recipes",
      color: "bg-purple-500/10"
    },
    {
      icon: <Users className="h-8 w-8 text-wasfah-bright-teal" />,
      title: t("Community", "المجتمع"),
      description: t("Connect with food lovers", "تواصل مع محبي الطعام"),
      path: "/community",
      color: "bg-pink-500/10"
    },
    {
      icon: <Camera className="h-8 w-8 text-wasfah-bright-teal" />,
      title: t("Scan Dish", "مسح الطبق"),
      description: t("Identify dishes with AI", "تحديد الأطباق بالذكاء الاصطناعي"),
      path: "/scan-dish",
      color: "bg-cyan-500/10"
    },
    {
      icon: <Package className="h-8 w-8 text-wasfah-bright-teal" />,
      title: t("Smart Pantry", "المخزن الذكي"),
      description: t("Manage your ingredients", "إدارة مكوناتك"),
      path: "/pantry",
      color: "bg-amber-500/10"
    },
    {
      icon: <Utensils className="h-8 w-8 text-wasfah-bright-teal" />,
      title: t("Tools", "الأدوات"),
      description: t("Cooking utilities and guides", "أدوات ودلائل الطبخ"),
      path: "/tools",
      color: "bg-indigo-500/10"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("Our Services", "خدماتنا")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t("Comprehensive tools for your culinary journey", "أدوات شاملة لرحلتك الطبخية")}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <Link
            key={index}
            to={service.path}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
