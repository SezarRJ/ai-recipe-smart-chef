
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function SubscriptionPage() {
  const { t } = useRTL();

  const plans = [
    {
      name: t('Free', 'مجاني'),
      price: t('$0/month', '0 ريال/شهر'),
      features: [
        t('Basic recipes', 'وصفات أساسية'),
        t('Community access', 'الوصول للمجتمع'),
        t('Recipe saving', 'حفظ الوصفات')
      ],
      icon: <Star className="h-6 w-6" />,
      color: 'border-gray-200'
    },
    {
      name: t('Premium', 'مميز'),
      price: t('$9.99/month', '37.50 ريال/شهر'),
      features: [
        t('All free features', 'جميع ميزات النسخة المجانية'),
        t('Video instructions', 'تعليمات فيديو'),
        t('Voice guidance', 'إرشاد صوتي'),
        t('Advanced timers', 'مؤقتات متقدمة'),
        t('Nutrition tracking', 'تتبع التغذية'),
        t('Meal planning', 'تخطيط الوجبات')
      ],
      icon: <Crown className="h-6 w-6" />,
      color: 'border-amber-500',
      popular: true
    },
    {
      name: t('Pro Chef', 'شيف محترف'),
      price: t('$19.99/month', '75 ريال/شهر'),
      features: [
        t('All premium features', 'جميع ميزات النسخة المميزة'),
        t('AI recipe creation', 'إنشاء وصفات بالذكاء الاصطناعي'),
        t('Professional techniques', 'تقنيات احترافية'),
        t('Priority support', 'دعم أولوية'),
        t('Custom meal plans', 'خطط وجبات مخصصة')
      ],
      icon: <Zap className="h-6 w-6" />,
      color: 'border-purple-500'
    }
  ];

  return (
    <PageContainer header={{ title: t('Subscription Plans', 'خطط الاشتراك'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-lg text-white text-center mb-6">
          <Crown className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Unlock Premium Features', 'افتح الميزات المميزة')}</h1>
          <p className="opacity-90">{t('Choose the plan that fits your cooking journey', 'اختر الخطة التي تناسب رحلة الطبخ الخاصة بك')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-amber-500' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500">
                  {t('Most Popular', 'الأكثر شعبية')}
                </Badge>
              )}
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-wasfah-bright-teal">{plan.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-amber-500 hover:bg-amber-600' : 'bg-wasfah-bright-teal hover:bg-wasfah-teal'}`}
                >
                  {plan.name === 'Free' ? t('Current Plan', 'الخطة الحالية') : t('Upgrade Now', 'ترقية الآن')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
