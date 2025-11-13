import type { Schema, Struct } from '@strapi/strapi';

export interface AboutTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_about_team_members';
  info: {
    description: 'Team member';
    displayName: 'Team Member';
    icon: 'user';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    position: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutTeamSection extends Struct.ComponentSchema {
  collectionName: 'components_about_team_sections';
  info: {
    description: 'Team section with members';
    displayName: 'Team Section';
    icon: 'user';
  };
  attributes: {
    description: Schema.Attribute.Text;
    members: Schema.Attribute.Component<'about.team-member', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutValueItem extends Struct.ComponentSchema {
  collectionName: 'components_about_value_items';
  info: {
    description: 'Company value';
    displayName: 'Value Item';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AnalyticsTrackingCodes extends Struct.ComponentSchema {
  collectionName: 'components_analytics_tracking_codes';
  info: {
    description: 'Analytics and tracking IDs';
    displayName: 'Analytics Tracking Codes';
    icon: 'chartLine';
  };
  attributes: {
    ga4Id: Schema.Attribute.String;
    gtmId: Schema.Attribute.String;
    metaPixelId: Schema.Attribute.String;
  };
}

export interface CareersCareerBenefit extends Struct.ComponentSchema {
  collectionName: 'components_careers_career_benefits';
  info: {
    description: 'Career benefit item';
    displayName: 'Career Benefit';
    icon: 'gift';
  };
  attributes: {
    colorGradient: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersJobPosition extends Struct.ComponentSchema {
  collectionName: 'components_careers_job_positions';
  info: {
    description: 'Job position/opening';
    displayName: 'Job Position';
    icon: 'briefcase';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    benefits: Schema.Attribute.Component<'ui.highlight', true>;
    department: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    location: Schema.Attribute.String;
    requirements: Schema.Attribute.Component<'ui.highlight', true>;
    salary: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['full-time', 'part-time', 'contract', 'internship']
    > &
      Schema.Attribute.DefaultTo<'full-time'>;
  };
}

export interface ContactContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_info';
  info: {
    description: 'Contact information';
    displayName: 'Contact Info';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
    whatsapp: Schema.Attribute.String;
  };
}

export interface ContentContentSection extends Struct.ComponentSchema {
  collectionName: 'components_content_content_sections';
  info: {
    description: 'Generic content section';
    displayName: 'Content Section';
    icon: 'file';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FeaturesStructureFeature extends Struct.ComponentSchema {
  collectionName: 'components_features_structure_features';
  info: {
    description: 'Structure feature item';
    displayName: 'Structure Feature';
    icon: 'cog';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_about_sections';
  info: {
    description: 'Homepage about section';
    displayName: 'About Section';
    icon: 'information';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SOBRE N\u00D3S'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    highlights: Schema.Attribute.Component<'ui.highlight', true>;
    image: Schema.Attribute.Media<'images'>;
    stats: Schema.Attribute.Component<'ui.stat', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageAppSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_app_sections';
  info: {
    description: 'Homepage app section';
    displayName: 'App Section';
    icon: 'mobile';
  };
  attributes: {
    appImage: Schema.Attribute.Media<'images'>;
    appLiveUrl: Schema.Attribute.String;
    appTreinoUrl: Schema.Attribute.String;
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'APLICATIVO'>;
    benefits: Schema.Attribute.Component<'ui.highlight', true>;
    description: Schema.Attribute.Text;
    highlightedText: Schema.Attribute.String;
    playStoreLiveUrl: Schema.Attribute.String;
    playStoreTreinoUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageBenefitsSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_benefits_sections';
  info: {
    description: 'Homepage benefits section';
    displayName: 'Benefits Section';
    icon: 'gift';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'BENEF\u00CDCIOS'>;
    benefits: Schema.Attribute.Relation<'oneToMany', 'api::benefit.benefit'>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageBioimpedanciaSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_bioimpedancia_sections';
  info: {
    description: 'Homepage bioimped\u00E2ncia section';
    displayName: 'Bioimped\u00E2ncia Section';
    icon: 'chartBar';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'BIOIMPED\u00C2NCIA'>;
    ctaButton: Schema.Attribute.Component<'ui.button', false>;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'ui.highlight', true>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_hero_sections';
  info: {
    description: 'Homepage hero section';
    displayName: 'Hero Section';
    icon: 'star';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    footerText: Schema.Attribute.String;
    primaryCta: Schema.Attribute.Component<'ui.button', false>;
    rating: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<4.9>;
    ratingLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'excelente'>;
    secondaryCta: Schema.Attribute.Component<'ui.button', false>;
    subscribersCount: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'35 mil alunos'>;
    title1: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Transforme.'>;
    title2: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Evolua.'>;
    title3: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Viva.'>;
  };
}

export interface HomepageModalitiesSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_modalities_sections';
  info: {
    description: 'Homepage modalities section';
    displayName: 'Modalities Section';
    icon: 'star';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AULAS COLETIVAS'>;
    description: Schema.Attribute.Text;
    modalities: Schema.Attribute.Relation<
      'oneToMany',
      'api::modality.modality'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepagePlansSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_plans_sections';
  info: {
    description: 'Homepage plans section';
    displayName: 'Plans Section';
    icon: 'priceTag';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'PLANOS'>;
    description: Schema.Attribute.Text;
    plans: Schema.Attribute.Relation<'oneToMany', 'api::plan.plan'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageStructureSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_structure_sections';
  info: {
    description: 'Homepage structure section';
    displayName: 'Structure Section';
    icon: 'building';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'ESTRUTURA'>;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'features.structure-feature', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageTestimonialsSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_testimonials_sections';
  info: {
    description: 'Homepage testimonials section';
    displayName: 'Testimonials Section';
    icon: 'quote';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'DEPOIMENTOS'>;
    description: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageWellhubSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_wellhub_sections';
  info: {
    description: 'Homepage Wellhub section';
    displayName: 'Wellhub Section';
    icon: 'heart';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'WELLHUB'>;
    benefits: Schema.Attribute.Component<'ui.highlight', true>;
    ctaButton: Schema.Attribute.Component<'ui.button', false>;
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PricingDayUsePackage extends Struct.ComponentSchema {
  collectionName: 'components_pricing_day_use_packages';
  info: {
    description: 'Day use pricing package';
    displayName: 'Day Use Package';
    icon: 'priceTag';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'ui.highlight', true>;
    description: Schema.Attribute.Text;
    popular: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PricingUnitPlan extends Struct.ComponentSchema {
  collectionName: 'components_pricing_unit_plans';
  info: {
    description: 'Plan available at specific unit';
    displayName: 'Unit Plan';
    icon: 'priceTag';
  };
  attributes: {
    badge: Schema.Attribute.String;
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    period: Schema.Attribute.String & Schema.Attribute.DefaultTo<'m\u00EAs'>;
    planName: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface SeoMetaData extends Struct.ComponentSchema {
  collectionName: 'components_seo_meta_data';
  info: {
    description: 'SEO metadata fields';
    displayName: 'SEO Meta Data';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SocialSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_social_social_links';
  info: {
    description: 'Social media links';
    displayName: 'Social Links';
    icon: 'link';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    linkedin: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface UiButton extends Struct.ComponentSchema {
  collectionName: 'components_ui_buttons';
  info: {
    description: 'Button component';
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    size: Schema.Attribute.Enumeration<['sm', 'md', 'lg']> &
      Schema.Attribute.DefaultTo<'md'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface UiCta extends Struct.ComponentSchema {
  collectionName: 'components_ui_ctas';
  info: {
    description: 'Call to action section';
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.Required;
    buttonUrl: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiFaq extends Struct.ComponentSchema {
  collectionName: 'components_ui_faqs';
  info: {
    description: 'FAQ item';
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiHighlight extends Struct.ComponentSchema {
  collectionName: 'components_ui_highlights';
  info: {
    description: 'Highlight/feature item';
    displayName: 'Highlight';
    icon: 'check';
  };
  attributes: {
    icon: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiStat extends Struct.ComponentSchema {
  collectionName: 'components_ui_stats';
  info: {
    description: 'Statistic component';
    displayName: 'Stat';
    icon: 'chartLine';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.team-member': AboutTeamMember;
      'about.team-section': AboutTeamSection;
      'about.value-item': AboutValueItem;
      'analytics.tracking-codes': AnalyticsTrackingCodes;
      'careers.career-benefit': CareersCareerBenefit;
      'careers.job-position': CareersJobPosition;
      'contact.contact-info': ContactContactInfo;
      'content.content-section': ContentContentSection;
      'features.structure-feature': FeaturesStructureFeature;
      'homepage.about-section': HomepageAboutSection;
      'homepage.app-section': HomepageAppSection;
      'homepage.benefits-section': HomepageBenefitsSection;
      'homepage.bioimpedancia-section': HomepageBioimpedanciaSection;
      'homepage.hero-section': HomepageHeroSection;
      'homepage.modalities-section': HomepageModalitiesSection;
      'homepage.plans-section': HomepagePlansSection;
      'homepage.structure-section': HomepageStructureSection;
      'homepage.testimonials-section': HomepageTestimonialsSection;
      'homepage.wellhub-section': HomepageWellhubSection;
      'pricing.day-use-package': PricingDayUsePackage;
      'pricing.unit-plan': PricingUnitPlan;
      'seo.meta-data': SeoMetaData;
      'social.social-links': SocialSocialLinks;
      'ui.button': UiButton;
      'ui.cta': UiCta;
      'ui.faq': UiFaq;
      'ui.highlight': UiHighlight;
      'ui.stat': UiStat;
    }
  }
}
