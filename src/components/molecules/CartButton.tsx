import type React from "react"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"
import { Badge } from "@/components/atoms/Badge"

interface CartButtonProps {
  itemCount: number
}

export const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
  return (
    <Link to="/cart">
      <Button variant="outline" className="relative group">
        <Icon icon={ShoppingCart} size="sm" className="group-hover:animate-bounce" />
        Cart
        {itemCount > 0 && (
          <Badge
            variant="primary"
            size="sm"
            animate
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
          >
            {itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
