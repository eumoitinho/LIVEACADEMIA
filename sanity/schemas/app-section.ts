import { defineType, defineField } from 'sanity'

export const appSectionSchema = defineType({
  name: 'appSection',
  title: 'Seção do App',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Texto pequeno acima do título (ex: "Tecnologia e fitness")',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Texto em Destaque',
      type: 'string',
      description: 'Texto que aparece em gradiente amarelo (ex: "palma da mão")',
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
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      description: 'Texto secundário em itálico',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefícios',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de benefícios do app',
    }),
    defineField({
      name: 'appImage',
      title: 'Imagem do App',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'appLiveUrl',
      title: 'URL App Live (App Store)',
      type: 'url',
      description: 'Link para download do App Live na App Store',
    }),
    defineField({
      name: 'appTreinoUrl',
      title: 'URL App Treino (App Store)',
      type: 'url',
      description: 'Link para download do App Treino na App Store',
    }),
    defineField({
      name: 'appLivePlayStoreUrl',
      title: 'URL App Live (Google Play)',
      type: 'url',
      description: 'Link para download do App Live no Google Play',
    }),
    defineField({
      name: 'appTreinoPlayStoreUrl',
      title: 'URL App Treino (Google Play)',
      type: 'url',
      description: 'Link para download do App Treino no Google Play',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'appImage',
    },
  },
})
