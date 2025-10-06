import { defineType } from 'sanity'

export default defineType({
  name: 'testimonialsSection',
  type: 'object',
  title: 'Depoimentos',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    {
      name: 'items',
      type: 'array',
      title: 'Depoimentos',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Nome' },
            { name: 'text', type: 'text', rows: 3, title: 'Depoimento' },
            { name: 'avatar', type: 'image', title: 'Avatar', options: { hotspot: true } },
            { name: 'rating', type: 'number', title: 'Avaliação', validation: r => r.min(1).max(5) },
          ],
          preview: { select: { title: 'name', subtitle: 'text' } },
        },
      ],
    },
  ],
  preview: { select: { title: 'heading' } },
})
