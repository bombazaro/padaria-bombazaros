import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'trocar-pelo-id',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // Endereço do painel: https://bombazaros.sanity.studio
  studioHost: 'bombazaros',
})
