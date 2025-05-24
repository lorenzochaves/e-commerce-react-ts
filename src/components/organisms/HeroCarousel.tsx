"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Badge } from "@/components/atoms/Badge"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { HERO_SLIDES } from "@/constants/heroSlides"
import { scrollToElement } from "@/lib/utils"

interface HeroCarouselProps {
  onCategoryClick: (category: string) => void
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onCategoryClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        // Para no último slide e volta para o primeiro
        if (prev >= HERO_SLIDES.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    if (currentSlide < HERO_SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const handleSlideAction = (action: string) => {
    switch (action) {
      case "scroll-to-products":
        scrollToElement("products-section")
        break
      case "neural-tech":
        onCategoryClick("neural-tech")
        break
      case "transportation":
        onCategoryClick("transportation")
        break
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-[500px] md:h-[600px]">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${slide.gradient} p-8 md:p-12 relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
                <div
                  className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-20 left-32 w-40 h-40 border border-white/20 rounded-full animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>

              <div className="relative z-10 max-w-3xl h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <Badge variant="primary" animate>
                    {slide.badge}
                  </Badge>
                  <Badge variant="success">Free Shipping</Badge>
                </div>

                <Typography
                  variant="h2"
                  size="2xl"
                  weight="semibold"
                  color="secondary"
                  className="mb-2 animate-fade-in-up"
                >
                  {slide.subtitle}
                </Typography>

                <Typography
                  variant="h1"
                  size="5xl"
                  weight="bold"
                  className="mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight animate-fade-in-up [animation-delay:0.2s] md:text-6xl"
                >
                  {slide.title}
                </Typography>

                <Typography
                  variant="p"
                  size="lg"
                  color="gray"
                  className="mb-8 leading-relaxed animate-fade-in-up [animation-delay:0.4s] md:text-xl max-w-2xl"
                >
                  {slide.description}
                </Typography>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  <Button onClick={() => handleSlideAction(slide.action)} size="lg" className="group">
                    {slide.cta}
                    <Icon icon={ArrowRight} size="md" className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg p-2 transition-all duration-200 group opacity-60 hover:opacity-100"
        >
          <Icon icon={ChevronLeft} size="md" className="text-white group-hover:scale-110 transition-transform" />
        </button>
      )}

      {currentSlide < HERO_SLIDES.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg p-2 transition-all duration-200 group opacity-60 hover:opacity-100"
        >
          <Icon icon={ChevronRight} size="md" className="text-white group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? "w-8 h-2 bg-white" 
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
