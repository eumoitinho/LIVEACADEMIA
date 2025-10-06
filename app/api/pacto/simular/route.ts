import { NextRequest, NextResponse } from 'next/server'
import { pactoAPI, getCodigoUnidade } from '@/lib/pacto-api'
import { getUnitBySlug } from '@/lib/repository'

// POST /api/pacto/simular
// Body: { slug: string; planoId: string; valor?: number; cupom?: string; paymentMethod?: string }
export async function POST(req: NextRequest) {
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
    console.log(`[Simular] Buscando unidade com slug: ${slug}`)
    const unit = await getUnitBySlug(slug)
    console.log(`[Simular] Unit result:`, unit ? `Found: ${unit.nome}` : 'NULL')

    if (!unit) {
      console.error(`[Simular ${slug}] Unidade não encontrada no banco`)
      return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
    }

    const redeKey = unit.apiKeyPlain
    const publicKey = unit.chave_publica

    console.log(`[Simular ${slug}] Keys check - redeKey: ${!!redeKey} (${redeKey?.substring(0,10)}...), publicKey: ${!!publicKey} (${publicKey?.substring(0,10)}...)`)

    if (!redeKey || !publicKey) {
      console.error(`[Simular ${slug}] Chaves ausentes - redeKey: ${!!redeKey}, publicKey: ${!!publicKey}`)
      return NextResponse.json({ error: 'Chaves da unidade ausentes' }, { status: 503 })
    }

    const codigo = getCodigoUnidade(slug)
    const simulacao = await pactoAPI.simularVenda(redeKey, publicKey, planoId, { unidade: codigo, valor, cupom, paymentMethod })

    if (!simulacao) {
      return NextResponse.json({ error: 'Não foi possível simular a venda' }, { status: 502 })
    }

    return NextResponse.json({ simulacao, fallback: false })
  } catch (error: any) {
    console.error('[POST /api/pacto/simular]', error)
    return NextResponse.json({ error: 'Falha na simulação' }, { status: 500 })
  }
}
