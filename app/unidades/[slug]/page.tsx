import { notFound } from "next/navigation"
import { locations } from '@/lib/config/locations'
import UnidadeContent from "./components/unidade-content"

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
  const unidade = locations.find(loc => loc.id === slug)

  if (!unidade || unidade.type === "inauguracao") {
    notFound()
  }

  const data = unidadeData[unidade.type as keyof typeof unidadeData]

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