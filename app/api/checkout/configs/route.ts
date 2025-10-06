import { NextRequest, NextResponse } from 'next/server'
import { fetchPactoV2 } from '@/lib/pacto-v2'

// GET /api/checkout/configs?slug=...
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'slug obrigatório' }, { status: 400 })
  try {
    const data = await fetchPactoV2<any>({ slug, endpoint: '/v2/vendas/{unidadeChave}/configs/1/tela/checkout' })
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
