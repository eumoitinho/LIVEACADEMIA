import { defineType, defineField } from 'sanity'

export const bioimpedanciaSectionSchema = defineType({
  name: 'bioimpedanciaSection',
  title: 'Seção Bioimpedância',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Cabeçalho',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Bioimpedância',
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Avaliação Corporal Completa',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Descubra todos os detalhes da sua composição corporal com nossa avaliação de bioimpedância de alta precisão.',
        }),
      ],
    }),
    defineField({
      name: 'displaySettings',
      title: 'Configurações de Exibição',
      type: 'object',
      fields: [
        defineField({
          name: 'showOnHomepage',
          title: 'Exibir na Homepage',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'maxItemsToShow',
          title: 'Máximo de Itens para Exibir',
          type: 'number',
          initialValue: 2,
          validation: (Rule) => Rule.min(1).max(10),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'header.title',
      subtitle: 'header.description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Seção Bioimpedância',
        subtitle: subtitle || 'Configurações da seção de bioimpedância',
      }
    },
  },
})