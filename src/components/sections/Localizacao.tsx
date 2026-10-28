import { Navigation } from 'lucide-react'
import { useEffect, useState } from 'react'
import { INFO } from '../../data/info'
import { useLoja } from '../../hooks/useConteudo'
import { agruparHorarios, statusAgora } from '../../lib/horario'
import { linkWhatsApp } from '../../lib/whatsapp'
import { BotaoLink } from '../ui/Botao'
import { TituloSecao } from '../ui/TituloSecao'

/** Atualiza a cada minuto para o selo "Aberto agora" virar sozinho. */
function useAgora() {
  const [agora, setAgora] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setAgora(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return agora
}

export function Localizacao() {
  const { data: loja } = useLoja()
  const agora = useAgora()
  const horarios = loja?.horarios ?? []
  const status = statusAgora(horarios, agora)

  return (
    <section id="localizacao" aria-labelledby="titulo-horarios" className="py-20 sm:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <TituloSecao id="titulo-horarios" titulo="Horários" />

          {status && (
            <p className="inline-flex items-center gap-2 self-start rounded-full bg-creme-claro px-4 py-2 font-extrabold shadow-suave">
              <span
                aria-hidden="true"
                className={`size-2.5 rounded-full ${status.aberto ? 'bg-[#1f8a3a]' : 'bg-caramelo'}`}
              />
              {status.texto}
            </p>
          )}

          {horarios.length > 0 ? (
            <dl className="flex flex-col">
              {agruparHorarios(horarios).map((linha) => (
                <div
                  key={linha.dias}
                  className="flex justify-between gap-4 border-b border-areia py-3.5 text-lg"
                >
                  <dt>{linha.dias}</dt>
                  <dd className="font-extrabold">{linha.horario}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-lg">
              Consulte nossos horários pelo{' '}
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline"
              >
                WhatsApp
              </a>
              .
            </p>
          )}
          {loja?.observacaoHorario && <p className="text-caramelo">{loja.observacaoHorario}</p>}

          <address className="text-lg leading-relaxed not-italic">
            {loja?.endereco && (
              <>
                {loja.endereco}
                <br />
              </>
            )}
            {INFO.bairro} · {INFO.cidade}
          </address>
          <BotaoLink
            href={INFO.mapa.comoChegar}
            externo
            variante="contornoCafe"
            icone={<Navigation size={18} aria-hidden="true" />}
            className="self-start"
          >
            Como chegar
          </BotaoLink>
        </div>

        <iframe
          src={INFO.mapa.embed}
          title={`Mapa com a localização da ${INFO.nome}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="min-h-96 w-full rounded-3xl border-0 shadow-suave"
          allowFullScreen
        />
      </div>
    </section>
  )
}
