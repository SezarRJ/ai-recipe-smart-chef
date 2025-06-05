
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, Download, Trash2, Eye, Lock } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';

export default function PrivacyDataPage() {
  const { t } = useRTL();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    analytics: true,
    marketing: false,
    thirdParty: false,
    locationData: true,
    cookieTracking: true
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast({
      title: t('Settings Updated', 'تم تحديث الإعدادات'),
      description: t('Your privacy settings have been updated.', 'تم تحديث إعدادات الخصوصية الخاصة بك.'),
    });
  };

  const handleDataExport = () => {
    toast({
      title: t('Export Requested', 'تم طلب التصدير'),
      description: t('Your data export will be ready within 24 hours.', 'سيكون تصدير بياناتك جاهزاً خلال 24 ساعة.'),
    });
  };

  const handleDataDeletion = () => {
    toast({
      title: t('Data Deletion Requested', 'تم طلب حذف البيانات'),
      description: t('Your data deletion request has been submitted.', 'تم إرسال طلب حذف البيانات الخاص بك.'),
      variant: 'destructive',
    });
  };

  return (
    <PageContainer header={{ title: t('Privacy & Data', 'الخصوصية والبيانات'), showBackButton: true }}>
      <div className="space-y-6 pb-24 p-4">
        <div className="bg-gradient-to-br from-green-500 to-blue-600 p-6 rounded-lg text-white text-center mb-6">
          <Shield className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Privacy & Data', 'الخصوصية والبيانات')}</h1>
          <p className="opacity-90">{t('Manage your privacy settings and data', 'إدارة إعدادات الخصوصية والبيانات')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              {t('Privacy Settings', 'إعدادات الخصوصية')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('Analytics Data', 'بيانات التحليلات')}</h4>
                <p className="text-sm text-gray-600">{t('Help improve the app with usage analytics', 'ساعد في تحسين التطبيق من خلال تحليل الاستخدام')}</p>
              </div>
              <Switch
                checked={settings.analytics}
                onCheckedChange={() => handleSettingChange('analytics')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('Marketing Communications', 'الاتصالات التسويقية')}</h4>
                <p className="text-sm text-gray-600">{t('Receive promotional emails and notifications', 'تلقي رسائل البريد الإلكتروني الترويجية والإشعارات')}</p>
              </div>
              <Switch
                checked={settings.marketing}
                onCheckedChange={() => handleSettingChange('marketing')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('Third-party Sharing', 'المشاركة مع أطراف ثالثة')}</h4>
                <p className="text-sm text-gray-600">{t('Allow sharing data with trusted partners', 'السماح بمشاركة البيانات مع الشركاء الموثوقين')}</p>
              </div>
              <Switch
                checked={settings.thirdParty}
                onCheckedChange={() => handleSettingChange('thirdParty')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('Location Data', 'بيانات الموقع')}</h4>
                <p className="text-sm text-gray-600">{t('Use location for local recipes and stores', 'استخدام الموقع للوصفات والمتاجر المحلية')}</p>
              </div>
              <Switch
                checked={settings.locationData}
                onCheckedChange={() => handleSettingChange('locationData')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('Cookie Tracking', 'تتبع ملفات تعريف الارتباط')}</h4>
                <p className="text-sm text-gray-600">{t('Allow cookies for personalized experience', 'السماح بملفات تعريف الارتباط للحصول على تجربة مخصصة')}</p>
              </div>
              <Switch
                checked={settings.cookieTracking}
                onCheckedChange={() => handleSettingChange('cookieTracking')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              {t('Data Management', 'إدارة البيانات')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={handleDataExport}>
                <Download className="h-4 w-4 mr-2" />
                {t('Export My Data', 'تصدير بياناتي')}
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                {t('View Privacy Policy', 'عرض سياسة الخصوصية')}
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                {t('View Terms of Service', 'عرض شروط الخدمة')}
              </Button>
              
              <Button variant="destructive" className="w-full justify-start" onClick={handleDataDeletion}>
                <Trash2 className="h-4 w-4 mr-2" />
                {t('Request Data Deletion', 'طلب حذف البيانات')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">{t('Data We Collect', 'البيانات التي نجمعها')}</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>{t('Account information (email, name)', 'معلومات الحساب (البريد الإلكتروني، الاسم)')}</li>
              <li>{t('Recipe preferences and cooking history', 'تفضيلات الوصفات وتاريخ الطبخ')}</li>
              <li>{t('Device information and app usage', 'معلومات الجهاز واستخدام التطبيق')}</li>
              <li>{t('Location data (if enabled)', 'بيانات الموقع (إذا تم تمكينها)')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
