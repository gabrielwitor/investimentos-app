'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout'
import { useClientes, useDeleteCliente } from '@/hooks/use-clientes'
import { Users, Search, Edit, Trash2, Eye, Mail, User, UserPlus, Sparkles, CheckCircle, XCircle, Activity, Wallet } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function ClientesPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  
  const limit = 10
  const { data, isLoading, error } = useClientes(page, limit, search)
  const deleteCliente = useDeleteCliente()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const handleDelete = async (id: string, nome: string) => {
    if (confirm(`Tem certeza que deseja deletar o cliente "${nome}"?`)) {
      try {
        await deleteCliente.mutateAsync(id)
      } catch (error) {
        console.error('Erro ao deletar cliente:', error)
        alert('Erro ao deletar cliente')
      }
    }
  }

  if (error) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="text-red-600">
            Erro ao carregar clientes: {error.message}
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 lg:p-3 mr-3 lg:mr-4">
                    <Users className="h-6 w-6 lg:h-10 lg:w-10" />
                  </div>
                  Clientes
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mb-4">
                  Gerencie todos os clientes do seu escritório de investimentos
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-blue-200" />
                    <span className="text-sm lg:text-base text-blue-100">
                      {data?.pagination?.total || 0} clientes cadastrados
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-blue-200" />
                    <span className="text-sm lg:text-base text-blue-100">Sistema atualizado</span>
                  </div>
                </div>
              </div>
              <Link
                href="/clientes/novo"
                className="inline-flex items-center justify-center px-4 lg:px-6 py-2 lg:py-3 border border-white/20 text-sm font-semibold rounded-xl text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <UserPlus className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                Novo Cliente
              </Link>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-4 lg:mb-6">
              <div className="bg-blue-50 rounded-lg p-2 mr-3">
                <Search className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
              </div>
              <h2 className="text-base lg:text-lg font-semibold text-gray-900">Buscar Clientes</h2>
            </div>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 lg:h-5 lg:w-5" />
                  <input
                    type="text"
                    placeholder="Digite o nome, email ou CPF do cliente..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="block w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 border border-gray-200 rounded-xl shadow-sm bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm lg:text-base"
                  />
                </div>
              </div>
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-4 lg:px-6 py-2.5 lg:py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
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
                    className="flex-1 sm:flex-initial px-4 lg:px-6 py-2.5 lg:py-3 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Lista de clientes */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Carregando clientes...</p>
            </div>
          ) : !data?.clientes.length ? (
            <div className="p-12 text-center">
              <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum cliente encontrado</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {search ? 'Tente ajustar os termos de busca ou remover filtros aplicados.' : 'Comece criando seu primeiro cliente para começar a gerenciar investimentos.'}
              </p>
              {!search && (
                <Link
                  href="/clientes/novo"
                  className="inline-flex items-center px-6 py-3 border border-transparent shadow-lg text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Criar Primeiro Cliente
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="p-8">
                <div className="grid grid-cols-1 gap-6">
                  {data.clientes.map((cliente) => (
                    <div
                      key={cliente.id}
                      className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Background gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      
                      <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                  <User className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-1">
                                  {cliente.nome}
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                                  <div className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                    <span className="text-sm text-gray-600">{cliente.email}</span>
                                  </div>
                                  <div className="flex items-center">
                                    {cliente.status === 'ATIVO' ? (
                                      <>
                                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                        <span className="text-sm font-medium text-green-700">Ativo</span>
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="h-4 w-4 mr-1 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-500">Inativo</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-500">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              Cadastrado em: {formatDate(cliente.createdAt)}
                            </div>
                          </div>                            {/* Mobile-responsive action buttons */}
                            <div className="pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                              {/* Mobile: 2x2 grid, Tablet+: horizontal row */}
                              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3">
                                <Link
                                  href={`/clientes/${cliente.id}`}
                                  className="inline-flex items-center justify-center px-2 sm:px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 group-hover:scale-105"
                                  title="Visualizar detalhes"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  <span>Ver</span>
                                </Link>
                                <Link
                                  href={`/clientes/${cliente.id}/alocacoes`}
                                  className="inline-flex items-center justify-center px-2 sm:px-3 py-2 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-200 group-hover:scale-105"
                                  title="Ver alocações"
                                >
                                  <Wallet className="h-4 w-4 mr-1" />
                                  <span>Carteira</span>
                                </Link>
                                <Link
                                  href={`/clientes/${cliente.id}/editar`}
                                  className="inline-flex items-center justify-center px-2 sm:px-3 py-2 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all duration-200 group-hover:scale-105"
                                  title="Editar cliente"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  <span>Editar</span>
                                </Link>
                                <button
                                  onClick={() => handleDelete(cliente.id, cliente.nome)}
                                  className="inline-flex items-center justify-center px-2 sm:px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 group-hover:scale-105 disabled:opacity-50"
                                  title="Deletar cliente"
                                  disabled={deleteCliente.isPending}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  <span>Excluir</span>
                                </button>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paginação */}
              {data.pagination && data.pagination.totalPages > 1 && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700">
                      Mostrando <span className="font-semibold text-blue-600">{((page - 1) * limit) + 1}</span> até <span className="font-semibold text-blue-600">{Math.min(page * limit, data.pagination.total)}</span> de <span className="font-semibold text-blue-600">{data.pagination.total}</span> clientes
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 border border-gray-200 text-sm font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-md bg-white text-gray-700 hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm"
                      >
                        Anterior
                      </button>
                      <div className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg">
                        {page} de {data.pagination.totalPages}
                      </div>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === data.pagination.totalPages}
                        className="px-4 py-2 border border-gray-200 text-sm font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-md bg-white text-gray-700 hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm"
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
