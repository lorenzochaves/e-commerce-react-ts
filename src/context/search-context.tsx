"use client"

/**
 * Contexto global para gerenciar a funcionalidade de busca em toda a aplicação
 * 
 * Este contexto permite que a barra de busca funcione consistentemente em todas as páginas,
 * incluindo o cabeçalho compartilhado, a página inicial, detalhes do produto, carrinho e checkout.
 * 
 * Ele fornece:
 * - Um estado global para o termo de busca
 * - Uma função para definir o termo de busca
 * - Uma função handleSearch que redireciona para a página inicial com o termo de busca
 */

import React, { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

interface SearchContextType {
  searchTerm: string
  setSearchTerm: (value: string) => void
  handleSearch: (value: string) => void
  resetSearch: () => void
}

const SearchContext = createContext<SearchContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
  handleSearch: () => {},
  resetSearch: () => {},
})

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  // Função para processar a busca apenas quando o usuário confirmar (Enter ou clique no ícone)
  const handleSearch = (value: string) => {
    try {
      if (value && value.trim()) {
        const trimmedValue = value.trim()
        setSearchTerm(trimmedValue)
        
        // Sempre redirecionar para a página inicial com o parâmetro de busca
        // Usando replace: true para substituir a entrada atual no histórico de navegação
        navigate(`/?search=${encodeURIComponent(trimmedValue)}`, { replace: true })
      } else {
        // Se a busca estiver vazia, limpar o termo de busca
        setSearchTerm("")
        
        // Redirecionar para a página inicial sem parâmetros
        navigate('/', { replace: true })
      }
    } catch (error) {
      console.error("Erro ao processar a busca:", error)
    }
  }

  // Função para resetar busca e voltar para home limpa
  const resetSearch = () => {
    try {
      setSearchTerm("")
      navigate('/', { replace: true })
    } catch (error) {
      console.error("Erro ao resetar a busca:", error)
    }
  }

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, handleSearch, resetSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
