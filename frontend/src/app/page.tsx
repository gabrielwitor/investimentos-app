'use client'

import { AppLayout } from '@/components/layout'
import { useDashboardStats } from '@/hooks/use-dashboard'
import { formatCurrency } from '@/lib/utils'
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { data: stats, isLoading, error } = useDashboardStats()

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Bem-vindo ao sistema de gestão de investimentos
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Clientes */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-500 rounded-lg shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      Clientes
                    </p>
                    <div className="mt-1">
                      {isLoading ? (
                        <div className="animate-pulse h-8 w-12 bg-blue-200 rounded"></div>
                      ) : error ? (
                        <span className="text-red-500 text-2xl font-bold">-</span>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-blue-900">
                              {stats?.totalClientes || 0}
                            </span>
                            <span className="text-xs text-blue-600 font-medium bg-blue-200 px-2 py-1 rounded-full">
                              total
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                              <span className="text-xs text-green-700 font-medium">
                                {stats?.clientesAtivos || 0} ativos
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                              <span className="text-xs text-gray-600">
                                {(stats?.totalClientes || 0) - (stats?.clientesAtivos || 0)} inativos
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Ativos */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-500 rounded-lg shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-700">
                      Ativos Disponíveis
                    </p>
                    <div className="mt-1">
                      {isLoading ? (
                        <div className="animate-pulse h-8 w-12 bg-emerald-200 rounded"></div>
                      ) : error ? (
                        <span className="text-red-500 text-2xl font-bold">-</span>
                      ) : (
                        <span className="text-3xl font-bold text-emerald-900">
                          {stats?.ativosDisponiveis || 0}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Patrimônio */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-amber-500 rounded-lg shadow-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-700">
                      Patrimônio Total
                    </p>
                    <div className="mt-1">
                      {isLoading ? (
                        <div className="animate-pulse h-8 w-20 bg-amber-200 rounded"></div>
                      ) : error ? (
                        <span className="text-red-500 text-2xl font-bold">-</span>
                      ) : (
                        <span className="text-2xl font-bold text-amber-900">
                          {formatCurrency(stats?.patrimonioTotal || 0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Alocações */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-500 rounded-lg shadow-lg">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-700">
                      Alocações Ativas
                    </p>
                    <div className="mt-1">
                      {isLoading ? (
                        <div className="animate-pulse h-8 w-12 bg-purple-200 rounded"></div>
                      ) : error ? (
                        <span className="text-red-500 text-2xl font-bold">-</span>
                      ) : (
                        <span className="text-3xl font-bold text-purple-900">
                          {stats?.alocacoesAtivas || 0}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="bg-white shadow-lg rounded-xl border border-gray-200">
          <div className="px-6 py-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ações Rápidas
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Acesse rapidamente as principais funcionalidades do sistema
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/clientes"
                className="group relative block w-full rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-8 text-center hover:border-blue-400 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <div className="p-3 bg-blue-500 rounded-lg shadow-lg mx-auto w-fit mb-4 group-hover:bg-blue-600 transition-colors">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <span className="block text-lg font-semibold text-blue-900 group-hover:text-blue-800">
                  Gerenciar Clientes
                </span>
                <span className="block text-sm text-blue-600 mt-1">
                  Visualizar e editar informações dos clientes
                </span>
              </Link>

              <Link
                href="/ativos"
                className="group relative block w-full rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-8 text-center hover:border-emerald-400 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
              >
                <div className="p-3 bg-emerald-500 rounded-lg shadow-lg mx-auto w-fit mb-4 group-hover:bg-emerald-600 transition-colors">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <span className="block text-lg font-semibold text-emerald-900 group-hover:text-emerald-800">
                  Visualizar Ativos
                </span>
                <span className="block text-sm text-emerald-600 mt-1">
                  Acompanhar performance dos investimentos
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
