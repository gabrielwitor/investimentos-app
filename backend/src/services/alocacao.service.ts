import { PrismaClient } from '@prisma/client';

export interface CreateAlocacaoData {
  clienteId: string;
  ativoId: string;
  valor: number;
}

export interface UpdateAlocacaoData {
  valor: number;
}

export interface ListAlocacoesQuery {
  page?: number;
  limit?: number;
  clienteId?: string;
  ativoId?: string;
}

export class AlocacaoService {
  constructor(private prisma: PrismaClient) {}

  async createAlocacao(data: CreateAlocacaoData) {
    // Verificar se cliente existe
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: data.clienteId }
    });
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    // Verificar se ativo existe
    const ativo = await this.prisma.ativo.findUnique({
      where: { id: data.ativoId }
    });
    if (!ativo) {
      throw new Error('Ativo não encontrado');
    }

    // Verificar se já existe alocação para este cliente e ativo
    const existingAlocacao = await this.prisma.alocacaoAtivo.findUnique({
      where: {
        clienteId_ativoId: {
          clienteId: data.clienteId,
          ativoId: data.ativoId
        }
      }
    });

    if (existingAlocacao) {
      throw new Error('Cliente já possui alocação para este ativo');
    }

    return await this.prisma.alocacaoAtivo.create({
      data,
      include: {
        cliente: {
          select: { id: true, nome: true, email: true }
        },
        ativo: {
          select: { id: true, nome: true, codigo: true, tipo: true }
        }
      }
    });
  }

  async getAlocacaoById(id: string) {
    const alocacao = await this.prisma.alocacaoAtivo.findUnique({
      where: { id },
      include: {
        cliente: {
          select: { id: true, nome: true, email: true, status: true }
        },
        ativo: {
          select: { id: true, nome: true, codigo: true, tipo: true, descricao: true }
        }
      }
    });

    if (!alocacao) {
      throw new Error('Alocação não encontrada');
    }

    return alocacao;
  }

  async listAlocacoes(query: ListAlocacoesQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (query.clienteId) {
      where.clienteId = query.clienteId;
    }
    
    if (query.ativoId) {
      where.ativoId = query.ativoId;
    }

    const [alocacoes, total] = await Promise.all([
      this.prisma.alocacaoAtivo.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          cliente: {
            select: { id: true, nome: true, email: true, status: true }
          },
          ativo: {
            select: { id: true, nome: true, codigo: true, tipo: true, descricao: true }
          }
        }
      }),
      this.prisma.alocacaoAtivo.count({ where })
    ]);

    return {
      alocacoes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async updateAlocacao(id: string, data: UpdateAlocacaoData) {
    // Verificar se alocação existe
    const existingAlocacao = await this.prisma.alocacaoAtivo.findUnique({
      where: { id }
    });

    if (!existingAlocacao) {
      throw new Error('Alocação não encontrada');
    }

    return await this.prisma.alocacaoAtivo.update({
      where: { id },
      data,
      include: {
        cliente: {
          select: { id: true, nome: true, email: true }
        },
        ativo: {
          select: { id: true, nome: true, codigo: true, tipo: true }
        }
      }
    });
  }

  async deleteAlocacao(id: string) {
    // Verificar se alocação existe
    const existingAlocacao = await this.prisma.alocacaoAtivo.findUnique({
      where: { id }
    });

    if (!existingAlocacao) {
      throw new Error('Alocação não encontrada');
    }

    await this.prisma.alocacaoAtivo.delete({
      where: { id }
    });

    return { message: 'Alocação removida com sucesso' };
  }

  async getAlocacoesByCliente(clienteId: string) {
    // Verificar se cliente existe
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: clienteId }
    });
    
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const alocacoes = await this.prisma.alocacaoAtivo.findMany({
      where: { clienteId },
      include: {
        ativo: {
          select: { id: true, nome: true, codigo: true, tipo: true, descricao: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calcular total investido
    const totalInvestido = alocacoes.reduce((sum, alocacao) => sum + alocacao.valor, 0);

    return {
      cliente,
      alocacoes,
      resumo: {
        totalInvestido,
        quantidadeAtivos: alocacoes.length
      }
    };
  }
}
