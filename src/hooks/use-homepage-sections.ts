import { useState, useEffect } from 'react'
import { client } from '@/src/lib/sanity'

// Types for section data
export interface ModalidadesSection {
  header: {
    title: string
    description: string
  }
  featuredModalities: Array<{
    subtitle: string
    title: string
    description: string
    image?: {
      asset: {
        url: string
      }
      alt?: string
    }
    order: number
    active: boolean
  }>
  cta: {
    text: string
    url: string
  }
  displaySettings: {
    showOnHomepage: boolean
    backgroundColor?: string
  }
}

export interface WellhubSection {
  header: {
    badge: string
    title: string
    description: string
  }
  benefits: Array<{
    icon: string
    title: string
    description: string
    order: number
  }>
  detailedBenefits: string[]
  primaryCTA: {
    text: string
    url?: string
  }
  banner: {
    title: string
    description: string
    image?: {
      asset: {
        url: string
      }
      alt?: string
    }
    cta?: {
      text: string
      url?: string
    }
  }
  displaySettings: {
    showOnHomepage: boolean
    showBanner: boolean
    backgroundColor?: string
  }
}

export interface TestimonialSection {
  header: {
    badge: string
    title: string
    description: string
  }
  featuredTestimonials: Array<{
    name: string
    role?: string
    content: string
    avatar?: {
      asset: {
        url: string
      }
      alt?: string
    }
    rating: number
    order: number
    featured: boolean
    active: boolean
  }>
  statistics: {
    averageRating: string
    satisfiedStudents: string
    recommendation: string
  }
  useExistingTestimonials: boolean
  linkedTestimonials?: Array<any>
  displaySettings: {
    showOnHomepage: boolean
    showStatistics: boolean
    maxTestimonials: number
    backgroundColor?: string
  }
}

// Default data for fallbacks
const defaultModalidadesSection: ModalidadesSection = {
  header: {
    title: 'Energia e motivação em grupo para você ir além',
    description: 'As aulas coletivas da Live Academia são a maneira perfeita de se exercitar com motivação, energia e resultados garantidos. Nossos professores especializados guiam você em cada movimento.'
  },
  featuredModalities: [
    {
      subtitle: 'Dança',
      title: 'Fitdance',
      description: 'Transforme seu treino em diversão! Queime calorias dançando hits nacionais e internacionais com coreografias envolventes.',
      order: 1,
      active: true
    },
    {
      subtitle: 'Bike',
      title: 'Top Ride',
      description: 'Pedale rumo aos seus objetivos! Aula de cycling com música motivante e instructor experiente para queimar muitas calorias.',
      order: 2,
      active: true
    },
    {
      subtitle: 'Flexibilidade',
      title: 'Pilates Solo',
      description: 'Fortaleça seu core e melhore sua postura. Exercícios de pilates focados no fortalecimento e flexibilidade.',
      order: 3,
      active: true
    }
  ],
  cta: {
    text: 'VEJA TODAS AS MODALIDADES',
    url: '/aulas-coletivas'
  },
  displaySettings: {
    showOnHomepage: true,
    backgroundColor: ''
  }
}

const defaultWellhubSection: WellhubSection = {
  header: {
    badge: 'Parceria oficial',
    title: 'Somos parceiros Wellhub',
    description: 'Na Live é assim. Estrutura e benefícios em um só lugar.'
  },
  benefits: [
    {
      icon: 'CheckCircle',
      title: 'Acesso gratuito',
      description: 'Use seu benefício corporativo para treinar sem custo adicional',
      order: 1
    },
    {
      icon: 'Star',
      title: 'Rede completa',
      description: 'Acesse todas as unidades Live Academia de Manaus',
      order: 2
    },
    {
      icon: 'Shield',
      title: 'Sem burocracia',
      description: 'Ativação simples e rápida através do app Wellhub',
      order: 3
    },
    {
      icon: 'Calendar',
      title: 'Flexibilidade total',
      description: 'Treine quando quiser, sem restrições de horário',
      order: 4
    }
  ],
  detailedBenefits: [
    'Acesso a todas as unidades Live Academia em Manaus através do seu benefício corporativo.',
    'Ambiente climatizado, equipamentos modernos e aulas coletivas inclusas.',
    'Flexibilidade total para treinar nos horários que melhor se adequam à sua rotina.'
  ],
  primaryCTA: {
    text: 'SAIBA MAIS',
    url: ''
  },
  banner: {
    title: 'Acesse a Live Academia através do Wellhub',
    description: 'Funcionários de empresas parceiras podem acessar nossa rede de academias através do benefício corporativo. Consulte se sua empresa é parceira.',
    cta: {
      text: 'Consultar Empresa',
      url: ''
    }
  },
  displaySettings: {
    showOnHomepage: true,
    showBanner: true,
    backgroundColor: ''
  }
}

