import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import type { AppPageData } from '@/types/sanity'

export function useAppPageData() {
  const [data, setData] = useState<AppPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const query = `*[_type == "appPage"][0]{
          hero{
            title,
            highlight,
            description,
            subtitle,
            image,
            downloadBadges,
            ctaButtons
          },
          intro,
          videoSection{
            title,
            description,
            videoUrl,
            thumbnail
          },
          interfaceShowcase{
            title,
            description,
            "screenshots": screenshots[]
          },
          ctaSection{
            title,
            description,
            buttons
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

