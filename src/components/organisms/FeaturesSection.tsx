import type React from "react"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { FEATURES } from "@/constants/features"

export const FeaturesSection: React.FC = () => {
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
        {FEATURES.map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 group animate-fade-in-up"
            style={{ animationDelay: feature.delay }}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 ${
                feature.color === 'purple' ? 'bg-purple-500/20 group-hover:bg-purple-500/30' :
                feature.color === 'cyan' ? 'bg-cyan-500/20 group-hover:bg-cyan-500/30' :
                feature.color === 'green' ? 'bg-green-500/20 group-hover:bg-green-500/30' :
                'bg-gray-500/20 group-hover:bg-gray-500/30'
              }`}
            >
              <Icon
                icon={feature.icon}
                size="xl"
                className={`group-hover:animate-pulse ${
                  feature.color === 'purple' ? 'text-purple-400' :
                  feature.color === 'cyan' ? 'text-cyan-400' :
                  feature.color === 'green' ? 'text-green-400' :
                  'text-gray-400'
                }`}
              />
            </div>
            <Typography
              variant="h3"
              size="xl"
              weight="medium"
              className="mb-2 group-hover:text-purple-300 transition-colors tech-subtitle"
            >
              {feature.title}
            </Typography>
            <Typography variant="p" color="muted" className="group-hover:text-gray-300 transition-colors tech-text">
              {feature.description}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  )
}
