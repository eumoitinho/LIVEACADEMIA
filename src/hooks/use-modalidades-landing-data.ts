import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import type { ModalidadesLandingData } from '@/types/sanity'

export function useModalidadesLandingData() {
  const [data, setData] = useState<ModalidadesLandingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const query = `*[_type == "modalidadesPage"][0]{
          badge,
          title,
          description,
          ctaText,
          ctaHref,
          backgroundImage,
          "featuredModalidades": featuredModalidades[]->{
            _id,
            name,
            description,
            difficulty,
            image,
            order,
            active
          }
        }`
        const result = await client.fetch(query)
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

