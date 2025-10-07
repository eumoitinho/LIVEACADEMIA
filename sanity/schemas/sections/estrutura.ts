import { defineType } from 'sanity'

export default defineType({
  name: 'estruturaSection',
  type: 'object',
  title: 'Estrutura',
  fields: [
    { name: 'heading', type: 'string', title: 'Título' },
    {
      name: 'gallery',
      type: 'array',
      title: 'Galeria',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'items',
      type: 'array',
      title: 'Itens de Estrutura',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titulo', type: 'string', title: 'Título' },
            { name: 'descricao', type: 'text', rows: 2, title: 'Descrição' },
            { name: 'disponibilidade', type: 'string', title: 'Disponibilidade' },
            { name: 'categoria', type: 'string', title: 'Categoria', options: { list: ['basico', 'exclusivo'] } },
            { name: 'iconKey', type: 'string', title: 'Ícone (chave lucide)' },
          ],
          preview: { select: { title: 'titulo', subtitle: 'categoria' } },
        },
      ],
    },
  ],
  preview: { select: { title: 'heading' } },
})
