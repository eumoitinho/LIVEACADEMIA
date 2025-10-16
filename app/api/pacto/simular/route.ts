import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API, formatVendaData } from '@/src/lib/api/pacto-v2'
import { getUnitBySlug } from '@/src/lib/api/supabase-repository'

// POST /api/pacto/simular
// Body: { slug: string; planoId: string; cliente: PactoCliente; paymentMethod: string; cartao?: PactoCartao }
export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { slug, planoId, cliente, paymentMethod, cartao } = body || {}
  if (!slug || !planoId || !cliente || !paymentMethod) {
    return NextResponse.json({
      error: 'slug, planoId, cliente e paymentMethod são obrigatórios'
    }, { status: 400 })
  }

  try {
    console.log(`[Simular V2] Buscando unidade com slug: ${slug}`)
    const unit = await getUnitBySlug(slug)

    if (!unit) {
      console.error(`[Simular V2 ${slug}] Unidade não encontrada no banco`)
      return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
    }

    // Registrar acesso para anti-fraude
    const clientIP = pactoV2API.getClientIP(req)
    await pactoV2API.registrarInicioAcesso(slug, unit.codigo_unidade, parseInt(planoId), clientIP)

    // Preparar dados para simulação V2
    const dadosVenda = formatVendaData(
      slug, // Usar slug como codigo_rede
      cliente,
      cartao || null,
      unit.codigo_unidade,
      parseInt(planoId),
      paymentMethod,
      clientIP
    )

    // Simular venda usando API V2
    const simulacao = await pactoV2API.simularVenda(slug, unit.codigo_unidade, dadosVenda)

    return NextResponse.json({
      success: true,
      data: simulacao
    })
  } catch (error: any) {
    console.error('[POST /api/pacto/simular V2]', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Falha na simulação'
    }, { status: 500 })
  }
}
