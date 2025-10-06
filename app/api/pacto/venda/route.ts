import { NextRequest, NextResponse } from 'next/server'
import { processCheckout, getCodigoUnidade } from '@/lib/pacto-api'
import { getUnitBySlug, logApi } from '@/lib/repository'

// POST /api/pacto/venda
// Body: { slug, planoId, planoNome, valor, paymentMethod, customer: {...}, cardData?, cupom? }
export async function POST(req: NextRequest) {
  const started = Date.now()
  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido' }, { status: 400 }) }

  const { slug, planoId, planoNome, valor, paymentMethod, customer, cardData, cupom } = body || {}

  if (!slug || !planoId || !planoNome || (valor === undefined || valor === null) || !paymentMethod || !customer) {
    return NextResponse.json({ error: 'Campos obrigatórios: slug, planoId, planoNome, valor, paymentMethod, customer' }, { status: 400 })
  }
  if (!['cartao','pix','boleto'].includes(paymentMethod)) {
    return NextResponse.json({ error: 'paymentMethod inválido' }, { status: 400 })
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
        await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'POST', endpoint: 'venda', statusCode: 404, latencyMs: Date.now() - started, error: 'unidade_nao_encontrada', requestBody: { planoId, paymentMethod } })
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
      await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'POST', endpoint: 'venda', statusCode: 503, latencyMs: Date.now() - started, error: 'chave_api_ou_publica_ausente', requestBody: { planoId, paymentMethod } })
      return NextResponse.json({ success: false, error: 'Chaves da unidade ausentes' }, { status: 503 })
    }

    const response = await processCheckout(redeKey, publicKey, paymentMethod, {
      unidadeId: codigo,
      planoId,
      planoNome,
      valor,
      paymentMethod,
      customer,
      cardData,
      cupom,
    })
    await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'POST', endpoint: 'venda', statusCode: response.success ? 200 : 400, latencyMs: Date.now() - started, error: response.success ? undefined : response.error, requestBody: { planoId, paymentMethod, valor } })
    if (!response.success) return NextResponse.json({ ...response, fallback }, { status: 400 })
    return NextResponse.json({ ...response, fallback })
  } catch (error: any) {
    console.error('[POST /api/pacto/venda]', error)
    await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'POST', endpoint: 'venda', statusCode: 500, latencyMs: Date.now() - started, error: error?.message, requestBody: { planoId, paymentMethod, valor } })
    return NextResponse.json({ success: false, error: 'Falha ao processar venda' }, { status: 500 })
  }
}
