import { NextRequest, NextResponse } from 'next/server'
import { aggregatePlanos } from '@/lib/pacto-v2'

// GET /api/checkout/planos?slug=...&codigos=1,2,3
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  const codigosParam = req.nextUrl.searchParams.get('codigos')
  if (!slug) return NextResponse.json({ error: 'slug obrigatório' }, { status: 400 })
  if (!codigosParam) return NextResponse.json({ error: 'codigos obrigatório' }, { status: 400 })
  const codigos = codigosParam.split(',').map(c => c.trim()).filter(Boolean)
  try {
    const planos = await aggregatePlanos(slug, codigos)
    return NextResponse.json({ planos })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
