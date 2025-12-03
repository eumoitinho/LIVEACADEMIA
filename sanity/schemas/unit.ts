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
      title: '⭐ Configuração de Planos (Seletor Avançado)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'planoConfig',
          title: 'Configuração do Plano',
          fields: [
            defineField({
              name: 'codigoApi',
              title: 'Código do Plano (API)',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Código do plano retornado pela API Pacto. Exemplo: "918", "1034"',
            }),
            defineField({
              name: 'nomeOriginal',
              title: 'Nome Original (API)',
              type: 'string',
              readOnly: true,
              description: 'Nome original do plano vindo da API (preenchido automaticamente)',
            }),
            defineField({
              name: 'valorOriginal',
              title: 'Valor Original (API)',
              type: 'string',
              readOnly: true,
              description: 'Valor original do plano vindo da API (preenchido automaticamente)',
            }),
            defineField({
              name: 'nomeExibicao',
              title: 'Nome de Exibição (Override)',
              type: 'string',
              description: 'Se preenchido, substitui o nome original na exibição. O nome original é mantido no checkout.',
            }),
            defineField({
              name: 'precoExibicao',
              title: 'Preço de Exibição (Override)',
              type: 'string',
              description: 'Se preenchido, substitui o preço na exibição. O preço original é mantido no checkout.',
            }),
            defineField({
              name: 'descricaoExibicao',
              title: 'Descrição Personalizada',
              type: 'text',
              rows: 2,
              description: 'Descrição personalizada para este plano nesta unidade',
            }),
            defineField({
              name: 'beneficiosExibicao',
              title: 'Benefícios Personalizados',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Lista de benefícios para exibir. Se vazio, usa os padrões do plano.',
            }),
            defineField({
              name: 'visivel',
              title: 'Visível no Site',
              type: 'boolean',
              initialValue: true,
              description: 'Se desmarcado, este plano não aparece na página da unidade',
            }),
            defineField({
              name: 'destaque',
              title: 'Plano em Destaque',
              type: 'boolean',
              initialValue: false,
              description: 'Se marcado, este plano recebe destaque visual (borda dourada, badge)',
            }),
            defineField({
              name: 'ordem',
              title: 'Ordem de Exibição',
              type: 'number',
              initialValue: 0,
              description: 'Ordem de exibição (menor número aparece primeiro)',
            }),
            defineField({
              name: 'badge',
              title: 'Badge do Plano',
              type: 'string',
              options: {
                list: [
                  { title: 'Nenhum', value: '' },
                  { title: 'Mais vendido', value: 'MAIS VENDIDO' },
                  { title: 'Recomendado', value: 'RECOMENDADO' },
                  { title: 'Novidade', value: 'NOVIDADE' },
                  { title: 'Oferta', value: 'OFERTA' },
                  { title: 'Melhor custo-benefício', value: 'MELHOR CUSTO-BENEFÍCIO' },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'nomeExibicao',
              originalName: 'nomeOriginal',
              codigo: 'codigoApi',
              visivel: 'visivel',
              destaque: 'destaque',
            },
            prepare({ title, originalName, codigo, visivel, destaque }) {
              const name = title || originalName || `Plano ${codigo}`
              const status = !visivel ? '🔴 Oculto' : destaque ? '⭐ Destaque' : '✅ Visível'
              return {
                title: name,
                subtitle: `Código: ${codigo} | ${status}`,
              }
            },
          },
        },
      ],
      description: 'Configure quais planos da API aparecem nesta unidade, com opção de personalizar textos de exibição. Os dados originais são preservados para o checkout.',
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
