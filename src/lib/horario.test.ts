import { describe, expect, it } from 'vitest'
import type { HorarioDia } from '../types/conteudo'
import { agoraEmSaoPaulo, agruparHorarios, statusAgora } from './horario'

const semana: HorarioDia[] = [
  { dia: 1, fechado: false, abre: '07:00', fecha: '20:00' },
  { dia: 2, fechado: false, abre: '07:00', fecha: '20:00' },
  { dia: 3, fechado: false, abre: '07:00', fecha: '20:00' },
  { dia: 4, fechado: false, abre: '07:00', fecha: '20:00' },
  { dia: 5, fechado: false, abre: '07:00', fecha: '20:00' },
  { dia: 6, fechado: false, abre: '07:00', fecha: '13:00' },
  { dia: 0, fechado: true },
]

// Brasília = UTC-3 (sem horário de verão desde 2019)
const em = (isoLocal: string) => new Date(`${isoLocal}-03:00`)

describe('agoraEmSaoPaulo', () => {
  it('converte para o fuso de Brasília', () => {
    // 2026-10-28 é quarta-feira
    expect(agoraEmSaoPaulo(new Date('2026-10-28T02:30:00Z'))).toEqual({ dia: 2, minutos: 23 * 60 + 30 })
  })
})

describe('statusAgora', () => {
  it('aberto durante o expediente', () => {
    expect(statusAgora(semana, em('2026-10-28T10:00:00'))).toEqual({
      aberto: true,
      texto: 'Aberto agora · fecha às 20:00',
    })
  })

  it('fechado antes de abrir no mesmo dia', () => {
    expect(statusAgora(semana, em('2026-10-28T06:15:00'))?.texto).toBe('Fechado · abre hoje às 07:00')
  })

  it('fecha exatamente no horário de fechamento', () => {
    expect(statusAgora(semana, em('2026-10-28T20:00:00'))?.texto).toBe('Fechado · abre amanhã às 07:00')
  })

  it('pula o dia fechado e mostra o próximo dia aberto', () => {
    // sábado 15h → domingo fechado → segunda
    expect(statusAgora(semana, em('2026-10-31T15:00:00'))?.texto).toBe('Fechado · abre segunda às 07:00')
  })

  it('sem horários cadastrados não mostra status', () => {
    expect(statusAgora([], em('2026-10-28T10:00:00'))).toBeNull()
  })
})

describe('agruparHorarios', () => {
  it('junta dias seguidos com o mesmo horário', () => {
    expect(agruparHorarios(semana)).toEqual([
      { dias: 'Segunda a sexta', horario: '07:00 – 20:00' },
      { dias: 'Sábado', horario: '07:00 – 13:00' },
      { dias: 'Domingo', horario: 'Fechado' },
    ])
  })

  it('não junta dias com horários iguais que não são seguidos', () => {
    const alternado: HorarioDia[] = [
      { dia: 1, fechado: false, abre: '08:00', fecha: '18:00' },
      { dia: 2, fechado: true },
      { dia: 3, fechado: false, abre: '08:00', fecha: '18:00' },
    ]
    expect(agruparHorarios(alternado).map((l) => l.dias)).toEqual(['Segunda', 'Terça', 'Quarta'])
  })
})
