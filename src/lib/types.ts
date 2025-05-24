import type React from "react"
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  badge?: "new" | "bestseller"
  rank?: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  joinDate: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartNotification {
  id: string
  product: Product
  quantity: number
  timestamp: number
}

export interface Order {
  id: string
  userId: string
  items: Array<{
    product: Product
    quantity: number
    priceAtTime: number
  }>
  total: number
  status: "completed" | "processing" | "shipped" | "delivered"
  orderDate: string
  deliveryDate?: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  color: string
}

export interface HeroSlide {
  title: string
  subtitle: string
  description: string
  cta: string
  gradient: string
  badge: string
  action: string
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
  delay: string
}
