
import React from 'react';
import { useRTL } from '@/contexts/RTLContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { cn } from '@/lib/utils';

interface EnhancedPageContainerProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  showBottomToolbar?: boolean;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const EnhancedPageContainer: React.FC<EnhancedPageContainerProps> = ({
  children,
  showNavigation = true,
  showBottomToolbar = true,
  className = '',
  fullWidth = false,
  noPadding = false,
}) => {
  const { direction } = useRTL();
  const { language } = useLanguage();
  
  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300",
        direction === 'rtl' && 'font-arabic text-right'
      )}
      dir={direction}
      lang={language}
    >
      {showNavigation && <Navigation />}
      
      <main className={cn(
        'flex-grow transition-all duration-300 smooth-scroll',
        showNavigation ? 'pt-16' : '',
        showBottomToolbar ? 'pb-20' : 'pb-6',
        className
      )}>
        <div className={cn(
          fullWidth ? 'w-full' : 'container mx-auto max-w-7xl',
          noPadding ? '' : 'px-4 py-6',
          'min-h-full'
        )}>
          {children}
        </div>
      </main>
    </div>
  );
};
