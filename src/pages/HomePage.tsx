"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Rocket, ShoppingCart, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/context/cart-context"
import { useUser } from "@/context/user-context"
import { ProductCard } from "@/components/ProductCard"
import { UserProfile } from "@/components/UserProfile"
import { getProducts } from "@/lib/products"
import type { Product } from "@/lib/types"

type HomePageProps = {}

const HomePage: React.FC<HomePageProps> = () => {
  const { cart } = useCart()
  const { user } = useUser()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const productsData = await getProducts()
      setProducts(productsData)
    } catch (error) {
      console.error("Failed to load products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Rocket className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-white hover:bg-gray-800 rounded-md transition-colors"
              >
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-6 h-6 rounded-full" />
                <User className="h-4 w-4" />
              </button>
            )}
            <Link to="/cart">
              <button className="flex items-center gap-2 px-4 py-2 border border-purple-500 text-white hover:bg-purple-950 rounded-md transition-colors relative">
                <ShoppingCart className="h-4 w-4" />
                Cart
                {cart.length > 0 && (
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
        <section className="mb-16">
          <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8 mb-12">
            <div className="max-w-2xl">
              <span className="inline-block mb-4 px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                New Collection
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                The Future of Shopping is Here
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Discover cutting-edge products that will transform your everyday life.
              </p>
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
                Explore Collection
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-8 relative inline-block">
            Featured Products
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></span>
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">
                {searchTerm ? `No products found for "${searchTerm}"` : "No products available at the moment."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2025 Rocket. The future of shopping.</p>
        </div>
      </footer>

      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

export default HomePage
