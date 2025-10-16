import { defineType, defineField } from 'sanity'

export const homepageSchema = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Seção Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'A MAIOR REDE DE MANAUS',
        }),
        defineField({
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          initialValue: 'Transforme seu corpo e sua vida',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'string',
          initialValue: 'na maior rede de academias de Manaus',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Sem fidelidade, sem anuidade, sem pegadinha. Treino ilimitado, aulas coletivas inclusas e estrutura completa para você alcançar seus objetivos.',
        }),
        defineField({
          name: 'primaryCta',
          title: 'CTA Principal',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'string',
              initialValue: 'Quero me matricular',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              initialValue: '/planos',
            }),
          ],
        }),
        defineField({
          name: 'secondaryCta',
          title: 'CTA Secundário',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'string',
              initialValue: 'Conhecer unidades',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              initialValue: '/unidades',
            }),
          ],
        }),
        defineField({
          name: 'stats',
          title: 'Estatísticas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Valor',
                  type: 'string',
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    
    defineField({
      name: 'about',
      title: 'Seção Sobre',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Live Academia',
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Sobre',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Transformamos treino em rotina sustentável e resultado real: liberdade multiunidade, atendimento humano que acompanha cada fase e estrutura premium para garantir evolução de verdade.',
        }),
        defineField({
          name: 'stats',
          title: 'Estatísticas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Valor',
                  type: 'string',
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
                defineField({
                  name: 'icon',
                  title: 'Ícone (emoji)',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'highlights',
          title: 'Destaques',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),

    defineField({
      name: 'beneficios',
      title: 'Seção Benefícios',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Vantagens',
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Por que escolher a Live Academia?',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 2,
          initialValue: 'Oferecemos muito mais do que equipamentos. Nossa proposta é entregar uma experiência completa de transformação.',
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
                  title: 'Ícone (emoji)',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Título',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'color',
                  title: 'Cor (gradiente)',
                  type: 'string',
                  initialValue: 'from-yellow-400 to-amber-500',
                }),
                defineField({
                  name: 'image',
                  title: 'Imagem',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'planos',
      title: 'Seção Planos',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Nossos Planos',
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Escolha o plano ideal para você',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'string',
          initialValue: 'Sem fidelidade, sem anuidade. Pague apenas enquanto treinar.',
        }),
        defineField({
          name: 'plans',
          title: 'Planos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'id',
                  title: 'ID',
                  type: 'string',
                }),
                defineField({
                  name: 'name',
                  title: 'Nome',
                  type: 'string',
                }),
                defineField({
                  name: 'price',
                  title: 'Preço',
                  type: 'string',
                }),
                defineField({
                  name: 'period',
                  title: 'Período',
                  type: 'string',
                  initialValue: 'mês',
                }),
                defineField({
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'badge',
                  title: 'Badge',
                  type: 'string',
                }),
                defineField({
                  name: 'features',
                  title: 'Benefícios',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
                defineField({
                  name: 'cta',
                  title: 'Texto do Botão',
                  type: 'string',
                  initialValue: 'Matricular agora',
                }),
                defineField({
                  name: 'highlight',
                  title: 'Destaque',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título da Página',
          type: 'string',
          initialValue: 'Live Academia | A Maior Rede de Academias de Manaus',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha. Mais de 20 unidades.',
        }),
        defineField({
          name: 'keywords',
          title: 'Palavras-chave',
          type: 'string',
          initialValue: 'academia manaus, academia sem fidelidade, live academia, treino manaus, musculação manaus, aulas coletivas',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
      subtitle: 'hero.subtitle',
    },
  },
})
