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
    <div className="overflow-hidden bg-gray-900 border border-gray-800 rounded-lg transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] relative">
      {/* Badge */}
      {badgeContent && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant={getBadgeVariant()} size="sm">
            {badgeContent}
          </Badge>
        </div>
      )}

      <Link to={`/products/${product.id}`}>
        <div className="relative h-48 overflow-hidden cursor-pointer">
          <img
            src={imageError ? "https://via.placeholder.com/400x400/1f2937/8b5cf6?text=Product" : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-white">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="text-purple-400 font-bold mb-4">${product.price.toFixed(2)}</p>

        <Button onClick={handleAddToCart} isLoading={isLoading} className="w-full">
          <Icon icon={ShoppingCart} size="sm" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}
