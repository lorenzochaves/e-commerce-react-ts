"use client"

import type React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"

interface SearchButtonProps {
  onClick: () => void
  isActive?: boolean
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick, isActive = false }) => {
  return (
    <Button 
      variant="outline" 
      onClick={onClick} 
      className={`group relative overflow-hidden ${isActive ? 'border-purple-500 bg-purple-500/10' : ''}`}
    >
      <Icon 
        icon={Search} 
        size="sm" 
        className={`transition-transform duration-200 ${isActive ? 'text-purple-400' : 'group-hover:scale-110'}`} 
      />
      {isActive && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
      )}
      <span className="sr-only">Abrir busca</span>
    </Button>
  )
}
