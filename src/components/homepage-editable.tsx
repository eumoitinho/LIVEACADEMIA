"use client"

import { useHomepageData, useUnitsData } from "@/hooks/use-sanity-data"
import HeroSectionEditable from "@/components/sections/hero-section-editable"
import AboutSectionEditable from "@/components/sections/about-section-editable"
import BeneficiosSectionEditable from "@/components/sections/beneficios-section-editable"
import PlanosSectionEditable from "@/components/sections/planos-section-editable"
import UnidadesCarouselEditable from "@/components/shared/unidades-carousel-editable"
import FloatingButton from "@/components/layout/floating-button"
import TestimonialSection from "@/components/sections/testimonial-section"
import AppSectionEditable from "@/components/sections/app-section-editable"
import ModalidadesSection from "@/components/sections/modalidades-section"
import WellhubSection from "@/components/sections/wellhub-section"
import BioimpedanciaSection from "@/components/sections/bioimpedancia-section"
import EstruturaSection from "@/components/sections/estrutura-section"

// Dados de fallback para usar APENAS quando loading=false e data=null
const fallbackAbout = {
  badge: "Sobre a Live Academia",
  title: "Seu treino, suas regras",
  description: "A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.",
  stats: [],
  highlights: []
}

const fallbackPlanos = {
  badge: "Planos",
  title: "Escolha o plano ideal para você",
  description: "Planos flexíveis sem fidelidade. Cancele quando quiser, sem multas ou taxas.",
  plans: []
}

export default function HomepageEditable() {
  const { data: homepageData, loading: homepageLoading, error: homepageError } = useHomepageData()
  const { data: unitsData, loading: unitsLoading } = useUnitsData()

  // Mostrar loading state enquanto carrega dados principais
  if (homepageLoading) {
    return (
      <main className="min-h-screen relative bg-black">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Carregando...</p>
          </div>
        </div>
      </main>
    )
  }

  // Só usar fallback quando loading terminou E não há dados
  const aboutData = homepageData?.about || fallbackAbout
  const planosData = homepageData?.planos || fallbackPlanos

  return (
    <main className="min-h-screen relative">
      {/* Hero Section */}
      {homepageData?.hero && (
        <HeroSectionEditable data={homepageData.hero} />
      )}

      {/* About Section */}
      <AboutSectionEditable data={aboutData} />

      {/* Units Carousel */}
      <UnidadesCarouselEditable />

      {/* Plans Section */}
      <PlanosSectionEditable data={planosData} />

      {/* Benefits Section */}
      <BeneficiosSectionEditable />

      {/* Structure Section */}
      <EstruturaSection />

      {/* Modalities Section */}
      <ModalidadesSection />

      {/* App Section */}
      <AppSectionEditable />

     
      {/* Bioimpedancia Section */}
      <BioimpedanciaSection />

      {/* Testimonials Section */}
      {homepageData?.testimonials && (
        <TestimonialSection />
      )}

      {/* Floating Button */}
      <FloatingButton />
    </main>
  )
}
