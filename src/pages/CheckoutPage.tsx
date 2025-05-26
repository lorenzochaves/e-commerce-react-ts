"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "@/components/templates/MainLayout"
import { Header } from "@/components/organisms/Header"
import { CartNotifications } from "@/components/organisms/CartNotifications"
import { Footer } from "@/components/organisms/Footer"
import { UserProfile } from "@/components/organisms/UserProfile"
import { Typography } from "@/components/atoms/Typography"
import { Spinner } from "@/components/atoms/Spinner"
import { CheckoutForm } from "@/components/molecules/CheckoutForm"
import { OrderSummary } from "@/components/molecules/OrderSummary"
import { OrderComplete } from "@/components/molecules/OrderComplete"
import { useCart } from "@/context/cart-context"
import { useUser } from "@/context/user-context"
import { useSearch } from "@/context/search-context"
import { scrollToTop } from "@/lib/utils"

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart()
  const { addOrder } = useUser()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const handleSubmit = (_formData: any) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Add order to user's order history
      addOrder(cart, subtotal)

      setIsSubmitting(false)
      setIsComplete(true)
      clearCart()
    }, 2000)
  }

  const { setSearchTerm, resetSearch } = useSearch()

  const handleCategoryClick = (category: string) => {
    // Reset search term when navigating to a category
    setSearchTerm("")
    navigate(`/?category=${encodeURIComponent(category)}`)
    scrollToTop()
  }
  
  const goToHomepage = () => {
    // Usar a função centralizada para resetar busca e voltar para home
    resetSearch()
  }

  const header = (
    <Header
      onLogoClick={goToHomepage}
      onProfileClick={() => setShowProfile(true)}
      onCategoryClick={handleCategoryClick}
    />
  )

  const footer = <Footer onCategoryClick={handleCategoryClick} />
  const notifications = <CartNotifications />
  const modals = <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />

  if (!mounted) {
    return (
      <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <Typography variant="p" size="xl">
              Loading checkout...
            </Typography>
          </div>
        </div>
      </MainLayout>
    )
  }

  // Redirect to cart if empty and not complete
  if (cart.length === 0 && !isComplete) {
    navigate("/cart")
    return null
  }

  // Show order complete screen
  if (isComplete) {
    return (
      <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
        <div className="container mx-auto px-4 py-12">
          <OrderComplete />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h1" size="3xl" weight="bold" className="mb-8 relative inline-block animate-fade-in-up">
          Checkout
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></span>
        </Typography>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 animate-fade-in-up">
            <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <OrderSummary items={cart} showItemDetails />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CheckoutPage
