// Informações fixas da padaria (mudam raramente e ficam no código).
// O que os tios editam no dia a dia vem do painel — ver src/lib/conteudo.ts.

export const INFO = {
  nome: "Padaria e Confeitaria Bombazaro's",
  nomeCurto: "Bombazaro's",
  cnpj: '57.204.824/0001-09',
  bairro: 'Alto Aririú',
  cidade: 'Palhoça/SC',
  whatsapp: {
    numero: '5548996263034',
    exibicao: '(48) 99626-3034',
  },
  instagram: {
    usuario: '@padaria_bombazaro.s',
    url: 'https://www.instagram.com/padaria_bombazaro.s/',
  },
  ifood: {
    url: 'https://www.ifood.com.br/delivery/palhoca-sc/padaria-e-confeitaria-bombazaros-bela-vista/8f191540-4292-41d1-bcab-53e3544b4008',
  },
  mapa: {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6679688239385!2d-48.71395292453466!3d-27.664072323971335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952735295b193d71%3A0xa09402df52de9fdc!2sPadaria%20e%20Confeitaria%20Bombazaro%27s!5e0!3m2!1spt-BR!2sbr!4v1719950419487!5m2!1spt-BR!2sbr',
    comoChegar:
      'https://www.google.com/maps/dir/?api=1&destination=Padaria+e+Confeitaria+Bombazaro%27s+Palho%C3%A7a',
  },
  /** Antecedência mínima para encomendas. TODO: confirmar com os tios. */
  antecedenciaEncomenda: '[X dias]',
} as const

export const CARGOS = [
  'Balconista',
  'Caixa',
  'Padeiro(a)',
  'Confeiteiro(a)',
  'Auxiliar de produção',
  'Outro',
] as const
