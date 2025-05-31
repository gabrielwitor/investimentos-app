'use client'

import { useParams } from 'next/navigation'
import { AppLayout } from '@/components/layout'
import { useAtivo } from '@/hooks/use-ativos'
import { ArrowLeft, TrendingUp, User, DollarSign, Calendar } from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function AtivoDetailPage() {
  const params = useParams()
  const id = params.id as string
  
  const { data: ativo, isLoading, error } = useAtivo(id)

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      'Acao': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'FII': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Cripto': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'ETF': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Renda Fixa': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    }
    return colors[tipo] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }

  if (error) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="text-red-600 dark:text-red-400">
            Erro ao carregar ativo: {error.message}
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
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Carregando detalhes do ativo...</p>
        </div>
      </AppLayout>
    )
  }

  if (!ativo) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="text-gray-600 dark:text-gray-400">Ativo não encontrado</div>
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
            href="/ativos"
            className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="h-8 w-8 mr-3 text-blue-600" />
              {ativo.nome}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Detalhes do ativo financeiro
            </p>
          </div>
        </div>

        {/* Informações principais */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Informações Básicas</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{ativo.nome}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Código</dt>
                  <dd className="text-sm font-mono text-gray-900 dark:text-white">{ativo.codigo}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo</dt>
                  <dd>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(ativo.tipo)}`}>
                      {ativo.tipo}
                    </span>
                  </dd>
                </div>
                {ativo.descricao && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{ativo.descricao}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Cadastrado em</dt>
                  <dd className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {formatDate(ativo.createdAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Última atualização</dt>
                  <dd className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {formatDate(ativo.updatedAt)}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Estatísticas de alocações */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Alocações dos Clientes</h3>
              
              {!ativo.alocacoes || ativo.alocacoes.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p>Nenhuma alocação encontrada para este ativo</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Resumo */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total de Investidores</p>
                          <p className="text-lg font-bold text-blue-900 dark:text-blue-200">{ativo.alocacoes.length}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">Número de Alocações</p>
                          <p className="text-lg font-bold text-green-900 dark:text-green-200">
                            {ativo.alocacoes.length.toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-yellow-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Valor Total Investido</p>
                          <p className="text-lg font-bold text-yellow-900 dark:text-yellow-200">
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

                  {/* Lista de alocações */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Detalhes das Alocações</h4>
                    <div className="space-y-2">
                      {ativo.alocacoes.map((alocacao) => (
                        <div key={alocacao.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {alocacao.cliente?.nome || `Cliente ID: ${alocacao.clienteId}`}
                                </p>
                                {alocacao.cliente?.email && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{alocacao.cliente.email}</p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                Valor: {formatCurrency(alocacao.valor)}
                              </p>
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
      </div>
    </AppLayout>
  )
}
