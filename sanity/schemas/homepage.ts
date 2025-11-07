import { defineType, defineField } from 'sanity'

export const homepageSchema = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título da Página',
          type: 'string',
          initialValue: 'Live Academia | Rede de Academias em Manaus',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.',
        }),
        defineField({
          name: 'keywords',
          title: 'Palavras-chave',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['academia', 'manaus', 'fitness', 'musculação', 'aulas coletivas'],
        }),
      ],
    }),

    // Hero Section
    defineField({
      name: 'hero',
      title: 'Seção Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          description: 'Imagem de fundo da seção hero (recomendado: 1920x1080px)',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Importante para SEO e acessibilidade',
            }),
          ],
        }),
        defineField({
          name: 'title',
          title: 'Título (Linha 1)',
          type: 'string',
          initialValue: 'Transforme.',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtítulo (Linha 2)',
          type: 'string',
          initialValue: 'Evolua.',
        }),
        defineField({
          name: 'thirdTitle',
          title: 'Terceiro Título (Linha 3)',
          type: 'string',
          initialValue: 'Viva.',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Construído para atletas que exigem excelência em cada repetição.',
        }),
        defineField({
          name: 'rating',
          title: 'Avaliação',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Valor da Avaliação',
              type: 'string',
              initialValue: '4.9',
            }),
            defineField({
              name: 'label',
              title: 'Label da Avaliação',
              type: 'string',
              initialValue: 'Elite rating',
            }),
            defineField({
              name: 'subscribers',
              title: 'Número de Alunos',
              type: 'string',
              initialValue: '15k+ atletas',
            }),
          ],
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
              initialValue: 'Comece Agora',
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
              initialValue: 'Ver as aulas',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              initialValue: '/aulas-coletivas',
            }),
          ],
        }),
        defineField({
          name: 'footerText',
          title: 'Texto do Rodapé',
          type: 'string',
          initialValue: 'Protocolos de treino de elite. Suporte premium. Todos os dispositivos suportados.',
        }),
      ],
    }),

    // About Section
    defineField({
      name: 'about',
      title: 'Seção Sobre',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Sobre a Live Academia',
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Seu treino, suas regras',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 4,
          initialValue: 'A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.',
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
          initialValue: [
            { value: '10+', label: 'Anos de Experiência' },
            { value: '15k+', label: 'Alunos Ativos' },
          ],
        }),
        defineField({
          name: 'highlights',
          title: 'Destaques',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'Equipamentos de última geração',
            'Profissionais qualificados',
            'Aulas coletivas inclusas',
            'Sem fidelidade',
            'Horário flexível',
            'Ambiente climatizado',
          ],
        }),
      ],
    }),

    // Benefícios Section
    defineField({
      name: 'beneficios',
      title: 'Seção Benefícios',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Benefícios',
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
          rows: 3,
          initialValue: 'Descubra todos os benefícios que fazem da Live Academia a melhor escolha para sua jornada fitness.',
        }),
        defineField({
          name: 'items',
          title: 'Lista de Benefícios',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Ícone',
                  type: 'string',
                  initialValue: 'ShieldCheck',
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
                  title: 'Cor do Gradiente',
                  type: 'string',
                  initialValue: 'from-amber-500 to-yellow-600',
                }),
                defineField({
                  name: 'image',
                  title: 'Imagem',
                  type: 'string',
                  initialValue: '/images/beneficios/placeholder.jpg',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Planos Section
    defineField({
      name: 'planos',
      title: 'Seção Planos',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Planos',
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
          type: 'text',
          rows: 3,
          initialValue: 'Planos flexíveis sem fidelidade. Cancele quando quiser, sem multas ou taxas.',
        }),
        defineField({
          name: 'plans',
          title: 'Planos Disponíveis',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'plano' }],
            },
          ],
        }),
      ],
    }),

    // Testimonials Section
    defineField({
      name: 'testimonials',
      title: 'Seção Depoimentos',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Depoimentos',
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'O que nossos alunos dizem',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Conheça histórias reais de transformação de nossos alunos.',
        }),
        defineField({
          name: 'testimonials',
          title: 'Lista de Depoimentos',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'testimonial' }],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'hero.title',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Homepage',
        subtitle: subtitle || 'Página inicial da Live Academia',
      }
    },
  },
})