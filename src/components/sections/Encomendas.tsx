import { INFO } from '../../data/info'
import { linkWhatsApp, MENSAGENS } from '../../lib/whatsapp'
import { BotaoLink } from '../ui/Botao'
import { IconeWhatsApp } from '../ui/Icones'
import { TituloSecao } from '../ui/TituloSecao'

export function Encomendas() {
  return (
    <section id="encomendas" className="bg-cafe py-20">
      <div className="container-site flex flex-wrap items-center justify-between gap-10">
        <div className="max-w-2xl">
          <TituloSecao sobretitulo="Sob encomenda" titulo="Bolos e tortas para a sua festa" claro>
            Aniversários, casamentos e confraternizações. Encomende com {INFO.antecedenciaEncomenda} de
            antecedência.
          </TituloSecao>
        </div>
        <BotaoLink
          href={linkWhatsApp(MENSAGENS.encomenda)}
          externo
          tamanho="lg"
          icone={<IconeWhatsApp size={22} />}
        >
          Fazer encomenda no WhatsApp
        </BotaoLink>
      </div>
    </section>
  )
}
