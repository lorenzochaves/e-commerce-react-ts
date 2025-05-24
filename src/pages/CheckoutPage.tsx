"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { useUser } from "@/context/user-context"
import { CheckCircle2, Rocket } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

type CheckoutPageProps = {}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const { cart, clearCart } = useCart()
  const { addOrder } = useUser()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const subtotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      // Add order to user's order history
      addOrder(cart, subtotal)

      setIsSubmitting(false)
      setIsComplete(true)
      clearCart()
    }, 2000)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Rocket className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (cart.length === 0 && !isComplete) {
    navigate("/cart")
    return null
  }

  if (isComplete) {
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
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Order Complete!</h1>
            <p className="text-gray-400 mb-8">
              Thank you for your purchase. Your order has been successfully placed and will be processed soon. You can
              view your order history in your profile.
            </p>
            <div className="space-y-4">
              <Link to="/">
                <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </main>
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 relative inline-block">
          Checkout
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium">
                      Address
                    </label>
                    <input
                      id="address"
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium">
                      City
                    </label>
                    <input
                      id="city"
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="postalCode" className="block text-sm font-medium">
                      Postal Code
                    </label>
                    <input
                      id="postalCode"
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border border-gray-800 p-3 rounded-md">
                    <input
                      type="radio"
                      id="card"
                      name="payment"
                      value="card"
                      defaultChecked
                      className="text-purple-500"
                    />
                    <label htmlFor="card" className="flex-1 cursor-pointer">
                      Credit Card
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 border border-gray-800 p-3 rounded-md">
                    <input type="radio" id="paypal" name="payment" value="paypal" className="text-purple-500" />
                    <label htmlFor="paypal" className="flex-1 cursor-pointer">
                      PayPal
                    </label>
                  </div>
                </div>

                <div className="mt-4 grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium">
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="expiry" className="block text-sm font-medium">
                        Expiry Date
                      </label>
                      <input
                        id="expiry"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cvc" className="block text-sm font-medium">
                        CVC
                      </label>
                      <input
                        id="cvc"
                        placeholder="123"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Complete Order"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div>
                      <span className="text-gray-300">{item.product.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Total</span>
                  <span className="text-purple-400">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CheckoutPage
