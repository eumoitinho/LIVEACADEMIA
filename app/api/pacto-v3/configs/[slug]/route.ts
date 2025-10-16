import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

// GET /api/pacto-v3/configs/:slug
// Busca configurações usando API V3 da Pacto com cache e rate limiting
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Rate limiting: 30 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 30, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many requests for configs.', 
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
  const cacheKey = `pacto-v3-configs-${slug}`
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Configurações encontradas no cache para ${slug}`)
    return NextResponse.json({ configs: cached, fallback: false, source: 'cache' })
  }

  try {
    // Buscar configurações usando API V3
    const configs = await pactoV3API.getConfigs(slug)

    // Armazenar no cache por 60 minutos
    cacheManager.set(cacheKey, configs, 60 * 60 * 1000)
    console.log(`[Cache] Configurações armazenadas no cache para ${slug}`)

    return NextResponse.json({ configs, fallback: false, source: 'api' })
  } catch (error: any) {
    console.error('[GET /api/pacto-v3/configs V3]', error)

    return NextResponse.json({ 
      error: 'Falha ao obter configurações',
      fallback: true, 
      source: 'error'
    }, { status: 500 })
  }
}
