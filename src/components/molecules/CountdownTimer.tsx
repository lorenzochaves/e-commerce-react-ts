"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Card } from "@/components/atoms/Card"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"

interface CountdownTimerProps {
  title?: string
  subtitle?: string
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  title = "⚡ Flash Sale Ends In:",
  subtitle = "Up to 50% off on selected items!",
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 45 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/20 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Icon icon={Clock} size="md" color="text-red-400" animate="pulse" />
        <Typography variant="span" weight="semibold" color="accent" className="text-red-400">
          {title}
        </Typography>
      </div>
      <div className="flex justify-center gap-4 text-2xl font-bold mb-4">
        {[
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Minutes" },
          { value: timeLeft.seconds, label: "Seconds" },
        ].map((item, index) => (
          <div key={index} className="bg-red-500/20 px-4 py-2 rounded-lg border border-red-500/30">
            <Typography variant="span" size="2xl" weight="bold" className="text-red-300">
              {item.value.toString().padStart(2, "0")}
            </Typography>
            <div className="text-xs text-red-400 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
      <Typography variant="p" color="gray">
        {subtitle}
      </Typography>
    </Card>
  )
}
