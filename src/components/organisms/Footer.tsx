"use client"

import type React from "react"
import { Rocket } from "lucide-react"
import { Typography } from "@/components/atoms/Typography"
import { Icon } from "@/components/atoms/Icon"
import { CATEGORIES } from "@/constants/categories"

interface FooterProps {
  onCategoryClick: (categoryId: string) => void
}

export const Footer: React.FC<FooterProps> = ({ onCategoryClick }) => {
  const footerSections = [
    {
      title: "Products",
      links: CATEGORIES.map((category) => ({
        label: category.name,
        action: () => onCategoryClick(category.id),
      })),
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", action: () => {} },
        { label: "Shipping Info", action: () => {} },
        { label: "Returns", action: () => {} },
        { label: "Contact Us", action: () => {} },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", action: () => {} },
        { label: "Careers", action: () => {} },
        { label: "Press", action: () => {} },
        { label: "Privacy", action: () => {} },
      ],
    },
  ]

  return (
    <footer className="border-t border-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon={Rocket} size="lg" color="text-purple-500" />
              <Typography
                variant="span"
                size="xl"
                weight="bold"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent"
              >
                ROCKET
              </Typography>
            </div>
            <Typography variant="p" color="muted" size="sm">
              The future of shopping is here. Discover revolutionary products that will transform your world.
            </Typography>
          </div>

          {footerSections.map((section, index) => (
            <div key={section.title} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
              <Typography variant="h3" weight="semibold" className="mb-4">
                {section.title}
              </Typography>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-sm text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center animate-fade-in-up">
          <Typography variant="p" color="muted">
            © 2025 Rocket. The future of shopping. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  )
}
