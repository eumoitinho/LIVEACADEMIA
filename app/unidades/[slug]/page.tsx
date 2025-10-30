import { notFound } from "next/navigation"
import { locations } from '@/src/lib/config/locations'
import { getUnits } from '@/lib/sanity'
import UnidadeContent from "./components/unidade-content"
import type { Unit } from '../../../types/sanity'

// Dados específicos por unidade (modalidades, benefícios, fotos)
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
    ]
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

  if (!sanityUnit && (!staticUnidade || staticUnidade.type === "inauguracao")) {
    notFound()
  }

  // Merge Sanity data with static data (Sanity takes precedence)
  const unidade = sanityUnit ? {
    ...staticUnidade,
    id: sanityUnit.slug || slug,
    name: sanityUnit.name,
    address: sanityUnit.address,
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
    planos: sanityUnit.planos || []
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

  const data = {
    ...unidadeData[unidade.type as keyof typeof unidadeData] || unidadeData.tradicional,
    // Override static photos with Sanity images if available
    fotos: sanityUnit?.images?.map((img: any) => img.asset?.url).filter(Boolean) || unidadeData[unidade.type as keyof typeof unidadeData]?.fotos || unidadeData.tradicional.fotos
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