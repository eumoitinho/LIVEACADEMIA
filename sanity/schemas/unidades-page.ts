import { defineType, defineField } from 'sanity'

export const unidadesPageSchema = defineType({
  name: 'unidadesPage',
  title: 'Página de Unidades',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título da Página',
          type: 'string',
          initialValue: 'Nossas Unidades | Live Academia',
          validation: (Rule) => Rule.max(60).warning('O título deve ter no máximo 60 caracteres para SEO'),
        }),
        defineField({
          name: 'description',
          title: 'Descrição da Página',
          type: 'text',
          initialValue: 'Encontre a Live Academia mais perto de você. Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.',
          validation: (Rule) => Rule.max(160).warning('A descrição deve ter no máximo 160 caracteres para SEO'),
        }),
      ],
    }),
    defineField({
      name: 'header',
      title: 'Cabeçalho da Página',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          initialValue: 'Encontre a Live mais perto de você',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          initialValue: 'Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'filters',
      title: 'Configurações de Filtros',
      type: 'object',
      fields: [
        defineField({
          name: 'showSearchBar',
          title: 'Exibir Barra de Busca',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'searchPlaceholder',
          title: 'Texto do Placeholder de Busca',
          type: 'string',
          initialValue: 'Buscar por nome ou endereço...',
        }),
        defineField({
          name: 'showTypeFilters',
          title: 'Exibir Filtros por Tipo',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'typeFilterOptions',
          title: 'Opções de Filtro por Tipo',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Valor',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Rótulo',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'value',
                },
              },
            },
          ],
          initialValue: [
            { value: 'todos', label: 'Todas as unidades' },
            { value: 'diamante', label: 'Diamante' },
            { value: 'premium', label: 'Premium' },
            { value: 'tradicional', label: 'Tradicional' },
            { value: 'inauguracao', label: 'Em breve' },
          ],
        }),
        defineField({
          name: 'showLocationFilter',
          title: 'Exibir Filtro por Localização',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'locationFilterText',
          title: 'Texto do Botão de Localização',
          type: 'string',
          initialValue: 'Usar minha localização',
        }),
        defineField({
          name: 'radiusOptions',
          title: 'Opções de Raio (km)',
          type: 'array',
          of: [{ type: 'number' }],
          initialValue: [2, 5, 10, 15],
        }),
      ],
    }),
    defineField({
      name: 'emptyState',
      title: 'Estado Vazio (Quando não encontra unidades)',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Nenhuma unidade encontrada',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          initialValue: 'Tente ajustar os filtros ou fazer uma nova busca',
        }),
        defineField({
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'Ver todas as unidades',
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Seção Call-to-Action (Final da Página)',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Pronto para começar sua transformação?',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          initialValue: 'Escolha uma unidade, conheça nossos planos e dê o primeiro passo rumo ao seu melhor.',
        }),
        defineField({
          name: 'primaryButton',
          title: 'Botão Primário',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'string',
              initialValue: 'Ver planos e preços',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              initialValue: '/planos',
            }),
          ],
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Botão Secundário',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'string',
              initialValue: 'Falar com consultor',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              initialValue: 'https://wa.me/5592999999999',
            }),
            defineField({
              name: 'isExternal',
              title: 'Link Externo',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'displaySettings',
      title: 'Configurações de Exibição',
      type: 'object',
      fields: [
        defineField({
          name: 'showCta',
          title: 'Exibir Seção CTA',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'gridColumns',
          title: 'Colunas da Grade',
          type: 'string',
          options: {
            list: [
              { title: '2 colunas', value: 'md:grid-cols-2' },
              { title: '3 colunas', value: 'md:grid-cols-3' },
              { title: '4 colunas', value: 'md:grid-cols-4' },
            ],
          },
          initialValue: 'md:grid-cols-3',
        }),
        defineField({
          name: 'cardsPerPage',
          title: 'Cards por Página (0 = todos)',
          type: 'number',
          initialValue: 0,
          validation: (Rule) => Rule.min(0),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'header.title',
      description: 'header.description',
    },
    prepare({ title, description }) {
      return {
        title: title || 'Página de Unidades',
        subtitle: description,
      }
    },
  },
})