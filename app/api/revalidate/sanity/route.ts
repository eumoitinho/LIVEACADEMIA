import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Endpoint para revalidar cache do Sanity
 * 
 * Pode ser chamado via:
 * 1. Webhook do Sanity (recomendado)
 * 2. Requisição manual com secret
 * 
 * Exemplo de uso:
 * POST /api/revalidate/sanity
 * Body: { "secret": "seu-secret", "path": "/" }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { secret, path, tag } = body

    // Verificar secret para segurança
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET
    if (!expectedSecret) {
      console.warn('[Revalidate] SANITY_REVALIDATE_SECRET não configurado')
      return NextResponse.json({ 
        error: 'Revalidation not configured',
        hint: 'Configure SANITY_REVALIDATE_SECRET environment variable'
      }, { status: 500 })
    }

    if (secret !== expectedSecret) {
      console.error('[Revalidate] Secret inválido')
      return NextResponse.json({ 
        error: 'Invalid secret' 
      }, { status: 401 })
    }

    // Revalidar por tag (mais eficiente)
    if (tag) {
      revalidateTag(tag)
      console.log(`[Revalidate] Tag revalidada: ${tag}`)
    }

    // Revalidar por path
    if (path) {
      if (Array.isArray(path)) {
        path.forEach(p => revalidatePath(p))
        console.log(`[Revalidate] Paths revalidados: ${path.join(', ')}`)
      } else {
        revalidatePath(path)
        console.log(`[Revalidate] Path revalidado: ${path}`)
      }
    }

    // Se não especificou path nem tag, revalidar rotas principais
    if (!path && !tag) {
      const defaultPaths = [
        '/',
        '/planos',
        '/unidades',
        '/aulas-coletivas',
        '/day-use',
        '/sobre',
        '/contato',
        '/trabalhe-conosco'
      ]
      
      defaultPaths.forEach(p => revalidatePath(p))
      console.log(`[Revalidate] Rotas padrão revalidadas`)
    }

    return NextResponse.json({ 
      revalidated: true,
      path: path || 'all',
      tag: tag || null,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('[Revalidate] Erro:', error)
    return NextResponse.json({ 
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}

/**
 * GET para verificar status da revalidação
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    configured: !!process.env.SANITY_REVALIDATE_SECRET,
    message: 'Use POST com secret para revalidar cache',
    example: {
      method: 'POST',
      body: {
        secret: 'your-secret',
        path: '/',
        tag: 'sanity-data' // opcional
      }
    }
  })
}

