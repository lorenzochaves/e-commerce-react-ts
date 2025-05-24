"use client"

import type React from "react"
import { useState } from "react"
import { Package, ShoppingBag, Calendar, DollarSign, X } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { Avatar } from "@/components/atoms/Avatar"
import { Badge } from "@/components/atoms/Badge"
import { Icon } from "@/components/atoms/Icon"
import { Card } from "@/components/atoms/Card"
import { useUser } from "@/context/user-context"
import { formatDate } from "@/lib/utils"

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, orders, getUserStats } = useUser()
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile")

  if (!isOpen || !user) return null

  const stats = getUserStats()

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "success"
      case "shipped":
        return "primary"
      case "processing":
        return "warning"
      default:
        return "secondary"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card variant="elevated" className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <Typography variant="h2" size="2xl" weight="bold">
            User Profile
          </Typography>
          <Button variant="ghost" onClick={onClose} size="sm">
            <Icon icon={X} size="lg" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <Button
            variant={activeTab === "profile" ? "primary" : "ghost"}
            onClick={() => setActiveTab("profile")}
            className="rounded-none border-b-2 border-transparent data-[active=true]:border-purple-400"
          >
            Profile
          </Button>
          <Button
            variant={activeTab === "orders" ? "primary" : "ghost"}
            onClick={() => setActiveTab("orders")}
            className="rounded-none border-b-2 border-transparent data-[active=true]:border-purple-400"
          >
            Order History
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <Avatar src={user.avatar} alt={user.name} size="lg" />
                <div>
                  <Typography variant="h3" size="xl" weight="bold">
                    {user.name}
                  </Typography>
                  <Typography variant="p" color="muted">
                    {user.email}
                  </Typography>
                  <Typography variant="p" size="sm" color="muted">
                    Member since {formatDate(user.joinDate)}
                  </Typography>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="elevated" padding="lg">
                  <div className="flex items-center gap-3">
                    <Icon icon={ShoppingBag} size="xl" color="text-purple-400" />
                    <div>
                      <Typography variant="p" size="2xl" weight="bold">
                        {stats.totalOrders}
                      </Typography>
                      <Typography variant="p" size="sm" color="muted">
                        Total Orders
                      </Typography>
                    </div>
                  </div>
                </Card>

                <Card variant="elevated" padding="lg">
                  <div className="flex items-center gap-3">
                    <Icon icon={DollarSign} size="xl" color="text-green-400" />
                    <div>
                      <Typography variant="p" size="2xl" weight="bold">
                        ${stats.totalSpent.toFixed(2)}
                      </Typography>
                      <Typography variant="p" size="sm" color="muted">
                        Total Spent
                      </Typography>
                    </div>
                  </div>
                </Card>

                <Card variant="elevated" padding="lg">
                  <div className="flex items-center gap-3">
                    <Icon icon={Package} size="xl" color="text-blue-400" />
                    <div>
                      <Typography variant="p" size="2xl" weight="bold">
                        {stats.favoriteCategory}
                      </Typography>
                      <Typography variant="p" size="sm" color="muted">
                        Favorite Category
                      </Typography>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Icon icon={Package} size="xl" color="text-gray-600" className="mx-auto mb-4" />
                  <Typography variant="p" color="muted">
                    No orders yet
                  </Typography>
                </div>
              ) : (
                orders.map((order) => (
                  <Card key={order.id} variant="elevated" padding="lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Typography variant="h4" weight="semibold">
                          Order #{order.id.slice(-6)}
                        </Typography>
                        <Badge variant={getStatusVariant(order.status)} size="sm">
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Typography variant="p" color="primary" weight="bold">
                          ${order.total.toFixed(2)}
                        </Typography>
                        <Typography variant="p" size="sm" color="muted">
                          {formatDate(order.orderDate)}
                        </Typography>
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
                            <Typography variant="p" size="sm">
                              {item.product.name}
                            </Typography>
                            <Typography variant="p" size="sm" color="muted">
                              Qty: {item.quantity} × ${item.priceAtTime.toFixed(2)}
                            </Typography>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.deliveryDate && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex items-center gap-2 text-sm text-green-400">
                          <Icon icon={Calendar} size="sm" />
                          Delivered on {formatDate(order.deliveryDate)}
                        </div>
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
