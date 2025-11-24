import { defineType, defineField } from 'sanity'

export const planosSectionSchema = defineType({
  name: 'planosSection',
  title: 'Seção Planos',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Cabeçalho',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Conheça nossos planos',
        }),
        defineField({
          name: 'highlightWord',
          title: 'Palavra em Destaque',
          type: 'string',
          description: 'Palavra que será destacada com gradiente (ex: "planos")',
          initialValue: 'planos',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Escolha o plano que cresce com você e se adapta às suas necessidades de treino.',
        }),
      ],
    }),
    defineField({
      name: 'featuredPlans',
      title: 'Planos em Destaque',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'nome',
              title: 'Nome do Plano',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'preco',
              title: 'Preço',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'periodo',
              title: 'Período',
              type: 'string',
              initialValue: 'mês',
            }),
            defineField({
              name: 'descricao',
              title: 'Descrição',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'beneficios',
              title: 'Benefícios',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Lista de benefícios inclusos no plano',
            }),
            defineField({
              name: 'popular',
              title: 'É Popular?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'destaque',
              title: 'É Destaque?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'badge',
              title: 'Texto da Badge',
              type: 'string',
              description: 'Texto exibido na badge quando é popular (ex: "O mais vendido")',
            }),
            defineField({
              name: 'numero',
              title: 'Número de Ordem',
              type: 'string',
              description: 'Número exibido no canto (01, 02, etc.)',
            }),
            defineField({
              name: 'setup',
              title: 'Tempo de Setup',
              type: 'string',
              description: 'Tempo para ativação (ex: "Setup em 24 horas")',
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
              name: 'ctaText',
              title: 'Texto do Botão',
              type: 'string',
              initialValue: 'Matricule-se',
            }),
            defineField({
              name: 'gradient',
              title: 'Gradiente',
              type: 'string',
              options: {
                list: [
                  { title: 'Zinco (Tradicional)', value: 'from-zinc-700 to-zinc-900' },
                  { title: 'Dourado (Premium)', value: 'from-amber-500 to-yellow-600' },
                  { title: 'Azul (Diamante)', value: 'from-blue-600 to-cyan-600' },
                ],
              },
              initialValue: 'from-zinc-700 to-zinc-900',
            }),
            defineField({
              name: 'order',
              title: 'Ordem de Exibição',
              type: 'number',
              validation: (Rule) => Rule.min(0),
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
              title: 'nome',
              subtitle: 'preco',
              media: 'image',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Plano sem nome',
                subtitle: subtitle ? `R$ ${subtitle}` : 'Sem preço',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4).min(1),
    }),
    defineField({
      name: 'footnote',
      title: 'Nota de Rodapé',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto da Nota',
          type: 'text',
          rows: 2,
          initialValue: 'Os preços, serviços e condições promocionais podem variar de acordo com a unidade escolhida.',
        }),
        defineField({
          name: 'linkText',
          title: 'Texto do Link',
          type: 'string',
          initialValue: 'Ver comparação detalhada',
        }),
        defineField({
          name: 'linkUrl',
          title: 'URL do Link',
          type: 'string',
          initialValue: '#',
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
          name: 'showBackgroundEffects',
          title: 'Exibir Efeitos de Fundo',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showFootnote',
          title: 'Exibir Nota de Rodapé',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'maxPlansToShow',
          title: 'Máximo de Planos para Exibir',
          type: 'number',
          initialValue: 2,
          validation: (Rule) => Rule.min(1).max(4),
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
        title: title || 'Seção Planos',
        subtitle: subtitle || 'Configurações da seção de planos',
      }
    },
  },
})