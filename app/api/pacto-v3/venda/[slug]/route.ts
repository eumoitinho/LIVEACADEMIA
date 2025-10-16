import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/pacto-v3/venda/:slug
// Processa venda usando API V3 da Pacto
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Rate limiting: 10 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 10, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many payment attempts.', 
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
    const { dadosVenda, token } = body

    if (!dadosVenda || !token) {
      return NextResponse.json({ 
        error: 'Dados obrigatórios: dadosVenda e token' 
      }, { status: 400 })
    }

    // Primeiro gerar token se não fornecido
    let vendaToken = token
    if (!vendaToken) {
      const tokenResponse = await pactoV3API.gerarToken(slug, clientIP)
      vendaToken = tokenResponse.retorno.token
    }

    // Processar venda usando API V3
    const resultado = await pactoV3API.cadastrarVenda(slug, dadosVenda, vendaToken)

    return NextResponse.json({ resultado, source: 'api' })
  } catch (error: any) {
    console.error('[POST /api/pacto-v3/venda V3]', error)

    return NextResponse.json({ 
      error: 'Falha ao processar venda',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}
