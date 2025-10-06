import { NextRequest, NextResponse } from 'next/server'
import { processCheckout, getCodigoUnidade } from '@/lib/pacto-api'
import { getUnitBySlug } from '@/lib/repository'

// POST /api/pacto/venda
// Body: { slug, planoId, planoNome, valor, paymentMethod, customer: {...}, cardData?, cupom? }
export async function POST(req: NextRequest) {
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

    if (!unit) {
      console.error(`[Venda ${slug}] Unidade não encontrada`)
      return NextResponse.json({ success: false, error: 'Unidade não encontrada' }, { status: 404 })
    }

    const redeKey = unit.apiKeyPlain
    const publicKey = unit.chave_publica

    if (!redeKey || !publicKey) {
      console.error(`[Venda ${slug}] Chaves ausentes - redeKey: ${!!redeKey}, publicKey: ${!!publicKey}`)
      return NextResponse.json({ success: false, error: 'Chaves da unidade ausentes' }, { status: 503 })
    }

    const codigo = getCodigoUnidade(slug)

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

    if (!response.success) return NextResponse.json({ ...response, fallback: false }, { status: 400 })
    return NextResponse.json({ ...response, fallback: false })
  } catch (error: any) {
    console.error('[POST /api/pacto/venda]', error)
    return NextResponse.json({ success: false, error: 'Falha ao processar venda' }, { status: 500 })
  }
}
