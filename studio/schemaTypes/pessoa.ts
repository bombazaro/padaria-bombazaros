import { defineField, defineType } from 'sanity'

export const pessoa = defineType({
  name: 'pessoa',
  title: 'Pessoa da equipe',
  type: 'document',
  description: 'Aparece em "Quem faz a Bombazaro\'s". Peça autorização antes de publicar a foto de alguém.',
  fields: [
    defineField({ name: 'nome', title: 'Nome', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'funcao',
      title: 'Função',
      type: 'string',
      description: 'Ex.: "Confeiteira · fundadora"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      description: 'De preferência na vertical.',
      options: { hotspot: true },
    }),
    defineField({ name: 'ordem', title: 'Ordem', type: 'number' }),
  ],
  orderings: [{ title: 'Ordem', name: 'ordem', by: [{ field: 'ordem', direction: 'asc' }] }],
  preview: { select: { title: 'nome', subtitle: 'funcao', media: 'foto' } },
})
