import { defineType } from 'sanity'

export const wellhubSectionSchema = defineType({
  name: 'wellhubSection',
  title: 'Seção Wellhub',
  type: 'document',
  fields: [
    // Header Principal
    {
      name: 'header',
      title: 'Cabeçalho Principal',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          description: 'Texto do badge acima do título',
          initialValue: 'Parceria oficial'
        },
        {
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Somos parceiros Wellhub'
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          validation: Rule => Rule.required(),
          initialValue: 'Na Live é assim. Estrutura e benefícios em um só lugar.'
        }
      ]
    },

    // Benefícios Wellhub
    {
      name: 'benefits',
      title: 'Benefícios Wellhub',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              description: 'Nome do ícone Lucide (ex: CheckCircle, Star, Shield)',
              validation: Rule => Rule.required()
            },
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'order',
              title: 'Ordem',
              type: 'number',
              initialValue: 0
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            }
          }
        }
      ],
      validation: Rule => Rule.max(6).min(1),
      initialValue: [
        {
          icon: 'CheckCircle',
          title: 'Acesso gratuito',
          description: 'Use seu benefício corporativo para treinar sem custo adicional',
          order: 1
        },
        {
          icon: 'Star',
          title: 'Rede completa',
          description: 'Acesse todas as unidades Live Academia de Manaus',
          order: 2
        },
        {
          icon: 'Shield',
          title: 'Sem burocracia',
          description: 'Ativação simples e rápida através do app Wellhub',
          order: 3
        },
        {
          icon: 'Calendar',
          title: 'Flexibilidade total',
          description: 'Treine quando quiser, sem restrições de horário',
          order: 4
        }
      ]
    },

    // Benefícios Detalhados
    {
      name: 'detailedBenefits',
      title: 'Benefícios Detalhados',
      type: 'array',
      of: [
        {
          type: 'text'
        }
      ],
      description: 'Lista de benefícios em texto corrido',
      initialValue: [
        'Acesso a todas as unidades Live Academia em Manaus através do seu benefício corporativo.',
        'Ambiente climatizado, equipamentos modernos e aulas coletivas inclusas.',
        'Flexibilidade total para treinar nos horários que melhor se adequam à sua rotina.'
      ]
    },

    // CTA Principal
    {
      name: 'primaryCTA',
      title: 'CTA Principal',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Texto do Botão',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'SAIBA MAIS'
        },
        {
          name: 'url',
          title: 'URL de Destino',
          type: 'string',
          description: 'Link para mais informações sobre Wellhub'
        }
      ]
    },

    // Banner Wellhub
    {
      name: 'banner',
      title: 'Banner Wellhub',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título do Banner',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Acesse a Live Academia através do Wellhub'
        },
        {
          name: 'description',
          title: 'Descrição do Banner',
          type: 'text',
          validation: Rule => Rule.required(),
          initialValue: 'Funcionários de empresas parceiras podem acessar nossa rede de academias através do benefício corporativo. Consulte se sua empresa é parceira.'
        },
        {
          name: 'image',
          title: 'Imagem do Banner',
          type: 'image',
          options: {
            hotspot: true
          },
          description: 'Logo ou imagem representativa do Wellhub'
        },
        {
          name: 'cta',
          title: 'CTA do Banner',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texto do Botão',
              type: 'string',
              initialValue: 'Consultar Empresa'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Link para consulta de empresas parceiras'
            }
          ]
        }
      ]
    },

    // Configurações de Exibição
    {
      name: 'displaySettings',
      title: 'Configurações de Exibição',
      type: 'object',
      fields: [
        {
          name: 'showOnHomepage',
          title: 'Exibir na Homepage',
          type: 'boolean',
          description: 'Se esta seção deve aparecer na homepage',
          initialValue: true
        },
        {
          name: 'showBanner',
          title: 'Exibir Banner',
          type: 'boolean',
          description: 'Se o banner Wellhub deve ser exibido',
          initialValue: true
        },
        {
          name: 'backgroundColor',
          title: 'Cor de Fundo',
          type: 'string',
          description: 'Classe CSS para cor de fundo',
          options: {
            list: [
              { title: 'Padrão (Transparente)', value: '' },
              { title: 'Preto', value: 'bg-black' },
              { title: 'Cinza Escuro', value: 'bg-zinc-900' },
              { title: 'Cinza', value: 'bg-zinc-800' }
            ]
          }
        }
      ]
    }
  ],

  preview: {
    select: {
      title: 'header.title',
      badge: 'header.badge'
    },
    prepare(selection) {
      const { title, badge } = selection
      return {
        title: title || 'Seção Wellhub',
        subtitle: badge ? `${badge} - Homepage` : 'Homepage - Wellhub'
      }
    }
  }
})