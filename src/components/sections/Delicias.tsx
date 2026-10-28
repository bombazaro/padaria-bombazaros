import { useState } from 'react'
import { useProdutos } from '../../hooks/useConteudo'
import { CATEGORIAS, type Categoria, type Produto } from '../../types/conteudo'
import { Esqueleto } from '../ui/Esqueleto'
import { Etiqueta } from '../ui/Etiqueta'
import { TituloSecao } from '../ui/TituloSecao'

type Filtro = Categoria | 'Todos'

const formatarPreco = (valor: number) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function CartaoProduto({ produto }: { produto: Produto }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-creme-claro shadow-suave">
      <img
        src={produto.foto.src}
        srcSet={produto.foto.srcSet}
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
        alt={produto.foto.alt}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-extrabold tracking-wider text-caramelo uppercase">
          {produto.categoria}
        </span>
        <h3 className="font-titulo text-2xl leading-snug font-bold">{produto.nome}</h3>
        {produto.descricao && <p className="leading-relaxed text-caramelo">{produto.descricao}</p>}
        {produto.etiquetas.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {produto.etiquetas.map((e) => (
              <Etiqueta key={e} texto={e} />
            ))}
          </div>
        )}
        {produto.preco !== undefined && produto.preco !== null && (
          <p className="mt-auto pt-2 text-lg font-extrabold">{formatarPreco(produto.preco)}</p>
        )}
      </div>
    </article>
  )
}

export function Delicias() {
  const { data: produtos, isPending, isError } = useProdutos()
  const [filtro, setFiltro] = useState<Filtro>('Todos')

  const categoriasComProduto = CATEGORIAS.filter((c) => produtos?.some((p) => p.categoria === c))
  const visiveis = produtos?.filter((p) => filtro === 'Todos' || p.categoria === filtro) ?? []

  return (
    <section id="delicias" className="py-20 sm:py-24">
      <div className="container-site flex flex-col gap-10">
        <TituloSecao sobretitulo="Feitos todos os dias" titulo="Nossas delícias" centralizado>
          Pães, bolos e doces preparados diariamente para garantir a melhor qualidade e sabor.
        </TituloSecao>

        {categoriasComProduto.length > 1 && (
          <div
            role="group"
            aria-label="Filtrar por categoria"
            className="flex flex-wrap justify-center gap-2"
          >
            {(['Todos', ...categoriasComProduto] as Filtro[]).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filtro === c}
                onClick={() => setFiltro(c)}
                className="min-h-11 rounded-full border-2 border-caramelo/50 bg-creme-claro px-5 font-bold transition-colors aria-pressed:border-cafe aria-pressed:bg-cafe aria-pressed:text-creme-claro"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {isError ? (
          <p className="text-center text-lg text-caramelo">
            Não conseguimos carregar os produtos agora. Tente novamente em instantes.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite" aria-busy={isPending}>
            {isPending
              ? Array.from({ length: 8 }, (_, i) => <Esqueleto key={i} className="h-96" />)
              : visiveis.map((p) => <CartaoProduto key={p.id} produto={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
