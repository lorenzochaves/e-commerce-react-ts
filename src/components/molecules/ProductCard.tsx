"use client"

import type React from "react"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/atoms/Button"
import { Badge } from "@/components/atoms/Badge"
import { Icon } from "@/components/atoms/Icon"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = () => {
    setIsLoading(true)
    setTimeout(() => {
      addToCart(product, 1)
      setIsLoading(false)
    }, 500)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const getBadgeVariant = () => {
    if (product.badge === "bestseller") return "warning"
    if (product.badge === "new") return "success"
    return "primary"
  }

  const getBadgeContent = () => {
    if (product.badge === "bestseller" && product.rank) {
      return `#${product.rank}`
    }
    if (product.badge === "new") {
      return "NEW"
    }
    return null
  }

  const badgeContent = getBadgeContent()

  return (
    <div className="product-card overflow-hidden bg-gray-900 border border-gray-800 rounded-lg transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] relative">
      {/* Badge */}
      {badgeContent && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant={getBadgeVariant()} size="sm">
            {badgeContent}
          </Badge>
        </div>
      )}

      <Link to={`/products/${product.id}`} className="flex-shrink-0">
        <div className="product-image-container cursor-pointer">
          <img
            src={imageError ? "https://via.placeholder.com/400x400/1f2937/8b5cf6?text=Product" : product.image}
            alt={product.name}
            className="product-image"
            onError={handleImageError}
          />
        </div>
      </Link>

      <div className="product-card-content p-4">
        <div className="product-card-text">
          <h3 className="font-medium text-lg mb-2 text-white tech-subtitle tracking-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-3 tech-text flex-grow">
            {product.description}
          </p>
        </div>
        
        <div className="product-card-actions space-y-3 mt-4">
          <p className="text-purple-400 font-semibold text-lg">${product.price.toFixed(2)}</p>
          <Button onClick={handleAddToCart} isLoading={isLoading} className="w-full">
            <Icon icon={ShoppingCart} size="sm" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
