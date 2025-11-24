import { defineType, defineField } from 'sanity'

export const wellhubSectionSchema = defineType({
  name: 'wellhubSection',
  title: 'Seção Wellhub',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string'
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
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string'
    }),
    defineField({
      name: 'highlightedBenefits',
      title: 'Benefícios em Destaque',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'ctaButton',
      title: 'Botão CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto',
          type: 'string'
        }),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'string'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Seção Wellhub'
      }
    }
  }
})

