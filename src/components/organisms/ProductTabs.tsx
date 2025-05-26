import type React from "react"
import { Sparkles, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"
import { cn } from "@/lib/utils"

interface ProductTabsProps {
  activeSection: "featured" | "bestsellers" | "newarrivals"
  onSectionChange: (section: "featured" | "bestsellers" | "newarrivals") => void
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const tabs = [
    { 
      key: "featured" as const, 
      icon: Sparkles, 
      label: "Featured", 
      activeClasses: "bg-purple-600 border-purple-500 shadow-lg shadow-purple-500/25" 
    },
    { 
      key: "bestsellers" as const, 
      icon: TrendingUp, 
      label: "Best Sellers", 
      activeClasses: "bg-green-600 border-green-500 shadow-lg shadow-green-500/25" 
    },
    { 
      key: "newarrivals" as const, 
      icon: Star, 
      label: "New Arrivals", 
      activeClasses: "bg-cyan-600 border-cyan-500 shadow-lg shadow-cyan-500/25" 
    },
  ]

  return (
    <div className="flex justify-center mb-12 animate-fade-in-up">
      <div className="flex items-center bg-gray-900 rounded-lg p-2 border border-gray-800 gap-1">
        {tabs.map((tab) => {
          const isActive = activeSection === tab.key
          
          return (
            <Button
              key={tab.key}
              variant="ghost" // Sempre ghost, customizamos por fora
              onClick={() => onSectionChange(tab.key)}
              className={cn(
                "flex items-center gap-2 transition-all duration-300 relative",
                "hover:scale-105 active:scale-95",
                isActive && `${tab.activeClasses} text-white transform scale-105`
              )}
            >
              <Icon 
                icon={tab.icon} 
                size="sm" 
                className={cn(
                  "transition-colors",
                  isActive ? "text-white" : "text-gray-400"
                )}
              />
              <span className={cn(
                "font-medium transition-colors",
                isActive ? "text-white" : "text-gray-300"
              )}>
                {tab.label}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}