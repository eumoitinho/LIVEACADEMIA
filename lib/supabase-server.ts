import { createClient } from '@supabase/supabase-js'

// Preferir NEXT_PUBLIC_SUPABASE_URL para consistência com frontend, mas aceitar SUPABASE_URL como fallback para scripts
const supabaseUrl = "https://sgntnwnngdskwyuywksk.supabase.co";
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbnRud25uZ2Rza3d5dXl3a3NrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODM5MzU2MSwiZXhwIjoyMDczOTY5NTYxfQ.LTNaSFG2p1QaXGhF66TUzBZFS0G8IcimY5U0dkBqgpM"

if (!supabaseUrl || !serviceKey) {
  throw new Error('Supabase env vars missing: defina NEXT_PUBLIC_SUPABASE_URL (ou SUPABASE_URL) e SUPABASE_SERVICE_ROLE_KEY')
}

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
})
