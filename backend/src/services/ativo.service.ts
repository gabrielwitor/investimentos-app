import { PrismaClient } from '@prisma/client';
import type { ListAtivosQuery } from '../schemas/ativo.schema';

export class AtivoService {
  constructor(private prisma: PrismaClient) {}

  // Listar ativos com filtros e paginação
  async listAtivos(query: ListAtivosQuery) {
    const { page = 1, limit = 10, search } = query;
    const offset = (page - 1) * limit;

    // Construir filtros
    const where: any = {};
    
    if (search) {
      where.nome = {
        contains: search
      };
    }

    try {
      // Buscar ativos com paginação
      const [ativos, total] = await Promise.all([
        this.prisma.ativo.findMany({
          where,
          orderBy: { nome: 'asc' },
          skip: offset,
          take: limit
        }),
        this.prisma.ativo.count({ where })
      ]);

      return {
        ativos,
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

  // Buscar ativo por ID
  async getAtivoById(id: string) {
    try {
      const ativo = await this.prisma.ativo.findUnique({
        where: { id },
        include: {
          alocacoes: {
            include: {
              cliente: true
            }
          }
        }
      });

      if (!ativo) {
        throw new Error('Ativo não encontrado');
      }

      return ativo;
    } catch (error) {
      throw error;
    }
  }
}
