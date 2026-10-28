import { ptBRLocale } from '@sanity/locale-pt-br'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool, type StructureResolver } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'trocar-pelo-id'
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'

/** Menu lateral do painel, na ordem em que os tios mais usam. */
const estrutura: StructureResolver = (S) =>
  S.list()
    .title('Bombazaro’s')
    .items([
      S.documentTypeListItem('produto').title('Produtos'),
      S.documentTypeListItem('aviso').title('Avisos'),
      S.documentTypeListItem('dataEspecial').title('Datas especiais'),
      S.divider(),
      S.documentTypeListItem('pessoa').title('Equipe'),
      S.documentTypeListItem('fotoGaleria').title('Galeria'),
      S.divider(),
      // Documento único: abre direto o formulário, sem lista
      S.listItem()
        .title('Informações da loja')
        .id('loja')
        .child(S.document().schemaType('loja').documentId('loja').title('Informações da loja')),
    ])

export default defineConfig({
  name: 'default',
  title: "Painel Bombazaro's",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure: estrutura }),
    ptBRLocale(),
    // Ferramenta de consultas GROQ: útil para o desenvolvedor, escondida em produção
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],
  schema: {
    types: schemaTypes,
    // "Informações da loja" é única: não deixa criar outra pelo botão "+"
    templates: (modelos) => modelos.filter(({ schemaType }) => schemaType !== 'loja'),
  },
  document: {
    actions: (acoes, { schemaType }) =>
      schemaType === 'loja'
        ? acoes.filter(({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : acoes,
  },
})
