
import React from 'react';
import { MobileHeader } from './MobileHeader';
import { MobileNavbar } from './MobileNavbar';
import { useRTL } from '@/contexts/RTLContext';

interface PageContainerProps {
  children: React.ReactNode;
  header?: {
    title?: string;
    showBackButton?: boolean;
    showSearch?: boolean;
    showLogo?: boolean;
    actions?: React.ReactNode;
  };
  hideNavbar?: boolean;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  header,
  hideNavbar = false,
  className = '',
  fullWidth = false,
  noPadding = false,
}) => {
  const { direction } = useRTL();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-wasfah-light-gray via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden" dir={direction}>
      {header && <MobileHeader {...header} />}
      <main className={cn(
        'flex-grow',
        hideNavbar ? 'pb-6' : 'pb-24',
        'transition-all duration-300',
        className
      )}>
        <div className={cn(
          fullWidth ? 'w-full' : 'container mx-auto max-w-lg',
          noPadding ? '' : 'px-4 py-4',
          'min-h-full',
          direction === 'rtl' && 'font-arabic'
        )}>
          {children}
        </div>
      </main>
      {!hideNavbar && <MobileNavbar />}
    </div>
  );
};

// Helper function for className merging
function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
