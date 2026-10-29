// Tipos do conteúdo editável pelos tios no painel (Sanity).
// Os esquemas do painel ficam em studio/schemaTypes e precisam continuar batendo com estes tipos.

export const CATEGORIAS = ['Pães', 'Bolos e tortas', 'Doces', 'Salgados', 'Bebidas'] as const
export type Categoria = (typeof CATEGORIAS)[number]

export const ETIQUETAS = [
  'Mais pedido',
  'Novidade',
  'Sem lactose',
  'Sem glúten',
  'Vegano',
  'Contém amendoim',
  'Contém nozes',
] as const
export type Etiqueta = (typeof ETIQUETAS)[number]

/** Imagem pronta para usar em <img>, venha ela do Sanity ou de src/assets. */
export interface Imagem {
  src: string
  srcSet?: string
  alt: string
}

export interface Produto {
  id: string
  nome: string
  descricao?: string
  categoria: Categoria
  foto: Imagem
  etiquetas: Etiqueta[]
  preco?: number
  destaque: boolean
}

export interface Aviso {
  id: string
  texto: string
  tipo: 'info' | 'importante'
  link?: string
}

export interface DataEspecial {
  id: string
  titulo: string
  texto?: string
  foto: Imagem
  /** Data no formato AAAA-MM-DD */
  prazoEncomenda?: string
  itens: { nome: string; foto?: Imagem }[]
}

export interface Pessoa {
  id: string
  nome: string
  funcao: string
  foto?: Imagem
}

export interface FotoGaleria {
  id: string
  foto: Imagem
  legenda?: string
}

/** 0 = domingo ... 6 = sábado (igual a Date.getDay()) */
export type DiaSemana = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface HorarioDia {
  dia: DiaSemana
  fechado: boolean
  /** "HH:MM" */
  abre?: string
  /** "HH:MM" */
  fecha?: string
  /** Intervalo no meio do dia, ex.: fecha às 12:00 e reabre às 14:00 */
  intervalo?: { inicio: string; fim: string } | null
}

export interface Loja {
  horarios: HorarioDia[]
  observacaoHorario?: string
  endereco?: string
}
