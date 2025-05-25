import React, { useEffect, useRef, useState } from "react"

interface FadeInProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
  className?: string
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  rootMargin = "100px", // Aumentando a margem de observação
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    
    // Verificar se o elemento já está visível na primeira renderização
    const checkInitialVisibility = () => {
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true)
        }
      }
    }
    
    // Executar verificação inicial após um pequeno delay para garantir que o layout esteja estabilizado
    setTimeout(checkInitialVisibility, 100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin])

  const directionClasses = {
    up: "opacity-0 translate-y-8",
    down: "opacity-0 -translate-y-8",
    left: "opacity-0 translate-x-8",
    right: "opacity-0 -translate-x-8",
  }

  return (
    <div
      ref={elementRef}
      className={`transition-all ease-out ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : directionClasses[direction]
      } ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}