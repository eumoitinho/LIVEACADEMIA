import React from 'react'
import HeroSection from '@/components/hero-section'
import AboutSection from '@/components/about-section'
import UnidadesCarousel from '@/components/unidades-carousel'
import BeneficiosSection from '@/components/beneficios-section'
import EstruturaSection from '@/components/estrutura-section'
import ModalidadesSection from '@/components/modalidades-section'
import PlanosSection from '@/components/planos-section'
import AppSection from '@/components/app-section'
import TestimonialSection from '@/components/testimonial-section'

// Enquanto os componentes ainda não aceitam props dinâmicos, renderizamos os existentes.
// Depois faremos variantes CMS-friendly.

export function renderSection(section: any, index: number) {
  switch (section?._type) {
    case 'heroSection':
      return <HeroSection key={index} data={section} />
    case 'aboutSection':
      return <AboutSection key={index} data={section} />
    case 'unidadesSection':
      return <UnidadesCarousel key={index} />
    case 'beneficiosSection':
      return <BeneficiosSection key={index} />
    case 'estruturaSection':
      return <EstruturaSection key={index} />
    case 'modalidadesSection':
      return <ModalidadesSection key={index} />
    case 'planosSection':
      return <PlanosSection key={index} data={section} />
    case 'appSection':
      return <AppSection key={index} />
    case 'testimonialsSection':
      return <TestimonialSection key={index} data={section} />
    default:
      return null
  }
}

export default function SectionsRenderer({ sections }: { sections: any[] }) {
  if (!sections?.length) return null
  return <>{sections.map((s, i) => renderSection(s, i))}</>
}