import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import type { WellhubSectionData } from '@/types/sanity'

export function useWellhubSectionData() {
  const [data, setData] = useState<WellhubSectionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const query = `*[_type == "wellhubSection"][0]{
          badge,
          title,
          description,
          subtitle,
          highlightedBenefits,
          ctaButton
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

