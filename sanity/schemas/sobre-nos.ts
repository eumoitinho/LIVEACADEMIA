import { defineType, defineField } from 'sanity'

export const sobreNosSchema = defineType({
  name: 'sobreNos',
  title: 'Sobre Nós',
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
      title: 'Descrição Principal',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagem de Fundo',
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
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'text',
          rows: 3,
        }
      ],
      description: 'Parágrafos do conteúdo principal',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'stats',
      title: 'Estatísticas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Valor',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Rótulo',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Título do CTA Final',
      type: 'string',
      initialValue: 'Pronto para fazer parte da nossa história?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Descrição do CTA Final',
      type: 'text',
      rows: 2,
      initialValue: 'Venha conhecer de perto o que faz da Live Academia a melhor escolha para sua jornada fitness.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
