import { defineArrayMember, defineField, defineType } from 'sanity'

const DIAS = [
  { title: 'Segunda', value: 1 },
  { title: 'Terça', value: 2 },
  { title: 'Quarta', value: 3 },
  { title: 'Quinta', value: 4 },
  { title: 'Sexta', value: 5 },
  { title: 'Sábado', value: 6 },
  { title: 'Domingo', value: 0 },
]

const HORA = /^([01]\d|2[0-3]):[0-5]\d$/

const campoHora = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'string',
    placeholder: '07:00',
    hidden: ({ parent }) => parent?.fechado,
    validation: (r) =>
      r.custom((valor, { parent }) => {
        if ((parent as { fechado?: boolean })?.fechado) return true
        if (!valor) return 'Obrigatório'
        return HORA.test(valor as string) ? true : 'Use o formato HH:MM, ex.: 07:00'
      }),
  })

/** Documento único com as informações gerais da loja. */
export const loja = defineType({
  name: 'loja',
  title: 'Informações da loja',
  type: 'document',
  fields: [
    defineField({
      name: 'horarios',
      title: 'Horário de funcionamento',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'horarioDia',
          fields: [
            defineField({
              name: 'dia',
              title: 'Dia',
              type: 'number',
              options: { list: DIAS },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'fechado',
              title: 'Fechado neste dia',
              type: 'boolean',
              initialValue: false,
            }),
            campoHora('abre', 'Abre às'),
            campoHora('fecha', 'Fecha às'),
          ],
          preview: {
            select: { dia: 'dia', fechado: 'fechado', abre: 'abre', fecha: 'fecha' },
            prepare: ({ dia, fechado, abre, fecha }) => ({
              title: DIAS.find((d) => d.value === dia)?.title ?? 'Escolha o dia',
              subtitle: fechado ? 'Fechado' : `${abre ?? '?'} – ${fecha ?? '?'}`,
            }),
          },
        }),
      ],
      validation: (r) =>
        r.custom((itens) => {
          const dias = (itens as { dia?: number }[] | undefined)?.map((i) => i.dia) ?? []
          return new Set(dias).size === dias.length ? true : 'Cada dia só pode aparecer uma vez.'
        }),
    }),
    defineField({
      name: 'observacaoHorario',
      title: 'Observação sobre os horários',
      type: 'string',
      description: 'Opcional. Ex.: "Feriados: das 7h às 12h"',
    }),
    defineField({
      name: 'endereco',
      title: 'Endereço',
      type: 'string',
      description: 'Rua e número. Ex.: "Rua Exemplo, 123"',
    }),
  ],
  preview: { prepare: () => ({ title: 'Informações da loja' }) },
})
