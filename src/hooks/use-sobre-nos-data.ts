import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface SobreNosStat {
  value: string
  label: string
}

interface SobreNosData {
  title: string
  subtitle: string
  description: string
  backgroundImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  content: string[]
  stats: SobreNosStat[]
  ctaTitle: string
  ctaDescription: string
}

export function useSobreNosData() {
  const [data, setData] = useState<SobreNosData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSobreNosData() {
      try {
        setLoading(true)
        const query = `
          *[_type == "sobreNos"][0] {
            title,
            subtitle,
            description,
            backgroundImage {
              asset-> {
                url
              },
              alt
            },
            content,
            stats[] {
              value,
              label
            },
            ctaTitle,
            ctaDescription
          }
        `
        
        const result = await client.fetch(query)
        setData(result)
      } catch (err) {
        console.error('Erro ao buscar dados do Sobre Nós:', err)
        setError('Erro ao carregar dados do Sobre Nós')
      } finally {
        setLoading(false)
      }
    }

    fetchSobreNosData()
  }, [])

  return { data, loading, error }
}
