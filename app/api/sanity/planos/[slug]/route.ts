import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Usar a API existente que já funciona
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/pacto/planos/${slug}`, {
      headers: {
        'User-Agent': 'Sanity-Studio-Internal'
      }
    })

    if (!response.ok) {
      throw new Error(`API retornou ${response.status}`)
    }

    const data = await response.json()

    // Mapear para formato simplificado para o Sanity
    const planos = (data.planos || []).map((plano: any) => ({
      codigo: plano.codigo,
      nome: plano.nome,
      valor: plano.mensalidade || plano.valor,
      categoria: plano.categoria,
      recorrencia: plano.recorrencia
    }))

    return NextResponse.json({ planos })

  } catch (error) {
    console.error('[Sanity API] Erro ao buscar planos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}