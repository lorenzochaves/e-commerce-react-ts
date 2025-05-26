import type React from "react"
import { CheckCircle, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"
import { Typography } from "@/components/atoms/Typography"
import { PriceDisplay } from "@/components/molecules/PriceDisplay"
import type { Product } from "@/lib/types"

interface CartNotificationProps {
  id: string
  product: Product
  quantity: number
  onRemove: (id: string) => void
  index: number
}

export const CartNotification: React.FC<CartNotificationProps> = ({ 
  id, 
  product, 
  quantity, 
  onRemove, 
  index 
}) => {
  return (
    <div
      className="bg-gray-900 border border-green-500/50 rounded-lg p-4 shadow-2xl max-w-sm animate-slide-in-right"
      style={{
        animationDelay: `${index * 0.1}s`,
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Success Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <Icon 
              icon={CheckCircle} 
              size="md" 
              className="text-green-400 animate-pulse" // 🆕 Corrigido
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <Icon 
              icon={ShoppingCart} 
              size="sm" 
              className="text-green-400" // 🆕 Corrigido
            />
            <Typography 
              variant="span" 
              size="sm" 
              weight="semibold" 
              className="text-green-400"
            >
              Added to Cart!
            </Typography>
          </div>

          {/* Product Name */}
          <Typography 
            variant="p" 
            size="sm" 
            weight="medium" 
            className="text-white truncate mb-1" // 🆕 Typography atom
          >
            {product.name}
          </Typography>

          {/* Details */}
          <div className="flex items-center gap-2">
            <Typography variant="span" size="xs" color="muted">
              Qty: {quantity}
            </Typography>
            <PriceDisplay 
              price={product.price * quantity} 
              size="sm" 
            />
          </div>
        </div>

        {/* Close Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemove(id)} 
          className="flex-shrink-0 p-1 h-auto hover:bg-gray-800"
          aria-label="Dismiss notification"
        >
          <Icon icon={X} size="sm" className="text-gray-400 hover:text-gray-300" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
          style={{
            animation: "progress-bar 3s linear forwards",
          }}
        />
      </div>
    </div>
  )
}