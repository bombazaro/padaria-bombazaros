// Dados de EXEMPLO, usados enquanto o painel (Sanity) não está configurado.
// Fotos são reais (do site antigo); textos e horários precisam ser confirmados com os tios.
// Avisos, data especial, equipe e horários só aparecem em desenvolvimento (npm run dev),
// para nunca publicar informação inventada.

import bento from '../assets/produtos/bento.webp'
import boloSerenata from '../assets/produtos/bolo-serenata.webp'
import brownie from '../assets/produtos/brownie.webp'
import canolle from '../assets/produtos/canolle.webp'
import cheesecake from '../assets/produtos/cheesecake.webp'
import cupcake from '../assets/produtos/cupcake.webp'
import doce from '../assets/produtos/doce.webp'
import donuts from '../assets/produtos/donuts.webp'
import folhado from '../assets/produtos/folhado.webp'
import matilda from '../assets/produtos/matilda.webp'
import oreo from '../assets/produtos/oreo.webp'
import pao from '../assets/produtos/pao.webp'
import paoBatata from '../assets/produtos/paoBatata.webp'
import polvilho from '../assets/produtos/polvilho.webp'
import rosca from '../assets/produtos/rosca.webp'
import salgados from '../assets/produtos/salgados.webp'
import suco from '../assets/produtos/suco.webp'
import bancada from '../assets/loja/bancada.webp'
import type { Aviso, DataEspecial, FotoGaleria, Imagem, Loja, Pessoa, Produto } from '../types/conteudo'

const SO_EM_DEV = import.meta.env.DEV

const img = (src: string, alt: string): Imagem => ({ src, alt })

export const PRODUTOS: Produto[] = [
  {
    id: 'matilda',
    nome: 'Bolo Matilda',
    categoria: 'Bolos e tortas',
    foto: img(matilda, 'Fatia do Bolo Matilda'),
    descricao: 'Bolo de chocolate em camadas com cobertura cremosa.',
    etiquetas: ['Mais pedido'],
    destaque: true,
  },
  {
    id: 'serenata',
    nome: 'Bolo Serenata',
    categoria: 'Bolos e tortas',
    foto: img(boloSerenata, 'Fatia do Bolo Serenata com café'),
    descricao: 'Perfeito para acompanhar um cafezinho.',
    etiquetas: ['Mais pedido'],
    destaque: true,
  },
  {
    id: 'cheesecake',
    nome: 'Cheesecake de morango',
    categoria: 'Bolos e tortas',
    foto: img(cheesecake, 'Cheesecakes individuais com calda de morango'),
    descricao: 'Individual, com calda de morango.',
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'oreo',
    nome: 'Torta Oreo',
    categoria: 'Bolos e tortas',
    foto: img(oreo, 'Torta de Oreo com chantilly'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'bento',
    nome: 'Bentô cake',
    categoria: 'Bolos e tortas',
    foto: img(bento, 'Bentô cake em formato de coração'),
    descricao: 'Mini bolo personalizado para presentear.',
    etiquetas: ['Novidade'],
    destaque: false,
  },
  {
    id: 'cannoli',
    nome: 'Cannoli',
    categoria: 'Doces',
    foto: img(canolle, 'Cannolis com coberturas variadas'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'brownie',
    nome: 'Brownie',
    categoria: 'Doces',
    foto: img(brownie, 'Brownies com cobertura'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'cupcake',
    nome: 'Cupcakes',
    categoria: 'Doces',
    foto: img(cupcake, 'Cupcakes decorados'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'donuts',
    nome: 'Donuts',
    categoria: 'Doces',
    foto: img(donuts, 'Donuts com cobertura de chocolate e morango'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'tortinha',
    nome: 'Tortinha',
    categoria: 'Doces',
    foto: img(doce, 'Tortinha individual servida com café'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'pao-batata',
    nome: 'Pão de batata',
    categoria: 'Pães',
    foto: img(paoBatata, 'Pão de batata em formato de flor'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'pao-doce',
    nome: 'Pão doce',
    categoria: 'Pães',
    foto: img(pao, 'Pães doces decorados com a frase Te amo'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'folhado',
    nome: 'Folhado',
    categoria: 'Salgados',
    foto: img(folhado, 'Folhado assado'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'rosca',
    nome: 'Rosca de queijo',
    categoria: 'Salgados',
    foto: img(rosca, 'Roscas em formato de coração'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'polvilho',
    nome: 'Biscoito de polvilho',
    categoria: 'Salgados',
    foto: img(polvilho, 'Biscoitos de polvilho'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'salgados',
    nome: 'Salgados para festa',
    categoria: 'Salgados',
    foto: img(salgados, 'Caixas de salgados para festa'),
    etiquetas: [],
    destaque: false,
  },
  {
    id: 'suco',
    nome: 'Suco natural',
    categoria: 'Bebidas',
    foto: img(suco, 'Suco natural e sanduíche'),
    etiquetas: [],
    destaque: false,
  },
]

export const GALERIA: FotoGaleria[] = [
  { id: 'g-bancada', foto: img(bancada, 'Vitrine e mesa da padaria') },
  ...['matilda', 'cupcake', 'cheesecake', 'salgados', 'donuts', 'serenata', 'polvilho'].map((id) => {
    const p = PRODUTOS.find((x) => x.id === id)!
    return { id: `g-${id}`, foto: p.foto, legenda: p.nome }
  }),
]

export const AVISO: Aviso | null = SO_EM_DEV
  ? {
      id: 'exemplo',
      texto: '[Exemplo] Fechado no feriado de 15/11 · Encomendas de Natal abertas!',
      tipo: 'info',
    }
  : null

export const DATA_ESPECIAL: DataEspecial | null = SO_EM_DEV
  ? {
      id: 'exemplo',
      titulo: "[Exemplo] Natal na Bombazaro's",
      texto: 'Texto curto da campanha, escrito pelos tios no painel.',
      foto: img(boloSerenata, 'Bolo decorado'),
      prazoEncomenda: '2026-12-20',
      itens: [
        { nome: 'Panetone', foto: PRODUTOS[2].foto },
        { nome: 'Chocotone', foto: PRODUTOS[0].foto },
        { nome: 'Cesta de café', foto: PRODUTOS[5].foto },
      ],
    }
  : null

export const EQUIPE: Pessoa[] = SO_EM_DEV
  ? [
      { id: 'p1', nome: '[Nome]', funcao: 'Confeiteira · fundadora' },
      { id: 'p2', nome: '[Nome]', funcao: 'Padeiro · fundador' },
      { id: 'p3', nome: '[Nome]', funcao: '[Função]' },
      { id: 'p4', nome: '[Nome]', funcao: '[Função]' },
    ]
  : []

export const LOJA: Loja = {
  horarios: SO_EM_DEV
    ? [
        { dia: 1, fechado: false, abre: '07:00', fecha: '20:00' },
        { dia: 2, fechado: false, abre: '07:00', fecha: '20:00' },
        { dia: 3, fechado: false, abre: '07:00', fecha: '20:00' },
        { dia: 4, fechado: false, abre: '07:00', fecha: '20:00' },
        { dia: 5, fechado: false, abre: '07:00', fecha: '20:00' },
        { dia: 6, fechado: false, abre: '07:00', fecha: '18:00' },
        {
          dia: 0,
          fechado: false,
          abre: '07:00',
          fecha: '19:00',
          intervalo: { inicio: '12:00', fim: '14:00' },
        },
      ]
    : [],
  observacaoHorario: SO_EM_DEV ? '[Exemplo] Horários a confirmar com os tios.' : undefined,
}
