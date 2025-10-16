import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

// GET /api/pacto/termo-aceite
// Busca todos os termos de aceite disponíveis para uma unidade
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Parâmetro slug é obrigatório' }, { status: 400 })
  }

  // Rate limiting: 10 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 10, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many requests for termos.', 
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
  const cacheKey = cacheKeys.termos(slug)
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Termos de aceite encontrados no cache para ${slug}`)
    return NextResponse.json({ termos: cached, source: 'cache' })
  }

  try {
    const termos = await pactoV2API.getTermosAceite(slug)

    // Armazenar no cache por 60 minutos
    cacheManager.set(cacheKey, termos, 60 * 60 * 1000)
    console.log(`[Cache] Termos de aceite armazenados no cache para ${slug}`)

    return NextResponse.json({ termos, source: 'api' })
  } catch (error: any) {
    console.error('[GET /api/pacto/termo-aceite]', error)
    return NextResponse.json({ 
      error: 'Falha ao obter termos de aceite',
      details: error.message 
    }, { status: 500 })
  }
}

// POST /api/pacto/termo-aceite
// Salva um novo termo de aceite (admin)
export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { slug, termo } = body || {}
  if (!slug || !termo) {
    return NextResponse.json({
      error: 'Campos obrigatórios: slug, termo'
    }, { status: 400 })
  }

  // Rate limiting mais restritivo para criação: 3 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 3, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many term creation attempts.', 
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

  try {
    // Nota: Este endpoint seria para criar termos (admin), mas a API Pacto pode não suportar
    // Por enquanto, retornamos erro indicando que não é suportado
    return NextResponse.json({ 
      error: 'Criação de termos via API não é suportada',
      message: 'Use o painel administrativo do Pacto para criar termos'
    }, { status: 501 })
  } catch (error: any) {
    console.error('[POST /api/pacto/termo-aceite]', error)
    return NextResponse.json({ 
      error: 'Falha ao criar termo de aceite',
      details: error.message 
    }, { status: 500 })
  }
}
