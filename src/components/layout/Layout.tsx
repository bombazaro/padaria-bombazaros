import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BotaoWhatsAppFlutuante } from './BotaoWhatsAppFlutuante'
import { Cabecalho } from './Cabecalho'
import { FaixaAviso } from './FaixaAviso'
import { Rodape } from './Rodape'

/** Rola até a seção do link (/#sobre) ou para o topo ao trocar de página. */
function useRolagemPorRota() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // espera a seção renderizar (o conteúdo do painel pode chegar depois)
    const id = decodeURIComponent(hash.slice(1))
    let tentativas = 0
    const timer = window.setInterval(() => {
      const alvo = document.getElementById(id)
      if (alvo || ++tentativas > 20) {
        window.clearInterval(timer)
        alvo?.scrollIntoView()
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
