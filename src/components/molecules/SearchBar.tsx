import { KeyboardEvent } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/atoms/Input"
import { Icon } from "@/components/atoms/Icon"
import { Button } from "@/components/atoms/Button"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
  placeholder?: string
  className?: string
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  showClearButton?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search products...",
  className,
  size = "lg",
  isLoading = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault()
      onSearch(value)
    }
  }

  const handleSearchClick = () => {
    if (!isLoading && value.trim()) {
      onSearch(value)
    }
  }


  // 🆕 Mapeamento de tamanhos para classes CSS
  const sizeClasses = {
    sm: "py-2 text-sm",
    md: "py-2.5 text-base", 
    lg: "py-3 text-lg"
  }

  return (
    <div className={className}>
      <div className="relative">
        {/* Search Icon Button */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Button 
            onClick={handleSearchClick}
            variant="ghost"
            size="sm"
            className="p-1.5 rounded-full hover:bg-gray-700/50 transition-colors"
            aria-label="Search"
            disabled={isLoading || !value.trim()}
          >
            <Icon 
              icon={Search} 
              size="sm" 
              className="text-purple-400 hover:text-purple-300 transition-colors" 
            />
          </Button>
        </div>

        {/* Input Field - SEM size prop */}
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className={cn(
            "w-full pl-12 pr-12 rounded-xl bg-gray-900/80 border-gray-700",
            "focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300",
            sizeClasses[size] // 🆕 Aplicar tamanho via className
          )}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            <div className="animate-spin">
              <Icon 
                icon={Search} 
                size="sm" 
                className="text-purple-400" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}