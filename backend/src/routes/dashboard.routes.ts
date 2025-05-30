import { FastifyInstance } from 'fastify'
import { DashboardService } from '../services/dashboard.service'

const dashboardService = new DashboardService()

export async function dashboardRoutes(fastify: FastifyInstance) {
  // GET /api/dashboard/stats - Buscar estatísticas da dashboard
  fastify.get('/stats', {
    schema: {
      summary: 'Buscar estatísticas da dashboard',
      description: 'Retorna estatísticas gerais do sistema para exibir na dashboard',
      response: {
        200: {
          type: 'object',
          properties: {
            totalClientes: { type: 'number' },
            ativosDisponiveis: { type: 'number' },
            patrimonioTotal: { type: 'number' },
            alocacoesAtivas: { type: 'number' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const stats = await dashboardService.getStats()
      return reply.code(200).send(stats)
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({
        error: 'Erro interno do servidor',
        message: 'Não foi possível carregar as estatísticas'
      })
    }
  })
}
