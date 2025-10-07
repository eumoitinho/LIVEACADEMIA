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
    { name: 'secondaryCtaLabel', type: 'string', title: 'CTA Secundária Label' },
    { name: 'secondaryCtaHref', type: 'string', title: 'CTA Secundária Link' },
    { name: 'screenshot', type: 'image', title: 'Screenshot', options: { hotspot: true } },
    {
      name: 'screens',
      type: 'array',
      title: 'Screens (carrossel)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image', title: 'Imagem', options: { hotspot: true } },
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'description', type: 'string', title: 'Descrição' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      title: 'Recursos',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'iconKey', type: 'string', title: 'Ícone (chave lucide)' },
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'description', type: 'text', rows: 2, title: 'Descrição' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    },
    { name: 'benefits', type: 'array', title: 'Benefícios', of: [{ type: 'string' }] },
  ],
  preview: { select: { title: 'heading' } },
})
