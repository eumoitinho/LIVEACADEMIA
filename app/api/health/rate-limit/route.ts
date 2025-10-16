import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager } from '@/src/lib/utils/cache-manager'

/**
 * Health check para rate limiting e cache
 * GET /api/health/rate-limit
 */
export async function GET(req: NextRequest) {
  try {
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
    
    // Informações do rate limit para este IP
    const rateLimitInfo = rateLimiter.getInfo(clientIP)
    
    // Estatísticas do cache
    const cacheStats = cacheManager.getStats()
    
    // Testar rate limit (sem contar como requisição)
    const canMakeRequest = rateLimiter.check(clientIP, 10, 15 * 60 * 1000)
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      clientIP,
      rateLimit: {
        current: rateLimitInfo,
        canMakeRequest,
        description: '10 requests per 15 minutes'
      },
      cache: {
        size: cacheStats.size,
        entries: cacheStats.entries.length,
        expired: cacheStats.entries.filter(e => e.expired).length,
        active: cacheStats.entries.filter(e => !e.expired).length
      },
      recommendations: {
        planos: {
          limit: '15 requests per 15 minutes',
          cache: '30 minutes',
          description: 'Plans are cached for 30 minutes to reduce API calls'
        },
        simulacao: {
          limit: '5 requests per 15 minutes',
          cache: '5 minutes',
          debounce: '2 seconds',
          description: 'Simulations are cached and debounced to prevent abuse'
        },
        venda: {
          limit: '3 requests per 15 minutes',
          description: 'Very restrictive to prevent payment abuse'
        }
      }
    })
  } catch (error: any) {
    console.error('[GET /api/health/rate-limit]', error)
    return NextResponse.json({
      status: 'error',
      error: error.message
    }, { status: 500 })
  }
}
