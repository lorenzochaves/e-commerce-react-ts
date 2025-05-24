"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/atoms/Input"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { Card } from "@/components/atoms/Card"

interface CheckoutFormProps {
  onSubmit: (formData: any) => void
  isSubmitting: boolean
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    paymentMethod: "card",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Information */}
      <Card variant="elevated" padding="lg">
        <Typography variant="h2" size="xl" weight="semibold" className="mb-4">
          Shipping Information
        </Typography>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
          />
          <div className="sm:col-span-2">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="Address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </div>
          <Input
            label="City"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            required
          />
          <Input
            label="Postal Code"
            value={formData.postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
            required
          />
        </div>
      </Card>

      {/* Payment Method */}
      <Card variant="elevated" padding="lg">
        <Typography variant="h2" size="xl" weight="semibold" className="mb-4">
          Payment Method
        </Typography>

        <div className="space-y-4 mb-4">
          <div className="flex items-center space-x-2 border border-gray-800 p-3 rounded-md">
            <input
              type="radio"
              id="card"
              name="payment"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
              className="text-purple-500"
            />
            <label htmlFor="card" className="flex-1 cursor-pointer">
              Credit Card
            </label>
          </div>
          <div className="flex items-center space-x-2 border border-gray-800 p-3 rounded-md">
            <input
              type="radio"
              id="paypal"
              name="payment"
              value="paypal"
              checked={formData.paymentMethod === "paypal"}
              onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
              className="text-purple-500"
            />
            <label htmlFor="paypal" className="flex-1 cursor-pointer">
              PayPal
            </label>
          </div>
        </div>

        {formData.paymentMethod === "card" && (
          <div className="grid gap-4">
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={(e) => handleInputChange("expiry", e.target.value)}
              />
              <Input
                label="CVC"
                placeholder="123"
                value={formData.cvc}
                onChange={(e) => handleInputChange("cvc", e.target.value)}
              />
            </div>
          </div>
        )}
      </Card>

      <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? "Processing..." : "Complete Order"}
      </Button>
    </form>
  )
}
