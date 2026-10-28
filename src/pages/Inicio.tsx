import { Contato } from '../components/sections/Contato'
import { DatasEspeciais } from '../components/sections/DatasEspeciais'
import { Delicias } from '../components/sections/Delicias'
import { Encomendas } from '../components/sections/Encomendas'
import { Galeria } from '../components/sections/Galeria'
import { Hero } from '../components/sections/Hero'
import { Localizacao } from '../components/sections/Localizacao'
import { Sobre } from '../components/sections/Sobre'

export function Inicio() {
  return (
    <>
      <Hero />
      <DatasEspeciais />
      <Sobre />
      <Delicias />
      <Galeria />
      <Encomendas />
      <Localizacao />
      <Contato />
    </>
  )
}
