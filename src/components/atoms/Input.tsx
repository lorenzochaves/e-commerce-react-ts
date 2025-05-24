import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, icon, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-white">{label}</label>}
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            "w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            "transition-all duration-300",
            "placeholder:text-gray-400",
            !!icon && "pr-10",
            error && "border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />
        {icon && <div className="absolute inset-y-0 right-0 flex items-center pr-3">{icon}</div>}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
})

Input.displayName = "Input"
