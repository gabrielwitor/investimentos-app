import { z } from 'zod';

export const createAlocacaoSchema = z.object({
  clienteId: z.string().min(1, 'Cliente é obrigatório'),
  ativoId: z.string().min(1, 'Ativo é obrigatório'),
  valor: z.number().min(0.01, 'Valor deve ser maior que zero')
});

export const updateAlocacaoSchema = z.object({
  valor: z.number().min(0.01, 'Valor deve ser maior que zero')
});

export const alocacaoParamsSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório')
});

export const clienteParamsSchema = z.object({
  clienteId: z.string().min(1, 'ID do cliente é obrigatório')
});

export const listAlocacoesSchema = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
  clienteId: z.string().optional(),
  ativoId: z.string().optional()
});

export type CreateAlocacaoInput = z.infer<typeof createAlocacaoSchema>;
export type UpdateAlocacaoInput = z.infer<typeof updateAlocacaoSchema>;
export type AlocacaoParams = z.infer<typeof alocacaoParamsSchema>;
export type ClienteParams = z.infer<typeof clienteParamsSchema>;
export type ListAlocacoesQuery = z.infer<typeof listAlocacoesSchema>;
