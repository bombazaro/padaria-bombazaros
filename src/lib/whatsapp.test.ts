import { describe, expect, it } from 'vitest'
import { linkWhatsApp } from './whatsapp'

describe('linkWhatsApp', () => {
  it('monta o link com o número da padaria e a mensagem codificada', () => {
    expect(linkWhatsApp('Olá! Quero um bolo & doces')).toBe(
      'https://wa.me/5548996263034?text=Ol%C3%A1!%20Quero%20um%20bolo%20%26%20doces',
    )
  })

  it('usa a mensagem padrão quando nenhuma é passada', () => {
    expect(linkWhatsApp()).toContain('https://wa.me/5548996263034?text=')
  })
})
