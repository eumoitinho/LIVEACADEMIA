import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

export interface ContatoData {
  title: string
  subtitle?: string
  description?: string
  heroImage?: {
    asset: {
      url: string
    }
  }
  contactInfo?: {
    phone?: string
    whatsapp?: string
    email?: string
    address?: string
    hours?: string
  }
  socialNetworks?: Array<{
    name: string
    url: string
    icon: string
  }>
  formTitle?: string
  formDescription?: string
  formFields?: Array<{
    name: string
    label: string
    type: string
    required: boolean
    placeholder?: string
    options?: string[]
  }>
  ctaButton?: {
    text: string
    url?: string
  }
}

export function useContatoData() {
  const [data, setData] = useState<ContatoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const query = `*[_type == "contato"][0]`
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
