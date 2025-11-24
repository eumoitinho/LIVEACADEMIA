import { defineType, defineField } from 'sanity'

export const unidadesSectionSchema = defineType({
  name: 'unidadesSection',
  title: 'Seção de Unidades (Homepage)',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Cabeçalho da Seção',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Encontre a Live mais perto de você',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          validation: (Rule) => Rule.required(),
          initialValue: 'Estamos presentes em diversos pontos de Manaus para facilitar seu acesso à atividade física.',
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'VER TODAS AS UNIDADES',
        }),
        defineField({
          name: 'url',
          title: 'URL de Destino',
          type: 'string',
          initialValue: '/unidades',
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
          description: 'Se esta seção deve aparecer na homepage',
          initialValue: true,
        }),
        defineField({
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Carrossel', value: 'carousel' },
              { title: 'Grade', value: 'grid' },
            ],
          },
          initialValue: 'carousel',
          description: 'Como as unidades serão exibidas',
        }),
        defineField({
          name: 'maxUnits',
          title: 'Máximo de Unidades',
          type: 'number',
          description: 'Quantas unidades mostrar (0 = todas)',
          initialValue: 0,
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'showLocationButton',
          title: 'Exibir Botão de Localização',
          type: 'boolean',
          description: 'Mostrar botão para encontrar unidade mais próxima',
          initialValue: true,
        }),
        defineField({
          name: 'locationButtonText',
          title: 'Texto do Botão de Localização',
          type: 'string',
          initialValue: 'Encontrar unidade mais próxima de você',
        }),
        defineField({
          name: 'autoPlay',
          title: 'Auto-play do Carrossel',
          type: 'boolean',
          description: 'Ativar rotação automática do carrossel',
          initialValue: true,
        }),
        defineField({
          name: 'autoPlayInterval',
          title: 'Intervalo do Auto-play (ms)',
          type: 'number',
          description: 'Tempo entre slides em milissegundos',
          initialValue: 5000,
          validation: (Rule) => Rule.min(1000),
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Cor de Fundo',
          type: 'string',
          description: 'Classe CSS para cor de fundo (opcional)',
          options: {
            list: [
              { title: 'Padrão (Preto)', value: '' },
              { title: 'Preto', value: 'bg-black' },
              { title: 'Cinza Escuro', value: 'bg-zinc-900' },
              { title: 'Transparente', value: 'bg-transparent' },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'header.title',
      showOnHomepage: 'displaySettings.showOnHomepage',
    },
    prepare({ title, showOnHomepage }) {
      return {
        title: title || 'Seção de Unidades',
        subtitle: showOnHomepage !== false ? 'Visível na Homepage' : 'Oculta',
      }
    },
  },
})

