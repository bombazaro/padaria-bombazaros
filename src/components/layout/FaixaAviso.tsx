import { X } from 'lucide-react'
import { useState } from 'react'
import { useAviso } from '../../hooks/useConteudo'

const CHAVE = 'aviso-fechado'

function lerFechado(): string | null {
  try {
    return sessionStorage.getItem(CHAVE)
  } catch {
    return null
  }
}

/** Faixa no topo com o aviso cadastrado pelos tios. Some se o visitante fechar (até fechar a aba). */
export function FaixaAviso() {
  const { data: aviso } = useAviso()
  const [fechado, setFechado] = useState(lerFechado)

  if (!aviso || fechado === aviso.id) return null

  const fechar = () => {
    setFechado(aviso.id)
    try {
      sessionStorage.setItem(CHAVE, aviso.id)
    } catch {
      // navegação privada: só some até recarregar
    }
  }

  const importante = aviso.tipo === 'importante'

  return (
    <div
      role="region"
      aria-label="Aviso"
      className={importante ? 'bg-trigo text-cafe' : 'bg-cafe text-creme-claro'}
    >
      <div className="container-site flex items-center justify-center gap-3 py-1 text-sm sm:text-base">
        <span
          className={`hidden shrink-0 rounded-full px-2.5 py-0.5 text-xs font-extrabold tracking-wider uppercase sm:inline ${importante ? 'bg-cafe text-trigo' : 'bg-trigo text-cafe'}`}
        >
          {importante ? 'Importante' : 'Aviso'}
        </span>
        <p className="py-2 font-semibold">
          {aviso.link ? (
            <a href={aviso.link} className="underline underline-offset-2">
              {aviso.texto}
            </a>
          ) : (
            aviso.texto
          )}
        </p>
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar aviso"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-black/10"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
