import { Zap, Shield, Truck } from "lucide-react"
import type { Feature } from "@/lib/types"

export const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Cutting-Edge Tech",
    description: "Revolutionary products using the latest quantum and neural technologies",
    color: "purple",
    delay: "0s",
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Each product is crafted with precision and backed by our quality guarantee",
    color: "cyan",
    delay: "0.2s",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping worldwide with quantum-speed delivery technology",
    color: "green",
    delay: "0.4s",
  },
]
