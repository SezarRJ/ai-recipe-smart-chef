
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Camera, Sparkles, Brain } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { Link } from 'react-router-dom';

export default function AIFeaturesPage() {
  const { t } = useRTL();

  const features = [
    {
      icon: <Camera className="h-8 w-8 text-green-500" />,
      title: t('Dish Scanner', 'ماسح الأطباق'),
      description: t('Identify dishes from photos', 'تحديد الأطباق من الصور'),
      path: '/scan-dish',
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: t('AI Recipe Finder', 'باحث الوصفات الذكي'),
      description: t('Find recipes by ingredients', 'البحث عن الوصفات بالمكونات'),
      path: '/ai-find-by-ingredients',
    },
  ];

  return (
    <PageContainer header={{ title: t('AI Features', 'ميزات الذكاء الاصطناعي'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-6 rounded-lg text-white text-center mb-6">
          <Sparkles className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('AI-Powered Features', 'الميزات المدعومة بالذكاء الاصطناعي')}</h1>
          <p className="opacity-90">{t('Discover intelligent cooking assistance', 'اكتشف المساعدة الذكية في الطبخ')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Link to={feature.path} key={index}>
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.03] h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
