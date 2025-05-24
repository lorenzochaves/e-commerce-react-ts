"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { MainLayout } from "@/components/templates/MainLayout"
import { Header } from "@/components/organisms/Header"
import { CartNotifications } from "@/components/organisms/CartNotifications"
import { Footer } from "@/components/organisms/Footer"
import { UserProfile } from "@/components/organisms/UserProfile"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { Badge } from "@/components/atoms/Badge"
import { Icon } from "@/components/atoms/Icon"
import { Spinner } from "@/components/atoms/Spinner"
import { Card } from "@/components/atoms/Card"
import { PriceDisplay } from "@/components/molecules/PriceDisplay"
import { useCart } from "@/context/cart-context"
import { getProductById } from "@/lib/api"
import { scrollToTop } from "@/lib/utils"
import type { Product } from "@/lib/types"

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showProfile, setShowProfile] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadProduct(id)
    } else {
      setError("No product ID provided")
      setLoading(false)
    }
  }, [id])

  const loadProduct = async (productId: string) => {
    try {
      setLoading(true)
      setError(null)
      const productData = await getProductById(productId)
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

  const handleCategoryClick = (category: string) => {
    // Navigate to home with category filter
    window.location.href = `/?category=${category}`
  }

  const header = (
    <Header
      searchTerm=""
      onSearchChange={() => {}}
      onLogoClick={scrollToTop}
      onProfileClick={() => setShowProfile(true)}
    />
  )

  const footer = <Footer onCategoryClick={handleCategoryClick} />
  const notifications = <CartNotifications />
  const modals = <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />

  if (loading) {
    return (
      <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <Typography variant="p" size="xl">
              Loading product...
            </Typography>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (error || !product) {
    return (
      <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
        <div className="container mx-auto px-4 py-8">
          <Typography variant="h1" size="2xl" weight="bold" className="mb-4 text-red-400">
            {error || "Product not found"}
          </Typography>
          <Typography variant="p" color="muted" className="mb-4">
            Product ID: {id}
          </Typography>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors">
          <Icon icon={ArrowLeft} size="sm" className="mr-2" />
          Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <Card variant="outlined" padding="none" className="relative h-[400px] md:h-[500px] overflow-hidden">
            <img
              src={product.image || "https://via.placeholder.com/500x500/1f2937/8b5cf6?text=Product"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </Card>

          <div>
            <Badge variant="success" className="mb-4">
              In Stock
            </Badge>

            <Typography variant="h1" size="4xl" weight="bold" className="mb-4">
              {product.name}
            </Typography>

            <div className="mb-6">
              <PriceDisplay price={product.price} size="lg" />
            </div>

            <div className="mb-8">
              <Typography variant="p" color="gray">
                {product.description}
              </Typography>
            </div>

            <div className="space-y-4 mb-8">
              <Button onClick={handleAddToCart} isLoading={isLoading} size="lg" className="w-full">
                Add to Cart
              </Button>
            </div>

            <Card variant="outlined" padding="lg">
              <Typography variant="h3" size="lg" weight="semibold" className="mb-4">
                Product Details
              </Typography>
              <ul className="space-y-2 text-gray-300">
                <li>• Futuristic design</li>
                <li>• Advanced technology</li>
                <li>• Premium materials</li>
                <li>• 1-year warranty</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProductDetailPage
