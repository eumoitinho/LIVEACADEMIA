import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Helper para construir URLs de imagens
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper para buscar dados da homepage
export async function getHomepageData() {
  try {
    const data = await client.fetch(`
      *[_type == "homepage"][0] {
        seo,
        hero {
          backgroundImage,
          title,
          subtitle,
          thirdTitle,
          description,
          rating {
            value,
            label,
            subscribers
          },
          primaryCta {
            text,
            link
          },
          secondaryCta {
            text,
            link
          },
          footerText
        },
        about {
          badge,
          title,
          description,
          image,
          stats[] {
            value,
            label
          },
          highlights
        },
        beneficios {
          badge,
          title,
          description,
          items[] {
            icon,
            title,
            description,
            color,
            image
          }
        },
        planos {
          badge,
          title,
          description,
          plans[]-> {
            name,
            description,
            price,
            priceLabel,
            features,
            cta,
            highlight,
            badge,
            order,
            active
          }
        },
        testimonials {
          badge,
          title,
          description,
          testimonials[]-> {
            name,
            role,
            content,
            avatar,
            rating,
            order,
            active
          }
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return null
  }
}

// Cache para unidades - DESABILITADO para desenvolvimento
let unitsCache: any[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 0 // 0 = sem cache

// Helper para buscar unidades
export async function getUnits() {
  try {
    // Verificar cache
    if (unitsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return unitsCache
    }

    const data = await client.fetch(`
      *[_type == "unit" && active == true] | order(order asc) {
        _id,
        name,
        "slug": slug.current,
        address,
        latitude,
        longitude,
        type,
        services,
        photo {
          asset-> {
            url
          }
        },
        backgroundImage {
          asset-> {
            url
          }
        },
        heroBackground {
          asset-> {
            url
          }
        },
        images[] {
          asset-> {
            url
          }
        },
        modalidades[]-> {
          _id,
          name,
          description,
          image {
            asset-> {
              url
            }
          },
          duration,
          difficulty,
          instructor,
          schedule,
          order,
          active
        },
        beneficios[]-> {
          _id,
          title,
          description,
          icon,
          image {
            asset-> {
              url
            }
          },
          order,
          active
        },
        openingHours,
        order,
        active,
        featured,
        planos[] {
          nome,
          preco,
          periodo,
          destaque,
          badge
        }
      }
    `)
    
    // Atualizar cache
    unitsCache = data
    cacheTimestamp = Date.now()
    
    return data
  } catch (error) {
    console.error('Error fetching units:', error)
    return []
  }
}

// Helper para buscar planos
export async function getPlans() {
  try {
    const data = await client.fetch(`
      *[_type == "plano" && active == true] | order(order asc) {
        _id,
        name,
        description,
        price,
        priceLabel,
        features,
        cta,
        ctaUrl,
        highlight,
        badge,
        order,
        active
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching plans:', error)
    return []
  }
}

// Helper para buscar benefícios
export async function getBenefits() {
  try {
    const data = await client.fetch(`
      *[_type == "benefit" && active == true] | order(order asc) {
        _id,
        title,
        description,
        icon,
        image,
        order,
        active
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching benefits:', error)
    return []
  }
}

// Helper para buscar depoimentos
export async function getTestimonials() {
  try {
    const data = await client.fetch(`
      *[_type == "testimonial" && active == true] | order(order asc) {
        _id,
        name,
        role,
        content,
        avatar,
        rating,
        order,
        active
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// Helper para buscar recursos do app
export async function getAppFeatures() {
  try {
    const data = await client.fetch(`
      *[_type == "appFeature" && active == true] | order(order asc) {
        _id,
        title,
        description,
        icon,
        order,
        active
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching app features:', error)
    return []
  }
}

// Helper para buscar modalidades
export async function getModalities() {
  try {
    const data = await client.fetch(`
      *[_type == "modality" && active == true] | order(order asc) {
        _id,
        name,
        description,
        image,
        duration,
        difficulty,
        instructor,
        schedule,
        order,
        active
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching modalities:', error)
    return []
  }
}

// Helper para buscar recursos da estrutura
export async function getStructureFeatures() {
  try {
    const data = await client.fetch(`
      *[_type == "structureFeature" && active == true] | order(order asc) {
        _id,
        title,
        description,
        icon,
        image,
        order,
        active
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching structure features:', error)
    return []
  }
}

// Helper para buscar recursos do Wellhub
export async function getWellhubFeatures() {
  try {
    const data = await client.fetch(`
      *[_type == "wellhubFeature" && active == true] | order(order asc) {
        _id,
        title,
        description,
        icon,
        order,
        active
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching wellhub features:', error)
    return []
  }
}

// Helper para buscar recursos da bioimpedância
export async function getBioimpedanciaFeatures() {
  try {
    const data = await client.fetch(`
      *[_type == "bioimpedanciaFeature" && active == true] | order(order asc) {
        _id,
        title,
        description,
        benefits,
        image,
        order,
        active
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching bioimpedancia features:', error)
    return []
  }
}

// Helper para buscar dados da seção do app
export async function getAppSectionData() {
  try {
    const data = await client.fetch(`
      *[_type == "appSection"][0] {
        badge,
        title,
        highlightedText,
        description,
        subtitle,
        benefits,
        appImage,
        appLiveUrl,
        appTreinoUrl,
        appLivePlayStoreUrl,
        appTreinoPlayStoreUrl
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching app section data:', error)
    return null
  }
}

export async function getBeneficiosSectionData() {
  try {
    const data = await client.fetch(`
      *[_type == "beneficiosSection"][0] {
        badge,
        title,
        description,
        items[] {
          icon,
          title,
          description,
          color,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching beneficios section data:', error)
    return null
  }
}

// Helper para buscar dados da seção hero
export async function getHeroSectionData() {
  try {
    const data = await client.fetch(`
      *[_type == "heroSection"][0] {
        title,
        description,
        priceTag {
          text,
          price,
          showIcon
        },
        cta {
          text,
          url,
          showArrow
        },
        overlay {
          enabled,
          opacity
        },
        displaySettings {
          showOnHomepage,
          showPriceTag
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching hero section data:', error)
    return null
  }
}

// Helper para buscar dados da seção de planos
export async function getPlanosSectionData() {
  try {
    const data = await client.fetch(`
      *[_type == "planosSection"][0] {
        header {
          title,
          highlightWord,
          description
        },
        featuredPlans[] {
          nome,
          preco,
          periodo,
          descricao,
          beneficios,
          popular,
          destaque,
          badge,
          numero,
          setup,
          image {
            asset-> {
              url
            }
          },
          ctaText,
          gradient,
          order,
          active
        },
        footnote {
          text,
          linkText,
          linkUrl
        },
        displaySettings {
          showOnHomepage,
          showBackgroundEffects,
          showFootnote,
          maxPlansToShow
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching planos section data:', error)
    return null
  }
}

// Helper para buscar dados da seção de estrutura
export async function getEstruturaSectionData() {
  try {
    const data = await client.fetch(`
      *[_type == "estruturaSection"][0] {
        header {
          badge,
          title,
          description
        },
        additionalInfo {
          title,
          description
        },
        displaySettings {
          showOnHomepage,
          showAdditionalInfo
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching estrutura section data:', error)
    return null
  }
}

// Helper para buscar dados da seção de bioimpedância
export async function getBioimpedanciaSectionData() {
  try {
    const data = await client.fetch(`
      *[_type == "bioimpedanciaSection"][0] {
        header {
          badge,
          title,
          description
        },
        displaySettings {
          showOnHomepage,
          maxItemsToShow
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching bioimpedancia section data:', error)
    return null
  }
}

// Helper para buscar dados das configurações globais
export async function getGlobalSettings() {
  try {
    const data = await client.fetch(`
      *[_type == "globalSettings"][0] {
        contact {
          email,
          phone,
          whatsapp,
          address {
            street,
            city,
            state,
            zipCode
          }
        },
        socialMedia {
          facebook,
          instagram,
          youtube,
          linkedin,
          tiktok
        },
        appUrls {
          appStore {
            appLive,
            appTreino
          },
          googlePlay {
            appLive,
            appTreino
          }
        },
        globalCtas {
          primaryCta {
            text,
            url,
            style
          },
          secondaryCta {
            text,
            url,
            style
          }
        },
        floatingButtons[] {
          icon,
          text,
          url,
          backgroundColor,
          textColor,
          position,
          order,
          active
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching global settings:', error)
    return null
  }
}

// Helper para buscar dados da seção de modalidades
export async function getModalidadesSectionData() {
  try {
    const data = await client.fetch(`
      *[_type == "modalidadesSection"][0] {
        header {
          badge,
          title,
          description
        },
        featuredModalities[] {
          subtitle,
          title,
          description,
          image {
            asset-> {
              url
            }
          },
          order,
          active
        },
        cta {
          text,
          url
        },
        displaySettings {
          showOnHomepage,
          maxModalitiesShow
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching modalidades section data:', error)
    return null
  }
}

// Helper para buscar dados da seção do Wellhub
export async function getWellhubSectionData() {
  try {
    const data = await client.fetch(`
      *[_type == "wellhubSection"][0] {
        header {
          badge,
          title,
          description
        },
        benefits[] {
          icon,
          title,
          description,
          order
        },
        detailedBenefits[] {
          title,
          description,
          order
        },
        primaryCta {
          text,
          url
        },
        banner {
          image {
            asset-> {
              url
            }
          },
          altText
        },
        displaySettings {
          showOnHomepage,
          showBanner
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching wellhub section data:', error)
    return null
  }
}

// Helper para buscar dados da seção de depoimentos
export async function getTestimonialSectionData() {
  try {
    const data = await client.fetch(`
      *[_type == "testimonialSection"][0] {
        header {
          badge,
          title,
          description
        },
        useExistingTestimonials,
        featuredTestimonials[] {
          name,
          role,
          content,
          avatar {
            asset-> {
              url
            }
          },
          rating,
          order
        },
        linkedTestimonials[]-> {
          name,
          role,
          content,
          avatar {
            asset-> {
              url
            }
          },
          rating,
          order,
          active
        },
        statistics {
          averageRating,
          satisfiedStudents,
          recommendation
        },
        displaySettings {
          showOnHomepage,
          showStatistics,
          backgroundColor
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching testimonial section data:', error)
    return null
  }
}

// Helper para buscar dados da página de planos
export async function getPlanosPageData() {
  try {
    const data = await client.fetch(`
      *[_type == "planosPage"][0] {
        seo {
          title,
          description
        },
        header {
          title,
          description
        },
        plansOrder[]-> {
          _id,
          name,
          description,
          price,
          priceLabel,
          features,
          cta,
          ctaUrl,
          highlight,
          badge,
          order,
          active
        },
        comparison {
          title,
          sections[] {
            sectionTitle,
            items[] {
              label,
              tradicional,
              diamante
            }
          }
        },
        footer {
          disclaimer
        },
        displaySettings {
          showComparison,
          showUnitsSection
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching planos page data:', error)
    return null
  }
}

// Helper para buscar dados da página de unidades
export async function getUnidadesPageData() {
  try {
    const data = await client.fetch(`
      *[_type == "unidadesPage"][0] {
        seo {
          title,
          description
        },
        header {
          title,
          description
        },
        filters {
          showSearchBar,
          searchPlaceholder,
          showTypeFilters,
          typeFilterOptions[] {
            value,
            label
          },
          showLocationFilter,
          locationFilterText,
          radiusOptions
        },
        emptyState {
          title,
          description,
          buttonText
        },
        cta {
          title,
          description,
          primaryButton {
            text,
            url
          },
          secondaryButton {
            text,
            url,
            isExternal
          }
        },
        displaySettings {
          showCta,
          gridColumns,
          cardsPerPage
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching unidades page data:', error)
    return null
  }
}

// Helper para buscar dados da navegação
export async function getNavigationData() {
  try {
    const data = await client.fetch(`
      *[_type == "navigation"][0] {
        header {
          logo {
            showUnitName
          },
          navigation[] {
            label,
            type,
            url,
            openInNewTab,
            order,
            showOnMobile,
            showOnDesktop
          },
          ctaButton {
            text,
            mobileText,
            url,
            show
          },
          mobileMenu {
            openText,
            closeText
          }
        },
        footer {
          about {
            title,
            description
          },
          sections[] {
            title,
            links[] {
              label,
              url,
              external
            },
            order
          },
          socialMedia {
            title,
            links[] {
              platform,
              url,
              show
            }
          },
          copyright {
            text,
            companyName
          }
        }
      }
    `)
    return data
  } catch (error) {
    console.error('Error fetching navigation data:', error)
    return null
  }
}