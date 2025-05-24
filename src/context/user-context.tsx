"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { generateId } from "@/lib/utils"
import type { User, Order, CartItem } from "@/lib/types"

interface UserContextType {
  user: User | null
  orders: Order[]
  addOrder: (items: CartItem[], total: number) => void
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
  name: "Lorenzo Chaves",
  email: "lorenzo@rocket.com",
  avatar: "@/public/",
  joinDate: "2024-01-15",
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<User>(mockUser)
  const [orders, setOrders] = useLocalStorage<Order[]>(`rocket-orders-${mockUser.id}`, [])

  useEffect(() => {
    // Create mock orders if none exist
    if (orders.length === 0) {
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
                category: "transportation",
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
      ]
      setOrders(mockOrders)
    }
  }, [])

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: generateId(),
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

    // Calculate favorite category
    const categoryCount: Record<string, number> = {}
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const category = item.product.category
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

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
