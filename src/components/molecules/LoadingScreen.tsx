import type React from "react"
import { Spinner } from "@/components/atoms/Spinner"
import { Typography } from "@/components/atoms/Typography"
import { FadeIn } from "@/components/atoms/FadeIn"

interface LoadingScreenProps {
  message?: string
  showLogo?: boolean
  variant?: "full" | "inline"
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading amazing products...", 
  showLogo = true,
  variant = "full"
}) => {
  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Spinner size="lg" />
          <Typography variant="p" className="text-gray-400 tech-text-light">
            {message}
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <FadeIn duration={800}>
        <div className="text-center space-y-8">
          {showLogo && (
            <div className="mb-8">
              <Typography
                variant="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-light tech-title mb-4"
              >
                <span className="text-gradient-fix">Rocket</span>
              </Typography>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto animate-pulse" />
            </div>
          )}
          
          <div className="space-y-6">
            <Spinner size="lg" />
            
            <Typography 
              variant="p" 
              className="text-gray-400 tech-text-light max-w-md mx-auto"
            >
              {message}
            </Typography>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}