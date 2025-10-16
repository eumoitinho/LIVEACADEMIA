import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { locations } from '@/lib/config/locations'
import { getUnitBySlug } from '@/src/lib/api/supabase-repository'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

// GET /api/pacto/planos/:slug
// Busca planos usando API V2 da Pacto com cache e rate limiting
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Rate limiting: 15 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 15, 15 * 60 * 1000)) {
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
    // Verificar se a unidade existe no arquivo de locations
    const loc = locations.find(l => l.id === slug)
    if (!loc) {
      return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
    }

    // Buscar planos usando API V2 (usa slug diretamente)
    const planos = await pactoV2API.getPlanosUnidade(slug, 1) // codigo_unidade padrão

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
