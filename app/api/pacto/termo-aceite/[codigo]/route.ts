import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

// GET /api/pacto/termo-aceite/[codigo]
// Busca um termo de aceite específico por código
export async function GET(req: NextRequest, { params }: { params: Promise<{ codigo: string }> }) {
  const { codigo } = await params
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Parâmetro slug é obrigatório' }, { status: 400 })
  }

  if (!codigo || isNaN(Number(codigo))) {
    return NextResponse.json({ error: 'Código do termo inválido' }, { status: 400 })
  }

  // Rate limiting: 15 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 15, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many requests for termo específico.', 
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
  const cacheKey = cacheKeys.termoEspecifico(slug, codigo)
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Termo ${codigo} encontrado no cache para ${slug}`)
    return NextResponse.json({ termo: cached, source: 'cache' })
  }

  try {
    const termo = await pactoV2API.getTermoAceitePorCodigo(slug, Number(codigo))

    // Armazenar no cache por 60 minutos
    cacheManager.set(cacheKey, termo, 60 * 60 * 1000)
    console.log(`[Cache] Termo ${codigo} armazenado no cache para ${slug}`)

    return NextResponse.json({ termo, source: 'api' })
  } catch (error: any) {
    console.error('[GET /api/pacto/termo-aceite/[codigo]]', error)
    
    if (error.message.includes('404') || error.message.includes('Not Found')) {
      return NextResponse.json({ 
        error: 'Termo de aceite não encontrado',
        codigo: codigo 
      }, { status: 404 })
    }
    
    return NextResponse.json({ 
      error: 'Falha ao obter termo de aceite',
      details: error.message 
    }, { status: 500 })
  }
}
