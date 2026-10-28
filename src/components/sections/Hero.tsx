import { useSyncExternalStore } from 'react'
import poster from '../../assets/loja/hero-poster.webp'
import logoClara from '../../assets/logos/logo-clara.svg'
import { INFO } from '../../data/info'
import { linkWhatsApp } from '../../lib/whatsapp'
import { BotaoLink } from '../ui/Botao'
import { IconeSacola, IconeWhatsApp } from '../ui/Icones'
import { Onda } from '../ui/Onda'

const consultaMovimento = '(prefers-reduced-motion: reduce)'

/** Sem vídeo para quem pediu menos animação ou está economizando dados. */
function usePodeTocarVideo() {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(consultaMovimento)
      mq.addEventListener('change', avisar)
      return () => mq.removeEventListener('change', avisar)
    },
    () => {
      const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
      return !window.matchMedia(consultaMovimento).matches && !economia
    },
    () => false,
  )
}

export function Hero() {
  const video = usePodeTocarVideo()

  return (
    <section id="inicio" className="relative isolate flex min-h-[85svh] items-center overflow-hidden bg-cafe">
      {video ? (
        <video
          className="absolute inset-0 -z-20 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          aria-hidden="true"
        >
          <source src="/videos/entrada.webm" type="video/webm" />
          <source src="/videos/entrada.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
      )}
      <div className="absolute inset-0 -z-10 bg-cafe/70" aria-hidden="true" />

      <div className="container-site flex flex-col items-center gap-6 pt-16 pb-28 text-center">
        <img src={logoClara} alt="" width={440} height={188} className="w-72 sm:w-[28rem]" />
        <h1 className="font-titulo text-4xl leading-tight font-bold text-balance text-creme-claro sm:text-6xl">
          Feito com amor, todos os dias
        </h1>
        <p className="max-w-xl text-lg text-creme sm:text-xl">
          Pães, bolos e doces fresquinhos no {INFO.bairro}, em Palhoça.
          <span className="sr-only"> {INFO.nome}.</span>
        </p>
        <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <BotaoLink href={INFO.ifood.url} externo variante="ifood" tamanho="lg" icone={<IconeSacola />}>
            Pedir no iFood
          </BotaoLink>
          <BotaoLink
            href={linkWhatsApp()}
            externo
            variante="contornoClaro"
            tamanho="lg"
            icone={<IconeWhatsApp />}
          >
            Chamar no WhatsApp
          </BotaoLink>
        </div>
      </div>

      <Onda />
    </section>
  )
}
