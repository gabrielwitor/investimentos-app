'use client'

import Link from 'next/link'
import { Users, TrendingUp, Home, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl border-b border-white/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center group">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-white tracking-tight">
                  InvestApp
                </span>
                <div className="flex items-center mt-0.5">
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
              <Link
                href="/"
                className="group inline-flex items-center px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
              >
                <Home className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/clientes"
                className="group inline-flex items-center px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
              >
                <Users className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>Clientes</span>
              </Link>
              <Link
                href="/ativos"
                className="group inline-flex items-center px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
              >
                <TrendingUp className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>Ativos</span>
              </Link>
            </div>
          </div>

          {/* Right side - Mobile menu button */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="group inline-flex items-center justify-center p-2 text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-64 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 border-t border-white/10 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="group flex items-center px-3 py-3 text-base font-medium text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
            >
              <Home className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/clientes"
              onClick={closeMobileMenu}
              className="group flex items-center px-3 py-3 text-base font-medium text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
            >
              <Users className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              <span>Clientes</span>
            </Link>
            <Link
              href="/ativos"
              onClick={closeMobileMenu}
              className="group flex items-center px-3 py-3 text-base font-medium text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
            >
              <TrendingUp className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              <span>Ativos</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
