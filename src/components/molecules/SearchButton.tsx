"use client"

import type React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"

interface SearchButtonProps {
  onClick: () => void
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Button 
      variant="outline" 
      onClick={onClick} 
      className="group relative overflow-hidden"
    >
      <Icon 
        icon={Search} 
        size="sm" 
        className="group-hover:scale-110 transition-transform duration-200" 
      />
      <span className="sr-only">Abrir busca</span>
    </Button>
  )
}
