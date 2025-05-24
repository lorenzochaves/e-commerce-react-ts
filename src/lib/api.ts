import type { Product } from "./types"

export const getProducts = async (): Promise<Product[]> => {
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

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const products = await getProducts()
    const product = products.find((product) => product.id === id)
    return product || null
  } catch (error) {
    console.error("Error loading product:", error)
    return null
  }
}
