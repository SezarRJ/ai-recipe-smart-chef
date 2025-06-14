import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRTL } from '@/contexts/RTLContext';

interface MobileHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  actions?: React.ReactNode;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title = "WasfahAI",
  showBackButton = false,
  onBackClick,
  actions,
}) => {
  const navigate = useNavigate();
  const { direction } = useRTL();
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={`h-full flex items-center justify-between px-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
      {/* Left Side */}
      <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Back"
          >
            {/* Responsive chevron: rotate 180deg for RTL */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-chevron-left h-5 w-5 transition-transform duration-150 ${direction === 'rtl' ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </Button>
        )}
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-teal rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800 truncate">{title}</h1>
        </div>
      </div>

      {/* Right Side */}
      <div className={`flex items-center gap-1 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <Share2 className="h-5 w-5" />
        </Button>
        {actions}
      </div>
    </header>
  );
};
