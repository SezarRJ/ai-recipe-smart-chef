
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Menu, Heart, Camera, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useRTL } from '@/contexts/RTLContext';

export const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const { t } = useRTL();
  const isDarkMode = theme === 'dark';

  const navItems = [
    {
      icon: Home,
      label: t('Home', 'الرئيسية'),
      href: '/',
    },
    {
      icon: Search,
      label: t('Find', 'البحث'),
      href: '/find-by-ingredients',
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
    <div className={cn(
      "fixed bottom-0 left-0 right-0 border-t z-50 shadow-lg",
      isDarkMode
        ? "bg-gray-900 border-gray-800 text-white"
        : "bg-white border-gray-200"
    )}>
      <nav className="flex justify-around py-3">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={index}
              to={item.href}
              className={cn(
                'flex flex-col items-center px-4 py-2 rounded-md transition-all relative',
                isActive
                  ? 'text-wasfah-bright-teal'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <div className="relative">
                {isActive && (
                  <motion.div 
                    layoutId="navIndicator"
                    className={cn(
                      "absolute -inset-1.5 rounded-full",
                      isDarkMode ? "bg-wasfah-bright-teal/10" : "bg-wasfah-bright-teal/10"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <item.icon 
                  size={20} 
                  className={cn(
                    "relative",
                    isActive && "animate-pulse-glow"
                  )} 
                />
              </div>
              <span className={cn(
                "text-xs mt-1 font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="underline"
                  className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-wasfah-bright-teal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
