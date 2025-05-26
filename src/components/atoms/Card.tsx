import type React from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  variant?: "default" | "elevated" | "outlined" | "glass" | "glow" | "gradient"
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "responsive"
  interactive?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({ 
  variant = "default", 
  padding = "md", 
  interactive = false,
  className, 
  children,
  onClick 
}) => {
  const variants = {
    default: "bg-gray-900 border border-gray-800",
    elevated: "bg-gray-900 border border-gray-800 shadow-lg shadow-black/25",
    outlined: "border border-gray-700 bg-transparent",
    glass: "bg-gray-900/50 backdrop-blur-sm border border-gray-700/50",
    glow: "bg-gray-900 border border-purple-500/50 shadow-lg shadow-purple-500/25",
    gradient: "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700",
  }

  const paddings = {
    none: "",
    xs: "p-2",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
    responsive: "p-3 sm:p-4 md:p-6",
  }

  const interactiveStyles = interactive || onClick ? 
    "cursor-pointer hover:border-purple-500/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300" : ""

  return (
    <div 
      className={cn(
        "rounded-lg transition-colors duration-200", 
        variants[variant], 
        paddings[padding], 
        interactiveStyles,
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}