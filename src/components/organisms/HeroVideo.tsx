"use client"

import type React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { FadeIn } from "@/components/atoms/FadeIn"
import { scrollToElement } from "@/lib/utils"

export const HeroVideo: React.FC = () => {
  const handleExploreCollection = () => {
    scrollToElement("products-section")
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background - tipo GIF em loop */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      >
        <source src="/Videos/hero-video.mp4" type="video/mp4" />
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-black" />
      </video>

      {/* Overlay escuro para melhor legibilidade do texto - reduzido */}
      <div className="absolute inset-0 bg-black/30 hero-overlay-base" />
      
      {/* Overlay adicional para o texto - mais sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 hero-overlay-gradient" />

      {/* Conteúdo centralizado */}
      <div className="relative hero-content h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto w-full">
          <FadeIn duration={1000} delay={300}>
            <Typography
              variant="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 tech-title hero-text"
            >
              The Future is
              <span className="block font-normal text-gradient-fix">
                Rocket
              </span>
            </Typography>
          </FadeIn>

          <FadeIn duration={1000} delay={600}>
            <Typography
              variant="p"
              className="text-lg sm:text-xl md:text-2xl tech-text-light text-gray-200 mb-12 max-w-2xl mx-auto"
            >
              Discover cutting-edge innovations that redefine excellence.
              Experience the perfect harmony of design and performance.
            </Typography>
          </FadeIn>

          <FadeIn duration={1000} delay={900}>
            <Button
              onClick={handleExploreCollection}
              variant="primary"
              size="lg"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 rounded-full"
            >
              <span className="text-base sm:text-lg button-text">Explore Collection</span>
              <Icon
                icon={ArrowRight}
                size="sm"
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </FadeIn>
        </div>
      </div>

      {/* Gradient sutil na parte inferior para transição suave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  )
}
