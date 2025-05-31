import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { Ativo, AtivoListResponse } from '@/types/ativo'

// Hook para listagem de ativos
export function useAtivos(params: { page?: number; limit?: number; search?: string } = {}) {
  const { page = 1, limit = 10, search } = params;
  
  return useQuery({
    queryKey: ['ativos', page, limit, search],
    queryFn: async (): Promise<AtivoListResponse> => {
      const urlParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })
      
      if (search) {
        urlParams.append('search', search)
      }
      
      const response = await api.get(`/api/ativos?${urlParams}`)
      return response.data
    },
  })
}

// Hook para buscar ativo por ID
export function useAtivo(id: string) {
  return useQuery({
    queryKey: ['ativo', id],
    queryFn: async (): Promise<Ativo> => {
      const response = await api.get(`/api/ativos/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}
