import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoEscura from '../../assets/logos/logo-escura.svg'
import { INFO } from '../../data/info'
import { linkWhatsApp, MENSAGENS } from '../../lib/whatsapp'
import { BotaoLink } from '../ui/Botao'
import { IconeWhatsApp } from '../ui/Icones'
import { LINKS_NAVEGACAO } from './navegacao'

export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)
  useEffect(() => {
    if (!menuAberto) return
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setMenuAberto(false)
    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [menuAberto])

  return (
    <header className="sticky top-0 z-40 bg-creme-claro shadow-suave">
      <div className="container-site flex items-center justify-between gap-6 py-2">
        <Link to="/#inicio" className="shrink-0" aria-label={`${INFO.nome} — página inicial`}>
          <img src={logoEscura} alt="" width={150} height={64} className="h-14 w-auto sm:h-16" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-7 font-bold">
            {LINKS_NAVEGACAO.map((l) => (
              <li key={l.para}>
                <Link to={l.para} className="py-2 no-underline hover:text-caramelo">
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <BotaoLink href={linkWhatsApp(MENSAGENS.encomenda)} externo icone={<IconeWhatsApp size={18} />}>
              Encomendar
            </BotaoLink>
          </div>
          <button
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-xl border border-caramelo/40 lg:hidden"
            aria-expanded={menuAberto}
            aria-controls="menu-celular"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuAberto((v) => !v)}
          >
            {menuAberto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="menu-celular"
        aria-label="Menu"
        hidden={!menuAberto}
        className="border-t border-areia bg-creme-claro lg:hidden"
      >
        <ul className="container-site flex flex-col py-2 text-lg font-bold">
          {LINKS_NAVEGACAO.map((l) => (
            <li key={l.para}>
              <Link to={l.para} className="block py-3 no-underline" onClick={() => setMenuAberto(false)}>
                {l.rotulo}
              </Link>
            </li>
          ))}
          <li className="py-3 sm:hidden">
            <BotaoLink
              href={linkWhatsApp(MENSAGENS.encomenda)}
              externo
              icone={<IconeWhatsApp size={18} />}
              className="w-full"
            >
              Encomendar pelo WhatsApp
            </BotaoLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
