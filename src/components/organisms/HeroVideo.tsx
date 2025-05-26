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
      {/* Video Background */}
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

      {/* Overlay otimizado para mobile */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Conteúdo centralizado */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto w-full">
          <FadeIn duration={1000} delay={300}>
            <Typography
                variant="h1"
                className="
                    text-5xl xs:text-6xl sm:text-5xl md:text-6xl lg:text-7xl 
                    font-light mb-4 sm:mb-6 tech-title leading-tight
                "
                >
                The Future is
                <span className="
                    block font-normal text-gradient-fix
                    text-6xl xs:text-7xl sm:text-6xl md:text-7xl lg:text-8xl
                    bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 
                    bg-clip-text text-transparent
                    animate-pulse
                ">
                    Rocket
                </span>
            </Typography>
          </FadeIn>

          <FadeIn duration={1000} delay={600}>
            <Typography
              variant="p"
              className="
                text-base xs:text-lg sm:text-xl md:text-2xl 
                tech-text-light text-gray-200 mb-8 sm:mb-12 
                max-w-xl sm:max-w-2xl mx-auto leading-relaxed
              "
            >
              Discover cutting-edge innovations that redefine excellence.
              <span className="hidden sm:inline">
                {" "}Experience the perfect harmony of design and performance.
              </span>
            </Typography>
          </FadeIn>

          <FadeIn duration={1000} delay={900}>
            <Button
              onClick={handleExploreCollection}
              variant="primary"
              size="lg"
              className="
                group bg-white/10 backdrop-blur-sm border border-white/20 
                text-white hover:bg-white/20 hover:scale-105 
                transition-all duration-300 
                px-6 xs:px-8 py-3 xs:py-4 rounded-full
                shadow-lg shadow-purple-500/20
                text-sm xs:text-base sm:text-lg
              "
            >
              <span className="button-text font-medium">Explore Collection</span>
              <Icon
                icon={ArrowRight}
                size="sm"
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </FadeIn>
        </div>
      </div>

      {/* Gradient bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
    </section>
  )
}