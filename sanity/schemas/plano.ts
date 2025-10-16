import { defineType, defineField } from 'sanity'

export const planoSchema = defineType({
  name: 'plano',
  title: 'Plano',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Plano',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Preço (em centavos)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Label do Preço',
      type: 'string',
      initialValue: 'Oferta por tempo limitado',
    }),
    defineField({
      name: 'features',
      title: 'Benefícios/Recursos',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cta',
      title: 'Texto do CTA',
      type: 'string',
      initialValue: 'MATRICULE-SE AGORA',
    }),
    defineField({
      name: 'highlight',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'badge',
      title: 'Badge de Destaque',
      type: 'string',
      options: {
        list: [
          { title: 'Mais vendido', value: 'mais_vendido' },
          { title: 'Recomendado', value: 'recomendado' },
          { title: 'Novidade', value: 'novidade' },
          { title: 'Oferta', value: 'oferta' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      badge: 'badge',
    },
    prepare({ title, subtitle, badge }) {
      const price = subtitle ? `R$ ${(subtitle / 100).toFixed(2).replace('.', ',')}` : 'Preço não definido'
      const badgeText = badge ? ` - ${badge}` : ''
      return {
        title: `${title}${badgeText}`,
        subtitle: price,
      }
    },
  },
})
