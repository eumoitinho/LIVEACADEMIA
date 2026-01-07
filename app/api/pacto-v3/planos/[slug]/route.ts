import { NextRequest, NextResponse } from 'next/server'
import { pactoNegociacaoAPI, resolveNegociacaoAuth } from '@/src/lib/api/pacto-negociacao'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'
import { locations } from '@/src/lib/config/locations'

// Função helper para adicionar cabeçalhos CORS
function getCorsHeaders(origin?: string | null) {
  const allowedOrigins = [
    'https://liveacademia.sanity.studio',
    'https://admin.sanity.io',
    'https://www.sanity.io',
    'http://localhost:3000',
    'http://localhost:3333',
  ]

  // Verificar se a origem está na lista de permitidas
  // Aceita qualquer domínio .sanity.studio ou admin.sanity.io
  const isAllowed = origin && (
    origin.includes('sanity.studio') ||
    origin.includes('admin.sanity.io') ||
    origin.includes('www.sanity.io') ||
    origin.includes('localhost:3000') ||
    origin.includes('localhost:3333') ||
    origin.includes('localhost:3001')
  )

  // Retornar a origem exata da requisição se permitida
  // Isso é crítico para CORS funcionar corretamente
  const corsOrigin = isAllowed ? origin : (allowedOrigins.includes(origin || '') ? origin : allowedOrigins[0])

  return {
    'Access-Control-Allow-Origin': corsOrigin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'true',
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin')
  return NextResponse.json({}, { headers: getCorsHeaders(origin) })
}

// GET /api/pacto-v3/planos/:slug
// Busca planos usando API de negociação com cache
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const origin = req.headers.get('origin')
  const corsHeaders = getCorsHeaders(origin)
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
      return NextResponse.json(
        { planos: cached, fallback: false, source: 'cache' },
        { headers: corsHeaders }
      )
    }

    try {
      const planos = await pactoV2API.getPlanosUnidade(slug)
      cacheManager.set(cacheKey, planos, 30 * 60 * 1000)
      console.log(`[Cache] Planos armazenados no cache para ${slug}`)
      return NextResponse.json(
        { planos, fallback: false, source: 'api' },
        { headers: corsHeaders }
      )
    } catch (error: any) {
      console.error('[GET /api/pacto-v3/planos V2 fallback]', error)

      const loc = locations.find(l => l.id === slug)
      if (loc?.planos?.length) {
        const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
        return NextResponse.json(
          { planos: staticPlanos, fallback: true, source: 'static', error: error.message },
          { status: 200, headers: corsHeaders }
        )
      }

      return NextResponse.json(
        { planos: [], fallback: true, source: 'static', error: error.message },
        { status: 200, headers: corsHeaders }
      )
    }
  }

  // Verificar cache primeiro (30 minutos)
  const cacheKey = `negociacao-planos:${slug}:${codigoCliente}:${contrato ?? '0'}:${planoForcar ?? '0'}:${incluirBolsa ?? 'default'}`
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Planos de negociação encontrados no cache para ${slug}`)
    return NextResponse.json(
      { planos: cached, fallback: false, source: 'cache' },
      { headers: corsHeaders }
    )
  }

  try {
    const { token, empresaId } = await resolveNegociacaoAuth(req.headers, slug)
    if (!token || !empresaId) {
      return NextResponse.json({ error: 'Token ou empresaId não configurados para negociação.' }, { status: 401, headers: corsHeaders })
    }

    const planos = await pactoNegociacaoAPI.listarPlanos(token, empresaId, codigoCliente, contrato, incluirBolsa, planoForcar)

    // Armazenar no cache por 30 minutos
    cacheManager.set(cacheKey, planos, 30 * 60 * 1000)
    console.log(`[Cache] Planos de negociação armazenados no cache para ${slug}`)

    return NextResponse.json(
      { planos, fallback: false, source: 'api' },
      { headers: corsHeaders }
    )
  } catch (error: any) {
    console.error('[GET /api/pacto-v3/planos Negociacao]', error)

    return NextResponse.json(
      { 
        error: 'Falha ao obter planos',
        message: error.message,
      },
      { status: 500, headers: corsHeaders }
    )
  }
}
