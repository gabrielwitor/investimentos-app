'use client'

import { AppLayout } from '@/components/layout'
import { useDashboardStats } from '@/hooks/use-dashboard'
import { formatCurrency } from '@/lib/utils'
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { data: stats, isLoading, error } = useDashboardStats()

  if (error) {
    return (
      <AppLayout>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar dashboard</h3>
            <p className="text-gray-600 mb-4">Não foi possível carregar as estatísticas do sistema.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="h-full flex flex-col space-y-4">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative px-4 sm:px-6 py-6 sm:py-8">
            <div className="max-w-4xl">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
                Bem-vindo ao sistema de gestão de investimentos
              </p>
              <p className="text-blue-200 mt-1 text-xs sm:text-sm">
                Monitore seus clientes, ativos e alocações em tempo real
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
          {/* Card Clientes */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-[140px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-800/10"></div>
            <div className="relative p-4 sm:p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="px-2.5 py-1 bg-blue-500/10 rounded-full border border-blue-200">
                  <span className="text-xs font-semibold text-blue-700">CLIENTES</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-2">
                  {isLoading ? (
                    <div className="animate-pulse h-8 w-14 bg-blue-300 rounded-lg"></div>
                  ) : (
                    <span className="text-3xl font-bold text-blue-900 block">
                      {stats?.totalClientes || 0}
                    </span>
                  )}
                  <span className="text-sm font-medium text-blue-700">Total de clientes</span>
                </div>
                {!isLoading && (
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-medium">
                        {stats?.clientesAtivos || 0} ativos
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-600">
                        {(stats?.totalClientes || 0) - (stats?.clientesAtivos || 0)} inativos
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Ativos */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-[140px]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-emerald-800/10"></div>
            <div className="relative p-4 sm:p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-200">
                  <span className="text-xs font-semibold text-emerald-700">ATIVOS</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-2">
                  {isLoading ? (
                    <div className="animate-pulse h-8 w-14 bg-emerald-300 rounded-lg"></div>
                  ) : (
                    <span className="text-3xl font-bold text-emerald-900 block">
                      {stats?.ativosDisponiveis || 0}
                    </span>
                  )}
                  <span className="text-sm font-medium text-emerald-700">Disponíveis para investimento</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Patrimônio */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-[140px]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-amber-800/10"></div>
            <div className="relative p-4 sm:p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="px-2.5 py-1 bg-amber-500/10 rounded-full border border-amber-200">
                  <span className="text-xs font-semibold text-amber-700">PATRIMÔNIO</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-2">
                  {isLoading ? (
                    <div className="animate-pulse h-8 w-20 bg-amber-300 rounded-lg"></div>
                  ) : (
                    <span className="text-2xl font-bold text-amber-900 block">
                      {formatCurrency(stats?.patrimonioTotal || 0)}
                    </span>
                  )}
                  <span className="text-sm font-medium text-amber-700">Valor total investido</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Alocações */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-[140px]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-purple-800/10"></div>
            <div className="relative p-4 sm:p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div className="px-2.5 py-1 bg-purple-500/10 rounded-full border border-purple-200">
                  <span className="text-xs font-semibold text-purple-700">ALOCAÇÕES</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-2">
                  {isLoading ? (
                    <div className="animate-pulse h-8 w-14 bg-purple-300 rounded-lg"></div>
                  ) : (
                    <span className="text-3xl font-bold text-purple-900 block">
                      {stats?.alocacoesAtivas || 0}
                    </span>
                  )}
                  <span className="text-sm font-medium text-purple-700">Ativas no sistema</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="flex-1 min-h-0">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border-0 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
            <div className="relative px-4 sm:px-6 py-4 sm:py-6 h-full flex flex-col">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Ações Rápidas
                </h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                  Acesse rapidamente as principais funcionalidades do sistema e gerencie seus investimentos
                </p>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto w-full">
                  <Link
                    href="/clientes"
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:border-blue-300 p-4 sm:p-6 text-center hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mx-auto w-fit mb-3 sm:mb-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-blue-900 group-hover:text-blue-800 mb-2 transition-colors">
                        Gerenciar Clientes
                      </h4>
                      <p className="text-sm sm:text-sm text-blue-700 group-hover:text-blue-600 transition-colors leading-relaxed">
                        Visualizar, editar e gerenciar informações detalhadas dos seus clientes
                      </p>
                      <div className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        Acessar clientes
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/ativos"
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 hover:border-emerald-300 p-4 sm:p-6 text-center hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-emerald-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="p-2.5 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg mx-auto w-fit mb-3 sm:mb-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                        <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-emerald-900 group-hover:text-emerald-800 mb-2 transition-colors">
                        Visualizar Ativos
                      </h4>
                      <p className="text-sm sm:text-sm text-emerald-700 group-hover:text-emerald-600 transition-colors leading-relaxed">
                        Acompanhar performance e gerenciar o portfólio de investimentos
                      </p>
                      <div className="mt-3 inline-flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                        Ver ativos
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
