export interface Ativo {
  id: string
  nome: string
  codigo: string
  tipo: string
  descricao: string | null
  createdAt: string
  updatedAt: string
  alocacoes?: AlocacaoAtivo[]
}

export interface AlocacaoAtivo {
  id: string
  clienteId: string
  ativoId: string
  valor: number
  createdAt: string
  updatedAt: string
  cliente?: {
    id: string
    nome: string
    email: string
  }
}

export interface AtivoListResponse {
  ativos: Ativo[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
