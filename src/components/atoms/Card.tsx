import type React from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  variant?: "default" | "elevated" | "outlined"
  padding?: "none" | "sm" | "md" | "lg"
  className?: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ variant = "default", padding = "md", className, children }) => {
  const variants = {
    default: "bg-gray-900 border border-gray-800",
    elevated: "bg-gray-900 border border-gray-800 shadow-lg",
    outlined: "border-2 border-gray-700 bg-transparent",
  }

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  return <div className={cn("rounded-lg", variants[variant], paddings[padding], className)}>{children}</div>
}
