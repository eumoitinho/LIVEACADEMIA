import { NextRequest, NextResponse } from 'next/server'
import { pactoAPI, getCodigoUnidade } from '@/lib/pacto-api'
import { locations } from '@/lib/locations'
import { getUnitBySlug, logApi } from '@/lib/repository'

// GET /api/pacto/planos/:slug
// Retorna lista de planos para a unidade (API Pacto V3)
export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const started = Date.now()
  const slug = params.slug
  try {
    const unit = await getUnitBySlug(slug)
    let fallback = false
    let codigo: string
  let redeKey: string | undefined
  let publicKey: string | undefined

    if (!unit) {
      // Sem registro no banco – tenta fallback estático (apenas para não quebrar UX)
      const codigoFallback = getCodigoUnidade(slug)
      if (codigoFallback === slug) {
        // Sem mapeamento conhecido – devolve fallback estático de planos se existir no locations
        const loc = locations.find(l => l.id === slug)
        if (loc?.planos?.length) {
          const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
          await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'GET', endpoint: 'planos', statusCode: 200, latencyMs: Date.now() - started, error: 'unidade_nao_encontrada_static_fallback' })
          return NextResponse.json({ planos: staticPlanos, fallback: true, source: 'static' })
        }
        await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'GET', endpoint: 'planos', statusCode: 404, latencyMs: Date.now() - started, error: 'unidade_nao_encontrada' })
        return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
      }
      codigo = codigoFallback
      fallback = true
    } else {
      codigo = getCodigoUnidade(unit.codigo_unidade || slug)
      redeKey = unit.apiKeyPlain
      publicKey = unit.chave_publica || undefined
    }

    if (!redeKey || !publicKey) {
      // Sem chave da unidade -> fallback estático se disponível
      const loc = locations.find(l => l.id === slug)
      if (loc?.planos?.length) {
        const staticPlanos = (loc.planos || []).map(p => ({ codigo: undefined, nome: p.name, valor: p.price }))
        await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'GET', endpoint: 'planos', statusCode: 200, latencyMs: Date.now() - started, error: 'chave_api_ou_publica_ausente_fallback_static' })
        return NextResponse.json({ planos: staticPlanos, fallback: true, source: 'static', missingUnitKey: !redeKey, missingPublicKey: !publicKey })
      }
      await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'GET', endpoint: 'planos', statusCode: 503, latencyMs: Date.now() - started, error: 'chave_api_ou_publica_ausente' })
      return NextResponse.json({ error: 'Chaves da unidade ausentes' }, { status: 503 })
    }

    const planos = await pactoAPI.getPlanosUnidade(redeKey, publicKey, codigo)
    await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'GET', endpoint: 'planos', statusCode: 200, latencyMs: Date.now() - started })
    return NextResponse.json({ planos, fallback })
  } catch (error: any) {
    console.error('[GET /api/pacto/planos]', error)
    await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method: 'GET', endpoint: 'planos', statusCode: 500, latencyMs: Date.now() - started, error: error?.message })
    return NextResponse.json({ error: 'Falha ao obter planos' }, { status: 500 })
  }
}
