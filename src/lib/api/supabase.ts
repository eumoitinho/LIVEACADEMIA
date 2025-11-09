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

// Supabase é opcional - se não estiver configurado, retorna null
export const supabaseAdmin = supabaseUrl && serviceKey
  ? createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    })
  : null

// Helper para verificar se Supabase está disponível
export const isSupabaseAvailable = () => !!supabaseAdmin
