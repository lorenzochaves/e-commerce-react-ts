import { 
  Rocket,        
  Brain,         
  Watch,        
  Home       
} from "lucide-react"
import type { Category } from "@/lib/types"

export const CATEGORIES: Category[] = [
  {
    id: "transportation",
    name: "Transportation",
    description: "Hover boards & flying vehicles",
    icon: Rocket,
    gradient: "from-purple-600/20 to-blue-600/20",
    color: "purple",
  },
  {
    id: "neural-tech",
    name: "Neural Tech",
    description: "Brain-computer interfaces",
    icon: Brain,
    gradient: "from-gray-950 to-gray-900",
    color: "gray",
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Smart clothing & accessories",
    icon: Watch,
    gradient: "from-gray-900 to-black",
    color: "gray",
  },
  {
    id: "home-living",
    name: "Home & Living",
    description: "Smart home solutions",
    icon: Home,
    gradient: "from-black to-gray-900",
    color: "gray",
  },
]
