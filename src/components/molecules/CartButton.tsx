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
        {itemCount > 0 && (
          <Badge
            variant="primary"
            size="xs"
            animate="pulse"
            className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5 py-0 flex items-center justify-center text-xs font-bold"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}