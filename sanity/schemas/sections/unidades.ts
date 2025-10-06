import { defineType } from 'sanity'

export default defineType({
  name: 'unidadesSection',
  type: 'object',
  title: 'Unidades',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    { name: 'subheading', type: 'text', rows: 2, title: 'Subtítulo' },
    { name: 'showSearch', type: 'boolean', title: 'Mostrar busca?', initialValue: true },
  ],
  preview: { select: { title: 'heading' } },
})
