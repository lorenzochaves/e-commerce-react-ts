"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MainLayout } from "@/components/templates/MainLayout"
import { Header } from "@/components/organisms/Header"
import { CartNotifications } from "@/components/organisms/CartNotifications"
import { HeroCarousel } from "@/components/organisms/HeroCarousel"
import { FeaturesSection } from "@/components/organisms/FeaturesSection"
import { CategoriesGrid } from "@/components/organisms/CategoriesGrid"
import { ProductTabs } from "@/components/organisms/ProductTabs"
import { ProductGrid } from "@/components/organisms/ProductGrid"
import { NewsletterSection } from "@/components/organisms/NewsletterSection"
import { Footer } from "@/components/organisms/Footer"
import { UserProfile } from "@/components/organisms/UserProfile"
import { CountdownTimer } from "@/components/molecules/CountdownTimer"
import { FilterChip } from "@/components/molecules/FilterChip"
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
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showProfile, setShowProfile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setSelectedCategory("")
    setShowAllProducts(false)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setSearchTerm("")
    setShowAllProducts(false)
    scrollToTop()
  }

  const handleViewAll = () => {
    setShowAllProducts(true)
    setSelectedCategory("")
    setSearchTerm("")
    scrollToTop()
  }

  const goBackHome = () => {
    setSelectedCategory("")
    setSearchTerm("")
    setShowAllProducts(false)
    setActiveSection("featured")
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
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
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
          <section className="container mx-auto px-6 py-12 md:py-20">
            <HeroCarousel onCategoryClick={handleCategoryClick} />
            <div className="mt-12">
              <CountdownTimer />
            </div>
          </section>
        )}

        {/* Features Section */}
        {!isFiltered && <FeaturesSection />}

        {/* Categories Section */}
        {!isFiltered && <CategoriesGrid onCategoryClick={handleCategoryClick} />}

        {/* Active Filters */}
        {isFiltered && (
          <section className="container mx-auto px-4 py-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                {selectedCategory && (
                  <FilterChip
                    label="Category"
                    value={CATEGORIES.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                    onRemove={() => setSelectedCategory("")}
                    variant="primary"
                  />
                )}
                {searchTerm && (
                  <FilterChip
                    label="Search"
                    value={`"${searchTerm}"`}
                    onRemove={() => setSearchTerm("")}
                    variant="secondary"
                  />
                )}
                {showAllProducts && (
                  <FilterChip
                    label="View"
                    value="All Products"
                    onRemove={() => setShowAllProducts(false)}
                    variant="success"
                  />
                )}
              </div>
              <Button variant="outline" onClick={goBackHome}>
                Back to Home
              </Button>
            </div>
          </section>
        )}

        {/* Product Tabs */}
        {!isFiltered && <ProductTabs activeSection={activeSection} onSectionChange={setActiveSection} />}

        {/* Products Grid */}
        <ProductGrid
          title={getCurrentTitle()}
          description={getCurrentDescription()}
          products={getCurrentProducts()}
          showViewAll={!isFiltered}
          onViewAll={handleViewAll}
        />

        {/* Newsletter Section */}
        {!isFiltered && <NewsletterSection />}
      </div>
    </MainLayout>
  )
}

export default HomePage
