import { defineType, defineField } from 'sanity'

export const wellhubFeatureSchema = defineType({
  name: 'wellhubFeature',
  title: 'Recurso Wellhub',
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
      name: 'icon',
      title: 'Ícone',
      type: 'string',
      options: {
        list: [
          { title: 'Yoga', value: 'Yoga' },
          { title: 'Pilates', value: 'Pilates' },
          { title: 'Meditação', value: 'Meditation' },
          { title: 'Sauna', value: 'Sauna' },
          { title: 'Massagem', value: 'Massage' },
          { title: 'Nutrição', value: 'Nutrition' },
        ],
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
    },
  },
})
