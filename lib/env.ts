import { z } from 'zod'

/**
 * Validação de variáveis de ambiente com Zod
 * 
 * Garante que todas as variáveis necessárias estão definidas e válidas
 * antes do aplicativo iniciar.
 * 
 * ⚠️ IMPORTANTE:
 * - Variáveis NEXT_PUBLIC_* são expostas no bundle do client
 * - Variáveis sem prefixo são server-only
 * - Falha de validação previne deploy quebrado
 */

const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Public Environment Variables (expostas no client)
  NEXT_PUBLIC_ENV: z.string().default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  
  // Analytics (públicas, opcionais)
  NEXT_PUBLIC_GA4_ID: z.string().regex(/^G-/).optional(),
  NEXT_PUBLIC_GTM_ID: z.string().regex(/^GTM-/).optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().regex(/^\d+$/).optional(),
  
  // Debug (público, opcional)
  NEXT_PUBLIC_DEBUG: z.string().optional(),
  
  // Server-Only Environment Variables (NUNCA expostas no client)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20, 'Service role key inválida'),
  ENCRYPTION_SECRET: z.string().min(32, 'ENCRYPTION_SECRET deve ter no mínimo 32 caracteres'),
  
  // Pacto API
  PACTO_API_URL: z.string().url().default('https://apigw.pactosolucoes.com.br'),
})

export type AppEnv = z.infer<typeof envSchema>

let _cached: AppEnv | null = null

/**
 * Obtém e valida variáveis de ambiente
 * @throws Error se variáveis obrigatórias estiverem ausentes ou inválidas
 */
export function getEnv(): AppEnv {
  if (_cached) return _cached
  
  const parsed = envSchema.safeParse(process.env)
  
  if (!parsed.success) {
    const formatted = parsed.error.flatten()
    
    console.error('❌ Erro de validação de variáveis de ambiente:\n')
    
    // Formatar erros de forma legível
    const fieldErrors = formatted.fieldErrors
    for (const [field, errors] of Object.entries(fieldErrors)) {
      if (errors && errors.length > 0) {
        console.error(`  ${field}:`)
        errors.forEach(err => console.error(`    - ${err}`))
      }
    }
    
    console.error('\n💡 Dicas:')
    console.error('  1. Copie .env.example para .env.local')
    console.error('  2. Preencha todas as variáveis obrigatórias')
    console.error('  3. Nunca commite .env.local no Git\n')
    
    throw new Error('Validação de environment variables falhou')
  }
  
  _cached = parsed.data
  return _cached
}

/**
 * Helper para validar em desenvolvimento
 * Não lança erro em produção para não quebrar build
 */
export function validateEnvSafe(): boolean {
  try {
    getEnv()
    console.info('✅ [env] Variáveis de ambiente validadas com sucesso')
    return true
  } catch (e) {
    console.error('❌ [env] Falha na validação:', e)
    
    // Em produção, apenas avisa mas não quebra
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ [env] Continuando em produção apesar de erros de validação')
      return false
    }
    
    // Em dev/test, re-lança erro para forçar correção
    throw e
  }
}

// Validar na inicialização (apenas server-side)
if (typeof window === 'undefined') {
  validateEnvSafe()
}
