/**
 * Schemas Zod para validação de payloads de API
 * 
 * Centraliza toda a validação de dados de entrada/saída das APIs.
 * Garante type-safety e valida dados em runtime.
 * 
 * Uso em API routes:
 * ```ts
 * import { VendaRequestSchema } from '@/lib/schemas/api-schemas'
 * 
 * export async function POST(req: NextRequest) {
 *   const body = await req.json()
 *   const parseResult = VendaRequestSchema.safeParse(body)
 *   
 *   if (!parseResult.success) {
 *     return NextResponse.json({
 *       error: 'Payload inválido',
 *       details: parseResult.error.flatten()
 *     }, { status: 400 })
 *   }
 *   
 *   const data = parseResult.data // ✅ Type-safe!
 *   // ...
 * }
 * ```
 */

import { z } from 'zod'

// ============================================
// SCHEMAS COMUNS (reutilizáveis)
// ============================================

/**
 * Schema para dados de cliente
 */
export const CustomerDataSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido'),
  cpf: z.string().regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido'),
  endereco: z.string().optional(),
})

export type CustomerData = z.infer<typeof CustomerDataSchema>

/**
 * Schema para dados de cartão de crédito
 */
export const CardDataSchema = z.object({
  numeroCartao: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Número de cartão inválido'),
  nomeCartao: z.string().min(3, 'Nome no cartão inválido'),
  validadeCartao: z.string().regex(/^\d{2}\/\d{2}$/, 'Validade inválida (use MM/AA)'),
  cvvCartao: z.string().regex(/^\d{3,4}$/, 'CVV inválido'),
})

export type CardData = z.infer<typeof CardDataSchema>

/**
 * Schema para método de pagamento
 */
export const PaymentMethodSchema = z.enum(['cartao', 'pix', 'boleto'], {
  errorMap: () => ({ message: 'Método de pagamento inválido' }),
})

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>

/**
 * Schema para slug de unidade
 */
export const UnitSlugSchema = z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug inválido')

/**
 * Schema para ID de plano
 */
export const PlanoIdSchema = z.string().min(1, 'ID do plano obrigatório')

// ============================================
// SCHEMAS DE REQUEST (Entrada)
// ============================================

/**
 * Schema para POST /api/pacto/venda
 */
export const VendaRequestSchema = z.object({
  slug: UnitSlugSchema,
  planoId: PlanoIdSchema,
  planoNome: z.string().min(1, 'Nome do plano obrigatório'),
  valor: z.number().positive('Valor deve ser positivo'),
  paymentMethod: PaymentMethodSchema,
  customer: CustomerDataSchema,
  cardData: CardDataSchema.optional(),
  cupom: z.string().optional(),
}).refine(
  (data) => {
    // Se método é cartão, cardData deve estar presente
    if (data.paymentMethod === 'cartao') {
      return !!data.cardData
    }
    return true
  },
  {
    message: 'Dados do cartão obrigatórios para pagamento com cartão',
    path: ['cardData'],
  }
)

export type VendaRequest = z.infer<typeof VendaRequestSchema>

/**
 * Schema para POST /api/pacto/simular
 */
export const SimularRequestSchema = z.object({
  slug: UnitSlugSchema,
  planoId: PlanoIdSchema,
  valor: z.number().positive().optional(),
  cupom: z.string().optional(),
  paymentMethod: PaymentMethodSchema.optional(),
})

export type SimularRequest = z.infer<typeof SimularRequestSchema>


// ============================================
// SCHEMAS DE RESPONSE (Saída)
// ============================================

/**
 * Schema padrão de resposta de erro
 */
export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  details: z.any().optional(),
  statusCode: z.number().optional(),
})

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

/**
 * Schema de resposta de sucesso genérica
 */
export const SuccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string().optional(),
  data: z.any().optional(),
})

export type SuccessResponse = z.infer<typeof SuccessResponseSchema>

/**
 * Schema de resposta de pagamento (Pacto)
 */
export const PactoResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  transactionId: z.string().optional(),
  pixCode: z.string().optional(),
  boletoUrl: z.string().url().optional(),
  data: z.any().optional(),
})

export type PactoResponse = z.infer<typeof PactoResponseSchema>

/**
 * Schema de resposta de planos
 */
export const PlanosResponseSchema = z.object({
  planos: z.array(z.object({
    codigo: z.string().optional(),
    nome: z.string(),
    valor: z.union([z.string(), z.number()]),
    categoria: z.string().optional(),
    recorrencia: z.string().optional(),
  })),
  fallback: z.boolean().optional(),
  source: z.enum(['api', 'db_cache', 'static_fallback']).optional(),
})

export type PlanosResponse = z.infer<typeof PlanosResponseSchema>

/**
 * Schema de resposta de simulação
 */
export const SimulacaoResponseSchema = z.object({
  simulacao: z.object({
    valorTotal: z.union([z.number(), z.string()]).optional(),
    parcelas: z.array(z.object({
      numero: z.number(),
      valor: z.number(),
      vencimento: z.string().optional(),
    })).optional(),
  }),
  fallback: z.boolean().optional(),
})

export type SimulacaoResponse = z.infer<typeof SimulacaoResponseSchema>

// ============================================
// HELPERS DE VALIDAÇÃO
// ============================================

/**
 * Helper para validar e retornar erro formatado
 * 
 * @example
 * const result = validateSchema(VendaRequestSchema, body)
 * if (!result.success) {
 *   return NextResponse.json(result.error, { status: 400 })
 * }
 * const data = result.data
 */
export function validateSchema<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: ErrorResponse } {
  const parseResult = schema.safeParse(data)
  
  if (!parseResult.success) {
    const flattened = parseResult.error.flatten()
    
    return {
      success: false,
      error: {
        error: 'Validação falhou',
        message: 'Dados de entrada inválidos',
        details: flattened.fieldErrors,
        statusCode: 400,
      },
    }
  }
  
  return {
    success: true,
    data: parseResult.data,
  }
}

/**
 * Decorator de validação para API routes
 * 
 * @example
 * export const POST = withValidation(VendaRequestSchema, async (req, data) => {
 *   // data é type-safe e validado
 *   const result = await processVenda(data)
 *   return NextResponse.json(result)
 * })
 */
export function withValidation<T extends z.ZodType>(
  schema: T,
  handler: (req: Request, data: z.infer<T>) => Promise<Response>
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    try {
      const body = await req.json()
      const validation = validateSchema(schema, body)
      
      if (!validation.success) {
        return Response.json(validation.error, { status: 400 })
      }
      
      return handler(req, validation.data)
    } catch (error) {
      return Response.json(
        {
          error: 'Erro ao processar requisição',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        { status: 500 }
      )
    }
  }
}

// ============================================
// SCHEMAS DE DOMÍNIO (Dados do banco)
// ============================================

/**
 * Schema para Unit do banco
 */
export const UnitSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  nome: z.string(),
  codigo_unidade: z.string().optional(),
  chave_publica: z.string().nullable(),
  cidade: z.string().nullable(),
  estado: z.string().nullable(),
  cep: z.string().nullable(),
  endereco: z.string().nullable(),
  complemento: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  telefone: z.string().nullable(),
  email: z.string().email().nullable(),
  logo: z.string().url().nullable(),
  imagens: z.array(z.string()).nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type Unit = z.infer<typeof UnitSchema>

