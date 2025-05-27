
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimationWrapperProps {
  children: React.ReactNode;
  type?: 'fade' | 'scale' | 'slide';
  delay?: number;
  className?: string;
}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  type = 'fade',
  delay = 0,
  className = ''
}) => {
  const animationClasses = {
    fade: 'animate-fade-in',
    scale: 'animate-scale-in',
    slide: 'animate-slide-in-right'
  };

  return (
    <div 
      className={cn(animationClasses[type], className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface ResponsiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-wasfah-orange hover:bg-wasfah-orange/90 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700'
  };

  return (
    <Button
      className={cn(
        'transition-all duration-200 hover:scale-105 active:scale-95',
        variantClasses[variant],
        className
      )}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};
