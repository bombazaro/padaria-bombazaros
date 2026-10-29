import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BotaoWhatsAppFlutuante } from './BotaoWhatsAppFlutuante'
import { Cabecalho } from './Cabecalho'
import { FaixaAviso } from './FaixaAviso'
import { Rodape } from './Rodape'

/** Rola até a seção do link (/#sobre) ou para o topo ao trocar de página. */
function useRolagemPorRota() {
  const { pathname, hash } = useLocation()
  const paginaAnterior = useRef(pathname)
  useEffect(() => {
    // A rolagem suave é cancelada quando a página inteira troca; só anima dentro da mesma página
    const trocouDePagina = paginaAnterior.current !== pathname
    paginaAnterior.current = pathname
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    // espera a seção renderizar (o conteúdo do painel pode chegar depois)
    const id = decodeURIComponent(hash.slice(1))
    let tentativas = 0
    const timer = window.setInterval(() => {
      const alvo = document.getElementById(id)
      if (alvo || ++tentativas > 20) {
        window.clearInterval(timer)
        alvo?.scrollIntoView({ behavior: trocouDePagina ? 'instant' : 'smooth' })
      }
    }, 50)
    return () => window.clearInterval(timer)
  }, [pathname, hash])
}

export function Layout() {
  useRolagemPorRota()

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-full bg-trigo px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>
      <FaixaAviso />
      <Cabecalho />
      <main id="conteudo">
        <Outlet />
      </main>
      <Rodape />
      <BotaoWhatsAppFlutuante />
    </>
  )
}
