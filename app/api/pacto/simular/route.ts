import { NextRequest, NextResponse } from 'next/server'
import { pactoAPI, getCodigoUnidade } from '@/lib/pacto-api'
import { getUnitBySlug, logApi } from '@/lib/repository'

// POST /api/pacto/simular
// Body: { slug: string; planoId: string; valor?: number; cupom?: string; paymentMethod?: string }
export async function POST(req: NextRequest) {
  const started = Date.now()
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { slug, planoId, valor, cupom, paymentMethod } = body || {}
  if (!slug || !planoId) {
    return NextResponse.json({ error: 'slug e planoId são obrigatórios' }, { status: 400 })
  }
  try {
    const unit = await getUnitBySlug(slug)
    let fallback = false
    let codigo: string
    let redeKey: string | undefined
    let publicKey: string | undefined
    if (!unit) {
      const codigoFallback = getCodigoUnidade(slug)
      if (codigoFallback === slug) {
        await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'POST', endpoint: 'simular', statusCode: 404, latencyMs: Date.now() - started, error: 'unidade_nao_encontrada', requestBody: { planoId } })
        return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
      }
      codigo = codigoFallback
      fallback = true
    } else {
      codigo = getCodigoUnidade(unit.codigo_unidade || slug)
      redeKey = unit.apiKeyPlain
      publicKey = unit.chave_publica || undefined
    }

    if (!redeKey || !publicKey) {
      await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'POST', endpoint: 'simular', statusCode: 503, latencyMs: Date.now() - started, error: 'chave_api_ou_publica_ausente', requestBody: { planoId } })
      return NextResponse.json({ error: 'Chaves da unidade ausentes' }, { status: 503 })
    }

    const simulacao = await pactoAPI.simularVenda(redeKey, publicKey, planoId, { unidade: codigo, valor, cupom, paymentMethod })

    if (!simulacao) {
      await logApi({
        unidadeSlug: slug,
        direction: 'OUTBOUND',
        method: 'POST',
        endpoint: 'simular',
        statusCode: 502,
        latencyMs: Date.now() - started,
        error: 'simulacao_invalida',
        requestBody: { planoId, valor, cupom, paymentMethod },
      })
      return NextResponse.json({ error: 'Não foi possível simular a venda' }, { status: 502 })
    }

    await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'POST', endpoint: 'simular', statusCode: 200, latencyMs: Date.now() - started, requestBody: { planoId, valor, cupom, paymentMethod } })
    return NextResponse.json({ simulacao, fallback })
  } catch (error: any) {
    console.error('[POST /api/pacto/simular]', error)
    await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'POST', endpoint: 'simular', statusCode: 500, latencyMs: Date.now() - started, error: error?.message, requestBody: { planoId, valor, cupom, paymentMethod } })
    return NextResponse.json({ error: 'Falha na simulação' }, { status: 500 })
  }
}
