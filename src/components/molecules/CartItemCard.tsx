"use client"

import type React from "react"
import { Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { Card } from "@/components/atoms/Card"
import { PriceDisplay } from "@/components/molecules/PriceDisplay"
import { QuantitySelector } from "@/components/molecules/QuantitySelector"
import type { CartItem } from "@/lib/types"

interface CartItemCardProps {
  item: CartItem
  onQuantityChange: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <Card variant="elevated" padding="lg" className="animate-fade-in-up">
      <div className="flex gap-4">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={item.product.image || "https://via.placeholder.com/100x100/1f2937/8b5cf6?text=Product"}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex justify-between text-base font-medium">
            <Typography variant="h3" weight="semibold">
              <Link to={`/products/${item.product.id}`} className="hover:text-purple-400 transition-colors">
                {item.product.name}
              </Link>
            </Typography>
            <div className="ml-4">
              <PriceDisplay price={item.product.price * item.quantity} size="md" />
            </div>
          </div>

          <Typography variant="p" size="sm" color="muted" className="mt-1 line-clamp-2">
            {item.product.description}
          </Typography>

          <div className="flex items-center justify-between mt-4">
            <QuantitySelector
              quantity={item.quantity}
              onQuantityChange={(quantity) => onQuantityChange(item.product.id, quantity)}
              size="sm"
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.product.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Icon icon={Trash2} size="sm" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
