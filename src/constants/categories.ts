import { Rocket, Zap, Shield, Star } from "lucide-react"
import type { Category } from "@/lib/types"

export const CATEGORIES: Category[] = [
  {
    id: "transportation",
    name: "Transportation",
    description: "Hover boards & flying vehicles",
    icon: Rocket,
    gradient: "from-purple-900/50 to-purple-700/30",
    color: "purple",
  },
  {
    id: "neural-tech",
    name: "Neural Tech",
    description: "Brain-computer interfaces",
    icon: Zap,
    gradient: "from-gray-950 to-gray-900",
    color: "gray",
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Smart clothing & accessories",
    icon: Shield,
    gradient: "from-gray-900 to-black",
    color: "gray",
  },
  {
    id: "home-living",
    name: "Home & Living",
    description: "Smart home solutions",
    icon: Star,
    gradient: "from-black to-gray-900",
    color: "gray",
  },
]
