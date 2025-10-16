"use client"

import { useHomepageData, useUnitsData } from "../../hooks/use-sanity-data"
import HeroSectionEditable from "@/components/sections/hero-section-editable"
import AboutSectionEditable from "@/components/sections/about-section-editable"
import BeneficiosSectionEditable from "@/components/sections/beneficios-section-editable"
import PlanosSectionEditable from "@/components/sections/planos-section-editable"
import UnidadesCarouselEditable from "@/components/shared/unidades-carousel-editable"
import FloatingButton from "@/components/layout/floating-button"
import TestimonialSection from "@/components/sections/testimonial-section"
import AppSection from "@/components/sections/app-section"
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
      {homepageData?.about && (
        <AboutSectionEditable data={homepageData.about} />
      )}

      {/* Units Carousel */}
      {unitsData && unitsData.length > 0 && (
        <UnidadesCarouselEditable />
      )}

      {/* Plans Section */}
      {homepageData?.planos && (
        <PlanosSectionEditable data={homepageData.planos} />
      )}

      {/* Benefits Section */}
      {homepageData?.beneficios && (
        <BeneficiosSectionEditable data={homepageData.beneficios} />
      )}

      {/* Structure Section */}
      <EstruturaSection />

      {/* Modalities Section */}
      <ModalidadesSection />

      {/* App Section */}
      <AppSection />

     
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
