"use client"

import type React from "react"
import { Rocket, User } from "lucide-react"
import { Link } from "react-router-dom"
import { SearchBar } from "@/components/molecules/SearchBar"
import { CartButton } from "@/components/molecules/CartButton"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"
import { useCart } from "@/context/cart-context"
import { useUser } from "@/context/user-context"

interface HeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onLogoClick: () => void
  onProfileClick: () => void
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onLogoClick, onProfileClick }) => {
  const { cart } = useCart()
  const { user } = useUser()

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" onClick={onLogoClick}>
            <Icon
              icon={Rocket}
              size="xl"
              color="text-purple-500"
              className="group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              ROCKET
            </span>
          </Link>

          <SearchBar value={searchTerm} onChange={onSearchChange} className="flex-1 max-w-md mx-8" />

          <div className="flex items-center gap-4">
            {user && (
              <Button variant="outline" onClick={onProfileClick} className="group">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-6 h-6 rounded-full" />
                <Icon icon={User} size="sm" />
              </Button>
            )}
            <CartButton itemCount={totalItems} />
          </div>
        </div>
      </div>
    </header>
  )
}
