import { defineField, defineType } from 'sanity'

export const fotoGaleria = defineType({
  name: 'fotoGaleria',
  title: 'Foto da galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'legenda',
      title: 'Legenda',
      type: 'string',
      description: 'Descreva a foto (ex.: "Bolo de aniversário de morango"). Ajuda quem usa leitor de tela.',
      validation: (r) => r.required().max(80),
    }),
    defineField({ name: 'ordem', title: 'Ordem', type: 'number' }),
  ],
  orderings: [{ title: 'Ordem', name: 'ordem', by: [{ field: 'ordem', direction: 'asc' }] }],
  preview: { select: { title: 'legenda', media: 'foto' } },
})
