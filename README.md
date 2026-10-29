# Padaria e Confeitaria Bombazaro's

Site da Padaria e Confeitaria Bombazaro's (Alto Aririú, Palhoça/SC).

- **Site:** React 19 + TypeScript + Vite + Tailwind CSS v4, hospedado no Netlify
- **Painel dos tios:** Sanity Studio (pasta `studio/`), para editar produtos, avisos, datas especiais, equipe, galeria e horários
- **Formulário Trabalhe Conosco:** Netlify Forms (com anexo de currículo)

O passo a passo completo e as decisões do projeto estão em [`plano.md`](plano.md).

## Rodando no computador

```bash
npm install
npm run dev        # site em http://localhost:5173
npm test           # testes (horários, WhatsApp, validação do formulário)
npm run lint
npm run build      # gera a pasta dist/
```

Sem o Sanity configurado, o site usa os **dados de exemplo** de `src/data/exemplo.ts`.
Aviso, data especial, equipe e horários de exemplo só aparecem com `npm run dev` — nunca no site publicado.

## Configurando o painel (Sanity) — uma vez só

1. Crie uma conta em https://www.sanity.io (pode entrar com Google ou GitHub).
2. No terminal:
   ```bash
   cd studio
   npm install
   npx sanity login
   npx sanity init --env .env --project-name "Bombazaros" --dataset production
   ```
   Isso cria o projeto e um `studio/.env` com o `SANITY_STUDIO_PROJECT_ID`.
3. Copie `.env.example` para `.env` na raiz e coloque o mesmo ID em `VITE_SANITY_PROJECT_ID`.
4. Em https://www.sanity.io/manage → seu projeto → **API → CORS origins**, adicione
   `http://localhost:5173` e o endereço do Netlify (sem "Allow credentials").
5. Rode o painel: `npm run painel` (http://localhost:3333). Cadastre os produtos e as informações da loja.
6. Publique o painel: `cd studio && npm run deploy` → https://bombazaros.sanity.studio
7. Em **Members**, convide os tios pelo e-mail Google deles (papel *Editor*).

## Publicando no Netlify

Siga a Fase 11 do `plano.md`. Resumo: importar o repositório no Netlify, adicionar as variáveis
`VITE_SANITY_PROJECT_ID` e `VITE_SANITY_DATASET`, e ativar **Forms → Form notifications** para o
e-mail `padariabombazaros@gmail.com`. Depois disso, todo `git push` na `main` publica o site.

## Onde mexer

| Quero mudar... | Arquivo |
|---|---|
| Telefone, links, CNPJ, mapa | `src/data/info.ts` |
| Cores e fontes | `src/index.css` (bloco `@theme`) |
| Texto da história (Sobre) | `src/components/sections/Sobre.tsx` |
| Campos do painel | `studio/schemaTypes/` (e os tipos em `src/types/conteudo.ts`) |
| Ordem das seções | `src/pages/Inicio.tsx` |
