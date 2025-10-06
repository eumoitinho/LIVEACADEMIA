// Central TypeScript types describing the shape of Sanity section objects
// These mirror the schema definitions in /sanity/schemas/sections/*

export interface HeroSectionData {
  _type: 'heroSection'
  heading?: string
  subheading?: string
  ctaPrimaryLabel?: string
  ctaPrimaryHref?: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  backgroundImage?: any
}

export interface AboutSectionData {
  _type: 'aboutSection'
  heading?: string
  body?: any
  bullets?: string[]
  highlightCard?: { title?: string; text?: string }
  stats?: { number?: string; label?: string; _key?: string }[]
  sideImage?: any
}

export interface PlanCardData {
  name?: string
  price?: string
  features?: string[]
  ctaLabel?: string
  ctaHref?: string
  highlight?: boolean
  _key?: string
}

export interface PlanosSectionData {
  _type: 'planosSection'
  heading?: string
  planos?: PlanCardData[]
}

export interface TestimonialItemData {
  name?: string
  text?: string
  avatar?: any
  rating?: number
  _key?: string
}

export interface TestimonialsSectionData {
  _type: 'testimonialsSection'
  heading?: string
  items?: TestimonialItemData[]
}

export interface BeneficioItemData {
  title?: string
  text?: string
  _key?: string
}

export interface BeneficiosSectionData {
  _type: 'beneficiosSection'
  heading?: string
  items?: BeneficioItemData[]
}

export interface BioimpedanciaDataItem { icon?: string; titulo?: string; descricao?: string; colorFrom?: string; colorTo?: string; _key?: string }
export interface BioimpedanciaSectionData {
  _type: 'bioimpedanciaSection'
  heading?: string
  subheading?: string
  beneficiosIntro?: string[]
  dados?: BioimpedanciaDataItem[]
  cta3dLabel?: string
  cta3dHref?: string
  highlightPrice?: string
  bottomPrimaryCtaLabel?: string
  bottomPrimaryCtaHref?: string
  bottomSecondaryCtaLabel?: string
  bottomSecondaryCtaHref?: string
}

export interface WellhubCard { icon?: string; titulo?: string; descricao?: string; _key?: string }
export interface WellhubSectionData {
  _type: 'wellhubSection'
  heading?: string
  subheading?: string
  parceriaLabel?: string
  cards?: WellhubCard[]
  detalhes?: string[]
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  bannerTitle?: string
  bannerText?: string
  bannerPrimaryCtaLabel?: string
  bannerPrimaryCtaHref?: string
  bannerSecondaryCtaLabel?: string
  bannerSecondaryCtaHref?: string
}

export type AnySection =
  | HeroSectionData
  | AboutSectionData
  | PlanosSectionData
  | TestimonialsSectionData
  | BeneficiosSectionData
  | BioimpedanciaSectionData
  | WellhubSectionData
  | Record<string, any>
