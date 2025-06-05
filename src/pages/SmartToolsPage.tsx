
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Target, 
  Scale, 
  Watch, 
  Clock, 
  Apple,
  TrendingUp,
  Heart
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const SmartToolsPage = () => {
  const navigate = useNavigate();
  const { t } = useRTL();

  const tools = [
    {
      id: 'nutrition-tracking',
      title: t('Nutrition Tracking', 'تتبع التغذية'),
      description: t('Track macros, calories, and nutrients from your meals', 'تتبع المغذيات الكبرى والسعرات والعناصر الغذائية من وجباتك'),
      icon: Apple,
      color: 'bg-green-500',
      route: '/nutrition-goals'
    },
    {
      id: 'micronutrient-tracker',
      title: t('Micronutrient Tracker', 'متتبع المغذيات الدقيقة'),
      description: t('Monitor vitamins and minerals for optimal health', 'راقب الفيتامينات والمعادن للصحة المثلى'),
      icon: TrendingUp,
      color: 'bg-blue-500',
      route: '/micronutrient-tracker'
    },
    {
      id: 'weight-management',
      title: t('Weight Management', 'إدارة الوزن'),
      description: t('Track weight changes and body composition', 'تتبع تغيرات الوزن وتركيبة الجسم'),
      icon: Scale,
      color: 'bg-purple-500',
      route: '/body-information'
    },
    {
      id: 'activity-monitor',
      title: t('Activity Monitor', 'مراقب النشاط'),
      description: t('Connect fitness trackers and monitor activity', 'ربط أجهزة تتبع اللياقة ومراقبة النشاط'),
      icon: Watch,
      color: 'bg-orange-500',
      route: '/health-tracking'
    },
    {
      id: 'health-goals',
      title: t('Health Goals', 'أهداف الصحة'),
      description: t('Set and track personalized health objectives', 'ضع وتتبع أهداف صحية شخصية'),
      icon: Target,
      color: 'bg-red-500',
      route: '/nutrition-goals'
    },
    {
      id: 'meal-timing',
      title: t('Meal Timing', 'توقيت الوجبات'),
      description: t('Optimize meal timing for better health', 'حسّن توقيت الوجبات لصحة أفضل'),
      icon: Clock,
      color: 'bg-teal-500',
      route: '/meal-timing'
    }
  ];

  const handleToolClick = (route: string) => {
    navigate(route);
  };

  return (
    <PageContainer
      header={{
        title: t('Smart Health Tools', 'أدوات الصحة الذكية'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Your Health Dashboard', 'لوحة الصحة الخاصة بك')}
          </h2>
          <p className="text-gray-600">
            {t('Comprehensive tools to track and improve your health journey', 'أدوات شاملة لتتبع وتحسين رحلة صحتك')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleToolClick(tool.route)}>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-wasfah-deep-teal">
                    {tool.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToolClick(tool.route);
                  }}
                  className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
                >
                  {t('Open Tool', 'فتح الأداة')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>{t('Today\'s Health Summary', 'ملخص صحة اليوم')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-wasfah-bright-teal">1,450</div>
                <div className="text-sm text-gray-600">{t('Calories', 'سعرات')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-wasfah-bright-teal">78g</div>
                <div className="text-sm text-gray-600">{t('Protein', 'بروتين')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-wasfah-bright-teal">8,532</div>
                <div className="text-sm text-gray-600">{t('Steps', 'خطوات')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-wasfah-bright-teal">7.5h</div>
                <div className="text-sm text-gray-600">{t('Sleep', 'نوم')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SmartToolsPage;
