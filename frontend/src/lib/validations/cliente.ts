import { z } from 'zod'

export const createClienteSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  status: z.enum(['ATIVO', 'INATIVO']).optional(),
})

export const updateClienteSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  status: z.enum(['ATIVO', 'INATIVO']).optional(),
})

export type CreateClienteFormData = z.infer<typeof createClienteSchema>
export type UpdateClienteFormData = z.infer<typeof updateClienteSchema>
