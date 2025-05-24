import type { Product } from "./types"

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("/products.json")
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    const products: Product[] = await response.json()
    return products
  } catch (error) {
    console.error("Error loading products:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const products = await getProducts()
    return products.find((product) => product.id === id) || null
  } catch (error) {
    console.error("Error loading product:", error)
    return null
  }
}
