import React from 'react'
import HeroSection from '@/components/hero-section'
import AboutSection from '@/components/about-section'
import UnidadesSection from '@/components/unidades-section'
import BeneficiosSection from '@/components/beneficios-section'
import EstruturaSection from '@/components/estrutura-section'
import ModalidadesSection from '@/components/modalidades-section'
import PlanosSection from '@/components/planos-section'
import AppSection from '@/components/app-section'
import TestimonialSection from '@/components/testimonial-section'
import BioimpedanciaSection from '@/components/bioimpedancia-section'
import WellhubSection from '@/components/wellhub-section'
import ContatoSection from '@/components/contato-section'

// Enquanto os componentes ainda não aceitam props dinâmicos, renderizamos os existentes.
// Depois faremos variantes CMS-friendly.

export function renderSection(section: any, index: number) {
  switch (section?._type) {
    case 'heroSection':
      return <HeroSection key={index} data={section} />
    case 'aboutSection':
      return <AboutSection key={index} data={section} />
    case 'unidadesSection':
      return <UnidadesSection key={index} data={section} />
    case 'beneficiosSection':
      return <BeneficiosSection key={index} data={section} />
    case 'estruturaSection':
      return <EstruturaSection key={index} data={section} />
    case 'modalidadesSection':
      return <ModalidadesSection key={index} data={section} />
    case 'planosSection':
      return <PlanosSection key={index} data={section} />
    case 'appSection':
      return <AppSection key={index} data={section} />
    case 'contatoSection':
      return <ContatoSection key={index} data={section} />
    case 'testimonialsSection':
      return <TestimonialSection key={index} data={section} />
    case 'bioimpedanciaSection':
      return <BioimpedanciaSection key={index} data={section} />
    case 'wellhubSection':
      return <WellhubSection key={index} data={section} />
    default:
      return null
  }
}

export default function SectionsRenderer({ sections }: { sections: any[] }) {
  if (!sections?.length) return null
  return <>{sections.map((s, i) => renderSection(s, i))}</>
}