import { defineField, defineType } from 'sanity'

// Mantenha estas listas iguais às de src/types/conteudo.ts no site
export const CATEGORIAS = ['Pães', 'Bolos e tortas', 'Doces', 'Salgados', 'Bebidas']
export const ETIQUETAS = [
  'Mais pedido',
  'Novidade',
  'Sem lactose',
  'Sem glúten',
  'Vegano',
  'Contém amendoim',
  'Contém nozes',
]

export const produto = defineType({
  name: 'produto',
  title: 'Produto',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      description:
        'De preferência na horizontal e com boa luz. Toque em "Editar" para escolher a parte mais importante.',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição curta',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(160).warning('Textos curtos ficam melhores no site (até 160 letras).'),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: { list: CATEGORIAS, layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'etiquetas',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Atenção: só marque alergênicos (amendoim, nozes, glúten, lactose) se tiver certeza.',
      options: { list: ETIQUETAS, layout: 'grid' },
    }),
    defineField({
      name: 'preco',
      title: 'Preço (opcional)',
      type: 'number',
      description: 'Deixe em branco para não mostrar o preço.',
      validation: (r) => r.min(0).precision(2),
    }),
    defineField({
      name: 'destaque',
      title: 'Mostrar entre os primeiros?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'visivel',
      title: 'Aparece no site?',
      type: 'boolean',
      description: 'Desligue para esconder o produto sem apagar (ex.: fora de estação).',
      initialValue: true,
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
      description: 'Números menores aparecem primeiro. Opcional.',
    }),
  ],
  orderings: [{ title: 'Nome', name: 'nome', by: [{ field: 'nome', direction: 'asc' }] }],
  preview: {
    select: { title: 'nome', subtitle: 'categoria', media: 'foto', visivel: 'visivel' },
    prepare: ({ title, subtitle, media, visivel }) => ({
      title,
      subtitle: visivel === false ? `${subtitle} · escondido` : subtitle,
      media,
    }),
  },
})
