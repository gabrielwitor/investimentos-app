import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { AtivoService } from '../services/ativo.service';
import { 
  listAtivosSchema,
  ativoParamsSchema,
  ListAtivosQuery,
  AtivoParams
} from '../schemas/ativo.schema';

// Extend Fastify type to include Prisma
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export async function ativoRoutes(fastify: FastifyInstance) {
  const ativoService = new AtivoService(fastify.prisma);

  // GET /ativos - Listar ativos
  fastify.get<{
    Querystring: ListAtivosQuery
  }>('/ativos', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'string' },
          limit: { type: 'string' },
          search: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            ativos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  nome: { type: 'string' },
                  valor: { type: 'number' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' }
                }
              }
            },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'number' },
                limit: { type: 'number' },
                total: { type: 'number' },
                totalPages: { type: 'number' }
              }
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Querystring: ListAtivosQuery }>, reply: FastifyReply) => {
    try {
      const query = listAtivosSchema.parse(request.query);
      const result = await ativoService.listAtivos(query);
      
      return reply.code(200).send(result);
    } catch (error) {
      fastify.log.error(error);
      return reply.code(400).send({ 
        error: 'Erro ao listar ativos', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // GET /ativos/:id - Buscar ativo por ID
  fastify.get<{
    Params: AtivoParams
  }>('/ativos/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            nome: { type: 'string' },
            valor: { type: 'number' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            alocacoes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  valor: { type: 'number' },
                  cliente: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      nome: { type: 'string' },
                      email: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: AtivoParams }>, reply: FastifyReply) => {
    try {
      const { id } = ativoParamsSchema.parse(request.params);
      const ativo = await ativoService.getAtivoById(id);
      
      return reply.code(200).send(ativo);
    } catch (error) {
      fastify.log.error(error);
      const statusCode = error instanceof Error && error.message === 'Ativo não encontrado' ? 404 : 400;
      return reply.code(statusCode).send({ 
        error: 'Erro ao buscar ativo', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });
}
