export const TAMANHO_MAXIMO_CURRICULO = 5 * 1024 * 1024 // 5 MB
const EXTENSOES_ACEITAS = ['.pdf', '.doc', '.docx']

export type Campo = 'nome' | 'idade' | 'telefone' | 'email' | 'cargo' | 'curriculo'
export type Erros = Partial<Record<Campo, string>>

/** Formata enquanto digita: (48) 99999-9999 */
export function mascararTelefone(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function validarCandidatura(dados: FormData): Erros {
  const erros: Erros = {}
  const texto = (campo: string) => String(dados.get(campo) ?? '').trim()

  if (texto('nome').split(/\s+/).filter(Boolean).length < 2) erros.nome = 'Digite seu nome completo.'

  const idade = Number(texto('idade'))
  if (!texto('idade') || !Number.isInteger(idade)) erros.idade = 'Digite sua idade.'
  else if (idade < 16) erros.idade = 'É preciso ter pelo menos 16 anos.'
  else if (idade > 100) erros.idade = 'Confira a idade digitada.'

  const digitos = texto('telefone').replace(/\D/g, '')
  if (digitos.length < 10 || digitos.length > 11) erros.telefone = 'Digite o telefone com DDD.'

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(texto('email'))) erros.email = 'Digite um e-mail válido.'

  if (!texto('cargo')) erros.cargo = 'Escolha um cargo.'

  const arquivo = dados.get('curriculo')
  if (arquivo instanceof File && arquivo.size > 0) {
    const nome = arquivo.name.toLowerCase()
    if (!EXTENSOES_ACEITAS.some((ext) => nome.endsWith(ext))) {
      erros.curriculo = 'Envie o currículo em PDF ou Word (.doc, .docx).'
    } else if (arquivo.size > TAMANHO_MAXIMO_CURRICULO) {
      erros.curriculo = 'O arquivo precisa ter no máximo 5 MB.'
    }
  }

  return erros
}
