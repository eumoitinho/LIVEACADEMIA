import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface DayUseBeneficio {
  titulo: string
  descricao: string
  icon: string
}

interface DayUsePacote {
  titulo: string
  preco: string
  descricao: string
  popular: boolean
  beneficios: string[]
}

interface DayUseFaq {
  pergunta: string
  resposta: string
}

interface DayUseData {
  title: string
  subtitle: string
  description: string
  heroImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  beneficios: DayUseBeneficio[]
  pacotes: DayUsePacote[]
  faqs: DayUseFaq[]
  ctaTitle: string
  ctaDescription: string
}

export function useDayUseData() {
  const [data, setData] = useState<DayUseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDayUseData() {
      try {
        setLoading(true)
        const query = `
          *[_type == "dayUse"][0] {
            title,
            subtitle,
            description,
            heroImage {
              asset-> {
                url
              },
              alt
            },
            beneficios[] {
              titulo,
              descricao,
              icon
            },
            pacotes[] {
              titulo,
              preco,
              descricao,
              popular,
              beneficios
            },
            faqs[] {
              pergunta,
              resposta
            },
            ctaTitle,
            ctaDescription
          }
        `
        
        const result = await client.fetch(query)
        setData(result)
      } catch (err) {
        console.error('Erro ao buscar dados do Day Use:', err)
        setError('Erro ao carregar dados do Day Use')
      } finally {
        setLoading(false)
      }
    }

    fetchDayUseData()
  }, [])

  return { data, loading, error }
}
