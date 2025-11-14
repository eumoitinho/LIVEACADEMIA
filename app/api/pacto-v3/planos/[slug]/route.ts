import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

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
// Busca planos usando API V2 da Pacto com cache e rate limiting
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const origin = req.headers.get('origin')
  const corsHeaders = getCorsHeaders(origin)

  // Rate limiting: 50 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 50, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many requests for planos.', 
        rateLimitInfo: {
          limit: info.limit,
          remaining: info.remaining,
          resetTime: info.resetTime
        }
      }, 
      { 
        status: 429,
        headers: {
          ...corsHeaders,
          'X-RateLimit-Limit': info.limit.toString(),
          'X-RateLimit-Remaining': info.remaining.toString(),
          'X-RateLimit-Reset': Math.ceil(info.resetTime / 1000).toString()
        }
      }
    )
  }

  // Verificar cache primeiro (30 minutos)
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
    // Buscar planos usando API V2
    const planos = await pactoV2API.getPlanosUnidade(slug)

    // Armazenar no cache por 30 minutos
    cacheManager.set(cacheKey, planos, 30 * 60 * 1000)
    console.log(`[Cache] Planos armazenados no cache para ${slug}`)

    return NextResponse.json(
      { planos, fallback: false, source: 'api' },
      { headers: corsHeaders }
    )
  } catch (error: any) {
    console.error('[GET /api/pacto-v3/planos V2]', error)

    // Fallback estático em caso de erro
    const fallbackPlanos = [
      { codigo: 1, nome: "Plano Básico", mensalidade: 99.90, adesao: 0, fidelidade: 12 },
      { codigo: 2, nome: "Plano Premium", mensalidade: 149.90, adesao: 0, fidelidade: 12 }
    ]

    return NextResponse.json(
      { 
        planos: fallbackPlanos, 
        fallback: true, 
        source: 'static', 
        error: error.message 
      },
      { headers: corsHeaders }
    )
  }
}
