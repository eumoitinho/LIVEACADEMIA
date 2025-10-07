import { defineType } from 'sanity'

export default defineType({
  name: 'contatoSection',
  type: 'object',
  title: 'Contato',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    { name: 'subheading', type: 'text', rows: 3, title: 'Subtítulo' },
    {
      name: 'contactItems',
      type: 'array',
      title: 'Blocos de Contato',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'iconKey', type: 'string', title: 'Ícone (lucide key)' },
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'info', type: 'string', title: 'Info principal' },
            { name: 'action', type: 'string', title: 'Ação / label do botão' },
            { name: 'highlight', type: 'boolean', title: 'Destacar?' },
          ],
          preview: { select: { title: 'title', subtitle: 'info' } },
        },
      ],
    },
    { name: 'social', type: 'array', title: 'Redes sociais', of: [
      {
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Nome' },
          { name: 'url', type: 'string', title: 'URL' },
          { name: 'iconKey', type: 'string', title: 'Ícone (lucide key)' },
          { name: 'color', type: 'string', title: 'Gradiente/Cor (opcional)' },
        ],
        preview: { select: { title: 'name', subtitle: 'url' } },
      }
    ] },
    { name: 'whatsappLink', type: 'string', title: 'Link WhatsApp' },
    { name: 'formDisclaimer', type: 'string', title: 'Aviso do formulário' },
  ],
  preview: { select: { title: 'heading' } },
})
