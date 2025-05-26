import type React from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"
import { Typography } from "@/components/atoms/Typography"

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  min?: number
  max?: number
  size?: "sm" | "md" | "lg"
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = "md",
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className="flex items-center border border-gray-700 rounded-md">
      <Button
        variant="ghost"
        size={size}
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="border-0 rounded-r-none"
      >
        <Icon icon={Minus} size="sm" />
      </Button>
      <div className="px-4 py-2 min-w-[3rem] text-center">
        <Typography variant="span" weight="medium">
          {quantity}
        </Typography>
      </div>
      <Button
        variant="ghost"
        size={size}
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="border-0 rounded-l-none"
      >
        <Icon icon={Plus} size="sm" />
      </Button>
    </div>
  )
}
