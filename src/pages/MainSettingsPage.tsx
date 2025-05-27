
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { User, CreditCard, Bell, Moon, Settings, Languages, 
  ShoppingCart, Heart, Camera, Activity, UserCog, Shield, Globe, HelpCircle, Smartphone } from 'lucide-react';
import { SignOut } from '@/components/auth/SignOut';
import { useRTL } from '@/contexts/RTLContext';
import { LanguageSelector } from '@/components/language/LanguageSelector';

const MainSettingsPage = () => {
  const { direction, language, t } = useRTL();
  
  const settingGroups = [
    {
      title: t("User Settings", "إعدادات المستخدم"),
      items: [
        { icon: <User className="h-6 w-6 text-wasfah-deep-teal" />, label: t("Profile", "الملف الشخصي"), path: "/profile" },
        { icon: <UserCog className="h-6 w-6 text-gray-600" />, label: t("Preferences", "التفضيلات"), path: "/dietary-preferences" },
        { icon: <Heart className="h-6 w-6 text-pink-500" />, label: t("Favorites", "المفضلة"), path: "/favorites" },
      ]
    },
    {
      title: t("App Settings", "إعدادات التطبيق"),
      items: [
        { icon: <Bell className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Notifications", "الإشعارات"), path: "/notifications" },
        { icon: <Languages className="h-6 w-6 text-blue-500" />, label: t("Language", "اللغة"), path: "/language-settings" },
        { icon: <Moon className="h-6 w-6 text-purple-600" />, label: t("Appearance", "المظهر"), path: "/appearance" },
      ]
    },
    {
      title: t("Features", "الميزات"),
      items: [
        { icon: <ShoppingCart className="h-6 w-6 text-wasfah-deep-teal" />, label: t("Shopping List", "قائمة التسوق"), path: "/shopping-list" },
        { icon: <Camera className="h-6 w-6 text-amber-500" />, label: t("Scan Dish", "مسح الطبق"), path: "/scan-ingredients" },
        { icon: <Activity className="h-6 w-6 text-red-500" />, label: t("Health Tracking", "تتبع الصحة"), path: "/health-tracking-home" },
        { icon: <Smartphone className="h-6 w-6 text-green-600" />, label: t("Connected Devices", "الأجهزة المتصلة"), path: "/connected-devices" },
      ]
    },
    {
      title: t("Account & Payment", "الحساب والدفع"),
      items: [
        { icon: <Shield className="h-6 w-6 text-green-600" />, label: t("Privacy & Data", "الخصوصية والبيانات"), path: "/privacy" },
        { icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Payment Methods", "طرق الدفع"), path: "/payment-methods" },
        { icon: <HelpCircle className="h-6 w-6 text-orange-500" />, label: t("Help & Support", "المساعدة والدعم"), path: "/help" },
      ]
    }
  ];

  return (
    <PageContainer header={{ title: t("Settings", "الإعدادات"), showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{t("Settings", "الإعدادات")}</h1>
          <p className="opacity-90">{t("Customize your WasfahAI experience", "خصص تجربتك مع وصفة الذكية")}</p>
        </div>
        
        {/* Active Language */}
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-6 w-6 text-wasfah-bright-teal mr-3" />
                <div>
                  <h3 className="font-medium">{t("Language", "اللغة")}</h3>
                  <p className="text-xs text-gray-500">
                    {language === 'ar' ? 'العربية' : language === 'en' ? 'English' : language}
                  </p>
                </div>
              </div>
              <LanguageSelector />
            </div>
          </CardContent>
        </Card>

        {settingGroups.map((group, groupIndex) => (
          <div className="space-y-3" key={groupIndex}>
            <h2 className="text-lg font-bold text-wasfah-deep-teal">{group.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((item, itemIndex) => (
                <Link to={item.path} key={itemIndex}>
                  <Card className="hover:shadow-md transition-all duration-300 card-3d">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <div className="rounded-full p-2 bg-gray-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
        
        {/* Sign Out Button */}
        <div className="pt-4">
          <SignOut />
        </div>
      </div>
    </PageContainer>
  );
};

export default MainSettingsPage;
