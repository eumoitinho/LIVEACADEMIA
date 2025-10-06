import { z } from 'zod'

export const TokenResponseSchema = z.object({
  return: z.string(), // API Pacto retorna "return" não "token"
  expiresIn: z.number().optional(),
})

export type TokenResponse = z.infer<typeof TokenResponseSchema>

export const UnidadeSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
  cidade: z.string().optional(),
  bairro: z.string().optional(),
  status: z.string().optional(),
})
export type Unidade = z.infer<typeof UnidadeSchema>

export const PlanoSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
  valor: z.union([z.string(), z.number()]),
  categoria: z.string().optional(),
  recorrencia: z.string().optional(),
})
export type Plano = z.infer<typeof PlanoSchema>

export const SimulacaoSchema = z.object({
  plano: PlanoSchema.optional(),
  valorTotal: z.number().or(z.string()).optional(),
  parcelas: z.array(z.object({
    numero: z.number(),
    valor: z.number(),
    vencimento: z.string().optional(),
  })).optional(),
})
export type Simulacao = z.infer<typeof SimulacaoSchema>

export const CupomSchema = z.object({
  valido: z.boolean(),
  descontoPercentual: z.number().optional(),
  descontoValor: z.number().optional(),
  codigo: z.string().optional(),
})
export type Cupom = z.infer<typeof CupomSchema>

export const VendaResultadoSchema = z.object({
  status: z.string(), // aprovado | pendente | recusado
  matricula_id: z.string().optional(),
  transacao_id: z.string().optional(),
  comprovante_url: z.string().optional(),
  pix: z.object({
    qr_code: z.string().optional(),
    codigo: z.string().optional(),
    expiracao: z.string().optional(),
  }).optional(),
  boleto: z.object({
    codigo_barras: z.string().optional(),
    linha_digitavel: z.string().optional(),
    pdf_url: z.string().optional(),
    vencimento: z.string().optional(),
  }).optional(),
})
export type VendaResultado = z.infer<typeof VendaResultadoSchema>

export function safeParse<T>(schema: z.ZodType<T>, data: unknown, context: string) {
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    const issues = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw new Error(`[PactoAPI] Falha ao validar ${context}: ${issues}`)
  }
  return parsed.data
}
