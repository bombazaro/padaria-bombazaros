import { linkWhatsApp } from '../../lib/whatsapp'
import { IconeWhatsApp } from '../ui/Icones'

export function BotaoWhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed right-4 bottom-4 z-30 inline-flex size-16 items-center justify-center rounded-full bg-whatsapp text-cafe shadow-forte transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <IconeWhatsApp size={30} />
    </a>
  )
}
