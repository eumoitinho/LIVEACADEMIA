import { defineType } from 'sanity'

export default defineType({
  name: 'planosSection',
  type: 'object',
  title: 'Planos',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    {
      name: 'planos',
      type: 'array',
      title: 'Planos',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Nome' },
            { name: 'price', type: 'string', title: 'Preço' },
            { name: 'features', type: 'array', title: 'Benefícios', of: [{ type: 'string' }] },
            { name: 'ctaLabel', type: 'string', title: 'CTA Label' },
            { name: 'ctaHref', type: 'string', title: 'CTA Link' },
            { name: 'highlight', type: 'boolean', title: 'Destacar?' },
          ],
          preview: { select: { title: 'name', subtitle: 'price' } },
        },
      ],
    },
  ],
  preview: { select: { title: 'heading' } },
})
