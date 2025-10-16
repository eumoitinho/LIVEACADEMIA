import { defineType, defineField } from 'sanity'

export const appFeatureSchema = defineType({
  name: 'appFeature',
  title: 'Recurso do App',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Ícone',
      type: 'string',
      options: {
        list: [
          { title: 'Monitoramento de Treino', value: 'BarChart3' },
          { title: 'Agendamento', value: 'Calendar' },
          { title: 'Histórico', value: 'History' },
          { title: 'Progresso', value: 'TrendingUp' },
          { title: 'Metas', value: 'Target' },
          { title: 'Notificações', value: 'Bell' },
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
