import { useState, useEffect } from 'react'

interface Plan {
  codigo?: number
  nome: string
  mensalidade?: number
  valor?: number | string
}

interface BestPlan {
  price: string
  name: string
  mensalidade: number
}

/**
 * Hook para buscar o melhor plano (menor preço) de uma unidade
 */
export function useUnitBestPlan(slug: string | null) {
  const [bestPlan, setBestPlan] = useState<BestPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setBestPlan(null)
      return
    }

    const fetchBestPlan = async () => {
      setLoading(true)
      setError(null)

      try {
        // Buscar planos da API V3
        const response = await fetch(`/api/pacto-v3/planos/${slug}`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch plans: ${response.status}`)
        }

        const data = await response.json()
        const planos: Plan[] = data.planos || []

        if (planos.length === 0) {
          // Se não houver planos da API, retornar null para usar fallback
          setBestPlan(null)
          return
        }

        // Encontrar o plano com menor mensalidade válida (> 0)
        let menorPlano: Plan | null = null
        let menorPreco = Infinity

        planos.forEach((plano) => {
          let preco: number = 0

          // Tentar obter o preço de diferentes campos
          // Prioridade: mensalidade (da API) > valor (fallback)
          if (plano.mensalidade !== undefined && typeof plano.mensalidade === 'number' && plano.mensalidade > 0) {
            preco = plano.mensalidade
          } else if (typeof plano.valor === 'number' && plano.valor > 0) {
            preco = plano.valor
          } else if (typeof plano.valor === 'string') {
            // Converter string "119,90" para número
            const precoStr = plano.valor.replace(',', '.').replace(/[^0-9.]/g, '')
            preco = parseFloat(precoStr) || 0
          }

          // Considerar apenas planos com preço válido e maior que zero
          if (preco > 0 && preco < menorPreco) {
            menorPreco = preco
            menorPlano = plano
          }
        })

        if (menorPlano && menorPreco < Infinity) {
          // Formatar preço para exibição (ex: "119,90")
          const priceFormatted = menorPreco.toFixed(2).replace('.', ',')
          
          setBestPlan({
            price: priceFormatted,
            name: menorPlano.nome,
            mensalidade: menorPreco,
          })
        } else {
          setBestPlan(null)
        }
      } catch (err) {
        // Não tratar como erro crítico - apenas logar e usar fallback
        console.warn(`[useUnitBestPlan] Não foi possível buscar planos para ${slug}, usando fallback:`, err)
        setError(null) // Não mostrar erro ao usuário, apenas usar fallback estático
        setBestPlan(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBestPlan()
  }, [slug])

  return { bestPlan, loading, error }
}

