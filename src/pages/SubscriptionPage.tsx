
import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, Check, Sparkles, Brain, Camera, 
  Mic, Star, Zap 
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const SubscriptionPage = () => {
  const { t, direction } = useRTL();

  const plans = [
    {
      name: t("Free", "مجاني"),
      price: t("$0", "0$"),
      period: t("/month", "/شهر"),
      popular: false,
      features: [
        t("Basic recipe search", "البحث الأساسي للوصفات"),
        t("Standard recipes", "الوصفات العادية"),
        t("Basic pantry management", "إدارة المخزن الأساسية"),
        t("Community access", "الوصول للمجتمع")
      ]
    },
    {
      name: t("Premium", "مميز"),
      price: t("$9.99", "9.99$"),
      period: t("/month", "/شهر"),
      popular: true,
      features: [
        t("All Free features", "جميع الميزات المجانية"),
        t("AI recipe generation", "توليد الوصفات بالذكاء الاصطناعي"),
        t("Visual ingredient scanning", "مسح المكونات المرئي"),
        t("Voice cooking assistant", "مساعد الطبخ الصوتي"),
        t("Smart meal planning", "تخطيط الوجبات الذكي"),
        t("Personalized recommendations", "التوصيات المخصصة"),
        t("Premium recipes", "الوصفات المميزة"),
        t("Priority support", "الدعم المتقدم")
      ]
    }
  ];

  const premiumFeatures = [
    {
      icon: Brain,
      title: t("AI Recipe Generation", "توليد الوصفات بالذكاء الاصطناعي"),
      description: t("Create custom recipes based on your preferences", "اصنع وصفات مخصصة حسب تفضيلاتك")
    },
    {
      icon: Camera,
      title: t("Visual Ingredient Scanner", "ماسح المكونات المرئي"),
      description: t("Scan ingredients with your camera", "امسح المكونات بكاميراك")
    },
    {
      icon: Mic,
      title: t("Voice Assistant", "المساعد الصوتي"),
      description: t("Cook hands-free with voice commands", "اطبخ دون استخدام اليدين بالأوامر الصوتية")
    },
    {
      icon: Sparkles,
      title: t("Smart Meal Planning", "تخطيط الوجبات الذكي"),
      description: t("AI-powered weekly meal plans", "خطط الوجبات الأسبوعية بالذكاء الاصطناعي")
    }
  ];

  return (
    <MobileLayout
      header={{
        title: t("Subscription", "الاشتراك"),
        showBackButton: true
      }}
    >
      <div className={`space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t("Upgrade to Premium", "ترقية للمميز")}
          </h2>
          <p className="text-gray-600 text-sm">
            {t("Unlock advanced AI features and enhance your cooking", "افتح ميزات الذكاء الاصطناعي المتقدمة وعزز طبخك")}
          </p>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden ${
                plan.popular 
                  ? 'ring-2 ring-wasfah-bright-teal border-wasfah-bright-teal' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal text-white text-center py-2">
                  <Badge className="bg-white text-wasfah-bright-teal">
                    <Star className="h-3 w-3 mr-1" />
                    {t("Most Popular", "الأكثر شعبية")}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-wasfah-bright-teal">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 text-sm">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-wasfah-bright-teal hover:bg-wasfah-teal' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  disabled={index === 0}
                >
                  {index === 0 
                    ? t("Current Plan", "الخطة الحالية")
                    : t("Upgrade Now", "ترقية الآن")
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Features Detail */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            {t("Premium Features", "الميزات المميزة")}
          </h3>
          <div className="space-y-3">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="bg-gradient-to-r from-wasfah-bright-teal/5 to-wasfah-mint/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-wasfah-bright-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-wasfah-bright-teal" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("30-Day Money Back Guarantee", "ضمان استرداد المال لمدة 30 يوم")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("Try Premium risk-free. Cancel anytime within 30 days for a full refund.", "جرب المميز بدون مخاطر. ألغِ في أي وقت خلال 30 يوم لاسترداد كامل.")}
            </p>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default SubscriptionPage;
