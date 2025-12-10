"use client"

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
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

interface PlanoConfig {
  codigoApi: string
  nomeOriginal?: string
  valorOriginal?: string
  adesaoOriginal?: string
  fidelidadeOriginal?: string
  nomeExibicao?: string
  precoExibicao?: string
  adesaoExibicao?: string
  mostrarAdesao?: boolean
  fidelidadeExibicao?: string
  mostrarFidelidade?: boolean
  descricaoExibicao?: string
  beneficiosExibicao?: string[]
  visivel: boolean
  destaque: boolean
  ordem: number
  badge?: string
}

interface UnitPlanosProps {
  slug: string
  unidadeName: string
  onMatricular: (plano: { 
    name: string
    price: string
    codigo?: string
    adesao?: number
    fidelidade?: number
    regimeRecorrencia?: boolean
    modalidades?: string[]
    // Dados originais da API para checkout
    originalName?: string
    originalPrice?: string
  }) => void
  fallbackPlanos?: Array<{ 
    nome?: string
    name?: string
    preco?: string
    price?: string
    periodo?: string
    destaque?: boolean
    badge?: string
    codigo?: string 
  }>
  filters?: {
    precoMinimo?: number
    codigosPermitidos?: string[]
    usarPlanosSanity?: boolean
    usarConfigAvancada?: boolean
  }
  planosConfig?: PlanoConfig[]
}

