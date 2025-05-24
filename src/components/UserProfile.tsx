"use client"

import type React from "react"
import { useState } from "react"
import { Package, ShoppingBag, Calendar, DollarSign, X } from "lucide-react"
import { useUser } from "@/context/user-context"

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, orders, getUserStats } = useUser()
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile")

  if (!isOpen || !user) return null

  const stats = getUserStats()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-400 bg-green-400/10"
      case "shipped":
        return "text-blue-400 bg-blue-400/10"
      case "processing":
        return "text-yellow-400 bg-yellow-400/10"
      default:
        return "text-gray-400 bg-gray-400/10"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">User Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "profile"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "orders" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Order History
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-20 h-20 rounded-full border-2 border-purple-500"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-500">Member since {formatDate(user.joinDate)}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-8 w-8 text-purple-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
                      <p className="text-sm text-gray-400">Total Orders</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">${stats.totalSpent.toFixed(2)}</p>
                      <p className="text-sm text-gray-400">Total Spent</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{stats.favoriteCategory}</p>
                      <p className="text-sm text-gray-400">Favorite Category</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No orders yet</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-white">Order #{order.id.slice(-6)}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-purple-400 font-bold">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-400">{formatDate(order.orderDate)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-white">{item.product.name}</p>
                            <p className="text-gray-400">
                              Qty: {item.quantity} × ${item.priceAtTime.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.deliveryDate && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex items-center gap-2 text-sm text-green-400">
                          <Calendar className="h-4 w-4" />
                          Delivered on {formatDate(order.deliveryDate)}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
