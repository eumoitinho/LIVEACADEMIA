import { defineType, defineField } from 'sanity'

export const bioimpedanciaFeatureSchema = defineType({
  name: 'bioimpedanciaFeature',
  title: 'Recurso Bioimpedância',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'benefits',
      title: 'Benefícios',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Percentual de gordura corporal',
        'Massa muscular',
        'Água corporal total',
        'Metabolismo basal',
        'Idade metabólica',
      ],
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})
