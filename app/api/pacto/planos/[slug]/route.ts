import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { locations } from '@/lib/config/locations'
import { getUnitBySlug } from '@/src/lib/api/supabase-repository'

// GET /api/pacto/planos/:slug
// Busca planos usando API V2 da Pacto
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    // Busca unidade do Supabase
    const unit = await getUnitBySlug(slug)

    if (!unit) {
      // Fallback estático se não encontrar no banco
      const loc = locations.find(l => l.id === slug)
      if (loc?.planos?.length) {
        const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
        return NextResponse.json({ planos: staticPlanos, fallback: true, source: 'static' })
      }
      return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
    }

         // Buscar planos usando API V2
         const planos = await pactoV2API.getPlanosUnidade(slug, unit.codigo_unidade)

    return NextResponse.json({ planos, fallback: false })
  } catch (error: any) {
    console.error('[GET /api/pacto/planos V2]', error)

    // Fallback estático em caso de erro
    const loc = locations.find(l => l.id === slug)
    if (loc?.planos?.length) {
      const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
      return NextResponse.json({ planos: staticPlanos, fallback: true, source: 'static', error: error.message })
    }

    return NextResponse.json({ error: 'Falha ao obter planos' }, { status: 500 })
  }
}
