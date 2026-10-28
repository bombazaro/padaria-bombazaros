import { INFO } from '../data/info'

export const MENSAGENS = {
  geral: 'Olá! Vim pelo site da Bombazaro’s.',
  encomenda: 'Olá! Gostaria de fazer uma encomenda. ',
} as const

/** Link que abre a conversa com a padaria, já com a mensagem escrita. */
export function linkWhatsApp(mensagem: string = MENSAGENS.geral): string {
  return `https://wa.me/${INFO.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`
}
