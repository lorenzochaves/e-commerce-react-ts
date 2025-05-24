"use client"

import type React from "react"
import { Sparkles, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"

interface ProductTabsProps {
  activeSection: "featured" | "bestsellers" | "newarrivals"
  onSectionChange: (section: "featured" | "bestsellers" | "newarrivals") => void
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ activeSection, onSectionChange }) => {
  const tabs = [
    { key: "featured" as const, icon: Sparkles, label: "Featured", color: "purple" },
    { key: "bestsellers" as const, icon: TrendingUp, label: "Best Sellers", color: "green" },
    { key: "newarrivals" as const, icon: Star, label: "New Arrivals", color: "cyan" },
  ]

  return (
    <div className="flex justify-center mb-12 animate-fade-in-up">
      <div className="flex items-center bg-gray-900 rounded-lg p-2 border border-gray-800">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeSection === tab.key ? "primary" : "ghost"}
            onClick={() => onSectionChange(tab.key)}
            className={`flex items-center gap-2 ${
              activeSection === tab.key ? `bg-${tab.color}-600 shadow-lg scale-105` : ""
            }`}
          >
            <Icon icon={tab.icon} size="sm" />
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
