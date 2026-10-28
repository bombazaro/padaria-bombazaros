import { CircleCheck, LoaderCircle } from 'lucide-react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import fachada from '../assets/loja/fachada.webp'
import { CARGOS, INFO } from '../data/info'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { mascararTelefone, validarCandidatura, type Campo, type Erros } from '../lib/validacaoCandidatura'

// O nome do formulário e dos campos precisa ser igual ao do formulário "espelho" no index.html
const NOME_FORMULARIO = 'trabalhe-conosco'

type Estado = 'preenchendo' | 'enviando' | 'enviado' | 'erro'

const estiloCampo =
  'min-h-12 w-full rounded-xl border-2 border-caramelo/40 bg-white px-4 text-base text-cafe aria-invalid:border-cafe'

function Campo({
  id,
  rotulo,
  obrigatorio,
  erro,
  dica,
  children,
}: {
  id: string
  rotulo: string
  obrigatorio?: boolean
  erro?: string
  dica?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-bold">
        {rotulo}
        {obrigatorio && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {dica && !erro && (
        <span id={`${id}-dica`} className="text-sm text-caramelo">
          {dica}
        </span>
      )}
      {erro && (
        <span id={`${id}-erro`} className="text-sm font-bold text-cafe">
          ⚠ {erro}
        </span>
      )}
    </div>
  )
}

export function TrabalheConosco() {
  const [estado, setEstado] = useState<Estado>('preenchendo')
  const [erros, setErros] = useState<Erros>({})
  const [telefone, setTelefone] = useState('')
  const prefixo = useId()
  const id = (campo: string) => `${prefixo}-${campo}`
  useTituloPagina(`Trabalhe Conosco | ${INFO.nome}`)

  const acessibilidade = (campo: Campo, comDica = false) => ({
    id: id(campo),
    name: campo,
    'aria-invalid': erros[campo] ? true : undefined,
    'aria-describedby': erros[campo] ? `${id(campo)}-erro` : comDica ? `${id(campo)}-dica` : undefined,
  })

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const formulario = evento.currentTarget
    const dados = new FormData(formulario)

    const encontrados = validarCandidatura(dados)
    setErros(encontrados)
    const primeiro = Object.keys(encontrados)[0]
    if (primeiro) {
      document.getElementById(id(primeiro))?.focus()
      return
    }

    setEstado('enviando')
    try {
      dados.append('form-name', NOME_FORMULARIO)
      // Sem Content-Type manual: o navegador monta o multipart/form-data por causa do anexo
      const resposta = await fetch('/', { method: 'POST', body: dados })
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`)
      setEstado('enviado')
      formulario.reset()
      setTelefone('')
    } catch {
      setEstado('erro')
    }
  }

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col gap-6">
            <h1 className="font-titulo text-5xl leading-tight font-bold">Trabalhe Conosco</h1>
            <p className="text-lg leading-relaxed">
              Quer fazer parte da equipe da <strong>{INFO.nome}</strong>? Preencha o formulário e entraremos
              em contato!
            </p>
            <img
              src={fachada}
              alt="Fachada da padaria"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-suave"
            />
            <p className="text-sm leading-relaxed text-caramelo">
              Seus dados serão usados apenas para o processo seletivo da {INFO.nomeCurto} e não serão
              compartilhados com mais ninguém.
            </p>
          </div>

          <div className="rounded-3xl bg-creme-claro p-6 shadow-forte sm:p-10">
            {estado === 'enviado' ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center" role="status">
                <CircleCheck size={64} className="text-cafe" aria-hidden="true" />
                <h2 className="font-titulo text-3xl font-bold">Candidatura enviada!</h2>
                <p className="max-w-md text-lg">
                  Obrigado pelo interesse. Se o seu perfil combinar com uma vaga, entraremos em contato.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEstado('preenchendo')}
                    className="min-h-12 rounded-full border-2 border-cafe px-6 font-extrabold"
                  >
                    Enviar outra
                  </button>
                  <Link
                    to="/"
                    className="inline-flex min-h-12 items-center rounded-full bg-trigo px-6 font-extrabold no-underline"
                  >
                    Voltar ao início
                  </Link>
                </div>
              </div>
            ) : (
              <form
                name={NOME_FORMULARIO}
                method="POST"
                encType="multipart/form-data"
                noValidate
                onSubmit={enviar}
                className="flex flex-col gap-5"
              >
                {/* Armadilha para robôs de spam: pessoas não veem este campo */}
                <p className="hidden">
                  <label>
                    Não preencha: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <Campo id={id('nome')} rotulo="Nome completo" obrigatorio erro={erros.nome}>
                  <input
                    type="text"
                    autoComplete="name"
                    className={estiloCampo}
                    {...acessibilidade('nome')}
                  />
                </Campo>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Campo id={id('idade')} rotulo="Idade" obrigatorio erro={erros.idade}>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={16}
                      className={estiloCampo}
                      {...acessibilidade('idade')}
                    />
                  </Campo>
                  <Campo id={id('telefone')} rotulo="Telefone / WhatsApp" obrigatorio erro={erros.telefone}>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="(48) 99999-9999"
                      value={telefone}
                      onChange={(e) => setTelefone(mascararTelefone(e.target.value))}
                      className={estiloCampo}
                      {...acessibilidade('telefone')}
                    />
                  </Campo>
                </div>

                <Campo id={id('email')} rotulo="E-mail" obrigatorio erro={erros.email}>
                  <input
                    type="email"
                    autoComplete="email"
                    className={estiloCampo}
                    {...acessibilidade('email')}
                  />
                </Campo>

                <Campo id={id('cargo')} rotulo="Cargo desejado" obrigatorio erro={erros.cargo}>
                  <select defaultValue="" className={estiloCampo} {...acessibilidade('cargo')}>
                    <option value="" disabled>
                      Selecione...
                    </option>
                    {CARGOS.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Campo>

                <Campo id={id('experiencia')} rotulo="Possui experiência na área?">
                  <textarea
                    id={id('experiencia')}
                    name="experiencia"
                    rows={3}
                    placeholder="Descreva brevemente sua experiência."
                    className={`${estiloCampo} py-3`}
                  />
                </Campo>

                <Campo
                  id={id('curriculo')}
                  rotulo="Currículo (opcional)"
                  erro={erros.curriculo}
                  dica="PDF ou Word, até 5 MB."
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="w-full rounded-xl border-2 border-dashed border-caramelo/50 bg-white p-4 file:mr-4 file:min-h-11 file:rounded-full file:border-0 file:bg-areia file:px-5 file:font-bold file:text-cafe"
                    {...acessibilidade('curriculo', true)}
                  />
                </Campo>

                <Campo id={id('mensagem')} rotulo="Mensagem adicional">
                  <textarea
                    id={id('mensagem')}
                    name="mensagem"
                    rows={4}
                    placeholder="Escreva uma breve apresentação."
                    className={`${estiloCampo} py-3`}
                  />
                </Campo>

                {estado === 'erro' && (
                  <p role="alert" className="rounded-xl bg-areia p-4 font-bold">
                    Não foi possível enviar agora. Tente de novo em instantes ou mande seu currículo pelo
                    WhatsApp {INFO.whatsapp.exibicao}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={estado === 'enviando'}
                  className="mt-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-cafe px-8 text-lg font-extrabold text-creme-claro disabled:opacity-70"
                >
                  {estado === 'enviando' && <LoaderCircle className="animate-spin" aria-hidden="true" />}
                  {estado === 'enviando' ? 'Enviando...' : 'Enviar candidatura'}
                </button>
                <p className="text-sm text-caramelo">* Campos obrigatórios</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
