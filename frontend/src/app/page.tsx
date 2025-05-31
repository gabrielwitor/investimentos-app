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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Bem-vindo ao sistema de gestão de investimentos
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Clientes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {isLoading ? (
                        <div className="animate-pulse h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      ) : error ? (
                        <span className="text-red-500">-</span>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                              {stats?.totalClientes || 0}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">total</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                              <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                                {stats?.clientesAtivos || 0} ativos
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {(stats?.totalClientes || 0) - (stats?.clientesAtivos || 0)} inativos
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Ativos Disponíveis
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {isLoading ? (
                        <div className="animate-pulse h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      ) : error ? (
                        <span className="text-red-500">-</span>
                      ) : (
                        stats?.ativosDisponiveis || 0
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Patrimônio Total
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {isLoading ? (
                        <div className="animate-pulse h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      ) : error ? (
                        <span className="text-red-500">-</span>
                      ) : (
                        formatCurrency(stats?.patrimonioTotal || 0)
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Alocações Ativas
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {isLoading ? (
                        <div className="animate-pulse h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      ) : error ? (
                        <span className="text-red-500">-</span>
                      ) : (
                        stats?.alocacoesAtivas || 0
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Ações Rápidas
            </h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/clientes"
                className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 text-center hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              >
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Gerenciar Clientes
                </span>
              </Link>

              <Link
                href="/ativos"
                className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 text-center hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              >
                <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Visualizar Ativos
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
