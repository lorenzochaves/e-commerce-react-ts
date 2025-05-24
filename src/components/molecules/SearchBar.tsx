"use client"

import { KeyboardEvent } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/atoms/Input"
import { Icon } from "@/components/atoms/Icon"
import { Button } from "@/components/atoms/Button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
  placeholder?: string
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search products...",
  className,
}) => {
  // Removemos o estado local para evitar duplicação do estado
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value)
    }
  }

  const handleSearchClick = () => {
    onSearch(value)
  }

  return (
    <div className={className}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Button 
            onClick={handleSearchClick}
            variant="ghost"
            size="sm"
            className="p-1.5 rounded-full"
            aria-label="Search"
          >
            <Icon icon={Search} size="sm" color="text-purple-400" />
          </Button>
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 py-3 text-lg bg-gray-900/80 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 transition-all duration-300"
        />
      </div>
    </div>
  )
}
