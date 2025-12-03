/**
 * Rate Limiter para proteger APIs contra abuso
 * Implementa controle de requisições por IP com janela deslizante
 */

interface RateLimitEntry {
  count: number
  resetTime: number
  requests: number[] // Timestamps das requisições
}

class RateLimiter {
  private limits = new Map<string, RateLimitEntry>()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Limpar entradas expiradas a cada 5 minutos
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }

  /**
   * Verifica se um IP pode fazer uma requisição
   * @param ip - Endereço IP do cliente
   * @param limit - Número máximo de requisições (padrão: 150)
   * @param windowMs - Janela de tempo em ms (padrão: 15 minutos)
   * @returns true se permitido, false se bloqueado
   */
  check(ip: string, limit: number = 150, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now()
    const entry = this.limits.get(ip)

    if (!entry) {
      // Primeira requisição
      this.limits.set(ip, {
        count: 1,
        resetTime: now + windowMs,
        requests: [now]
      })
      return true
    }

    // Limpar requisições antigas (fora da janela)
    const cutoff = now - windowMs
    entry.requests = entry.requests.filter(timestamp => timestamp > cutoff)
    
    if (entry.requests.length >= limit) {
      // Rate limit excedido
      return false
    }

    // Adicionar nova requisição
    entry.requests.push(now)
    entry.count = entry.requests.length
    entry.resetTime = now + windowMs

    return true
  }

  /**
   * Obtém informações sobre o rate limit de um IP
   */
  getInfo(ip: string): { count: number; limit: number; resetTime: number; remaining: number } {
    const entry = this.limits.get(ip)
    if (!entry) {
      return { count: 0, limit: 10, resetTime: Date.now() + (15 * 60 * 1000), remaining: 10 }
    }

    return {
      count: entry.count,
      limit: 10,
      resetTime: entry.resetTime,
      remaining: Math.max(0, 10 - entry.count)
    }
  }

  /**
   * Limpa entradas expiradas
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [ip, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(ip)
      }
    }
  }

  /**
   * Limpar rate limit para um IP específico
   */
  clear(ip: string): void {
    this.limits.delete(ip)
    console.log(`[RateLimiter] Rate limit limpo para IP: ${ip}`)
  }

  /**
   * Limpar todos os rate limits
   */
  clearAll(): void {
    this.limits.clear()
    console.log('[RateLimiter] Todos os rate limits foram limpos')
  }

  /**
   * Obter informações de todos os rate limits ativos
   */
  getAllInfo(): Record<string, { count: number; limit: number; resetTime: number; remaining: number }> {
    const allInfo: Record<string, { count: number; limit: number; resetTime: number; remaining: number }> = {}
    
    for (const [ip, entry] of this.limits.entries()) {
      const limit = 10 // Limite padrão
      const remaining = Math.max(0, limit - entry.count)
      allInfo[ip] = { 
        count: entry.count, 
        limit, 
        resetTime: entry.resetTime, 
        remaining 
      }
    }
    
    return allInfo
  }


  /**
   * Destroi o rate limiter e limpa recursos
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.clearAll()
  }
}

// Instância singleton
export const rateLimiter = new RateLimiter()

/**
 * Middleware de rate limiting para Next.js API routes
 */
export function withRateLimit(
  limit: number = 10,
  windowMs: number = 15 * 60 * 1000,
  message: string = 'Rate limit exceeded. Try again later.'
) {
  return function rateLimitMiddleware(handler: Function) {
    return async function rateLimitedHandler(req: any, ...args: any[]) {
      const ip = getClientIP(req)
      
      if (!rateLimiter.check(ip, limit, windowMs)) {
        const info = rateLimiter.getInfo(ip)
        return new Response(
          JSON.stringify({
            error: message,
            rateLimitInfo: {
              limit: info.limit,
              count: info.count,
              remaining: info.remaining,
              resetTime: info.resetTime
            }
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': info.limit.toString(),
              'X-RateLimit-Remaining': info.remaining.toString(),
              'X-RateLimit-Reset': Math.ceil(info.resetTime / 1000).toString()
            }
          }
        )
      }

      return handler(req, ...args)
    }
  }
}

/**
 * Extrai o IP real do cliente
 */
function getClientIP(req: any): string {
  // Vercel
  if (req.headers['x-forwarded-for']) {
    return req.headers['x-forwarded-for'].split(',')[0].trim()
  }
  
  // Cloudflare
  if (req.headers['cf-connecting-ip']) {
    return req.headers['cf-connecting-ip']
  }
  
  // Outros proxies
  if (req.headers['x-real-ip']) {
    return req.headers['x-real-ip']
  }
  
  // Fallback
  return req.headers['x-forwarded-for'] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress ||
         '127.0.0.1'
}

export default rateLimiter
