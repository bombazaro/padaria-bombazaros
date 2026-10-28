import { Croissant } from 'lucide-react'
import { Link } from 'react-router-dom'
import { INFO } from '../data/info'
import { useTituloPagina } from '../hooks/useTituloPagina'

export function NaoEncontrada() {
  useTituloPagina(`Página não encontrada | ${INFO.nome}`)

  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <Croissant size={72} className="text-trigo" aria-hidden="true" />
      <p className="text-6xl font-extrabold">404</p>
      <h1 className="font-titulo text-4xl font-bold">Ops, essa fornada não saiu!</h1>
      <p className="max-w-md text-lg text-caramelo">
        A página que você procurou não existe ou mudou de lugar.
      </p>
      <Link
        to="/"
        className="inline-flex min-h-12 items-center rounded-full bg-trigo px-7 font-extrabold no-underline"
      >
        Voltar para o início
      </Link>
    </section>
  )
}
