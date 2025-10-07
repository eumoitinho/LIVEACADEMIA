import { NextRequest, NextResponse } from 'next/server'
import { fetchPactoV2 } from '@/lib/pacto-v2'
import { getUnidadeBySlug } from '@/lib/repository'

// POST /api/checkout/parq body: { slug, parq: {...} }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug, parq } = body
    if (!slug || !parq) return NextResponse.json({ error: 'slug e parq obrigatórios' }, { status: 400 })
  const unidade = await getUnidadeBySlug(slug)
  if (!unidade) return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
  const chave = unidade.apiKeyPlain || unidade.chave_api || ''
  const data = await fetchPactoV2<any>({ slug, method: 'POST', endpoint: `/TreinoWeb/prest/avaliacao/${chave}/parq?empresa=1`, body: parq })
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
