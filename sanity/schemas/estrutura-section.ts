import { defineType, defineField } from 'sanity'

export const estruturaSectionSchema = defineType({
  name: 'estruturaSection',
  title: 'Seção Estrutura',
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
          initialValue: 'Nossa Estrutura',
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Estrutura completa para sua evolução',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Equipamentos modernos, espaços exclusivos e tecnologia de ponta em todas as nossas unidades.',
        }),
      ],
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Informação Adicional',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Estrutura Completa',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 4,
          initialValue: 'Cada unidade Live Academia é equipada com o que há de mais moderno em equipamentos de musculação, cardio e funcional, além de espaços exclusivos para aulas coletivas e áreas de descanso.',
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
          name: 'showAdditionalInfo',
          title: 'Exibir Informação Adicional',
          type: 'boolean',
          initialValue: true,
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
        title: title || 'Seção Estrutura',
        subtitle: subtitle || 'Configurações da seção de estrutura',
      }
    },
  },
})