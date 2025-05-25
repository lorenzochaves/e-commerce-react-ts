import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed button-text"

    const variants = {
      primary: "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 hover:scale-105",
      secondary: "bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-500 hover:scale-105",
      outline: "border border-purple-500 text-white hover:bg-purple-950 focus:ring-purple-500 hover:scale-105",
      ghost: "text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-500",
    }

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
