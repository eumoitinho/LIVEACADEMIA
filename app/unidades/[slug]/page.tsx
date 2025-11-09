import { notFound } from "next/navigation"
import { locations } from '@/src/lib/config/locations'
import { getUnits } from '@/src/lib/sanity'
import UnidadeContent from "./components/unidade-content"
import type { Unit } from '../../../types/sanity'
import { unidadesMapData } from './utils/map-unidades-data'

// Dados específicos por unidade (modalidades, benefícios, fotos)
const unidadeData = {
  // Tradicional
  tradicional: {
    modalidades: [
      {
        nome: "Musculação",
        descricao: "Equipamentos de última geração para fortalecimento",
        imagem: "/images/modalidades/musculacao.jpg"
      },
      {
        nome: "Aulas Coletivas",
        descricao: "Energia em grupo para motivar seu treino",
        imagem: "/images/modalidades/aulas-coletivas.jpg"
      },
      {
        nome: "Treino Funcional",
        descricao: "Movimentos naturais para o dia a dia",
        imagem: "/images/modalidades/treino-funcional.jpg"
      },
      {
        nome: "Cardio",
        descricao: "Queime calorias e melhore seu condicionamento",
        imagem: "/images/modalidades/cardio.jpg"
      },
      {
        nome: "Alongamento",
        descricao: "Flexibilidade e relaxamento muscular",
        imagem: "/images/modalidades/alongamento.jpg"
      }
    ],
    beneficios: [
      {
        titulo: "Sem taxa de matrícula",
        descricao: "Comece a treinar sem custos adicionais",
        imagem: "/images/beneficios/sem-taxa.jpg"
      },
      {
        titulo: "Sem fidelidade",
        descricao: "Liberdade total para cancelar quando quiser",
        imagem: "/images/beneficios/sem-fidelidade.jpg"
      },
      {
        titulo: "Acesso via app",
        descricao: "Controle completo na palma da sua mão",
        imagem: "/images/beneficios/app.jpg"
      },
      {
        titulo: "Orientação profissional",
        descricao: "Acompanhamento especializado para seus resultados",
        imagem: "/images/beneficios/orientacao.jpg"
      },
      {
        titulo: "Equipamentos modernos",
        descricao: "Tecnologia de ponta para seu treino",
        imagem: "/images/beneficios/equipamentos.jpg"
      }
    ],
    fotos: [
      "/images/academia-1.webp",
      "/images/academia-2.webp",
      "/images/academia-3.webp",
      "/images/academia-4.webp"
    ],
    heroBackground: "/images/unidades/tradicional-hero.jpg"
  },
  // Premium
  premium: {
    modalidades: [
      {
        nome: "Musculação",
        descricao: "Equipamentos de última geração para fortalecimento",
        imagem: "/images/modalidades/musculacao.jpg"
      },
      {
        nome: "Aulas Coletivas",
        descricao: "Energia em grupo para motivar seu treino",
        imagem: "/images/modalidades/aulas-coletivas.jpg"
      },
      {
        nome: "Treino Funcional",
        descricao: "Movimentos naturais para o dia a dia",
        imagem: "/images/modalidades/treino-funcional.jpg"
      },
      {
        nome: "Cardio",
        descricao: "Queime calorias e melhore seu condicionamento",
        imagem: "/images/modalidades/cardio.jpg"
      },
      {
        nome: "Alongamento",
        descricao: "Flexibilidade e relaxamento muscular",
        imagem: "/images/modalidades/alongamento.jpg"
      },
      {
        nome: "Pilates",
        descricao: "Fortalecimento do core e flexibilidade",
        imagem: "/images/modalidades/pilates.jpg"
      }
    ],
    beneficios: [
      {
        titulo: "Sem taxa de matrícula",
        descricao: "Comece a treinar sem custos adicionais",
        imagem: "/images/beneficios/sem-taxa.jpg"
      },
      {
        titulo: "Sem fidelidade",
        descricao: "Liberdade total para cancelar quando quiser",
        imagem: "/images/beneficios/sem-fidelidade.jpg"
      },
      {
        titulo: "Ambiente climatizado",
        descricao: "Conforto térmico em todas as estações",
        imagem: "/images/beneficios/climatizado.jpg"
      },
      {
        titulo: "Acesso via app",
        descricao: "Controle completo na palma da sua mão",
        imagem: "/images/beneficios/app.jpg"
      },
      {
        titulo: "Orientação profissional",
        descricao: "Acompanhamento especializado para seus resultados",
        imagem: "/images/beneficios/orientacao.jpg"
      },
      {
        titulo: "Equipamentos premium",
        descricao: "Tecnologia de última geração",
        imagem: "/images/beneficios/equipamentos-premium.jpg"
      },
      {
        titulo: "Vestiários modernos",
        descricao: "Comodidade e higiene em primeiro lugar",
        imagem: "/images/beneficios/vestiarios.jpg"
      }
    ],
    fotos: [
      "/images/academia-1.webp",
      "/images/academia-2.webp",
      "/images/academia-3.webp",
      "/images/academia-4.webp"
    ],
    heroBackground: "/images/unidades/premium-hero.jpg"
  },
  // Diamante
  diamante: {
    modalidades: [
      {
        nome: "Musculação",
        descricao: "Equipamentos de última geração para fortalecimento",
        imagem: "/images/modalidades/musculacao.jpg"
      },
      {
        nome: "Aulas Coletivas",
        descricao: "Energia em grupo para motivar seu treino",
        imagem: "/images/modalidades/aulas-coletivas.jpg"
      },
      {
        nome: "Treino Funcional",
        descricao: "Movimentos naturais para o dia a dia",
        imagem: "/images/modalidades/treino-funcional.jpg"
      },
      {
        nome: "Cardio",
        descricao: "Queime calorias e melhore seu condicionamento",
        imagem: "/images/modalidades/cardio.jpg"
      },
      {
        nome: "Alongamento",
        descricao: "Flexibilidade e relaxamento muscular",
        imagem: "/images/modalidades/alongamento.jpg"
      },
      {
        nome: "Pilates",
        descricao: "Fortalecimento do core e flexibilidade",
        imagem: "/images/modalidades/pilates.jpg"
      },
      {
        nome: "Yoga",
        descricao: "Equilíbrio entre corpo e mente",
        imagem: "/images/modalidades/yoga.jpg"
      },
      {
        nome: "Indoor Cycling",
        descricao: "Pedaladas intensas ao som de música envolvente",
        imagem: "/images/modalidades/indoor-cycling.jpg"
      },
      {
        nome: "Dança",
        descricao: "Ritmo e diversão para queimar calorias",
        imagem: "/images/modalidades/danca.jpg"
      },
      {
        nome: "Pose",
        descricao: "Posturas e movimentos para flexibilidade",
        imagem: "/images/modalidades/pose.jpg"
      }
    ],
    beneficios: [
      {
        titulo: "Sem taxa de matrícula",
        descricao: "Comece a treinar sem custos adicionais",
        imagem: "/images/beneficios/sem-taxa.jpg"
      },
      {
        titulo: "Sem fidelidade",
        descricao: "Liberdade total para cancelar quando quiser",
        imagem: "/images/beneficios/sem-fidelidade.jpg"
      },
      {
        titulo: "Ambiente climatizado",
        descricao: "Conforto térmico em todas as estações",
        imagem: "/images/beneficios/climatizado.jpg"
      },
      {
        titulo: "Espaço Relax",
        descricao: "Área exclusiva para relaxamento e descanso",
        imagem: "/images/beneficios/espaco-relax.jpg"
      },
      {
        titulo: "Espaço Yoga",
        descricao: "Ambiente zen para práticas contemplativas",
        imagem: "/images/beneficios/espaco-yoga.jpg"
      },
      {
        titulo: "Studio de Bike",
        descricao: "Cycling indoor com energia contagiante",
        imagem: "/images/beneficios/studio-bike.jpg"
      },
      {
        titulo: "Espaço Pose",
        descricao: "Área dedicada para poses e alongamento",
        imagem: "/images/beneficios/espaco-pose.jpg"
      },
      {
        titulo: "Acesso via app",
        descricao: "Controle completo na palma da sua mão",
        imagem: "/images/beneficios/app.jpg"
      },
      {
        titulo: "Orientação profissional",
        descricao: "Acompanhamento especializado para seus resultados",
        imagem: "/images/beneficios/orientacao.jpg"
      },
      {
        titulo: "Equipamentos premium",
        descricao: "Tecnologia de última geração",
        imagem: "/images/beneficios/equipamentos-premium.jpg"
      },
      {
        titulo: "Vestiários luxuosos",
        descricao: "Máximo conforto e sofisticação",
        imagem: "/images/beneficios/vestiarios-luxuosos.jpg"
      }
    ],
    fotos: [
      "/images/academia-1.webp",
      "/images/academia-2.webp",
      "/images/academia-3.webp",
      "/images/academia-4.webp"
    ],
    heroBackground: "/images/unidades/diamante-hero.jpg"
  }
}

