import { defineType, defineField } from 'sanity'

export const planosPageSchema = defineType({
  name: 'planosPage',
  title: 'Página de Planos',
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
          initialValue: 'Conheça nossos planos | Live Academia',
          validation: (Rule) => Rule.max(60).warning('O título deve ter no máximo 60 caracteres para SEO'),
        }),
        defineField({
          name: 'description',
          title: 'Descrição da Página',
          type: 'text',
          initialValue: 'Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada fitness hoje mesmo na Live Academia.',
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
          initialValue: 'Conheça nossos planos',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          initialValue: 'Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada fitness hoje mesmo.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'plansOrder',
      title: 'Ordem dos Planos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'plano' }],
        },
      ],
      description: 'Arraste os planos para definir a ordem de exibição na página',
    }),
    defineField({
      name: 'comparison',
      title: 'Tabela de Comparação',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
          initialValue: 'Comparar planos',
        }),
        defineField({
          name: 'sections',
          title: 'Seções da Comparação',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'sectionTitle',
                  title: 'Título da Seção',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'items',
                  title: 'Itens da Seção',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'label',
                          title: 'Nome do Benefício',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'tradicional',
                          title: 'Plano Tradicional',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Incluído', value: 'true' },
                              { title: 'Não incluído', value: 'false' },
                              { title: 'Parcial', value: 'partial' },
                            ],
                          },
                        }),
                        defineField({
                          name: 'diamante',
                          title: 'Plano Diamante',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Incluído', value: 'true' },
                              { title: 'Não incluído', value: 'false' },
                              { title: 'Parcial', value: 'partial' },
                            ],
                          },
                        }),
                      ],
                      preview: {
                        select: {
                          title: 'label',
                          tradicional: 'tradicional',
                          diamante: 'diamante',
                        },
                        prepare({ title, tradicional, diamante }) {
                          return {
                            title,
                            subtitle: `Tradicional: ${tradicional === 'true' ? '✓' : tradicional === 'partial' ? 'Parcial' : '✗'} | Diamante: ${diamante === 'true' ? '✓' : diamante === 'partial' ? 'Parcial' : '✗'}`,
                          }
                        },
                      },
                    },
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'sectionTitle',
                  items: 'items',
                },
                prepare({ title, items }) {
                  return {
                    title,
                    subtitle: `${items?.length || 0} itens`,
                  }
                },
              },
            },
          ],
          initialValue: [
            {
              sectionTitle: 'Benefícios Principais',
              items: [
                { label: 'Sem taxa de matrícula', tradicional: 'true', diamante: 'true' },
                { label: 'Sem fidelidade', tradicional: 'true', diamante: 'true' },
                { label: 'Acesso via app Live', tradicional: 'true', diamante: 'true' },
                { label: 'Aulas coletivas', tradicional: 'true', diamante: 'true' },
              ],
            },
            {
              sectionTitle: 'Estrutura Premium',
              items: [
                { label: 'Ambiente climatizado', tradicional: 'partial', diamante: 'true' },
                { label: 'Espaços exclusivos', tradicional: 'false', diamante: 'true' },
                { label: 'Espaço Relax', tradicional: 'false', diamante: 'true' },
                { label: 'Espaço Yoga', tradicional: 'false', diamante: 'true' },
                { label: 'Studio de Bike', tradicional: 'false', diamante: 'true' },
              ],
            },
            {
              sectionTitle: 'Serviços',
              items: [
                { label: 'Avaliação física', tradicional: 'true', diamante: 'true' },
                { label: 'App de treinos', tradicional: 'true', diamante: 'true' },
                { label: 'Atendimento domingos', tradicional: 'partial', diamante: 'true' },
                { label: 'Suporte prioritário', tradicional: 'false', diamante: 'true' },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Rodapé da Página',
      type: 'object',
      fields: [
        defineField({
          name: 'disclaimer',
          title: 'Texto de Aviso',
          type: 'text',
          initialValue: 'Os preços, serviços e condições promocionais podem variar de acordo com a academia escolhida.',
        }),
      ],
    }),
    defineField({
      name: 'displaySettings',
      title: 'Configurações de Exibição',
      type: 'object',
      fields: [
        defineField({
          name: 'showComparison',
          title: 'Exibir Tabela de Comparação',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showUnitsSection',
          title: 'Exibir Seção de Unidades',
          type: 'boolean',
          initialValue: true,
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
        title: title || 'Página de Planos',
        subtitle: description,
      }
    },
  },
})