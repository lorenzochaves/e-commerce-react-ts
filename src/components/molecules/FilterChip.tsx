"use client"

import type React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/atoms/Badge"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"

interface FilterChipProps {
  label: string
  value: string
  onRemove: (value: string) => void
  variant?: "primary" | "secondary" | "success"
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, value, onRemove, variant = "primary" }) => {
  return (
    <div className="flex items-center gap-2 animate-slide-in-left">
      <span className="text-gray-400 text-sm">{label}:</span>
      <div className="flex items-center gap-1">
        <Badge variant={variant} size="sm">
          {value}
        </Badge>
        <Button variant="ghost" size="sm" onClick={() => onRemove(value)} className="p-1 h-auto">
          <Icon icon={X} size="sm" />
        </Button>
      </div>
    </div>
  )
}
