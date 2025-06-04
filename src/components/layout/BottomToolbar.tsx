
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  UtensilsCrossed,
  Sparkles,
  Activity,
  Settings2,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const BottomToolbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Don't show toolbar on admin pages, auth pages, or splash screen
  if (pathname.startsWith('/admin') || pathname === '/auth' || pathname === '/' || pathname === '/splash') {
    return null;
  }

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/home',
      isActive: pathname === '/home'
    },
    {
      icon: UtensilsCrossed,
      label: 'Recipes',
      href: '/recipes',
      isActive: pathname === '/recipes'
    },
    {
      icon: Compass,
      label: 'Cuisine',
      href: '/global-cuisine',
      isActive: pathname === '/global-cuisine'
    },
    {
      icon: Sparkles,
      label: 'AI Features',
      href: '/ai-features',
      isActive: pathname === '/ai-features'
    },
    {
      icon: Activity,
      label: 'Health',
      href: '/health-tracking-home',
      isActive: pathname === '/health-tracking-home'
    },
    {
      icon: Settings2,
      label: 'Settings',
      href: '/settings',
      isActive: pathname === '/settings'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-2 shadow-lg">
      <nav className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center py-2 px-2 rounded-lg transition-all duration-200 min-w-0',
                item.isActive
                  ? 'text-wasfah-bright-teal bg-wasfah-bright-teal/10 scale-105 shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-wasfah-bright-teal hover:scale-105'
              )}
            >
              <Icon className="h-6 w-6 mb-1 transition-transform duration-200" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomToolbar;
