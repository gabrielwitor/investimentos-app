'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout'
import { useAtivos } from '@/hooks/use-ativos'
import { TrendingUp, Search, Eye, Building2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function AtivosPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  
  const limit = 10
  const { data, isLoading, error } = useAtivos({ page, limit, search })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
      'Acao': { 
        bg: 'bg-gradient-to-r from-blue-50 to-blue-100', 
        text: 'text-blue-800', 
        border: 'border-blue-200',
        icon: 'text-blue-600'
      },
      'FII': { 
        bg: 'bg-gradient-to-r from-emerald-50 to-emerald-100', 
        text: 'text-emerald-800', 
        border: 'border-emerald-200',
        icon: 'text-emerald-600'
      },
      'Cripto': { 
        bg: 'bg-gradient-to-r from-purple-50 to-purple-100', 
        text: 'text-purple-800', 
        border: 'border-purple-200',
        icon: 'text-purple-600'
      },
      'ETF': { 
        bg: 'bg-gradient-to-r from-amber-50 to-amber-100', 
        text: 'text-amber-800', 
        border: 'border-amber-200',
        icon: 'text-amber-600'
      },
      'Renda Fixa': { 
        bg: 'bg-gradient-to-r from-slate-50 to-slate-100', 
        text: 'text-slate-800', 
        border: 'border-slate-200',
        icon: 'text-slate-600'
      },
    }
    return colors[tipo] || {
      bg: 'bg-gradient-to-r from-gray-50 to-gray-100', 
      text: 'text-gray-800', 
      border: 'border-gray-200',
      icon: 'text-gray-600'
    }
  }

  if (error) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="text-red-600">
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
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-xl">
          <div className="px-8 py-12 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold flex items-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mr-4">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  Ativos Financeiros
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl">
                  Explore nossa seleção completa de ativos disponíveis para investimento
                </p>
                <div className="flex items-center mt-4 space-x-6">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-blue-200" />
                    <span className="text-blue-100">
                      {data?.pagination?.total || 0} ativos disponíveis
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-blue-200" />
                    <span className="text-blue-100">Dados atualizados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-50 rounded-lg p-2 mr-3">
                <Search className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Buscar Ativos</h2>
            </div>
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Digite o nome, código ou tipo do ativo..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
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
                  className="px-6 py-3 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Limpar
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Lista de ativos */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Carregando ativos...</p>
            </div>
          ) : !data?.ativos?.length ? (
            <div className="p-12 text-center">
              <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum ativo encontrado</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {search ? 'Tente ajustar os termos de busca ou remover filtros aplicados.' : 'Não há ativos cadastrados no sistema ainda.'}
              </p>
            </div>
          ) : (
            <>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.ativos.map((ativo) => {
                    const tipoStyles = getTipoColor(ativo.tipo)
                    return (
                      <div
                        key={ativo.id}
                        className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                      >
                        {/* Background gradient overlay */}
                        <div className={`absolute inset-0 ${tipoStyles.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                        
                        <div className="relative">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${tipoStyles.bg} ${tipoStyles.text} ${tipoStyles.border}`}>
                              <Building2 className={`h-3 w-3 mr-1.5 ${tipoStyles.icon}`} />
                              {ativo.tipo}
                            </div>
                            <Link
                              href={`/ativos/${ativo.id}`}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group-hover:scale-110"
                              title="Ver detalhes"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                          </div>

                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                              {ativo.nome}
                            </h3>
                            
                            <div className="inline-flex items-center bg-gray-50 rounded-lg px-3 py-1.5 mb-3">
                              <span className="text-sm font-mono font-semibold text-gray-700">
                                {ativo.codigo}
                              </span>
                            </div>
                          </div>

                          {ativo.descricao && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                              {ativo.descricao}
                            </p>
                          )}

                          <div className="flex items-center text-xs text-gray-500">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Cadastrado em: {formatDate(ativo.createdAt)}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Paginação */}
              {data.pagination && data.pagination.totalPages > 1 && (
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 rounded-b-2xl">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700">
                      Mostrando <span className="font-semibold text-gray-900">{((page - 1) * limit) + 1}</span> até <span className="font-semibold text-gray-900">{Math.min(page * limit, data.pagination.total)}</span> de <span className="font-semibold text-gray-900">{data.pagination.total}</span> ativos
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-sm bg-white text-gray-700 transition-all duration-200"
                      >
                        ← Anterior
                      </button>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-gray-200">
                        <span className="text-sm font-medium text-gray-700">
                          {page} de {data.pagination.totalPages}
                        </span>
                      </div>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === data.pagination.totalPages}
                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-sm bg-white text-gray-700 transition-all duration-200"
                      >
                        Próxima →
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
