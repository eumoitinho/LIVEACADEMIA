import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Domínios permitidos para requisições CORS
 */
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://liveacademia.m2z.com.br',
  'https://www.liveacademia.m2z.com.br',
  'https://liveacademia.com.br',
  'https://www.liveacademia.com.br',
]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const isAllowedOrigin = origin ? allowedOrigins.includes(origin) : false

  // Para rotas de API, adicionar headers CORS
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Lidar com preflight OPTIONS
    if (request.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 204 })
      
      if (origin && isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-empresa, x-chave-api, x-chave-publica')
        response.headers.set('Access-Control-Allow-Credentials', 'true')
        response.headers.set('Access-Control-Max-Age', '86400')
      } else if (process.env.NODE_ENV === 'development') {
        // Em desenvolvimento, permitir qualquer origin
        response.headers.set('Access-Control-Allow-Origin', origin || '*')
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-empresa, x-chave-api, x-chave-publica')
        response.headers.set('Access-Control-Allow-Credentials', 'true')
      }
      
      return response
    }

    // Para requisições normais, adicionar headers CORS na resposta
    // (Os headers serão adicionados nas rotas individuais usando addCorsHeaders)
  }

  // Para rotas do Sanity Studio, adicionar headers de segurança
  if (request.nextUrl.pathname.startsWith('/studio')) {
    const response = NextResponse.next()
    
    // Permitir que o Studio funcione em qualquer domínio configurado
    if (origin && isAllowedOrigin) {
      response.headers.set('X-Frame-Options', 'SAMEORIGIN')
      response.headers.set('X-Content-Type-Options', 'nosniff')
    }
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/studio/:path*',
  ],
}

