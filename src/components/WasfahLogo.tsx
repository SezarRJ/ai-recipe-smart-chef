
import React from 'react';

interface WasfahLogoProps {
  className?: string;
}

export const WasfahLogo: React.FC<WasfahLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-wasfah-orange to-wasfah-bright-teal rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-2xl">W</span>
      </div>
    </div>
  );
};
