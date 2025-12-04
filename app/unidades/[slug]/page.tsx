import { notFound } from "next/navigation"
import { locations } from '@/src/lib/config/locations'
import { getUnits, getBeneficiosSectionData, getModalidadesSectionData } from '@/lib/sanity'
import UnidadeContent from "./components/unidade-content"
import type { Unit } from '../../../types/sanity'

// Dados específicos por unidade (modalidades, benefícios, fotos) - FALLBACK apenas
const unidadeData = {
  // Tradicional
  tradicional: {
    modalidades: [
      "Musculação",
      "Aulas Coletivas",
      "Treino Funcional",
      "Cardio",
      "Alongamento"
    ],
    beneficios: [
      "Sem taxa de matrícula",
      "Sem fidelidade",
      "Acesso via app",
      "Orientação profissional",
      "Equipamentos modernos"
    ],
    fotos: [
      "/images/academia-1.webp",
      "/images/academia-2.webp",
      "/images/academia-3.webp",
      "/images/academia-4.webp"
    ]
  },
  // Premium
  premium: {
    modalidades: [
      "Musculação",
      "Aulas Coletivas",
      "Treino Funcional",
      "Cardio",
      "Alongamento",
      "Pilates"
    ],
    beneficios: [
      "Sem taxa de matrícula",
      "Sem fidelidade",
      "Ambiente climatizado",
      "Acesso via app",
      "Orientação profissional",
      "Equipamentos premium",
      "Vestiários modernos"
    ],
    fotos: [
      "/images/academia-1.webp",
      "/images/academia-2.webp",
      "/images/academia-3.webp",
      "/images/academia-4.webp"
    ]
  },
  // Diamante
  diamante: {
    modalidades: [
      "Musculação",
      "Aulas Coletivas",
      "Treino Funcional",
      "Cardio",
      "Alongamento",
      "Pilates",
      "Yoga",
      "Indoor Cycling",
      "Dança",
      "Pose"
    ],
    beneficios: [
      "Sem taxa de matrícula",
      "Sem fidelidade",
      "Ambiente climatizado",
      "Espaço Relax",
      "Espaço Yoga",
      "Studio de Bike",
      "Espaço Pose",
      "Acesso via app",
      "Orientação profissional",
      "Equipamentos premium",
      "Vestiários luxuosos"
    ],
    fotos: [
      "/images/academia-1.webp",
      "/images/academia-2.webp",
      "/images/academia-3.webp",
      "/images/academia-4.webp"
    ]
  }
}

interface PageProps { params: Promise<{ slug: string }> }

