export interface Alocacao {
  id: string;
  clienteId: string;
  ativoId: string;
  valor: number;
  createdAt: string;
  updatedAt: string;
  cliente: {
    id: string;
    nome: string;
    email: string;
    status?: string;
  };
  ativo: {
    id: string;
    nome: string;
    codigo: string;
    tipo: string;
    descricao?: string;
  };
}

export interface AlocacaoListResponse {
  alocacoes: Alocacao[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateAlocacaoData {
  clienteId: string;
  ativoId: string;
  valor: number;
}

export interface UpdateAlocacaoData {
  valor: number;
}

export interface AlocacoesPorCliente {
  cliente: {
    id: string;
    nome: string;
    email: string;
    status: string;
  };
  alocacoes: {
    id: string;
    valor: number;
    createdAt: string;
    updatedAt: string;
    ativo: {
      id: string;
      nome: string;
      codigo: string;
      tipo: string;
      descricao?: string;
    };
  }[];
  resumo: {
    totalInvestido: number;
    quantidadeAtivos: number;
  };
}
