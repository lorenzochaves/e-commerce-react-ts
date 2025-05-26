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

export const formatCurrency = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price)
}

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}



export const scrollToTop = (): void => {
  // Múltiplas tentativas para garantir compatibilidade mobile
  try {
    // Método 1: Scroll imediato
    window.scrollTo(0, 0)
    
    // Método 2: Para iOS Safari
    if (document.body.scrollTop !== 0) {
      document.body.scrollTop = 0
    }
    
    // Método 3: Para elementos html
    if (document.documentElement.scrollTop !== 0) {
      document.documentElement.scrollTop = 0
    }
    
    // Método 4: Forçar com timeout para garantir
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }, 10)
    
    // Método 5: Backup adicional para mobile
    setTimeout(() => {
      if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 50)
  } catch (error) {
    // Fallback em caso de erro
    console.warn('Scroll to top failed:', error)
    try {
      window.scrollTo(0, 0)
    } catch (fallbackError) {
      console.warn('Fallback scroll failed:', fallbackError)
    }
  }
}

export const scrollToElement = (elementId: string): void => {
  document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" })
}
