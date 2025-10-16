import { useEffect, useState } from 'react'

// Tipos simplificados para o JSON
interface HomepageContent {
  hero: {
    badge: string
    title: string
    subtitle: string
    description: string
    primaryCta: { text: string; link: string }
    secondaryCta: { text: string; link: string }
    stats: Array<{ value: string; label: string }>
  }
  about: {
    badge: string
    title: string
    description: string
    stats: Array<{ value: string; label: string }>
    highlights: string[]
  }
  beneficios: {
    badge: string
    title: string
    description: string
    items: Array<{
      icon: string
      title: string
      description: string
      color: string
      image: string
    }>
  }
  planos: {
    badge: string
    title: string
    description: string
    plans: Array<{
      id: string
      name: string
      price: string
      period: string
      description: string
      badge?: string
      features: string[]
      cta: string
      highlight: boolean
    }>
  }
  seo: {
    title: string
    description: string
    keywords: string
  }
}

interface Unit {
  _id: string
  name: string
  slug: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  whatsapp: string
  email: string
  latitude: number
  longitude: number
  type: string
  services: string[]
  images?: any[]
  description: string
  openingHours: string
  order: number
}

export function useHomepageData() {
  const [data, setData] = useState<HomepageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch('/content/homepage-content.json')
        if (!response.ok) throw new Error('Failed to fetch content')
        const result = await response.json()
        setData(result as HomepageContent)
      } catch (err) {
        console.error('Erro ao buscar dados da homepage:', err)
        setError('Erro ao carregar dados')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useUnitsData() {
  const [data, setData] = useState<Unit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        // Por enquanto, retorna dados estáticos das unidades
        const units: Unit[] = [
          {
            _id: '1',
            name: 'Live Academia Centro',
            slug: 'centro',
            address: 'Rua 10 de Julho, 123 - Centro',
            city: 'Manaus',
            state: 'AM',
            zipCode: '69010-060',
            phone: '(92) 3234-5678',
            whatsapp: '(92) 99999-9999',
            email: 'centro@liveacademia.com.br',
            latitude: -3.1190275,
            longitude: -60.0217314,
            type: 'Diamante',
            services: ['Climatização', 'Espaço Relax', 'Espaço Yoga', 'Studio de Bike', 'Sauna'],
            description: 'Nossa unidade flagship no centro de Manaus, com estrutura completa e todos os serviços premium.',
            openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h | Domingo: 6h às 20h',
            order: 1
          },
          {
            _id: '2',
            name: 'Live Academia Cidade Nova',
            slug: 'cidade-nova',
            address: 'Av. Torquato Tapajós, 456 - Cidade Nova',
            city: 'Manaus',
            state: 'AM',
            zipCode: '69065-000',
            phone: '(92) 3234-5679',
            whatsapp: '(92) 99999-9998',
            email: 'cidadenova@liveacademia.com.br',
            latitude: -3.0471193,
            longitude: -59.9910556,
            type: 'Premium',
            services: ['Climatização', 'Espaço Relax', 'Atendimento Domingos'],
            description: 'Unidade moderna na Cidade Nova com foco em funcional e aulas coletivas.',
            openingHours: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h | Domingo: 6h às 20h',
            order: 2
          }
        ]
        setData(units)
      } catch (err) {
        console.error('Erro ao buscar unidades:', err)
        setError('Erro ao carregar unidades')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
