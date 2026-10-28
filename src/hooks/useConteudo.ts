import { useQuery } from '@tanstack/react-query'
import {
  buscarAviso,
  buscarDataEspecial,
  buscarEquipe,
  buscarGaleria,
  buscarLoja,
  buscarProdutos,
} from '../lib/conteudo'

export const useProdutos = () => useQuery({ queryKey: ['produtos'], queryFn: buscarProdutos })
export const useAviso = () => useQuery({ queryKey: ['aviso'], queryFn: buscarAviso })
export const useDataEspecial = () => useQuery({ queryKey: ['dataEspecial'], queryFn: buscarDataEspecial })
export const useEquipe = () => useQuery({ queryKey: ['equipe'], queryFn: buscarEquipe })
export const useGaleria = () => useQuery({ queryKey: ['galeria'], queryFn: buscarGaleria })
export const useLoja = () => useQuery({ queryKey: ['loja'], queryFn: buscarLoja })
