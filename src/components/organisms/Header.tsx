"use client"

import type React from "react"
import { useState } from "react"
import { Rocket } from "lucide-react"
import { Link } from "react-router-dom"
import { SearchButton } from "@/components/molecules/SearchButton"
import { CartButton } from "@/components/molecules/CartButton"
import { UserProfileButton } from "@/components/molecules/UserProfileButton"
import { SearchOverlay } from "@/components/organisms/SearchOverlay"
import { Icon } from "@/components/atoms/Icon"
import { useCart } from "@/context/cart-context"
import { useUser } from "@/context/user-context"
import { useSearch } from "@/context/search-context"

interface HeaderProps {
  onLogoClick: () => void
  onProfileClick: () => void
  onCategoryClick: (category: string) => void
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, onProfileClick, onCategoryClick }) => {
  const { cart } = useCart()
  const { user } = useUser()
  const { searchTerm, handleSearch } = useSearch()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSearchOpen = () => {
    setIsSearchOpen(true)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
  }

  // Função para toggle do search (abrir/fechar)
  const handleSearchToggle = () => {
    if (isSearchOpen) {
      handleSearchClose()
    } else {
      handleSearchOpen()
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group" onClick={onLogoClick}>
              <Icon
                icon={Rocket}
                size="xl"
                color="text-purple-500"
                className="group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="text-2xl font-semibold tracking-tighter bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent button-text">
                ROCKET
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <SearchButton 
                onClick={handleSearchToggle} 
                isActive={searchTerm !== ""} 
              />
              {user && <UserProfileButton onClick={onProfileClick} />}
              <CartButton itemCount={totalItems} />
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={handleSearchClose}
        searchTerm={searchTerm}
        onSearchChange={() => {}} // Função vazia já que não usamos mais
        onSearch={handleSearch}
        onCategoryClick={onCategoryClick}
      />
    </>
  )
}
