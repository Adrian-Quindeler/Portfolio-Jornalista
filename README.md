# Portfólio — Mariana Bernardino

Site de portfólio profissional da jornalista **Mariana Bernardino**. O projeto apresenta sua trajetória e trabalhos para recrutadores e oportunidades freelance.

## Objetivo

Centralizar e dar visibilidade ao trabalho da cliente em quatro frentes:

- **Vídeos editados**
- **Produções**
- **Reportagens**
- **Fotografias**

A home reúne apresentação, biografia e atalho para cada categoria; as páginas internas detalham os trabalhos com capas, links externos e galerias.

## Stack

| Camada | Tecnologia usada |
|--------|------------|
| Framework | [Astro 7](https://astro.build/) (site estático, file-based routing) |
| Linguagem | TypeScript (modo strict) |
| Imagens | Cloudinary SDK |
| Runtime | Node.js `>=22.12.0` |

Não há React, Vue, Tailwind nem CMS: páginas Astro, CSS próprio e catálogos em TypeScript.

## Arquitetura

```
portfolio-jornalista/
├── public/              # assets leves locais (perfil, thumbs da home)
├── src/
│   ├── components/      # Header, WorkCard, PhotoGallery, ThemeToggle…
│   ├── data/            # catálogos TS (vídeos, produções, reportagens, galerias)
│   ├── layouts/         # Layout.astro (SEO, tema, shell da página)
│   ├── lib/             # cloudinary.ts (URLs CDN + listagem de pastas)
│   ├── pages/           # rotas (home + /trabalhos/*)
│   └── styles/          # temas e CSS por seção
├── .env.example
├── astro.config.mjs
└── package.json
```

### Fluxo de dados

- **`Layout.astro`** envolve todas as páginas: meta tags, script de tema, header, conteúdo e footer.
- **`src/data/*.ts`** guarda títulos, descrições, IDs/pastas do Cloudinary e links externos — o conteúdo é editado nesses arquivos.
- **Componentes** (`WorkCard`, `PhotoCard`, `PhotoGallery`) consomem esses dados e montam as URLs de imagem via `getCldUrl`.
- **Galerias fotográficas**: cada página em `pages/trabalhos/fotografias/` referencia metadados em `galerias.ts` e chama `listFolder()` no build para listar as fotos da pasta correspondente no Cloudinary.
- **Home**: fotos de perfil e capas das categorias ficam em `public/images/` (poucos arquivos leves). A mídia pesada dos trabalhos fica no CDN.

### Rotas principais

| URL | Conteúdo |
|-----|----------|
| `/` | Hero, sobre, trabalhos e contato |
| `/trabalhos/Videos` | Vídeos editados |
| `/trabalhos/Producoes` | Produções de TV |
| `/trabalhos/Reportagens` | Reportagens publicadas |
| `/trabalhos/Fotografias` | Índice das galerias |
| `/trabalhos/fotografias/*` | Página de cada galeria |

## Cloudinary: performance das imagens

Quando as fotos das galerias e as capas dos trabalhos ficavam no repositório, o clone, o deploy e o carregamento do site ficavam lentos — arquivos grandes no Git e no bundle estático.

A solução foi hospedar essa mídia no **Cloudinary** e manter no código apenas nomes públicos e pastas. O módulo [`portfolio-jornalista/src/lib/cloudinary.ts`](portfolio-jornalista/src/lib/cloudinary.ts) concentra a integração:

- **`getCldUrl(publicId, options)`** — monta a URL de entrega com:
  - `f_auto` — formato automático (WebP/AVIF quando o navegador suporta)
  - `q_auto` — qualidade automática
  - resize sob demanda (`w_800`, `w_1400`, `c_fill`, `c_limit`, etc.), para o browser não baixar o arquivo original inteiro
- **`listFolder(folder)`** — usa a Admin API no build/dev para listar os assets de uma pasta e montar as galerias sem hardcodar cada foto

Na interface, thumbs e grades usam dimensões menores; a imagem em destaque das galerias usa um limite maior; imagens fora do destaque usam `loading="lazy"`.


## Outros diferenciais

- **Tema claro/escuro** — `ThemeToggle` com preferência em `localStorage`, fallback para `prefers-color-scheme` e script no layout para evitar flash ao carregar
- **Layout responsivo** — navegação mobile (menu hambúrguer), grids e seções que se adaptam a telas menores
- **Links externos seguros** — cards apontam para YouTube, Globoplay, A Gazeta, G1 etc. com `rel="noopener noreferrer"`
- **Galerias** — foto destaque + grade responsiva com lazy loading
- **Acessibilidade** — `aria-label` / `aria-expanded` na navegação e no tema, textos alternativos nas imagens, respeito a `prefers-reduced-motion`