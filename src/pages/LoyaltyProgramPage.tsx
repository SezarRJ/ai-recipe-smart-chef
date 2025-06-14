
import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Gift, Star, Trophy, Crown, Zap, 
  Heart, Coffee, Utensils 
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const LoyaltyProgramPage = () => {
  const { t, direction } = useRTL();

  const currentPoints = 1250;
  const nextTierPoints = 2000;
  const progress = (currentPoints / nextTierPoints) * 100;

  const rewards = [
    {
      icon: Coffee,
      title: t("Free Premium Week", "أسبوع مميز مجاني"),
      points: 500,
      available: true
    },
    {
      icon: Utensils,
      title: t("Exclusive Recipe Pack", "حزمة وصفات حصرية"),
      points: 750,
      available: true
    },
    {
      icon: Gift,
      title: t("Kitchen Gadget Discount", "خصم على أدوات المطبخ"),
      points: 1000,
      available: true
    },
    {
      icon: Crown,
      title: t("Premium Membership", "عضوية مميزة"),
      points: 2000,
      available: false
    }
  ];

  const activities = [
    {
      action: t("Complete daily recipe", "أكمل وصفة يومية"),
      points: "+10",
      icon: Star
    },
    {
      action: t("Share recipe", "شارك وصفة"),
      points: "+5",
      icon: Heart
    },
    {
      action: t("Rate recipe", "قيم وصفة"),
      points: "+3",
      icon: Star
    },
    {
      action: t("Invite friend", "ادع صديق"),
      points: "+50",
      icon: Gift
    }
  ];

  return (
    <MobileLayout
      header={{
        title: t("Loyalty Program", "برنامج الولاء"),
        showBackButton: true
      }}
    >
      <div className={`space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t("Earn Rewards", "اكسب المكافآت")}
          </h2>
          <p className="text-gray-600 text-sm">
            {t("Cook, share, and earn points for exclusive rewards", "اطبخ وشارك واكسب نقاط للمكافآت الحصرية")}
          </p>
        </div>

        {/* Current Status */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal/10 to-wasfah-mint/10 border-wasfah-bright-teal/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-wasfah-bright-teal" />
                {t("Your Points", "نقاطك")}
              </span>
              <span className="text-2xl font-bold text-wasfah-bright-teal">
                {currentPoints.toLocaleString()}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{t("Progress to next tier", "التقدم للمستوى التالي")}</span>
                <span>{currentPoints}/{nextTierPoints}</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
            <p className="text-sm text-gray-600">
              {t(`${nextTierPoints - currentPoints} points to unlock Premium tier`, `${nextTierPoints - currentPoints} نقطة لفتح المستوى المميز`)}
            </p>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("Available Rewards", "المكافآت المتاحة")}
          </h3>
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <Card 
                key={index} 
                className={`${
                  reward.available 
                    ? 'hover:shadow-lg transition-all duration-300' 
                    : 'opacity-50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-wasfah-bright-teal/10 rounded-lg flex items-center justify-center">
                        <reward.icon className="h-5 w-5 text-wasfah-bright-teal" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{reward.title}</h4>
                        <p className="text-sm text-wasfah-bright-teal font-semibold">
                          {reward.points} {t("points", "نقطة")}
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!reward.available || currentPoints < reward.points}
                      className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                    >
                      {reward.available && currentPoints >= reward.points
                        ? t("Redeem", "استبدل")
                        : t("Locked", "مقفل")
                      }
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Earn Points */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("Earn Points", "اكسب النقاط")}
          </h3>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <activity.icon className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-900">{activity.action}</span>
                    </div>
                    <span className="text-green-600 font-semibold">
                      {activity.points}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Offer */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardContent className="p-6 text-center">
            <Gift className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("Double Points Weekend!", "عطلة النقاط المضاعفة!")}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {t("Earn 2x points on all activities this weekend", "اكسب ضعف النقاط على جميع الأنشطة هذه العطلة")}
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              {t("Learn More", "اعرف المزيد")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default LoyaltyProgramPage;
