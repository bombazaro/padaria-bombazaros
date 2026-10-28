import type { ReactNode } from 'react'

type Props = {
  sobretitulo?: string
  titulo: string
  children?: ReactNode
  centralizado?: boolean
  /** Para seções com fundo café */
  claro?: boolean
  id?: string
}

export function TituloSecao({ sobretitulo, titulo, children, centralizado, claro, id }: Props) {
  return (
    <div className={`flex flex-col gap-3 ${centralizado ? 'items-center text-center' : ''}`}>
      {sobretitulo && (
        <span
          className={`text-sm font-extrabold tracking-widest uppercase ${claro ? 'text-trigo' : 'text-caramelo'}`}
        >
          {sobretitulo}
        </span>
      )}
      <h2
        id={id}
        className={`font-titulo text-4xl leading-tight font-bold text-balance sm:text-5xl ${claro ? 'text-creme-claro' : 'text-cafe'}`}
      >
        {titulo}
      </h2>
      {children && (
        <p className={`max-w-2xl text-lg leading-relaxed ${claro ? 'text-areia' : 'text-caramelo'}`}>
          {children}
        </p>
      )}
    </div>
  )
}
