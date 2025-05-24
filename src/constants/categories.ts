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
    gradient: "from-cyan-900/50 to-cyan-700/30",
    color: "cyan",
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Smart clothing & accessories",
    icon: Shield,
    gradient: "from-green-900/50 to-green-700/30",
    color: "green",
  },
  {
    id: "home-living",
    name: "Home & Living",
    description: "Smart home solutions",
    icon: Star,
    gradient: "from-orange-900/50 to-orange-700/30",
    color: "orange",
  },
]
