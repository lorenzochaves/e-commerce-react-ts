import type React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt: string
  size?: "sm" | "md" | "lg"
  fallback?: string
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "md", fallback, className }) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  if (!src) {
    return (
      <div
        className={cn(
          "rounded-full bg-purple-500 flex items-center justify-center text-white font-medium",
          sizes[size],
          textSizes[size],
          className,
        )}
      >
        {fallback || alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={cn("rounded-full object-cover", sizes[size], className)}
    />
  )
}
