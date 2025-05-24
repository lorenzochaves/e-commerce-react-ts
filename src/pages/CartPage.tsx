"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { Minus, Plus, Rocket, Trash2, ShoppingCart } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

type CartPageProps = {}

const CartPage: React.FC<CartPageProps> = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const subtotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  const handleCheckout = () => {
    navigate("/checkout")
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity)
    }
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
          Your Cart
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.product.image || "https://via.placeholder.com/100x100/1f2937/8b5cf6?text=Product"}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3>
                          <Link to={`/products/${item.product.id}`} className="text-white hover:text-purple-400">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="ml-4 text-purple-400">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-400 line-clamp-1">{item.product.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-700 rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, Math.max(1, item.quantity - 1))}
                            className="p-2 text-gray-400 hover:text-white"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-white">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="p-2 text-gray-400 hover:text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-800 pt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-purple-400">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <button
                    onClick={handleCheckout}
                    className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="w-full px-4 py-2 border border-gray-700 text-white hover:bg-gray-800 rounded-md transition-colors"
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default CartPage
