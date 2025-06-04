
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRTL } from '@/contexts/RTLContext';

interface EnhancedButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'success' | 'premium';
  gradient?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    gradient = false, 
    fullWidth = false, 
    icon,
    iconPosition = 'left',
    children,
    ...props 
  }, ref) => {
    const { direction } = useRTL();
    
    const getButtonVariant = (customVariant: string) => {
      switch (customVariant) {
        case 'primary':
        case 'premium':
          return 'default';
        case 'success':
          return 'default';
        default:
          return customVariant as ButtonProps['variant'];
      }
    };

    const getCustomClasses = (customVariant: string) => {
      switch (customVariant) {
        case 'primary':
          return 'bg-wasfah-bright-teal hover:bg-wasfah-teal text-white shadow-lg hover:shadow-xl';
        case 'success':
          return 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl';
        case 'premium':
          return 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl';
        default:
          return '';
      }
    };

    const gradientClasses = gradient ? 'bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-bright-teal' : '';
    
    const iconElement = icon && (
      <span className={cn(
        "flex items-center justify-center",
        children && (iconPosition === 'left' 
          ? (direction === 'rtl' ? 'ml-2' : 'mr-2') 
          : (direction === 'rtl' ? 'mr-2' : 'ml-2'))
      )}>
        {icon}
      </span>
    );

    return (
      <Button
        ref={ref}
        variant={getButtonVariant(variant)}
        className={cn(
          getCustomClasses(variant),
          gradient && gradientClasses,
          fullWidth && 'w-full',
          'font-semibold tracking-wide',
          direction === 'rtl' && 'font-arabic',
          className
        )}
        {...props}
      >
        <span className={cn(
          'flex items-center justify-center',
          direction === 'rtl' && 'flex-row-reverse'
        )}>
          {iconPosition === 'left' && iconElement}
          {children && <span>{children}</span>}
          {iconPosition === 'right' && iconElement}
        </span>
      </Button>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";
