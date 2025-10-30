"use client"

import { useEffect, useState, useCallback } from 'react'
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
  fallbackPlanos?: Array<{ name: string; price: string; codigo?: string; adesao?: number; fidelidade?: number; regimeRecorrencia?: boolean; modalidades?: string[] }>
  planosPermitidos?: Array<{
    codigo: number
    nome?: string
    exibir?: boolean
    ordem?: number
    destaque?: boolean
    badge?: string
  }>
}

export default function UnitPlanos({ slug, unidadeName, onMatricular, fallbackPlanos, planosPermitidos }: UnitPlanosProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [planos, setPlanos] = useState<Array<{ name: string; price: string; codigo?: string; adesao?: number; fidelidade?: number; regimeRecorrencia?: boolean; modalidades?: string[]; destaque?: boolean; badge?: string }>>([])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      console.log(`[UnitPlanos] Carregando planos para unidade: ${slug}`)

      // Buscar planos da API
      const res = await fetch(`/api/pacto-v3/planos/${slug}`, { cache: 'no-store' })

      if (!res.ok) {
        const errorData = await res.json()
        console.error('[UnitPlanos] Erro na API:', errorData)
        throw new Error(errorData.error || `HTTP ${res.status}`)
      }

      const json = await res.json()
      console.log(`[UnitPlanos] Resposta da API:`, json)

      const fetched: DynamicPlano[] = json.planos || []

      if (fetched.length === 0 && json.fallback) {
        console.log('[UnitPlanos] Usando dados de fallback')
        if (fallbackPlanos && fallbackPlanos.length) {
          setPlanos(fallbackPlanos)
          return
        }
      }

      // Buscar configuração do admin
      let configAdmin: any[] = []
      try {
        const configRes = await fetch(`/api/admin/planos-config/${slug}`)
        if (configRes.ok) {
          const configData = await configRes.json()
          configAdmin = configData.config || []
          console.log(`[UnitPlanos] Configuração do admin:`, configAdmin)
        }
      } catch (configError) {
        console.log('[UnitPlanos] Nenhuma configuração do admin encontrada, usando fallback')
      }

      console.log(`[UnitPlanos] Total de planos recebidos:`, fetched.length)

      // Usar configuração do admin se existir, senão usar Sanity como fallback
      const configFinal = configAdmin.length > 0 ? configAdmin : planosPermitidos

      let planosParaExibir = fetched

      if (configFinal && configFinal.length > 0) {
        // Filtrar apenas os planos permitidos que devem ser exibidos
        const filtrosAtivos = configFinal.filter((filtro: any) => filtro.exibir !== false)
        const codigosPermitidos = filtrosAtivos.map((filtro: any) => filtro.codigo)

        planosParaExibir = fetched.filter(plano =>
          codigosPermitidos.includes(plano.codigo || 0)
        )

        console.log(`[UnitPlanos] Planos filtrados:`, planosParaExibir.length, 'de', fetched.length)
        console.log(`[UnitPlanos] Códigos permitidos:`, codigosPermitidos)

        // Ordenar os planos de acordo com a ordem definida
        planosParaExibir.sort((a, b) => {
          const filtroA = filtrosAtivos.find((f: any) => f.codigo === a.codigo)
          const filtroB = filtrosAtivos.find((f: any) => f.codigo === b.codigo)
          const ordemA = filtroA?.ordem || 999
          const ordemB = filtroB?.ordem || 999
          return ordemA - ordemB
        })
      } else {
        // Se não há filtros, filtrar apenas planos com preço válido
        planosParaExibir = fetched.filter(plano =>
          plano.mensalidade && plano.mensalidade > 0
        )
        console.log(`[UnitPlanos] Sem configuração, exibindo planos com preço válido:`, planosParaExibir.length)
      }

      const mapped = planosParaExibir.map(p => {
        // Buscar configurações personalizadas
        const filtroConfig = configFinal?.find((filtro: any) => filtro.codigo === p.codigo)

        return {
          name: p.nome,
          price: p.mensalidade ? p.mensalidade.toFixed(2) : (typeof p.valor === 'number' ? p.valor.toFixed(2) : p.valor),
          codigo: p.codigo?.toString(),
          adesao: p.adesao,
          fidelidade: p.fidelidade,
          regimeRecorrencia: p.regimeRecorrencia,
          modalidades: p.modalidades || [],
          // Propriedades da configuração
          destaque: filtroConfig?.destaque || false,
          badge: filtroConfig?.badge || undefined,
        }
      })

      console.log(`[UnitPlanos] Planos finais para exibição:`, mapped)
      setPlanos(mapped)

      if (json.source === 'static') {
        console.log('[UnitPlanos] Dados obtidos do fallback estático')
      }
    } catch (e: any) {
      console.error('[UnitPlanos] Falha ao carregar planos', e)
      setError(`Não foi possível carregar planos: ${e.message}`)

      // Usar fallback se disponível
      if (fallbackPlanos && fallbackPlanos.length) {
        console.log('[UnitPlanos] Usando fallback após erro')
        setPlanos(fallbackPlanos)
        setError(null) // Limpar erro se temos fallback
      }
    } finally {
      setLoading(false)
    }
  }, [slug, fallbackPlanos, planosPermitidos])

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
