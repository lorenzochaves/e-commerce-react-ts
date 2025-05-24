import type React from "react"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"

export const EmptyCart: React.FC = () => {
  return (
    <div className="text-center py-12 animate-fade-in-up">
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon icon={ShoppingCart} size="xl" color="text-gray-600" />
      </div>

      <Typography variant="h2" size="2xl" weight="semibold" className="mb-4">
        Your cart is empty
      </Typography>

      <Typography variant="p" color="muted" className="mb-8 max-w-md mx-auto">
        Looks like you haven't added any products to your cart yet. Start exploring our futuristic collection!
      </Typography>

      <Link to="/">
        <Button size="lg" className="group">
          Continue Shopping
          <Icon icon={ShoppingCart} size="sm" className="group-hover:animate-bounce" />
        </Button>
      </Link>
    </div>
  )
}
