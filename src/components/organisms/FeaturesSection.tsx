import type React from "react"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { FEATURES } from "@/constants/features"
import { cn } from "@/lib/utils"

export const FeaturesSection: React.FC = () => {
  const colorVariants = {
    purple: {
      bg: "bg-purple-500/20 group-hover:bg-purple-500/30",
      icon: "text-purple-400",
      glow: "group-hover:shadow-lg group-hover:shadow-purple-500/25"
    },
    cyan: {
      bg: "bg-cyan-500/20 group-hover:bg-cyan-500/30", 
      icon: "text-cyan-400",
      glow: "group-hover:shadow-lg group-hover:shadow-cyan-500/25"
    },
    green: {
      bg: "bg-green-500/20 group-hover:bg-green-500/30",
      icon: "text-green-400", 
      glow: "group-hover:shadow-lg group-hover:shadow-green-500/25"
    }
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-fade-in-up">
        <Typography variant="h2" size="3xl" weight="semibold" className="mb-4 tech-subtitle">
          Experience Tomorrow.
        </Typography>
        <Typography variant="p" color="muted" className="max-w-2xl mx-auto tech-text">
          Welcome to the forefront. The future begins here
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => {
          const colors = colorVariants[feature.color as keyof typeof colorVariants] || colorVariants.purple
          
          return (
            <div
              key={index}
              className="text-center p-6 group animate-fade-in-up hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: feature.delay }}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                  "group-hover:scale-110 transition-all duration-300",
                  colors.bg,
                  colors.glow
                )}
              >
                <Icon
                  icon={feature.icon}
                  size="xl"
                  className={cn(
                    "group-hover:animate-pulse transition-colors",
                    colors.icon
                  )}
                />
              </div>

              {/* Title */}
              <Typography
                variant="h3"
                size="xl"
                weight="medium"
                className="mb-2 group-hover:text-purple-300 transition-colors tech-subtitle"
              >
                {feature.title}
              </Typography>

              {/* Description */}
              <Typography 
                variant="p" 
                color="muted" 
                className="group-hover:text-gray-300 transition-colors tech-text"
              >
                {feature.description}
              </Typography>
            </div>
          )
        })}
      </div>
    </section>
  )
}