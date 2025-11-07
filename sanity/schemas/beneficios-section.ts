import { defineType, defineField } from 'sanity'

export const beneficiosSectionSchema = defineType({
  name: 'beneficiosSection',
  title: 'Seção de Benefícios',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Texto do badge (opcional)',
    }),
    defineField({
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Mais do que treino, uma experiência completa',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      description: 'Descrição geral da seção (opcional)',
    }),
    defineField({
      name: 'items',
      title: 'Itens de Benefícios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              options: {
                list: [
                  { title: 'Shield Check', value: 'ShieldCheck' },
                  { title: 'Star', value: 'Star' },
                  { title: 'Users', value: 'Users' },
                  { title: 'Snowflake', value: 'Snowflake' },
                  { title: 'Zap', value: 'Zap' },
                  { title: 'Check Circle', value: 'CheckCircle' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'color',
              title: 'Cor do Gradiente',
              type: 'string',
              description: 'Classe CSS do gradiente (ex: from-yellow-400 to-amber-500)',
              options: {
                list: [
                  { title: 'Amarelo/Âmbar', value: 'from-yellow-400 to-amber-500' },
                  { title: 'Âmbar/Amarelo Escuro', value: 'from-amber-500 to-yellow-600' },
                  { title: 'Amarelo/Âmbar Escuro', value: 'from-yellow-500 to-amber-600' },
                ],
              },
              initialValue: 'from-yellow-400 to-amber-500',
            }),
            defineField({
              name: 'image',
              title: 'Imagem de Fundo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Ordem',
              type: 'number',
              description: 'Ordem de exibição',
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
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
          description: 'Se esta seção deve aparecer na homepage',
          initialValue: true,
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Cor de Fundo',
          type: 'string',
          description: 'Classe CSS para cor de fundo da seção',
          options: {
            list: [
              { title: 'Padrão (Preto/Gradiente)', value: '' },
              { title: 'Preto', value: 'bg-black' },
              { title: 'Cinza Escuro', value: 'bg-zinc-900' },
            ],
          },
        }),
        defineField({
          name: 'overlayGradient',
          title: 'Gradiente de Overlay (Item Ativo)',
          type: 'object',
          description: 'Gradiente aplicado quando um item está ativo',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Habilitar Gradiente de Overlay',
              type: 'boolean',
              description: 'Aplicar gradiente amarelo/âmbar sobre o item ativo',
              initialValue: true,
            }),
            defineField({
              name: 'colorFrom',
              title: 'Cor Inicial',
              type: 'string',
              description: 'Cor inicial do gradiente (opacidade incluída)',
              options: {
                list: [
                  { title: 'Amarelo 15%', value: 'yellow-400/15' },
                  { title: 'Amarelo 20%', value: 'yellow-400/20' },
                  { title: 'Amarelo 25%', value: 'yellow-400/25' },
                  { title: 'Âmbar 15%', value: 'amber-500/15' },
                  { title: 'Âmbar 20%', value: 'amber-500/20' },
                ],
              },
              initialValue: 'yellow-400/15',
            }),
            defineField({
              name: 'colorVia',
              title: 'Cor Intermediária',
              type: 'string',
              description: 'Cor intermediária do gradiente',
              options: {
                list: [
                  { title: 'Âmbar 10%', value: 'amber-500/10' },
                  { title: 'Âmbar 15%', value: 'amber-500/15' },
                  { title: 'Amarelo 10%', value: 'yellow-400/10' },
                ],
              },
              initialValue: 'amber-500/10',
            }),
            defineField({
              name: 'blendMode',
              title: 'Modo de Mistura',
              type: 'string',
              description: 'Modo de mistura CSS (blend mode)',
              options: {
                list: [
                  { title: 'Overlay', value: 'mix-blend-overlay' },
                  { title: 'Soft Light', value: 'mix-blend-soft-light' },
                  { title: 'Screen', value: 'mix-blend-screen' },
                  { title: 'Multiply', value: 'mix-blend-multiply' },
                  { title: 'Normal', value: '' },
                ],
              },
              initialValue: 'mix-blend-overlay',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      showOnHomepage: 'displaySettings.showOnHomepage',
    },
    prepare({ title, showOnHomepage }) {
      return {
        title: title || 'Seção de Benefícios',
        subtitle: showOnHomepage !== false ? 'Visível na Homepage' : 'Oculta',
      }
    },
  },
})

