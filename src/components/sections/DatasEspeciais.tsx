import { useDataEspecial } from '../../hooks/useConteudo'
import { linkWhatsApp, MENSAGENS } from '../../lib/whatsapp'
import { BotaoLink } from '../ui/Botao'
import { IconeWhatsApp } from '../ui/Icones'

const formatarData = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })

/** Campanha sazonal cadastrada no painel. Só aparece dentro do período definido pelos tios. */
export function DatasEspeciais() {
  const { data } = useDataEspecial()
  if (!data) return null

  return (
    <section aria-labelledby="titulo-data-especial" className="container-site py-16 sm:py-20">
      <div className="grid overflow-hidden rounded-3xl bg-creme-claro shadow-forte md:grid-cols-2">
        <img
          src={data.foto.src}
          srcSet={data.foto.srcSet}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={data.foto.alt}
          className="aspect-[4/3] size-full object-cover md:aspect-auto"
        />
        <div className="flex flex-col gap-5 p-8 sm:p-12">
          <span className="self-start rounded-full border-2 border-caramelo px-3 py-1 text-xs font-extrabold tracking-widest text-caramelo uppercase">
            Datas especiais
          </span>
          <h2 id="titulo-data-especial" className="font-titulo text-4xl leading-tight font-bold text-balance">
            {data.titulo}
          </h2>
          {data.texto && <p className="text-lg leading-relaxed text-caramelo">{data.texto}</p>}

          {data.itens.length > 0 && (
            <ul className="grid grid-cols-3 gap-3">
              {data.itens.map((item) => (
                <li key={item.nome} className="flex flex-col gap-2">
                  {item.foto && (
                    <img
                      src={item.foto.src}
                      srcSet={item.foto.srcSet}
                      sizes="160px"
                      alt=""
                      loading="lazy"
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                  )}
                  <span className="text-sm font-bold sm:text-base">{item.nome}</span>
                </li>
              ))}
            </ul>
          )}

          {data.prazoEncomenda && (
            <p>
              Encomendas até <strong>{formatarData(data.prazoEncomenda)}</strong>
            </p>
          )}
          <BotaoLink
            href={linkWhatsApp(`${MENSAGENS.encomenda}(${data.titulo}) `)}
            externo
            icone={<IconeWhatsApp size={20} />}
            className="self-start"
          >
            Encomendar pelo WhatsApp
          </BotaoLink>
        </div>
      </div>
    </section>
  )
}
