import { NextRequest, NextResponse } from 'next/server'
import { fetchPactoV2 } from '@/lib/pacto-v2'
import { getUnidadeBySlug } from '@/lib/repository'

// POST /api/checkout/lead body: { slug, lead: {...} }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug, lead } = body
    if (!slug || !lead) return NextResponse.json({ error: 'slug e lead obrigatórios' }, { status: 400 })
  const unidade = await getUnidadeBySlug(slug)
  if (!unidade) return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
  const chave = unidade.apiKeyPlain || unidade.chave_api || ''
  const data = await fetchPactoV2<any>({ slug, method: 'POST', endpoint: `/lead/${chave}/1/v2/addLead`, body: lead })
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
