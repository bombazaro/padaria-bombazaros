import type { AnchorHTMLAttributes, ReactNode } from 'react'

const VARIANTES = {
  trigo: 'bg-trigo text-cafe hover:bg-[#f5c63a]',
  cafe: 'bg-cafe text-creme-claro hover:bg-[#4d2009]',
  ifood: 'bg-ifood text-white hover:bg-[#d01a27]',
  contornoClaro: 'border-2 border-creme-claro text-creme-claro hover:bg-creme-claro/10',
  contornoCafe: 'border-2 border-cafe text-cafe hover:bg-cafe/5',
} as const

const TAMANHOS = {
  md: 'min-h-12 px-6 text-base',
  lg: 'min-h-14 px-8 text-lg',
} as const

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variante?: keyof typeof VARIANTES
  tamanho?: keyof typeof TAMANHOS
  icone?: ReactNode
  /** Abre em nova aba (links externos: WhatsApp, iFood, Instagram, Maps). */
  externo?: boolean
}

/** Link com cara de botão. Todos os botões do site levam a outro lugar, então são <a>. */
export function BotaoLink({
  variante = 'trigo',
  tamanho = 'md',
  icone,
  externo,
  className = '',
  children,
  ...props
}: Props) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full font-extrabold no-underline transition-colors ${VARIANTES[variante]} ${TAMANHOS[tamanho]} ${className}`}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {icone}
      {children}
    </a>
  )
}
