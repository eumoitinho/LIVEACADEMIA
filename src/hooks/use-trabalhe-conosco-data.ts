import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

export interface TrabalheConoscoData {
  title: string
  subtitle?: string
  description?: string
  heroImage?: {
    asset: {
      url: string
    }
  }
  benefits?: Array<{
    title: string
    description: string
    icon: string
  }>
  openPositions?: Array<{
    title: string
    department: string
    location: string
    type: string
    description: string
    requirements: string[]
    benefits: string[]
    salary?: string
    isActive: boolean
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
  contactInfo?: {
    email?: string
    phone?: string
    whatsapp?: string
  }
}

export function useTrabalheConoscoData() {
  const [data, setData] = useState<TrabalheConoscoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const query = `*[_type == "trabalheConosco"][0]`
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
