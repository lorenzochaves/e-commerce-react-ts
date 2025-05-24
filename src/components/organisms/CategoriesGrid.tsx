"use client"

import type React from "react"
import { Typography } from "@/components/atoms/Typography"
import { CategoryCard } from "@/components/molecules/CategoryCard"
import { CATEGORIES } from "@/constants/categories"

interface CategoriesGridProps {
  onCategoryClick: (categoryId: string) => void
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ onCategoryClick }) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <Typography variant="h2" size="3xl" weight="bold" className="mb-12 text-center animate-fade-in-up">
        Shop by Category
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((category, index) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            icon={category.icon}
            gradient={category.gradient}
            color={category.color}
            onClick={onCategoryClick}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
