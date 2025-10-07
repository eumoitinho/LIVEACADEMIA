import { defineType } from 'sanity'

export default defineType({
  name: 'modalidadesSection',
  type: 'object',
  title: 'Modalidades',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    { name: 'intro', type: 'text', rows: 3, title: 'Introdução' },
    { name: 'ctaLabel', type: 'string', title: 'CTA Label', initialValue: 'Veja todas as modalidades' },
    { name: 'ctaHref', type: 'string', title: 'CTA Link', initialValue: '/aulas-coletivas' },
    {
      name: 'modalidades',
      type: 'array',
      title: 'Lista',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'subtitle', type: 'string', title: 'Subtítulo' },
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'description', type: 'text', rows: 3, title: 'Descrição' },
            { name: 'image', type: 'image', title: 'Imagem', options: { hotspot: true } },
            { name: 'style', type: 'string', title: 'Classe de layout (opcional)' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    },
  ],
  preview: { select: { title: 'heading' } },
})
