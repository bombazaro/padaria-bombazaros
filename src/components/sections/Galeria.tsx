import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGaleria } from '../../hooks/useConteudo'
import type { FotoGaleria } from '../../types/conteudo'
import { TituloSecao } from '../ui/TituloSecao'

function Ampliada({ foto, aoFechar }: { foto: FotoGaleria | null; aoFechar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialogo = ref.current
    if (!dialogo) return
    if (foto && !dialogo.open) dialogo.showModal()
    if (!foto && dialogo.open) dialogo.close()
  }, [foto])

  return (
    <dialog
      ref={ref}
      onClose={aoFechar}
      onClick={(e) => e.target === ref.current && aoFechar()}
      aria-label={foto?.legenda ?? 'Foto ampliada'}
      className="m-auto max-h-[90vh] max-w-[min(90vw,1100px)] overflow-visible bg-transparent p-0 backdrop:bg-cafe/85"
    >
      {foto && (
        <figure className="relative">
          <img
            src={foto.foto.src}
            srcSet={foto.foto.srcSet}
            sizes="90vw"
            alt={foto.foto.alt}
            className="max-h-[85vh] w-auto rounded-2xl object-contain"
          />
          {foto.legenda && (
            <figcaption className="mt-3 text-center text-lg font-bold text-creme-claro">
              {foto.legenda}
            </figcaption>
          )}
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar foto"
            className="absolute -top-4 -right-4 inline-flex size-12 items-center justify-center rounded-full bg-trigo text-cafe shadow-forte"
          >
            <X aria-hidden="true" />
          </button>
        </figure>
      )}
    </dialog>
  )
}

export function Galeria() {
  const { data: fotos = [] } = useGaleria()
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'center' })
  const [atual, setAtual] = useState(0)
  const [ampliada, setAmpliada] = useState<FotoGaleria | null>(null)

  const aoSelecionar = useCallback(() => setAtual(embla?.selectedScrollSnap() ?? 0), [embla])

  useEffect(() => {
    if (!embla) return
    embla.on('select', aoSelecionar).on('reInit', aoSelecionar)
    return () => {
      embla.off('select', aoSelecionar).off('reInit', aoSelecionar)
    }
  }, [embla, aoSelecionar])

  if (fotos.length === 0) return null

  return (
    <section aria-labelledby="titulo-galeria" className="bg-creme-claro py-20 sm:py-24">
      <div className="container-site flex flex-col items-center gap-10">
        <TituloSecao id="titulo-galeria" titulo="Galeria" centralizado>
          Arraste para o lado e toque na foto para ampliar.
        </TituloSecao>

        <div
          className="relative w-full"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Fotos da padaria"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <ul className="-ml-4 flex touch-pan-y">
              {fotos.map((f, i) => (
                <li
                  key={f.id}
                  className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${fotos.length}`}
                >
                  <button
                    type="button"
                    onClick={() => setAmpliada(f)}
                    className={`block w-full overflow-hidden rounded-2xl transition-opacity duration-300 ${i === atual ? 'opacity-100' : 'opacity-60'}`}
                  >
                    <img
                      src={f.foto.src}
                      srcSet={f.foto.srcSet}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 85vw"
                      alt={f.foto.alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => embla?.scrollPrev()}
              aria-label="Foto anterior"
              className="inline-flex size-12 items-center justify-center rounded-full bg-cafe text-trigo"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <div className="flex items-center gap-1">
              {fotos.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => embla?.scrollTo(i)}
                  aria-label={`Ir para a foto ${i + 1}`}
                  aria-current={i === atual}
                  className="group inline-flex size-6 items-center justify-center"
                >
                  <span
                    className={`block h-2.5 rounded-full transition-all ${i === atual ? 'w-7 bg-trigo' : 'w-2.5 bg-caramelo/40'}`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => embla?.scrollNext()}
              aria-label="Próxima foto"
              className="inline-flex size-12 items-center justify-center rounded-full bg-cafe text-trigo"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Ampliada foto={ampliada} aoFechar={() => setAmpliada(null)} />
    </section>
  )
}
