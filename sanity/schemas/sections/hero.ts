import { defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  type: 'object',
  title: 'Hero',
  fields: [
    { name: 'heading', type: 'string', title: 'Título', validation: r => r.required() },
    { name: 'subheading', type: 'text', rows: 2, title: 'Subtítulo' },
    { name: 'ctaPrimaryLabel', type: 'string', title: 'Label CTA Principal' },
    { name: 'ctaPrimaryHref', type: 'string', title: 'Link CTA Principal' },
    { name: 'ctaSecondaryLabel', type: 'string', title: 'Label CTA Secundária' },
    { name: 'ctaSecondaryHref', type: 'string', title: 'Link CTA Secundária' },
    { name: 'backgroundImage', type: 'image', title: 'Imagem de Fundo', options: { hotspot: true } },
  ],
  preview: { select: { title: 'heading' } },
})
