
import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, Camera, Mic, Search, Utensils, Crown } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { Link } from 'react-router-dom';

const AIFeaturesPage = () => {
  const { t, direction } = useRTL();

  const features = [
    {
      icon: Search,
      title: t("AI Recipe Finder", "مكتشف الوصفات بالذكاء الاصطناعي"),
      description: t("Find recipes by ingredients you have", "اعثر على وصفات بالمكونات المتوفرة لديك"),
      path: "/ai-find-by-ingredients",
      premium: false
    },
    {
      icon: Camera,
      title: t("Visual Recipe Search", "البحث المرئي للوصفات"),
      description: t("Scan ingredients or dishes with your camera and find matching recipes", "امسح المكونات أو الأطباق بالكاميرا للعثور على وصفات مطابقة"),
      path: "/scan-dish",
      premium: true
    },
    {
      icon: Mic,
      title: t("Voice Assistant", "المساعد الصوتي"),
      description: t("Use voice commands to search and get recipe help", "ابحث وتحكم بالوصفات باستخدام أوامر صوتية"),
      path: "/voice-assistant",
      premium: true
    },
    {
      icon: Brain,
      title: t("Smart Meal Planner", "مخطط الوجبات الذكي"),
      description: t("Let AI create your personalized meal plan", "اسمح للذكاء الاصطناعي بإنشاء خطة وجباتك الشخصية"),
      path: "/smart-meal-planner",
      premium: true
    },
    {
      icon: Utensils,
      title: t("Recipe Personalization", "تخصيص الوصفات"),
      description: t("Personalize any recipe for your tastes & dietary needs", "خصص أي وصفة حسب ذوقك واحتياجاتك الغذائية"),
      path: "/recipe-personalizer",
      premium: false
    }
  ];

  return (
    <MobileLayout
      header={{
        title: t("AI Features", "ميزات الذكاء الاصطناعي"),
        showBackButton: true
      }}
    >
      <div className={`space-y-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-teal rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t("AI-Powered Cooking", "الطبخ بالذكاء الاصطناعي")}
          </h2>
          <p className="text-gray-600 text-sm">
            {t("Experience the future of cooking with AI assistance", "اختبر مستقبل الطبخ مع مساعدة الذكاء الاصطناعي")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-wasfah-bright-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-wasfah-bright-teal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                      {feature.premium && (
                        <Badge variant="outline" className="text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          {t("Premium", "مميز")}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <Link to={feature.path}>
                      <Button 
                        size="sm" 
                        className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                        disabled={feature.premium}
                      >
                        {feature.premium 
                          ? t("Upgrade to Access", "ترقية للوصول") 
                          : t("Try Now", "جرب الآن")
                        }
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Upgrade Card */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <CardContent className="p-6 text-center">
            <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("Unlock All AI Features", "افتح جميع ميزات الذكاء الاصطناعي")}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {t("Get access to premium AI features and enhanced cooking experience", "احصل على الوصول لميزات الذكاء الاصطناعي المميزة وتجربة طبخ محسنة")}
            </p>
            <Link to="/subscription">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                {t("Upgrade Now", "ترقية الآن")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default AIFeaturesPage;
