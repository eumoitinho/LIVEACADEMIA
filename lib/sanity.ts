import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Desabilitar CDN para garantir dados sempre frescos com revalidação
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published', // Apenas documentos publicados
})

// Helper para construir URLs de imagens
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper para buscar dados da homepage
export async function getHomepageData() {
  try {
    const data = await client.fetch(
      `
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
    `,
      {},
      {
        next: {
          tags: ['homepage', 'hero', 'about', 'planos', 'testimonials'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return null
  }
}

// Helper para buscar unidades
export async function getUnits() {
  try {
    const data = await client.fetch(
      `
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
        images[] {
          asset-> {
            url
          }
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
    `,
      {},
      {
        next: {
          tags: ['units'],
        },
      }
    )

    return data
  } catch (error) {
    console.error('Error fetching units:', error)
    return []
  }
}

// Helper para buscar planos
export async function getPlans() {
  try {
    const data = await client.fetch(
      `
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
    `,
      {},
      {
        next: {
          tags: ['plans'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching plans:', error)
    return []
  }
}

// Helper para buscar benefícios
export async function getBenefits() {
  try {
    const data = await client.fetch(
      `
      *[_type == "benefit" && active == true] | order(order asc) {
        _id,
        title,
        description,
        icon,
        image,
        order,
        active
      }
    `,
      {},
      {
        next: {
          tags: ['benefits'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching benefits:', error)
    return []
  }
}

// Helper para buscar depoimentos
export async function getTestimonials() {
  try {
    const data = await client.fetch(
      `
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
    `,
      {},
      {
        next: {
          tags: ['testimonials'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// Helper para buscar recursos do app
export async function getAppFeatures() {
  try {
    const data = await client.fetch(
      `
      *[_type == "appFeature" && active == true] | order(order asc) {
        _id,
        title,
        description,
        icon,
        order,
        active
      }
    `,
      {},
      {
        next: {
          tags: ['appFeatures'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching app features:', error)
    return []
  }
}

// Helper para buscar modalidades
export async function getModalities() {
  try {
    const data = await client.fetch(
      `
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
    `,
      {},
      {
        next: {
          tags: ['modalities'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching modalities:', error)
    return []
  }
}

// Helper para buscar recursos da estrutura
export async function getStructureFeatures() {
  try {
    const data = await client.fetch(
      `
      *[_type == "structureFeature" && active == true] | order(order asc) {
        _id,
        title,
        description,
        icon,
        image,
        order,
        active
      }
    `,
      {},
      {
        next: {
          tags: ['structureFeatures'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching structure features:', error)
    return []
  }
}

// Helper para buscar recursos do Wellhub
export async function getWellhubFeatures() {
  try {
    const data = await client.fetch(
      `
      *[_type == "wellhubFeature" && active == true] | order(order asc) {
        _id,
        title,
        description,
        icon,
        order,
        active
      }
    `,
      {},
      {
        next: {
          tags: ['wellhubFeatures'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching wellhub features:', error)
    return []
  }
}

// Helper para buscar recursos da bioimpedância
export async function getBioimpedanciaFeatures() {
  try {
    const data = await client.fetch(
      `
      *[_type == "bioimpedanciaFeature" && active == true] | order(order asc) {
        _id,
        title,
        description,
        benefits,
        image,
        order,
        active
      }
    `,
      {},
      {
        next: {
          tags: ['bioimpedanciaFeatures'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching bioimpedancia features:', error)
    return []
  }
}

// Helper para buscar dados da seção do app
export async function getAppSectionData() {
  try {
    const data = await client.fetch(
      `
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
    `,
      {},
      {
        next: {
          tags: ['appSection'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching app section data:', error)
    return null
  }
}

export async function getBeneficiosSectionData() {
  try {
    const data = await client.fetch(
      `
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
    `,
      {},
      {
        next: {
          tags: ['beneficiosSection'],
        },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching beneficios section data:', error)
    return null
  }
}