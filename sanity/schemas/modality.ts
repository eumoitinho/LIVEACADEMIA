import { defineType, defineField } from 'sanity'

export const modalitySchema = defineType({
  name: 'modality',
  title: 'Modalidade',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Modalidade',
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
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duração (minutos)',
      type: 'number',
      initialValue: 60,
    }),
    defineField({
      name: 'difficulty',
      title: 'Nível de Dificuldade',
      type: 'string',
      options: {
        list: [
          { title: 'Iniciante', value: 'iniciante' },
          { title: 'Intermediário', value: 'intermediario' },
          { title: 'Avançado', value: 'avancado' },
        ],
      },
    }),
    defineField({
      name: 'instructor',
      title: 'Instrutor',
      type: 'string',
    }),
    defineField({
      name: 'schedule',
      title: 'Horários',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Dia da Semana',
              type: 'string',
              options: {
                list: [
                  { title: 'Segunda-feira', value: 'monday' },
                  { title: 'Terça-feira', value: 'tuesday' },
                  { title: 'Quarta-feira', value: 'wednesday' },
                  { title: 'Quinta-feira', value: 'thursday' },
                  { title: 'Sexta-feira', value: 'friday' },
                  { title: 'Sábado', value: 'saturday' },
                  { title: 'Domingo', value: 'sunday' },
                ],
              },
            }),
            defineField({
              name: 'time',
              title: 'Horário',
              type: 'string',
            }),
          ],
        },
      ],
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
      title: 'name',
      subtitle: 'description',
      media: 'image',
    },
  },
})
