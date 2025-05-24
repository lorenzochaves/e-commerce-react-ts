import { Routes, Route } from "react-router-dom"
import { UserProvider } from "@/context/user-context"
import { CartProvider } from "@/context/cart-context"
import HomePage from "@/pages/HomePage"
import ProductDetailPage from "@/pages/ProductDetailPage"
import CartPage from "@/pages/CartPage"
import CheckoutPage from "@/pages/CheckoutPage"

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </CartProvider>
    </UserProvider>
  )
}

export default App
