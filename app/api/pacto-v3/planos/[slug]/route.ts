import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

// GET /api/pacto-v3/planos/:slug
// Busca planos usando API V3 da Pacto com cache e rate limiting
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

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
    return NextResponse.json({ planos: cached, fallback: false, source: 'cache' })
  }

  try {
    // Buscar planos usando API V3
    const planos = await pactoV3API.getPlanos(slug)

    // Armazenar no cache por 30 minutos
    cacheManager.set(cacheKey, planos, 30 * 60 * 1000)
    console.log(`[Cache] Planos armazenados no cache para ${slug}`)

    return NextResponse.json({ planos, fallback: false, source: 'api' })
  } catch (error: any) {
    console.error('[GET /api/pacto-v3/planos V3]', error)

    // Fallback estático em caso de erro
    const fallbackPlanos = [
      { codigo: 1, nome: "Plano Básico", mensalidade: 99.90, adesao: 0, fidelidade: 12 },
      { codigo: 2, nome: "Plano Premium", mensalidade: 149.90, adesao: 0, fidelidade: 12 }
    ]

    return NextResponse.json({ 
      planos: fallbackPlanos, 
      fallback: true, 
      source: 'static', 
      error: error.message 
    })
  }
}
