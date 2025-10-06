import { defineType } from 'sanity'

export default defineType({
  name: 'bioimpedanciaSection',
  type: 'object',
  title: 'Bioimpedância / 3D',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    { name: 'subheading', type: 'text', rows: 3, title: 'Subtítulo' },
    {
      name: 'beneficiosIntro',
      type: 'array',
      title: 'Benefícios (Introdução)',
      of: [{ type: 'string' }],
    },
    {
      name: 'dados',
      type: 'array',
      title: 'Blocos de Dados',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Ícone (activity|barchart|zap|agua)', options: { list: [ 'activity','barchart','zap','agua' ] } },
            { name: 'titulo', type: 'string', title: 'Título' },
            { name: 'descricao', type: 'text', rows: 3, title: 'Descrição' },
            { name: 'colorFrom', type: 'string', title: 'Cor Gradiente (from-*)' },
            { name: 'colorTo', type: 'string', title: 'Cor Gradiente (to-*)' },
          ],
          preview: { select: { title: 'titulo', subtitle: 'descricao' } },
        }
      ]
    },
    { name: 'cta3dLabel', type: 'string', title: 'CTA Análise 3D Label' },
    { name: 'cta3dHref', type: 'string', title: 'CTA Análise 3D Link' },
    { name: 'highlightPrice', type: 'string', title: 'Preço Destaque (ex: R$ 100)' },
    {
      name: 'bottomPrimaryCtaLabel', type: 'string', title: 'CTA Primário Rodapé'
    },
    { name: 'bottomPrimaryCtaHref', type: 'string', title: 'Link CTA Primário Rodapé' },
    { name: 'bottomSecondaryCtaLabel', type: 'string', title: 'CTA Secundário Rodapé' },
    { name: 'bottomSecondaryCtaHref', type: 'string', title: 'Link CTA Secundário Rodapé' },
  ],
  preview: { select: { title: 'heading' } },
})
