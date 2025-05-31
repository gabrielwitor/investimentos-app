export interface Cliente {
  id: string
  nome: string
  email: string
  status: 'ATIVO' | 'INATIVO'
  createdAt: string
  updatedAt: string
}

export interface CreateClienteData {
  nome: string
  email: string
  status?: 'ATIVO' | 'INATIVO'
}

export interface UpdateClienteData {
  nome?: string
  email?: string
  status?: 'ATIVO' | 'INATIVO'
}

export interface ClienteListResponse {
  clientes: Cliente[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
