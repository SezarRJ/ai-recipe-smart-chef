import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { User, CreditCard, Bell, Moon, Settings, Languages,
  ShoppingCart, Heart, Camera, Activity, UserCog, Shield, Globe, HelpCircle, Smartphone,
  UserX // Import UserX icon for Delete Account
} from 'lucide-react';
import { SignOut } from '@/components/auth/SignOut';
import { useRTL } from '@/contexts/RTLContext';
import { LanguageSelector } from '@/components/language/LanguageSelector';

const MainSettingsPage = () => {
  const { direction, language, t } = useRTL();

  // Define the list of IDs to remove from the settings items
  const idsToRemove = [
    'favorites',
    'language-link', // Removing the link item, keeping the dedicated card
    'shopping-list',
    'scan-dish',
    'health-tracking',
  ];

  // Define the new item to add
  const deleteAccountItem = {
      id: 'delete-account',
      icon: <UserX className="h-6 w-6 text-red-500" />, // Using UserX icon and red color
      label: t("Delete Account", "حذف الحساب", "Hesabı Sil"),
      path: "/delete-account", // Placeholder path for the delete account page/modal
  };

  // Define the original setting groups with added IDs for filtering
  const originalSettingGroups = [
    {
      title: t("User Settings", "إعدادات المستخدم", "Kullanıcı Ayarları"),
      items: [
        { id: 'profile', icon: <User className="h-6 w-6 text-wasfah-deep-teal" />, label: t("Profile", "الملف الشخصي", "Profil"), path: "/profile" },
        { id: 'preferences', icon: <UserCog className="h-6 w-6 text-gray-600" />, label: t("Preferences", "التفضيلات", "Tercihler"), path: "/dietary-preferences" },
        { id: 'favorites', icon: <Heart className="h-6 w-6 text-pink-500" />, label: t("Favorites", "المفضلة", "Favoriler"), path: "/favorites" },
      ]
    },
    {
      title: t("App Settings", "إعدادات التطبيق", "Uygulama Ayarları"),
      items: [
        { id: 'notifications', icon: <Bell className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Notifications", "الإشعارات", "Bildirimler"), path: "/notifications" },
        { id: 'language-link', icon: <Languages className="h-6 w-6 text-blue-500" />, label: t("Language", "اللغة", "Dil"), path: "/language-settings" }, // Added ID
        { id: 'appearance', icon: <Moon className="h-6 w-6 text-purple-600" />, label: t("Appearance", "المظهر", "Görünüm"), path: "/appearance" },
      ]
    },
    {
      title: t("Features", "الميزات", "Özellikler"),
      items: [
        { id: 'shopping-list', icon: <ShoppingCart className="h-6 w-6 text-wasfah-deep-teal" />, label: t("Shopping List", "قائمة التسوق", "Alışveriş Listesi"), path: "/shopping-list" }, // Added ID
        { id: 'scan-dish', icon: <Camera className="h-6 w-6 text-amber-500" />, label: t("Scan Dish", "مسح الطبق", "Yemek Tara"), path: "/scan-ingredients" }, // Added ID
        { id: 'health-tracking', icon: <Activity className="h-6 w-6 text-red-500" />, label: t("Health Tracking", "تتبع الصحة", "Sağlık Takibi"), path: "/health-tracking-home" }, // Added ID
        { id: 'connected-devices', icon: <Smartphone className="h-6 w-6 text-green-600" />, label: t("Connected Devices", "الأجهزة المتصلة", "Bağlı Cihazlar"), path: "/connected-devices" },
      ]
    },
    {
      title: t("Account & Payment", "الحساب والدفع", "Hesap ve Ödeme"),
      items: [
        { id: 'privacy', icon: <Shield className="h-6 w-6 text-green-600" />, label: t("Privacy & Data", "الخصوصية والبيانات", "Gizlilik ve Veri"), path: "/privacy" },
        { id: 'payment-methods', icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Payment Methods", "طرق الدفع", "Ödeme Yöntemleri"), path: "/payment-methods" },
        { id: 'help', icon: <HelpCircle className="h-6 w-6 text-orange-500" />, label: t("Help & Support", "المساعدة والدعم", "Yardım ve Destek"), path: "/help" },
      ]
    }
  ];

  // Process the groups: filter out unwanted items and add the new item
  const processedSettingGroups = originalSettingGroups.map(group => {
      // Filter out items whose IDs are in the idsToRemove list
      let filteredItems = group.items.filter(item => !idsToRemove.includes(item.id));

      // Add the 'Delete Account' item specifically to the 'Account & Payment' group
      if (group.title === t("Account & Payment", "الحساب والدفع", "Hesap ve Ödeme")) {
           // Add the delete account item to the end of this group's items
           filteredItems = [...filteredItems, deleteAccountItem];
      }

      return {
          ...group,
          items: filteredItems
      };
  });


  return (
    <PageContainer header={{ title: t("Settings", "الإعدادات", "Ayarlar"), showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{t("Settings", "الإعدادات", "Ayarlar")}</h1>
          <p className="opacity-90">{t("Customize your WasfahAI experience", "خصص تجربتك مع وصفة الذكية", "WasfahAI deneyiminizi özelleştirin")}</p>
        </div>

        {/* Active Language Card (kept as requested, removing only the link item) */}
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-6 w-6 text-wasfah-bright-teal mr-3 rtl:ml-3 rtl:mr-0" /> {/* Added RTL */}
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

        {/* Render the processed setting groups */}
        {processedSettingGroups.map((group, groupIndex) => (
          <div className="space-y-3" key={groupIndex}>
            {/* Only render group title if there are items in the group */}
            {group.items.length > 0 && (
                <h2 className="text-lg font-bold text-wasfah-deep-teal">{group.title}</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((item) => ( // Use item.id as key if available, fallback to index
                <Link to={item.path} key={item.id || item.label}> {/* Use item.id for key */}
                  <Card className="hover:shadow-md transition-all duration-300 card-3d">
                    <CardContent className="p-4 flex items-center space-x-3 rtl:space-x-reverse"> {/* Added RTL */}
                      <div className="rounded-full p-2 bg-gray-50 dark:bg-gray-800 flex items-center justify-center"> {/* Added dark mode bg */}
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

        {/* Sign Out Button (kept as it wasn't on the remove list for settings) */}
        <div className="pt-4">
          <SignOut />
        </div>
      </div>
    </PageContainer>
  );
};

export default MainSettingsPage;
