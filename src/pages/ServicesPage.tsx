import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Utensils, 
  Calculator, 
  Timer, 
  Scale, 
  Thermometer,
  Camera,
  Users,
  Heart,
  Target,
  Zap,
  Smartphone,
  ChefHat,
  BookOpen,
  Award,
  TrendingUp,
  Search,
  Eye
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const ServicesPage = () => {
  const { t, direction } = useRTL();

  const serviceCategories = [
    {
      title: t("AI-Powered Features", "ميزات الذكاء الاصطناعي"),
      description: t("Smart cooking assistance powered by AI", "مساعدة الطبخ الذكية بالذكاء الاصطناعي"),
      services: [
        {
          name: t("AI Cooking Assistant", "مساعد الطبخ بالذكاء الاصطناعي"),
          description: t("Get instant cooking help and advice", "احصل على مساعدة ونصائح فورية للطبخ"),
          icon: Bot,
          path: "/ai/cooking-assistant",
          isPremium: false
        },
        {
          name: t("Recipe Personalizer", "مخصص الوصفات"),
          description: t("Customize recipes to your preferences", "خصص الوصفات حسب تفضيلاتك"),
          icon: Target,
          path: "/ai/recipe-personalizer",
          isPremium: true
        },
        {
          name: t("Smart Meal Planner", "مخطط الوجبات الذكي"),
          description: t("AI-powered meal planning", "تخطيط الوجبات بالذكاء الاصطناعي"),
          icon: Utensils,
          path: "/ai/meal-planner",
          isPremium: true
        },
        {
          name: t("Dietary AI Advisor", "مستشار النظام الغذائي بالذكاء الاصطناعي"),
          description: t("Personalized dietary guidance", "إرشادات غذائية شخصية"),
          icon: Heart,
          path: "/ai/dietary-advisor",
          isPremium: true
        },
        {
          name: t("Fitness Nutrition Coach", "مدرب التغذية واللياقة"),
          description: t("Nutrition advice for fitness goals", "نصائح تغذية لأهداف اللياقة"),
          icon: TrendingUp,
          path: "/ai/fitness-coach",
          isPremium: true
        },
        {
          name: t("Mood-Based Recipes", "وصفات حسب المزاج"),
          description: t("Recipes that match your mood", "وصفات تناسب مزاجك"),
          icon: Zap,
          path: "/ai/mood-recipes",
          isPremium: true
        }
      ]
    },
    {
      title: t("Premium Features", "الميزات المميزة"),
      description: t("Unlock advanced cooking features", "افتح ميزات الطبخ المتقدمة"),
      services: [
        {
          name: t("Voice Recipe Assistant", "مساعد الوصفات الصوتي"),
          description: t("Voice-guided cooking", "طبخ بالإرشاد الصوتي"),
          icon: Smartphone,
          path: "/ai/voice-assistant",
          isPremium: true
        },
        {
          name: t("Smart Recipe Adaptation", "تكييف الوصفات الذكي"),
          description: t("Adapt recipes automatically", "كيف الوصفات تلقائياً"),
          icon: Zap,
          path: "/ai/smart-adaptation",
          isPremium: true
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
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                          <div className="p-2 bg-wasfah-bright-teal/10 rounded-lg">
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
