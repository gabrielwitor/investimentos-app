import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export interface DashboardStats {
  totalClientes: number
  clientesAtivos: number
  ativosDisponiveis: number
  patrimonioTotal: number
  alocacoesAtivas: number
}

// Hook para buscar estatísticas da dashboard
export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.get('/api/dashboard/stats')
      return response.data
    },
  })
}
