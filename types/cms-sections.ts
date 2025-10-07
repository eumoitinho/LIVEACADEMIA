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

// --- New / Extended Sections ---

export interface EstruturaItemData {
  titulo?: string
  descricao?: string
  disponibilidade?: string
  categoria?: string // 'basico' | 'exclusivo'
  iconKey?: string
  _key?: string
}

export interface EstruturaSectionData {
  _type: 'estruturaSection'
  heading?: string
  gallery?: any[]
  items?: EstruturaItemData[]
}

export interface ModalidadeItemData {
  subtitle?: string
  title?: string
  description?: string
  image?: any
  span?: number // opcional - para layout
  style?: string // fallback custom
  _key?: string
}

export interface ModalidadesSectionData {
  _type: 'modalidadesSection'
  heading?: string
  modalidades?: ModalidadeItemData[]
  ctaLabel?: string
  ctaHref?: string
  intro?: string
}

export interface AppScreenData { image?: any; title?: string; description?: string; _key?: string }
export interface AppFeatureData { iconKey?: string; title?: string; description?: string; _key?: string }

export interface AppSectionData {
  _type: 'appSection'
  heading?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  screenshot?: any
  screens?: AppScreenData[]
  features?: AppFeatureData[]
  benefits?: string[]
}

export interface UnidadeItemData {
  nome?: string
  endereco?: string
  imagem?: any
  badgeText?: string
  badgeVariant?: string
  link?: string
  _key?: string
}

export interface UnidadesSectionData {
  _type: 'unidadesSection'
  heading?: string
  subheading?: string
  showSearch?: boolean
  unidades?: UnidadeItemData[]
}

export interface ContatoItemData { iconKey?: string; title?: string; info?: string; action?: string; highlight?: boolean; _key?: string }
export interface SocialItemData { name?: string; url?: string; iconKey?: string; color?: string; _key?: string }

export interface ContatoSectionData {
  _type: 'contatoSection'
  heading?: string
  subheading?: string
  contactItems?: ContatoItemData[]
  social?: SocialItemData[]
  whatsappLink?: string
  formDisclaimer?: string
}

export type AnySection =
  | HeroSectionData
  | AboutSectionData
  | PlanosSectionData
  | TestimonialsSectionData
  | BeneficiosSectionData
  | BioimpedanciaSectionData
  | WellhubSectionData
  | EstruturaSectionData
  | ModalidadesSectionData
  | AppSectionData
  | UnidadesSectionData
  | ContatoSectionData
  | Record<string, any>
