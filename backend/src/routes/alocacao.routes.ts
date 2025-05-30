import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { AlocacaoService } from '../services/alocacao.service';
import { 
  createAlocacaoSchema,
  updateAlocacaoSchema,
  alocacaoParamsSchema,
  clienteParamsSchema,
  listAlocacoesSchema,
  CreateAlocacaoInput,
  UpdateAlocacaoInput,
  AlocacaoParams,
  ClienteParams,
  ListAlocacoesQuery
} from '../schemas/alocacao.schema';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export async function alocacaoRoutes(fastify: FastifyInstance) {
  const alocacaoService = new AlocacaoService(fastify.prisma);

  // POST /alocacoes - Criar nova alocação
  fastify.post<{
    Body: CreateAlocacaoInput
  }>('/alocacoes', {
    schema: {
      body: {
        type: 'object',
        properties: {
          clienteId: { type: 'string' },
          ativoId: { type: 'string' },
          valor: { type: 'number' }
        },
        required: ['clienteId', 'ativoId', 'valor']
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            clienteId: { type: 'string' },
            ativoId: { type: 'string' },
            valor: { type: 'number' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            cliente: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                nome: { type: 'string' },
                email: { type: 'string' }
              }
            },
            ativo: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                nome: { type: 'string' },
                codigo: { type: 'string' },
                tipo: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: CreateAlocacaoInput }>, reply: FastifyReply) => {
    try {
      const data = createAlocacaoSchema.parse(request.body);
      const alocacao = await alocacaoService.createAlocacao(data);
      
      return reply.code(201).send(alocacao);
    } catch (error) {
      fastify.log.error(error);
      const statusCode = error instanceof Error && 
        (error.message.includes('não encontrado') || error.message.includes('já possui')) ? 400 : 500;
      return reply.code(statusCode).send({ 
        error: 'Erro ao criar alocação', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // GET /alocacoes - Listar alocações
  fastify.get<{
    Querystring: ListAlocacoesQuery
  }>('/alocacoes', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'string' },
          limit: { type: 'string' },
          clienteId: { type: 'string' },
          ativoId: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Querystring: ListAlocacoesQuery }>, reply: FastifyReply) => {
    try {
      const query = listAlocacoesSchema.parse(request.query);
      const result = await alocacaoService.listAlocacoes(query);
      
      return reply.code(200).send(result);
    } catch (error) {
      fastify.log.error(error);
      return reply.code(400).send({ 
        error: 'Erro ao listar alocações', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // GET /alocacoes/:id - Buscar alocação por ID
  fastify.get<{
    Params: AlocacaoParams
  }>('/alocacoes/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      }
    }
  }, async (request: FastifyRequest<{ Params: AlocacaoParams }>, reply: FastifyReply) => {
    try {
      const { id } = alocacaoParamsSchema.parse(request.params);
      const alocacao = await alocacaoService.getAlocacaoById(id);
      
      return reply.code(200).send(alocacao);
    } catch (error) {
      fastify.log.error(error);
      const statusCode = error instanceof Error && error.message === 'Alocação não encontrada' ? 404 : 400;
      return reply.code(statusCode).send({ 
        error: 'Erro ao buscar alocação', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // PUT /alocacoes/:id - Atualizar alocação
  fastify.put<{
    Params: AlocacaoParams;
    Body: UpdateAlocacaoInput;
  }>('/alocacoes/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          valor: { type: 'number' }
        },
        required: ['valor']
      }
    }
  }, async (request: FastifyRequest<{ Params: AlocacaoParams; Body: UpdateAlocacaoInput }>, reply: FastifyReply) => {
    try {
      const { id } = alocacaoParamsSchema.parse(request.params);
      const data = updateAlocacaoSchema.parse(request.body);
      
      const alocacao = await alocacaoService.updateAlocacao(id, data);
      
      return reply.code(200).send(alocacao);
    } catch (error) {
      fastify.log.error(error);
      const statusCode = error instanceof Error && error.message === 'Alocação não encontrada' ? 404 : 400;
      return reply.code(statusCode).send({ 
        error: 'Erro ao atualizar alocação', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // DELETE /alocacoes/:id - Remover alocação
  fastify.delete<{
    Params: AlocacaoParams
  }>('/alocacoes/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      }
    }
  }, async (request: FastifyRequest<{ Params: AlocacaoParams }>, reply: FastifyReply) => {
    try {
      const { id } = alocacaoParamsSchema.parse(request.params);
      const result = await alocacaoService.deleteAlocacao(id);
      
      return reply.code(200).send(result);
    } catch (error) {
      fastify.log.error(error);
      const statusCode = error instanceof Error && error.message === 'Alocação não encontrada' ? 404 : 400;
      return reply.code(statusCode).send({ 
        error: 'Erro ao remover alocação', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // GET /clientes/:clienteId/alocacoes - Buscar alocações de um cliente
  fastify.get<{
    Params: ClienteParams
  }>('/clientes/:clienteId/alocacoes', {
    schema: {
      params: {
        type: 'object',
        properties: {
          clienteId: { type: 'string' }
        },
        required: ['clienteId']
      }
    }
  }, async (request: FastifyRequest<{ Params: ClienteParams }>, reply: FastifyReply) => {
    try {
      const { clienteId } = clienteParamsSchema.parse(request.params);
      const result = await alocacaoService.getAlocacoesByCliente(clienteId);
      
      return reply.code(200).send(result);
    } catch (error) {
      fastify.log.error(error);
      const statusCode = error instanceof Error && error.message === 'Cliente não encontrado' ? 404 : 400;
      return reply.code(statusCode).send({ 
        error: 'Erro ao buscar alocações do cliente', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });
}
