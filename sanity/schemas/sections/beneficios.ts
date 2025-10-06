import { defineType } from 'sanity'

export default defineType({
  name: 'beneficiosSection',
  type: 'object',
  title: 'Benefícios',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    {
      name: 'items',
      type: 'array',
      title: 'Itens',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'text', type: 'text', rows: 3, title: 'Texto' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    },
  ],
  preview: { select: { title: 'heading' } },
})
