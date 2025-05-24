"use client"

import type React from "react"
import { User } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Avatar } from "@/components/atoms/Avatar"
import { Icon } from "@/components/atoms/Icon"
import type { User as UserType } from "@/lib/types"

interface UserProfileButtonProps {
  user: UserType
  onClick: () => void
}

export const UserProfileButton: React.FC<UserProfileButtonProps> = ({ user, onClick }) => {
  return (
    <Button variant="outline" onClick={onClick} className="group">
      <Avatar src={user.avatar} alt={user.name} size="sm" />
      <Icon icon={User} size="sm" />
    </Button>
  )
}
