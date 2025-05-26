import type React from "react"
import { useState, useCallback } from "react"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/atoms/Button"
import { Badge } from "@/components/atoms/Badge"
import { Icon } from "@/components/atoms/Icon"
import { Card } from "@/components/atoms/Card"
import { Typography } from "@/components/atoms/Typography"
import { PriceDisplay } from "@/components/molecules/PriceDisplay"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  isLoading?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isLoading: externalLoading = false 
}) => {
  const { addToCart } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = useCallback(async () => {
    setIsAddingToCart(true)
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500))
      addToCart(product, 1)
    } finally {
      setIsAddingToCart(false)
    }
  }, [addToCart, product])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  const getBadgeProps = useCallback(() => {
    if (product.badge === "bestseller" && product.rank) {
      return {
        variant: "warning" as const,
        children: `#${product.rank}`
      }
    }
    if (product.badge === "new") {
      return {
        variant: "success" as const,
        children: "NEW"
      }
    }
    return null
  }, [product.badge, product.rank])

  const badgeProps = getBadgeProps()
  const isLoading = isAddingToCart || externalLoading

  return (
    <Card 
      variant="elevated" 
      padding="none"
      className={cn(
        "product-card overflow-hidden transition-all duration-300",
        "hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
        "relative group"
      )}
    >
      {/* Badge */}
      {badgeProps && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant={badgeProps.variant} size="sm">
            {badgeProps.children}
          </Badge>
        </div>
      )}

      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="product-image-container relative overflow-hidden">
          <img
            src={
              imageError 
                ? "https://via.placeholder.com/400x400/1f2937/8b5cf6?text=Product"
                : product.image
            }
            alt={product.name}
            className="product-image group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>

      {/* Product Content */}
      <div className="product-card-content p-4">
        <div className="product-card-text space-y-3">
          <Typography 
            variant="h3" 
            size="lg" 
            weight="medium" 
            className="tech-subtitle line-clamp-2"
          >
            <Link 
              to={`/products/${product.id}`}
              className="hover:text-purple-400 transition-colors"
            >
              {product.name}
            </Link>
          </Typography>
          
          <Typography 
            variant="p" 
            size="sm" 
            color="muted" 
            className="tech-text line-clamp-3 flex-grow"
          >
            {product.description}
          </Typography>
        </div>
        
        <div className="product-card-actions space-y-3 mt-4">
          <PriceDisplay price={product.price} size="lg" />
          
          <Button 
            onClick={handleAddToCart} 
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full"
            size="md"
          >
            <Icon icon={ShoppingCart} size="sm" className="mr-2" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  )
}