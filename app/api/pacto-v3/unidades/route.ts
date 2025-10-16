import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

// GET /api/pacto-v3/unidades
// Busca todas as unidades usando API V3 da Pacto com cache e rate limiting
export async function GET(req: NextRequest) {
  // Rate limiting: 20 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 20, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many requests for unidades.', 
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

  // Verificar cache primeiro (60 minutos)
  const cacheKey = 'pacto-v3-unidades'
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Unidades encontradas no cache`)
    return NextResponse.json({ unidades: cached, fallback: false, source: 'cache' })
  }

  try {
    // Buscar unidades usando API V3 (qualquer chave retorna todas)
    const unidades = await pactoV3API.getUnidades('torres')

    // Armazenar no cache por 60 minutos
    cacheManager.set(cacheKey, unidades, 60 * 60 * 1000)
    console.log(`[Cache] ${unidades.length} unidades armazenadas no cache`)

    return NextResponse.json({ unidades, fallback: false, source: 'api' })
  } catch (error: any) {
    console.error('[GET /api/pacto-v3/unidades V3]', error)

    return NextResponse.json({ 
      error: 'Falha ao obter unidades',
      fallback: true, 
      source: 'error'
    }, { status: 500 })
  }
}