export default function UnitPlanos({ 
  slug, 
  unidadeName, 
  onMatricular, 
  fallbackPlanos, 
  filters,
  planosConfig = []
}: UnitPlanosProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [planos, setPlanos] = useState<Array<{
    name: string
    price: string
    codigo?: string
    adesao?: number
    fidelidade?: number
    mostrarAdesao?: boolean
    mostrarFidelidade?: boolean
    regimeRecorrencia?: boolean
    modalidades?: string[]
    destaque?: boolean
    badge?: string
    ordem?: number
    originalName?: string
    originalPrice?: string
  }>>([])

  const formatPrice = (value: number | string | undefined) => {
    if (typeof value === 'number') {
      return value.toFixed(2)
    }
    if (!value) return '0.00'
    const numeric = value.replace(/\./g, '').replace(',', '.')
    const parsed = parseFloat(numeric)
    return Number.isFinite(parsed) ? parsed.toFixed(2) : '0.00'
  }

  const normalizeFallbackPlanos = (planosFallback?: Array<{ nome?: string; name?: string; preco?: string; price?: string; codigo?: string; destaque?: boolean; badge?: string }>) =>
    (planosFallback || []).map((plano) => ({
      name: plano.name || plano.nome || 'Plano',
      price: formatPrice(plano.price || plano.preco),
      codigo: plano.codigo,
      destaque: plano.destaque,
      badge: plano.badge,
    }))

  const normalizedFallbackPlanos = useMemo(() => normalizeFallbackPlanos(fallbackPlanos), [fallbackPlanos])
  const shouldUseSanityOnly = !!(filters?.usarPlanosSanity && normalizedFallbackPlanos.length)
  const shouldUseAdvancedConfig = filters?.usarConfigAvancada !== false && planosConfig.length > 0

  // Cria um mapa de configurações por código para lookup rápido
  const configMap = useMemo(() => {
    const map = new Map<string, PlanoConfig>()
    planosConfig.forEach(config => {
      map.set(config.codigoApi, config)
    })
    return map
  }, [planosConfig])

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
      
      console.log(`[UnitPlanos] Total de planos recebidos:`, fetched.length)
      
      let mapped = fetched.map(p => {
        const codigoStr = p.codigo?.toString()
        const config = codigoStr ? configMap.get(codigoStr) : undefined
        const originalPrice = formatPrice(typeof p.mensalidade === 'number' ? p.mensalidade : p.valor)
        
        // Se temos config avançada e o plano está configurado
        if (shouldUseAdvancedConfig && config) {
          // Se não está visível, retorna null para filtrar depois
          if (!config.visivel) {
            return null
          }

          // Calcular adesão e fidelidade com override
          const adesaoExibicao = config.adesaoExibicao ? parseFloat(config.adesaoExibicao) : p.adesao
          const fidelidadeExibicao = config.fidelidadeExibicao ? parseInt(config.fidelidadeExibicao) : p.fidelidade

          return {
            // Dados de EXIBIÇÃO (podem ser overridden)
            name: config.nomeExibicao || p.nome,
            price: config.precoExibicao || originalPrice,
            destaque: config.destaque,
            badge: config.badge,
            ordem: config.ordem,
            // Adesão e fidelidade com override e visibilidade
            adesao: adesaoExibicao,
            fidelidade: fidelidadeExibicao,
            mostrarAdesao: config.mostrarAdesao !== false, // default true
            mostrarFidelidade: config.mostrarFidelidade !== false, // default true
            // Dados ORIGINAIS (preservados para checkout)
            originalName: p.nome,
            originalPrice: originalPrice,
            codigo: codigoStr,
            regimeRecorrencia: p.regimeRecorrencia,
            modalidades: p.modalidades || [],
          }
        }
        
        // Sem config avançada, usa dados originais
        return {
          name: p.nome,
          price: originalPrice,
          originalName: p.nome,
          originalPrice: originalPrice,
          codigo: codigoStr,
          adesao: p.adesao,
          fidelidade: p.fidelidade,
          regimeRecorrencia: p.regimeRecorrencia,
          modalidades: p.modalidades || [],
        }
      }).filter(Boolean) as typeof planos

      // Se usando config avançada, filtra apenas os que estão configurados
      if (shouldUseAdvancedConfig && planosConfig.length > 0) {
        const configuredCodes = new Set(planosConfig.filter(c => c.visivel).map(c => c.codigoApi))
        mapped = mapped.filter(p => p.codigo && configuredCodes.has(p.codigo))
      }

      // Aplica filtros básicos se não usar config avançada
      if (!shouldUseAdvancedConfig) {
        if (filters?.precoMinimo) {
          mapped = mapped.filter(plano => parseFloat(plano.price) >= filters.precoMinimo!)
        }

        if (filters?.codigosPermitidos?.length) {
          const allowed = filters.codigosPermitidos.map(String)
          mapped = mapped.filter(plano => plano.codigo ? allowed.includes(plano.codigo) : true)
        }
      }

      // Ordena por ordem (config avançada) ou mantém ordem original
      if (shouldUseAdvancedConfig) {
        mapped.sort((a, b) => (a.ordem ?? 999) - (b.ordem ?? 999))
      }

      if (mapped.length === 0 && normalizedFallbackPlanos.length) {
        setPlanos(normalizedFallbackPlanos)
        return
      }
      
      console.log(`[UnitPlanos] Planos processados:`, mapped.length)
      setPlanos(mapped)
      
    } catch (e: any) {
      console.error('[UnitPlanos] Falha ao carregar planos', e)
      setError(`Não foi possível carregar planos: ${e.message}`)
      
      if (normalizedFallbackPlanos.length) {
        console.log('[UnitPlanos] Usando fallback após erro')
        setPlanos(normalizedFallbackPlanos)
        setError(null)
      }
    } finally {
      setLoading(false)
    }
  }, [slug, normalizedFallbackPlanos, shouldUseSanityOnly, shouldUseAdvancedConfig, configMap, filters, planosConfig])

  // Ref para evitar múltiplas chamadas
  const hasLoadedRef = useRef(false)
  const lastSlugRef = useRef<string>('')

  useEffect(() => {
    // Só carrega se o slug mudou ou se ainda não carregou
    if (lastSlugRef.current !== slug) {
      hasLoadedRef.current = false
      lastSlugRef.current = slug
    }

    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true
      load()
    }
  }, [slug, load])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-white/60 text-sm">Carregando planos...</p>
      </div>
    )
  }

  if (error && planos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60 mb-4 text-sm">{error}</p>
        <button
          onClick={load}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm transition-all duration-300"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (planos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60 text-sm">Nenhum plano disponível no momento.</p>
      </div>
    )
  }

  return (
    <PlanosCards
      planos={planos}
      unidadeName={unidadeName}
      onMatricular={(plano) => onMatricular({
        ...plano,
        // Garantir que dados originais sejam passados para checkout
        name: (plano as any).originalName || plano.name,
        price: (plano as any).originalPrice || plano.price,
      })}
    />
  )
}
