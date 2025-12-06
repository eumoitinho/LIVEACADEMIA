import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { locations } from '@/src/lib/config/locations'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

// GET /api/pacto/planos/:slug
// Busca planos usando API V2 da Pacto com cache
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Verificar cache primeiro (30 minutos)
  const cacheKey = cacheKeys.planos(slug)
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Planos encontrados no cache para ${slug}`)
    return NextResponse.json({ planos: cached, fallback: false, source: 'cache' })
  }

  try {
    // Verificar se a unidade existe no arquivo de locations
    const loc = locations.find(l => l.id === slug)
    if (!loc) {
      return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
    }

          // Buscar planos usando API V2 (codigoUnidade é sempre 1)
          const planos = await pactoV2API.getPlanosUnidade(slug)

    // Armazenar no cache por 30 minutos
    cacheManager.set(cacheKey, planos, 30 * 60 * 1000)
    console.log(`[Cache] Planos armazenados no cache para ${slug}`)

    return NextResponse.json({ planos, fallback: false, source: 'api' })
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
