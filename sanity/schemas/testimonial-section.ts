import { defineType } from 'sanity'

export const testimonialSectionSchema = defineType({
  name: 'testimonialSection',
  title: 'Seção de Depoimentos',
  type: 'document',
  fields: [
    // Header da Seção
    {
      name: 'header',
      title: 'Cabeçalho da Seção',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          description: 'Texto do badge acima do título',
          initialValue: 'Depoimentos reais'
        },
        {
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'O que dizem nossos alunos'
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          validation: Rule => Rule.required(),
          initialValue: 'Histórias de evolução e motivação para você entrar agora.'
        }
      ]
    },

    // Depoimentos em Destaque
    {
      name: 'featuredTestimonials',
      title: 'Depoimentos em Destaque',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nome do Cliente',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'role',
              title: 'Profissão/Cargo',
              type: 'string',
              description: 'Profissão ou cargo do cliente'
            },
            {
              name: 'content',
              title: 'Conteúdo do Depoimento',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'avatar',
              title: 'Foto do Cliente',
              type: 'image',
              options: {
                hotspot: true
              },
              description: 'Foto do cliente (opcional)'
            },
            {
              name: 'rating',
              title: 'Avaliação (1-5)',
              type: 'number',
              validation: Rule => Rule.required().min(1).max(5),
              initialValue: 5
            },
            {
              name: 'order',
              title: 'Ordem de Exibição',
              type: 'number',
              description: 'Ordem em que aparece na seção',
              initialValue: 0
            },
            {
              name: 'featured',
              title: 'Destaque',
              type: 'boolean',
              description: 'Se deve aparecer em destaque',
              initialValue: false
            },
            {
              name: 'active',
              title: 'Ativo',
              type: 'boolean',
              description: 'Se deve ser exibido',
              initialValue: true
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'avatar'
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title,
                subtitle: subtitle || 'Cliente Live Academia'
              }
            }
          }
        }
      ],
      validation: Rule => Rule.max(10).min(1),
      initialValue: [
        {
          name: 'Maria Silva',
          role: 'Enfermeira',
          content: 'A Live Academia mudou minha vida! Perdi 15kg e ganhei muito mais disposição. Os professores são incríveis e sempre me motivam a dar o meu melhor.',
          rating: 5,
          order: 1,
          featured: true,
          active: true
        },
        {
          name: 'João Santos',
          role: 'Engenheiro',
          content: 'Excelente estrutura e atendimento. Consegui ganhar massa muscular e melhorar minha postura. Recomendo para todos!',
          rating: 5,
          order: 2,
          featured: true,
          active: true
        },
        {
          name: 'Ana Costa',
          role: 'Professora',
          content: 'O ambiente é acolhedor e os equipamentos são modernos. As aulas coletivas são fantásticas, principalmente o FitDance!',
          rating: 5,
          order: 3,
          featured: true,
          active: true
        }
      ]
    },

    // Estatísticas dos Depoimentos
    {
      name: 'statistics',
      title: 'Estatísticas',
      type: 'object',
      fields: [
        {
          name: 'averageRating',
          title: 'Avaliação Média',
          type: 'string',
          description: 'Avaliação média exibida (ex: 4.9)',
          initialValue: '4.9'
        },
        {
          name: 'satisfiedStudents',
          title: 'Alunos Satisfeitos',
          type: 'string',
          description: 'Número de alunos satisfeitos (ex: 10K+)',
          initialValue: '10K+'
        },
        {
          name: 'recommendation',
          title: 'Porcentagem de Recomendação',
          type: 'string',
          description: 'Porcentagem que recomendaria (ex: 98%)',
          initialValue: '98%'
        }
      ]
    },

    // Configuração para Referenciar Depoimentos do Schema Existente
    {
      name: 'useExistingTestimonials',
      title: 'Usar Depoimentos Cadastrados',
      type: 'boolean',
      description: 'Se deve usar os depoimentos do schema testimonial em vez dos depoimentos em destaque',
      initialValue: false
    },

    {
      name: 'linkedTestimonials',
      title: 'Depoimentos Vinculados',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }]
        }
      ],
      description: 'Depoimentos do schema testimonial para exibir nesta seção',
      hidden: ({ document }) => !document?.useExistingTestimonials
    },

    // Configurações de Exibição
    {
      name: 'displaySettings',
      title: 'Configurações de Exibição',
      type: 'object',
      fields: [
        {
          name: 'showOnHomepage',
          title: 'Exibir na Homepage',
          type: 'boolean',
          description: 'Se esta seção deve aparecer na homepage',
          initialValue: true
        },
        {
          name: 'showStatistics',
          title: 'Exibir Estatísticas',
          type: 'boolean',
          description: 'Se as estatísticas devem ser exibidas',
          initialValue: true
        },
        {
          name: 'maxTestimonials',
          title: 'Máximo de Depoimentos',
          type: 'number',
          description: 'Número máximo de depoimentos a exibir',
          initialValue: 6,
          validation: Rule => Rule.min(1).max(10)
        },
        {
          name: 'backgroundColor',
          title: 'Cor de Fundo',
          type: 'string',
          description: 'Classe CSS para cor de fundo',
          options: {
            list: [
              { title: 'Padrão (Transparente)', value: '' },
              { title: 'Preto', value: 'bg-black' },
              { title: 'Cinza Escuro', value: 'bg-zinc-900' },
              { title: 'Cinza', value: 'bg-zinc-800' }
            ]
          }
        }
      ]
    }
  ],

  preview: {
    select: {
      title: 'header.title',
      badge: 'header.badge',
      testimonialsCount: 'featuredTestimonials'
    },
    prepare(selection) {
      const { title, badge, testimonialsCount } = selection
      const count = testimonialsCount ? testimonialsCount.length : 0
      return {
        title: title || 'Seção de Depoimentos',
        subtitle: `${badge || 'Homepage'} - ${count} depoimentos`
      }
    }
  }
})