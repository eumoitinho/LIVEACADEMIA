import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/pacto-v3/cupom/:slug
// Valida cupom de desconto usando API V3 da Pacto
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Rate limiting: 15 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 15, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many coupon validation requests.', 
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
    const body = await req.json()
    const { cupom, plano, valor } = body

    if (!cupom || !plano || !valor) {
      return NextResponse.json({ 
        error: 'Dados obrigatórios: cupom, plano e valor' 
      }, { status: 400 })
    }

    // Validar cupom usando API V3
    const resultado = await pactoV3API.validarCupom(slug, cupom, { plano, valor })

    return NextResponse.json({ resultado, source: 'api' })
  } catch (error: any) {
    console.error('[POST /api/pacto-v3/cupom V3]', error)

    return NextResponse.json({ 
      error: 'Falha ao validar cupom',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}
