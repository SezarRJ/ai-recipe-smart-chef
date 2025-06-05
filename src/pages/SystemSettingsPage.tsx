
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  Bell, 
  Globe, 
  Settings, 
  HelpCircle, 
  Smartphone, 
  UserX, 
  Award, 
  Shield, 
  Heart,
  ChefHat,
  SlidersHorizontal,
  Weight,
  LogOut
} from 'lucide-react';
import { SignOut } from '@/components/auth/SignOut';
import { useRTL } from '@/contexts/RTLContext';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { useAuth } from '@/hooks/useAuth';

const SystemSettingsPage = () => {
  const { direction, language, t } = useRTL();
  const { user } = useAuth();

  const settingGroups = [
    {
      title: t("Profile & Account", "الملف الشخصي والحساب", "Profil ve Hesap"),
      items: [
        { id: 'profile', icon: <User className="h-6 w-6 text-wasfah-deep-teal" />, label: t("Profile Settings", "إعدادات الملف الشخصي", "Profil Ayarları"), path: "/profile" },
        { id: 'subscription', icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Subscription", "الاشتراك", "Abonelik"), path: "/subscription" },
        { id: 'body-info', icon: <Weight className="h-6 w-6 text-green-600" />, label: t("Body Information", "معلومات الجسم", "Vücut Bilgileri"), path: "/body-information" },
      ]
    },
    {
      title: t("Cooking & Recipes", "الطبخ والوصفات", "Yemek Pişirme ve Tarifler"),
      items: [
        { id: 'favorites', icon: <Heart className="h-6 w-6 text-red-500" />, label: t("Favorites", "المفضلة", "Favoriler"), path: "/favorites" },
        { id: 'my-recipes', icon: <ChefHat className="h-6 w-6 text-orange-500" />, label: t("My Recipes", "وصفاتي", "Tariflerim"), path: "/my-recipes" },
        { id: 'loyalty-program', icon: <Award className="h-6 w-6 text-amber-500" />, label: t("Loyalty Program", "برنامج الولاء", "Sadakat Programı"), path: "/loyalty-program" },
      ]
    },
    {
      title: t("App Settings", "إعدادات التطبيق", "Uygulama Ayarları"),
      items: [
        { id: 'preferences', icon: <SlidersHorizontal className="h-6 w-6 text-purple-600" />, label: t("Preferences", "التفضيلات", "Tercihler"), path: "/preferences" },
        { id: 'notifications', icon: <Bell className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Notifications", "الإشعارات", "Bildirimler"), path: "/notifications" },
        { id: 'connected-devices', icon: <Smartphone className="h-6 w-6 text-green-600" />, label: t("Connected Devices", "الأجهزة المتصلة", "Bağlı Cihazlar"), path: "/connected-devices" },
        { id: 'language', icon: <Globe className="h-6 w-6 text-blue-600" />, label: t("Language", "اللغة", "Dil"), component: <LanguageSelector /> },
      ]
    },
    {
      title: t("Privacy & Security", "الخصوصية والأمان", "Gizlilik ve Güvenlik"),
      items: [
        { id: 'privacy', icon: <Shield className="h-6 w-6 text-green-600" />, label: t("Privacy & Data", "الخصوصية والبيانات", "Gizlilik ve Veri"), path: "/privacy" },
        { id: 'payment-methods', icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Payment Methods", "طرق الدفع", "Ödeme Yöntemleri"), path: "/payment-methods" },
      ]
    },
    {
      title: t("Support & Help", "الدعم والمساعدة", "Destek ve Yardım"),
      items: [
        { id: 'help', icon: <HelpCircle className="h-6 w-6 text-orange-500" />, label: t("Help & Support", "المساعدة والدعم", "Yardım ve Destek"), path: "/help" },
      ]
    }
  ];

  // Add admin panel if user is admin
  if (user?.user_metadata?.isAdmin) {
    settingGroups.push({
      title: t("Administration", "الإدارة", "Yönetim"),
      items: [
        { id: 'admin-panel', icon: <Settings className="h-6 w-6 text-purple-600" />, label: t("Admin Panel", "لوحة الإدارة", "Yönetici Paneli"), path: "/admin" },
      ]
    });
  }

  // Add account management section
  settingGroups.push({
    title: t("Account Management", "إدارة الحساب", "Hesap Yönetimi"),
    items: [
      { id: 'delete-account', icon: <UserX className="h-6 w-6 text-red-500" />, label: t("Delete Account", "حذف الحساب", "Hesabı Sil"), path: "/delete-account" },
    ]
  });

  return (
    <PageContainer header={{ title: t("Settings", "الإعدادات", "Ayarlar"), showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{t("System Settings", "إعدادات النظام", "Sistem Ayarları")}</h1>
          <p className="opacity-90">{t("Manage all your app preferences and account settings", "إدارة جميع تفضيلات التطبيق وإعدادات الحساب", "Tüm uygulama tercihlerinizi ve hesap ayarlarınızı yönetin")}</p>
        </div>

        {/* Render setting groups */}
        {settingGroups.map((group, groupIndex) => (
          <div className="space-y-3" key={groupIndex}>
            <h2 className="text-lg font-bold text-wasfah-deep-teal">{group.title}</h2>
            <div className="grid grid-cols-1 gap-3">
              {group.items.map((item) => (
                <div key={item.id}>
                  {item.path ? (
                    <Link to={item.path}>
                      <Card className="hover:shadow-md transition-all duration-300 card-3d">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="rounded-full p-2 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <div className="text-gray-400">›</div>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <Card className="card-3d">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="rounded-full p-2 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                            {item.icon}
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.component}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign Out Button */}
        <div className="pt-4">
          <Card className="border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="rounded-full p-2 bg-red-50 flex items-center justify-center">
                    <LogOut className="h-6 w-6 text-red-500" />
                  </div>
                  <span className="font-medium text-red-500">{t("Sign Out", "تسجيل الخروج", "Çıkış Yap")}</span>
                </div>
                <SignOut />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default SystemSettingsPage;
