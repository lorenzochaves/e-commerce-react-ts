import type React from "react"
import { Typography } from "@/components/atoms/Typography"
import { formatPrice } from "@/lib/utils"

interface PriceDisplayProps {
  price: number
  originalPrice?: number
  size?: "sm" | "md" | "lg"
  showCurrency?: boolean
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  size = "md",
  showCurrency = true,
}) => {
  const sizes = {
    sm: { current: "lg", original: "sm" },
    md: { current: "xl", original: "md" },
    lg: { current: "2xl", original: "lg" },
  } as const // 🆕 Adicionar 'as const'

  return (
    <div className="flex items-center gap-2">
      <Typography 
        variant="span" 
        size={sizes[size].current} // 🆕 Remover 'as any'
        weight="bold" 
        color="primary"
      >
        {showCurrency ? formatPrice(price) : price.toFixed(2)}
      </Typography>
      {originalPrice && originalPrice > price && (
        <Typography 
          variant="span" 
          size={sizes[size].original} // 🆕 Remover 'as any'
          color="muted" 
          className="line-through"
        >
          {showCurrency ? formatPrice(originalPrice) : originalPrice.toFixed(2)}
        </Typography>
      )}
    </div>
  )
}