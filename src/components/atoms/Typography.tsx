import type React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
  weight?: "light" | "normal" | "medium" | "semibold" | "bold"
  color?: "primary" | "secondary" | "muted" | "accent" | "white" | "gray"
  className?: string
  children: React.ReactNode
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  size = "md",
  weight = "normal",
  color = "white",
  className,
  children,
}) => {
  const Component = variant

  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  }

  const weights = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }

  const colors = {
    primary: "text-purple-400",
    secondary: "text-cyan-400",
    muted: "text-gray-400",
    accent: "text-green-400",
    white: "text-white",
    gray: "text-gray-300",
  }
  
  // Aplicar classes tech para headings
  let techClass = '';
  if (variant === 'h1') {
    techClass = 'tech-title';
  } else if (variant === 'h2' || variant === 'h3') {
    techClass = 'tech-subtitle';
  } else if (variant === 'p' || variant === 'span') {
    techClass = 'tech-text';
  }

  return <Component className={cn(sizes[size], weights[weight], colors[color], techClass, className)}>{children}</Component>
}
