import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Tipagem básica do que retornaremos
interface UnitRecord {
  id: string
  slug: string
  nome: string | null
  endereco: string | null
  imagens: string[] | null
  latitude: string | null
  longitude: string | null
  cidade: string | null
  estado: string | null
}

function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase env vars ausentes: configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_ANON_KEY ou SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}

export async function GET() {
  try {
    const supabase = getSupabaseServer()
    const { data, error } = await supabase
      .from('units')
      .select('id, slug, nome, endereco, imagens, latitude, longitude, cidade, estado')
      .order('nome', { ascending: true })

    if (error) {
      console.error('[API /unidades] erro select', error)
      return NextResponse.json({ error: 'Falha ao carregar unidades' }, { status: 500 })
    }

    const units = (data || []).map((u: UnitRecord) => {
      const lat = u.latitude ? parseFloat(u.latitude) : null
      const lon = u.longitude ? parseFloat(u.longitude) : null
      return {
        id: u.id,
        slug: u.slug,
        nome: u.nome || u.slug,
        endereco: u.endereco || '',
        imagem: Array.isArray(u.imagens) && u.imagens.length > 0 ? u.imagens[0] : '/placeholder.jpg',
        latitude: isFinite(lat as number) ? lat : null,
        longitude: isFinite(lon as number) ? lon : null,
        cidade: u.cidade,
        estado: u.estado,
      }
    })

    return NextResponse.json({ units })
  } catch (e) {
    console.error('[API /unidades] exceção', e)
    return NextResponse.json({ error: 'Erro interno ao obter unidades' }, { status: 500 })
  }
}
