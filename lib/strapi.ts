/**
 * Strapi API Client
 *
 * This module provides a client for fetching data from the Strapi CMS.
 * All content is managed through Strapi's visual editor.
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiRequestOptions {
  endpoint: string;
  query?: Record<string, any>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Fetch data from Strapi API
 */
export async function fetchStrapi<T = any>({
  endpoint,
  query = {},
  cache = 'force-cache',
  next,
}: StrapiRequestOptions): Promise<StrapiResponse<T>> {
  const url = new URL(`/api/${endpoint}`, STRAPI_URL);

  // Add query parameters
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
  });

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url.toString(), {
      headers,
      cache,
      next,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from Strapi (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Get media URL from Strapi
 */
export function getStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  // If it's already a full URL, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
}

/**
 * Build query string for populating relations and media
 */
export function buildPopulateQuery(fields: string[]): string {
  return fields.map((field, index) => `populate[${index}]=${field}`).join('&');
}

/**
 * Fetch global settings
 */
export async function getGlobalSettings() {
  return fetchStrapi({
    endpoint: 'global-setting',
    query: {
      populate: {
        logo: true,
        logoDark: true,
        favicon: true,
        defaultSeo: {
          populate: ['ogImage'],
        },
        contactInfo: true,
        socialMedia: true,
        analytics: true,
      },
    },
  });
}

/**
 * Fetch homepage data
 */
export async function getHomepage() {
  return fetchStrapi({
    endpoint: 'homepage',
    query: {
      populate: {
        seo: {
          populate: ['ogImage'],
        },
        heroSection: {
          populate: ['backgroundImage', 'primaryCta', 'secondaryCta'],
        },
        aboutSection: {
          populate: ['image', 'stats', 'highlights'],
        },
        benefitsSection: {
          populate: {
            benefits: {
              populate: ['icon', 'image'],
            },
          },
        },
        structureSection: {
          populate: {
            features: {
              populate: ['image'],
            },
          },
        },
        modalitiesSection: {
          populate: {
            modalities: {
              populate: ['image'],
            },
          },
        },
        plansSection: {
          populate: {
            plans: {
              populate: ['features'],
            },
          },
        },
        appSection: {
          populate: ['benefits', 'appImage'],
        },
        wellhubSection: {
          populate: ['benefits', 'logo', 'ctaButton'],
        },
        bioimpedanciaSection: {
          populate: ['features', 'ctaButton', 'image'],
        },
        testimonialsSection: {
          populate: {
            testimonials: {
              populate: ['avatar', 'unit'],
            },
          },
        },
      },
    },
  });
}

/**
 * Fetch all units
 */
export async function getUnits() {
  return fetchStrapi({
    endpoint: 'units',
    query: {
      populate: {
        mainPhoto: true,
        backgroundImage: true,
        gallery: true,
        features: true,
        plans: true,
      },
      filters: {
        active: true,
      },
      sort: ['order:asc', 'name:asc'],
    },
  });
}

/**
 * Fetch a single unit by slug
 */
export async function getUnitBySlug(slug: string) {
  return fetchStrapi({
    endpoint: 'units',
    query: {
      populate: {
        mainPhoto: true,
        backgroundImage: true,
        gallery: true,
        features: true,
        plans: true,
        testimonials: {
          populate: ['avatar'],
        },
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
  });
}

/**
 * Fetch all plans
 */
export async function getPlans() {
  return fetchStrapi({
    endpoint: 'plans',
    query: {
      populate: {
        features: true,
      },
      filters: {
        active: true,
      },
      sort: ['order:asc'],
    },
  });
}

/**
 * Fetch all modalities
 */
export async function getModalities() {
  return fetchStrapi({
    endpoint: 'modalities',
    query: {
      populate: {
        image: true,
      },
      filters: {
        active: true,
      },
      sort: ['order:asc', 'name:asc'],
    },
  });
}

/**
 * Fetch all benefits
 */
export async function getBenefits() {
  return fetchStrapi({
    endpoint: 'benefits',
    query: {
      populate: {
        image: true,
      },
      filters: {
        active: true,
      },
      sort: ['order:asc'],
    },
  });
}

/**
 * Fetch all testimonials
 */
export async function getTestimonials() {
  return fetchStrapi({
    endpoint: 'testimonials',
    query: {
      populate: {
        avatar: true,
        unit: {
          populate: ['mainPhoto'],
        },
      },
      filters: {
        active: true,
      },
      sort: ['order:asc'],
    },
  });
}

/**
 * Fetch contact page
 */
export async function getContactPage() {
  return fetchStrapi({
    endpoint: 'contact-page',
    query: {
      populate: {
        seo: {
          populate: ['ogImage'],
        },
        heroImage: true,
        contactInfo: true,
        socialNetworks: true,
      },
    },
  });
}

/**
 * Fetch about page
 */
export async function getAboutPage() {
  return fetchStrapi({
    endpoint: 'about-page',
    query: {
      populate: {
        seo: {
          populate: ['ogImage'],
        },
        heroImage: true,
        contentSections: {
          populate: ['image'],
        },
        values: true,
        stats: true,
        teamSection: {
          populate: {
            members: {
              populate: ['photo'],
            },
          },
        },
        cta: true,
      },
    },
  });
}

/**
 * Fetch trabalhe conosco page
 */
export async function getTrabalheConoscoPage() {
  return fetchStrapi({
    endpoint: 'trabalhe-conosco-page',
    query: {
      populate: {
        seo: {
          populate: ['ogImage'],
        },
        heroImage: true,
        benefits: true,
        positions: {
          populate: ['requirements', 'benefits'],
        },
        contactInfo: true,
      },
    },
  });
}

/**
 * Fetch day use page
 */
export async function getDayUsePage() {
  return fetchStrapi({
    endpoint: 'day-use-page',
    query: {
      populate: {
        seo: {
          populate: ['ogImage'],
        },
        heroImage: true,
        benefits: true,
        packages: {
          populate: ['benefits'],
        },
        faqs: true,
      },
    },
  });
}
