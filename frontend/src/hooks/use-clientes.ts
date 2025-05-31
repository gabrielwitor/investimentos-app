import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { Cliente, CreateClienteData, UpdateClienteData, ClienteListResponse } from '@/types/cliente'

// Hooks para listagem de clientes
export function useClientes(page = 1, limit = 10, search?: string) {
  return useQuery({
    queryKey: ['clientes', page, limit, search],
    queryFn: async (): Promise<ClienteListResponse> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })
      
      if (search) {
        params.append('search', search)
      }
      
      const response = await api.get(`/api/clientes?${params}`)
      return response.data
    },
  })
}

// Hook para buscar cliente por ID
export function useCliente(id: string) {
  return useQuery({
    queryKey: ['cliente', id],
    queryFn: async (): Promise<Cliente> => {
      const response = await api.get(`/api/clientes/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

// Hook para criar cliente
export function useCreateCliente() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateClienteData): Promise<Cliente> => {
      const response = await api.post('/api/clientes', data)
      return response.data
    },
    onSuccess: () => {
      // Invalida a cache dos clientes para refetch
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    },
  })
}

// Hook para atualizar cliente
export function useUpdateCliente() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateClienteData }): Promise<Cliente> => {
      const response = await api.put(`/api/clientes/${id}`, data)
      return response.data
    },
    onSuccess: (data) => {
      // Invalida a cache dos clientes para refetch
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
      // Atualiza a cache do cliente específico
      queryClient.setQueryData(['cliente', data.id], data)
    },
  })
}

// Hook para deletar cliente
export function useDeleteCliente() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/api/clientes/${id}`)
    },
    onSuccess: () => {
      // Invalida a cache dos clientes para refetch
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    },
  })
}
