"use client"

import type React from "react"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { Typography } from "@/components/atoms/Typography"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"
import { ProductCard } from "@/components/molecules/ProductCard"
import { FadeIn } from "@/components/atoms/FadeIn"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  title: string
  description: string
  products: Product[]
  showViewAll?: boolean
  onViewAll?: () => void
  customButton?: React.ReactNode
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  description,
  products,
  showViewAll = false,
  onViewAll,
  customButton,
}) => {
  return (
    <section id="products-section" className="container mx-auto px-4 py-16">
      <FadeIn direction="up" duration={800}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div className="flex-1">
            <Typography variant="h2" size="3xl" weight="bold" className="mb-2 relative inline-block">
              {title}
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"></span>
            </Typography>
            <Typography 
              variant="p" 
              color="muted" 
              className={title === "Search Results" ? "text-purple-400 font-medium" : ""}>
              {description}
            </Typography>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0 product-grid-actions">
            {showViewAll && onViewAll && (
              <Button variant="ghost" onClick={onViewAll} className="group whitespace-nowrap">
                View All
                <Icon icon={ArrowRight} size="sm" className="group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            {customButton && (
              <div className="relative z-20">
                {customButton}
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      {products.length === 0 ? (
        <FadeIn direction="up" duration={800}>
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon={ShoppingCart} size="xl" color="text-gray-600" />
            </div>
            <Typography variant="p" color="muted">
              No products available at the moment.
            </Typography>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 product-grid">
          {products.map((product, index) => (
            <FadeIn 
              key={product.id} 
              direction="up" 
              duration={600} 
              delay={index % 4 * 100} // Delay em cascata baseado na posição na linha
              className="h-full"
            >
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      )}
    </section>
  )
}
