import { defineType, defineField } from 'sanity'

export const unitSchema = defineType({
  name: 'unit',
  title: 'Unidade',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Unidade',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Cidade',
      type: 'string',
      initialValue: 'Manaus',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'Estado',
      type: 'string',
      initialValue: 'AM',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zipCode',
      title: 'CEP',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Tradicional', value: 'Tradicional' },
          { title: 'Tradicional Climatizada', value: 'Tradicional Climatizada' },
          { title: 'Premium', value: 'Premium' },
          { title: 'Diamante', value: 'Diamante' },
          { title: 'Em Inauguração', value: 'Em Inauguração' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Serviços',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Climatização', value: 'Climatização' },
              { title: 'Espaço Relax', value: 'Espaço Relax' },
              { title: 'Espaço Yoga', value: 'Espaço Yoga' },
              { title: 'Espaço Pose', value: 'Espaço Pose' },
              { title: 'Studio de Bike', value: 'Studio de Bike' },
              { title: 'Sauna', value: 'Sauna' },
              { title: 'Estacionamento', value: 'Estacionamento' },
              { title: 'Estacionamento Coberto', value: 'Estacionamento Coberto' },
              { title: 'Toalhas de Cortesia', value: 'Toalhas de Cortesia' },
              { title: 'Espaço Gourmet', value: 'Espaço Gourmet' },
              { title: 'Atendimento Domingos', value: 'Atendimento Domingos' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Foto Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Foto principal da unidade (usada nos cards e hero da página)',
    }),
    defineField({
      name: 'images',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Galeria adicional de imagens da unidade',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'openingHours',
      title: 'Horário de Funcionamento',
      type: 'string',
      initialValue: 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 22h | Domingo: 6h às 20h',
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      initialValue: 0,
      description: 'Ordem de exibição no carousel (menor número aparece primeiro)',
    }),
    defineField({
      name: 'active',
      title: 'Ativa',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'planos',
      title: 'Planos da Unidade',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'nome',
              title: 'Nome do Plano',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'preco',
              title: 'Preço',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Ex: "119,90" ou "R$ 119,90"',
            }),
            defineField({
              name: 'periodo',
              title: 'Período',
              type: 'string',
              initialValue: 'mês',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'destaque',
              title: 'Plano em Destaque',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'badge',
              title: 'Badge do Plano',
              type: 'string',
              options: {
                list: [
                  { title: 'Mais vendido', value: 'MAIS VENDIDO' },
                  { title: 'Recomendado', value: 'RECOMENDADO' },
                  { title: 'Novidade', value: 'NOVIDADE' },
                  { title: 'Oferta', value: 'OFERTA' },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'nome',
              subtitle: 'preco',
            },
          },
        },
      ],
      description: 'Planos específicos desta unidade (sobrescreve os planos globais)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'photo',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: `${subtitle} • ${title}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Ordem',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nome',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
