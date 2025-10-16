import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API, formatVendaData } from '@/src/lib/api/pacto-v2'
import { getUnitBySlug } from '@/src/lib/api/supabase-repository'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'

// POST /api/pacto/simular
// Body: { slug: string; planoId: string; cliente: PactoCliente; paymentMethod: string; cartao?: PactoCartao }
export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { slug, planoId, cliente, paymentMethod, cartao } = body || {}
  if (!slug || !planoId || !cliente || !paymentMethod) {
    return NextResponse.json({
      error: 'slug, planoId, cliente e paymentMethod são obrigatórios'
    }, { status: 400 })
  }

  // Rate limiting mais restritivo para simulações: 5 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 5, 15 * 60 * 1000)) {
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

  // Criar hash dos dados para cache (evitar simulações idênticas)
  const simulationHash = Buffer.from(JSON.stringify({ slug, planoId, cliente, paymentMethod })).toString('base64')
  const cacheKey = cacheKeys.simulacao(slug, planoId, simulationHash)
  
  // Verificar cache (5 minutos para simulações)
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Simulação encontrada no cache para ${slug}/${planoId}`)
    return NextResponse.json({ success: true, data: cached, source: 'cache' })
  }

  try {
    console.log(`[Simular V2] Processando simulação para unidade: ${slug}`)
    
    // Registrar acesso para anti-fraude
    const clientIP = pactoV2API.getClientIP(req)
    await pactoV2API.registrarInicioAcesso(slug, 1, parseInt(planoId), clientIP) // codigo_unidade padrão

    // Preparar dados para simulação V2
    const dadosVenda = formatVendaData(
      slug, // Usar slug como codigo_rede
      cliente,
      cartao || null,
      1, // codigo_unidade padrão
      parseInt(planoId),
      paymentMethod,
      clientIP
    )

    // Simular venda usando API V2
    const simulacao = await pactoV2API.simularVenda(slug, 1, dadosVenda) // codigo_unidade padrão

    // Armazenar no cache por 5 minutos
    cacheManager.set(cacheKey, simulacao, 5 * 60 * 1000)
    console.log(`[Cache] Simulação armazenada no cache para ${slug}/${planoId}`)

    return NextResponse.json({
      success: true,
      data: simulacao,
      source: 'api'
    })
  } catch (error: any) {
    console.error('[POST /api/pacto/simular V2]', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Falha na simulação'
    }, { status: 500 })
  }
}
