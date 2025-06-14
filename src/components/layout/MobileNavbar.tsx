
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Camera, BarChart3, Menu } from 'lucide-react';
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
      icon: Search,
      label: t('Find', 'البحث'),
      href: '/ai-find-by-ingredients',
    },
    {
      icon: Camera,
      label: t('Scan', 'المسح'),
      href: '/scan-dish',
    },
    {
      icon: BarChart3,
      label: t('Track', 'التتبع'),
      href: '/health-tracking-home',
    },
    {
      icon: Menu,
      label: t('Menu', 'القائمة'),
      href: '/menu',
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
