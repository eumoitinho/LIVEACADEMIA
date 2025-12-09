import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    _id,
    _type,
    hero {
      backgroundImage {
        asset-> {
          _id,
          _type,
          url
        },
        _type
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
    "slug": slug.current,
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
    active,
    inaugurada,
    featured,
    photo {
      asset-> {
        _id,
        url
      }
    },
    modalidades[]->{
      _id,
      name,
      description,
      image {
        asset-> {
          _id,
          url
        }
      },
      duration,
      difficulty
    },
    beneficios[]->{
      _id,
      title,
      description,
      icon,
      image {
        asset-> {
          _id,
          url
        }
      }
    },
    images[] {
      asset-> {
        _id,
        url
      }
    },
    description,
    openingHours,
    order
  }
`

export const modalitiesQuery = groq`
  *[_type == "modality"] | order(name asc) {
    _id,
    name,
    description,
    image {
      asset-> {
        _id,
        url
      }
    },
    duration,
    difficulty
  }
`

export const benefitsQuery = groq`
  *[_type == "benefit" && active == true] | order(order asc) {
    _id,
    title,
    description,
    icon,
    image {
      asset-> {
        _id,
        url
      }
    },
    order
  }
`
