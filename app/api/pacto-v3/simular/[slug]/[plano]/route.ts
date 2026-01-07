import { NextRequest, NextResponse } from 'next/server'
import { pactoNegociacaoAPI, resolveNegociacaoAuth, ConfigsContratoDTO } from '@/src/lib/api/pacto-negociacao'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/pacto-v3/simular/:slug/:plano
// Simula negociação de plano usando API de negociação
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
    const body = await req.json().catch(() => null)
    const config = (body?.config || body?.configsContrato || body?.negociacao || body) as ConfigsContratoDTO

    if (!config || !config.cliente) {
      return NextResponse.json({ error: 'Payload inválido. Envie config com cliente e dados da negociação.' }, { status: 400 })
    }

    if (!config.plano && plano) {
      const planoNumero = parseInt(plano)
      if (!Number.isNaN(planoNumero)) {
        config.plano = planoNumero
      }
    }

    const { token, empresaId } = await resolveNegociacaoAuth(req.headers, slug)
    if (!token || !empresaId) {
      return NextResponse.json({ error: 'Token ou empresaId não configurados para negociação.' }, { status: 401 })
    }

    const empresaNumero = Number(empresaId)
    if (!config.empresa && !Number.isNaN(empresaNumero)) {
      config.empresa = empresaNumero
    }

    // Simular negociação
    const simulacao = await pactoNegociacaoAPI.simularNegociacao(token, empresaId, config)

    return NextResponse.json({ success: true, data: simulacao, source: 'negociacao' })
  } catch (error: any) {
    console.error('[POST /api/pacto-v3/simular Negociacao]', error)

    return NextResponse.json({ 
      error: 'Falha ao simular negociação',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}
