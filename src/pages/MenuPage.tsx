
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import {
  Settings, User, Heart, Book, ShoppingCart, CreditCard,
  Bell, Languages, Moon, HelpCircle, Globe, Award, LogOut,
  Camera, Scale, Smartphone, Shield, Wrench, Users, MapPin
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function MenuPage() {
  const { t } = useRTL();

  const menuItems = [
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
      id: 'services',
      icon: <Wrench className="h-6 w-6 text-purple-500" />,
      title: t('Services', 'الخدمات', 'Hizmetler'),
      link: '/services',
    },
    {
      id: 'loyalty',
      icon: <Award className="h-6 w-6 text-amber-500" />,
      title: t('Loyalty Program', 'برنامج الولاء', 'Sadakat Programı'),
      link: '/loyalty-program',
    },
    {
      id: 'subscription',
      icon: <CreditCard className="h-6 w-6 text-purple-500" />,
      title: t('Subscription', 'الاشتراك', 'Abonelik'),
      link: '/subscription',
    },
    {
      id: 'settings',
      icon: <Settings className="h-6 w-6 text-gray-500" />,
      title: t('Settings', 'الإعدادات', 'Ayarlar'),
      link: '/settings',
    },
    {
      id: 'admin',
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: t('Admin Panel', 'لوحة الإدارة', 'Yönetici Paneli'),
      link: '/admin',
    },
  ];

  return (
    <PageContainer header={{ title: t('Menu', 'القائمة', 'Menü') }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{t('Main Menu', 'القائمة الرئيسية', 'Ana Menü')}</h1>
          <p className="opacity-90">{t('Access all features and settings', 'الوصول إلى جميع الميزات والإعدادات', 'Tüm özelliklere ve ayarlara erişin')}</p>
        </div>

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
      </div>
    </PageContainer>
  );
}
