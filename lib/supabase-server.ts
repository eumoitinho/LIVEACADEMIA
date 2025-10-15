import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase com Service Role Key
 * ATENÇÃO: Use apenas em contexto server-side!
 * 
 * Variáveis de ambiente necessárias:
 * - NEXT_PUBLIC_SUPABASE_URL: URL do projeto Supabase
 * - SUPABASE_SERVICE_ROLE_KEY: Service role key (privilégios admin)
 * 
 * ⚠️ NUNCA expor SUPABASE_SERVICE_ROLE_KEY no client-side!
 */

// Suporta NEXT_PUBLIC_SUPABASE_URL (preferido) ou SUPABASE_URL (fallback para scripts)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error(
    '❌ NEXT_PUBLIC_SUPABASE_URL não definida!\n' +
    'Defina no arquivo .env.local:\n' +
    'NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co'
  )
}

if (!serviceKey) {
  throw new Error(
    '❌ SUPABASE_SERVICE_ROLE_KEY não definida!\n' +
    'Defina no arquivo .env.local:\n' +
    'SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key\n' +
    'Obtenha em: Supabase Dashboard > Settings > API > service_role'
  )
}

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
})
