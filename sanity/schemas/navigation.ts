import { defineType, defineField } from 'sanity'

export const navigationSchema = defineType({
  name: 'navigation',
  title: 'Navegação do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Cabeçalho (Header)',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Configurações do Logo',
          type: 'object',
          fields: [
            defineField({
              name: 'showUnitName',
              title: 'Mostrar Nome da Unidade',
              type: 'boolean',
              initialValue: true,
              description: 'Exibe o nome da unidade atual abaixo do logo quando disponível',
            }),
          ],
        }),
        defineField({
          name: 'navigation',
          title: 'Links de Navegação',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Texto do Link',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'type',
                  title: 'Tipo de Link',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Link Interno', value: 'internal' },
                      { title: 'Link Externo', value: 'external' },
                      { title: 'Scroll para Seção', value: 'scroll' },
                    ],
                  },
                  initialValue: 'internal',
                }),
                defineField({
                  name: 'url',
                  title: 'URL/Caminho',
                  type: 'string',
                  description: 'Para links internos use /pagina, para externos use https://..., para scroll use o ID da seção (ex: beneficios)',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'openInNewTab',
                  title: 'Abrir em Nova Aba',
                  type: 'boolean',
                  initialValue: false,
                  description: 'Apenas para links externos',
                }),
                defineField({
                  name: 'order',
                  title: 'Ordem',
                  type: 'number',
                  initialValue: 0,
                }),
                defineField({
                  name: 'showOnMobile',
                  title: 'Exibir no Mobile',
                  type: 'boolean',
                  initialValue: true,
                }),
                defineField({
                  name: 'showOnDesktop',
                  title: 'Exibir no Desktop',
                  type: 'boolean',
                  initialValue: true,
                }),
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'url',
                  type: 'type',
                },
                prepare({ title, subtitle, type }) {
                  return {
                    title,
                    subtitle: `${type}: ${subtitle}`,
                  }
                },
              },
            },
          ],
          initialValue: [
            { label: 'Sobre', type: 'internal', url: '/sobre-nos', order: 1, showOnMobile: true, showOnDesktop: true },
            { label: 'Benefícios', type: 'scroll', url: 'beneficios', order: 2, showOnMobile: true, showOnDesktop: true },
            { label: 'Unidades', type: 'internal', url: '/unidades', order: 3, showOnMobile: true, showOnDesktop: true },
            { label: 'Aulas Coletivas', type: 'internal', url: '/aulas-coletivas', order: 4, showOnMobile: true, showOnDesktop: true },
            { label: 'Day Use', type: 'internal', url: '/day-use', order: 5, showOnMobile: true, showOnDesktop: true },
            { label: 'Planos', type: 'internal', url: '/planos', order: 6, showOnMobile: true, showOnDesktop: true },
            { label: 'Contato', type: 'scroll', url: 'contato', order: 7, showOnMobile: true, showOnDesktop: true },
          ],
        }),
        defineField({
          name: 'ctaButton',
          title: 'Botão de Call-to-Action',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto do Botão',
              type: 'string',
              initialValue: 'Matricule-se',
            }),
            defineField({
              name: 'mobileText',
              title: 'Texto do Botão Mobile',
              type: 'string',
              initialValue: 'Matricule-se Agora',
            }),
            defineField({
              name: 'url',
              title: 'URL do Botão',
              type: 'string',
              initialValue: '/planos',
            }),
            defineField({
              name: 'show',
              title: 'Exibir Botão',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        }),
        defineField({
          name: 'mobileMenu',
          title: 'Menu Mobile',
          type: 'object',
          fields: [
            defineField({
              name: 'openText',
              title: 'Texto Botão Abrir',
              type: 'string',
              initialValue: 'Menu',
            }),
            defineField({
              name: 'closeText',
              title: 'Texto Botão Fechar',
              type: 'string',
              initialValue: 'Close',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Rodapé (Footer)',
      type: 'object',
      fields: [
        defineField({
          name: 'about',
          title: 'Seção Sobre',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              initialValue: 'Live Academia',
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text',
              initialValue: 'A maior rede de academias de Manaus, oferecendo estrutura completa e planos flexíveis para sua jornada fitness.',
            }),
          ],
        }),
        defineField({
          name: 'sections',
          title: 'Seções do Footer',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Título da Seção',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'label',
                          title: 'Texto do Link',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'url',
                          title: 'URL',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'external',
                          title: 'Link Externo',
                          type: 'boolean',
                          initialValue: false,
                        }),
                      ],
                      preview: {
                        select: {
                          title: 'label',
                          subtitle: 'url',
                        },
                      },
                    },
                  ],
                }),
                defineField({
                  name: 'order',
                  title: 'Ordem',
                  type: 'number',
                  initialValue: 0,
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  links: 'links',
                },
                prepare({ title, links }) {
                  return {
                    title,
                    subtitle: `${links?.length || 0} links`,
                  }
                },
              },
            },
          ],
          initialValue: [
            {
              title: 'Navegação',
              order: 1,
              links: [
                { label: 'Sobre Nós', url: '/sobre-nos', external: false },
                { label: 'Unidades', url: '/unidades', external: false },
                { label: 'Planos', url: '/planos', external: false },
                { label: 'Contato', url: '/contato', external: false },
              ],
            },
            {
              title: 'Serviços',
              order: 2,
              links: [
                { label: 'Aulas Coletivas', url: '/aulas-coletivas', external: false },
                { label: 'Day Use', url: '/day-use', external: false },
                { label: 'Personal Trainer', url: '/personal', external: false },
                { label: 'Avaliação Física', url: '/avaliacao', external: false },
              ],
            },
            {
              title: 'Suporte',
              order: 3,
              links: [
                { label: 'Central de Ajuda', url: '/ajuda', external: false },
                { label: 'Trabalhe Conosco', url: '/trabalhe-conosco', external: false },
                { label: 'WhatsApp', url: 'https://wa.me/5592999999999', external: true },
              ],
            },
          ],
        }),
        defineField({
          name: 'socialMedia',
          title: 'Redes Sociais',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              initialValue: 'Nos siga',
            }),
            defineField({
              name: 'links',
              title: 'Links das Redes Sociais',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'platform',
                      title: 'Plataforma',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Instagram', value: 'instagram' },
                          { title: 'Facebook', value: 'facebook' },
                          { title: 'YouTube', value: 'youtube' },
                          { title: 'TikTok', value: 'tiktok' },
                          { title: 'LinkedIn', value: 'linkedin' },
                          { title: 'WhatsApp', value: 'whatsapp' },
                        ],
                      },
                    }),
                    defineField({
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'show',
                      title: 'Exibir',
                      type: 'boolean',
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'platform',
                      subtitle: 'url',
                    },
                  },
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'copyright',
          title: 'Copyright',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto do Copyright',
              type: 'string',
              initialValue: '© 2024 Live Academia. Todos os direitos reservados.',
            }),
            defineField({
              name: 'companyName',
              title: 'Nome da Empresa',
              type: 'string',
              initialValue: 'Live Academia',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configurações de Navegação',
        subtitle: 'Header e Footer do site',
      }
    },
  },
})