import { NextRequest, NextResponse } from 'next/server'
import { pactoAPI, getCodigoUnidade } from '@/lib/pacto-api'
import { locations } from '@/lib/locations'
import { getUnitBySlug } from '@/lib/repository'

// GET /api/pacto/planos/:slug
// Busca TUDO do Supabase: chave_api (rede key) + chave_publica (public key)
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    // Busca unidade do Supabase
    const unit = await getUnitBySlug(slug)

    if (!unit) {
      // Fallback estático se não encontrar no banco
      const loc = locations.find(l => l.id === slug)
      if (loc?.planos?.length) {
        const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
        return NextResponse.json({ planos: staticPlanos, fallback: true, source: 'static' })
      }
      return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
    }

    // Decripta chave_api e pega chave_publica
    const redeKey = unit.apiKeyPlain
    const publicKey = unit.chave_publica

    if (!redeKey || !publicKey) {
      console.error(`[Planos ${slug}] Chaves ausentes - redeKey: ${!!redeKey}, publicKey: ${!!publicKey}`)

      // Fallback estático
      const loc = locations.find(l => l.id === slug)
      if (loc?.planos?.length) {
        const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
        return NextResponse.json({ planos: staticPlanos, fallback: true, source: 'static' })
      }

      return NextResponse.json({ error: 'Chaves da unidade ausentes' }, { status: 503 })
    }

    // Usar novo método getPlanosNegociacao
    const empresaId = publicKey // empresaId é a chave pública
    const planos = await pactoAPI.getPlanosNegociacao(redeKey, empresaId, 0)

    return NextResponse.json({ planos, fallback: false })
  } catch (error: any) {
    console.error('[GET /api/pacto/planos]', error)

    // Fallback estático em caso de erro
    const loc = locations.find(l => l.id === slug)
    if (loc?.planos?.length) {
      const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
      return NextResponse.json({ planos: staticPlanos, fallback: true, source: 'static', error: error.message })
    }

    return NextResponse.json({ error: 'Falha ao obter planos' }, { status: 500 })
  }
}
