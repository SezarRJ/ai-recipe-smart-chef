
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRTL } from '@/contexts/RTLContext';

const ShoppingListPage = () => {
  const { t } = useRTL();

  return (
    <PageContainer
      header={{
        title: t('Shopping List', 'قائمة التسوق'),
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-6">
        <div className="text-center space-y-4">
          <ShoppingCart className="h-12 w-12 mx-auto text-wasfah-bright-teal" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Shopping List', 'قائمة التسوق')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Organize your grocery shopping efficiently', 'نظم تسوق البقالة بكفاءة')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t('Your Shopping List', 'قائمة التسوق الخاصة بك')}
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t('Add Item', 'إضافة عنصر')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-500">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">{t('Your shopping list is empty', 'قائمة التسوق فارغة')}</p>
              <p className="text-sm">{t('Add items from recipes or manually', 'أضف عناصر من الوصفات أو يدوياً')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ShoppingListPage;
