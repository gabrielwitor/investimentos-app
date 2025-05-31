'use client'

import { useParams } from 'next/navigation'
import { AppLayout } from '@/components/layout'
import { useCliente } from '@/hooks/use-clientes'
import { useAlocacoesPorCliente } from '@/hooks/use-alocacoes'
import { ArrowLeft, User, Mail, Calendar, CheckCircle, XCircle, Wallet, TrendingUp, PieChart, DollarSign } from 'lucide-react'
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
          <div className="text-red-600 dark:text-red-400">
            Erro ao carregar cliente: {error.message}
          </div>
        </div>
      </AppLayout>
    )
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Carregando detalhes do cliente...</p>
        </div>
      </AppLayout>
    )
  }

  if (!cliente) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="text-gray-600 dark:text-gray-400">Cliente não encontrado</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link
            href="/clientes"
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <User className="h-8 w-8 mr-3 text-blue-600 dark:text-blue-400" />
              {cliente.nome}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Detalhes do cliente
            </p>
          </div>
        </div>

        {/* Informações principais */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Informações Básicas</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{cliente.nome}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                  <dd className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-gray-400" />
                    {cliente.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                  <dd className="text-sm flex items-center">
                    {cliente.status === 'ATIVO' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Ativo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <XCircle className="h-3 w-3 mr-1" />
                        Inativo
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Cadastrado em</dt>
                  <dd className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {formatDate(cliente.createdAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Última atualização</dt>
                  <dd className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {formatDate(cliente.updatedAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Portfólio de Investimentos */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Portfólio de Investimentos
            </h3>
            <Link 
              href={`/clientes/${cliente.id}/alocacoes`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Ver detalhes →
            </Link>
          </div>
          
          {isLoadingAlocacoes ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Carregando portfólio...</span>
            </div>
          ) : alocacoes && alocacoes.alocacoes.length > 0 ? (
            <div className="space-y-4">
              {/* Resumo financeiro */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Investido</p>
                      <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                        {formatCurrency(alocacoes.resumo.totalInvestido)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Ativos</p>
                      <p className="text-lg font-semibold text-green-900 dark:text-green-100">
                        {alocacoes.resumo.quantidadeAtivos}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Diversificação</p>
                      <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                        {new Set(alocacoes.alocacoes.map(a => a.ativo.tipo)).size} tipos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de ativos */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Principais Investimentos</h4>
                <div className="space-y-2">
                  {alocacoes.alocacoes.slice(0, 5).map((alocacao) => (
                    <div key={alocacao.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {alocacao.ativo.codigo.substring(0, 2)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{alocacao.ativo.nome}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{alocacao.ativo.codigo} • {alocacao.ativo.tipo}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(alocacao.valor)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {((alocacao.valor / alocacoes.resumo.totalInvestido) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {alocacoes.alocacoes.length > 5 && (
                  <div className="mt-3 text-center">
                    <Link 
                      href={`/clientes/${cliente.id}/alocacoes`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                    >
                      Ver todos os {alocacoes.alocacoes.length} investimentos
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <PieChart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Nenhum investimento registrado</p>
              <Link 
                href={`/clientes/${cliente.id}/alocacoes`}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 dark:text-blue-100 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                Adicionar primeiro investimento
              </Link>
            </div>
          )}
        </div>
        
        {/* Ações */}
        <div className="flex justify-end space-x-3">
          <Link 
            href={`/clientes/${cliente.id}/alocacoes`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Ver Alocações
          </Link>
          <Link 
            href={`/clientes/${cliente.id}/editar`}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            Editar Cliente
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}
