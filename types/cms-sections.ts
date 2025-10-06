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

export type AnySection =
  | HeroSectionData
  | AboutSectionData
  | PlanosSectionData
  | TestimonialsSectionData
  | Record<string, any>
