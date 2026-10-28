import type { SanityImageSource } from '@sanity/image-url'
import * as exemplo from '../data/exemplo'
import type { Aviso, DataEspecial, FotoGaleria, Imagem, Loja, Pessoa, Produto } from '../types/conteudo'
import {
  QUERY_AVISO,
  QUERY_DATA_ESPECIAL,
  QUERY_EQUIPE,
  QUERY_GALERIA,
  QUERY_LOJA,
  QUERY_PRODUTOS,
} from './queries'
import { imagemSanity, sanity } from './sanity'

// Cada função busca no Sanity quando ele está configurado, ou devolve os dados de exemplo.
// Os componentes só conhecem os tipos de src/types/conteudo.ts, nunca o formato do Sanity.

type ComFoto<T, K extends keyof T> = Omit<T, K> & { [P in K]: SanityImageSource }
type ComFotoOpcional<T, K extends keyof T> = Omit<T, K> & { [P in K]?: SanityImageSource }

const foto = (fonte: SanityImageSource | undefined, alt: string, largura: number): Imagem | undefined =>
  fonte ? imagemSanity(fonte, alt, largura) : undefined

export async function buscarProdutos(): Promise<Produto[]> {
  if (!sanity) return exemplo.PRODUTOS
  const docs = await sanity.fetch<ComFoto<Produto, 'foto'>[]>(QUERY_PRODUTOS)
  return docs.map((d) => ({ ...d, foto: imagemSanity(d.foto, d.nome, 640) }))
}

export async function buscarAviso(): Promise<Aviso | null> {
  if (!sanity) return exemplo.AVISO
  return (await sanity.fetch<Aviso | null>(QUERY_AVISO)) ?? null
}

type DataEspecialSanity = ComFoto<Omit<DataEspecial, 'itens'>, 'foto'> & {
  itens: { nome: string; foto?: SanityImageSource }[]
}

export async function buscarDataEspecial(): Promise<DataEspecial | null> {
  if (!sanity) return exemplo.DATA_ESPECIAL
  const d = await sanity.fetch<DataEspecialSanity | null>(QUERY_DATA_ESPECIAL)
  if (!d) return null
  return {
    ...d,
    foto: imagemSanity(d.foto, d.titulo, 900),
    itens: d.itens.map((i) => ({ nome: i.nome, foto: foto(i.foto, i.nome, 320) })),
  }
}

export async function buscarEquipe(): Promise<Pessoa[]> {
  if (!sanity) return exemplo.EQUIPE
  const docs = await sanity.fetch<ComFotoOpcional<Pessoa, 'foto'>[]>(QUERY_EQUIPE)
  return docs.map((d) => ({ ...d, foto: foto(d.foto, `${d.nome}, ${d.funcao}`, 480) }))
}

export async function buscarGaleria(): Promise<FotoGaleria[]> {
  if (!sanity) return exemplo.GALERIA
  const docs = await sanity.fetch<ComFoto<FotoGaleria, 'foto'>[]>(QUERY_GALERIA)
  return docs.map((d) => ({ ...d, foto: imagemSanity(d.foto, d.legenda ?? 'Foto da padaria', 1000) }))
}

export async function buscarLoja(): Promise<Loja> {
  if (!sanity) return exemplo.LOJA
  return (await sanity.fetch<Loja | null>(QUERY_LOJA)) ?? { horarios: [] }
}
