"use client"

import type React from "react"
import { User } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/atoms/Icon"

interface UserProfileButtonProps {
  onClick: () => void
}

export const UserProfileButton: React.FC<UserProfileButtonProps> = ({ onClick }) => {
  return (
    <Button variant="outline" onClick={onClick} className="group">
      <Icon icon={User} size="sm" />
    </Button>
  )
}
