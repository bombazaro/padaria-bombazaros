import type { DiaSemana, HorarioDia } from '../types/conteudo'

export const NOMES_DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const

/** Ordem de exibição: semana começando na segunda. */
const ORDEM_EXIBICAO: DiaSemana[] = [1, 2, 3, 4, 5, 6, 0]

const DIA_POR_SIGLA: Record<string, DiaSemana> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

function paraMinutos(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Dia da semana e minuto do dia no horário de Brasília, independente do fuso do visitante. */
export function agoraEmSaoPaulo(data: Date = new Date()): { dia: DiaSemana; minutos: number } {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(data)
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? ''
  return {
    dia: DIA_POR_SIGLA[valor('weekday')],
    minutos: Number(valor('hour')) * 60 + Number(valor('minute')),
  }
}

function abreNoDia(h: HorarioDia | undefined): h is HorarioDia & { abre: string; fecha: string } {
  return !!h && !h.fechado && !!h.abre && !!h.fecha
}

export interface StatusLoja {
  aberto: boolean
  texto: string
}

export function statusAgora(horarios: HorarioDia[], data: Date = new Date()): StatusLoja | null {
  if (horarios.length === 0) return null
  const { dia, minutos } = agoraEmSaoPaulo(data)
  const porDia = new Map(horarios.map((h) => [h.dia, h]))
  const hoje = porDia.get(dia)

  if (abreNoDia(hoje)) {
    const abre = paraMinutos(hoje.abre)
    const fecha = paraMinutos(hoje.fecha)
    if (minutos >= abre && minutos < fecha) {
      return { aberto: true, texto: `Aberto agora · fecha às ${hoje.fecha}` }
    }
    if (minutos < abre) {
      return { aberto: false, texto: `Fechado · abre hoje às ${hoje.abre}` }
    }
  }

  for (let i = 1; i <= 7; i++) {
    const proximo = ((dia + i) % 7) as DiaSemana
    const h = porDia.get(proximo)
    if (abreNoDia(h)) {
      const quando = i === 1 ? 'amanhã' : NOMES_DIAS[proximo].toLowerCase()
      return { aberto: false, texto: `Fechado · abre ${quando} às ${h.abre}` }
    }
  }
  return { aberto: false, texto: 'Fechado' }
}

export interface LinhaHorario {
  dias: string
  horario: string
}

/** Junta dias seguidos com o mesmo horário: "Segunda a sexta · 07:00 – 20:00". */
export function agruparHorarios(horarios: HorarioDia[]): LinhaHorario[] {
  const porDia = new Map(horarios.map((h) => [h.dia, h]))
  const textoDe = (h: HorarioDia | undefined) => (abreNoDia(h) ? `${h.abre} – ${h.fecha}` : 'Fechado')

  const grupos: { dias: DiaSemana[]; horario: string }[] = []
  for (const dia of ORDEM_EXIBICAO) {
    if (!porDia.has(dia)) continue
    const horario = textoDe(porDia.get(dia))
    const ultimo = grupos.at(-1)
    const anterior = ultimo?.dias.at(-1)
    const ehSeguido =
      anterior !== undefined && ORDEM_EXIBICAO.indexOf(dia) === ORDEM_EXIBICAO.indexOf(anterior) + 1
    if (ultimo && ultimo.horario === horario && ehSeguido) ultimo.dias.push(dia)
    else grupos.push({ dias: [dia], horario })
  }

  return grupos.map(({ dias, horario }) => {
    const primeiro = NOMES_DIAS[dias[0]]
    const ultimo = NOMES_DIAS[dias[dias.length - 1]].toLowerCase()
    const nomeDias =
      dias.length === 1 ? primeiro : dias.length === 2 ? `${primeiro} e ${ultimo}` : `${primeiro} a ${ultimo}`
    return { dias: nomeDias, horario }
  })
}
