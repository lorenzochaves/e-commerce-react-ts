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
  color,
  onClick,
  index,
}) => {
  return (
    <div
      className="group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onClick(id)}
    >
      <div
        className={`bg-gradient-to-br ${gradient} rounded-xl p-8 text-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:-translate-y-2`}
      >
        <div
          className={`w-16 h-16 bg-${color}-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-all duration-300`}
        >
          <Icon icon={icon} size="xl" color="text-white" className="group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-200 transition-colors">{name}</h3>
        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{description}</p>
      </div>
    </div>
  )
}
