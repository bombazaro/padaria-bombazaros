import { Link } from 'react-router-dom'
import logoClara from '../../assets/logos/logo-clara.svg'
import { INFO } from '../../data/info'
import { linkWhatsApp } from '../../lib/whatsapp'
import { LINKS_NAVEGACAO } from './navegacao'

const ANO = new Date().getFullYear()

export function Rodape() {
  return (
    <footer className="bg-cafe text-creme-claro">
      <div className="container-site flex flex-col gap-10 pt-16 pb-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <img src={logoClara} alt={INFO.nome} width={240} height={102} className="w-56 sm:w-60" />

          <nav aria-label="Rodapé" className="flex flex-col gap-2">
            <h2 className="mb-1 text-sm font-extrabold tracking-widest text-trigo uppercase">Navegue</h2>
            {LINKS_NAVEGACAO.slice(1).map((l) => (
              <Link key={l.para} to={l.para} className="py-1 no-underline hover:text-trigo">
                {l.rotulo}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <h2 className="mb-1 text-sm font-extrabold tracking-widest text-trigo uppercase">Contato</h2>
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 hover:text-trigo"
            >
              WhatsApp {INFO.whatsapp.exibicao}
            </a>
            <a
              href={INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 hover:text-trigo"
            >
              Instagram {INFO.instagram.usuario}
            </a>
            <a
              href={INFO.ifood.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 hover:text-trigo"
            >
              iFood · {INFO.bairro}, {INFO.cidade}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-creme-claro/20 pt-6 text-sm text-areia">
          <span>CNPJ {INFO.cnpj}</span>
          <span>
            © {ANO} {INFO.nome}
          </span>
        </div>
      </div>
    </footer>
  )
}
