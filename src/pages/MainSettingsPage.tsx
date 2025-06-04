
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { User, CreditCard, Bell, Moon, Settings, Languages,
  HelpCircle, Smartphone, UserX, Award, Globe, Shield, Crown
} from 'lucide-react';
import { SignOut } from '@/components/auth/SignOut';
import { useRTL } from '@/contexts/RTLContext';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'react-router-dom';

const MainSettingsPage = () => {
  const { direction, language, t } = useRTL();
  const { user } = useAuth();
  const { lang } = useParams();
  const currentLang = lang || language || 'en';

  const settingGroups = [
    {
      title: t("User Settings", "إعدادات المستخدم", "Kullanıcı Ayarları"),
      items: [
        { id: 'profile', icon: <User className="h-6 w-6 text-wasfah-deep-teal" />, label: t("Profile", "الملف الشخصي", "Profil"), path: `/${currentLang}/profile` },
        { id: 'preferences', icon: <UserX className="h-6 w-6 text-gray-600" />, label: t("Dietary Preferences", "التفضيلات الغذائية", "Beslenme Tercihleri"), path: `/${currentLang}/dietary-preferences` },
      ]
    },
    {
      title: t("App Settings", "إعدادات التطبيق", "Uygulama Ayarları"),
      items: [
        { id: 'notifications', icon: <Bell className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Notifications", "الإشعارات", "Bildirimler"), path: `/${currentLang}/notifications` },
        { id: 'appearance', icon: <Moon className="h-6 w-6 text-purple-600" />, label: t("Appearance", "المظهر", "Görünüm"), path: `/${currentLang}/appearance` },
        { id: 'connected-devices', icon: <Smartphone className="h-6 w-6 text-green-600" />, label: t("Connected Devices", "الأجهزة المتصلة", "Bağlı Cihazlar"), path: `/${currentLang}/connected-devices` },
      ]
    },
    {
      title: t("Services", "الخدمات", "Hizmetler"),
      items: [
        { id: 'loyalty-program', icon: <Award className="h-6 w-6 text-amber-500" />, label: t("Loyalty Program", "برنامج الولاء", "Sadakat Programı"), path: `/${currentLang}/loyalty-program` },
        { id: 'subscription', icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Subscription", "الاشتراك", "Abonelik"), path: `/${currentLang}/subscription` },
      ]
    },
    {
      title: t("Account & Support", "الحساب والدعم", "Hesap ve Destek"),
      items: [
        { id: 'privacy', icon: <Shield className="h-6 w-6 text-green-600" />, label: t("Privacy & Data", "الخصوصية والبيانات", "Gizlilik ve Veri"), path: `/${currentLang}/privacy` },
        { id: 'payment-methods', icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Payment Methods", "طرق الدفع", "Ödeme Yöntemleri"), path: `/${currentLang}/payment-methods` },
        { id: 'help', icon: <HelpCircle className="h-6 w-6 text-orange-500" />, label: t("Help & Support", "المساعدة والدعم", "Yardım ve Destek"), path: `/${currentLang}/help` },
        { id: 'delete-account', icon: <UserX className="h-6 w-6 text-red-500" />, label: t("Delete Account", "حذف الحساب", "Hesabı Sil"), path: `/${currentLang}/delete-account` },
      ]
    }
  ];

  // Add admin panel if user is admin
  if (user?.user_metadata?.isAdmin) {
    settingGroups.unshift({
      title: t("Administration", "الإدارة", "Yönetim"),
      items: [
        { id: 'admin-panel', icon: <Crown className="h-6 w-6 text-purple-600" />, label: t("Admin Panel", "لوحة الإدارة", "Yönetici Paneli"), path: "/admin" },
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

        {/* Admin Panel Access - Show prominently for admins */}
        {user?.user_metadata?.isAdmin && (
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 mb-6">
            <CardContent className="p-4">
              <Link to="/admin" className="block">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="rounded-full p-3 bg-purple-600 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-purple-900">{t("Admin Panel", "لوحة الإدارة", "Yönetici Paneli")}</h3>
                    <p className="text-sm text-purple-700">{t("Manage app settings and content", "إدارة إعدادات التطبيق والمحتوى", "Uygulama ayarlarını ve içeriği yönetin")}</p>
                  </div>
                  <div className="text-purple-600">›</div>
                </div>
              </Link>
            </CardContent>
          </Card>
        )}

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
