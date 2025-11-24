"use client"

import { useEffect, useState, useCallback, useMemo } from 'react'
import PlanosCards from '@/features/plans/planos-cards'

interface DynamicPlano {
  codigo: number | undefined
  nome: string
  valor: string | number
  mensalidade?: number
  adesao?: number
  fidelidade?: number
  categoria?: string
  recorrencia?: string
  regimeRecorrencia?: boolean
  modalidades?: string[]
}

interface UnitPlanosProps {
  slug: string
  unidadeName: string
  onMatricular: (plano: { name: string; price: string; codigo?: string; adesao?: number; fidelidade?: number; regimeRecorrencia?: boolean; modalidades?: string[] }) => void
  fallbackPlanos?: Array<{ nome?: string; name?: string; preco?: string; price?: string; periodo?: string; destaque?: boolean; badge?: string; codigo?: string }>
  filters?: {
    precoMinimo?: number
    codigosPermitidos?: string[]
    usarPlanosSanity?: boolean
  }
}

export default function UnitPlanos({ slug, unidadeName, onMatricular, fallbackPlanos, filters }: UnitPlanosProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [planos, setPlanos] = useState<Array<{ name: string; price: string; codigo?: string; adesao?: number; fidelidade?: number; regimeRecorrencia?: boolean; modalidades?: string[] }>>([])

  const formatPrice = (value: number | string | undefined) => {
    if (typeof value === 'number') {
      return value.toFixed(2)
    }
    if (!value) return '0.00'
    const numeric = value.replace(/\./g, '').replace(',', '.')
    const parsed = parseFloat(numeric)
    return Number.isFinite(parsed) ? parsed.toFixed(2) : '0.00'
  }

  const normalizeFallbackPlanos = (planosFallback?: Array<{ nome?: string; name?: string; preco?: string; price?: string; codigo?: string }>) =>
    (planosFallback || []).map((plano) => ({
      name: plano.name || plano.nome || 'Plano',
      price: formatPrice(plano.price || plano.preco),
      codigo: plano.codigo
    }))

  const normalizedFallbackPlanos = useMemo(() => normalizeFallbackPlanos(fallbackPlanos), [fallbackPlanos])
  const shouldUseSanityOnly = !!(filters?.usarPlanosSanity && normalizedFallbackPlanos.length)

  const load = useCallback(async () => {
    if (shouldUseSanityOnly) {
      setPlanos(normalizedFallbackPlanos)
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)
    try {
      console.log(`[UnitPlanos] Carregando planos para unidade: ${slug}`)
      const res = await fetch(`/api/pacto-v3/planos/${slug}`, { cache: 'no-store' })
      
      if (!res.ok) {
        const errorData = await res.json()
        console.error('[UnitPlanos] Erro na API:', errorData)
        throw new Error(errorData.error || `HTTP ${res.status}`)
      }
      
      const json = await res.json()
      console.log(`[UnitPlanos] Resposta da API:`, json)
      
      const fetched: DynamicPlano[] = json.planos || []
      
      if (fetched.length === 0 && json.fallback && normalizedFallbackPlanos.length) {
        console.log('[UnitPlanos] Usando dados de fallback')
        setPlanos(normalizedFallbackPlanos)
        return
      }
      
      // Usar todos os planos por enquanto para debug
      console.log(`[UnitPlanos] Total de planos recebidos:`, fetched.length)
      console.log(`[UnitPlanos] Primeiros 3 planos:`, fetched.slice(0, 3).map(p => ({ nome: p.nome, codigo: p.codigo })))
      
      let mapped = fetched.map(p => ({
        name: p.nome,
        price: formatPrice(typeof p.mensalidade === 'number' ? p.mensalidade : p.valor),
        codigo: p.codigo?.toString(),
        adesao: p.adesao,
        fidelidade: p.fidelidade,
        regimeRecorrencia: p.regimeRecorrencia,
        modalidades: p.modalidades || [],
      }))

      if (filters?.precoMinimo) {
        mapped = mapped.filter(plano => parseFloat(plano.price) >= filters.precoMinimo!)
      }

      if (filters?.codigosPermitidos?.length) {
        const allowed = filters.codigosPermitidos.map(String)
        mapped = mapped.filter(plano => plano.codigo ? allowed.includes(plano.codigo) : true)
      }

      if (mapped.length === 0 && normalizedFallbackPlanos.length) {
        setPlanos(normalizedFallbackPlanos)
        return
      }
      
      console.log(`[UnitPlanos] Planos mapeados:`, mapped)
      setPlanos(mapped)
      
      if (json.source === 'static') {
        console.log('[UnitPlanos] Dados obtidos do fallback estático')
      }
    } catch (e: any) {
      console.error('[UnitPlanos] Falha ao carregar planos', e)
      setError(`Não foi possível carregar planos: ${e.message}`)
      
      // Usar fallback se disponível
      if (normalizedFallbackPlanos.length) {
        console.log('[UnitPlanos] Usando fallback após erro')
        setPlanos(normalizedFallbackPlanos)
        setError(null)
      }
    } finally {
      setLoading(false)
    }
  }, [slug, fallbackPlanos])

  useEffect(() => { load() }, [load])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center text-live-textSecondary">
          Carregando planos...
        </div>
      </section>
    )
  }

  if (error && planos.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-live-textSecondary mb-4">{error}</p>
          <button
            onClick={load}
            className="px-6 py-3 rounded-2xl bg-live-border/20 hover:bg-live-border/30 border border-live-border/30 hover:border-live-accent/50 text-live-textPrimary hover:text-live-accent transition-all duration-300"
          >
            Tentar novamente
          </button>
        </div>
      </section>
    )
  }

  if (planos.length === 0) return null

  return (
    <PlanosCards
      planos={planos}
      unidadeName={unidadeName}
      onMatricular={(plano) => onMatricular(plano)}
    />
  )
}
