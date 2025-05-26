import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  animate?: boolean | "bounce" | "pulse" | "ping" | "glow"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  size = "md",
  animate = false,
  icon,
  iconPosition = "left",
  children,
  className,
  onClick,
}) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium transition-all duration-200"

  const variants = {
    primary: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
    secondary: "bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600",
    success: "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40",
    warning: "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40",
    error: "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40",
    info: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40",
  }

  const sizes = {
    xs: "px-1.5 py-0.5 text-xs gap-1",
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
    xl: "px-5 py-2.5 text-lg gap-2",
  }

  const getAnimationClass = (animate: BadgeProps['animate']) => {
    if (!animate) return ""
    if (animate === true || animate === "bounce") return "animate-bounce"
    if (animate === "pulse") return "animate-pulse"
    if (animate === "ping") return "animate-ping"
    if (animate === "glow") return "animate-pulse"
    return ""
  }

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-3 h-3", 
    md: "w-4 h-4",
    lg: "w-4 h-4",
    xl: "w-5 h-5",
  }

  return (
    <span 
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size], 
        getAnimationClass(animate),
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && iconPosition === "left" && (
        <span className={cn("flex-shrink-0", iconSizes[size])}>
          {icon}
        </span>
      )}
      
      <span className="truncate">{children}</span>
      
      {icon && iconPosition === "right" && (
        <span className={cn("flex-shrink-0", iconSizes[size])}>
          {icon}
        </span>
      )}
    </span>
  )
}