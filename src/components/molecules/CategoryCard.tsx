"use client"

import type React from "react"
import { Icon } from "@/components/atoms/Icon"

interface CategoryCardProps {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  color: string
  onClick: (categoryId: string) => void
  index: number
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  description,
  icon,
  gradient,
  color: _, // ignoramos este param, usando valores fixos para evitar problemas com o Tailwind
  onClick,
  index,
}) => {
  const isTransportation = id === "transportation"
  
  return (
    <div
      className="group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onClick(id)}
    >
      <div
        className={`bg-gradient-to-br ${gradient} rounded-xl p-8 text-center transition-all duration-500 border border-transparent
          ${isTransportation 
            ? 'group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:-translate-y-2' 
            : 'group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] group-hover:-translate-y-2 group-hover:border-purple-500/30'
          }`}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300
            ${isTransportation 
              ? 'bg-purple-600 group-hover:rotate-12' 
              : 'bg-gray-800 group-hover:bg-purple-600 group-hover:rotate-12 group-hover:shadow-lg'
            }`}
        >
          <Icon 
            icon={icon} 
            size="xl" 
            className="text-white group-hover:scale-110 transition-transform" 
          />
        </div>
        <h3 className={`text-lg font-medium mb-2 transition-colors tech-subtitle
          ${isTransportation 
            ? 'text-white group-hover:text-purple-200' 
            : 'text-white group-hover:text-purple-300'
          }`}
        >
          {name}
        </h3>
        <p className={`text-sm transition-colors tech-text
          ${isTransportation 
            ? 'text-gray-400 group-hover:text-gray-300' 
            : 'text-gray-400 group-hover:text-purple-200/80'
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
