/**
 * Strapi Content Type Definitions
 *
 * These types represent the content structure from Strapi CMS
 */

// Base Strapi types
export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiComponent<T> {
  id: number;
  __component?: string;
} & T;

// UI Components
export interface Button {
  text: string;
  url?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface Highlight {
  text: string;
  icon?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CTA {
  title: string;
  description?: string;
  buttonText: string;
  buttonUrl: string;
}

// SEO & Contact Components
export interface SEOMetaData {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  ogImage?: { data: StrapiMedia };
  canonicalURL?: string;
}

export interface ContactInfo {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
}

export interface TrackingCodes {
  ga4Id?: string;
  gtmId?: string;
  metaPixelId?: string;
}

// Global Settings
export interface GlobalSettings {
  id: number;
  attributes: {
    siteName: string;
    siteTagline?: string;
    logo?: { data: StrapiMedia };
    logoDark?: { data: StrapiMedia };
    favicon?: { data: StrapiMedia };
    primaryColor?: string;
    accentColor?: string;
    defaultSeo?: StrapiComponent<SEOMetaData>;
    contactInfo?: StrapiComponent<ContactInfo>;
    socialMedia?: StrapiComponent<SocialLinks>;
    analytics?: StrapiComponent<TrackingCodes>;
  };
}

// Homepage Sections
export interface HeroSection {
  backgroundImage: { data: StrapiMedia };
  title1: string;
  title2: string;
  title3: string;
  description?: string;
  rating?: number;
  ratingLabel?: string;
  subscribersCount?: string;
  primaryCta?: StrapiComponent<Button>;
  secondaryCta?: StrapiComponent<Button>;
  footerText?: string;
}

export interface AboutSection {
  badge?: string;
  title: string;
  description: string;
  image?: { data: StrapiMedia };
  stats?: StrapiComponent<Stat>[];
  highlights?: StrapiComponent<Highlight>[];
}

export interface StructureFeature {
  title: string;
  description?: string;
  icon?: string;
  image?: { data: StrapiMedia };
  order?: number;
}

export interface BenefitsSection {
  badge?: string;
  title: string;
  description?: string;
  benefits?: { data: Benefit[] };
}

export interface StructureSection {
  badge?: string;
  title: string;
  description?: string;
  features?: StrapiComponent<StructureFeature>[];
}

export interface ModalitiesSection {
  badge?: string;
  title: string;
  description?: string;
  modalities?: { data: Modality[] };
}

export interface PlansSection {
  badge?: string;
  title: string;
  description?: string;
  plans?: { data: Plan[] };
}

export interface AppSection {
  badge?: string;
  title: string;
  highlightedText?: string;
  description?: string;
  subtitle?: string;
  benefits?: StrapiComponent<Highlight>[];
  appImage?: { data: StrapiMedia };
  appLiveUrl?: string;
  appTreinoUrl?: string;
  playStoreLiveUrl?: string;
  playStoreTreinoUrl?: string;
}

export interface WellhubSection {
  badge?: string;
  title: string;
  description?: string;
  benefits?: StrapiComponent<Highlight>[];
  logo?: { data: StrapiMedia };
  ctaButton?: StrapiComponent<Button>;
}

export interface BioimpedanciaSection {
  badge?: string;
  title: string;
  description?: string;
  features?: StrapiComponent<Highlight>[];
  ctaButton?: StrapiComponent<Button>;
  image?: { data: StrapiMedia };
}

export interface TestimonialsSection {
  badge?: string;
  title: string;
  description?: string;
  testimonials?: { data: Testimonial[] };
}

export interface Homepage {
  id: number;
  attributes: {
    seo?: StrapiComponent<SEOMetaData>;
    heroSection?: StrapiComponent<HeroSection>;
    aboutSection?: StrapiComponent<AboutSection>;
    benefitsSection?: StrapiComponent<BenefitsSection>;
    structureSection?: StrapiComponent<StructureSection>;
    modalitiesSection?: StrapiComponent<ModalitiesSection>;
    plansSection?: StrapiComponent<PlansSection>;
    appSection?: StrapiComponent<AppSection>;
    wellhubSection?: StrapiComponent<WellhubSection>;
    bioimpedanciaSection?: StrapiComponent<BioimpedanciaSection>;
    testimonialsSection?: StrapiComponent<TestimonialsSection>;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Collection Types
export interface UnitPlan {
  planName: string;
  price: number;
  period?: string;
  highlight?: boolean;
  badge?: string;
}

export interface Unit {
  id: number;
  attributes: {
    name: string;
    slug: string;
    address: string;
    city: string;
    state: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    whatsapp?: string;
    email?: string;
    type: 'diamante' | 'premium' | 'tradicional' | 'inauguracao';
    description?: string;
    openingHours?: string;
    features?: StrapiComponent<Highlight>[];
    mainPhoto?: { data: StrapiMedia };
    backgroundImage?: { data: StrapiMedia };
    gallery?: { data: StrapiMedia[] };
    plans?: StrapiComponent<UnitPlan>[];
    order?: number;
    active?: boolean;
    featured?: boolean;
    codigoUnidade?: string;
    chavePublica?: string;
    testimonials?: { data: Testimonial[] };
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Plan {
  id: number;
  attributes: {
    planId: string;
    name: string;
    description?: string;
    price: number;
    priceLabel?: string;
    period?: string;
    features?: StrapiComponent<Highlight>[];
    ctaText?: string;
    ctaUrl?: string;
    highlight?: boolean;
    popular?: boolean;
    badge?: string;
    gradientFrom?: string;
    gradientTo?: string;
    icon?: string;
    order?: number;
    active?: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Modality {
  id: number;
  attributes: {
    name: string;
    description?: string;
    image?: { data: StrapiMedia };
    duration?: string;
    difficultyLevel?: 'iniciante' | 'intermediario' | 'avancado';
    instructor?: string;
    schedule?: string;
    icon?: string;
    color?: string;
    order?: number;
    active?: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Benefit {
  id: number;
  attributes: {
    title: string;
    description: string;
    icon?: string;
    image?: { data: StrapiMedia };
    color?: string;
    order?: number;
    active?: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    customerName: string;
    role?: string;
    content: string;
    avatar?: { data: StrapiMedia };
    rating?: number;
    unit?: { data: Unit };
    order?: number;
    active?: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Page Types
export interface ContactPage {
  id: number;
  attributes: {
    seo?: StrapiComponent<SEOMetaData>;
    title: string;
    subtitle?: string;
    description?: string;
    heroImage?: { data: StrapiMedia };
    contactInfo?: StrapiComponent<ContactInfo>;
    socialNetworks?: StrapiComponent<SocialLinks>;
    formTitle?: string;
    formDescription?: string;
    ctaButtonText?: string;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ContentSection {
  title: string;
  content: string;
  image?: { data: StrapiMedia };
  order?: number;
}

export interface ValueItem {
  title: string;
  description?: string;
  icon?: string;
}

export interface TeamMember {
  name: string;
  position: string;
  bio?: string;
  photo?: { data: StrapiMedia };
}

export interface TeamSection {
  title?: string;
  description?: string;
  members?: StrapiComponent<TeamMember>[];
}

export interface AboutPage {
  id: number;
  attributes: {
    seo?: StrapiComponent<SEOMetaData>;
    title: string;
    subtitle?: string;
    description?: string;
    heroImage?: { data: StrapiMedia };
    contentSections?: StrapiComponent<ContentSection>[];
    values?: StrapiComponent<ValueItem>[];
    mission?: string;
    vision?: string;
    history?: string;
    stats?: StrapiComponent<Stat>[];
    teamSection?: StrapiComponent<TeamSection>;
    cta?: StrapiComponent<CTA>;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CareerBenefit {
  title: string;
  description?: string;
  icon?: string;
  colorGradient?: string;
}

export interface JobPosition {
  title: string;
  department?: string;
  location?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'internship';
  description?: string;
  requirements?: StrapiComponent<Highlight>[];
  benefits?: StrapiComponent<Highlight>[];
  salary?: string;
  active?: boolean;
}

export interface TrabalheConoscoPage {
  id: number;
  attributes: {
    seo?: StrapiComponent<SEOMetaData>;
    title: string;
    subtitle?: string;
    description?: string;
    heroImage?: { data: StrapiMedia };
    benefits?: StrapiComponent<CareerBenefit>[];
    positions?: StrapiComponent<JobPosition>[];
    formTitle?: string;
    formDescription?: string;
    ctaButtonText?: string;
    contactInfo?: StrapiComponent<ContactInfo>;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface DayUsePackage {
  title: string;
  price: number;
  description?: string;
  popular?: boolean;
  benefits?: StrapiComponent<Highlight>[];
}

export interface DayUsePage {
  id: number;
  attributes: {
    seo?: StrapiComponent<SEOMetaData>;
    title: string;
    subtitle?: string;
    description?: string;
    heroImage?: { data: StrapiMedia };
    benefits?: StrapiComponent<Highlight>[];
    packages?: StrapiComponent<DayUsePackage>[];
    faqs?: StrapiComponent<FAQ>[];
    ctaTitle?: string;
    ctaDescription?: string;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}
