
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MobileHeader } from './MobileHeader';
import { MobileNavbar } from './MobileNavbar';
import { useRTL } from '@/contexts/RTLContext';

interface MobileLayoutProps {
  children: React.ReactNode;
  header?: {
    title?: string;
    showBackButton?: boolean;
    actions?: React.ReactNode;
  };
  hideNavbar?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  header,
  hideNavbar = false,
}) => {
  const { direction } = useRTL();
  const location = useLocation();
  
  // Hide navbar on home page
  const shouldHideNavbar = hideNavbar || location.pathname === '/home' || location.pathname === '/';

  return (
    <div className="mobile-container" dir={direction}>
      {/* Fixed Header */}
      {header && (
        <div className="mobile-header">
          <MobileHeader {...header} />
        </div>
      )}

      {/* Scrollable Content */}
      <div className="mobile-content">
        <div className="p-4 min-h-full">
          {children}
        </div>
      </div>

      {/* Fixed Bottom Toolbar */}
      {!shouldHideNavbar && (
        <div className="mobile-toolbar">
          <MobileNavbar />
        </div>
      )}
    </div>
  );
};
