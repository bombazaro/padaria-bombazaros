import type { ReactNode } from 'react'
import { INFO } from '../../data/info'
import { linkWhatsApp } from '../../lib/whatsapp'
import { IconeInstagram, IconeSacola, IconeWhatsApp } from '../ui/Icones'
import { TituloSecao } from '../ui/TituloSecao'

type Canal = { nome: string; texto: string; href: string; icone: ReactNode; corIcone: string }

const CANAIS: Canal[] = [
  {
    nome: 'WhatsApp',
    texto: `${INFO.whatsapp.exibicao} · encomendas e dúvidas`,
    href: linkWhatsApp(),
    icone: <IconeWhatsApp size={26} />,
    corIcone: 'bg-whatsapp text-cafe',
  },
  {
    nome: 'Instagram',
    texto: `${INFO.instagram.usuario} · novidades do dia`,
    href: INFO.instagram.url,
    icone: <IconeInstagram size={26} />,
    corIcone: 'bg-cafe text-trigo',
  },
  {
    nome: 'iFood',
    texto: 'Peça nossas delícias sem sair de casa',
    href: INFO.ifood.url,
    icone: <IconeSacola size={26} />,
    corIcone: 'bg-ifood text-white',
  },
]

export function Contato() {
  return (
    <section id="contato" className="bg-creme-claro py-20 sm:py-24">
      <div className="container-site flex flex-col gap-10">
        <TituloSecao titulo="Fale conosco" centralizado>
          Estamos prontos para atender você com carinho e qualidade!
        </TituloSecao>
        <ul className="grid gap-5 md:grid-cols-3">
          {CANAIS.map((c) => (
            <li key={c.nome}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col gap-3 rounded-2xl bg-creme p-7 no-underline transition-shadow hover:shadow-forte"
              >
                <span
                  className={`inline-flex size-14 items-center justify-center rounded-full ${c.corIcone}`}
                >
                  {c.icone}
                </span>
                <span className="text-2xl font-extrabold">{c.nome}</span>
                <span className="text-caramelo">{c.texto}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
