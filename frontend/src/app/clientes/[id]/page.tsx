'use client'

import { useParams } from 'next/navigation'
import { AppLayout } from '@/components/layout'
import { useCliente } from '@/hooks/use-clientes'
import { useAlocacoesPorCliente } from '@/hooks/use-alocacoes'
import { ArrowLeft, User, Mail, Calendar, CheckCircle, XCircle, Wallet, TrendingUp, PieChart, DollarSign, Edit3, Sparkles, Activity } from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function ClienteDetailPage() {
  const params = useParams()
  const id = params.id as string
  
  const { data: cliente, isLoading, error } = useCliente(id)
  const { data: alocacoes, isLoading: isLoadingAlocacoes } = useAlocacoesPorCliente(id)

  if (error) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Erro ao carregar cliente</h3>
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
          <p className="mt-4 text-lg text-gray-600">Carregando detalhes do cliente...</p>
        </div>
      </AppLayout>
    )
  }

  if (!cliente) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cliente não encontrado</h3>
            <p className="text-gray-600">O cliente solicitado não existe ou foi removido.</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header with modern gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link
                  href="/clientes"
                  className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Link>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <User className="h-12 w-12" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{cliente.nome}</h1>
                    <p className="text-xl text-blue-100 mb-4">Detalhes do cliente</p>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-blue-200" />
                        <span className="text-blue-100">
                          {cliente.status === 'ATIVO' ? 'Cliente ativo' : 'Cliente inativo'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-blue-200" />
                        <span className="text-blue-100">Perfil atualizado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons in header */}
              <div className="flex items-center space-x-3">
                <Link 
                  href={`/clientes/${cliente.id}/alocacoes`}
                  className="inline-flex items-center px-6 py-3 border border-white/20 text-sm font-semibold rounded-xl text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  Alocações
                </Link>
                <Link 
                  href={`/clientes/${cliente.id}/editar`}
                  className="inline-flex items-center px-6 py-3 border border-white/20 text-sm font-semibold rounded-xl text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <Edit3 className="h-5 w-5 mr-2" />
                  Editar
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Informações principais */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-50 rounded-lg p-2 mr-3">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Informações Básicas</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500 mb-2">Nome Completo</dt>
                  <dd className="text-lg font-semibold text-gray-900">{cliente.nome}</dd>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500 mb-2">Email</dt>
                  <dd className="text-lg text-gray-900 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-gray-400" />
                    {cliente.email}
                  </dd>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500 mb-2">Status</dt>
                  <dd className="flex items-center">
                    {cliente.status === 'ATIVO' ? (
                      <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Cliente Ativo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                        <XCircle className="h-4 w-4 mr-2" />
                        Cliente Inativo
                      </span>
                    )}
                  </dd>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500 mb-2">Data de Cadastro</dt>
                  <dd className="text-lg text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    {formatDate(cliente.createdAt)}
                  </dd>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500 mb-2">Última Atualização</dt>
                  <dd className="text-lg text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    {formatDate(cliente.updatedAt)}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfólio de Investimentos */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-purple-50 rounded-lg p-2 mr-3">
                  <PieChart className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Portfólio de Investimentos</h3>
              </div>
              <Link 
                href={`/clientes/${cliente.id}/alocacoes`}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Ver detalhes →
              </Link>
            </div>
            
            {isLoadingAlocacoes ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-purple-600"></div>
                <span className="ml-3 text-lg text-gray-600">Carregando portfólio...</span>
              </div>
            ) : alocacoes && alocacoes.alocacoes.length > 0 ? (
              <div className="space-y-6">
                {/* Resumo financeiro */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <DollarSign className="h-8 w-8 text-blue-100" />
                        <div className="text-right">
                          <p className="text-sm text-blue-100">Total Investido</p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(alocacoes.resumo.totalInvestido)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <TrendingUp className="h-8 w-8 text-emerald-100" />
                        <div className="text-right">
                          <p className="text-sm text-emerald-100">Ativos</p>
                          <p className="text-2xl font-bold">
                            {alocacoes.resumo.quantidadeAtivos}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <PieChart className="h-8 w-8 text-purple-100" />
                        <div className="text-right">
                          <p className="text-sm text-purple-100">Diversificação</p>
                          <p className="text-2xl font-bold">
                            {new Set(alocacoes.alocacoes.map(a => a.ativo.tipo)).size} tipos
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista de ativos */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Principais Investimentos</h4>
                  <div className="space-y-3">
                    {alocacoes.alocacoes.slice(0, 5).map((alocacao) => (
                      <div key={alocacao.id} className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                              <span className="text-sm font-bold text-white">
                                {alocacao.ativo.codigo.substring(0, 2)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">{alocacao.ativo.nome}</p>
                            <p className="text-sm text-gray-500">{alocacao.ativo.codigo} • {alocacao.ativo.tipo}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
                            {formatCurrency(alocacao.valor)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {((alocacao.valor / alocacoes.resumo.totalInvestido) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {alocacoes.alocacoes.length > 5 && (
                    <div className="mt-6 text-center">
                      <Link 
                        href={`/clientes/${cliente.id}/alocacoes`}
                        className="inline-flex items-center px-6 py-3 border border-transparent shadow-lg text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        Ver todos os {alocacoes.alocacoes.length} investimentos
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <PieChart className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum investimento registrado</h3>
                <p className="text-gray-500 mb-6">Este cliente ainda não possui investimentos cadastrados.</p>
                <Link 
                  href={`/clientes/${cliente.id}/alocacoes`}
                  className="inline-flex items-center px-6 py-3 border border-transparent shadow-lg text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <PieChart className="h-5 w-5 mr-2" />
                  Adicionar primeiro investimento
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
