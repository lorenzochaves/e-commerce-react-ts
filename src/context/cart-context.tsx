import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { generateId } from "@/lib/utils"
import type { Product, CartItem, CartNotification } from "@/lib/types"

interface CartContextType {
  cart: CartItem[]
  notifications: CartNotification[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  removeNotification: (id: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("rocket-cart", [])
  const [notifications, setNotifications] = useState<CartNotification[]>([])

  // Auto-remove notifications after 3 seconds
  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id)
      }, 3000)

      return () => clearTimeout(timer)
    })
  }, [notifications])

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...prevCart, { product, quantity }]
    })

    // Add notification
    const notification: CartNotification = {
      id: generateId(),
      product,
      quantity,
      timestamp: Date.now(),
    }

    setNotifications((prev) => [...prev, notification])
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        notifications,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        removeNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
