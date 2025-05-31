'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout'
import { useAtivos } from '@/hooks/use-ativos'
import { TrendingUp, Search, Eye } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function AtivosPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  
  const limit = 10
  const { data, isLoading, error } = useAtivos(page, limit, search)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      'Acao': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'FII': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'Cripto': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      'ETF': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      'Renda Fixa': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    }
    return colors[tipo] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
  }

  if (error) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="text-red-600 dark:text-red-400">
            Erro ao carregar ativos: {error.message}
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="h-8 w-8 mr-3 text-blue-600 dark:text-blue-400" />
              Ativos Financeiros
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Visualize todos os ativos disponíveis para investimento
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar por nome, código ou tipo..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              Buscar
            </button>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setSearchInput('')
                  setPage(1)
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              >
                Limpar
              </button>
            )}
          </form>
        </div>

        {/* Lista de ativos */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Carregando ativos...</p>
            </div>
          ) : !data?.ativos?.length ? (
            <div className="p-6 text-center">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nenhum ativo encontrado</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {search ? 'Tente ajustar os termos de busca.' : 'Não há ativos cadastrados no sistema.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {data.ativos.map((ativo) => (
                    <div
                      key={ativo.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md dark:hover:shadow-gray-800/50 transition-shadow bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(ativo.tipo)}`}>
                              {ativo.tipo}
                            </span>
                            <Link
                              href={`/ativos/${ativo.id}`}
                              className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                              title="Ver detalhes"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {ativo.nome}
                          </h3>
                          
                          <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-3">
                            {ativo.codigo}
                          </p>

                          {ativo.descricao && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                              {ativo.descricao}
                            </p>
                          )}

                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Cadastrado em: {formatDate(ativo.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paginação */}
              {data.pagination && data.pagination.totalPages > 1 && (
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      Mostrando {((page - 1) * limit) + 1} até {Math.min(page * limit, data.pagination.total)} de {data.pagination.total} ativos
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        Anterior
                      </button>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Página {page} de {data.pagination.totalPages}
                      </span>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === data.pagination.totalPages}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        Próxima
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
