import { UserRound } from 'lucide-react'
import bancada from '../../assets/loja/bancada.webp'
import { useEquipe } from '../../hooks/useConteudo'
import { INFO } from '../../data/info'
import { TituloSecao } from '../ui/TituloSecao'

function Equipe() {
  const { data: equipe = [] } = useEquipe()
  if (equipe.length === 0) return null

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-center font-titulo text-3xl font-bold">Quem faz a {INFO.nomeCurto}</h3>
      <ul className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
        {equipe.map((p) => (
          <li key={p.id} className="flex flex-col items-center gap-1 text-center">
            {p.foto ? (
              <img
                src={p.foto.src}
                srcSet={p.foto.srcSet}
                sizes="(min-width: 1024px) 270px, 45vw"
                alt={p.foto.alt}
                loading="lazy"
                className="mb-3 aspect-[4/5] w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="mb-3 flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-areia text-caramelo">
                <UserRound size={48} aria-hidden="true" />
              </div>
            )}
            <span className="text-lg font-extrabold">{p.nome}</span>
            <span className="text-caramelo">{p.funcao}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Sobre() {
  return (
    <section id="sobre" className="bg-creme-claro py-20 sm:py-24">
      <div className="container-site flex flex-col gap-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <img
            src={bancada}
            alt="Mesa da padaria com doces e a vitrine ao fundo"
            loading="lazy"
            width={1050}
            height={1400}
            className="aspect-[4/3] w-full rounded-3xl object-cover md:aspect-[5/6]"
          />
          <div className="flex flex-col gap-5">
            <TituloSecao sobretitulo="Sobre nós" titulo="Um sonho de família, feito à mão" />
            <p className="text-lg leading-relaxed">
              A história da <strong>{INFO.nome}</strong> nasceu do sonho de um casal apaixonado pela arte de
              fazer pães e bolos. Desde muito jovens, dedicaram-se com amor e empenho à panificação e à
              confeitaria, acumulando anos de experiência e tradição.
            </p>
            <p className="text-lg leading-relaxed">
              O nome da padaria carrega o sobrenome da família: uma herança de valor, respeito e significado.
              Ele representa nossa origem e a força que nos inspira a oferecer produtos feitos com carinho,
              qualidade e aquele sabor que desperta lembranças boas.
            </p>
            <p className="text-lg leading-relaxed">
              Mais do que uma padaria, somos a realização de um sonho familiar que hoje se transforma em
              momentos especiais para cada cliente.
            </p>
          </div>
        </div>
        <Equipe />
      </div>
    </section>
  )
}
