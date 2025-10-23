import { defineType, defineField } from 'sanity'

export const sobreSchema = defineType({
  name: 'sobre',
  title: 'Página Sobre',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem de Fundo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo Principal',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título da Seção',
              type: 'string'
            }),
            defineField({
              name: 'content',
              title: 'Conteúdo',
              type: 'text',
              rows: 4
            }),
            defineField({
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: {
                hotspot: true
              }
            }),
            defineField({
              name: 'order',
              title: 'Ordem',
              type: 'number'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'values',
      title: 'Nossos Valores',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text'
            }),
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              description: 'Nome do ícone (ex: heart, users, target)'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'mission',
      title: 'Missão',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'vision',
      title: 'Visão',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'history',
      title: 'Nossa História',
      type: 'text',
      rows: 5
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
              name: 'number',
              title: 'Número',
              type: 'string'
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'string'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'team',
      title: 'Nossa Equipe',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text'
        }),
        defineField({
          name: 'members',
          title: 'Membros da Equipe',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Nome',
                  type: 'string'
                }),
                defineField({
                  name: 'position',
                  title: 'Cargo',
                  type: 'string'
                }),
                defineField({
                  name: 'bio',
                  title: 'Biografia',
                  type: 'text'
                }),
                defineField({
                  name: 'photo',
                  title: 'Foto',
                  type: 'image',
                  options: {
                    hotspot: true
                  }
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text'
        }),
        defineField({
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string'
        }),
        defineField({
          name: 'buttonUrl',
          title: 'URL do Botão',
          type: 'url'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Página Sobre'
      }
    }
  }
})
