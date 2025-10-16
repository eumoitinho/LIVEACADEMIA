import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/pacto/termo-aceite/assinatura
// Salva a assinatura de um termo de aceite
export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { slug, codigoMatricula, codigoTermo, assinatura } = body || {}
  
  if (!slug || !codigoMatricula || !codigoTermo || !assinatura) {
    return NextResponse.json({
      error: 'Campos obrigatórios: slug, codigoMatricula, codigoTermo, assinatura'
    }, { status: 400 })
  }

  // Validar tipos
  if (typeof codigoMatricula !== 'number' || typeof codigoTermo !== 'number') {
    return NextResponse.json({
      error: 'codigoMatricula e codigoTermo devem ser números'
    }, { status: 400 })
  }

  // Rate limiting restritivo para assinaturas: 5 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 5, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many signature attempts.', 
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
    const userAgent = req.headers.get('user-agent') || 'Unknown'
    
    const resultado = await pactoV2API.salvarAssinaturaTermo(
      slug,
      codigoMatricula,
      codigoTermo,
      assinatura,
      clientIP,
      userAgent
    )

    return NextResponse.json({ 
      success: true,
      assinatura: resultado,
      message: 'Assinatura salva com sucesso'
    })
  } catch (error: any) {
    console.error('[POST /api/pacto/termo-aceite/assinatura]', error)
    
    if (error.message.includes('404') || error.message.includes('Not Found')) {
      return NextResponse.json({ 
        success: false,
        error: 'Termo de aceite ou matrícula não encontrados'
      }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: false,
      error: 'Falha ao salvar assinatura',
      details: error.message 
    }, { status: 500 })
  }
}
