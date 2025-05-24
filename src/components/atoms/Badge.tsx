import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "error"
  size?: "sm" | "md" | "lg"
  animate?: boolean
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  size = "md",
  animate = false,
  children,
  className,
}) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium"

  const variants = {
    primary: "bg-purple-500 text-white",
    secondary: "bg-gray-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-500 text-white",
  }

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  }

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], animate && "animate-bounce", className)}>
      {children}
    </span>
  )
}
