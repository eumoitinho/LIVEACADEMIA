import { NextRequest, NextResponse } from 'next/server'
import { getUnitBySlug } from '@/lib/repository'
import { pactoAPI } from '@/lib/pacto-api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Buscar dados da unidade
    const unit = await getUnitBySlug(slug)
    if (!unit) {
      return NextResponse.json(
        { error: 'Unidade não encontrada' },
        { status: 404 }
      )
    }

    // Buscar planos da API
    const planosResponse = await pactoAPI.getPlanosUnidade(
      unit.chave_publica,
      unit.chave_publica,
      unit.codigo_unidade || slug
    )

    if (!planosResponse.success) {
      return NextResponse.json(
        { error: 'Erro ao buscar planos da API' },
        { status: 500 }
      )
    }

    // Mapear para formato simplificado
    const planos = planosResponse.data.map((plano: any) => ({
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