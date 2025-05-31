import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  Alocacao, 
  AlocacaoListResponse, 
  CreateAlocacaoData, 
  UpdateAlocacaoData,
  AlocacoesPorCliente 
} from '@/types/alocacao';

// Hook para listar alocações
export function useAlocacoes(params?: { 
  page?: number; 
  limit?: number; 
  clienteId?: string; 
  ativoId?: string; 
}) {
  return useQuery<AlocacaoListResponse>({
    queryKey: ['alocacoes', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.clienteId) searchParams.append('clienteId', params.clienteId);
      if (params?.ativoId) searchParams.append('ativoId', params.ativoId);
      
      const response = await api.get(`/api/alocacoes?${searchParams.toString()}`);
      return response.data;
    },
  });
}

// Hook para buscar uma alocação por ID
export function useAlocacao(id: string) {
  return useQuery<Alocacao>({
    queryKey: ['alocacao', id],
    queryFn: async () => {
      const response = await api.get(`/api/alocacoes/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

// Hook para buscar alocações de um cliente
export function useAlocacoesPorCliente(clienteId: string) {
  return useQuery<AlocacoesPorCliente>({
    queryKey: ['alocacoes', 'cliente', clienteId],
    queryFn: async () => {
      const response = await api.get(`/api/clientes/${clienteId}/alocacoes`);
      return response.data;
    },
    enabled: !!clienteId,
  });
}

// Hook para criar nova alocação
export function useCreateAlocacao() {
  const queryClient = useQueryClient();
  
  return useMutation<Alocacao, Error, CreateAlocacaoData>({
    mutationFn: async (data) => {
      const response = await api.post('/api/alocacoes', data);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidar cache das alocações
      queryClient.invalidateQueries({ queryKey: ['alocacoes'] });
      // Invalidar alocações específicas do cliente
      queryClient.invalidateQueries({ queryKey: ['alocacoes', 'cliente', data.clienteId] });
      // Invalidar detalhes do cliente
      queryClient.invalidateQueries({ queryKey: ['cliente', data.clienteId] });
    },
  });
}

// Hook para atualizar alocação
export function useUpdateAlocacao() {
  const queryClient = useQueryClient();
  
  return useMutation<Alocacao, Error, { id: string; data: UpdateAlocacaoData }>({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/api/alocacoes/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidar cache das alocações
      queryClient.invalidateQueries({ queryKey: ['alocacoes'] });
      // Invalidar alocação específica
      queryClient.invalidateQueries({ queryKey: ['alocacao', data.id] });
      // Invalidar alocações do cliente
      queryClient.invalidateQueries({ queryKey: ['alocacoes', 'cliente', data.clienteId] });
      // Invalidar detalhes do cliente
      queryClient.invalidateQueries({ queryKey: ['cliente', data.clienteId] });
    },
  });
}

// Hook para deletar alocação
export function useDeleteAlocacao() {
  const queryClient = useQueryClient();
  
  return useMutation<{ message: string }, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete(`/api/alocacoes/${id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidar todas as queries relacionadas a alocações
      queryClient.invalidateQueries({ queryKey: ['alocacoes'] });
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
}
