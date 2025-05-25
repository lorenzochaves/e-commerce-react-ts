"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLocation, useSearchParams, useNavigate } from "react-router-dom"
import { MainLayout } from "@/components/templates/MainLayout"
import { Header } from "@/components/organisms/Header"
import { CartNotifications } from "@/components/organisms/CartNotifications"
import { HeroVideo } from "@/components/organisms/HeroVideo"
import { FeaturesSection } from "@/components/organisms/FeaturesSection"
import { CategoriesGrid } from "@/components/organisms/CategoriesGrid"
import { ProductTabs } from "@/components/organisms/ProductTabs"
import { ProductGrid } from "@/components/organisms/ProductGrid"
import { NewsletterSection } from "@/components/organisms/NewsletterSection"
import { Footer } from "@/components/organisms/Footer"
import { UserProfile } from "@/components/organisms/UserProfile"
import { FadeIn } from "@/components/atoms/FadeIn"
import { useSearch } from "@/context/search-context"

import { Button } from "@/components/atoms/Button"
import { Spinner } from "@/components/atoms/Spinner"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { getProducts } from "@/lib/api"
import { useProductFilters } from "@/hooks/useProductFilters"
import { scrollToTop } from "@/lib/utils"
import { CATEGORIES } from "@/constants/categories"
import type { Product } from "@/lib/types"

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showProfile, setShowProfile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Obter o termo de busca global e a função para atualizá-lo
  const { searchTerm: globalSearchTerm, setSearchTerm: setGlobalSearchTerm } = useSearch()
  
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showAllProducts,
    setShowAllProducts,
    activeSection,
    setActiveSection,
    getCurrentProducts,
    isFiltered,
    // featuredProducts,
    // bestSellers,
    // newArrivals,
  } = useProductFilters(products)

  useEffect(() => {
    loadProducts()
    setIsVisible(true)
    
    // Verificar parâmetros de URL no carregamento
    const searchTermFromUrl = searchParams.get('search')
    const categoryFromUrl = searchParams.get('category')
    
    if (searchTermFromUrl) {
      // Definir o termo de busca local
      setSearchTerm(searchTermFromUrl)
      setSelectedCategory("")
      setShowAllProducts(false)
      
      // Não atualizamos setGlobalSearchTerm aqui para evitar atualizações circulares
    } else if (categoryFromUrl) {
      // Definir a categoria
      setSelectedCategory(categoryFromUrl)
      setSearchTerm("")
      setShowAllProducts(false)
    }
  }, [])

  // Verificar se os parâmetros de URL mudaram (para navegação entre páginas)
  useEffect(() => {
    const searchTermFromUrl = searchParams.get('search')
    const categoryFromUrl = searchParams.get('category')
    
    if (searchTermFromUrl) {
      // Apenas atualiza o estado local
      setSearchTerm(searchTermFromUrl)
      setSelectedCategory("")
      setShowAllProducts(false)
    } else if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
      setSearchTerm("")
      setShowAllProducts(false)
    }
  }, [location.search])

  // Sincronizar o estado local com o estado global de busca apenas quando o termo de busca global mudar
  useEffect(() => {
    if (globalSearchTerm && globalSearchTerm !== searchTerm) {
      setSearchTerm(globalSearchTerm)
      setSelectedCategory("")
      setShowAllProducts(false)
    }
  }, [globalSearchTerm])

  // Não atualizamos mais o estado global quando o estado local muda
  // Isso evita atualizações circulares e feedback enquanto o usuário digita

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setSearchTerm("")
    setShowAllProducts(false)
    // Atualizar a URL com o parâmetro de categoria
    navigate(`/?category=${encodeURIComponent(category)}`)
    // Garantir que o scroll aconteça após a atualização da UI
    setTimeout(() => {
      scrollToTop()
    }, 150)
  }

  const handleViewAll = () => {
    setShowAllProducts(true)
    setSelectedCategory("")
    setSearchTerm("")
    // Limpar parâmetros da URL
    navigate('/')
    scrollToTop()
  }

  const goBackHome = () => {
    setSelectedCategory("")
    setSearchTerm("")
    setGlobalSearchTerm("") // Importante: limpar também o termo de busca global
    setShowAllProducts(false)
    setActiveSection("featured")
    // Limpar parâmetros da URL
    navigate('/', { replace: true }) // Usar replace para evitar pilha de navegação
    scrollToTop()
  }

  const getCurrentTitle = () => {
    if (showAllProducts) return "All Products"
    if (selectedCategory) return `${CATEGORIES.find((c) => c.id === selectedCategory)?.name} Products`
    if (searchTerm) return "Search Results"

    switch (activeSection) {
      case "bestsellers":
        return "Best Sellers"
      case "newarrivals":
        return "New Arrivals"
      default:
        return "Featured Products"
    }
  }

  const getCurrentDescription = () => {
    if (showAllProducts) return `Browse all ${products.length} products in our collection`
    if (selectedCategory)
      return `Explore our ${CATEGORIES.find((c) => c.id === selectedCategory)?.description.toLowerCase()}`
    if (searchTerm) return `${getCurrentProducts().length} products found`

    switch (activeSection) {
      case "bestsellers":
        return "Most popular products this month"
      case "newarrivals":
        return "Latest additions to our futuristic collection"
      default:
        return "Hand-picked products that define the future"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-4">
            <Icon icon={() => <div>🚀</div>} size="xl" className="mx-auto animate-bounce" />
            <Spinner size="lg" className="absolute inset-0 mx-auto" />
          </div>
          <Typography variant="p" size="xl" weight="semibold" className="animate-pulse">
            Loading the future...
          </Typography>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  const header = (
    <Header
      onLogoClick={goBackHome}
      onProfileClick={() => setShowProfile(true)}
      onCategoryClick={handleCategoryClick}
    />
  )

  const footer = <Footer onCategoryClick={handleCategoryClick} />

  const notifications = <CartNotifications />

  const modals = <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />

  return (
    <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
      <div
        className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Hero Section */}
        {!isFiltered && (
          <FadeIn direction="up" duration={1000}>
            <HeroVideo />
          </FadeIn>
        )}

        {/* Features Section */}
        {!isFiltered && (
          <FadeIn direction="up" duration={800} delay={200}>
            <FeaturesSection />
          </FadeIn>
        )}

        {/* Categories Section */}
        {!isFiltered && (
          <FadeIn direction="up" duration={800} delay={300}>
            <CategoriesGrid onCategoryClick={handleCategoryClick} />
          </FadeIn>
        )}

        {/* Product Tabs */}
        {!isFiltered && (
          <FadeIn direction="up" duration={800} delay={400}>
            <ProductTabs activeSection={activeSection} onSectionChange={setActiveSection} />
          </FadeIn>
        )}

        {/* Products Grid */}
        <FadeIn direction="up" duration={800} delay={500}>
          <ProductGrid
            title={getCurrentTitle()}
            description={getCurrentDescription()}
            products={getCurrentProducts()}
            showViewAll={!isFiltered}
            onViewAll={handleViewAll}
            customButton={isFiltered ? (
              <Button 
                variant="outline" 
                onClick={goBackHome}
                className="bg-gray-900/50 backdrop-blur-sm border-purple-500/50 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 whitespace-nowrap"
              >
                Back to Home
              </Button>
            ) : undefined}
          />
        </FadeIn>

        {/* Newsletter Section */}
        {!isFiltered && (
          <FadeIn direction="up" duration={800} delay={600}>
            <NewsletterSection />
          </FadeIn>
        )}
      </div>
    </MainLayout>
  )
}

export default HomePage
