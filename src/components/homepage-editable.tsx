"use client"

import { useHomepageData, useUnitsData } from "../../hooks/use-sanity-data"
import HeroSectionEditable from "@/components/sections/hero-section-editable"
import AboutSectionEditable from "@/components/sections/about-section-editable"
import BeneficiosSectionEditable from "@/components/sections/beneficios-section-editable"
import PlanosSectionEditable from "@/components/sections/planos-section-editable"
import UnidadesCarouselEditable from "@/components/shared/unidades-carousel-editable"
import TestimonialSection from "@/components/sections/testimonial-section"
import AppSectionEditable from "@/components/sections/app-section-editable"
import ModalidadesSection from "@/components/sections/modalidades-section"
import WellhubSection from "@/components/sections/wellhub-section"
import BioimpedanciaSection from "@/components/sections/bioimpedancia-section"
import EstruturaSection from "@/components/sections/estrutura-section"

export default function HomepageEditable() {
  const { data: homepageData, loading: homepageLoading, error: homepageError } = useHomepageData()
  const { data: unitsData, loading: unitsLoading } = useUnitsData()

  // Se houver erro ou dados não carregarem, use componentes estáticos originais
  const useFallback = homepageError || (!homepageLoading && !homepageData)

  return (
    <main className="min-h-screen relative">
      {/* Hero Section */}
      {homepageData?.hero && (
        <HeroSectionEditable data={homepageData.hero} />
      )}

      {/* About Section */}
      <AboutSectionEditable data={homepageData?.about || { badge: "Sobre a Live Academia", title: "Seu treino, suas regras", description: "A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.", stats: [], highlights: [] }} />

      {/* Units Carousel */}
      <UnidadesCarouselEditable />

      {/* Plans Section */}
      <PlanosSectionEditable data={homepageData?.planos || { badge: "Planos", title: "Escolha o plano ideal para você", description: "Planos flexíveis sem fidelidade. Cancele quando quiser, sem multas ou taxas.", plans: [] }} />

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

    </main>
  )
}
