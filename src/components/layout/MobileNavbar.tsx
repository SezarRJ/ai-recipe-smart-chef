
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Sparkles, Activity, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRTL } from '@/contexts/RTLContext';

export const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const { t, direction } = useRTL();

  const navItems = [
    {
      icon: Home,
      label: t('Home', 'الرئيسية'),
      href: '/home',
    },
    {
      icon: Utensils,
      label: t('Cuisine', 'المطبخ'),
      href: '/global-cuisine',
    },
    {
      icon: Sparkles,
      label: t('AI Features', 'ميزات الذكاء'),
      href: '/ai-features',
    },
    {
      icon: Activity,
      label: t('Health', 'الصحة'),
      href: '/health-tracking-home',
    },
    {
      icon: Settings,
      label: t('Settings', 'الإعدادات'),
      href: '/settings',
    },
  ];

  return (
    <nav className={cn(
      "flex justify-around items-center h-full px-2",
      direction === 'rtl' && "flex-row-reverse"
    )}>
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.href;
        
        return (
          <Link
            key={index}
            to={item.href}
            className={cn(
              'nav-item flex flex-col items-center px-2 py-1 rounded-lg transition-all relative flex-1',
              isActive
                ? 'text-wasfah-bright-teal bg-wasfah-bright-teal/10'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <item.icon size={20} className={cn(isActive && "animate-pulse-glow")} />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
            {isActive && (
              <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-wasfah-bright-teal" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
