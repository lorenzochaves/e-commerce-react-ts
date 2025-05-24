import type React from "react"
import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "secondary" | "white"
  className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", color = "primary", className }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const colors = {
    primary: "border-purple-500/30 border-t-purple-500",
    secondary: "border-cyan-500/30 border-t-cyan-500",
    white: "border-white/30 border-t-white",
  }

  return <div className={cn("border-2 rounded-full animate-spin", sizes[size], colors[color], className)} />
}
