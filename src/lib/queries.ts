// Consultas GROQ ao painel. Documentação: https://www.sanity.io/docs/groq

export const QUERY_PRODUTOS = /* groq */ `
  *[_type == "produto" && visivel != false] | order(destaque desc, ordem asc, nome asc) {
    "id": _id, nome, descricao, categoria, foto, "etiquetas": coalesce(etiquetas, []), preco,
    "destaque": coalesce(destaque, false)
  }`

export const QUERY_AVISO = /* groq */ `
  *[_type == "aviso" && ativo != false
    && (!defined(inicio) || inicio <= now())
    && (!defined(fim) || fim >= now())] | order(_updatedAt desc)[0] {
    "id": _id + "-" + _rev, texto, "tipo": coalesce(tipo, "info"), link
  }`

export const QUERY_DATA_ESPECIAL = /* groq */ `
  *[_type == "dataEspecial" && inicio <= now() && fim >= now()] | order(inicio desc)[0] {
    "id": _id, titulo, texto, foto, prazoEncomenda,
    "itens": coalesce(itens[]{ nome, foto }, [])
  }`

export const QUERY_EQUIPE = /* groq */ `
  *[_type == "pessoa"] | order(ordem asc, nome asc) { "id": _id, nome, funcao, foto }`

export const QUERY_GALERIA = /* groq */ `
  *[_type == "fotoGaleria"] | order(ordem asc, _createdAt desc) { "id": _id, foto, legenda }`

export const QUERY_LOJA = /* groq */ `
  *[_type == "loja"][0] {
    "horarios": coalesce(horarios[]{ "dia": coalesce(dia, 0), "fechado": coalesce(fechado, false), abre, fecha,
      "intervalo": select(temIntervalo == true && defined(intervaloInicio) && defined(intervaloFim) => { "inicio": intervaloInicio, "fim": intervaloFim }) }, []),
    observacaoHorario, endereco
  }`
