import type React from "react"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { useSearch } from "@/context/search-context"
import { scrollToTop } from "@/lib/utils"

export const EmptyCart: React.FC = () => {
  const { resetSearch } = useSearch()

  const goToHomepage = () => {
    resetSearch()
    scrollToTop()
  }

  return (
    <div className="text-center py-12 animate-fade-in-up">
      {/* Icon Container */}
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-700 transition-colors">
        <Icon 
          icon={ShoppingCart} 
          size="xl" 
          className="text-gray-600 group-hover:text-gray-500 transition-colors" // 🆕 Corrigido
        />
      </div>

      {/* Title */}
      <Typography variant="h2" size="2xl" weight="semibold" className="mb-4 tech-title">
        Your cart is empty
      </Typography>

      {/* Description */}
      <Typography variant="p" color="muted" className="mb-8 max-w-md mx-auto tech-text">
        Looks like you haven't added any products to your cart yet. Start exploring our futuristic collection!
      </Typography>

      {/* CTA Button */}
      <Button size="lg" className="group" onClick={goToHomepage}>
        Continue Shopping
        <Icon 
          icon={ArrowRight} 
          size="sm" 
          className="ml-2 group-hover:translate-x-1 transition-transform" // 🆕 Animação diferente
        />
      </Button>
    </div>
  )
}