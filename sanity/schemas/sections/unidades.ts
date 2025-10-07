import { defineType } from 'sanity'

export default defineType({
  name: 'unidadesSection',
  type: 'object',
  title: 'Unidades',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    { name: 'subheading', type: 'text', rows: 2, title: 'Subtítulo' },
    { name: 'showSearch', type: 'boolean', title: 'Mostrar busca?', initialValue: true },
    {
      name: 'unidades',
      type: 'array',
      title: 'Unidades',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'nome', type: 'string', title: 'Nome' },
            { name: 'endereco', type: 'string', title: 'Endereço' },
            { name: 'imagem', type: 'image', title: 'Imagem', options: { hotspot: true } },
            { name: 'badgeText', type: 'string', title: 'Badge Texto' },
            { name: 'badgeVariant', type: 'string', title: 'Badge Variante' },
            { name: 'link', type: 'string', title: 'Link (maps/site)' },
          ],
          preview: { select: { title: 'nome', subtitle: 'badgeText' } },
        },
      ],
    },
  ],
  preview: { select: { title: 'heading' } },
})
