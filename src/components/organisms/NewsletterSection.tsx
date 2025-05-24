"use client"

import type React from "react"
import { useState } from "react"
import { Typography } from "@/components/atoms/Typography"
import { Input } from "@/components/atoms/Input"
import { Button } from "@/components/atoms/Button"

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")
      // Show success message
    }, 1000)
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-2xl p-12 text-center animate-fade-in-up relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 border border-white/20 rounded-full animate-ping"></div>
          <div
            className="absolute bottom-4 right-4 w-20 h-20 border border-white/20 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10">
          <Typography variant="h2" size="3xl" weight="bold" className="mb-4">
            Stay Ahead of the Future
          </Typography>
          <Typography variant="p" color="gray" className="mb-8 max-w-2xl mx-auto">
            Be the first to know about new product launches, exclusive offers, and the latest in futuristic technology.
          </Typography>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" isLoading={isSubmitting} className="group">
              <span className="group-hover:animate-pulse">Subscribe</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
