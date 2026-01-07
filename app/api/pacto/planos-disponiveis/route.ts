import { NextResponse } from 'next/server'
import { getUnitBySlug } from '@/lib/api/supabase-repository'
import { pactoNegociacaoAPI, resolveNegociacaoAuth } from '@/src/lib/api/pacto-negociacao'

/**
 * GET /api/pacto/planos-disponiveis?unidade=slug&cliente=123
 * Busca planos disponíveis da API de negociação para um cliente específico
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const unidadeSlug = searchParams.get('unidade')
    const codigoCliente = Number(searchParams.get('cliente') || searchParams.get('codigoCliente'))

    if (!unidadeSlug) {
      return NextResponse.json(
        { error: 'Parâmetro "unidade" é obrigatório' },
        { status: 400 }
      )
    }

    if (!codigoCliente || Number.isNaN(codigoCliente)) {
      return NextResponse.json(
        { error: 'Parâmetro "cliente" é obrigatório para negociação' },
        { status: 400 }
      )
    }

    // Buscar unidade no banco
    const unidade = await getUnitBySlug(unidadeSlug)

    if (!unidade) {
      return NextResponse.json(
        { error: 'Unidade não encontrada' },
        { status: 404 }
      )
    }

    const { token, empresaId } = await resolveNegociacaoAuth(new Headers(request.headers), unidadeSlug)
    if (!token || !empresaId) {
      return NextResponse.json(
        { error: 'Token ou empresaId não configurados para negociação.' },
        { status: 401 }
      )
    }

    // Buscar planos da API de negociação
    const planos = await pactoNegociacaoAPI.listarPlanos(token, empresaId, codigoCliente)

    // Formatar resposta para o Sanity
    const planosFormatados = planos.map((plano: any) => ({
      id: plano.codigo,
      nome: plano.descricao,
      valor: plano.valor ?? 0,
      descricao: plano.descricao,
      periodo: plano.periodo || 'mensal',
      ativo: plano.ativo !== false,
    }))

    return NextResponse.json({
      success: true,
      planos: planosFormatados,
      unidade: {
        slug: unidade.slug,
        nome: unidade.nome,
      }
    })
  } catch (error) {
    console.error('Error fetching planos from Pacto API:', error)
    return NextResponse.json(
      {
        error: 'Erro ao buscar planos da API Pacto',
        message: error instanceof Error ? error.message : 'Unknown error',
        planos: []
      },
      { status: 500 }
    )
  }
}
