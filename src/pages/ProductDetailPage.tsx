"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeft, Rocket, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/context/cart-context"
import { getProductById } from "@/lib/products"
import type { Product } from "@/lib/types"

type ProductDetailPageProps = {}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart, cart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("ProductDetailPage mounted, id:", id)
    if (id) {
      loadProduct(id)
    } else {
      setError("No product ID provided")
      setLoading(false)
    }
  }, [id])

  const loadProduct = async (productId: string) => {
    try {
      console.log("Loading product with ID:", productId)
      setLoading(true)
      setError(null)
      const productData = await getProductById(productId)
      console.log("Product data received:", productData)
      setProduct(productData)
    } catch (error) {
      console.error("Failed to load product:", error)
      setError("Failed to load product")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    setIsLoading(true)
    setTimeout(() => {
      addToCart(product, 1)
      setIsLoading(false)
    }, 500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Rocket className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p>Loading product...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Error: {error}</h1>
          <p className="text-gray-400 mb-4">Product ID: {id}</p>
          <Link to="/">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md">Back to Home</button>
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-400 mb-4">Product ID: {id}</p>
          <Link to="/">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md">Back to Home</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="h-8 w-8 text-purple-500" />
            <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              ROCKET
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <button className="flex items-center gap-2 px-4 py-2 border border-purple-500 text-white hover:bg-purple-950 rounded-md transition-colors relative">
                <ShoppingCart className="h-4 w-4" />
                Cart
                {cart.reduce((total, item) => total + item.quantity, 0) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-purple-400 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-gray-800">
            <img
              src={product.image || "https://via.placeholder.com/500x500/1f2937/8b5cf6?text=Product"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span className="inline-block mb-4 px-3 py-1 bg-purple-500 text-white text-sm rounded-full">In Stock</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-purple-400 mb-6">${product.price.toFixed(2)}</p>
            <div className="mb-8">
              <p className="text-gray-300">{product.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                <ShoppingCart className="h-4 w-4" />
                {isLoading ? "Adding..." : "Add to Cart"}
              </button>
            </div>

            <div className="pt-8 border-t border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Futuristic design</li>
                <li>• Advanced technology</li>
                <li>• Premium materials</li>
                <li>• 1-year warranty</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetailPage
