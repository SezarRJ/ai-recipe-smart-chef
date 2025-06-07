
import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ShoppingCart, 
  ChefHat, 
  Share2, 
  Users, 
  Camera,
  Package,
  Bot,
  Heart,
  Search,
  Smartphone,
  BookOpen
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const ServicesPage = () => {
  const { t, direction } = useRTL();

  const serviceCategories = [
    {
      title: t("Core Services", "الخدمات الأساسية"),
      description: t("Essential tools for your culinary journey", "الأدوات الأساسية لرحلتك الطبخية"),
      services: [
        {
          name: t("Meal Plan", "خطة الوجبات"),
          description: t("Plan your weekly meals efficiently", "خطط وجباتك الأسبوعية بكفاءة"),
          icon: Calendar,
          path: "/meal-plan",
          isPremium: false
        },
        {
          name: t("Shopping List", "قائمة التسوق"),
          description: t("Organize your grocery shopping", "نظم تسوق البقالة"),
          icon: ShoppingCart,
          path: "/shopping-list",
          isPremium: false
        },
        {
          name: t("Create Recipe", "إنشاء وصفة"),
          description: t("Share your culinary creations", "شارك إبداعاتك الطبخية"),
          icon: ChefHat,
          path: "/create-recipe",
          isPremium: false
        },
        {
          name: t("Shared Recipes", "الوصفات المشتركة"),
          description: t("Discover community recipes", "اكتشف وصفات المجتمع"),
          icon: Share2,
          path: "/shared-recipes",
          isPremium: false
        },
        {
          name: t("Community", "المجتمع"),
          description: t("Connect with food lovers", "تواصل مع محبي الطعام"),
          icon: Users,
          path: "/community",
          isPremium: false
        },
        {
          name: t("Scan Dish", "مسح الطبق"),
          description: t("Identify dishes with AI", "تحديد الأطباق بالذكاء الاصطناعي"),
          icon: Camera,
          path: "/scan-dish",
          isPremium: false
        },
        {
          name: t("Smart Pantry", "المخزن الذكي"),
          description: t("Manage your ingredients efficiently", "إدارة مكوناتك بكفاءة"),
          icon: Package,
          path: "/pantry",
          isPremium: false
                }
      ]
    }
  ];

  return (
    <PageContainer
      header={{
        title: t("Services", "الخدمات"),
        showBackButton: true
      }}
    >
      <div className={`space-y-8 pb-24 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("All Features & Services", "جميع الميزات والخدمات")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("Explore all the features and services available in WasfahAI to enhance your cooking experience", "استكشف جميع الميزات والخدمات المتاحة في وصفة الذكاء الاصطناعي لتعزيز تجربة الطبخ")}
          </p>
        </div>

        {/* Service Categories */}
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {category.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service, serviceIndex) => (
                <Link key={serviceIndex} to={service.path}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 dark:border-gray-700">
                    <CardHeader className="pb-3">
                      <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                          <div className="p-3 bg-wasfah-bright-teal/10 rounded-lg">
                            <service.icon className="h-6 w-6 text-wasfah-bright-teal" />
                          </div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                        </div>
                        {service.isPremium && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            {t("Premium", "مميز")}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            {t("Ready to Start Cooking?", "جاهز لبدء الطبخ؟")}
          </h2>
          <p className="mb-6 opacity-90">
            {t("Join thousands of home cooks using AI to create amazing meals", "انضم إلى آلاف الطهاة المنزليين الذين يستخدمون الذكاء الاصطناعي لإعداد وجبات رائعة")}
          </p>
          <Link 
            to="/ai-features" 
            className="inline-block bg-white text-wasfah-bright-teal px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            {t("Start Cooking with AI", "ابدأ الطبخ مع الذكاء الاصطناعي")}
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default ServicesPage;
