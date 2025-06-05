
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Book } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function RecipesPage() {
  const { t } = useRTL();

  return (
    <PageContainer header={{ title: t('My Recipes', 'وصفاتي'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{t('My Recipes', 'وصفاتي')}</h1>
          <p className="opacity-90">{t('Manage your personal recipe collection', 'إدارة مجموعة الوصفات الشخصية')}</p>
        </div>

        <Card className="p-8">
          <CardContent className="text-center">
            <Book className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">{t('No recipes yet', 'لا توجد وصفات بعد')}</h3>
            <p className="text-gray-600">{t('Start creating your first recipe!', 'ابدأ بإنشاء وصفتك الأولى!')}</p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
