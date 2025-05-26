import type React from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { useSearch } from "@/context/search-context"
import { scrollToTop } from "@/lib/utils"

export const OrderComplete: React.FC = () => {
  const { resetSearch } = useSearch()

  const goToHomepage = () => {
    // Usar a função centralizada para resetar busca e voltar para home
    resetSearch()
    scrollToTop()
  }

  return (
    <div className="max-w-md mx-auto text-center animate-scale-in">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon icon={CheckCircle2} size="xl" color="text-green-500" animate="pulse" />
      </div>

      <Typography variant="h1" size="3xl" weight="bold" className="mb-4">
        Order Complete!
      </Typography>

      <Typography variant="p" color="muted" className="mb-8">
        Thank you for your purchase. Your order has been successfully placed and will be processed soon. You can view
        your order history in your profile.
      </Typography>

      <div className="space-y-4">
        <Button size="lg" className="w-full" onClick={goToHomepage}>
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}
