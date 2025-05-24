"use client"

import type React from "react"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { Typography } from "@/components/atoms/Typography"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"
import { ProductCard } from "@/components/molecules/ProductCard"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  title: string
  description: string
  products: Product[]
  showViewAll?: boolean
  onViewAll?: () => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  description,
  products,
  showViewAll = false,
  onViewAll,
}) => {
  return (
    <section id="products-section" className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12 animate-fade-in-up">
        <div>
          <Typography variant="h2" size="3xl" weight="bold" className="mb-2 relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"></span>
          </Typography>
          <Typography variant="p" color="muted">
            {description}
          </Typography>
        </div>
        {showViewAll && onViewAll && (
          <Button variant="ghost" onClick={onViewAll} className="group">
            View All
            <Icon icon={ArrowRight} size="sm" className="group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 animate-fade-in-up">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon={ShoppingCart} size="xl" color="text-gray-600" />
          </div>
          <Typography variant="p" color="muted">
            No products available at the moment.
          </Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
