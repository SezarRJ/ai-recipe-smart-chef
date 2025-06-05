
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Star, Gift, Trophy, Crown } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function LoyaltyProgramPage() {
  const { t } = useRTL();

  return (
    <PageContainer header={{ title: t('Loyalty Program', 'برنامج الولاء'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-lg text-white text-center mb-6">
          <Crown className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Gold Member', 'عضو ذهبي')}</h1>
          <p className="opacity-90">{t('You are a valued member of our community', 'أنت عضو مقدر في مجتمعنا')}</p>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('Your Progress', 'تقدمك')}</h3>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              <Star className="h-4 w-4 mr-1" />
              850 {t('points', 'نقطة')}
            </Badge>
          </div>
          <Progress value={85} className="mb-4" />
          <p className="text-sm text-gray-600">
            {t('150 more points to reach Platinum level', 'تحتاج 150 نقطة أخرى للوصول إلى المستوى البلاتيني')}
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-amber-500" />
              <div>
                <h4 className="font-semibold">{t('Recipes Created', 'الوصفات المنشأة')}</h4>
                <p className="text-2xl font-bold text-amber-600">12</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-blue-500" />
              <div>
                <h4 className="font-semibold">{t('Community Rating', 'تقييم المجتمع')}</h4>
                <p className="text-2xl font-bold text-blue-600">4.8</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t('Available Rewards', 'المكافآت المتاحة')}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Gift className="h-6 w-6 text-green-500" />
                <span>{t('Free Premium Week', 'أسبوع مجاني مميز')}</span>
              </div>
              <Badge variant="outline">500 {t('pts', 'نقطة')}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Gift className="h-6 w-6 text-purple-500" />
                <span>{t('Exclusive Recipe Access', 'وصول حصري للوصفات')}</span>
              </div>
              <Badge variant="outline">300 {t('pts', 'نقطة')}</Badge>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
