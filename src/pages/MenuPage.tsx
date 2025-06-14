
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import {
  Settings, Heart, Book, CreditCard,
  Wrench, Award, Shield
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function MenuPage() {
  const { t } = useRTL();

  const menuItems = [
    {
      id: 'favorites',
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: t('Favorites', 'المفضلة', 'Favoriler'),
      link: '/favorites',
      bg: 'bg-red-100'
    },
    {
      id: 'recipes',
      icon: <Book className="h-8 w-8 text-wasfah-deep-teal" />,
      title: t('My Recipes', 'وصفاتي', 'Tariflerim'),
      link: '/recipes',
      bg: 'bg-teal-100'
    },
    {
      id: 'services',
      icon: <Wrench className="h-8 w-8 text-purple-500" />,
      title: t('Services', 'الخدمات', 'Hizmetler'),
      link: '/services',
      bg: 'bg-purple-100'
    },
    {
      id: 'loyalty',
      icon: <Award className="h-8 w-8 text-amber-500" />,
      title: t('Loyalty Program', 'برنامج الولاء', 'Sadakat Programı'),
      link: '/loyalty-program',
      bg: 'bg-yellow-100'
    },
    {
      id: 'subscription',
      icon: <CreditCard className="h-8 w-8 text-purple-500" />,
      title: t('Subscription', 'الاشتراك', 'Abonelik'),
      link: '/subscription',
      bg: 'bg-purple-100'
    },
    {
      id: 'settings',
      icon: <Settings className="h-8 w-8 text-gray-500" />,
      title: t('Settings', 'الإعدادات', 'Ayarlar'),
      link: '/settings',
      bg: 'bg-gray-100'
    },
    {
      id: 'admin',
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: t('Admin Panel', 'لوحة الإدارة', 'Yönetici Paneli'),
      link: '/admin',
      bg: 'bg-purple-200'
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
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 group">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <div className={`w-20 h-20 ${item.bg} rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                    {item.title}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
