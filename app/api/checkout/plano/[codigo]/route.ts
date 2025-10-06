import { NextRequest, NextResponse } from 'next/server'
import { fetchPactoV2 } from '@/lib/pacto-v2'

// GET /api/checkout/plano/{codigo}?slug=...
export async function GET(req: NextRequest, { params }: { params: { codigo: string } }) {
  const slug = req.nextUrl.searchParams.get('slug')
  const { codigo } = params
  if (!slug) return NextResponse.json({ error: 'slug obrigatório' }, { status: 400 })
  try {
    const data = await fetchPactoV2<any>({ slug, endpoint: `/v2/vendas/{unidadeChave}/plano/1/${codigo}` })
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