interface PageProps { params: Promise<{ slug: string }> }

export default async function UnidadePage(props: PageProps) {
  const { slug } = await props.params

  // Fetch from Sanity first
  const sanityUnits = await getUnits()
  const sanityUnit = sanityUnits.find((unit: Unit) => unit.slug === slug)

  // Fallback to static locations
  const staticUnidade = locations.find(loc => loc.id === slug)

  // Se a unidade está no Sanity e está ativa, permitir acesso mesmo que não esteja em locations
  // Se não está no Sanity, verificar se está em locations e não é inauguração
  if (!sanityUnit && (!staticUnidade || staticUnidade.type === "inauguracao")) {
    notFound()
  }

  // Se está no Sanity mas não está ativa, não permitir acesso
  if (sanityUnit && !sanityUnit.active) {
    notFound()
  }

  // Get correct address and mapLink from unidades.json data
  const unidadeMapInfo = unidadesMapData[slug as keyof typeof unidadesMapData]

  // Merge Sanity data with static data (Sanity takes precedence)
  const unidade = sanityUnit ? {
    ...staticUnidade,
    id: sanityUnit.slug || slug,
    name: sanityUnit.name,
    address: sanityUnit.address || unidadeMapInfo?.endereco || staticUnidade?.address,
    type: sanityUnit.type as 'tradicional' | 'premium' | 'diamante',
    photo: sanityUnit.photo?.asset?.url || sanityUnit.backgroundImage?.asset?.url || sanityUnit.images?.[0]?.asset?.url || staticUnidade?.photo || '/images/fachada.jpg',
    features: sanityUnit.services || staticUnidade?.features || [],
    hours: sanityUnit.openingHours || staticUnidade?.hours || '',
    phone: sanityUnit.phone,
    whatsapp: sanityUnit.whatsapp,
    email: sanityUnit.email,
    latitude: sanityUnit.latitude || -3.1190275,
    longitude: sanityUnit.longitude || -60.0217314,
    images: sanityUnit.images?.map((img: any) => img.asset?.url).filter(Boolean) || [],
    description: sanityUnit.description,
    planos: sanityUnit.planos || [],
    planosPermitidos: sanityUnit.planosPermitidos || [],
    mapLink: unidadeMapInfo?.mapLink || staticUnidade?.mapLink || ''
  } : staticUnidade ? {
    ...staticUnidade,
    address: unidadeMapInfo?.endereco || staticUnidade.address,
    mapLink: unidadeMapInfo?.mapLink || staticUnidade.mapLink || '',
    latitude: -3.1190275,
    longitude: -60.0217314,
  } : {
    id: slug,
    name: 'Unidade',
    address: unidadeMapInfo?.endereco || 'Manaus, AM',
    hours: 'Seg-Sex: 5h30-22h',
    features: [],
    type: 'tradicional',
    latitude: -3.1190275,
    longitude: -60.0217314,
    mapLink: unidadeMapInfo?.mapLink || ''
  }

  if (!unidade) {
    notFound()
  }

  const data = {
    ...unidadeData[unidade.type as keyof typeof unidadeData] || unidadeData.tradicional,
    // Override static photos with Sanity images if available
    fotos: sanityUnit?.images?.map((img: any) => img.asset?.url).filter(Boolean) || unidadeData[unidade.type as keyof typeof unidadeData]?.fotos || unidadeData.tradicional.fotos,
    // Override modalidades with Sanity data if available
    modalidades: sanityUnit?.modalidades?.map((modalidade: any) => ({
      nome: modalidade.name,
      descricao: modalidade.description,
      imagem: modalidade.image?.asset?.url || '/images/modalidades/default.jpg'
    })) || unidadeData[unidade.type as keyof typeof unidadeData]?.modalidades || unidadeData.tradicional.modalidades,
    // Override beneficios with Sanity data if available
    beneficios: sanityUnit?.beneficios?.map((beneficio: any) => ({
      titulo: beneficio.title,
      descricao: beneficio.description,
      imagem: beneficio.image?.asset?.url || '/images/beneficios/default.jpg'
    })) || unidadeData[unidade.type as keyof typeof unidadeData]?.beneficios || unidadeData.tradicional.beneficios,
    // Override hero background with Sanity data if available
    heroBackground: sanityUnit?.heroBackground?.asset?.url || unidadeData[unidade.type as keyof typeof unidadeData]?.heroBackground || unidadeData.tradicional.heroBackground
  }

  return <UnidadeContent unidade={unidade} data={data} />
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    // Buscar unidades do Sanity que estão ativas
    const sanityUnits = await getUnits()
    const sanitySlugs = sanityUnits
      .filter((unit: Unit) => unit.active && unit.slug && typeof unit.slug === 'string')
      .map((unit: Unit) => unit.slug as string)

    // Também incluir unidades estáticas (não em inauguração) que não estão no Sanity
    const staticSlugs = locations
      .filter(location => location.type !== "inauguracao" && location.id && typeof location.id === 'string')
      .map((location) => location.id as string)

    // Combinar e remover duplicatas
    const allSlugs = [...sanitySlugs, ...staticSlugs]
    const uniqueSlugs = Array.from(new Set(allSlugs.filter(slug => typeof slug === 'string')))

    return uniqueSlugs.map((slug: string) => ({
      slug: String(slug),
    }))
  } catch (error) {
    console.error('Error generating static params for unidades:', error)
    // Fallback para apenas unidades estáticas
    return locations
      .filter(location => location.type !== "inauguracao")
      .map((location) => ({
        slug: String(location.id),
      }))
  }
}