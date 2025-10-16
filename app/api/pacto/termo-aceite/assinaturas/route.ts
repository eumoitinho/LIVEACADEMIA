import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

// GET /api/pacto/termo-aceite/assinaturas
// Busca assinaturas de termos de aceite
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  const codigoMatricula = searchParams.get('codigoMatricula')

  if (!slug) {
    return NextResponse.json({ error: 'Parâmetro slug é obrigatório' }, { status: 400 })
  }

  // Rate limiting: 10 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 10, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many requests for assinaturas.', 
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
  const cacheKey = codigoMatricula 
    ? cacheKeys.assinaturasMatricula(slug, codigoMatricula)
    : cacheKeys.assinaturas(slug)
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Assinaturas encontradas no cache para ${slug}${codigoMatricula ? `/${codigoMatricula}` : ''}`)
    return NextResponse.json({ assinaturas: cached, source: 'cache' })
  }

  try {
    const matriculaNumber = codigoMatricula ? Number(codigoMatricula) : undefined
    
    if (codigoMatricula && isNaN(matriculaNumber!)) {
      return NextResponse.json({ 
        error: 'Código de matrícula inválido' 
      }, { status: 400 })
    }

    const assinaturas = await pactoV2API.getAssinaturasTermos(slug, matriculaNumber)

    // Armazenar no cache por 30 minutos
    cacheManager.set(cacheKey, assinaturas, 30 * 60 * 1000)
    console.log(`[Cache] Assinaturas armazenadas no cache para ${slug}${codigoMatricula ? `/${codigoMatricula}` : ''}`)

    return NextResponse.json({ 
      assinaturas, 
      source: 'api',
      filtro: codigoMatricula ? `Matrícula ${codigoMatricula}` : 'Todas'
    })
  } catch (error: any) {
    console.error('[GET /api/pacto/termo-aceite/assinaturas]', error)
    
    if (error.message.includes('404') || error.message.includes('Not Found')) {
      return NextResponse.json({ 
        assinaturas: [],
        message: 'Nenhuma assinatura encontrada',
        filtro: codigoMatricula ? `Matrícula ${codigoMatricula}` : 'Todas'
      })
    }
    
    return NextResponse.json({ 
      error: 'Falha ao obter assinaturas',
      details: error.message 
    }, { status: 500 })
  }
}
