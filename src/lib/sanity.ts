import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  // Desabilitar CDN em desenvolvimento para ver mudanças imediatamente
  useCdn: process.env.NODE_ENV === 'production' && process.env.SANITY_USE_CDN !== 'false',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  // Adicionar configurações para evitar cache excessivo
  perspective: 'published',
  stega: {
    enabled: false,
  },
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
          backgroundImage {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
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

// Helper para buscar unidades
export async function getUnits() {
  try {
    const data = await client.fetch(`
      *[_type == "unit" && active == true] | order(order asc) {
        _id,
        name,
        slug,
        address,
        city,
        state,
        zipCode,
        phone,
        whatsapp,
        email,
        latitude,
        longitude,
        type,
        services,
        images,
        photo {
          asset->{
            url
          }
        },
        backgroundImage {
          asset->{
            url
          }
        },
        description,
        openingHours,
        order,
        active,
        featured
      }
    `)
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

// Helper para buscar configuração de planos da API por unidade
export async function getUnitPlanosConfig(slug: string) {
  try {
    const data = await client.fetch(`
      *[_type == "unit" && slug.current == $slug][0] {
        planosAPIConfig
      }
    `, { slug })

    if (data?.planosAPIConfig) {
      try {
        return JSON.parse(data.planosAPIConfig)
      } catch (parseError) {
        console.error('Error parsing planosAPIConfig JSON:', parseError)
        return []
      }
    }

    return []
  } catch (error) {
    console.error('Error fetching unit planos config:', error)
    return []
  }
}
