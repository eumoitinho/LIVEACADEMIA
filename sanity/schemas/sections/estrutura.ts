import { defineType } from 'sanity'

export default defineType({
  name: 'estruturaSection',
  type: 'object',
  title: 'Estrutura',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    {
      name: 'gallery',
      type: 'array',
      title: 'Galeria',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
  ],
  preview: { select: { title: 'heading' } },
})
