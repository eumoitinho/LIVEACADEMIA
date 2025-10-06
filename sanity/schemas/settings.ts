import { defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Configurações Globais',
  fields: [
    { name: 'title', type: 'string', title: 'Título do site' },
    { name: 'description', type: 'text', rows: 3, title: 'Descrição' },
    { name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true } },
    { name: 'ogImage', type: 'image', title: 'Imagem OpenGraph', options: { hotspot: true } },
    {
      name: 'navigation',
      type: 'array',
      title: 'Menu Principal',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Rótulo' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    },
    {
      name: 'social',
      type: 'object',
      title: 'Redes Sociais',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'whatsapp', type: 'url', title: 'WhatsApp' },
        { name: 'tiktok', type: 'url', title: 'TikTok' },
      ],
    },
    {
      name: 'footer',
      type: 'object',
      title: 'Rodapé',
      fields: [
        { name: 'text', type: 'text', title: 'Texto', rows: 2 },
        { name: 'ctaLabel', type: 'string', title: 'CTA Label' },
        { name: 'ctaHref', type: 'string', title: 'CTA Link' },
      ],
    },
  ],
})
