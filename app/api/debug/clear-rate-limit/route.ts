import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/debug/clear-rate-limit
// Limpa o rate limiting (apenas em desenvolvimento)
export async function POST(req: NextRequest) {
  // Verificar se está em desenvolvimento
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ 
      error: 'Este endpoint só está disponível em desenvolvimento' 
    }, { status: 403 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const ip = searchParams.get('ip')

    if (ip) {
      // Limpar rate limit para IP específico
      rateLimiter.clear(ip)
      return NextResponse.json({ 
        success: true,
        message: `Rate limit limpo para IP: ${ip}` 
      })
    } else {
      // Limpar todos os rate limits
      rateLimiter.clearAll()
      return NextResponse.json({ 
        success: true,
        message: 'Todos os rate limits foram limpos' 
      })
    }
  } catch (error: any) {
    console.error('[POST /api/debug/clear-rate-limit]', error)
    return NextResponse.json({ 
      error: 'Falha ao limpar rate limit',
      details: error.message 
    }, { status: 500 })
  }
}

// GET /api/debug/clear-rate-limit
// Mostra informações sobre rate limits ativos
export async function GET(req: NextRequest) {
  // Verificar se está em desenvolvimento
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ 
      error: 'Este endpoint só está disponível em desenvolvimento' 
    }, { status: 403 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const ip = searchParams.get('ip')

    if (ip) {
      // Mostrar info para IP específico
      const info = rateLimiter.getInfo(ip)
      return NextResponse.json({ 
        ip,
        rateLimitInfo: info,
        message: `Informações de rate limit para IP: ${ip}` 
      })
    } else {
      // Mostrar info geral
      const allInfo = rateLimiter.getAllInfo()
      return NextResponse.json({ 
        activeRateLimits: allInfo,
        message: 'Informações de todos os rate limits ativos' 
      })
    }
  } catch (error: any) {
    console.error('[GET /api/debug/clear-rate-limit]', error)
    return NextResponse.json({ 
      error: 'Falha ao obter informações de rate limit',
      details: error.message 
    }, { status: 500 })
  }
}
