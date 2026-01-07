import { NextRequest, NextResponse } from 'next/server'
import { pactoNegociacaoAPI, resolveNegociacaoAuth, ConfigsContratoDTO } from '@/src/lib/api/pacto-negociacao'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager } from '@/src/lib/utils/cache-manager'

// POST /api/pacto/simular
// Body: ConfigsContratoDTO ou { config: ConfigsContratoDTO }
export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const config = (body?.config || body?.configsContrato || body?.negociacao || body) as ConfigsContratoDTO
  if (!config || !config.cliente) {
    return NextResponse.json({
      error: 'config com dados de negociação é obrigatório'
    }, { status: 400 })
  }

  // Rate limiting para simulações: 20 requisições por 15 minutos
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

  const { token, empresaId } = await resolveNegociacaoAuth(req.headers)
  if (!token || !empresaId) {
    return NextResponse.json({ error: 'Token ou empresaId não configurados para negociação.' }, { status: 401 })
  }

  const empresaNumero = Number(empresaId)
  if (!config.empresa && !Number.isNaN(empresaNumero)) {
    config.empresa = empresaNumero
  }

  // Criar hash dos dados para cache (evitar simulações idênticas)
  const simulationHash = Buffer.from(JSON.stringify({ empresaId, config })).toString('base64')
  const cacheKey = `negociacao-simulacao:${empresaId}:${simulationHash}`
  
  // Verificar cache (5 minutos para simulações)
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Simulação de negociação encontrada no cache`)
    return NextResponse.json({ success: true, data: cached, source: 'cache' })
  }

  try {
    console.log(`[Simular Negociacao] Processando simulação para empresa ${empresaId}`)

    // Simular negociação usando API
    const simulacao = await pactoNegociacaoAPI.simularNegociacao(token, empresaId, config)

    // Armazenar no cache por 5 minutos
    cacheManager.set(cacheKey, simulacao, 5 * 60 * 1000)
    console.log(`[Cache] Simulação de negociação armazenada no cache`)

    return NextResponse.json({
      success: true,
      data: simulacao,
      source: 'api'
    })
  } catch (error: any) {
    console.error('[POST /api/pacto/simular Negociacao]', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Falha na simulação'
    }, { status: 500 })
  }
}
