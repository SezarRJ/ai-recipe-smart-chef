
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-105 active:scale-95 font-medium leading-none shadow-lg hover:shadow-xl",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal text-white hover:from-wasfah-teal hover:to-wasfah-deep-teal",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700",
        outline: "border-2 border-wasfah-bright-teal bg-transparent text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white",
        secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 dark:from-gray-800 dark:to-gray-700 dark:text-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600",
        ghost: "hover:bg-wasfah-bright-teal/10 hover:text-wasfah-bright-teal",
        link: "text-wasfah-bright-teal underline-offset-4 hover:underline font-medium",
        premium: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-glow",
        success: "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700",
      },
      size: {
        default: "h-12 px-6 py-3 min-w-[120px] text-base",
        sm: "h-10 rounded-lg px-4 text-sm min-w-[100px]",
        lg: "h-14 rounded-2xl px-8 text-lg min-w-[140px]",
        icon: "h-12 w-12 rounded-xl",
        xs: "h-8 rounded-md px-3 text-xs min-w-[80px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface OptimizedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const OptimizedButton = React.forwardRef<HTMLButtonElement, OptimizedButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
OptimizedButton.displayName = "OptimizedButton"

export { OptimizedButton, buttonVariants }
