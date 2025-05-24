import type React from "react"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { FEATURES } from "@/constants/features"

export const FeaturesSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-fade-in-up">
        <Typography variant="h2" size="3xl" weight="bold" className="mb-4">
          Why Choose Rocket Products?
        </Typography>
        <Typography variant="p" color="muted" className="max-w-2xl mx-auto">
          We're not just selling products - we're delivering the future. Here's what makes us different.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 group animate-fade-in-up"
            style={{ animationDelay: feature.delay }}
          >
            <div
              className={`w-16 h-16 bg-${feature.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 group-hover:bg-${feature.color}-500/30`}
            >
              <Icon
                icon={feature.icon}
                size="xl"
                color={`text-${feature.color}-400`}
                className="group-hover:animate-pulse"
              />
            </div>
            <Typography
              variant="h3"
              size="xl"
              weight="semibold"
              className="mb-2 group-hover:text-purple-300 transition-colors"
            >
              {feature.title}
            </Typography>
            <Typography variant="p" color="muted" className="group-hover:text-gray-300 transition-colors">
              {feature.description}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  )
}
