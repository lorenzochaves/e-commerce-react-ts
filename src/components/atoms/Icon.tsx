import type React from "react"
import { cn } from "@/lib/utils"

interface IconProps {
  icon: React.ComponentType<{ className?: string }>
  size?: "sm" | "md" | "lg" | "xl"
  color?: string
  animate?: "spin" | "bounce" | "pulse" | "ping"
  className?: string
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, size = "md", color, animate, className }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  }

  const animations = {
    spin: "animate-spin",
    bounce: "animate-bounce",
    pulse: "animate-pulse",
    ping: "animate-ping",
  }

  return <IconComponent className={cn(sizes[size], color, animate && animations[animate], className)} />
}
