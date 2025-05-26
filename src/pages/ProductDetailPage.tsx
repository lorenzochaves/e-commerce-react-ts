import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, ShoppingCart, Shield, Star, Truck } from "lucide-react"
import { MainLayout } from "@/components/templates/MainLayout"
import { Header } from "@/components/organisms/Header"
import { CartNotifications } from "@/components/organisms/CartNotifications"
import { Footer } from "@/components/organisms/Footer"
import { UserProfile } from "@/components/organisms/UserProfile"
import { LoadingScreen } from "@/components/molecules/LoadingScreen"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { Badge } from "@/components/atoms/Badge"
import { Icon } from "@/components/atoms/Icon"
import { Card } from "@/components/atoms/Card"
import { FadeIn } from "@/components/atoms/FadeIn"
import { PriceDisplay } from "@/components/molecules/PriceDisplay"
import { useCart } from "@/context/cart-context"
import { useSearch } from "@/context/search-context"
import { getProductById } from "@/lib/api"
import { scrollToTop, formatCurrency } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductFeature {
  icon: typeof Shield
  title: string
  description: string
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { resetSearch, setSearchTerm } = useSearch()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  // Memoized product features
  const productFeatures: ProductFeature[] = useMemo(() => [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Built with cutting-edge materials"
    },
    {
      icon: Star,
      title: "Futuristic Design", 
      description: "Next-generation aesthetics"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping worldwide"
    }
  ], [])

  // Load product data
  const loadProduct = useCallback(async (productId: string) => {
    try {
      setLoading(true)
      const productData = await getProductById(productId)
      setProduct(productData)
    } catch (error) {
      console.error("Failed to load product:", error)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Effects
  useEffect(() => {
    scrollToTop()
    if (id) {
      loadProduct(id)
    } else {
      setLoading(false)
    }
  }, [id, loadProduct])

  // Handlers
  const handleAddToCart = useCallback(() => {
    if (!product) return
    
    setIsAddingToCart(true)
    setTimeout(() => {
      addToCart(product, selectedQuantity)
      setIsAddingToCart(false)
    }, 500)
  }, [product, selectedQuantity, addToCart])

  const handleCategoryClick = useCallback((category: string) => {
    setSearchTerm("")
    navigate(`/?category=${encodeURIComponent(category)}`)
    scrollToTop()
  }, [navigate, setSearchTerm])

  const handleGoHome = useCallback(() => {
    resetSearch()
  }, [resetSearch])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  // Memoized components
  const header = useMemo(() => (
    <Header
      onLogoClick={handleGoHome}
      onProfileClick={() => setShowProfile(true)}
      onCategoryClick={handleCategoryClick}
    />
  ), [handleGoHome, handleCategoryClick])

  const footer = useMemo(() => (
    <Footer onCategoryClick={handleCategoryClick} />
  ), [handleCategoryClick])

  const notifications = useMemo(() => <CartNotifications />, [])
  
  const modals = useMemo(() => (
    <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
  ), [showProfile])

  // Loading state
  if (loading) {
    return (
      <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
        <LoadingScreen 
          variant="inline" 
          message="Loading product details..." 
          showLogo={false}
        />
      </MainLayout>
    )
  }

  // Error state
  if (!product) {
    return (
      <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
        <div className="container mx-auto px-4 py-16">
          <FadeIn>
            <div className="text-center max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon={ShoppingCart} size="xl" color="text-gray-600" />
              </div>
              
              <Typography variant="h2" size="2xl" weight="bold" className="mb-4 text-red-400">
                Product Not Found
              </Typography>
              
              <Typography variant="p" color="muted" className="mb-8">
                The product you're looking for doesn't exist or has been removed.
              </Typography>
              
              <Link to="/">
                <Button variant="primary" size="lg">
                  <Icon icon={ArrowLeft} size="sm" className="mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <FadeIn duration={600}>
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-400 hover:text-purple-400 mb-8 transition-colors group"
          >
            <Icon icon={ArrowLeft} size="sm" className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to products
          </Link>
        </FadeIn>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <FadeIn duration={800} delay={200}>
            <Card variant="outlined" padding="none" className="relative aspect-square overflow-hidden group">
              <img
                src={
                  imageError 
                    ? "https://via.placeholder.com/600x600/1f2937/8b5cf6?text=Product"
                    : product.image || "https://via.placeholder.com/600x600/1f2937/8b5cf6?text=Product"
                }
                alt={product.name}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Image overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </Card>
          </FadeIn>

          {/* Product Info */}
          <div className="space-y-6">
            <FadeIn duration={800} delay={400}>
              <div>
                <Badge variant="success" className="mb-4">
                  ✨ In Stock
                </Badge>

                <Typography variant="h1" size="4xl" weight="bold" className="mb-4 tech-title">
                  {product.name}
                </Typography>

                <div className="mb-6">
                  <PriceDisplay price={product.price} size="lg" />
                </div>
              </div>
            </FadeIn>

            <FadeIn duration={800} delay={600}>
              <div className="space-y-4">
                <Typography variant="p" className="text-gray-300 leading-relaxed tech-text">
                  {product.description}
                </Typography>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <Typography variant="p" weight="medium">
                    Quantity:
                  </Typography>
                  <div className="flex items-center border border-gray-700 rounded-lg">
                    <button
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="px-3 py-2 hover:bg-gray-800 transition-colors"
                      disabled={selectedQuantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 bg-gray-800 min-w-[60px] text-center">
                      {selectedQuantity}
                    </span>
                    <button
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="px-3 py-2 hover:bg-gray-800 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button 
                  onClick={handleAddToCart} 
                  isLoading={isAddingToCart} 
                  size="lg" 
                  className="w-full"
                  disabled={!product}
                >
                  <Icon icon={ShoppingCart} size="sm" className="mr-2" />
                  Add {selectedQuantity > 1 ? `${selectedQuantity} ` : ''}to Cart - {formatCurrency(product.price * selectedQuantity)}
                </Button>
              </div>
            </FadeIn>

            {/* Product Features */}
            <FadeIn duration={800} delay={800}>
              <Card variant="outlined" padding="lg" className="bg-gray-900/50 backdrop-blur-sm">
                <Typography variant="h3" size="lg" weight="semibold" className="mb-6 tech-subtitle">
                  Product Features
                </Typography>
                
                <div className="space-y-4">
                  {productFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon icon={feature.icon} size="sm" color="text-purple-400" />
                      </div>
                      <div>
                        <Typography variant="p" weight="medium" className="mb-1">
                          {feature.title}
                        </Typography>
                        <Typography variant="p" size="sm" color="muted">
                          {feature.description}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProductDetailPage