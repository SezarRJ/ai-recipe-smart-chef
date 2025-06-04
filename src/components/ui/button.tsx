
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-wasfah-bright-teal text-white hover:bg-wasfah-teal shadow-md hover:shadow-lg",
        destructive:
          "bg-wasfah-coral-red text-white hover:bg-red-600 shadow-md hover:shadow-lg",
        outline:
          "border-2 border-wasfah-bright-teal bg-transparent text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        ghost: "hover:bg-wasfah-bright-teal/10 hover:text-wasfah-bright-teal",
        link: "text-wasfah-bright-teal underline-offset-4 hover:underline font-medium",
      },
      size: {
        default: "h-12 px-6 py-3 min-w-[120px]",
        sm: "h-10 rounded-lg px-4 text-xs min-w-[100px]",
        lg: "h-14 rounded-2xl px-8 text-base min-w-[140px]",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
Button.displayName = "Button"

export { Button, buttonVariants }
