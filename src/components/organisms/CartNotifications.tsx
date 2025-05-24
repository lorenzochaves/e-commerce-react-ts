import type React from "react"
import { CartNotification } from "@/components/molecules/CartNotification"
import { useCart } from "@/context/cart-context"

export const CartNotifications: React.FC = () => {
  const { notifications, removeNotification } = useCart()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <CartNotification
          key={notification.id}
          id={notification.id}
          product={notification.product}
          quantity={notification.quantity}
          onRemove={removeNotification}
          index={index}
        />
      ))}
    </div>
  )
}
