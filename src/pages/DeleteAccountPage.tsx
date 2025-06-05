
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function DeleteAccountPage() {
  const { t } = useRTL();
  const [confirmText, setConfirmText] = useState('');
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);

  const isDeleteEnabled = confirmText === 'DELETE' && confirmCheckbox;

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setConfirmCheckbox(checked === true);
  };

  return (
    <PageContainer header={{ title: t('Delete Account', 'حذف الحساب'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-lg text-white text-center mb-6">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Delete Account', 'حذف الحساب')}</h1>
          <p className="opacity-90">{t('This action cannot be undone', 'هذا الإجراء لا يمكن التراجع عنه')}</p>
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center">
              <Trash2 className="h-5 w-5 mr-2" />
              {t('Warning', 'تحذير')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {t('Deleting your account will permanently remove:', 'حذف حسابك سيؤدي إلى إزالة دائمة لـ:')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                <li>{t('All your recipes and meal plans', 'جميع وصفاتك وخطط الوجبات')}</li>
                <li>{t('Your profile and cooking history', 'ملفك الشخصي وتاريخ الطبخ')}</li>
                <li>{t('Saved favorites and preferences', 'المفضلات والتفضيلات المحفوظة')}</li>
                <li>{t('Subscription and payment information', 'معلومات الاشتراك والدفع')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t('Type "DELETE" to confirm:', 'اكتب "DELETE" للتأكيد:')}
              </label>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="border-red-200 focus:border-red-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm-delete"
                checked={confirmCheckbox}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="confirm-delete" className="text-sm">
                {t('I understand this action is permanent and irreversible', 'أفهم أن هذا الإجراء دائم ولا يمكن إلغاؤه')}
              </label>
            </div>

            <Button
              variant="destructive"
              className="w-full"
              disabled={!isDeleteEnabled}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('Delete My Account Forever', 'حذف حسابي إلى الأبد')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">{t('Need help instead?', 'تحتاج مساعدة بدلاً من ذلك؟')}</h4>
            <p className="text-sm text-gray-600 mb-4">
              {t('If you are having issues with your account, our support team can help.', 'إذا كنت تواجه مشاكل مع حسابك، يمكن لفريق الدعم مساعدتك.')}
            </p>
            <Button variant="outline" className="w-full">
              {t('Contact Support', 'الاتصال بالدعم')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
