
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { User, CreditCard, Bell, Moon, Settings, Languages,
  HelpCircle, Smartphone, UserX, Award, Globe, Shield
} from 'lucide-react';
import { SignOut } from '@/components/auth/SignOut';
import { useRTL } from '@/contexts/RTLContext';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { useAuth } from '@/hooks/useAuth';

const MainSettingsPage = () => {
  const { direction, language, t } = useRTL();
  const { user } = useAuth();

  const settingGroups = [
    {
      title: t("User Settings", "إعدادات المستخدم", "Kullanıcı Ayarları"),
      items: [
        { id: 'profile', icon: <User className="h-6 w-6 text-wasfah-deep-teal" />, label: t("Profile", "الملف الشخصي", "Profil"), path: "/profile" },
        { id: 'preferences', icon: <UserX className="h-6 w-6 text-gray-600" />, label: t("Preferences", "التفضيلات", "Tercihler"), path: "/dietary-preferences" },
      ]
    },
    {
      title: t("App Settings", "إعدادات التطبيق", "Uygulama Ayarları"),
      items: [
        { id: 'notifications', icon: <Bell className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Notifications", "الإشعارات", "Bildirimler"), path: "/notifications" },
        { id: 'appearance', icon: <Moon className="h-6 w-6 text-purple-600" />, label: t("Appearance", "المظهر", "Görünüm"), path: "/appearance" },
        { id: 'connected-devices', icon: <Smartphone className="h-6 w-6 text-green-600" />, label: t("Connected Devices", "الأجهزة المتصلة", "Bağlı Cihazlar"), path: "/connected-devices" },
      ]
    },
    {
      title: t("Services", "الخدمات", "Hizmetler"),
      items: [
        { id: 'loyalty-program', icon: <Award className="h-6 w-6 text-amber-500" />, label: t("Loyalty Program", "برنامج الولاء", "Sadakat Programı"), path: "/loyalty-program" },
        { id: 'subscription', icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Subscription", "الاشتراك", "Abonelik"), path: "/subscription" },
      ]
    },
    {
      title: t("Account & Support", "الحساب والدعم", "Hesap ve Destek"),
      items: [
        { id: 'privacy', icon: <Shield className="h-6 w-6 text-green-600" />, label: t("Privacy & Data", "الخصوصية والبيانات", "Gizlilik ve Veri"), path: "/privacy" },
        { id: 'payment-methods', icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Payment Methods", "طرق الدفع", "Ödeme Yöntemleri"), path: "/payment-methods" },
        { id: 'help', icon: <HelpCircle className="h-6 w-6 text-orange-500" />, label: t("Help & Support", "المساعدة والدعم", "Yardım ve Destek"), path: "/help" },
        { id: 'delete-account', icon: <UserX className="h-6 w-6 text-red-500" />, label: t("Delete Account", "حذف الحساب", "Hesabı Sil"), path: "/delete-account" },
      ]
    }
  ];

  // Add admin panel - check multiple conditions for admin access
  const isAdmin = user?.role === 'admin' || 
                  user?.role === 'super_admin' || 
                  user?.user_metadata?.isAdmin ||
                  user?.email === 'admin@wasfah.ai'; // fallback for demo

  if (isAdmin) {
    settingGroups.push({
      title: t("Administration", "الإدارة", "Yönetim"),
      items: [
        { id: 'admin-panel', icon: <Settings className="h-6 w-6 text-purple-600" />, label: t("Admin Panel", "لوحة الإدارة", "Yönetici Paneli"), path: "/admin" },
      ]
    });
  }

  return (
    <PageContainer header={{ title: t("Settings", "الإعدادات", "Ayarlar"), showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{t("Settings", "الإعدادات", "Ayarlar")}</h1>
          <p className="opacity-90">{t("Customize your WasfahAI experience", "خصص تجربتك مع وصفة الذكية", "WasfahAI deneyiminizi özelleştirin")}</p>
        </div>

        {/* Active Language Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-6 w-6 text-wasfah-bright-teal mr-3 rtl:ml-3 rtl:mr-0" />
                <div>
                  <h3 className="font-medium">{t("Language", "اللغة", "Dil")}</h3>
                  <p className="text-xs text-gray-500">
                    {language === 'ar' ? 'العربية' : language === 'en' ? 'English' : language === 'tr' ? 'Türkçe' : language}
                  </p>
                </div>
              </div>
              <LanguageSelector />
            </div>
          </CardContent>
        </Card>

        {/* Render setting groups */}
        {settingGroups.map((group, groupIndex) => (
          <div className="space-y-3" key={groupIndex}>
            <h2 className="text-lg font-bold text-wasfah-deep-teal">{group.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((item) => (
                <Link to={item.path} key={item.id}>
                  <Card className="hover:shadow-md transition-all duration-300 card-3d">
                    <CardContent className="p-4 flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="rounded-full p-2 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
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
