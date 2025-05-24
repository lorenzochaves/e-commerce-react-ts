"use client"

import type React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/atoms/Input"
import { Icon } from "@/components/atoms/Icon"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search products...",
  className,
}) => {
  return (
    <div className={className}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        icon={<Icon icon={Search} size="sm" color="text-gray-400" />}
        className="group-hover:border-gray-600"
      />
    </div>
  )
}
