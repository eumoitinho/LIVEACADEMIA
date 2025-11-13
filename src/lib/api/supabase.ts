import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase com Service Role Key
 * ATENÇÃO: Use apenas em contexto server-side!
 * 
 * Variáveis de ambiente necessárias (opcionais - Supabase está desabilitado por padrão):
 * - NEXT_PUBLIC_SUPABASE_URL: URL do projeto Supabase
 * - SUPABASE_SERVICE_ROLE_KEY: Service role key (privilégios admin)
 * 
 * ⚠️ NUNCA expor SUPABASE_SERVICE_ROLE_KEY no client-side!
 */

// Suporta NEXT_PUBLIC_SUPABASE_URL (preferido) ou SUPABASE_URL (fallback para scripts)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabaseAdminInstance: SupabaseClient | null = null

/**
 * Obtém a instância do cliente Supabase.
 * Retorna null se as variáveis de ambiente não estiverem configuradas.
 * @throws Error apenas quando tentar usar e as credenciais estiverem incorretas
 */
function getSupabaseAdmin(): SupabaseClient | null {
  if (supabaseAdminInstance) {
    return supabaseAdminInstance
  }

  if (!supabaseUrl || !serviceKey) {
    // Supabase não está configurado - retorna null sem erro
    return null
  }

  supabaseAdminInstance = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })

  return supabaseAdminInstance
}

/**
 * Cliente Supabase (opcional - null se não configurado)
 * Use getSupabaseAdmin() para obter a instância ou verificar se está disponível
 */
export const supabaseAdmin: SupabaseClient | null = getSupabaseAdmin()

/**
 * Função helper para verificar se Supabase está configurado
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && serviceKey)
}
