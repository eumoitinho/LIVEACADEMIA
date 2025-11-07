export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface CTALink {
  text: string
  link: string
}

export interface Rating {
  value: string
  label: string
  subscribers: string
}

export interface HeroSection {
  backgroundImage?: SanityImage
  title: string
  subtitle: string
  thirdTitle: string
  description: string
  rating: Rating
  primaryCta: CTALink
  secondaryCta: CTALink
  footerText: string
}

export interface AboutSection {
  badge: string
  title: string
  description: string
  image?: SanityImage
  stats: {
    value: string
    label: string
  }[]
  highlights: string[]
}

export interface Benefit {
  _id: string
  title: string
  description: string
  icon: string
  image?: SanityImage
  order: number
  active: boolean
}

export interface BeneficiosSection {
  badge?: string
  title: string
  description?: string
  items: Array<{
    icon: string
    title: string
    description: string
    color: string
    image?: {
      asset?: {
        _id: string
        url: string
      }
    }
    order?: number
  }>
  displaySettings?: {
    showOnHomepage?: boolean
    backgroundColor?: string
    overlayGradient?: {
      enabled?: boolean
      colorFrom?: string
      colorVia?: string
      blendMode?: string
    }
  }
}

export interface Plano {
  _id: string
  name: string
  description?: string
  price: number
  priceLabel?: string
  features: string[]
  cta: string
  highlight: boolean
  badge?: string
  order: number
  active: boolean
}

export interface PlanosSection {
  badge: string
  title: string
  description: string
  plans: Plano[]
}

export interface Testimonial {
  _id: string
  name: string
  role?: string
  content: string
  avatar?: SanityImage
  rating: number
  order: number
  active: boolean
}

export interface TestimonialsSection {
  badge: string
  title: string
  description: string
  testimonials: Testimonial[]
}

export interface SEO {
  title: string
  description: string
  keywords: string[]
}

export interface Unit {
  _id: string
  name: string
  slug: string
  address: string
  latitude: number
  longitude: number
  type: string
  services: string[]
  photo?: {
    asset?: {
      url: string
    }
  }
  backgroundImage?: {
    asset?: {
      url: string
    }
  }
  images?: Array<{
    asset?: {
      url: string
    }
  }>
  openingHours: string
  order: number
  active: boolean
  featured: boolean
  planos?: Array<{
    nome: string
    preco: string
    periodo: string
    destaque: boolean
    badge?: string
  }>
}

export interface HomepageContent {
  seo: SEO
  hero: HeroSection
  about: AboutSection
  beneficios: BeneficiosSection
  planos: PlanosSection
  testimonials: TestimonialsSection
}

export interface AppFeature {
  _id: string
  title: string
  description: string
  icon: string
  order: number
  active: boolean
}

export interface Modality {
  _id: string
  name: string
  description?: string
  image?: SanityImage
  duration: number
  difficulty: string
  instructor?: string
  schedule: {
    day: string
    time: string
  }[]
  order: number
  active: boolean
}

export interface StructureFeature {
  _id: string
  title: string
  description?: string
  icon: string
  image?: SanityImage
  order: number
  active: boolean
}

export interface WellhubFeature {
  _id: string
  title: string
  description?: string
  icon: string
  order: number
  active: boolean
}

export interface BioimpedanciaFeature {
  _id: string
  title: string
  description?: string
  benefits: string[]
  image?: SanityImage
  order: number
  active: boolean
}

export interface AppSectionData {
  badge?: string
  title: string
  highlightedText: string
  description: string
  subtitle?: string
  benefits?: string[]
  appImage: SanityImage
  appLiveUrl?: string
  appTreinoUrl?: string
  appLivePlayStoreUrl?: string
  appTreinoPlayStoreUrl?: string
}