export default async function UnidadePage(props: PageProps) {
  const { slug } = await props.params

  // Fetch from Sanity - unidades e seções globais (modalidades e benefícios com fotos)
  const [sanityUnits, modalidadesSectionData, beneficiosSectionData] = await Promise.all([
    getUnits(),
    getModalidadesSectionData(),
    getBeneficiosSectionData()
  ])
  
  const sanityUnit = sanityUnits.find((unit: Unit) => unit.slug === slug)

  // Fallback to static locations - tentar match exato ou normalizado
  const normalizedSlug = slug.toLowerCase().replace(/-/g, '_').replace(/_/g, '-')
  const staticUnidade = locations.find(loc => 
    loc.id === slug || 
    loc.id === normalizedSlug ||
    loc.id.replace(/-/g, '') === slug.replace(/-/g, '') // match sem hífens
  )

  if (!sanityUnit && (!staticUnidade || staticUnidade.type === "inauguracao")) {
    notFound()
  }

  // Determinar foto principal com fallback robusto
  const getSanityPhoto = () => {
    if (sanityUnit?.photo?.asset?.url) return sanityUnit.photo.asset.url
    if (sanityUnit?.backgroundImage?.asset?.url) return sanityUnit.backgroundImage.asset.url
    if (sanityUnit?.images?.[0]?.asset?.url) return sanityUnit.images[0].asset.url
    return null
  }
  
  const sanityPhoto = getSanityPhoto()
  const staticPhoto = staticUnidade?.photo
  const finalPhoto = sanityPhoto || staticPhoto || '/images/fachada.jpg'

  // Merge Sanity data with static data (Sanity takes precedence)
  const unidade = sanityUnit ? {
    ...staticUnidade,
    id: sanityUnit.slug || slug,
    name: sanityUnit.name,
    address: sanityUnit.address,
    type: sanityUnit.type as 'tradicional' | 'premium' | 'diamante',
    photo: finalPhoto,
    features: sanityUnit.services || staticUnidade?.features || [],
    hours: sanityUnit.openingHours || staticUnidade?.hours || '',
    phone: sanityUnit.phone,
    whatsapp: sanityUnit.whatsapp,
    email: sanityUnit.email,
    latitude: sanityUnit.latitude || -3.1190275,
    longitude: sanityUnit.longitude || -60.0217314,
    images: sanityUnit.images?.map((img: any) => img.asset?.url).filter(Boolean) || [],
    description: sanityUnit.description,
    // Modalidades do Sanity (referências) - vazio se não configurado
    modalidades: sanityUnit.modalidades?.map((m: any) => m.name).filter(Boolean) || [],
    // Benefícios do Sanity (referências) - vazio se não configurado
    beneficios: sanityUnit.beneficios?.map((b: any) => b.title).filter(Boolean) || [],
    planos: sanityUnit.planos?.map((p: any) => ({
      name: p.nome,
      price: p.preco,
      codigo: p.codigo,
      destaque: p.destaque,
      badge: p.badge,
    })) || [],
    planosConfig: sanityUnit.planosConfig || [],
    filtroPlanos: sanityUnit.filtroPlanos || {}
  } : staticUnidade ? {
    ...staticUnidade,
    latitude: -3.1190275,
    longitude: -60.0217314,
  } : {
    id: slug,
    name: 'Unidade',
    address: 'Manaus, AM',
    hours: 'Seg-Sex: 5h30-22h',
    features: [],
    type: 'tradicional',
    latitude: -3.1190275,
    longitude: -60.0217314,
  }

  if (!unidade) {
    notFound()
  }

  // Fallback estático por tipo de unidade
  const staticData = unidadeData[unidade.type as keyof typeof unidadeData] || unidadeData.tradicional
  
  // MODALIDADES: Usar dados da seção modalidades do Sanity (com fotos)
  // Formato: { title, image: { asset: { url } } }
  const modalidadesFromSection = modalidadesSectionData?.featuredModalities
    ?.filter((m: any) => m.active !== false)
    ?.map((m: any) => ({
      name: m.title,
      subtitle: m.subtitle,
      description: m.description,
      image: m.image?.asset?.url || null
    })) || []

  // BENEFÍCIOS: Usar dados da seção benefícios do Sanity (com fotos)
  // Formato: { title, description, icon, color, image: { asset: { url } } }
  const beneficiosFromSection = beneficiosSectionData?.items
    ?.map((b: any) => ({
      title: b.title,
      description: b.description,
      icon: b.icon,
      color: b.color,
      image: b.image?.asset?.url || null
    })) || []
  
  const data = {
    // Modalidades da seção do Sanity (com fotos) ou fallback estático
    modalidades: modalidadesFromSection.length > 0 
      ? modalidadesFromSection 
      : staticData.modalidades.map((name: string) => ({ name, image: null })),
    // Benefícios da seção do Sanity (com fotos) ou fallback estático
    beneficios: beneficiosFromSection.length > 0 
      ? beneficiosFromSection 
      : staticData.beneficios.map((title: string) => ({ title, image: null })),
    // Fotos genéricas como fallback adicional
    fotos: staticData.fotos
  }

  return <UnidadeContent unidade={unidade} data={data} />
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  // Gerar apenas para unidades ativas (não em inauguração)
  return locations
    .filter(location => location.type !== "inauguracao")
    .map((location) => ({
      slug: location.id,
    }))
}