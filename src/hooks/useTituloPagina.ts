import { useEffect } from 'react'

/** Troca o título da aba enquanto a página está aberta e volta ao do index.html ao sair. */
export function useTituloPagina(titulo: string) {
  useEffect(() => {
    const anterior = document.title
    document.title = titulo
    return () => {
      document.title = anterior
    }
  }, [titulo])
}
