import { groq } from 'next-sanity'
import { client } from './sanity'

export interface CMSPage {
  _id: string
  title: string
  slug?: { current: string }
  sections: any[]
}

export async function getPageBySlug(slug: string) {
  return client.fetch<CMSPage | null>(
    groq`*[_type == 'page' && slug.current == $slug][0]{
      _id, title, slug, sections[]{...
        , _type == 'heroSection' => {
          _type, heading, subheading, ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref, backgroundImage
        }
        , _type == 'aboutSection' => {
          _type, heading, body, bullets, highlightCard, stats, sideImage
        }
        , _type == 'unidadesSection' => { _type, heading, subheading, showSearch }
        , _type == 'beneficiosSection' => { _type, heading, items }
        , _type == 'estruturaSection' => { _type, heading, gallery }
        , _type == 'modalidadesSection' => { _type, heading, modalidades }
        , _type == 'planosSection' => { _type, heading, planos }
        , _type == 'appSection' => { _type, heading, description, ctaLabel, ctaHref, screenshot }
        , _type == 'testimonialsSection' => { _type, heading, items }
      }
    }`,
    { slug }
  )
}

export async function getHomePage() {
  return client.fetch<CMSPage | null>(
    groq`*[_type == 'page' && slug.current == 'home'][0]{
      _id, title, slug, sections[]{...
        , _type == 'heroSection' => {
          _type, heading, subheading, ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref, backgroundImage
        }
        , _type == 'aboutSection' => {
          _type, heading, body, bullets, highlightCard, stats, sideImage
        }
        , _type == 'unidadesSection' => { _type, heading, subheading, showSearch }
        , _type == 'beneficiosSection' => { _type, heading, items }
        , _type == 'estruturaSection' => { _type, heading, gallery }
        , _type == 'modalidadesSection' => { _type, heading, modalidades }
        , _type == 'planosSection' => { _type, heading, planos }
        , _type == 'appSection' => { _type, heading, description, ctaLabel, ctaHref, screenshot }
        , _type == 'testimonialsSection' => { _type, heading, items }
      }
    }`
  )
}
