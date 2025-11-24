import { defineType, defineField } from 'sanity'

export const modalidadesPageSchema = defineType({
  name: 'modalidadesPage',
  title: 'Landing de Modalidades',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Texto pequeno acima do título'
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto do CTA',
      type: 'string'
    }),
    defineField({
      name: 'ctaHref',
      title: 'Link do CTA',
      type: 'string',
      description: 'Pode ser uma âncora (#planos) ou URL completa'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagem de Fundo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'featuredModalidades',
      title: 'Modalidades em Destaque',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'modality' }]
        }
      ],
      description: 'Selecione até 3 modalidades para destacar na home'
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Landing de Modalidades'
      }
    }
  }
})

