
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Camera, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRTL } from '@/contexts/RTLContext';

const CreateRecipePage = () => {
  const { t } = useRTL();

  return (
    <PageContainer
      header={{
        title: t('Create Recipe', 'إنشاء وصفة'),
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-6">
        <div className="text-center space-y-4">
          <ChefHat className="h-12 w-12 mx-auto text-wasfah-coral-red" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Create Your Recipe', 'أنشئ وصفتك')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Share your culinary creations with the community', 'شارك إبداعاتك الطهوية مع المجتمع')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('Recipe Details', 'تفاصيل الوصفة')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('Recipe Title', 'عنوان الوصفة')}
              </label>
              <Input placeholder={t('Enter recipe title...', 'أدخل عنوان الوصفة...')} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('Description', 'الوصف')}
              </label>
              <Textarea placeholder={t('Describe your recipe...', 'اوصف وصفتك...')} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('Prep Time (minutes)', 'وقت التحضير (دقائق)')}
                </label>
                <Input type="number" placeholder="30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('Cook Time (minutes)', 'وقت الطبخ (دقائق)')}
                </label>
                <Input type="number" placeholder="45" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('Recipe Photo', 'صورة الوصفة')}
              </label>
              <Button variant="outline" className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                {t('Upload Photo', 'رفع صورة')}
              </Button>
            </div>

            <Button className="w-full bg-wasfah-coral-red hover:bg-wasfah-coral-red/90">
              <Plus className="h-4 w-4 mr-2" />
              {t('Create Recipe', 'إنشاء وصفة')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default CreateRecipePage;
