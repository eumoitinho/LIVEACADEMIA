import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

export interface SobreData {
  title: string
  subtitle?: string
  description?: string
  heroImage?: {
    asset: {
      url: string
    }
  }
  content?: Array<{
    title: string
    content: string
    image?: {
      asset: {
        url: string
      }
    }
    order: number
  }>
  values?: Array<{
    title: string
    description: string
    icon: string
  }>
  mission?: string
  vision?: string
  history?: string
  stats?: Array<{
    number: string
    label: string
    description: string
  }>
  team?: {
    title: string
    description: string
    members: Array<{
      name: string
      position: string
      bio: string
      photo?: {
        asset: {
          url: string
        }
      }
    }>
  }
  cta?: {
    title: string
    description: string
    buttonText: string
    buttonUrl?: string
  }
}

export function useSobreData() {
  const [data, setData] = useState<SobreData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const query = `*[_type == "sobre"][0]`
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
