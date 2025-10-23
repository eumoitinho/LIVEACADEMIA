import { defineType, defineField } from 'sanity'

export const contatoSchema = defineType({
  name: 'contato',
  title: 'Página de Contato',
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
      name: 'contactInfo',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Telefone',
          type: 'string'
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string'
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string'
        }),
        defineField({
          name: 'address',
          title: 'Endereço',
          type: 'text'
        }),
        defineField({
          name: 'hours',
          title: 'Horário de Funcionamento',
          type: 'text'
        })
      ]
    }),
    defineField({
      name: 'socialNetworks',
      title: 'Redes Sociais',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nome da Rede',
              type: 'string'
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url'
            }),
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              description: 'Nome do ícone (ex: instagram, facebook, twitter)'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'formTitle',
      title: 'Título do Formulário',
      type: 'string',
      initialValue: 'Entre em contato'
    }),
    defineField({
      name: 'formDescription',
      title: 'Descrição do Formulário',
      type: 'text'
    }),
    defineField({
      name: 'formFields',
      title: 'Campos do Formulário',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nome do Campo',
              type: 'string'
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string'
            }),
            defineField({
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'Texto', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Telefone', value: 'tel' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Select', value: 'select' }
                ]
              }
            }),
            defineField({
              name: 'required',
              title: 'Obrigatório',
              type: 'boolean',
              initialValue: false
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string'
            }),
            defineField({
              name: 'options',
              title: 'Opções (para select)',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => parent?.type !== 'select'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'ctaButton',
      title: 'Botão CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'Enviar Mensagem'
        }),
        defineField({
          name: 'url',
          title: 'URL de Destino',
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
        title: selection.title || 'Página de Contato'
      }
    }
  }
})
