import type { SVGProps } from 'react'

// Ícones simples das redes (o lucide não tem ícones de marcas). Traço no mesmo estilo do lucide.
type Props = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 24, children, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function IconeWhatsApp(props: Props) {
  return (
    <Base {...props}>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" />
      <path d="M9 8.6c0 3 2.4 5.6 5.4 5.9l1.1-1.2-1.9-.9-.8.8a4 4 0 0 1-2.4-2.4l.8-.8-.9-1.9z" />
    </Base>
  )
}

export function IconeInstagram(props: Props) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </Base>
  )
}

export function IconeSacola(props: Props) {
  return (
    <Base {...props}>
      <path d="M5 8h14l-1.2 12H6.2z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </Base>
  )
}
