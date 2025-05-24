export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  joinDate: string
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
