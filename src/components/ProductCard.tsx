"use client"

import type React from "react"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = () => {
    setIsLoading(true)
    setTimeout(() => {
      addToCart(product, 1)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="overflow-hidden bg-gray-900 border border-gray-800 rounded-lg transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
      <Link to={`/products/${product.id}`}>
        <div className="relative h-48 overflow-hidden cursor-pointer">
          <img
            src={product.image || "https://via.placeholder.com/400x400/1f2937/8b5cf6?text=Product"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-white">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="text-purple-400 font-bold mb-4">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          <ShoppingCart className="h-4 w-4" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
