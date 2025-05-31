import Link from 'next/link'
import { Users, TrendingUp, Home } from 'lucide-react'

export function Navigation() {
  return (
    <nav className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl border-b border-white/20">
      {/* Glass morphism background overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-r from-white/5 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <Home className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative">Dashboard</span>
              </Link>
              
              <Link
                href="/clientes"
                className="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <Users className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative">Clientes</span>
              </Link>
              
              <Link
                href="/ativos"
                className="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <TrendingUp className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative">Ativos</span>
              </Link>
            </div>
          </div>

          {/* Right side - could add user menu, notifications, etc. */}
          <div className="flex items-center">
            <div className="hidden sm:flex items-center space-x-3">
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
