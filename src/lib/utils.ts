export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const scrollToTop = (): void => {
  // Desabilitar scroll suave temporariamente para forçar scroll imediato
  const htmlElement = document.documentElement
  const originalScrollBehavior = htmlElement.style.scrollBehavior
  
  htmlElement.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  
  // Restaurar scroll suave após um pequeno delay
  setTimeout(() => {
    htmlElement.style.scrollBehavior = originalScrollBehavior || 'smooth'
  }, 100)
}

export const scrollToElement = (elementId: string): void => {
  document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" })
}
