import { defineType, defineField } from 'sanity'
import PlanosSelectorInput from '../components/PlanosSelectorInput'

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
      name: 'modalidades',
      title: '🏋️ Modalidades Disponíveis',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'modality' }],
        },
      ],
      description: 'Selecione as modalidades oferecidas nesta unidade (cadastradas em "Modalidades")',
    }),
    defineField({
      name: 'beneficios',
      title: '⭐ Benefícios da Unidade',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'benefit' }],
        },
      ],
      description: 'Selecione os benefícios oferecidos nesta unidade (cadastrados em "Benefícios")',
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
      title: 'Unidade Ativa',
      type: 'boolean',
      initialValue: true,
      description: 'Se desmarcado, a unidade nao aparecera na listagem do site',
    }),
    defineField({
      name: 'inaugurada',
      title: 'Unidade Inaugurada',
      type: 'boolean',
      initialValue: true,
      description: 'Se desmarcado, a unidade aparecera escurecida com "Em breve" (ainda nao inaugurada)',
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
      description: 'Se marcado, a unidade tera destaque especial na listagem',
    }),
    defineField({
      name: 'planos',
      title: 'Planos da Unidade (Fallback)',
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
            defineField({
              name: 'codigo',
              title: 'Código API (opcional)',
              type: 'string',
              description: 'Código do plano na API Pacto (se disponível)',
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
      description: 'Planos de fallback (usados apenas se a API Pacto não retornar planos ou filtros específicos não retornarem resultados).',
    }),
    defineField({
      name: 'planosConfig',
      title: '⭐ Seletor de Planos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'planoConfig',
          fields: [
            defineField({ name: 'codigoApi', title: 'Código API', type: 'string' }),
            defineField({ name: 'nomeOriginal', title: 'Nome Original', type: 'string' }),
            defineField({ name: 'valorOriginal', title: 'Valor Original', type: 'string' }),
            defineField({ name: 'nomeExibicao', title: 'Nome Exibição', type: 'string' }),
            defineField({ name: 'precoExibicao', title: 'Preço Exibição', type: 'string' }),
            defineField({ name: 'descricaoExibicao', title: 'Descrição', type: 'text' }),
            defineField({ name: 'beneficiosExibicao', title: 'Benefícios', type: 'array', of: [{ type: 'string' }] }),
            defineField({ name: 'visivel', title: 'Visível', type: 'boolean', initialValue: true }),
            defineField({ name: 'destaque', title: 'Destaque', type: 'boolean', initialValue: false }),
            defineField({ name: 'ordem', title: 'Ordem', type: 'number', initialValue: 0 }),
            defineField({ name: 'badge', title: 'Badge', type: 'string' }),
          ],
        },
      ],
      components: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input: PlanosSelectorInput as any,
      },
      description: 'Clique em "Recarregar Planos da API" para ver todos os planos disponíveis e selecione quais devem aparecer nesta unidade.',
    }),
    defineField({
      name: 'filtroPlanos',
      title: 'Filtro de Planos da API',
      type: 'object',
      fields: [
        defineField({
          name: 'precoMinimo',
          title: 'Preço Mínimo (R$)',
          type: 'number',
          initialValue: 89.90,
          description: 'Valor mínimo em reais para exibir planos da API Pacto (padrão: 89,90)',
        }),
        defineField({
          name: 'codigosPermitidos',
          title: 'Códigos de Planos Permitidos',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Lista de códigos de planos permitidos (opcional). Se vazio, usa a Configuração de Planos acima.',
        }),
        defineField({
          name: 'usarPlanosSanity',
          title: 'Usar Apenas Planos Configurados',
          type: 'boolean',
          initialValue: false,
          description: 'Se marcado, usa apenas os planos configurados em "Configuração de Planos" ou "Planos da Unidade (Fallback)"',
        }),
        defineField({
          name: 'usarConfigAvancada',
          title: 'Usar Configuração Avançada',
          type: 'boolean',
          initialValue: true,
          description: 'Se marcado, aplica as configurações de "Configuração de Planos" (visibilidade, destaque, ordem, textos personalizados)',
        }),
      ],
      description: 'Configurações de filtro e exibição para os planos',
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
