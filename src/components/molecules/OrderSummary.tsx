import type React from "react"
import { Typography } from "@/components/atoms/Typography"
import { Card } from "@/components/atoms/Card"
import { PriceDisplay } from "@/components/molecules/PriceDisplay"
import type { CartItem } from "@/lib/types"

interface OrderSummaryProps {
  items: CartItem[]
  showItemDetails?: boolean
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items, showItemDetails = false }) => {
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  return (
    <Card variant="elevated" padding="lg" className="sticky top-6">
      <Typography variant="h2" size="xl" weight="semibold" className="mb-4">
        Order Summary
      </Typography>

      {showItemDetails && (
        <div className="space-y-4 mb-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <div>
                <Typography variant="span" color="gray">
                  {item.product.name}
                </Typography>
                <Typography variant="span" color="muted" className="ml-2">
                  x{item.quantity}
                </Typography>
              </div>
              <PriceDisplay price={item.product.price * item.quantity} size="sm" />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between">
          <Typography variant="span" color="muted">
            Subtotal
          </Typography>
          <PriceDisplay price={subtotal} size="sm" />
        </div>

        <div className="flex justify-between">
          <Typography variant="span" color="muted">
            Shipping
          </Typography>
          <Typography variant="span" color="accent">
            Free
          </Typography>
        </div>

        <div className="border-t border-gray-800 pt-4 flex justify-between font-semibold">
          <Typography variant="span" weight="semibold">
            Total
          </Typography>
          <PriceDisplay price={total} size="lg" />
        </div>
      </div>
    </Card>
  )
}
