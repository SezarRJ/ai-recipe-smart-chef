
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Settings as SettingsIcon
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { t, direction } = useRTL();
  const navigate = useNavigate();

  const quickSettings = [
    {
      icon: Moon,
      label: t("Dark Mode", "الوضع المظلم"),
      description: t("Toggle dark theme", "تبديل المظهر المظلم"),
      hasToggle: true,
      isEnabled: false
    },
    {
      icon: Bell,
      label: t("Notifications", "الإشعارات"),
      description: t("Manage notification preferences", "إدارة تفضيلات الإشعارات"),
      hasToggle: true,
      isEnabled: true
    },
    {
      icon: Globe,
      label: t("Language", "اللغة"),
      description: t("Change app language", "تغيير لغة التطبيق"),
      hasToggle: false,
      currentValue: direction === 'rtl' ? 'العربية' : 'English'
    }
  ];

  return (
    <PageContainer
      header={{
        title: t("Settings", "الإعدادات"),
        showBackButton: true
      }}
      className="pb-24"
    >
      <div className={`space-y-6 p-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`} dir={direction}>
        {/* Header */}
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center">
          <h1 className="text-2xl font-bold mb-2">{t("Quick Settings", "الإعدادات السريعة")}</h1>
          <p className="opacity-90">{t("Access frequently used settings", "الوصول إلى الإعدادات المستخدمة بكثرة")}</p>
        </div>

        {/* Quick Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("Quick Access", "وصول سريع")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickSettings.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <div 
                  key={itemIndex}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-wasfah-bright-teal/10 rounded-lg">
                      <Icon className="h-5 w-5 text-wasfah-bright-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                      {item.currentValue && (
                        <p className="text-sm text-wasfah-bright-teal">
                          {t("Current", "الحالي")}: {item.currentValue}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.hasToggle ? (
                      <Switch 
                        checked={item.isEnabled} 
                        onCheckedChange={() => {}}
                      />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* All Settings Button */}
        <Card>
          <CardContent className="p-4">
            <Button 
              variant="default" 
              className="w-full flex items-center justify-between bg-wasfah-bright-teal hover:bg-wasfah-teal"
              onClick={() => navigate('/system-settings')}
            >
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                {t("All Settings", "جميع الإعدادات")}
              </div>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/profile')}>
            <CardContent className="p-4 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-wasfah-bright-teal" />
              <h3 className="font-medium">{t("Profile", "الملف الشخصي")}</h3>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/privacy')}>
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-medium">{t("Privacy", "الخصوصية")}</h3>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/subscription')}>
            <CardContent className="p-4 text-center">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-medium">{t("Subscription", "الاشتراك")}</h3>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/help')}>
            <CardContent className="p-4 text-center">
              <LogOut className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <h3 className="font-medium">{t("Help", "المساعدة")}</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
