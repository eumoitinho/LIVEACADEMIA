import { defineType, defineField } from 'sanity'

export const planoSchema = defineType({
  name: 'plano',
  title: 'Plano',
  type: 'document',
  groups: [
    { name: 'info', title: 'Informações', default: true },
    { name: 'pricing', title: 'Preços e Condições' },
    { name: 'benefits', title: 'Benefícios' },
    { name: 'display', title: 'Exibição' },
  ],
  fields: [
    // === INFORMAÇÕES ===
    defineField({
      name: 'name',
      title: 'Nome do Plano',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      group: 'info',
    }),
    defineField({
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
      group: 'info',
    }),

    // === PREÇOS E CONDIÇÕES ===
    defineField({
      name: 'price',
      title: 'Preço Mensal',
      description: 'Valor em reais (ex: 159.90)',
      type: 'number',
      group: 'pricing',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'enrollmentFee',
      title: 'Taxa de Adesão',
      description: 'Taxa de matrícula em reais (deixe 0 para "Sem taxa")',
      type: 'number',
      initialValue: 0,
      group: 'pricing',
    }),
    defineField({
      name: 'loyaltyMonths',
      title: 'Fidelidade (Meses)',
      description: 'Período de fidelidade em meses (0 = sem fidelidade)',
      type: 'number',
      initialValue: 0,
      group: 'pricing',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Label Promocional',
      description: 'Ex: "Oferta por tempo limitado"',
      type: 'string',
      group: 'pricing',
    }),

    // === BENEFÍCIOS ===
    defineField({
      name: 'features',
      title: 'Benefícios/Recursos',
      description: 'Lista de benefícios inclusos no plano',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'benefits',
    }),

    // === EXIBIÇÃO ===
    defineField({
      name: 'mostrarAdesao',
      title: 'Mostrar Taxa de Adesão',
      description: 'Exibir taxa de adesão no card do plano',
      type: 'boolean',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'mostrarFidelidade',
      title: 'Mostrar Fidelidade',
      description: 'Exibir período de fidelidade no card do plano',
      type: 'boolean',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'mostrarLabel',
      title: 'Mostrar Label Promocional',
      description: 'Exibir label promocional no card do plano',
      type: 'boolean',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'highlight',
      title: 'Plano em Destaque',
      description: 'Destacar este plano na página de planos',
      type: 'boolean',
      initialValue: false,
      group: 'display',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      description: 'Tag de destaque que aparece no card',
      type: 'string',
      group: 'display',
      options: {
        list: [
          { title: 'Nenhum', value: '' },
          { title: 'O mais vendido', value: 'O mais vendido' },
          { title: 'Recomendado', value: 'Recomendado' },
          { title: 'Novidade', value: 'Novidade' },
          { title: 'Oferta Especial', value: 'Oferta Especial' },
          { title: 'Melhor Custo-Benefício', value: 'Melhor Custo-Benefício' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 0,
      group: 'display',
    }),
    defineField({
      name: 'cta',
      title: 'Texto do Botão',
      type: 'string',
      initialValue: 'MATRICULE-SE AGORA',
      group: 'display',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'URL do Botão',
      type: 'url',
      description: 'Link de destino (deixe vazio para ir para /unidades)',
      group: 'display',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      highlight: 'highlight',
      active: 'active',
    },
    prepare({ title, price, highlight, active }) {
      const priceFormatted = price
        ? `R$ ${price.toFixed(2).replace('.', ',')}`
        : 'Preço não definido'
      const status = !active ? ' (Inativo)' : ''
      const star = highlight ? ' ⭐' : ''

      return {
        title: `${title}${star}${status}`,
        subtitle: priceFormatted,
      }
    },
  },
})
