
import React from 'react';

// Enhanced animation utilities for consistent app-wide animations
export const AnimationWrapper: React.FC<{
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'bounce' | 'pulse';
  delay?: number;
  duration?: 'fast' | 'normal' | 'slow';
  className?: string;
}> = ({ 
  children, 
  type = 'fade', 
  delay = 0, 
  duration = 'normal',
  className = '' 
}) => {
  const getAnimationClass = () => {
    const durationClass = {
      fast: 'duration-200',
      normal: 'duration-300',
      slow: 'duration-500'
    }[duration];

    const animationClass = {
      fade: 'animate-fade-in',
      slide: 'animate-slide-in',
      scale: 'animate-scale-in',
      bounce: 'animate-bounce',
      pulse: 'animate-pulse-glow'
    }[type];

    return `${animationClass} ${durationClass}`;
  };

  return (
    <div 
      className={`${getAnimationClass()} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Card hover animation component
export const AnimatedCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, className = '', onClick, disabled = false }) => {
  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-lg hover:-translate-y-1 cursor-pointer'
        }
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
};

// Button with enhanced feedback
export const ResponsiveButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}> = ({ children, onClick, disabled = false, variant = 'primary', className = '' }) => {
  const getVariantClasses = () => {
    if (disabled) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50';
    }

    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal text-white hover:from-wasfah-teal hover:to-wasfah-deep-teal';
      case 'secondary':
        return 'bg-wasfah-light-gray text-wasfah-deep-teal hover:bg-gray-200';
      case 'ghost':
        return 'bg-transparent text-wasfah-bright-teal hover:bg-wasfah-light-gray';
      default:
        return 'bg-wasfah-bright-teal text-white hover:bg-wasfah-teal';
    }
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium
        transform transition-all duration-200 ease-out
        active:scale-95 hover:scale-105
        hover:shadow-md active:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-wasfah-bright-teal focus:ring-opacity-50
        ${getVariantClasses()}
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};

// Loading animation component
export const LoadingSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}> = ({ size = 'md', color = 'wasfah-bright-teal' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-200 border-t-${color} ${sizeClasses[size]}`} />
  );
};

// Staggered animation for lists
export const StaggeredList: React.FC<{
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 100, className = '' }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimationWrapper 
          type="fade" 
          delay={index * staggerDelay}
          key={index}
        >
          {child}
        </AnimationWrapper>
      ))}
    </div>
  );
};
