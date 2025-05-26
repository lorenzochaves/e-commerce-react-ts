import React, { useEffect, useRef } from "react"
import { X, ArrowRight } from "lucide-react"
import { Icon } from "@/components/atoms/Icon"
import { Typography } from "@/components/atoms/Typography"
import { Button } from "@/components/atoms/Button"
import { CATEGORIES } from "@/constants/categories"
import { SearchBar } from "@/components/molecules/SearchBar"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  searchTerm: string
  onSearchChange: (value: string) => void // mantido para compatibilidade
  onSearch: (value: string) => void
  onCategoryClick?: (category: string) => void
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  searchTerm,
  onSearch,
  onCategoryClick = () => {}, // valor padrão caso não seja fornecido
}) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [localSearchTerm, setLocalSearchTerm] = React.useState(searchTerm)
  
  // Função para lidar com a busca quando o usuário confirmar (pressionar Enter ou clicar no ícone)
  const handleSearch = (value: string) => {
    if (value.trim()) {
      onSearch(value) 
      // Fechar o overlay após a busca
      setTimeout(() => onClose(), 100)
    }
  }

  // Função para lidar com mudanças no input sem acionar a busca
  const handleLocalChange = (value: string) => {
    // Apenas atualiza o estado local, sem acionar o estado global
    setLocalSearchTerm(value)
  }
  
  // Sincronizar o estado local quando o overlay for aberto ou o termo de busca mudar
  useEffect(() => {
    setLocalSearchTerm(searchTerm)
  }, [searchTerm, isOpen])
  
  // Isso foi substituído pelo useEffect adicionado mais acima
  // que sincroniza quando o overlay é aberto ou o termo de busca muda

  // Remover o fechamento automático quando o mouse sai do overlay
  // para evitar que o usuário perca o que estava digitando

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    // Função para fechar quando o mouse sair da área do overlay
    const handleMouseLeave = () => {
      // Adicionar um pequeno delay para evitar fechamento acidental
      setTimeout(() => {
        onClose()
      }, 200)
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      
      // Adicionar event listener para mouse leave no overlay
      if (overlayRef.current) {
        overlayRef.current.addEventListener("mouseleave", handleMouseLeave)
      }
      
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      
      // Remover event listener para mouse leave
      if (overlayRef.current) {
        overlayRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
      
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 pt-[72px] z-30 bg-black/60 backdrop-blur-md transition-all duration-300">
      <div 
        ref={overlayRef}
        className="absolute top-[72px] left-0 right-0 bg-gradient-to-b from-black/95 to-black/80 border-b border-gray-800 transform transition-all duration-500 ease-out shadow-xl"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl pl-6 md:pl-8">
            {/* Área de busca com o novo SearchBar */}
            <div className="flex items-center gap-4 mb-4">
              <SearchBar
                value={localSearchTerm}
                onChange={handleLocalChange}
                onSearch={handleSearch}
                placeholder="Search rocket.com"
                className="w-full"
              />
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm" 
                className="flex-shrink-0 p-2 rounded-full"
              >
                <Icon icon={X} size="sm" color="text-gray-400" />
              </Button>
            </div>

            {/* Links rápidos */}
            <div className="mt-4 text-left">
              <Typography variant="p" size="sm" className="text-gray-400 mb-2 pl-1">
                Quick Links
              </Typography>
              <ul className="space-y-2">
                {CATEGORIES.slice(0, 5).map((category) => (
                  <li key={category.id} className="w-full">
                    <div 
                      onClick={() => {
                        onCategoryClick(category.id)
                        onClose()
                      }}
                      className="flex items-center gap-3 py-2 px-2 hover:bg-gray-800/50 rounded-md group cursor-pointer transition-colors duration-200"
                    >
                      <Icon 
                        icon={ArrowRight} 
                        size="sm" 
                        className="text-purple-400 flex-shrink-0"
                      />
                      <span className="text-gray-200 group-hover:text-white transition-colors duration-200 text-left">
                        {category.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
