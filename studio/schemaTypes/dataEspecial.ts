import { defineArrayMember, defineField, defineType } from 'sanity'

export const dataEspecial = defineType({
  name: 'dataEspecial',
  title: 'Data especial',
  type: 'document',
  description: 'Campanha de Páscoa, Dia das Mães, Natal... Aparece no site só entre o início e o fim.',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Ex.: "Natal na Bombazaro\'s"',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'texto',
      title: 'Texto',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(240),
    }),
    defineField({
      name: 'foto',
      title: 'Foto principal',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'itens',
      title: 'Produtos da data',
      type: 'array',
      description: 'Até 3 produtos aparecem com foto.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'item',
          fields: [
            defineField({ name: 'nome', title: 'Nome', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'nome', media: 'foto' } },
        }),
      ],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'prazoEncomenda',
      title: 'Encomendas até',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    }),
    defineField({
      name: 'inicio',
      title: 'Aparece a partir de',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'fim',
      title: 'Some em',
      type: 'datetime',
      validation: (r) =>
        r
          .required()
          .custom((fim, { document }) =>
            fim && document?.inicio && fim < (document.inicio as string)
              ? 'O fim precisa ser depois do início.'
              : true,
          ),
    }),
  ],
  preview: {
    select: { title: 'titulo', media: 'foto', inicio: 'inicio', fim: 'fim' },
    prepare: ({ title, media, inicio, fim }) => {
      const data = (d?: string) => (d ? new Date(d).toLocaleDateString('pt-BR') : '?')
      return { title, media, subtitle: `${data(inicio)} até ${data(fim)}` }
    },
  },
})
