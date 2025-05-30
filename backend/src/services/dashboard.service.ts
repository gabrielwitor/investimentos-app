import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface DashboardStats {
  totalClientes: number
  ativosDisponiveis: number
  patrimonioTotal: number
  alocacoesAtivas: number
}

export class DashboardService {
  async getStats(): Promise<DashboardStats> {
    // Total de clientes (todos os clientes cadastrados)
    const totalClientes = await prisma.cliente.count()

    // Total de ativos disponíveis
    const ativosDisponiveis = await prisma.ativo.count()

    // Patrimônio total (soma de todas as alocações)
    const patrimonioResult = await prisma.alocacaoAtivo.aggregate({
      _sum: {
        valor: true
      }
    })
    const patrimonioTotal = patrimonioResult._sum.valor || 0

    // Total de alocações ativas
    const alocacoesAtivas = await prisma.alocacaoAtivo.count()

    return {
      totalClientes,
      ativosDisponiveis,
      patrimonioTotal: Number(patrimonioTotal),
      alocacoesAtivas
    }
  }
}
