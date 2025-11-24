import { defineType, defineField } from 'sanity'

export const heroSectionSchema = defineType({
  name: 'heroSection',
  title: 'Seção Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      initialValue: 'Transforme seu corpo e sua vida',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      initialValue: 'A maior rede de academias de Manaus, com planos flexíveis e sem fidelidade para você treinar do seu jeito.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceTag',
      title: 'Tag de Preço',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto da Tag',
          type: 'string',
          initialValue: 'Planos a partir de',
        }),
        defineField({
          name: 'price',
          title: 'Preço',
          type: 'string',
          initialValue: 'R$ 119,90',
        }),
        defineField({
          name: 'showIcon',
          title: 'Mostrar Ícone Estrela',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Chamada para Ação',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'MATRICULE-SE AGORA',
        }),
        defineField({
          name: 'url',
          title: 'URL do Link',
          type: 'string',
          initialValue: '/planos',
        }),
        defineField({
          name: 'showArrow',
          title: 'Mostrar Seta',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'overlay',
      title: 'Configurações do Overlay',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Habilitar Overlay',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'opacity',
          title: 'Opacidade do Overlay',
          type: 'string',
          options: {
            list: [
              { title: 'Leve (30%)', value: 'from-black/30 via-black/20 to-black/10' },
              { title: 'Médio (50%)', value: 'from-black/50 via-black/30 to-black/20' },
              { title: 'Forte (70%)', value: 'from-black/70 via-black/50 to-black/30' },
            ],
          },
          initialValue: 'from-black/70 via-black/50 to-black/30',
        }),
      ],
    }),
    defineField({
      name: 'displaySettings',
      title: 'Configurações de Exibição',
      type: 'object',
      fields: [
        defineField({
          name: 'showOnHomepage',
          title: 'Exibir na Homepage',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showPriceTag',
          title: 'Exibir Tag de Preço',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Seção Hero',
        subtitle: subtitle || 'Configurações da seção hero',
      }
    },
  },
})