import { defineType } from 'sanity'

export default defineType({
  name: 'appSection',
  type: 'object',
  title: 'App / Mobile',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    { name: 'description', type: 'text', rows: 3, title: 'Descrição' },
    { name: 'ctaLabel', type: 'string', title: 'CTA Label' },
    { name: 'ctaHref', type: 'string', title: 'CTA Link' },
    { name: 'screenshot', type: 'image', title: 'Screenshot', options: { hotspot: true } },
  ],
  preview: { select: { title: 'heading' } },
})
