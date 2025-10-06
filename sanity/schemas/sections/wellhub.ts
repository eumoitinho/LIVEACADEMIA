import { defineType } from 'sanity'

export default defineType({
  name: 'wellhubSection',
  type: 'object',
  title: 'Wellhub',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    { name: 'subheading', type: 'text', rows: 3, title: 'Subtítulo' },
    { name: 'parceriaLabel', type: 'string', title: 'Texto Badge Parceria' },
    {
      name: 'cards',
      type: 'array',
      title: 'Cards Benefícios',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Ícone (award|gift|users|star)', options: { list: [ 'award','gift','users','star' ] } },
            { name: 'titulo', type: 'string', title: 'Título' },
            { name: 'descricao', type: 'text', rows: 2, title: 'Descrição' },
          ],
          preview: { select: { title: 'titulo', subtitle: 'descricao' } },
        }
      ]
    },
    { name: 'detalhes', type: 'array', title: 'Lista Detalhes', of: [{ type: 'string' }] },
    { name: 'primaryCtaLabel', type: 'string', title: 'CTA Principal Label' },
    { name: 'primaryCtaHref', type: 'string', title: 'CTA Principal Link' },
    { name: 'secondaryCtaLabel', type: 'string', title: 'CTA Secundário Label' },
    { name: 'secondaryCtaHref', type: 'string', title: 'CTA Secundário Link' },
    { name: 'bannerTitle', type: 'string', title: 'Título Banner' },
    { name: 'bannerText', type: 'text', rows: 3, title: 'Texto Banner' },
    { name: 'bannerPrimaryCtaLabel', type: 'string', title: 'CTA Banner Primário Label' },
    { name: 'bannerPrimaryCtaHref', type: 'string', title: 'CTA Banner Primário Link' },
    { name: 'bannerSecondaryCtaLabel', type: 'string', title: 'CTA Banner Secundário Label' },
    { name: 'bannerSecondaryCtaHref', type: 'string', title: 'CTA Banner Secundário Link' },
  ],
  preview: { select: { title: 'heading' } },
})
