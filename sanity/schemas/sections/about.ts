import { defineType } from 'sanity'

export default defineType({
  name: 'aboutSection',
  type: 'object',
  title: 'Sobre',
  fields: [
    { name: 'heading', type: 'string', title: 'Título', validation: r => r.required() },
    { name: 'body', type: 'richText', title: 'Texto' },
    {
      name: 'bullets',
      type: 'array',
      title: 'Diferenciais',
      of: [{ type: 'string' }],
    },
    {
      name: 'highlightCard',
      type: 'object',
      title: 'Bloco destaque',
      fields: [
        { name: 'title', type: 'string', title: 'Título' },
        { name: 'text', type: 'text', rows: 3, title: 'Texto' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      title: 'Estatísticas',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Número' },
            { name: 'label', type: 'string', title: 'Rótulo' },
          ],
          preview: { select: { title: 'number', subtitle: 'label' } },
        },
      ],
    },
    { name: 'sideImage', type: 'image', title: 'Imagem lateral', options: { hotspot: true } },
  ],
  preview: { select: { title: 'heading' } },
})
