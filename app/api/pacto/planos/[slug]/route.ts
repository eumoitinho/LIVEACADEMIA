import { NextRequest, NextResponse } from 'next/server'
import { pactoNegociacaoAPI, resolveNegociacaoAuth } from '@/src/lib/api/pacto-negociacao'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { locations } from '@/src/lib/config/locations'
import { cacheManager } from '@/src/lib/utils/cache-manager'

// GET /api/pacto/planos/:slug
// Busca planos usando API de negociação com cache
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { searchParams } = req.nextUrl

  const codigoCliente = Number(searchParams.get('cliente') || searchParams.get('codigoCliente'))
  const contrato = searchParams.get('contrato') ? Number(searchParams.get('contrato')) : undefined
  const incluirBolsaParam = searchParams.get('incluirBolsa')
  const incluirBolsa = incluirBolsaParam ? incluirBolsaParam === 'true' : undefined
  const planoForcar = searchParams.get('planoForcar') ? Number(searchParams.get('planoForcar')) : undefined

  if (!codigoCliente || Number.isNaN(codigoCliente)) {
    const cacheKey = cacheKeys.planos(slug)
    const cached = cacheManager.get(cacheKey)
    if (cached) {
      console.log(`[Cache] Planos encontrados no cache para ${slug}`)
      return NextResponse.json({ planos: cached, fallback: false, source: 'cache' })
    }

    try {
      const planos = await pactoV2API.getPlanosUnidade(slug)
      cacheManager.set(cacheKey, planos, 30 * 60 * 1000)
      console.log(`[Cache] Planos armazenados no cache para ${slug}`)
      return NextResponse.json({ planos, fallback: false, source: 'api' })
    } catch (error: any) {
      console.error('[GET /api/pacto/planos V2 fallback]', error)

      const loc = locations.find(l => l.id === slug)
      if (loc?.planos?.length) {
        const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
        return NextResponse.json({ planos: staticPlanos, fallback: true, source: 'static', error: error.message })
      }
      return NextResponse.json({ planos: [], fallback: true, source: 'static', error: error.message })
    }
  }

  // Verificar cache primeiro (30 minutos)
  const cacheKey = `negociacao-planos:${slug}:${codigoCliente}:${contrato ?? '0'}:${planoForcar ?? '0'}:${incluirBolsa ?? 'default'}`
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Planos de negociação encontrados no cache para ${slug}`)
    return NextResponse.json({ planos: cached, fallback: false, source: 'cache' })
  }

  try {
    const { token, empresaId } = await resolveNegociacaoAuth(req.headers, slug)
    if (!token || !empresaId) {
      return NextResponse.json({ error: 'Token ou empresaId não configurados para negociação.' }, { status: 401 })
    }

    // Buscar planos usando API de negociação
    const planos = await pactoNegociacaoAPI.listarPlanos(token, empresaId, codigoCliente, contrato, incluirBolsa, planoForcar)

    // Armazenar no cache por 30 minutos
    cacheManager.set(cacheKey, planos, 30 * 60 * 1000)
    console.log(`[Cache] Planos de negociação armazenados no cache para ${slug}`)

    return NextResponse.json({ planos, fallback: false, source: 'api' })
  } catch (error: any) {
    console.error('[GET /api/pacto/planos Negociacao]', error)

    // Fallback estático em caso de erro
    const loc = locations.find(l => l.id === slug)
    if (loc?.planos?.length) {
      const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
      return NextResponse.json({ planos: staticPlanos, fallback: true, source: 'static', error: error.message })
    }

    return NextResponse.json({ error: 'Falha ao obter planos' }, { status: 500 })
  }
}
