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
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
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
    <div className="relative rounded-3xl overflow-hidden">
      <div className="relative h-[600px]">
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
            <div className={`h-full bg-gradient-to-r ${slide.gradient} p-12 relative overflow-hidden`}>
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
                  size="6xl"
                  weight="bold"
                  className="mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.title}
                </Typography>

                <Typography
                  variant="p"
                  size="xl"
                  color="gray"
                  className="mb-8 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
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

      {/* Controls */}
      <Button
        variant="ghost"
        size="lg"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full p-0"
      >
        <Icon icon={ChevronLeft} size="lg" />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full p-0"
      >
        <Icon icon={ChevronRight} size="lg" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-purple-500 scale-125" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
