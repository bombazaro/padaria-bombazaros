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

interface Dia {
  fechado?: boolean
  temIntervalo?: boolean
  abre?: string
  intervaloInicio?: string
  intervaloFim?: string
  fecha?: string
}

const ORDEM_HORAS = ['abre', 'intervaloInicio', 'intervaloFim', 'fecha'] as const

const campoHora = (
  name: (typeof ORDEM_HORAS)[number],
  title: string,
  placeholder: string,
  doIntervalo = false,
) =>
  defineField({
    name,
    title,
    type: 'string',
    placeholder,
    hidden: ({ parent }) => parent?.fechado || (doIntervalo && !parent?.temIntervalo),
    validation: (r) =>
      r.custom((valor, { parent }) => {
        const dia = parent as Dia | undefined
        if (dia?.fechado || (doIntervalo && !dia?.temIntervalo)) return true
        if (!valor) return 'Obrigatório'
        if (!HORA.test(valor as string)) return 'Use o formato HH:MM, ex.: 07:00'
        // Cada horário precisa vir depois do anterior (abre < intervalo < reabre < fecha)
        const anteriores = ORDEM_HORAS.slice(0, ORDEM_HORAS.indexOf(name))
          .filter((c) => dia?.temIntervalo || !c.startsWith('intervalo'))
          .map((c) => dia?.[c])
        const anterior = anteriores.at(-1)
        if (anterior && HORA.test(anterior) && (valor as string) <= anterior)
          return `Precisa ser depois de ${anterior}`
        return true
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
            campoHora('abre', 'Abre às', '07:00'),
            defineField({
              name: 'temIntervalo',
              title: 'Fecha no meio do dia?',
              type: 'boolean',
              description: 'Ex.: fecha das 12:00 às 14:00 para o almoço',
              initialValue: false,
              hidden: ({ parent }) => parent?.fechado,
            }),
            campoHora('intervaloInicio', 'Fecha para o intervalo às', '12:00', true),
            campoHora('intervaloFim', 'Reabre às', '14:00', true),
            campoHora('fecha', 'Fecha às', '19:00'),
          ],
          preview: {
            select: {
              dia: 'dia',
              fechado: 'fechado',
              abre: 'abre',
              fecha: 'fecha',
              temIntervalo: 'temIntervalo',
              intervaloInicio: 'intervaloInicio',
              intervaloFim: 'intervaloFim',
            },
            prepare: ({ dia, fechado, abre, fecha, temIntervalo, intervaloInicio, intervaloFim }) => ({
              title: DIAS.find((d) => d.value === dia)?.title ?? 'Escolha o dia',
              subtitle: fechado
                ? 'Fechado'
                : temIntervalo
                  ? `${abre ?? '?'} – ${intervaloInicio ?? '?'} e ${intervaloFim ?? '?'} – ${fecha ?? '?'}`
                  : `${abre ?? '?'} – ${fecha ?? '?'}`,
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
