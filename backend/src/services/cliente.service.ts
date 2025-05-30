import { PrismaClient } from '@prisma/client';
import type { CreateClienteData, UpdateClienteData, ListClientesQuery } from '../schemas/cliente.schema';

export class ClienteService {
  constructor(private prisma: PrismaClient) {}

  // Criar um novo cliente
  async createCliente(data: CreateClienteData) {
    try {
      // Verificar se o email já existe
      const clienteExistente = await this.prisma.cliente.findUnique({
        where: { email: data.email }
      });

      if (clienteExistente) {
        throw new Error('Já existe um cliente com este email');
      }

      // Criar o cliente
      const cliente = await this.prisma.cliente.create({
        data: {
          nome: data.nome,
          email: data.email,
          status: data.status || 'ATIVO'
        }
      });

      return cliente;
    } catch (error) {
      throw error;
    }
  }

  // Listar clientes com filtros e paginação
  async listClientes(query: ListClientesQuery) {
    const { page = 1, limit = 10, status, search } = query;
    const offset = (page - 1) * limit;

    // Construir filtros
    const where: any = {};
    
    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    try {
      // Buscar clientes com paginação
      const [clientes, total] = await Promise.all([
        this.prisma.cliente.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: offset,
          take: limit,
          include: {
            alocacoes: {
              include: {
                ativo: true
              }
            }
          }
        }),
        this.prisma.cliente.count({ where })
      ]);

      return {
        clientes,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Buscar cliente por ID
  async getClienteById(id: string) {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id },
        include: {
          alocacoes: {
            include: {
              ativo: true
            }
          }
        }
      });

      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      return cliente;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar cliente
  async updateCliente(id: string, data: UpdateClienteData) {
    try {
      // Verificar se o cliente existe
      const clienteExistente = await this.prisma.cliente.findUnique({
        where: { id }
      });

      if (!clienteExistente) {
        throw new Error('Cliente não encontrado');
      }

      // Verificar se o email já está sendo usado por outro cliente
      if (data.email && data.email !== clienteExistente.email) {
        const emailExistente = await this.prisma.cliente.findUnique({
          where: { email: data.email }
        });

        if (emailExistente) {
          throw new Error('Já existe um cliente com este email');
        }
      }

      // Atualizar o cliente
      const cliente = await this.prisma.cliente.update({
        where: { id },
        data: {
          ...(data.nome && { nome: data.nome }),
          ...(data.email && { email: data.email }),
          ...(data.status && { status: data.status })
        },
        include: {
          alocacoes: {
            include: {
              ativo: true
            }
          }
        }
      });

      return cliente;
    } catch (error) {
      throw error;
    }
  }

  // Deletar cliente
  async deleteCliente(id: string) {
    try {
      // Verificar se o cliente existe
      const clienteExistente = await this.prisma.cliente.findUnique({
        where: { id }
      });

      if (!clienteExistente) {
        throw new Error('Cliente não encontrado');
      }

      // Deletar o cliente (as alocações serão deletadas em cascata)
      await this.prisma.cliente.delete({
        where: { id }
      });

      return { message: 'Cliente deletado com sucesso' };
    } catch (error) {
      throw error;
    }
  }
}
