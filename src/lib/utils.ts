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
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export const scrollToElement = (elementId: string): void => {
  document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" })
}
