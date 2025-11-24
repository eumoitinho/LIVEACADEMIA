import { NextResponse } from 'next/server'
import { getUnitBySlug } from '@/lib/repository'
import * as pactoAPI from '@/lib/pacto-api'

/**
 * GET /api/pacto/planos-disponiveis?unidade=slug
 * Busca planos disponíveis da API Pacto para uma unidade específica
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const unidadeSlug = searchParams.get('unidade')

    if (!unidadeSlug) {
      return NextResponse.json(
        { error: 'Parâmetro "unidade" é obrigatório' },
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

    // Buscar planos da API Pacto
    const planos = await pactoAPI.getPlanosUnidade(
      unidade.chave_api, // redeKey (chave privada descriptografada)
      unidade.chave_publica, // publicKey
      unidade.codigo_unidade // codigoUnidade
    )

    // Formatar resposta para o Sanity
    const planosFormatados = planos.map((plano: any) => ({
      id: plano.id || plano.codigo,
      nome: plano.nome || plano.name,
      valor: plano.valor || plano.price,
      descricao: plano.descricao || plano.description,
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
