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
import { Button } from "@/components/atoms/Button"
import { Spinner } from "@/components/atoms/Spinner"
import { CartItemCard } from "@/components/molecules/CartItemCard"
import { OrderSummary } from "@/components/molecules/OrderSummary"
import { EmptyCart } from "@/components/molecules/EmptyCart"
import { useCart } from "@/context/cart-context"
import { scrollToTop } from "@/lib/utils"

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCheckout = () => {
    navigate("/checkout")
  }

  const handleCategoryClick = (category: string) => {
    navigate(`/?category=${category}`)
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

  if (!mounted) {
    return (
      <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <Typography variant="p" size="xl">
              Loading cart...
            </Typography>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout header={header} footer={footer} notifications={notifications} modals={modals}>
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h1" size="3xl" weight="bold" className="mb-8 relative inline-block animate-fade-in-up">
          Your Cart
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></span>
        </Typography>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={item.product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <CartItemCard item={item} onQuantityChange={updateQuantity} onRemove={removeFromCart} />
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                <Button variant="outline" onClick={() => clearCart()} className="flex-1">
                  Clear Cart
                </Button>
                <Button variant="secondary" onClick={() => navigate("/")} className="flex-1">
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <OrderSummary items={cart} />
              <div className="mt-6">
                <Button onClick={handleCheckout} size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default CartPage
