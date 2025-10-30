import { defineType } from 'sanity'

export const modalidadesSectionSchema = defineType({
  name: 'modalidadesSection',
  title: 'Seção de Modalidades',
  type: 'document',
  fields: [
    // Header da Seção
    {
      name: 'header',
      title: 'Cabeçalho da Seção',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Energia e motivação em grupo para você ir além'
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          validation: Rule => Rule.required(),
          initialValue: 'As aulas coletivas da Live Academia são a maneira perfeita de se exercitar com motivação, energia e resultados garantidos. Nossos professores especializados guiam você em cada movimento.'
        }
      ]
    },

    // Modalidades em Destaque
    {
      name: 'featuredModalities',
      title: 'Modalidades em Destaque',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'subtitle',
              title: 'Subtítulo',
              type: 'string',
              description: 'Categoria ou tipo da modalidade',
              validation: Rule => Rule.required()
            },
            {
              name: 'title',
              title: 'Nome da Modalidade',
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
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'order',
              title: 'Ordem de Exibição',
              type: 'number',
              description: 'Ordem em que aparece na seção',
              initialValue: 0
            },
            {
              name: 'active',
              title: 'Ativa',
              type: 'boolean',
              description: 'Se deve ser exibida na seção',
              initialValue: true
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image'
            }
          }
        }
      ],
      validation: Rule => Rule.max(6).min(1),
      initialValue: [
        {
          subtitle: 'Dança',
          title: 'Fitdance',
          description: 'Transforme seu treino em diversão! Queime calorias dançando hits nacionais e internacionais com coreografias envolventes.',
          order: 1,
          active: true
        },
        {
          subtitle: 'Bike',
          title: 'Top Ride',
          description: 'Pedale rumo aos seus objetivos! Aula de cycling com música motivante e instructor experiente para queimar muitas calorias.',
          order: 2,
          active: true
        },
        {
          subtitle: 'Flexibilidade',
          title: 'Pilates Solo',
          description: 'Fortaleça seu core e melhore sua postura. Exercícios de pilates focados no fortalecimento e flexibilidade.',
          order: 3,
          active: true
        }
      ]
    },

    // CTA da Seção
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Texto do Botão',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'VEJA TODAS AS MODALIDADES'
        },
        {
          name: 'url',
          title: 'URL de Destino',
          type: 'string',
          description: 'Página para onde o botão direciona',
          validation: Rule => Rule.required(),
          initialValue: '/aulas-coletivas'
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
          name: 'backgroundColor',
          title: 'Cor de Fundo',
          type: 'string',
          description: 'Classe CSS para cor de fundo (opcional)',
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
      title: 'header.title'
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'Seção de Modalidades',
        subtitle: 'Homepage - Modalidades'
      }
    }
  }
})