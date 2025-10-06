import { z } from 'zod'

// Esquema de validação das variáveis de ambiente (lado server)
// Para variáveis públicas (NEXT_PUBLIC_) usamos o mesmo processo mas lembrando que ficam expostas no bundle

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_ENV: z.string().default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_GA4_ID: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
})

export type AppEnv = z.infer<typeof envSchema>

let _cached: AppEnv | null = null

export function getEnv(): AppEnv {
  if (_cached) return _cached
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    // Formata erros de forma amigável
    const issues = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('\n')
    throw new Error(`Erro de variáveis de ambiente:\n${issues}`)
  }
  _cached = parsed.data
  return _cached
}

// Helper para garantir em runtime early-fail
try {
  getEnv()
  // eslint-disable-next-line no-console
  console.info('[env] Variáveis validadas com sucesso')
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('[env] Falha na validação:', e)
}
