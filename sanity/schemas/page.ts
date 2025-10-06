import { defineType } from 'sanity'

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Página',
  groups: [
    { name: 'content', title: 'Conteúdo' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'title', type: 'string', title: 'Título', validation: r => r.required() },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() },
    { name: 'excerpt', type: 'text', rows: 3, title: 'Resumo' },
    {
      name: 'sections',
      type: 'array',
      title: 'Seções',
      of: [
        { type: 'heroSection' },
        { type: 'aboutSection' },
        { type: 'unidadesSection' },
        { type: 'beneficiosSection' },
        { type: 'estruturaSection' },
        { type: 'modalidadesSection' },
        { type: 'planosSection' },
        { type: 'appSection' },
        { type: 'testimonialsSection' },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      options: { collapsible: true },
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', rows: 2, title: 'Meta Description' },
        { name: 'ogImage', type: 'image', title: 'OG Image', options: { hotspot: true } },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
