'use client';

import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout';
import { useAlocacoesPorCliente } from '@/hooks/use-alocacoes';
import { useAtivos } from '@/hooks/use-ativos';
import { ArrowLeft, Plus, Wallet, TrendingUp, DollarSign, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCreateAlocacao, useDeleteAlocacao } from '@/hooks/use-alocacoes';

export default function ClienteAlocacoesPage() {
  const params = useParams();
  const clienteId = params.id as string;
  
  const { data: alocacoesData, isLoading, error } = useAlocacoesPorCliente(clienteId);
  const { data: ativosData, isLoading: isLoadingAtivos } = useAtivos({ page: 1, limit: 100 }); // Buscar todos os ativos para o formulário
  const createAlocacao = useCreateAlocacao();
  const deleteAlocacao = useDeleteAlocacao();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ativoId: '',
    valor: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ativoId || !formData.valor) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    try {
      await createAlocacao.mutateAsync({
        clienteId,
        ativoId: formData.ativoId,
        valor: parseFloat(formData.valor)
      });
      
      setFormData({ ativoId: '', valor: '' });
      setShowForm(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar alocação';
      alert(errorMessage);
    }
  };

  const handleDelete = async (alocacaoId: string) => {
    if (confirm('Tem certeza que deseja remover esta alocação?')) {
      try {
        await deleteAlocacao.mutateAsync(alocacaoId);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao remover alocação';
        alert(errorMessage);
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Carregando alocações...</p>
        </div>
      </AppLayout>
    );
  }

  if (error || !alocacoesData) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="text-red-600">Erro ao carregar alocações do cliente</div>
        </div>
      </AppLayout>
    );
  }

  const { cliente, alocacoes, resumo } = alocacoesData;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href={`/clientes/${clienteId}`}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                <Wallet className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-green-600" />
                Alocações de {cliente.nome}
              </h1>
              <p className="mt-1 sm:mt-2 text-sm text-gray-600">
                Gerencie os investimentos do cliente
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Alocação
          </button>
        </div>

        {/* Formulário de Nova Alocação */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Nova Alocação</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-3 sm:gap-4">
              <div>
                <label htmlFor="ativo" className="block text-sm font-medium text-gray-700">
                  Ativo
                </label>
                <select
                  id="ativo"
                  value={formData.ativoId}
                  onChange={(e) => setFormData(prev => ({ ...prev, ativoId: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Selecione um ativo</option>
                  {isLoadingAtivos ? (
                    <option disabled>Carregando ativos...</option>
                  ) : ativosData?.ativos && ativosData.ativos.length > 0 ? (
                    ativosData.ativos.map((ativo) => (
                      <option key={ativo.id} value={ativo.id}>
                        {ativo.codigo} - {ativo.nome}
                      </option>
                    ))
                  ) : (
                    <option disabled>Nenhum ativo encontrado</option>
                  )}
                </select>
                {!isLoadingAtivos && (!ativosData?.ativos || ativosData.ativos.length === 0) && (
                  <p className="mt-1 text-sm text-red-600">
                    Nenhum ativo disponível. 
                    <Link href="/ativos" className="text-blue-600 hover:underline ml-1">
                      Cadastre ativos primeiro.
                    </Link>
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  id="valor"
                  step="0.01"
                  min="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData(prev => ({ ...prev, valor: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="0,00"
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-end space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  type="submit"
                  disabled={createAlocacao.isPending}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {createAlocacao.isPending ? 'Criando...' : 'Criar'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Investido
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      {formatCurrency(resumo.totalInvestido)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Quantidade de Ativos
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      {resumo.quantidadeAtivos}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg sm:col-span-2 lg:col-span-1">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Valor Médio por Ativo
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      {formatCurrency(resumo.quantidadeAtivos > 0 ? resumo.totalInvestido / resumo.quantidadeAtivos : 0)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Alocações */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Alocações Ativas</h3>
            
            {alocacoes.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Wallet className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma alocação</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Comece criando uma nova alocação para este cliente.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {alocacoes.map((alocacao) => (
                  <div
                    key={alocacao.id}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {alocacao.ativo.codigo} - {alocacao.ativo.nome}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {alocacao.ativo.tipo} • {alocacao.ativo.descricao}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                        <div className="text-left sm:text-right">
                          <div className="text-base sm:text-lg font-semibold text-gray-900">
                            {formatCurrency(alocacao.valor)}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {new Date(alocacao.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDelete(alocacao.id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Remover alocação"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
