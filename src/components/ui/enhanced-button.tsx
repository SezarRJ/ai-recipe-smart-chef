
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'success';
  gradient?: boolean;
  fullWidth?: boolean;
}

export const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant = 'default', gradient = false, fullWidth = false, ...props }, ref) => {
    // Map custom variants to standard button variants
    const getButtonVariant = (customVariant: string) => {
      switch (customVariant) {
        case 'primary':
          return 'default';
        case 'success':
          return 'default';
        default:
          return customVariant as ButtonProps['variant'];
      }
    };

    // Get custom styling for special variants
    const getCustomClasses = (customVariant: string) => {
      switch (customVariant) {
        case 'primary':
          return 'bg-wasfah-bright-teal hover:bg-wasfah-teal text-white';
        case 'success':
          return 'bg-green-500 hover:bg-green-600 text-white';
        default:
          return '';
      }
    };

    const gradientClasses = gradient ? 'bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-bright-teal' : '';
    
    return (
      <Button
        ref={ref}
        variant={getButtonVariant(variant)}
        className={cn(
          getCustomClasses(variant),
          gradient && gradientClasses,
          fullWidth && 'w-full',
          'transition-all duration-200',
          className
        )}
        {...props}
      />
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";
