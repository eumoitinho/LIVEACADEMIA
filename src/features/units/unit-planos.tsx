"use client"

import { useEffect, useState, useCallback } from 'react'
import PlanosCards from '@/features/plans/planos-cards'

interface DynamicPlano {
  codigo: string | undefined
  nome: string
  valor: string | number
  categoria?: string
  recorrencia?: string
}

interface UnitPlanosProps {
  slug: string
  unidadeName: string
  onMatricular: (plano: { name: string; price: string; codigo?: string }) => void
  fallbackPlanos?: Array<{ name: string; price: string; codigo?: string }>
}

export default function UnitPlanos({ slug, unidadeName, onMatricular, fallbackPlanos }: UnitPlanosProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [planos, setPlanos] = useState<Array<{ name: string; price: string; codigo?: string }>>([])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/pacto/planos/${slug}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const fetched: DynamicPlano[] = json.planos || []
      const mapped = fetched.map(p => ({
        name: p.nome,
        price: typeof p.valor === 'number' ? p.valor.toFixed(2) : p.valor,
        codigo: p.codigo,
      }))
      setPlanos(mapped)
    } catch (e: any) {
      console.error('[UnitPlanos] Falha ao carregar planos', e)
      setError('Não foi possível carregar planos agora.')
      if (fallbackPlanos && fallbackPlanos.length) {
        setPlanos(fallbackPlanos)
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
