"use client"

import type React from "react"
import { CheckCircle, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"
import type { Product } from "@/lib/types"

interface CartNotificationProps {
  id: string
  product: Product
  quantity: number
  onRemove: (id: string) => void
  index: number
}

export const CartNotification: React.FC<CartNotificationProps> = ({ id, product, quantity, onRemove, index }) => {
  return (
    <div
      className="bg-gray-900 border border-green-500/50 rounded-lg p-4 shadow-2xl max-w-sm animate-slide-in-right"
      style={{
        animationDelay: `${index * 0.1}s`,
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <Icon icon={CheckCircle} size="md" color="text-green-400" animate="pulse" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Icon icon={ShoppingCart} size="sm" color="text-green-400" />
            <span className="text-green-400 font-semibold text-sm">Added to Cart!</span>
          </div>

          <p className="text-white font-medium text-sm truncate">{product.name}</p>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-400 text-xs">Qty: {quantity}</span>
            <span className="text-purple-400 text-xs font-semibold">${(product.price * quantity).toFixed(2)}</span>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={() => onRemove(id)} className="flex-shrink-0 p-1 h-auto">
          <Icon icon={X} size="sm" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="mt-3 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-progress-bar"
          style={{
            animation: "progress-bar 3s linear forwards",
          }}
        />
      </div>
    </div>
  )
}
