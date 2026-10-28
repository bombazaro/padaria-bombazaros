# Plano — Novo site da Padaria e Confeitaria Bombazaro's

Site novo, feito do zero em **React + TypeScript**, aproveitando o conteúdo e as fotos do site antigo
(`~/Área de trabalho/padaria`), com um **painel para os tios editarem** produtos, avisos e datas especiais,
e publicado **sem custo**.

- Repositório: https://github.com/bombazaro/padaria-bombazaros
- Wireframes: https://claude.ai/artifact/U2cX2mnnQ2gHEV87hf7y2i (privado — compartilhe pelo menu *Share* se quiser mostrar para os tios)

---

## 0. Resumo das decisões

| Tema | Escolha | Por quê |
|---|---|---|
| Base do projeto | **Vite + React + TypeScript** | Rápido, padrão do mercado, build gera arquivos estáticos (hospedagem grátis) |
| Estilo | **Tailwind CSS v4** | Responsivo sem `tablet.css` / `mobile.css` separados; cores e fontes num lugar só |
| Rotas | **React Router** | Início + Trabalhe Conosco + 404 |
| Painel dos tios | **Sanity** (plano Free) | Painel pronto, login com Google, funciona no celular, envio de fotos já otimizadas, sem servidor |
| Busca de dados | **@sanity/client** + **TanStack Query** | Busca os dados do Sanity com cache; mudança dos tios aparece em segundos, sem novo deploy |
| Carrossel | **Embla Carousel** | Leve, acessível, funciona com toque no celular |
| Animações | **Motion** — opcional | Entradas suaves das seções |
| Formulário "Trabalhe Conosco" | **Netlify Forms** | Grátis, aceita anexo de currículo, sem PHP e sem senha no código |
| Hospedagem | **Netlify (plano Free)** | Grátis, **permite uso comercial**, HTTPS automático, deploy a cada `git push`, formulários inclusos |
| Código | **GitHub** (`bombazaro/padaria-bombazaros`) | Versionamento + integração com o Netlify |
| Qualidade | ESLint + Prettier + Lighthouse | Código padronizado e site rápido |

**Por que Netlify e não Vercel?** O plano grátis da Vercel (Hobby) é só para uso pessoal e não comercial — o site
de uma padaria é comercial. O Netlify Free permite uso comercial e ainda recebe o formulário com currículo.
(Conferir os termos atuais de cada um antes de publicar, eles mudam.)

