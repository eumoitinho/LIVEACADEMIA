import { defineType, defineField } from 'sanity'

export const beneficiosSectionSchema = defineType({
  name: 'beneficiosSection',
  title: 'Seção de Benefícios',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Texto pequeno acima do título',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Mais do que treino, uma experiência completa',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'items',
      title: 'Benefícios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              description: 'Nome do ícone (ShieldCheck, Star, Users, Snowflake, Zap, CheckCircle)',
              options: {
                list: [
                  { title: 'Escudo (Proteção)', value: 'ShieldCheck' },
                  { title: 'Estrela (Qualidade)', value: 'Star' },
                  { title: 'Pessoas (Comunidade)', value: 'Users' },
                  { title: 'Floco de Neve (Climatização)', value: 'Snowflake' },
                  { title: 'Raio (Energia)', value: 'Zap' },
                  { title: 'Check (Confirmação)', value: 'CheckCircle' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
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
              name: 'color',
              title: 'Cor do Gradiente',
              type: 'string',
              description: 'Classes Tailwind para o gradiente (ex: from-yellow-400 to-amber-500)',
              options: {
                list: [
                  { title: 'Amarelo para Âmbar', value: 'from-yellow-400 to-amber-500' },
                  { title: 'Âmbar para Amarelo Escuro', value: 'from-amber-500 to-yellow-600' },
                  { title: 'Amarelo Médio para Âmbar', value: 'from-yellow-500 to-amber-600' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Imagem de Fundo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
