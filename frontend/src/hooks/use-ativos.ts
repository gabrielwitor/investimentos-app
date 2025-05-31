import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { Ativo, AtivoListResponse } from '@/types/ativo'

// Hook para listagem de ativos
export function useAtivos(page = 1, limit = 10, search?: string) {
  return useQuery({
    queryKey: ['ativos', page, limit, search],
    queryFn: async (): Promise<AtivoListResponse> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })
      
      if (search) {
        params.append('search', search)
      }
      
      const response = await api.get(`/api/ativos?${params}`)
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
