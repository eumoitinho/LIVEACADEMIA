import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/pacto-v3/simular/:slug/:plano
// Simula venda de plano usando API V3 da Pacto
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string; plano: string }> }) {
  const { slug, plano } = await params

  // Rate limiting: 20 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 20, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many simulation requests.', 
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
    const planoNumero = parseInt(plano)
    if (isNaN(planoNumero)) {
      return NextResponse.json({ error: 'Código do plano inválido' }, { status: 400 })
    }

    // Simular venda usando API V3
    const simulacao = await pactoV3API.simularVenda(slug, planoNumero)

    return NextResponse.json({ simulacao, source: 'api' })
  } catch (error: any) {
    console.error('[POST /api/pacto-v3/simular V3]', error)

    return NextResponse.json({ 
      error: 'Falha ao simular venda',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}
