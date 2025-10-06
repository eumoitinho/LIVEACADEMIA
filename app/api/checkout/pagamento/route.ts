import { NextRequest, NextResponse } from 'next/server'
import { processCheckout } from '@/lib/pacto-api'
import { getUnitBySlug as getUnidadeBySlug, logApi } from '@/lib/repository'

// POST /api/checkout/pagamento
// body: { slug, planoId, planoNome, valor, paymentMethod, customer, cardData?, cupom? }
export async function POST(req: NextRequest) {
  const started = Date.now()
  try {
    const body = await req.json()
    const { slug, planoId, planoNome, valor, paymentMethod, customer, cardData, cupom } = body
    if (!slug || !planoId || !paymentMethod || !customer) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }
    const unidade = await getUnidadeBySlug(slug)
    if (!unidade) {
      await logApi({ unidadeSlug: slug, direction: 'INBOUND', method: 'POST', endpoint: '/api/checkout/pagamento', statusCode: 404, latencyMs: Date.now() - started, error: 'Unidade não encontrada' })
      return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
    }
    const redeKey = unidade.apiKeyPlain
    const publicKey = unidade.chave_publica
    if (!redeKey || !publicKey) {
      await logApi({ unidadeSlug: slug, direction: 'INBOUND', method: 'POST', endpoint: '/api/checkout/pagamento', statusCode: 503, latencyMs: Date.now() - started, error: 'Credenciais ausentes para unidade' })
      return NextResponse.json({ error: 'Credenciais indisponíveis para esta unidade' }, { status: 503 })
    }
    const unidadeId = unidade.codigo_unidade || unidade.slug.toUpperCase()
    const sale = await processCheckout(redeKey, publicKey, paymentMethod, {
      unidadeId,
      planoId,
      planoNome: planoNome || 'Plano',
      valor,
      customer,
      paymentMethod,
      cardData,
      cupom,
    })
    await logApi({ unidadeSlug: slug, direction: 'INBOUND', method: 'POST', endpoint: '/api/checkout/pagamento', statusCode: sale.success ? 200 : 400, latencyMs: Date.now() - started, requestBody: { planoId, paymentMethod } })
    return NextResponse.json(sale, { status: sale.success ? 200 : 400 })
  } catch (e: any) {
    await logApi({ direction: 'INBOUND', method: 'POST', endpoint: '/api/checkout/pagamento', error: e.message, latencyMs: Date.now() - started })
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
