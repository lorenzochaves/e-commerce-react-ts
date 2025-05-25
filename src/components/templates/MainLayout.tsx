import type React from "react"

interface MainLayoutProps {
  header: React.ReactNode
  children: React.ReactNode
  footer: React.ReactNode
  notifications?: React.ReactNode
  modals?: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ header, children, footer, notifications, modals }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
      {header}
      {notifications}
      <main className="flex-grow pt-20">{children}</main>
      {footer}
      {modals}
    </div>
  )
}