> **Sobre "não pagar nada":** o site fica no ar de graça em `https://padariabombazaros.netlify.app`, e o painel em
> `https://bombazaros.sanity.studio`. Um domínio próprio (`bombazaros.com.br`, ~R$ 40/ano no
> [registro.br](https://registro.br)) é **opcional** e pode ser adicionado depois.

---

## 1. O que aproveitar do site antigo

**Conteúdo que continua:**
- Texto da seção "Sobre" (história do casal, significado do sobrenome).
- Texto da seção "Delícias".
- Links: WhatsApp `+55 48 99626-3034`, Instagram `@padaria_bombazaro.s`, iFood (Bela Vista, Palhoça/SC).
- Mapa do Google (mesmo endereço do `iframe` atual).
- CNPJ 57.204.824/0001-09 no rodapé.
- Formulário "Trabalhe Conosco" (nome, idade, telefone, e-mail, cargo, experiência, currículo, mensagem).
- Identidade visual: cores tiradas da logo (ver seção 4). Logos já vetorizadas em `src/assets/logos/`.

**Mídia (cópia em `padaria-bombazaros/img/`, fora do git por ser pesada — ver Fase 3):**
- Logos: `logo.png`, `logo2.png`, `logo3.png`, `bombazaro_logo_letras_grossas.png`.
- 19 fotos de produtos em `img/carrossel/` → vão para o **Sanity** (cadastradas como produtos).
- Fotos da loja: `entrada.jpeg`, `padaria.png`, `confeitaria.jpg`.
- Vídeos (ainda em `padaria/videos/`): `entrada.mp4` (6,7 MB) e `video-entrada.mp4` (4,1 MB).

**Problemas do site antigo que o novo resolve:**
- Imagens de 2–2,5 MB cada (≈ 35 MB no total) → página lenta no 4G. Sanity entrega as fotos em WebP/AVIF no tamanho certo.
- CSS duplicado em 3 arquivos → Tailwind com classes responsivas.
- Carrossel manual, sem arrastar no celular → Embla.
- Formulário em PHP: não roda em hospedagem estática e **tem a senha do Gmail no código** (ver alerta).
- Imagens sem `alt`, sem SEO, sem preview no WhatsApp.
- Qualquer mudança dependia de mexer no código → agora os tios editam pelo painel.

> ⚠️ **Alerta de segurança:** `padaria/PHP/enviar-curriculo.php` contém a senha de app do Gmail
> `padariabombazaros@gmail.com` em texto puro. Ela **não foi commitada**, mas o arquivo está no *stage* do git.
> 1. Revogue a senha de app em https://myaccount.google.com/apppasswords.
> 2. No repo antigo: `git restore --staged PHP/enviar-curriculo.php`.
> 3. O site novo não precisa de nenhuma senha (o token do Sanity, se usado, fica só no Netlify, nunca no código).

---

## 2. Estrutura do novo site

Wireframes de todas as telas: https://claude.ai/artifact/U2cX2mnnQ2gHEV87hf7y2i
(Início desktop — com filtro de categorias clicável, Início celular, Trabalhe Conosco — com estado de sucesso, e 404.)

### Página inicial (`/`)
| # | Seção | Conteúdo | Quem edita |
|---|---|---|---|
| 1 | **Faixa de avisos** | Barra no topo, ex.: "Fechado no feriado de 15/11". Pode ser fechada pelo visitante. Some sozinha na data de término. Sem aviso ativo, não aparece. | **Tios (painel)** |
| 2 | **Cabeçalho fixo** | Logo, links (Início, Sobre, Delícias, Encomendas, Contato, Trabalhe Conosco), botão WhatsApp, hambúrguer no celular | Código |
| 3 | **Hero** | Vídeo da entrada em loop (foto no celular com economia de dados), logo, frase, botões *Pedir no iFood* e *Chamar no WhatsApp* | Código |
| 4 | **Datas especiais** | Campanha sazonal (Páscoa, Dia das Mães, Natal…): título, texto, foto, produtos da data, prazo de encomenda, botão de WhatsApp. Aparece só no período cadastrado. | **Tios (painel)** |
| 5 | **Sobre** | História da família + foto da fachada + **"Quem faz a Bombazaro's"**: fotos da família e da equipe com nome e função | Texto: código · **Equipe: tios (painel)** |
| 6 | **Nossas delícias** | Filtro por categoria (Pães, Bolos e tortas, Doces, Salgados, Bebidas) + cards com foto, nome, descrição, **etiquetas** e preço opcional | **Tios (painel)** |
| 7 | **Galeria** | Carrossel arrastável com fotos; clicar amplia | **Tios (painel)** |
| 8 | **Encomendas** | Chamada para bolos/tortas sob encomenda, botão de WhatsApp com mensagem pronta | Código |
| 9 | **Horários e localização** | Horários, selo "Aberto agora / Fechado" (horário de Brasília), endereço, mapa, "Como chegar" | **Tios (painel)** |
| 10 | **Contato** | Cards de WhatsApp, Instagram e iFood | Código |
| 11 | **Rodapé** | Logo, links, contatos, CNPJ, © ano automático | Código |
| 12 | **WhatsApp flutuante** | Botão fixo no canto da tela | Código |

**Etiquetas dos produtos** (lista fixa, escolhida no painel por caixinhas):
`Mais pedido` · `Novidade` · `Sem lactose` · `Sem glúten` · `Vegano` · `Contém amendoim` · `Contém nozes`
(as de alergênicos precisam ser confirmadas pelos tios produto a produto — informação errada aqui é um risco para quem tem alergia.)

### Página Trabalhe Conosco (`/trabalhe-conosco`)
- Mesmo cabeçalho/rodapé do site.
- Formulário com validação (campos obrigatórios, telefone com máscara, idade ≥ 16, arquivo PDF/DOC até 5 MB).
- Erros mostrados no próprio campo; tela de sucesso na própria página.
- Aviso de LGPD: dados usados apenas para o processo seletivo.
- Envios chegam no painel do Netlify e por e-mail em `padariabombazaros@gmail.com`.

### Página 404
- "Ops, essa fornada não saiu!" + botão para voltar ao início.

### Informações a confirmar com os tios (antes de publicar)
- [ ] Endereço completo (rua, número, Bela Vista, Palhoça/SC, CEP)
- [ ] Horário de funcionamento (seg–sex, sáb, dom, feriados)
- [ ] Lista de produtos por categoria, descrição, se mostram preços e **etiquetas de alergênicos**
- [ ] Fotos novas de produtos (horizontais, boa luz) e **fotos da família e da equipe** (com autorização de cada pessoa)
- [ ] Nome e função de cada pessoa da equipe que vai aparecer no site
- [ ] Encomendas: prazo mínimo, produtos aceitos
- [ ] Quais datas especiais eles trabalham (Páscoa, Dia das Mães, Natal…) e o que vendem em cada uma
- [ ] Cargos para o "Trabalhe Conosco"
- [ ] Ano de fundação
- [ ] Quem vai usar o painel (e-mail Google de cada um)

---

## 3. Painel dos tios (Sanity)

### Como funciona
```
Tios (celular/computador)                    Visitante
        │                                        │
        ▼                                        ▼
bombazaros.sanity.studio  ──salva──►  Sanity (nuvem)  ◄──busca──  padariabombazaros.netlify.app
  (painel com login Google)            fotos + textos               (site React no Netlify)
```
- Os tios entram no painel, editam e clicam em **Publicar**. O site busca os dados direto do Sanity,
  então a mudança aparece em segundos, **sem precisar de novo deploy**.
- As fotos enviadas pelo celular são redimensionadas e convertidas (WebP/AVIF) automaticamente pelo CDN do Sanity.
- Os tios só veem os campos que definirmos — não têm como quebrar o layout do site.

### O que é editável no painel (esquemas)

| Tipo | Campos | Observações |
|---|---|---|
| **Produto** | nome, foto (com recorte/ponto de foco), descrição curta, categoria, etiquetas, preço (opcional), destaque (sim/não), visível (sim/não), ordem | Desmarcar "visível" esconde sem apagar |
| **Aviso** | texto, tipo (informativo / importante), link opcional, início, fim | Só um aviso ativo por vez (o mais recente) |
| **Data especial** | título, texto, foto, produtos da data (lista), prazo de encomenda, início, fim | Aparece só entre início e fim |
| **Pessoa da equipe** | nome, função, foto, ordem | Seção "Quem faz a Bombazaro's" |
| **Foto da galeria** | foto, legenda, ordem | Carrossel |
| **Informações da loja** (documento único) | horários por dia, aviso de feriado, endereço, telefone | Usado no rodapé, horários e dados do Google |

Exemplo de esquema (no projeto do painel, pasta `studio/`):

```ts
// studio/schemaTypes/produto.ts
import { defineField, defineType } from 'sanity';

export const produto = defineType({
  name: 'produto',
  title: 'Produto',
  type: 'document',
  fields: [
    defineField({ name: 'nome', title: 'Nome', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'descricao', title: 'Descrição curta', type: 'text', rows: 3, validation: (r) => r.max(160) }),
    defineField({
      name: 'categoria', title: 'Categoria', type: 'string',
      options: { list: ['Pães', 'Bolos e tortas', 'Doces', 'Salgados', 'Bebidas'], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'etiquetas', title: 'Etiquetas', type: 'array', of: [{ type: 'string' }],
      options: { list: ['Mais pedido', 'Novidade', 'Sem lactose', 'Sem glúten', 'Vegano', 'Contém amendoim', 'Contém nozes'] },
    }),
    defineField({ name: 'preco', title: 'Preço (opcional)', type: 'number' }),
    defineField({ name: 'destaque', title: 'Mostrar primeiro?', type: 'boolean', initialValue: false }),
    defineField({ name: 'visivel', title: 'Visível no site?', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'nome', subtitle: 'categoria', media: 'foto' } },
});
```

No site, os tipos TypeScript espelham os esquemas (dá para gerá-los automaticamente com `npx sanity typegen generate`).

### Limites e cuidados
- Plano Free do Sanity: suficiente para uma padaria (poucos usuários, milhares de documentos, CDN de imagens).
  **Conferir em https://www.sanity.io/pricing** os limites atuais e se continua permitindo uso comercial.
- O *dataset* fica **público para leitura** (o site lê sem token). Não colocar nada privado nele — o formulário
  de currículos NÃO passa pelo Sanity, vai pelo Netlify Forms.
- Configurar **CORS** no Sanity só para `http://localhost:5173` e o domínio do Netlify.
- Se o Sanity estiver fora do ar, o site mostra uma mensagem amigável na seção (e o restante continua funcionando).

---

## 4. Identidade visual

Wireframe colorido de referência: artboard **"Início — colorido"** no canvas de wireframes.

### Paleta (tirada da logo)

| Token | Cor | Origem | Uso |
|---|---|---|---|
| `cafe` | `#3A1704` | texto da logo escura / site antigo | Textos, cabeçalho, rodapé, faixas escuras |
| `caramelo` | `#8A5A2B` | detalhe do trigo (`#9B6938`) escurecido p/ passar no contraste | Subtítulos, etiquetas, ícones, bordas |
| `trigo` | `#EEB50F` | trigo da logo | Botões principais, destaques, ondas entre seções |
| `creme` | `#FBF5E9` | creme das letras, um tom mais quente | Fundo principal |
| `creme-claro` | `#FEFDF5` | letras da logo | Cards, seções alternadas, texto sobre o café |

Cores de marca de terceiros, **só nos próprios botões**: WhatsApp `#25D366`, iFood `#EA1D2C`.
Verde e vermelho da bandeira ficam **só na logo**.

### Regras de contraste (WCAG AA: texto ≥ 4,5:1)

| Combinação | Contraste | Pode? |
|---|---|---|
| `cafe` sobre `creme` | 14,8 : 1 | ✅ texto principal |
| `caramelo` sobre `creme` | 5,4 : 1 | ✅ texto secundário |
| `cafe` sobre `trigo` (botão dourado) | 8,6 : 1 | ✅ |
| `trigo` sobre `cafe` (faixas escuras) | 8,6 : 1 | ✅ |
| `creme-claro` sobre `cafe` | 15,8 : 1 | ✅ |
| `trigo` sobre `creme` | 1,7 : 1 | ❌ **nunca como texto** — só decoração/fundo de botão |
| `#9B6938` (caramelo original) sobre `creme` | 4,3 : 1 | ❌ por isso usamos `#8A5A2B` |

### Tipografia (via @fontsource, sem depender de CDN)
- Títulos: **Playfair Display** (serifada clássica, conversa com a letra cursiva da logo sem competir com ela)
- Textos: **Nunito** (arredondada, acolhedora, ótima leitura no celular)

### Logos (`src/assets/logos/`)
| Arquivo | Onde usar |
|---|---|
| `logo-clara.svg` | Fundo escuro: hero com vídeo, rodapé |
| `logo-clara-grossa.svg` | Fundo escuro com foto "movimentada" atrás (lê melhor) |
| `logo-escura.svg` | Fundo claro: cabeçalho, 404, Trabalhe Conosco |
| `logo-alternativa-*.svg` | Reservas (outra fonte); usar só se os tios preferirem |

Detalhes: divisórias em "onda" (SVG) dourada entre seções, cantos arredondados (12–16 px), sombras suaves
puxadas para o marrom (`rgba(58,23,4,.08)`), fotos com `aspect-ratio` fixo.

---

## 5. Estrutura de pastas

```
padaria-bombazaros/
├── plano.md
├── public/
│   ├── favicon.svg, og-image.jpg, robots.txt, sitemap.xml
│   └── videos/entrada.mp4          # vídeo comprimido
├── src/
│   ├── assets/                     # logos e fotos fixas (fachada, hero), já em .webp
│   ├── components/
│   │   ├── layout/   Header.tsx, Footer.tsx, MobileMenu.tsx, WhatsAppFloat.tsx, AnnouncementBar.tsx
│   │   ├── sections/ Hero.tsx, SpecialDates.tsx, About.tsx, Team.tsx, Products.tsx,
│   │   │             Gallery.tsx, Orders.tsx, Location.tsx, Contact.tsx
│   │   └── ui/       Button.tsx, SectionTitle.tsx, ProductCard.tsx, Tag.tsx, WaveDivider.tsx, Skeleton.tsx
│   ├── data/
│   │   └── info.ts                 # o que é fixo: CNPJ, links, textos do Sobre
│   ├── lib/
│   │   ├── sanity.ts               # createClient + urlFor (imagens)
│   │   ├── queries.ts              # consultas GROQ
│   │   ├── whatsapp.ts             # monta links wa.me com mensagem
│   │   └── horario.ts              # calcula "Aberto agora"
│   ├── hooks/        useProdutos.ts, useAvisoAtivo.ts, useDataEspecial.ts, useEquipe.ts, useLoja.ts
│   ├── pages/        Home.tsx, TrabalheConosco.tsx, NotFound.tsx
│   ├── types/        sanity.types.ts   # gerado pelo typegen
│   ├── App.tsx, main.tsx, index.css
├── studio/                         # projeto do painel Sanity (deploy separado)
│   ├── schemaTypes/  produto.ts, aviso.ts, dataEspecial.ts, pessoa.ts, fotoGaleria.ts, loja.ts, index.ts
│   ├── sanity.config.ts
│   └── package.json
├── index.html
├── netlify.toml
├── .env.example                    # VITE_SANITY_PROJECT_ID=, VITE_SANITY_DATASET=production
└── package.json
```

---

## 6. Passo a passo

### Fase 1 — Ambiente (≈ 30 min)
- [ ] Instalar Node.js LTS via `nvm`:
      ```bash
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
      nvm install --lts && node -v && npm -v
      ```
- [ ] Extensões no VS Code: ESLint, Prettier, Tailwind CSS IntelliSense, Sanity.io.
- [ ] Contas: GitHub (`bombazaro` ✅), Netlify e Sanity (entrar com o GitHub ou Google).

### Fase 2 — Wireframes ✅ (feito) → validar
- [x] Wireframes de baixa fidelidade: Início (desktop e celular), Trabalhe Conosco, 404.
- [ ] Mostrar aos tios e ajustar ordem das seções, textos e o que entra no painel.
- [ ] (Opcional) Depois de aprovado, fazer um protótipo com as cores e fontes reais antes de codar.

### Fase 3 — Criar o projeto (≈ 30 min)
- [ ] Criar o site na raiz do repositório:
      ```bash
      cd ~/"Área de trabalho"/padaria-bombazaros
      npm create vite@latest site-tmp -- --template react-ts
      # mover o conteúdo de site-tmp/ para a raiz (sem sobrescrever plano.md/.gitignore) e apagar site-tmp/
      npm install
      npm install react-router-dom embla-carousel-react lucide-react @sanity/client @sanity/image-url @tanstack/react-query
      npm install -D tailwindcss @tailwindcss/vite prettier prettier-plugin-tailwindcss
      npm install @fontsource/playfair-display @fontsource/nunito
      npm install motion   # opcional
      ```
- [ ] Tailwind no `vite.config.ts` (plugin `@tailwindcss/vite`) e tema no `src/index.css`:
      ```css
      @import "tailwindcss";
      @theme {
        --color-cafe: #3A1704;
        --color-caramelo: #8A5A2B;
        --color-trigo: #EEB50F;
        --color-creme: #FBF5E9;
        --color-creme-claro: #FEFDF5;
        --font-titulo: "Playfair Display", serif;
        --font-texto: "Nunito", sans-serif;
      }
      ```
- [ ] `npm run dev` → http://localhost:5173. Commit e push.

### Fase 4 — Painel Sanity (≈ 3–4 h)
- [ ] Criar o painel:
      ```bash
      npm create sanity@latest -- --template clean --typescript --output-path studio
      # escolher: novo projeto "Bombazaros", dataset "production" (público)
      ```
- [ ] Escrever os esquemas da seção 3 em `studio/schemaTypes/` (com títulos e descrições em português,
      e `validation` para evitar campos vazios).
- [ ] Organizar o menu lateral do painel (structure tool): *Produtos*, *Avisos*, *Datas especiais*, *Equipe*, *Galeria*, *Informações da loja*.
- [ ] `cd studio && npm run dev` → testar em http://localhost:3333.
- [ ] Cadastrar os produtos atuais usando as fotos de `img/carrossel/` (o Sanity otimiza na hora do upload).
- [ ] Publicar o painel: `npx sanity deploy` → `https://bombazaros.sanity.studio`.
- [ ] Em https://www.sanity.io/manage: CORS (`http://localhost:5173` e `https://padariabombazaros.netlify.app`)
      e convidar os tios pelo e-mail Google deles (papel *Editor*).
- [ ] Gerar os tipos: `npx sanity schema extract && npx sanity typegen generate` → copiar para `src/types/`.

### Fase 5 — Preparar mídia fixa (≈ 1 h)
- [ ] Converter logos e fotos da loja para WebP (até 1600 px):
      ```bash
      sudo apt install webp ffmpeg imagemagick
      convert img/entrada.jpeg -resize '1600x1600>' -quality 80 src/assets/fachada.webp
      ```
- [ ] Comprimir o vídeo do hero (< 2 MB, 720p, sem áudio) + imagem *poster*:
      ```bash
      ffmpeg -i ../padaria/videos/entrada.mp4 -vf scale=-2:720 -an -c:v libx264 -crf 28 \
             -preset slow -movflags +faststart public/videos/entrada.mp4
      ffmpeg -i public/videos/entrada.mp4 -frames:v 1 -q:v 3 src/assets/hero-poster.jpg
      ```
- [ ] Favicon (https://realfavicongenerator.net) e `og-image.jpg` 1200×630.

### Fase 6 — Base e layout (≈ 2–3 h)
- [ ] `.env` com `VITE_SANITY_PROJECT_ID` e `VITE_SANITY_DATASET` (e `.env.example` no git).
- [ ] `src/lib/sanity.ts` (`createClient` com `useCdn: true`, `apiVersion` fixa) e `urlFor()` para imagens
      (`urlFor(foto).width(600).auto('format').url()`).
- [ ] `QueryClientProvider` (TanStack Query) no `main.tsx`.
- [ ] Rotas em `App.tsx` (`/`, `/trabalhe-conosco`, `*` → 404).
- [ ] `Header` fixo + menu hambúrguer acessível (`aria-expanded`, fecha com Esc/ao clicar).
- [ ] `AnnouncementBar` (usa `useAvisoAtivo`; lembra no `sessionStorage` se o visitante fechou).
- [ ] `Footer` (ano automático) e `WhatsAppFloat`.
- [ ] Rolagem suave + `scroll-margin-top` por causa do header fixo.

### Fase 7 — Seções da página inicial (≈ 2–3 dias)
- [ ] `Hero` — vídeo `autoPlay muted loop playsInline poster`; com `prefers-reduced-motion` mostra só a foto.
- [ ] `SpecialDates` — consulta GROQ filtrando por data:
      ```groq
      *[_type == "dataEspecial" && inicio <= now() && fim >= now()] | order(inicio desc)[0]{
        titulo, texto, foto, prazoEncomenda, produtos[]->{nome, foto}
      }
      ```
      Sem data ativa, a seção não aparece.
- [ ] `About` + `Team` — texto fixo + equipe do Sanity.
- [ ] `Products` — filtro por categoria (`useState`), cards com `Tag`s, *skeleton* enquanto carrega,
      destaques primeiro, só `visivel == true`.
- [ ] `Gallery` — Embla com setas, bolinhas, arrastar e *lightbox*.
- [ ] `Orders` — botão de WhatsApp com mensagem pronta.
- [ ] `Location` — horários do Sanity + `lib/horario.ts` calcula "Aberto agora" no fuso `America/Sao_Paulo`
      (`Intl.DateTimeFormat` com `timeZone`) + mapa `loading="lazy"`.
- [ ] `Contact` — cards de WhatsApp, Instagram, iFood.
- [ ] Imagens com `alt` (nome do produto), `loading="lazy"` (exceto topo), `width`/`height`.
- [ ] Testes unitários simples (Vitest) para `horario.ts` e `whatsapp.ts` — são as funções com lógica.

### Fase 8 — Trabalhe Conosco com Netlify Forms (≈ 3 h)
O Netlify detecta formulários lendo o HTML no deploy; como o React cria o formulário via JS, é preciso um
formulário "espelho" escondido no `index.html`:

- [ ] No `index.html`:
      ```html
      <form name="trabalhe-conosco" netlify netlify-honeypot="bot-field" hidden>
        <input name="nome" /><input name="idade" /><input name="telefone" /><input name="email" />
        <select name="cargo"></select><textarea name="experiencia"></textarea>
        <input type="file" name="curriculo" /><textarea name="mensagem"></textarea>
      </form>
      ```
- [ ] No componente, enviar com `FormData` (necessário por causa do anexo):
      ```ts
      const data = new FormData(event.currentTarget);
      data.append('form-name', 'trabalhe-conosco');
      await fetch('/', { method: 'POST', body: data }); // sem definir Content-Type manualmente
      ```
- [ ] Honeypot `bot-field`; validação de tipo/tamanho do arquivo, telefone e e-mail; estados enviando/sucesso/erro.
- [ ] Após o 1º deploy: Netlify → *Forms* → ativar detecção → *Form notifications* → e-mail `padariabombazaros@gmail.com`.
- [ ] Conferir os limites atuais de envios/arquivos do Netlify Free em https://www.netlify.com/pricing/.

### Fase 9 — SEO e compartilhamento (≈ 2 h)
- [ ] `<title>` e `<meta name="description">` por página (React 19 aceita `<title>` no componente).
- [ ] Open Graph (`og:title`, `og:description`, `og:image`) para o preview no WhatsApp.
- [ ] JSON-LD `Bakery` no `index.html` (nome, endereço, telefone, horários, geo, Instagram/iFood).
- [ ] `robots.txt`, `sitemap.xml`, `lang="pt-BR"`.

### Fase 10 — Qualidade e testes (≈ 2–3 h)
- [ ] `npm run build` e `npm run lint` sem erros.
- [ ] Celular real (Android/iPhone): menu, carrossel, vídeo, formulário, faixa de aviso.
- [ ] Telas de 360, 768, 1024 e 1440 px.
- [ ] Lighthouse mobile: **Performance ≥ 90, Acessibilidade ≥ 95, SEO 100**.
- [ ] Navegação só com teclado; contraste de cores.
- [ ] Testar o painel **como os tios**: criar um aviso, trocar a foto de um produto, cadastrar uma data especial
      — tudo pelo celular — e ver aparecer no site.
- [ ] Links externos com `target="_blank" rel="noopener noreferrer"`.

### Fase 11 — Colocar no ar de graça (≈ 30 min)
1. `netlify.toml` na raiz:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   # /trabalhe-conosco funcionar ao recarregar a página (SPA)
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
2. Commit e push.
3. https://app.netlify.com → **Add new site → Import an existing project → GitHub** → `padaria-bombazaros`.
4. *Build command* `npm run build`, *Publish directory* `dist`.
5. *Environment variables*: `VITE_SANITY_PROJECT_ID` e `VITE_SANITY_DATASET`.
6. **Deploy**. Em *Site configuration → Change site name*: `padariabombazaros` → https://padariabombazaros.netlify.app
7. Ativar o formulário (Fase 8) e fazer um envio de teste.
8. Todo `git push` na `main` publica sozinho; mudanças no painel aparecem sem deploy.

### Fase 12 — Entregar para os tios
- [ ] Escrever um **guia curto com prints** ("Como trocar a foto de um produto", "Como colocar um aviso",
      "Como criar uma data especial") — pode ser um PDF ou uma página no próprio painel.
- [ ] Sentar com eles e fazer cada tarefa uma vez juntos, no celular deles.
- [ ] Salvar o link `bombazaros.sanity.studio` na tela inicial do celular deles (vira um "app").

### Fase 13 — Depois de publicar
- [ ] **Perfil da Empresa no Google** com o link do site.
- [ ] Link na bio do Instagram e no iFood.
- [ ] **Google Search Console** + envio do `sitemap.xml`.
- [ ] (Opcional) Analytics sem cookies (GoatCounter / Umami Cloud free).
- [ ] (Opcional) Domínio `bombazaros.com.br`.
- [ ] Arquivar o repositório antigo `bombazaro/Padaria`.

---

## 7. Ideias para a versão 2
- "Monte seu bolo": escolher massa, recheio, cobertura, tamanho e data → abre o WhatsApp com o pedido pronto.
- Horário das fornadas ("pão quentinho às 6h e às 16h").
- Botão "Avalie a gente no Google" + QR code no balcão.
- Perguntas frequentes (pagamento, estacionamento, prazos).
- Portfólio de bolos de festa.
- Feed do Instagram.

---

## 8. Cronograma sugerido

| Semana | Entregas |
|---|---|
| 1 | Fases 1–3: ambiente, validar wireframes com os tios, projeto criado. Coletar as informações da seção 2. |
| 2 | Fases 4–6: painel Sanity com produtos cadastrados, mídia otimizada, layout base. |
| 3 | Fase 7: todas as seções da página inicial. |
| 4 | Fases 8–10: formulário, SEO, testes. |
| 5 | Fases 11–13: publicar, treinar os tios, Google Meu Negócio. |

---

## 9. Checklist final antes de mostrar para os tios
- [ ] Informações conferidas (telefone, endereço, horários, CNPJ, etiquetas de alergênicos).
- [ ] Nenhum texto de exemplo sobrando.
- [ ] Site rápido no 4G.
- [ ] Formulário testado e e-mail chegando.
- [ ] Tios conseguem editar produto, aviso e data especial sozinhos pelo celular.
- [ ] Links de WhatsApp, Instagram, iFood e mapa funcionando.
- [ ] Preview do link no WhatsApp com imagem e descrição.
- [ ] Senha antiga do Gmail revogada.
