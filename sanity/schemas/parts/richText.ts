import { defineType } from 'sanity'

export default defineType({
  name: 'richText',
  title: 'Texto formatado',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Negrito', value: 'strong' },
          { title: 'Itálico', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { name: 'href', type: 'url', title: 'URL', validation: (r) => r.required() },
              { name: 'blank', type: 'boolean', title: 'Abrir em nova aba' },
            ],
          },
        ],
      },
    },
    { type: 'image', options: { hotspot: true } },
  ],
})
