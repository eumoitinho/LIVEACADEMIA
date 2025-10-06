import { defineType } from 'sanity'

export default defineType({
  name: 'modalidadesSection',
  type: 'object',
  title: 'Modalidades',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    {
      name: 'modalidades',
      type: 'array',
      title: 'Lista',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'description', type: 'text', rows: 3, title: 'Descrição' },
            { name: 'icon', type: 'image', title: 'Ícone', options: { hotspot: true } },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    },
  ],
  preview: { select: { title: 'heading' } },
})
