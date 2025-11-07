import { NextResponse } from 'next/server'

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
  // Adicionar outros domínios de produção conforme necessário
]

/**
 * Verifica se o origin da requisição é permitido
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false
  return allowedOrigins.some(allowed => origin === allowed || origin.startsWith(allowed))
}

/**
 * Adiciona headers CORS a uma resposta NextResponse
 */
export function addCorsHeaders(
  response: NextResponse,
  origin: string | null
): NextResponse {
  // Se o origin for permitido, adiciona headers CORS
  if (origin && isOriginAllowed(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-empresa, x-chave-api, x-chave-publica')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Max-Age', '86400') // 24 horas
  } else {
    // Permite todas as origens em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      response.headers.set('Access-Control-Allow-Origin', origin || '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-empresa, x-chave-api, x-chave-publica')
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }
  }
  
  return response
}

/**
 * Handler para requisições OPTIONS (preflight)
 */
export function handleOptionsRequest(origin: string | null): NextResponse {
  const response = new NextResponse(null, { status: 204 })
  return addCorsHeaders(response, origin)
}

/**
 * Wrapper para adicionar CORS a qualquer handler de rota
 */
export function withCors<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (...args: any[]) => {
    // Extrair request do primeiro argumento
    const request = args[0] as Request
    
    // Lidar com preflight OPTIONS
    if (request.method === 'OPTIONS') {
      const origin = request.headers.get('origin')
      return handleOptionsRequest(origin)
    }
    
    // Executar handler original
    const response = await handler(...args)
    
    // Adicionar headers CORS
    const origin = request.headers.get('origin')
    return addCorsHeaders(response, origin)
  }) as T
}

