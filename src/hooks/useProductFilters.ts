"use client"

import { useState, useMemo } from "react"
import type { Product } from "@/lib/types"

export const useProductFilters = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [activeSection, setActiveSection] = useState<"featured" | "bestsellers" | "newarrivals">("featured")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  const getProductsByCategory = (category: string, limit = 4) => {
    return products.filter((product) => product.category === category).slice(0, limit)
  }

  const featuredProducts = useMemo(
    () => [
      ...getProductsByCategory("transportation", 1),
      ...getProductsByCategory("neural-tech", 1),
      ...getProductsByCategory("wearables", 1),
      ...getProductsByCategory("home-living", 1),
    ],
    [products],
  )

  const bestSellers = useMemo(
    () =>
      products.filter((product) => product.badge === "bestseller").sort((a, b) => (a.rank || 999) - (b.rank || 999)),
    [products],
  )

  const newArrivals = useMemo(() => products.filter((product) => product.badge === "new"), [products])

  const getCurrentProducts = () => {
    if (showAllProducts) return products
    if (selectedCategory) return filteredProducts
    if (searchTerm) return filteredProducts

    switch (activeSection) {
      case "bestsellers":
        return bestSellers
      case "newarrivals":
        return newArrivals
      default:
        return featuredProducts
    }
  }

  const isFiltered = selectedCategory || searchTerm || showAllProducts

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showAllProducts,
    setShowAllProducts,
    activeSection,
    setActiveSection,
    filteredProducts,
    featuredProducts,
    bestSellers,
    newArrivals,
    getCurrentProducts,
    isFiltered,
  }
}
