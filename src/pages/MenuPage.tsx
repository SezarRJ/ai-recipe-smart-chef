
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Settings, User, Heart, Book, ShoppingCart, CreditCard,
  Bell, Languages, Moon, HelpCircle, Globe, Award, LogOut,
  Gift, Camera, Scale, Smartphone, SquareUser, Shield
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function MenuPage() {
  const { t } = useRTL();

  const menuItems = [
    {
      id: 'profile',
      icon: <User className="h-6 w-6 text-indigo-500" />,
      title: t('Profile', 'الملف الشخصي', 'Profil'),
      link: '/profile',
    },
    {
      id: 'favorites',
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: t('Favorites', 'المفضلة', 'Favoriler'),
      link: '/favorites',
    },
    {
      id: 'recipes',
      icon: <Book className="h-6 w-6 text-wasfah-deep-teal" />,
      title: t('My Recipes', 'وصفاتي', 'Tariflerim'),
      link: '/recipes',
    },
    {
      id: 'shopping',
      icon: <ShoppingCart className="h-6 w-6 text-wasfah-bright-teal" />,
      title: t('Shopping List', 'قائمة التسوق', 'Alışveriş Listesi'),
      link: '/shopping-list',
    },
    {
      id: 'loyalty',
      icon: <Award className="h-6 w-6 text-amber-500" />,
      title: t('Loyalty Program', 'برنامج الولاء', 'Sadakat Programı'),
      link: '/loyalty',
    },
    {
      id: 'scan-dish',
      icon: <Camera className="h-6 w-6 text-green-500" />,
      title: t('Scan Dish', 'مسح طبق', 'Yemek Tara'),
      link: '/scan-dish',
    },
    {
      id: 'body-information',
      icon: <Scale className="h-6 w-6 text-blue-500" />,
      title: t('Body Information', 'معلومات الجسم', 'Vücut Bilgisi'),
      link: '/body-information',
    },
    {
      id: 'subscription',
      icon: <CreditCard className="h-6 w-6 text-purple-500" />,
      title: t('Subscription', 'الاشتراك', 'Abonelik'),
      link: '/subscription',
    },
  ];

  const settingsItems = [
    {
      id: 'general',
      icon: <Settings className="h-6 w-6 text-gray-500" />,
      title: t('Settings', 'الإعدادات', 'Ayarlar'),
      link: '/settings',
    },
    {
      id: 'notifications',
      icon: <Bell className="h-6 w-6 text-orange-500" />,
      title: t('Notifications', 'الإشعارات', 'Bildirimler'),
      link: '/notifications',
    },
    {
      id: 'language',
      icon: <Globe className="h-6 w-6 text-green-500" />,
      title: t('Language', 'اللغة', 'Dil'),
      link: '/language-settings',
    },
    {
      id: 'appearance',
      icon: <Moon className="h-6 w-6 text-indigo-500" />,
      title: t('Appearance', 'المظهر', 'Görünüm'),
      link: '/appearance',
    },
    {
      id: 'connected-devices',
      icon: <Smartphone className="h-6 w-6 text-blue-500" />,
      title: t('Connected Devices', 'الأجهزة المتصلة', 'Bağlı Cihazlar'),
      link: '/connected-devices',
    },
    {
      id: 'help',
      icon: <HelpCircle className="h-6 w-6 text-wasfah-deep-teal" />,
      title: t('Help & Support', 'المساعدة والدعم', 'Yardım ve Destek'),
      link: '/help',
    },
    {
      id: 'admin',
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: t('Admin Panel', 'لوحة الإدارة', 'Yönetici Paneli'),
      link: '/admin/login',
    },
  ];

  return (
    <PageContainer header={{ title: t('Menu', 'القائمة', 'Menü') }}>
      <div className="space-y-6 pb-20">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="menu">{t('Menu', 'القائمة', 'Menü')}</TabsTrigger>
            <TabsTrigger value="settings">{t('Settings', 'الإعدادات', 'Ayarlar')}</TabsTrigger>
          </TabsList>
          <TabsContent value="menu" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <Link to={item.link} key={item.id}>
                  <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.03] h-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-full mb-4">
                        {item.icon}
                      </div>
                      <span className="text-base font-medium">{item.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {settingsItems.map((item) => (
                <Link to={item.link} key={item.id}>
                  <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.03] h-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-full mb-4">
                        {item.icon}
                      </div>
                      <span className="text-base font-medium">{item.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              <Link to="/auth">
                <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.03] h-full border-red-200 dark:border-red-700/30">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-4">
                      <LogOut className="h-6 w-6 text-red-500" />
                    </div>
                    <span className="text-base font-medium text-red-600 dark:text-red-400">
                      {t('Log Out', 'تسجيل الخروج', 'Çıkış Yap')}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
