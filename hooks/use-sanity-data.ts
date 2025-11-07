import { useState, useEffect } from 'react'
import {
  getHomepageData,
  getUnits,
  getPlans,
  getBenefits,
  getTestimonials,
  getAppFeatures,
  getModalities,
  getStructureFeatures,
  getWellhubFeatures,
  getBioimpedanciaFeatures,
  getAppSectionData,
  getBeneficiosSectionData,
  getHeroSectionData,
  getPlanosSectionData,
  getEstruturaSectionData,
  getBioimpedanciaSectionData,
  getModalidadesSectionData,
  getWellhubSectionData,
  getTestimonialSectionData,
  getPlanosPageData,
  getUnidadesPageData,
  getUnidadesSectionData,
  getNavigationData
} from '../lib/sanity'
import type {
  HomepageContent,
  Unit,
  Plano,
  Benefit,
  Testimonial,
  AppFeature,
  Modality,
  StructureFeature,
  WellhubFeature,
  BioimpedanciaFeature,
  AppSectionData,
  BeneficiosSection
} from '../types/sanity'

export function useHomepageData() {
  const [data, setData] = useState<HomepageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const homepageData = await getHomepageData()
        setData(homepageData)
        setError(null)
      } catch (err) {
        console.error('Error fetching homepage data:', err)
        setError('Erro ao carregar dados da homepage')
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
        const unitsData = await getUnits()
        setData(unitsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching units data:', err)
        setError('Erro ao carregar dados das unidades')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function usePlansData() {
  const [data, setData] = useState<Plano[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const plansData = await getPlans()
        setData(plansData)
        setError(null)
      } catch (err) {
        console.error('Error fetching plans data:', err)
        setError('Erro ao carregar dados dos planos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useBenefitsData() {
  const [data, setData] = useState<Benefit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const benefitsData = await getBenefits()
        setData(benefitsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching benefits data:', err)
        setError('Erro ao carregar dados dos benefícios')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useTestimonialsData() {
  const [data, setData] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const testimonialsData = await getTestimonials()
        setData(testimonialsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching testimonials data:', err)
        setError('Erro ao carregar dados dos depoimentos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useAppFeaturesData() {
  const [data, setData] = useState<AppFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const appFeaturesData = await getAppFeatures()
        setData(appFeaturesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching app features data:', err)
        setError('Erro ao carregar dados dos recursos do app')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useModalitiesData() {
  const [data, setData] = useState<Modality[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const modalitiesData = await getModalities()
        setData(modalitiesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching modalities data:', err)
        setError('Erro ao carregar dados das modalidades')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useStructureFeaturesData() {
  const [data, setData] = useState<StructureFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const structureFeaturesData = await getStructureFeatures()
        setData(structureFeaturesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching structure features data:', err)
        setError('Erro ao carregar dados dos recursos da estrutura')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useWellhubFeaturesData() {
  const [data, setData] = useState<WellhubFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const wellhubFeaturesData = await getWellhubFeatures()
        setData(wellhubFeaturesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching wellhub features data:', err)
        setError('Erro ao carregar dados dos recursos do Wellhub')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useBioimpedanciaFeaturesData() {
  const [data, setData] = useState<BioimpedanciaFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const bioimpedanciaFeaturesData = await getBioimpedanciaFeatures()
        setData(bioimpedanciaFeaturesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching bioimpedancia features data:', err)
        setError('Erro ao carregar dados dos recursos da bioimpedância')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useAppSectionData() {
  const [data, setData] = useState<AppSectionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const appSectionData = await getAppSectionData()
        setData(appSectionData)
        setError(null)
      } catch (err) {
        console.error('Error fetching app section data:', err)
        setError('Erro ao carregar dados da seção do app')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useBeneficiosSectionData() {
  const [data, setData] = useState<BeneficiosSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const beneficiosSectionData = await getBeneficiosSectionData()
        setData(beneficiosSectionData)
        setError(null)
      } catch (err) {
        console.error('Error fetching beneficios section data:', err)
        setError('Erro ao carregar dados da seção de benefícios')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useEstruturaSectionData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const estruturaSectionData = await getEstruturaSectionData()
        setData(estruturaSectionData || {
          header: {
            badge: 'Nossa Estrutura',
            title: 'Estrutura completa para sua evolução',
            description: 'Equipamentos modernos, espaços exclusivos e tecnologia de ponta em todas as nossas unidades.',
          },
          additionalInfo: {
            title: 'Estrutura Completa',
            description: 'Cada unidade Live Academia é equipada com o que há de mais moderno em equipamentos de musculação, cardio e funcional, além de espaços exclusivos para aulas coletivas e áreas de descanso.',
          },
          displaySettings: {
            showOnHomepage: true,
            showAdditionalInfo: true,
          }
        })
        setError(null)
      } catch (err) {
        console.error('Error fetching estrutura section data:', err)
        setError('Erro ao carregar dados da seção de estrutura')
        // Fallback data
        setData({
          header: {
            badge: 'Nossa Estrutura',
            title: 'Estrutura completa para sua evolução',
            description: 'Equipamentos modernos, espaços exclusivos e tecnologia de ponta em todas as nossas unidades.',
          },
          additionalInfo: {
            title: 'Estrutura Completa',
            description: 'Cada unidade Live Academia é equipada com o que há de mais moderno em equipamentos de musculação, cardio e funcional, além de espaços exclusivos para aulas coletivas e áreas de descanso.',
          },
          displaySettings: {
            showOnHomepage: true,
            showAdditionalInfo: true,
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useBioimpedanciaSectionData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const bioimpedanciaSectionData = await getBioimpedanciaSectionData()
        setData(bioimpedanciaSectionData || {
          header: {
            badge: 'Bioimpedância',
            title: 'Avaliação Corporal Completa',
            description: 'Descubra todos os detalhes da sua composição corporal com nossa avaliação de bioimpedância de alta precisão.',
          },
          displaySettings: {
            showOnHomepage: true,
            maxItemsToShow: 2,
          }
        })
        setError(null)
      } catch (err) {
        console.error('Error fetching bioimpedancia section data:', err)
        setError('Erro ao carregar dados da seção de bioimpedância')
        // Fallback data
        setData({
          header: {
            badge: 'Bioimpedância',
            title: 'Avaliação Corporal Completa',
            description: 'Descubra todos os detalhes da sua composição corporal com nossa avaliação de bioimpedância de alta precisão.',
          },
          displaySettings: {
            showOnHomepage: true,
            maxItemsToShow: 2,
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useHeroSectionData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const heroSectionData = await getHeroSectionData()
        setData(heroSectionData || {
          title: 'Transforme seu corpo e sua vida',
          description: 'A maior rede de academias de Manaus, com planos flexíveis e sem fidelidade para você treinar do seu jeito.',
          priceTag: {
            text: 'Planos a partir de',
            price: 'R$ 119,90',
            showIcon: true,
          },
          cta: {
            text: 'MATRICULE-SE AGORA',
            url: '/planos',
            showArrow: true,
          },
          overlay: {
            enabled: true,
            opacity: 'from-black/70 via-black/50 to-black/30',
          },
          displaySettings: {
            showOnHomepage: true,
            showPriceTag: true,
          }
        })
        setError(null)
      } catch (err) {
        console.error('Error fetching hero section data:', err)
        setError('Erro ao carregar dados da seção hero')
        // Fallback data
        setData({
          title: 'Transforme seu corpo e sua vida',
          description: 'A maior rede de academias de Manaus, com planos flexíveis e sem fidelidade para você treinar do seu jeito.',
          priceTag: {
            text: 'Planos a partir de',
            price: 'R$ 119,90',
            showIcon: true,
          },
          cta: {
            text: 'MATRICULE-SE AGORA',
            url: '/planos',
            showArrow: true,
          },
          overlay: {
            enabled: true,
            opacity: 'from-black/70 via-black/50 to-black/30',
          },
          displaySettings: {
            showOnHomepage: true,
            showPriceTag: true,
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function usePlanosSectionData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const planosSectionData = await getPlanosSectionData()
        setData(planosSectionData || {
          header: {
            title: 'Conheça nossos planos',
            highlightWord: 'planos',
            description: 'Escolha o plano que cresce com você e se adapta às suas necessidades de treino.',
          },
          featuredPlans: [
            {
              nome: "TRADICIONAL",
              preco: "119,90",
              periodo: "mês",
              descricao: "Treine em todas as unidades Tradicionais, incluindo as Tradicionais Climatizadas.",
              beneficios: [
                "Sem fidelidade",
                "Sem taxa de cancelamento",
                "Sem taxa de manutenção",
                "Sem taxa de anuidade",
                "Acesso ao app Live Academia",
                "Aulas coletivas",
                "Climatização (apenas unidades Torquato Bemol e Tiradentes)",
                "Atendimento aos domingos (consultar unidade)"
              ],
              gradient: "from-zinc-700 to-zinc-900",
              popular: false,
              destaque: false,
              numero: "01",
              setup: "Setup em 24 horas",
              ctaText: "Matricule-se",
              order: 1,
              active: true
            },
            {
              nome: "DIAMANTE",
              preco: "159,90",
              periodo: "mês",
              descricao: "Treine em todas as unidades da rede em Manaus, exceto Morada do Sol e Alphaville.",
              beneficios: [
                "Sem fidelidade",
                "Sem taxa de cancelamento",
                "Sem taxa de manutenção",
                "Sem taxa de anuidade",
                "Acesso ao app Live Academia",
                "Espaço Relax",
                "Espaço Yoga",
                "Espaço Pose",
                "Acesso ao Studio de Bike",
                "Aulas coletivas",
                "Climatização",
                "Atendimento aos domingos"
              ],
              gradient: "from-amber-500 to-yellow-600",
              popular: true,
              destaque: true,
              badge: "O mais vendido",
              numero: "02",
              setup: "Setup em 12 horas",
              ctaText: "Matricule-se",
              order: 2,
              active: true
            }
          ],
          footnote: {
            text: 'Os preços, serviços e condições promocionais podem variar de acordo com a unidade escolhida.',
            linkText: 'Ver comparação detalhada',
            linkUrl: '#',
          },
          displaySettings: {
            showOnHomepage: true,
            showBackgroundEffects: true,
            showFootnote: true,
            maxPlansToShow: 2,
          }
        })
        setError(null)
      } catch (err) {
        console.error('Error fetching planos section data:', err)
        setError('Erro ao carregar dados da seção de planos')
        // Fallback data já está definida acima
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useModalidadesSectionData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const modalidadesSectionData = await getModalidadesSectionData()
        setData(modalidadesSectionData)
        setError(null)
      } catch (err) {
        console.error('Error fetching modalidades section data:', err)
        setError('Erro ao carregar dados da seção de modalidades')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useWellhubSectionData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const wellhubSectionData = await getWellhubSectionData()
        setData(wellhubSectionData)
        setError(null)
      } catch (err) {
        console.error('Error fetching wellhub section data:', err)
        setError('Erro ao carregar dados da seção Wellhub')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useTestimonialSectionData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const testimonialSectionData = await getTestimonialSectionData()
        setData(testimonialSectionData)
        setError(null)
      } catch (err) {
        console.error('Error fetching testimonial section data:', err)
        setError('Erro ao carregar dados da seção de depoimentos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function usePlanosPageData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const planosPageData = await getPlanosPageData()
        setData(planosPageData)
        setError(null)
      } catch (err) {
        console.error('Error fetching planos page data:', err)
        setError('Erro ao carregar dados da página de planos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useUnidadesSectionData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const unidadesSectionData = await getUnidadesSectionData()
        setData(unidadesSectionData || {
          header: {
            title: 'Encontre a Live mais perto de você',
            description: 'Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.',
          },
          cta: {
            text: 'VER TODAS AS UNIDADES',
            url: '/unidades',
          },
          displaySettings: {
            showOnHomepage: true,
            layout: 'carousel',
            maxUnits: 0,
            showLocationButton: true,
            locationButtonText: 'Encontrar unidade mais próxima de você',
            autoPlay: true,
            autoPlayInterval: 5000,
            backgroundColor: '',
          },
        })
        setError(null)
      } catch (err) {
        console.error('Error fetching unidades section data:', err)
        setError('Erro ao carregar dados da seção de unidades')
        // Fallback data
        setData({
          header: {
            title: 'Encontre a Live mais perto de você',
            description: 'Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.',
          },
          cta: {
            text: 'VER TODAS AS UNIDADES',
            url: '/unidades',
          },
          displaySettings: {
            showOnHomepage: true,
            layout: 'carousel',
            maxUnits: 0,
            showLocationButton: true,
            locationButtonText: 'Encontrar unidade mais próxima de você',
            autoPlay: true,
            autoPlayInterval: 5000,
            backgroundColor: '',
          },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useUnidadesPageData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const unidadesPageData = await getUnidadesPageData()
        setData(unidadesPageData)
        setError(null)
      } catch (err) {
        console.error('Error fetching unidades page data:', err)
        setError('Erro ao carregar dados da página de unidades')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useNavigationData() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const navigationData = await getNavigationData()
        setData(navigationData || {
          header: {
            logo: {
              showUnitName: true
            },
            navigation: [
              { label: 'Sobre', type: 'internal', url: '/sobre-nos', order: 1, showOnMobile: true, showOnDesktop: true },
              { label: 'Benefícios', type: 'scroll', url: 'beneficios', order: 2, showOnMobile: true, showOnDesktop: true },
              { label: 'Unidades', type: 'internal', url: '/unidades', order: 3, showOnMobile: true, showOnDesktop: true },
              { label: 'Aulas Coletivas', type: 'internal', url: '/aulas-coletivas', order: 4, showOnMobile: true, showOnDesktop: true },
              { label: 'Day Use', type: 'internal', url: '/day-use', order: 5, showOnMobile: true, showOnDesktop: true },
              { label: 'Planos', type: 'internal', url: '/planos', order: 6, showOnMobile: true, showOnDesktop: true },
              { label: 'Contato', type: 'scroll', url: 'contato', order: 7, showOnMobile: true, showOnDesktop: true },
            ],
            ctaButton: {
              text: 'Matricule-se',
              mobileText: 'Matricule-se Agora',
              url: '/planos',
              show: true
            },
            mobileMenu: {
              openText: 'Menu',
              closeText: 'Close'
            }
          },
          footer: {
            about: {
              title: 'Live Academia',
              description: 'A maior rede de academias de Manaus, oferecendo estrutura completa e planos flexíveis para sua jornada fitness.'
            },
            sections: [
              {
                title: 'Navegação',
                order: 1,
                links: [
                  { label: 'Sobre Nós', url: '/sobre-nos', external: false },
                  { label: 'Unidades', url: '/unidades', external: false },
                  { label: 'Planos', url: '/planos', external: false },
                  { label: 'Contato', url: '/contato', external: false },
                ]
              },
              {
                title: 'Serviços',
                order: 2,
                links: [
                  { label: 'Aulas Coletivas', url: '/aulas-coletivas', external: false },
                  { label: 'Day Use', url: '/day-use', external: false },
                  { label: 'Personal Trainer', url: '/personal', external: false },
                  { label: 'Avaliação Física', url: '/avaliacao', external: false },
                ]
              },
              {
                title: 'Suporte',
                order: 3,
                links: [
                  { label: 'Central de Ajuda', url: '/ajuda', external: false },
                  { label: 'Trabalhe Conosco', url: '/trabalhe-conosco', external: false },
                  { label: 'WhatsApp', url: 'https://wa.me/5592999999999', external: true },
                ]
              }
            ],
            socialMedia: {
              title: 'Nos siga',
              links: []
            },
            copyright: {
              text: '© 2024 Live Academia. Todos os direitos reservados.',
              companyName: 'Live Academia'
            }
          }
        })
        setError(null)
      } catch (err) {
        console.error('Error fetching navigation data:', err)
        setError('Erro ao carregar dados da navegação')
        // Fallback data já está definida acima
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
