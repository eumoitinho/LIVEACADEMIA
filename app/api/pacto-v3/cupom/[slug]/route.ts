import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'

// POST /api/pacto-v3/cupom/:slug
// Valida cupom de desconto usando API V3 da Pacto
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const body = await req.json()
    const { cupom, plano, valor } = body

    if (!cupom || !plano || !valor) {
      return NextResponse.json({ 
        error: 'Dados obrigatórios: cupom, plano, valor' 
      }, { status: 400 })
    }

    console.log(`[Cupom V3] Validando cupom ${cupom} para plano ${plano} em ${slug}`)

    // Validar cupom usando API V3
    const resultado = await pactoV3API.validarCupom(slug, cupom, { plano: parseInt(plano), valor: parseFloat(valor) })

    return NextResponse.json({ 
      resultado, 
      source: 'api-v3',
      cupom,
      plano,
      valor
    })
  } catch (error: any) {
    console.error('[POST /api/pacto-v3/cupom V3]', error)

    return NextResponse.json({ 
      error: 'Falha ao validar cupom',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}