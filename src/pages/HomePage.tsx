"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
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
import { Button } from "@/components/atoms/Button"
import { LoadingScreen } from "@/components/molecules/LoadingScreen" // Separar loading
import { useSearch } from "@/context/search-context"
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

  const { resetSearch } = useSearch()
  
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
  } = useProductFilters(products)

  // Memoizar funções pesadas
  const getCurrentTitle = useCallback(() => {
    if (showAllProducts) return "All Products"
    if (selectedCategory) {
      const category = CATEGORIES.find((c) => c.id === selectedCategory)
      return `${category?.name} Products`
    }
    if (searchTerm) return "Search Results"

    switch (activeSection) {
      case "bestsellers": return "Best Sellers"
      case "newarrivals": return "New Arrivals"
      default: return "Featured Products"
    }
  }, [showAllProducts, selectedCategory, searchTerm, activeSection])

  const getCurrentDescription = useCallback(() => {
    if (showAllProducts) return `Browse all ${products.length} products in our collection`
    if (selectedCategory) {
      const category = CATEGORIES.find((c) => c.id === selectedCategory)
      return `Explore our ${category?.description.toLowerCase()}`
    }
    if (searchTerm) return `${getCurrentProducts().length} products found`

    switch (activeSection) {
      case "bestsellers": return "Most popular products this month"
      case "newarrivals": return "Latest additions to our futuristic collection"
      default: return "Hand-picked products that define the future"
    }
  }, [showAllProducts, selectedCategory, searchTerm, activeSection, products.length, getCurrentProducts])

  // Carregar produtos apenas uma vez
  const loadProducts = useCallback(async () => {
    try {
      const productsData = await getProducts()
      setProducts(productsData)
    } catch (error) {
      console.error("Failed to load products:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Handlers memoizados
  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category)
    setSearchTerm("")
    setShowAllProducts(false)
    navigate(`/?category=${encodeURIComponent(category)}`)
    setTimeout(scrollToTop, 150)
  }, [navigate, setSelectedCategory, setSearchTerm, setShowAllProducts])

  const handleViewAll = useCallback(() => {
    setShowAllProducts(true)
    setSelectedCategory("")
    setSearchTerm("")
    navigate('/')
    scrollToTop()
  }, [navigate, setShowAllProducts, setSelectedCategory, setSearchTerm])

  const goBackHome = useCallback(() => {
    resetSearch()
    setSelectedCategory("")
    setSearchTerm("")
    setShowAllProducts(false)
    setActiveSection("featured")
  }, [resetSearch, setSelectedCategory, setSearchTerm, setShowAllProducts, setActiveSection])

  // Effect para carregar dados iniciais
  useEffect(() => {
    loadProducts()
    setIsVisible(true)
  }, [loadProducts])

  // Effect para parâmetros de URL
  useEffect(() => {
    const searchTermFromUrl = searchParams.get('search')
    const categoryFromUrl = searchParams.get('category')
    
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
      setSelectedCategory("")
      setShowAllProducts(false)
    } else if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
      setSearchTerm("")
      setShowAllProducts(false)
    }
  }, [location.search, setSearchTerm, setSelectedCategory, setShowAllProducts])

  // Memoizar componentes pesados
  const memoizedHeader = useMemo(() => (
    <Header
      onLogoClick={goBackHome}
      onProfileClick={() => setShowProfile(true)}
      onCategoryClick={handleCategoryClick}
    />
  ), [goBackHome, handleCategoryClick])

  const memoizedFooter = useMemo(() => (
    <Footer onCategoryClick={handleCategoryClick} />
  ), [handleCategoryClick])

  const backToHomeButton = useMemo(() => (
    isFiltered ? (
      <Button 
        variant="outline" 
        onClick={goBackHome}
        className="bg-gray-900/50 backdrop-blur-sm border-purple-500/50 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 whitespace-nowrap"
      >
        Back to Home
      </Button>
    ) : undefined
  ), [isFiltered, goBackHome])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <MainLayout 
      header={memoizedHeader} 
      footer={memoizedFooter} 
      notifications={<CartNotifications />} 
      modals={<UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />}
    >
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {!isFiltered && (
          <>
            <FadeIn direction="up" duration={1000}>
              <HeroVideo />
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={200}>
              <FeaturesSection />
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={300}>
              <CategoriesGrid onCategoryClick={handleCategoryClick} />
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={400}>
              <ProductTabs activeSection={activeSection} onSectionChange={setActiveSection} />
            </FadeIn>
          </>
        )}

        <FadeIn direction="up" duration={800} delay={500}>
          <ProductGrid
            title={getCurrentTitle()}
            description={getCurrentDescription()}
            products={getCurrentProducts()}
            showViewAll={!isFiltered}
            onViewAll={handleViewAll}
            customButton={backToHomeButton}
          />
        </FadeIn>

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