import React, { useEffect, useRef, useState, useCallback, useMemo } from "react"

interface FadeInProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
  className?: string
  easing?: "ease-out" | "ease-in" | "ease-in-out" | "linear"
  once?: boolean
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  rootMargin = "100px",
  className = "",
  easing = "ease-out",
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Memoizar classes de direção
  const directionClasses = useMemo(() => ({
    up: "opacity-0 translate-y-8",
    down: "opacity-0 -translate-y-8",
    left: "opacity-0 translate-x-8", 
    right: "opacity-0 -translate-x-8",
  }), [])

  // Memoizar verificação inicial
  const checkInitialVisibility = useCallback(() => {
    const element = elementRef.current
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true)
      }
    }
  }, [])

  useEffect(() => {
    // Se usuário prefere reduced motion, mostrar imediatamente
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const element = elementRef.current
    if (!element) return

    // Verificação inicial
    setTimeout(checkInitialVisibility, 100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, prefersReducedMotion, checkInitialVisibility, once])

  return (
    <div
      ref={elementRef}
      className={`transition-all ${easing} ${
        isVisible || prefersReducedMotion
          ? "opacity-100 translate-x-0 translate-y-0" 
          : directionClasses[direction]
      } ${className}`}
      style={{ 
        transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
        transitionDuration: prefersReducedMotion ? '0ms' : `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}