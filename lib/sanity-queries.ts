import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    _id,
    _type,
    hero {
      backgroundImage {
        asset-> {
          url
        }
      },
      badge,
      title,
      subtitle,
      description,
      primaryCta {
        text,
        link
      },
      secondaryCta {
        text,
        link
      },
      stats[] {
        value,
        label
      }
    },
    about {
      badge,
      title,
      description,
      stats[] {
        value,
        label,
        icon
      },
      highlights[]
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
    estrutura {
      badge,
      title,
      description,
      items[] {
        icon,
        title,
        description,
        image
      }
    },
    modalidades {
      badge,
      title,
      description,
      items[] {
        name,
        description,
        icon,
        color
      }
    },
    planos {
      badge,
      title,
      description,
      plans[] {
        id,
        name,
        price,
        period,
        description,
        badge,
        features[],
        cta,
        highlight
      }
    },
    app {
      badge,
      title,
      description,
      features[] {
        icon,
        title,
        description
      },
      downloads {
        ios,
        android
      },
      appImage
    },
    testimonials {
      badge,
      title,
      description,
      items[] {
        id,
        name,
        role,
        image,
        rating,
        text,
        unit
      }
    },
    wellhub {
      badge,
      title,
      description,
      benefits[],
      logo,
      cta
    },
    bioimpedancia {
      badge,
      title,
      description,
      features[],
      cta,
      image
    },
    seo {
      title,
      description,
      keywords
    }
  }
`

export const unitsQuery = groq`
  *[_type == "unit"] | order(order asc) {
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
    services[],
    images[],
    description,
    openingHours,
    order
  }
`
