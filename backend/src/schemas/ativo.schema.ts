import { z } from 'zod';

// Schema para listagem de ativos
export const listAtivosSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  search: z.string().optional()
});

// Schema para parâmetros de ID do ativo
export const ativoParamsSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório')
});

// Types
export type ListAtivosQuery = z.infer<typeof listAtivosSchema>;
export type AtivoParams = z.infer<typeof ativoParamsSchema>;
