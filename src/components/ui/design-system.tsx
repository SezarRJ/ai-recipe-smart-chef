
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Enhanced Card Component
interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  hover?: boolean;
}

export const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant = 'default', hover = false, ...props }, ref) => {
    const variantClasses = {
      default: 'border bg-card text-card-foreground shadow-sm',
      elevated: 'border bg-card text-card-foreground shadow-lg',
      glass: 'backdrop-blur-md bg-white/10 border border-white/20'
    };

    return (
      <Card
        ref={ref}
        className={cn(
          variantClasses[variant],
          hover && 'hover:shadow-md transition-shadow',
          className
        )}
        {...props}
      />
    );
  }
);
EnhancedCard.displayName = "EnhancedCard";

// Icon Container Component
interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'accent';
}

export const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, size = 'md', variant = 'default', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12'
    };

    const variantClasses = {
      default: 'bg-gray-100 text-gray-600',
      primary: 'bg-wasfah-bright-teal text-white',
      accent: 'bg-green-100 text-green-600'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-full flex items-center justify-center',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
IconContainer.displayName = "IconContainer";

// Typography Components
export const Typography = {
  H1: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h1 ref={ref} className={cn("text-4xl font-bold", className)} {...props} />
    )
  ),
  H2: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h2 ref={ref} className={cn("text-2xl font-semibold", className)} {...props} />
    )
  ),
  H3: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h3 ref={ref} className={cn("text-xl font-medium", className)} {...props} />
    )
  ),
  Body: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
      <p ref={ref} className={cn("text-base", className)} {...props} />
    )
  ),
  Caption: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
      <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
    )
  )
};

Typography.H1.displayName = "Typography.H1";
Typography.H2.displayName = "Typography.H2";
Typography.H3.displayName = "Typography.H3";
Typography.Body.displayName = "Typography.Body";
Typography.Caption.displayName = "Typography.Caption";

// Progress Indicator Component
interface ProgressIndicatorProps {
  value: number;
  max: number;
  variant?: 'default' | 'primary';
  className?: string;
}

export const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ value, max, variant = 'default', className }, ref) => {
    const percentage = (value / max) * 100;
    
    return (
      <div ref={ref} className={cn("w-full", className)}>
        <Progress 
          value={percentage} 
          className={cn(
            variant === 'primary' && "h-2"
          )}
        />
      </div>
    );
  }
);
ProgressIndicator.displayName = "ProgressIndicator";

// Animated Badge Component
interface AnimatedBadgeProps {
  variant?: 'default' | 'warning';
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({ className, variant = 'default', children, ...props }) => {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    warning: 'bg-yellow-500 text-white'
  };

  return (
    <Badge
      className={cn(
        'transition-all duration-200 hover:scale-105',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  );
};

// Layout Container Component
export const LayoutContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("container mx-auto px-4", className)} {...props} />
  )
);
LayoutContainer.displayName = "LayoutContainer";