const defaultTestimonialSection: TestimonialSection = {
  header: {
    badge: 'Depoimentos reais',
    title: 'O que dizem nossos alunos',
    description: 'Histórias de evolução e motivação para você entrar agora.'
  },
  featuredTestimonials: [
    {
      name: 'Maria Silva',
      role: 'Enfermeira',
      content: 'A Live Academia mudou minha vida! Perdi 15kg e ganhei muito mais disposição. Os professores são incríveis e sempre me motivam a dar o meu melhor.',
      rating: 5,
      order: 1,
      featured: true,
      active: true
    },
    {
      name: 'João Santos',
      role: 'Engenheiro',
      content: 'Excelente estrutura e atendimento. Consegui ganhar massa muscular e melhorar minha postura. Recomendo para todos!',
      rating: 5,
      order: 2,
      featured: true,
      active: true
    },
    {
      name: 'Ana Costa',
      role: 'Professora',
      content: 'O ambiente é acolhedor e os equipamentos são modernos. As aulas coletivas são fantásticas, principalmente o FitDance!',
      rating: 5,
      order: 3,
      featured: true,
      active: true
    }
  ],
  statistics: {
    averageRating: '4.9',
    satisfiedStudents: '10K+',
    recommendation: '98%'
  },
  useExistingTestimonials: false,
  displaySettings: {
    showOnHomepage: true,
    showStatistics: true,
    maxTestimonials: 6,
    backgroundColor: ''
  }
}

// Hook para seção de modalidades
export function useModalidadesSection() {
  const [data, setData] = useState<ModalidadesSection>(defaultModalidadesSection)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const query = `*[_type == "modalidadesSection"][0] {
          header,
          featuredModalities[] {
            subtitle,
            title,
            description,
            image {
              asset -> {
                url
              },
              alt
            },
            order,
            active
          },
          cta,
          displaySettings
        }`

        const result = await client.fetch(query)

        if (result && result.displaySettings?.showOnHomepage !== false) {
          // Sort modalities by order and filter active ones
          const sortedModalities = (result.featuredModalities || [])
            .filter((mod: any) => mod.active !== false)
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))

          setData({
            ...defaultModalidadesSection,
            ...result,
            featuredModalities: sortedModalities
          })
        } else {
          setData(defaultModalidadesSection)
        }
      } catch (err) {
        console.error('Error fetching modalidades section:', err)
        setError(err instanceof Error ? err.message : 'Erro ao carregar seção de modalidades')
        setData(defaultModalidadesSection)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

// Hook para seção Wellhub
export function useWellhubSection() {
  const [data, setData] = useState<WellhubSection>(defaultWellhubSection)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const query = `*[_type == "wellhubSection"][0] {
          header,
          benefits[] {
            icon,
            title,
            description,
            order
          },
          detailedBenefits,
          primaryCTA,
          banner {
            title,
            description,
            image {
              asset -> {
                url
              },
              alt
            },
            cta
          },
          displaySettings
        }`

        const result = await client.fetch(query)

        if (result && result.displaySettings?.showOnHomepage !== false) {
          // Sort benefits by order
          const sortedBenefits = (result.benefits || [])
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))

          setData({
            ...defaultWellhubSection,
            ...result,
            benefits: sortedBenefits
          })
        } else {
          setData(defaultWellhubSection)
        }
      } catch (err) {
        console.error('Error fetching wellhub section:', err)
        setError(err instanceof Error ? err.message : 'Erro ao carregar seção Wellhub')
        setData(defaultWellhubSection)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

// Hook para seção de depoimentos
export function useTestimonialSection() {
  const [data, setData] = useState<TestimonialSection>(defaultTestimonialSection)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const query = `*[_type == "testimonialSection"][0] {
          header,
          featuredTestimonials[] {
            name,
            role,
            content,
            avatar {
              asset -> {
                url
              },
              alt
            },
            rating,
            order,
            featured,
            active
          },
          statistics,
          useExistingTestimonials,
          linkedTestimonials[] -> {
            name,
            role,
            content,
            avatar {
              asset -> {
                url
              },
              alt
            },
            rating,
            order,
            active
          },
          displaySettings
        }`

        const result = await client.fetch(query)

        if (result && result.displaySettings?.showOnHomepage !== false) {
          let testimonials = []

          if (result.useExistingTestimonials && result.linkedTestimonials?.length > 0) {
            // Use linked testimonials from the testimonial schema
            testimonials = result.linkedTestimonials
              .filter((test: any) => test.active !== false)
              .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
              .slice(0, result.displaySettings?.maxTestimonials || 6)
          } else {
            // Use featured testimonials
            testimonials = (result.featuredTestimonials || [])
              .filter((test: any) => test.active !== false)
              .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
              .slice(0, result.displaySettings?.maxTestimonials || 6)
          }

          setData({
            ...defaultTestimonialSection,
            ...result,
            featuredTestimonials: testimonials
          })
        } else {
          setData(defaultTestimonialSection)
        }
      } catch (err) {
        console.error('Error fetching testimonial section:', err)
        setError(err instanceof Error ? err.message : 'Erro ao carregar seção de depoimentos')
        setData(defaultTestimonialSection)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}