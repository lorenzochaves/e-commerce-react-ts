import type React from "react"
import { Icon } from "@/components/atoms/Icon"
import { Typography } from "@/components/atoms/Typography"
import { Card } from "@/components/atoms/Card"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  variant?: "default" | "featured" | "premium"
  onClick: (categoryId: string) => void
  index?: number
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  description,
  icon,
  variant = "default",
  onClick,
  index = 0,
}) => {
  
  // 🆕 Variants bem definidas
  const variants = {
    default: {
      gradient: "from-gray-900 to-gray-800",
      iconBg: "bg-gray-800 group-hover:bg-purple-600",
      shadow: "group-hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]",
      titleColor: "text-white group-hover:text-purple-300",
      descColor: "text-gray-400 group-hover:text-purple-200/80"
    },
    featured: {
      gradient: "from-purple-900/50 to-blue-900/50", 
      iconBg: "bg-purple-600",
      shadow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]",
      titleColor: "text-white group-hover:text-purple-200",
      descColor: "text-gray-300 group-hover:text-gray-200"
    },
    premium: {
      gradient: "from-gradient-to-br from-purple-600 to-cyan-600",
      iconBg: "bg-white/20 backdrop-blur-sm",
      shadow: "group-hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]",
      titleColor: "text-white",
      descColor: "text-white/80"
    }
  }

  const currentVariant = variants[variant]

  return (
    <div
      className={cn(
        "group cursor-pointer animate-fade-in-up",
        // 🆕 CSS custom property para animation delay
        "[animation-delay:var(--delay)]"
      )}
      style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
      onClick={() => onClick(id)}
    >
      <Card
        variant="elevated"
        padding="lg"
        className={cn(
          "bg-gradient-to-br transition-all duration-500 border border-transparent text-center",
          currentVariant.gradient,
          currentVariant.shadow,
          "group-hover:scale-105 group-hover:-translate-y-2 group-hover:border-purple-500/30"
        )}
      >
        {/* Icon Container */}
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300",
          currentVariant.iconBg,
          "group-hover:rotate-12 group-hover:shadow-lg"
        )}>
          <Icon 
            icon={icon} 
            size="xl" 
            className="text-white group-hover:scale-110 transition-transform" 
          />
        </div>

        {/* Title */}
        <Typography 
          variant="h3" 
          size="lg" 
          weight="medium" 
          className={cn("mb-2 transition-colors tech-subtitle", currentVariant.titleColor)}
        >
          {name}
        </Typography>

        {/* Description */}
        <Typography 
          variant="p" 
          size="sm" 
          className={cn("transition-colors tech-text", currentVariant.descColor)}
        >
          {description}
        </Typography>
      </Card>
    </div>
  )
}