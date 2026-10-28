import { createClient, type SanityClient } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import type { Imagem } from '../types/conteudo'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? 'production'

/** null quando o Sanity ainda não foi configurado: o site usa os dados de exemplo. */
export const sanity: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion: '2026-10-01', useCdn: true })
  : null

const builder = sanity ? createImageUrlBuilder(sanity) : null

/** Converte uma imagem do Sanity em src/srcSet já otimizados (WebP/AVIF, no tamanho certo). */
export function imagemSanity(fonte: SanityImageSource, alt: string, largura: number): Imagem {
  if (!builder) throw new Error('Sanity não configurado')
  const url = (w: number) => builder.image(fonte).width(w).fit('max').auto('format').quality(75).url()
  return {
    src: url(largura),
    srcSet: [0.5, 1, 2].map((f) => `${url(Math.round(largura * f))} ${Math.round(largura * f)}w`).join(', '),
    alt,
  }
}
