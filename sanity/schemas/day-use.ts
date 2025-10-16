import { defineType, defineField } from 'sanity'

export const dayUse = defineType({
  name: 'dayUse',
  title: 'Day Use',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem do Hero',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
        }
      ],
    }),
    defineField({
      name: 'beneficios',
      title: 'Benefícios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'titulo',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'descricao',
              title: 'Descrição',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              options: {
                list: [
                  { title: 'MapPin', value: 'MapPin' },
                  { title: 'Check', value: 'Check' },
                  { title: 'Clock', value: 'Clock' },
                  { title: 'Zap', value: 'Zap' },
                  { title: 'Users', value: 'Users' },
                  { title: 'Dumbbell', value: 'Dumbbell' },
                  { title: 'Star', value: 'Star' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'titulo',
              subtitle: 'descricao',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'pacotes',
      title: 'Pacotes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'titulo',
              title: 'Título do Pacote',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'preco',
              title: 'Preço',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'descricao',
              title: 'Descrição',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'popular',
              title: 'Mais Popular',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'beneficios',
              title: 'Benefícios do Pacote',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select: {
              title: 'titulo',
              subtitle: 'preco',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: 'faqs',
      title: 'Perguntas Frequentes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'pergunta',
              title: 'Pergunta',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'resposta',
              title: 'Resposta',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'pergunta',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Título do CTA Final',
      type: 'string',
      initialValue: 'Pronto para experimentar a Live Academia?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Descrição do CTA Final',
      type: 'text',
      rows: 2,
      initialValue: 'Adquira seu Day Use agora e descubra por que somos a melhor academia de Manaus.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
