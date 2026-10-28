/** Bloco cinza animado mostrado enquanto o conteúdo do painel carrega. */
export function Esqueleto({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-2xl bg-areia ${className}`} />
}
