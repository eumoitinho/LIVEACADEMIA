import { defineType, defineField } from 'sanity'

export const structureFeatureSchema = defineType({
  name: 'structureFeature',
  title: 'Recurso da Estrutura',
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
          { title: 'Equipamentos', value: 'Dumbbell' },
          { title: 'Climatização', value: 'Snowflake' },
          { title: 'Estacionamento', value: 'Car' },
          { title: 'WiFi', value: 'Wifi' },
          { title: 'Vestiário', value: 'Shirt' },
          { title: 'Segurança', value: 'Shield' },
          { title: 'Acessibilidade', value: 'Wheelchair' },
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
