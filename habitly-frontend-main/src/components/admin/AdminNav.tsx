'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useState } from 'react'
import { Menu, X, LayoutDashboard, Users, CheckSquare, BarChart3, LogOut } from 'lucide-react'

const ADMIN_HASH = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '7f8e9a2b'

const navItems = [
  { href: `/admin-${ADMIN_HASH}/dashboard`, label: 'Dashboard', icon: LayoutDashboard },
  { href: `/admin-${ADMIN_HASH}/users`, label: 'Users', icon: Users },
  { href: `/admin-${ADMIN_HASH}/habits`, label: 'Habits', icon: CheckSquare },
  { href: `/admin-${ADMIN_HASH}/analytics`, label: 'Analytics', icon: BarChart3 },
]

export function AdminNav() {
  const pathname = usePathname()
  const { logout } = useAdminAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/admin-${ADMIN_HASH}/dashboard`} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-900 to-brand-700 flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110">
                H
              </div>
              <span className="text-xl font-bold text-gray-900">
                Habitly <span className="text-brand-900">Admin</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-900 text-white shadow-brand'
                      : 'text-gray-700 hover:bg-purple-light hover:text-brand-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:block">
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-purple-light transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-up">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-900 text-white'
                        : 'text-gray-700 hover:bg-purple-light'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  logout()
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
