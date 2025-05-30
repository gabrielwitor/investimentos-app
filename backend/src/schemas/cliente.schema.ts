import { z } from 'zod';

// Schema para criação de cliente
export const createClienteSchema = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  email: z.string()
    .email('Email deve ter um formato válido')
    .max(150, 'Email deve ter no máximo 150 caracteres')
    .toLowerCase()
    .trim(),
  status: z.enum(['ATIVO', 'INATIVO']).optional().default('ATIVO')
});

// Schema para atualização de cliente
export const updateClienteSchema = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim()
    .optional(),
  email: z.string()
    .email('Email deve ter um formato válido')
    .max(150, 'Email deve ter no máximo 150 caracteres')
    .toLowerCase()
    .trim()
    .optional(),
  status: z.enum(['ATIVO', 'INATIVO']).optional()
});

// Schema para parâmetros da URL
export const clienteParamsSchema = z.object({
  id: z.string().cuid('ID deve ser um CUID válido')
});

// Schema para query parameters de listagem
export const listClientesSchema = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val) : 10),
  status: z.enum(['ATIVO', 'INATIVO']).optional(),
  search: z.string().optional().transform((val) => val?.trim())
});

// Tipos TypeScript derivados dos schemas
export type CreateClienteData = z.infer<typeof createClienteSchema>;
export type UpdateClienteData = z.infer<typeof updateClienteSchema>;
export type ClienteParams = z.infer<typeof clienteParamsSchema>;
export type ListClientesQuery = z.infer<typeof listClientesSchema>;
