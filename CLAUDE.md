# CLAUDE.md — ALPACAPRESS

Site gerado pelo **SF (Site Factory)** em 15/04/2026. Migrado para o modelo Cloudflare + Supabase em 24/09/2026.

## Contexto do Site

**Nome:** ALPACAPRESS
**Nicho:** Saúde
**Keywords:** Renata Lisboa e uma empresaria motivada que fundou a Alpacapress aos 32
**Paleta de cores:** rose | **Fonte:** inter

Renata Lisboa é uma empresária motivada que fundou a Alpacapress aos 32 anos de idade. Ela fundou a empresa com o objetivo de compartilhar seu conhecimento na área. Nascida e criada no Brasil, Renata sempre se interessou por negócios e moda. Depois de trabalhar na indústria da moda por vários anos, ela decidiu fundar sua própria empresa. A Alpacapress é agora um negócio de sucesso que proporciona empregos para dezenas de pessoas no Brasil e no Mundo. Renata se orgulha de poder apoiar a economia de seu país e espera continuar expandindo seus negócios nos próximos anos.

## Componentes visuais usados

| Seção | Variante |
|-------|----------|
| Header | Header-I |
| Hero | Hero-H |
| Features | Features-H |
| About Section | About-H |
| Posts | Posts-B |
| Footer | Footer-A |
| Página Sobre | Sobre-J |
| Página Contato | Contato-J |

## Estrutura do projeto

```
src/
  sections/        # Layout escolhido pelo SF — Header, Hero, Features, About, Posts, Footer, Sobre, Contato
  data/            # JSONs com todo o conteúdo editável
  lib/             # supabase.ts (cliente) e posts.ts (getPosts/getPostBySlug)
  components/      # Seo.astro (meta tags + JSON-LD)
  pages/           # Rotas Astro (index, sobre, contato, blog, privacidade, termos, [...slug])
  layouts/         # BaseLayout com fonte e cores dinâmicas
  styles/          # global.css com variáveis CSS de cor
public/
  images/          # hero.jpg, about.jpg, sobre.jpg
```

## O que editar

### Textos e conteúdo
- **`src/data/home.json`** — hero (título, subtítulo, botão), features (título, items), about section (título, desc, stats), posts
- **`src/data/sobre.json`** — conteúdo completo da página Sobre (hero, texto, missão)
- **`src/data/contato.json`** — título, subtítulo, email, tempo de resposta
- **`src/data/siteConfig.json`** — nome, slug, email, redes sociais, menu (título/descrição/OG/JSON-LD derivam daqui)

### Imagens
Imagens já estão em `public/images/` (via Pexels). Para substituir, mantenha os mesmos nomes de arquivo:
- `hero.jpg` — imagem de fundo do Hero (e og:image padrão)
- `about.jpg` — imagem da seção About (home)
- `sobre.jpg` — imagem de fundo da página Sobre

### Posts do blog
Os posts NÃO ficam mais em markdown local. São carregados do Supabase (tabela `network_posts`, filtrados por `domain = alpacapress.com.br`).
- `src/lib/posts.ts` — `getPosts()` e `getPostBySlug()`; `formatContentToHtml()` converte markdown → HTML.
- Sem painel admin. Novos posts/posts editados entram pela plataforma 8links e publicam automaticamente (via Git/CF).

### Cores
Variáveis em `src/styles/global.css`: `--color-primary`, `--color-accent`, `--color-dark`.

## SEO

- `src/components/Seo.astro` injetado pelo `BaseLayout`: title, description, canonical, OG, Twitter, `name="robots"`, JSON-LD (WebSite nas páginas estáticas, BlogPosting nos artigos).
- `src/pages/robots.txt.ts` e `src/pages/sitemap.xml.ts` gerados dinamicamente (sitemap inclui posts com lastmod).

## Deploy

```bash
bun install
bun run build
# Publicar no Cloudflare: a pasta dist/ é servida como Worker (adaptador @astrojs/cloudflare)
# Envs opcionais no CF: SUPABASE_URL e SUPABASE_ANON_KEY (fallbacks embutidos no código)
```