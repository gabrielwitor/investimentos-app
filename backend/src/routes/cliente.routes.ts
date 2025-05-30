import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ClienteService } from '../services/cliente.service';
import { 
  createClienteSchema, 
  updateClienteSchema, 
  clienteParamsSchema, 
  listClientesSchema,
  CreateClienteData,
  UpdateClienteData,
  ClienteParams,
  ListClientesQuery
} from '../schemas/cliente.schema';

export async function clienteRoutes(fastify: FastifyInstance) {
  const clienteService = new ClienteService(fastify.prisma);

  // GET /clientes - Listar clientes
  fastify.get<{
    Querystring: ListClientesQuery
  }>('/clientes', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'string' },
          limit: { type: 'string' },
          status: { type: 'string', enum: ['ATIVO', 'INATIVO'] },
          search: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            clientes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  nome: { type: 'string' },
                  email: { type: 'string' },
                  status: { type: 'string' },
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
  }, async (request: FastifyRequest<{ Querystring: ListClientesQuery }>, reply: FastifyReply) => {
    try {
      const query = listClientesSchema.parse(request.query);
      const result = await clienteService.listClientes(query);
      
      return reply.code(200).send(result);
    } catch (error) {
      fastify.log.error(error);
      return reply.code(400).send({ 
        error: 'Erro ao listar clientes', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // GET /clientes/:id - Buscar cliente por ID
  fastify.get<{
    Params: ClienteParams
  }>('/clientes/:id', {
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
            email: { type: 'string' },
            status: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: ClienteParams }>, reply: FastifyReply) => {
    try {
      const { id } = clienteParamsSchema.parse(request.params);
      const cliente = await clienteService.getClienteById(id);
      
      return reply.code(200).send(cliente);
    } catch (error) {
      fastify.log.error(error);
      const statusCode = error instanceof Error && error.message === 'Cliente não encontrado' ? 404 : 400;
      return reply.code(statusCode).send({ 
        error: 'Erro ao buscar cliente', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // POST /clientes - Criar cliente
  fastify.post<{
    Body: CreateClienteData
  }>('/clientes', {
    schema: {
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string', minLength: 2, maxLength: 100 },
          email: { type: 'string', format: 'email', maxLength: 150 },
          status: { type: 'string', enum: ['ATIVO', 'INATIVO'] }
        },
        required: ['nome', 'email']
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            nome: { type: 'string' },
            email: { type: 'string' },
            status: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: CreateClienteData }>, reply: FastifyReply) => {
    try {
      const data = createClienteSchema.parse(request.body);
      const cliente = await clienteService.createCliente(data);
      
      return reply.code(201).send(cliente);
    } catch (error) {
      fastify.log.error(error);
      const statusCode = error instanceof Error && error.message.includes('email') ? 409 : 400;
      return reply.code(statusCode).send({ 
        error: 'Erro ao criar cliente', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // PUT /clientes/:id - Atualizar cliente
  fastify.put<{
    Params: ClienteParams,
    Body: UpdateClienteData
  }>('/clientes/:id', {
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
          nome: { type: 'string', minLength: 2, maxLength: 100 },
          email: { type: 'string', format: 'email', maxLength: 150 },
          status: { type: 'string', enum: ['ATIVO', 'INATIVO'] }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            nome: { type: 'string' },
            email: { type: 'string' },
            status: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: ClienteParams, Body: UpdateClienteData }>, reply: FastifyReply) => {
    try {
      const { id } = clienteParamsSchema.parse(request.params);
      const data = updateClienteSchema.parse(request.body);
      const cliente = await clienteService.updateCliente(id, data);
      
      return reply.code(200).send(cliente);
    } catch (error) {
      fastify.log.error(error);
      let statusCode = 400;
      if (error instanceof Error) {
        if (error.message === 'Cliente não encontrado') statusCode = 404;
        if (error.message.includes('email')) statusCode = 409;
      }
      return reply.code(statusCode).send({ 
        error: 'Erro ao atualizar cliente', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

  // DELETE /clientes/:id - Deletar cliente
  fastify.delete<{
    Params: ClienteParams
  }>('/clientes/:id', {
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
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: ClienteParams }>, reply: FastifyReply) => {
    try {
      const { id } = clienteParamsSchema.parse(request.params);
      const result = await clienteService.deleteCliente(id);
      
      return reply.code(200).send(result);
    } catch (error) {
      fastify.log.error(error);
      const statusCode = error instanceof Error && error.message === 'Cliente não encontrado' ? 404 : 400;
      return reply.code(statusCode).send({ 
        error: 'Erro ao deletar cliente', 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });
}
