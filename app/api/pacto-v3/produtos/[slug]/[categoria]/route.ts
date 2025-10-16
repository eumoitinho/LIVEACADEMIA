import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'

// GET /api/pacto-v3/produtos/:slug/:categoria
// Busca produtos por categoria usando API V3 da Pacto
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string; categoria: string }> }) {
  const { slug, categoria } = await params

  try {
    const categoriaId = parseInt(categoria)
    
    if (isNaN(categoriaId)) {
      return NextResponse.json({ 
        error: 'ID da categoria deve ser um número válido' 
      }, { status: 400 })
    }

    console.log(`[Produtos V3] Buscando produtos da categoria ${categoriaId} em ${slug}`)

    // Buscar produtos usando API V3
    const produtos = await pactoV3API.getProdutos(slug, categoriaId)

    return NextResponse.json({ 
      produtos, 
      source: 'api-v3',
      categoria: categoriaId,
      slug,
      total: produtos.length
    })
  } catch (error: any) {
    console.error('[GET /api/pacto-v3/produtos V3]', error)

    return NextResponse.json({ 
      error: 'Falha ao buscar produtos',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}
