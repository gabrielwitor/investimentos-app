'use client'

import { useParams } from 'next/navigation'
import { AppLayout } from '@/components/layout'
import { useAtivo } from '@/hooks/use-ativos'
import { ArrowLeft, TrendingUp, User, DollarSign, Calendar, Building2, Sparkles, Activity, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function AtivoDetailPage() {
  const params = useParams()
  const id = params.id as string
  
  const { data: ativo, isLoading, error } = useAtivo(id)

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
      'Acao': { bg: 'bg-gradient-to-br from-blue-500 to-blue-600', text: 'text-white', border: 'border-blue-200', icon: 'TrendingUp' },
      'FII': { bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600', text: 'text-white', border: 'border-emerald-200', icon: 'Building2' },
      'Cripto': { bg: 'bg-gradient-to-br from-purple-500 to-purple-600', text: 'text-white', border: 'border-purple-200', icon: 'BarChart3' },
      'ETF': { bg: 'bg-gradient-to-br from-amber-500 to-amber-600', text: 'text-white', border: 'border-amber-200', icon: 'Sparkles' },
      'Renda Fixa': { bg: 'bg-gradient-to-br from-gray-500 to-gray-600', text: 'text-white', border: 'border-gray-200', icon: 'DollarSign' },
    }
    return colors[tipo] || colors['Renda Fixa']
  }

  if (error) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <TrendingUp className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Erro ao carregar ativo</h3>
            <p className="text-red-700">{error.message}</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Carregando detalhes do ativo...</p>
        </div>
      </AppLayout>
    )
  }

  if (!ativo) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ativo não encontrado</h3>
            <p className="text-gray-600">O ativo solicitado não existe ou foi removido.</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  const tipoStyle = getTipoColor(ativo.tipo)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header with modern gradient */}
        <div className={`${tipoStyle.bg} rounded-2xl shadow-xl overflow-hidden`}>
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/ativos"
                className="self-start p-2 sm:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 self-start sm:self-auto">
                  <Building2 className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{ativo.nome}</h1>
                  <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-4">Detalhes do ativo financeiro</p>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white/70" />
                      <span className="text-sm sm:text-base text-white/80">Código: {ativo.codigo}</span>
                    </div>
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white/70" />
                      <span className="text-sm sm:text-base text-white/80">Tipo: {ativo.tipo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações principais */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-blue-50 rounded-lg p-2 mr-3">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Informações do Ativo</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-2">Nome do Ativo</dt>
                  <dd className="text-base sm:text-lg font-semibold text-gray-900">{ativo.nome}</dd>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-2">Código</dt>
                  <dd className="text-base sm:text-lg font-mono font-semibold text-gray-900">{ativo.codigo}</dd>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-2">Tipo de Ativo</dt>
                  <dd>
                    <span className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold ${tipoStyle.bg} ${tipoStyle.text} shadow-lg`}>
                      {ativo.tipo}
                    </span>
                  </dd>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {ativo.descricao && (
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-2">Descrição</dt>
                    <dd className="text-base sm:text-lg text-gray-900">{ativo.descricao}</dd>
                  </div>
                )}
                
                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-2">Data de Cadastro</dt>
                  <dd className="text-base sm:text-lg text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-400" />
                    {formatDate(ativo.createdAt)}
                  </dd>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-2">Última Atualização</dt>
                  <dd className="text-base sm:text-lg text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-400" />
                    {formatDate(ativo.updatedAt)}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alocações dos Clientes */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-purple-50 rounded-lg p-2 mr-3">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Alocações dos Clientes</h3>
            </div>
            
            {!ativo.alocacoes || ativo.alocacoes.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="bg-gray-50 rounded-full p-4 sm:p-6 w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Nenhuma alocação encontrada</h3>
                <p className="text-sm sm:text-base text-gray-500">Este ativo ainda não possui investimentos de clientes.</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* Resumo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 sm:p-6 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-100" />
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-blue-100">Total de Investidores</p>
                          <p className="text-xl sm:text-2xl font-bold">{ativo.alocacoes.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 sm:p-6 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-100" />
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-emerald-100">Número de Alocações</p>
                          <p className="text-xl sm:text-2xl font-bold">
                            {ativo.alocacoes.length.toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 sm:p-6 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-amber-100" />
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-amber-100">Valor Total Investido</p>
                          <p className="text-lg sm:text-2xl font-bold">
                            {formatCurrency(
                              ativo.alocacoes.reduce((acc, alocacao) => 
                                acc + alocacao.valor, 0
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista de alocações */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Detalhes das Alocações</h4>
                  <div className="space-y-3">
                    {ativo.alocacoes.map((alocacao) => (
                      <div key={alocacao.id} className="group relative bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                        {/* Background gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                        
                        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                              </div>
                            </div>
                            <div>
                              <p className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                                {alocacao.cliente?.nome || `Cliente ID: ${alocacao.clienteId}`}
                              </p>
                              {alocacao.cliente?.email && (
                                <p className="text-xs sm:text-sm text-gray-500">{alocacao.cliente.email}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-base sm:text-lg font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                              {formatCurrency(alocacao.valor)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">Valor investido</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
