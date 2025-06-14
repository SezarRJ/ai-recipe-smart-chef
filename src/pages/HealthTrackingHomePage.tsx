
import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Activity, Heart, Target, TrendingUp, Apple, Droplets, Zap } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const HealthTrackingHomePage = () => {
  const { t, direction } = useRTL();

  const healthStats = [
    {
      icon: Apple,
      label: t("Calories", "السعرات"),
      current: 1850,
      target: 2200,
      unit: t("kcal", "سعرة"),
      color: "bg-green-500"
    },
    {
      icon: Droplets,
      label: t("Water", "الماء"),
      current: 6,
      target: 8,
      unit: t("glasses", "أكواب"),
      color: "bg-blue-500"
    },
    {
      icon: Zap,
      label: t("Protein", "البروتين"),
      current: 45,
      target: 60,
      unit: t("g", "غ"),
      color: "bg-purple-500"
    }
  ];

  const quickActions = [
    {
      icon: Target,
      title: t("Set Goals", "ضع الأهداف"),
      description: t("Customize your health targets", "خصص أهدافك الصحية")
    },
    {
      icon: Activity,
      title: t("Log Meal", "سجل وجبة"),
      description: t("Track your nutrition intake", "تتبع تناولك الغذائي")
    },
    {
      icon: TrendingUp,
      title: t("View Progress", "عرض التقدم"),
      description: t("See your health trends", "شاهد اتجاهاتك الصحية")
    }
  ];

  return (
    <MobileLayout
      header={{
        title: t("Health Tracking", "تتبع الصحة"),
        showBackButton: true
      }}
    >
      <div className={`space-y-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t("Your Health Dashboard", "لوحة صحتك")}
          </h2>
          <p className="text-gray-600 text-sm">
            {t("Track your daily nutrition and health goals", "تتبع تغذيتك اليومية وأهدافك الصحية")}
          </p>
        </div>

        {/* Today's Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-wasfah-bright-teal" />
              {t("Today's Progress", "تقدم اليوم")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {stat.current}/{stat.target} {stat.unit}
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={(stat.current / stat.target) * 100} 
                    className="h-2"
                  />
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full ${stat.color}`}
                    style={{ width: `${Math.min((stat.current / stat.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {t("Quick Actions", "إجراءات سريعة")}
          </h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-wasfah-bright-teal/10 rounded-lg flex items-center justify-center">
                      <action.icon className="h-5 w-5 text-wasfah-bright-teal" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Summary */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal/10 to-wasfah-mint/10 border-wasfah-bright-teal/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("Weekly Summary", "ملخص الأسبوع")}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {t("You're doing great! Keep up the healthy habits.", "أنت تبلي بلاءً حسناً! واصل العادات الصحية.")}
            </p>
            <Button className="bg-wasfah-bright-teal">
              {t("View Details", "عرض التفاصيل")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default HealthTrackingHomePage;
