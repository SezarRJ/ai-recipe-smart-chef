
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function PaymentMethodsPage() {
  const { t } = useRTL();

  return (
    <PageContainer header={{ title: t('Payment Methods', 'طرق الدفع'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-lg text-white text-center mb-6">
          <CreditCard className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Payment Methods', 'طرق الدفع')}</h1>
          <p className="opacity-90">{t('Manage your payment information', 'إدارة معلومات الدفع الخاصة بك')}</p>
        </div>

        <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
          <Plus className="h-4 w-4 mr-2" />
          {t('Add Payment Method', 'إضافة طريقة دفع')}
        </Button>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span>Visa •••• 4242</span>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{t('Expires 12/26', 'تنتهي 12/26')}</p>
              <p className="text-sm text-gray-600">{t('Default payment method', 'طريقة الدفع الافتراضية')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span>Mastercard •••• 8888</span>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{t('Expires 08/25', 'تنتهي 08/25')}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">{t('Billing Information', 'معلومات الفوترة')}</h4>
            <p className="text-sm text-gray-600">
              {t('Your next billing date is January 15, 2024', 'تاريخ الفوترة التالي هو 15 يناير 2024')}
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
