import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // LinkedIn-style primary button (pill shape)
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-sm hover:shadow-md transition-shadow",
        // LinkedIn-style secondary button (pill with border)
        linkedin: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-all",
        // LinkedIn-style premium button (gold)
        premium: "bg-accent-gold text-black hover:bg-accent-gold/90 rounded-full shadow-sm hover:shadow-md transition-shadow",
        // Standard destructive button
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-full",
        // Outline button
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-full",
        // Secondary button
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
        // Ghost button
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-full",
        // Link button
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // LinkedIn-style button sizes (taller, more padding)
        default: "h-11 px-6 py-2 has-[>svg]:px-4 font-medium",
        sm: "h-9 rounded-full gap-1.5 px-4 has-[>svg]:px-3 text-sm font-medium",
        lg: "h-13 rounded-full px-8 has-[>svg]:px-5 text-base font-medium",
        icon: "size-11 rounded-full",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-13 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
