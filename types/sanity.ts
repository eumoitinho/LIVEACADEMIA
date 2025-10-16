export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface CTALink {
  text: string
  link: string
}

export interface Stat {
  value: string
  label: string
  icon?: string
}

export interface BeneficioItem {
  icon: string
  title: string
  description: string
  color: string
  image: SanityImage
}

export interface EstruturaItem {
  icon: string
  title: string
  description: string
  image: SanityImage
}

export interface ModalidadeItem {
  name: string
  description: string
  icon: string
  color: string
}

export interface Plano {
  id: string
  name: string
  price: string
  period: string
  description: string
  badge?: string
  features: string[]
  cta: string
  highlight: boolean
}

export interface AppFeature {
  icon: string
  title: string
  description: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  image: SanityImage
  rating: number
  text: string
  unit: string
}

export interface HeroSection {
  backgroundImage: SanityImage
  badge: string
  title: string
  subtitle: string
  description: string
  primaryCta: CTALink
  secondaryCta: CTALink
  stats: Stat[]
}

export interface AboutSection {
  badge: string
  title: string
  description: string
  stats: Stat[]
  highlights: string[]
}

export interface BeneficiosSection {
  badge: string
  title: string
  description: string
  items: BeneficioItem[]
}

export interface EstruturaSection {
  badge: string
  title: string
  description: string
  items: EstruturaItem[]
}

export interface ModalidadesSection {
  badge: string
  title: string
  description: string
  items: ModalidadeItem[]
}

export interface PlanosSection {
  badge: string
  title: string
  description: string
  plans: Plano[]
}

export interface AppSection {
  badge: string
  title: string
  description: string
  features: AppFeature[]
  downloads: {
    ios: string
    android: string
  }
  appImage: SanityImage
}

export interface TestimonialsSection {
  badge: string
  title: string
  description: string
  items: Testimonial[]
}

export interface WellhubSection {
  badge: string
  title: string
  description: string
  benefits: string[]
  logo: SanityImage
  cta: string
}

export interface BioimpedanciaSection {
  badge: string
  title: string
  description: string
  features: string[]
  cta: string
  image: SanityImage
}

export interface SEO {
  title: string
  description: string
  keywords: string
}

export interface Unit {
  _id: string
  name: string
  slug: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  whatsapp: string
  email: string
  latitude: number
  longitude: number
  type: string
  services: string[]
  images?: SanityImage[]
  description: string
  openingHours: string
  order: number
}

export interface HomepageContent {
  _id: string
  _type: 'homepage'
  hero: HeroSection
  about: AboutSection
  beneficios: BeneficiosSection
  estrutura: EstruturaSection
  modalidades: ModalidadesSection
  planos: PlanosSection
  app: AppSection
  testimonials: TestimonialsSection
  wellhub: WellhubSection
  bioimpedancia: BioimpedanciaSection
  seo: SEO
}
