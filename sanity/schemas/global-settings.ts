import { defineType } from 'sanity'

export const globalSettingsSchema = defineType({
  name: 'globalSettings',
  title: 'Configurações Globais',
  type: 'document',
  fields: [
    // Contato Global
    {
      name: 'contact',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Telefone Principal',
          type: 'string',
          description: 'Telefone principal da empresa (ex: +5592999999999)',
          initialValue: '+5592999999999'
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
          description: 'Número do WhatsApp (ex: 5592999999999)',
          initialValue: '5592999999999'
        },
        {
          name: 'email',
          title: 'E-mail Principal',
          type: 'string',
          validation: Rule => Rule.email(),
          initialValue: 'contato@liveacademia.com.br'
        }
      ]
    },

    // Redes Sociais
    {
      name: 'socialMedia',
      title: 'Redes Sociais',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'URL do perfil no Instagram',
          initialValue: 'https://www.instagram.com/liveacademiamanaus/'
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'URL da página no Facebook'
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          description: 'URL do canal no YouTube'
        }
      ]
    },

    // URLs dos Apps
    {
      name: 'appUrls',
      title: 'URLs dos Aplicativos',
      type: 'object',
      fields: [
        {
          name: 'appStoreUrl',
          title: 'App Store URL',
          type: 'url',
          description: 'Link do app na App Store'
        },
        {
          name: 'playStoreUrl',
          title: 'Google Play URL',
          type: 'url',
          description: 'Link do app no Google Play'
        }
      ]
    },

    // Textos de CTA Globais
    {
      name: 'globalCTAs',
      title: 'CTAs Globais',
      type: 'object',
      fields: [
        {
          name: 'primaryCTA',
          title: 'CTA Primário',
          type: 'string',
          description: 'Texto do botão principal (ex: MATRICULE-SE AGORA)',
          initialValue: 'MATRICULE-SE AGORA'
        },
        {
          name: 'secondaryCTA',
          title: 'CTA Secundário',
          type: 'string',
          description: 'Texto do botão secundário (ex: SAIBA MAIS)',
          initialValue: 'SAIBA MAIS'
        },
        {
          name: 'plansCTA',
          title: 'CTA Ver Planos',
          type: 'string',
          description: 'Texto para ver planos',
          initialValue: 'Ver planos e preços'
        },
        {
          name: 'consultorCTA',
          title: 'CTA Falar com Consultor',
          type: 'string',
          description: 'Texto para contato',
          initialValue: 'Falar com consultor'
        }
      ]
    },

    // Floating Button
    {
      name: 'floatingButtons',
      title: 'Botões Flutuantes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Rótulo',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'Telefone', value: 'phone' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'E-mail', value: 'email' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'URL/Link',
              type: 'string',
              description: 'URL completa (tel:, https:, mailto:)',
              validation: Rule => Rule.required()
            },
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              description: 'Nome do ícone Lucide (Phone, MessageCircle, Instagram, Mail)',
              validation: Rule => Rule.required()
            },
            {
              name: 'order',
              title: 'Ordem',
              type: 'number',
              description: 'Ordem de exibição',
              initialValue: 0
            },
            {
              name: 'active',
              title: 'Ativo',
              type: 'boolean',
              description: 'Exibir este botão',
              initialValue: true
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'type'
            }
          }
        }
      ],
      initialValue: [
        {
          label: 'Telefone',
          type: 'phone',
          url: 'tel:+5592999999999',
          icon: 'Phone',
          order: 1,
          active: true
        },
        {
          label: 'WhatsApp',
          type: 'whatsapp',
          url: 'https://wa.me/5592999999999',
          icon: 'MessageCircle',
          order: 2,
          active: true
        },
        {
          label: 'Instagram',
          type: 'instagram',
          url: 'https://www.instagram.com/liveacademiamanaus/',
          icon: 'Instagram',
          order: 3,
          active: true
        }
      ]
    },

    // Configurações Gerais
    {
      name: 'general',
      title: 'Configurações Gerais',
      type: 'object',
      fields: [
        {
          name: 'companyName',
          title: 'Nome da Empresa',
          type: 'string',
          initialValue: 'Live Academia'
        },
        {
          name: 'tagline',
          title: 'Slogan',
          type: 'string',
          description: 'Frase marcante da empresa'
        },
        {
          name: 'address',
          title: 'Endereço Principal',
          type: 'text',
          description: 'Endereço da sede/matriz'
        },
        {
          name: 'workingHours',
          title: 'Horário de Funcionamento',
          type: 'string',
          description: 'Horário padrão de funcionamento',
          initialValue: 'Seg-Dom: 6h às 23h'
        }
      ]
    }
  ],

  preview: {
    prepare() {
      return {
        title: 'Configurações Globais'
      }
    }
  }
})