import { defineType } from 'sanity'

export default defineType({
  name: 'imageWithAlt',
  type: 'object',
  title: 'Imagem',
  fields: [
    { name: 'image', type: 'image', title: 'Arquivo', options: { hotspot: true } },
    { name: 'alt', type: 'string', title: 'Alt', validation: (r) => r.required() },
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
  },
})
