"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Order, Product } from "@/lib/types"

type UserContextType = {
  user: User | null
  orders: Order[]
  addOrder: (items: Array<{ product: Product; quantity: number }>, total: number) => void
  getUserStats: () => {
    totalOrders: number
    totalSpent: number
    favoriteCategory: string
  }
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Mock user data
const mockUser: User = {
  id: "user-001",
  name: "Alex Rodriguez",
  email: "alex.rodriguez@rocket.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  joinDate: "2024-01-15",
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User>(mockUser)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem(`rocket-orders-${user.id}`)
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders)
        setOrders(parsedOrders)
      } catch (error) {
        console.error("Failed to load orders:", error)
      }
    } else {
      // Create some mock orders for demo
      const mockOrders: Order[] = [
        {
          id: "order-001",
          userId: user.id,
          items: [
            {
              product: {
                id: "1",
                name: "Quantum Hover Board",
                description: "Experience the future of personal transportation",
                price: 599.99,
                image: "https://via.placeholder.com/400x400/1f2937/8b5cf6?text=Quantum+Hover+Board",
              },
              quantity: 1,
              priceAtTime: 599.99,
            },
          ],
          total: 599.99,
          status: "delivered",
          orderDate: "2024-12-15T10:30:00Z",
          deliveryDate: "2024-12-18T14:20:00Z",
        },
        {
          id: "order-002",
          userId: user.id,
          items: [
            {
              product: {
                id: "2",
                name: "Neural Interface Headset",
                description: "Control your smart home devices with thoughts",
                price: 349.99,
                image: "https://via.placeholder.com/400x400/1f2937/8b5cf6?text=Neural+Interface",
              },
              quantity: 1,
              priceAtTime: 349.99,
            },
            {
              product: {
                id: "3",
                name: "Holographic Display Watch",
                description: "Interactive holographic displays on your wrist",
                price: 299.99,
                image: "https://via.placeholder.com/400x400/1f2937/8b5cf6?text=Holographic+Watch",
              },
              quantity: 2,
              priceAtTime: 299.99,
            },
          ],
          total: 949.97,
          status: "shipped",
          orderDate: "2024-12-20T15:45:00Z",
        },
      ]
      setOrders(mockOrders)
      localStorage.setItem(`rocket-orders-${user.id}`, JSON.stringify(mockOrders))
    }
  }, [user.id])

  useEffect(() => {
    // Save orders to localStorage whenever they change
    if (orders.length > 0) {
      localStorage.setItem(`rocket-orders-${user.id}`, JSON.stringify(orders))
    }
  }, [orders, user.id])

  const addOrder = (items: Array<{ product: Product; quantity: number }>, total: number) => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      items: items.map((item) => ({
        ...item,
        priceAtTime: item.product.price,
      })),
      total,
      status: "processing",
      orderDate: new Date().toISOString(),
    }

    setOrders((prevOrders) => [newOrder, ...prevOrders])
  }

  const getUserStats = () => {
    const totalOrders = orders.length
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

    // Calculate favorite category (simplified)
    const categoryCount: Record<string, number> = {}
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const category = item.product.name.split(" ")[0] // Simple category extraction
        categoryCount[category] = (categoryCount[category] || 0) + item.quantity
      })
    })

    const favoriteCategory = Object.entries(categoryCount).reduce(
      (max, [category, count]) => (count > max.count ? { category, count } : max),
      { category: "None", count: 0 },
    ).category

    return { totalOrders, totalSpent, favoriteCategory }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        orders,
        addOrder,
        getUserStats,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
