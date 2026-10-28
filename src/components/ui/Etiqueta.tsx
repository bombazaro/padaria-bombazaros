import type { Etiqueta as TipoEtiqueta } from '../../types/conteudo'

const ALERGENICOS: TipoEtiqueta[] = ['Contém amendoim', 'Contém nozes']

export function Etiqueta({ texto }: { texto: TipoEtiqueta }) {
  const alerta = ALERGENICOS.includes(texto)
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold ${alerta ? 'border border-cafe bg-creme-claro text-cafe' : 'bg-areia text-cafe'}`}
    >
      {alerta && <span aria-hidden="true">⚠ </span>}
      {texto}
    </span>
  )
}
