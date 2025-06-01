
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, 
  ChefHat, 
  BarChart3, 
  Settings, 
  Globe, 
  BookOpen,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const AdminDashboardArabic: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  const stats = [
    {
      title: t('admin.users') || 'Users',
      value: '12,540',
      icon: Users,
      change: '+12%',
      color: 'text-blue-600'
    },
    {
      title: t('admin.recipes') || 'Recipes',
      value: '8,230',
      icon: ChefHat,
      change: '+8%',
      color: 'text-green-600'
    },
    {
      title: t('admin.analytics') || 'Analytics',
      value: '94.2%',
      icon: TrendingUp,
      change: '+2.1%',
      color: 'text-purple-600'
    },
    {
      title: t('admin.content') || 'Content',
      value: '2,150',
      icon: BookOpen,
      change: '+15%',
      color: 'text-orange-600'
    }
  ];

  const menuItems = [
    { title: t('admin.dashboard') || 'Dashboard', icon: BarChart3, active: true },
    { title: t('admin.users') || 'Users', icon: Users, active: false },
    { title: t('admin.recipes') || 'Recipes', icon: ChefHat, active: false },
    { title: t('admin.content') || 'Content', icon: BookOpen, active: false },
    { title: t('admin.translations') || 'Translations', icon: Globe, active: false },
    { title: t('admin.settings') || 'Settings', icon: Settings, active: false }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('admin.dashboard') || 'Admin Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'ar' ? 'مرحباً، المشرف' : 'Welcome, Admin'}
              </span>
              <UserCheck className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      item.active
                        ? 'bg-wasfah-bright-teal text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    } ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <Icon size={20} />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={isRTL ? 'text-right' : ''}>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                        <p className={`text-sm ${stat.color} font-medium`}>
                          {stat.change} {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
                        </p>
                      </div>
                      <Icon className={`w-12 h-12 ${stat.color} opacity-60`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className={isRTL ? 'text-right' : ''}>
                {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isRTL ? 'text-right' : ''}`}>
                <Button className="h-20 flex flex-col gap-2 bg-wasfah-bright-teal hover:bg-wasfah-teal">
                  <ChefHat size={24} />
                  {language === 'ar' ? 'إضافة وصفة جديدة' : 'Add New Recipe'}
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Users size={24} />
                  {language === 'ar' ? 'إدارة المستخدمين' : 'Manage Users'}
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Globe size={24} />
                  {language === 'ar' ? 'إدارة الترجمات' : 'Manage Translations'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? 'text-right' : ''}>
                {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: language === 'ar' ? 'تم إضافة وصفة جديدة' : 'New recipe added',
                    user: language === 'ar' ? 'المستخدم أحمد' : 'User Ahmed',
                    time: language === 'ar' ? 'منذ 5 دقائق' : '5 minutes ago'
                  },
                  {
                    action: language === 'ar' ? 'تم تحديث الترجمات' : 'Translations updated',
                    user: language === 'ar' ? 'المشرف' : 'Admin',
                    time: language === 'ar' ? 'منذ 15 دقيقة' : '15 minutes ago'
                  },
                  {
                    action: language === 'ar' ? 'مستخدم جديد مسجل' : 'New user registered',
                    user: language === 'ar' ? 'المستخدم فاطمة' : 'User Fatima',
                    time: language === 'ar' ? 'منذ 30 دقيقة' : '30 minutes ago'
                  }
                ].map((activity, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.user}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardArabic;
