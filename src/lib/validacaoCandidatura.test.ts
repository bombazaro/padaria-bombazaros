import { describe, expect, it } from 'vitest'
import { mascararTelefone, TAMANHO_MAXIMO_CURRICULO, validarCandidatura } from './validacaoCandidatura'

function formulario(campos: Record<string, string | File>) {
  const dados = new FormData()
  const base = {
    nome: 'Maria Silva',
    idade: '22',
    telefone: '(48) 99999-9999',
    email: 'maria@exemplo.com',
    cargo: 'Caixa',
  }
  for (const [k, v] of Object.entries({ ...base, ...campos })) dados.append(k, v)
  return dados
}

describe('mascararTelefone', () => {
  it('formata celular e fixo', () => {
    expect(mascararTelefone('48999999999')).toBe('(48) 99999-9999')
    expect(mascararTelefone('4833334444')).toBe('(48) 3333-4444')
    expect(mascararTelefone('489')).toBe('(48) 9')
    expect(mascararTelefone('')).toBe('')
  })
})

describe('validarCandidatura', () => {
  it('aceita um formulário completo', () => {
    expect(validarCandidatura(formulario({}))).toEqual({})
  })

  it('exige nome completo, idade mínima e e-mail válido', () => {
    const erros = validarCandidatura(formulario({ nome: 'Maria', idade: '15', email: 'maria@' }))
    expect(Object.keys(erros).sort()).toEqual(['email', 'idade', 'nome'])
  })

  it('recusa arquivos em formato errado ou grandes demais', () => {
    const imagem = new File(['x'], 'curriculo.png')
    expect(validarCandidatura(formulario({ curriculo: imagem })).curriculo).toMatch(/PDF/)

    const grande = new File([new Uint8Array(TAMANHO_MAXIMO_CURRICULO + 1)], 'curriculo.pdf')
    expect(validarCandidatura(formulario({ curriculo: grande })).curriculo).toMatch(/5 MB/)
  })

  it('currículo é opcional', () => {
    expect(validarCandidatura(formulario({ curriculo: new File([], '') }))).toEqual({})
  })
})
