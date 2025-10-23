import { defineType, defineField } from 'sanity'

export const trabalheConoscoSchema = defineType({
  name: 'trabalheConosco',
  title: 'Página Trabalhe Conosco',
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
      name: 'benefits',
      title: 'Benefícios',
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
              description: 'Nome do ícone (ex: heart, users, award)'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'openPositions',
      title: 'Vagas Abertas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título da Vaga',
              type: 'string'
            }),
            defineField({
              name: 'department',
              title: 'Departamento',
              type: 'string'
            }),
            defineField({
              name: 'location',
              title: 'Localização',
              type: 'string'
            }),
            defineField({
              name: 'type',
              title: 'Tipo de Contrato',
              type: 'string',
              options: {
                list: [
                  { title: 'CLT', value: 'clt' },
                  { title: 'PJ', value: 'pj' },
                  { title: 'Estágio', value: 'estagio' },
                  { title: 'Freelance', value: 'freelance' }
                ]
              }
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text'
            }),
            defineField({
              name: 'requirements',
              title: 'Requisitos',
              type: 'array',
              of: [{ type: 'string' }]
            }),
            defineField({
              name: 'benefits',
              title: 'Benefícios da Vaga',
              type: 'array',
              of: [{ type: 'string' }]
            }),
            defineField({
              name: 'salary',
              title: 'Faixa Salarial',
              type: 'string'
            }),
            defineField({
              name: 'isActive',
              title: 'Vaga Ativa',
              type: 'boolean',
              initialValue: true
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'formTitle',
      title: 'Título do Formulário',
      type: 'string',
      initialValue: 'Candidatar-se'
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
                  { title: 'Select', value: 'select' },
                  { title: 'File', value: 'file' }
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
          initialValue: 'Enviar Candidatura'
        }),
        defineField({
          name: 'url',
          title: 'URL de Destino',
          type: 'url'
        })
      ]
    }),
    defineField({
      name: 'contactInfo',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email para CV',
          type: 'string'
        }),
        defineField({
          name: 'phone',
          title: 'Telefone',
          type: 'string'
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string'
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
        title: selection.title || 'Página Trabalhe Conosco'
      }
    }
  }
})
