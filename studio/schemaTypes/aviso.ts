import { defineField, defineType } from 'sanity'

export const aviso = defineType({
  name: 'aviso',
  title: 'Aviso',
  type: 'document',
  description: 'Faixa no topo do site. Se houver mais de um aviso ativo, aparece o editado por último.',
  fields: [
    defineField({
      name: 'texto',
      title: 'Texto do aviso',
      type: 'string',
      description: 'Ex.: "Fechado no feriado de 15/11" ou "Encomendas de Natal abertas!"',
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Informativo (faixa marrom)', value: 'info' },
          { title: 'Importante (faixa dourada)', value: 'importante' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'ativo',
      title: 'Ativo?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'inicio',
      title: 'Começa a aparecer em',
      type: 'datetime',
      description: 'Opcional. Em branco = aparece já.',
    }),
    defineField({
      name: 'fim',
      title: 'Some sozinho em',
      type: 'datetime',
      description: 'Opcional. Em branco = fica até você desligar.',
      validation: (r) =>
        r.custom((fim, { document }) =>
          fim && document?.inicio && fim < (document.inicio as string)
            ? 'O fim precisa ser depois do início.'
            : true,
        ),
    }),
    defineField({
      name: 'link',
      title: 'Link (opcional)',
      type: 'url',
      validation: (r) => r.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'texto', ativo: 'ativo', fim: 'fim' },
    prepare: ({ title, ativo, fim }) => ({
      title,
      subtitle:
        ativo === false ? 'Desligado' : fim ? `Até ${new Date(fim).toLocaleDateString('pt-BR')}` : 'Ativo',
    }),
  },
})
