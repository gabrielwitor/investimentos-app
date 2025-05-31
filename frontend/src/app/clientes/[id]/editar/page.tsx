'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout';
import { useEffect } from 'react';
import { useCliente, useUpdateCliente } from '@/hooks/use-clientes';
import { updateClienteSchema, UpdateClienteFormData } from '@/lib/validations/cliente';
import { ArrowLeft, User, Save, Sparkles, Activity } from 'lucide-react';
import Link from 'next/link';

export default function EditarClientePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const { data: cliente, isLoading: isLoadingCliente } = useCliente(id);
  const updateCliente = useUpdateCliente();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateClienteFormData>({
    resolver: zodResolver(updateClienteSchema),
  });

  // Preencher o formulário com os dados do cliente quando carregados
  useEffect(() => {
    if (cliente) {
      reset({
        nome: cliente.nome,
        email: cliente.email,
        status: cliente.status,
      });
    }
  }, [cliente, reset]);

  const onSubmit = async (data: UpdateClienteFormData) => {
    try {
      await updateCliente.mutateAsync({ id, data });
      router.push(`/clientes/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente');
    }
  };

  if (isLoadingCliente) {
    return (
      <AppLayout>
        <div className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Carregando dados do cliente...</p>
        </div>
      </AppLayout>
    );
  }

  if (!cliente) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <User className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Cliente não encontrado</h3>
            <p className="text-red-700">O cliente solicitado não existe ou foi removido.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header with modern gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <Link
                href={`/clientes/${id}`}
                className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <User className="h-12 w-12" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Editar Cliente</h1>
                  <p className="text-xl text-blue-100 mb-4">Atualize os dados do cliente</p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-200" />
                      <span className="text-blue-100">Editando: {cliente.nome}</span>
                    </div>
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-blue-200" />
                      <span className="text-blue-100">Formulário seguro</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-8">
              <div className="bg-blue-50 rounded-lg p-2 mr-3">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Dados do Cliente</h3>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Nome */}
                <div>
                  <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-3">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    {...register('nome')}
                    className="block w-full border border-gray-200 rounded-xl shadow-sm py-4 px-4 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg"
                    placeholder="Digite o nome completo"
                  />
                  {errors.nome && (
                    <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg">{errors.nome.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="block w-full border border-gray-200 rounded-xl shadow-sm py-4 px-4 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg"
                    placeholder="Digite o email"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg">{errors.email.message}</p>
                  )}
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-3">
                    Status do Cliente
                  </label>
                  <select
                    id="status"
                    {...register('status')}
                    className="block w-full border border-gray-200 rounded-xl shadow-sm py-4 px-4 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg"
                  >
                    <option value="ATIVO">Cliente Ativo</option>
                    <option value="INATIVO">Cliente Inativo</option>
                  </select>
                  {errors.status && (
                    <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg">{errors.status.message}</p>
                  )}
                </div>
              </div>

              {/* Botões */}
              <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-100">
                <Link
                  href={`/clientes/${id}`}
                  className="px-6 py-3 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
