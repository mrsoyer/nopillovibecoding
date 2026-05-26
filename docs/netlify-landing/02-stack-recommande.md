# 02 — Stack recommandee : Astro + Tailwind + Netlify

## Pourquoi Astro

### Le bon outil pour une landing

Astro est un **framework de site statique avec Islands Architecture** : il pre-rend tout en HTML au build et **n'envoie aucun JS au client par defaut**. Quand on a besoin d'interactivite, on hydrate uniquement les composants concernes (`client:load`, `client:visible`, `client:idle`).

Pour une landing :
- 95 % du contenu = statique (hero, features, pricing, FAQ, footer).
- 5 % interactif = formulaire, accordion, carousel, popup.
- Astro envoie 0 KB JS pour le statique → score Lighthouse parfait.

### Comparaison frameworks pour landings

| Framework | JS par defaut | DX Tailwind | SSR Netlify | Quand l'utiliser |
|-----------|---------------|-------------|-------------|------------------|
| **Astro** | 0 KB | Excellent (integration officielle) | Adapter `@astrojs/netlify` | **Defaut landings Nopillo** |
| Next.js | ~80 KB hydration | Bon | Adapter natif | App complexe avec auth / dashboard |
| Nuxt 3 | ~60 KB | Bon | Adapter `@nuxtjs/netlify` | Equipe Vue.js existante |
| Eleventy | 0 KB | Plugin | Static seul | Blog pur, pas d'islands |
| HTML pur | 0 KB | Manuel | Static seul | Landing 1-pager sans build |

**Verdict Nopillo** : Astro pour 90 % des cas. HTML pur pour les landings ultra-simples one-shot.

## Pourquoi Tailwind

- Design system par classes utilitaires → **pas de CSS custom a maintenir** par landing.
- Purge automatique au build (Tailwind 4 = JIT par defaut) → bundle CSS final < 15 KB.
- Tres bonne integration Astro via `@astrojs/tailwind` (un seul `npx astro add tailwind`).
- Compatible avec design tokens d'un design system (couleurs, typo, espacements en `tailwind.config.ts`).
- Equipe Nopillo deja familiere avec Tailwind via projets internes.

### Structure Tailwind pour landings clients

```
src/
  styles/
    global.css            # @tailwind directives + base resets
  tokens/
    [client].ts           # design tokens du client (couleurs, fonts)
tailwind.config.ts        # extend du theme avec tokens client
```

## Pourquoi Netlify (vs Cloudflare Pages, Vercel, OVH)

| Critere | Netlify | Vercel | Cloudflare Pages | OVH (statique) |
|---------|---------|--------|------------------|----------------|
| DX deploy Astro | Excellent | Excellent | Tres bon | Manuel (FTP/SSH) |
| Forms sans backend | **Inclus illimite** | Manuel (3rd party) | Manuel | Manuel |
| Edge Functions | **Deno, GA** | Edge Middleware | Workers | Non |
| Deploy preview par PR | **Inclus** | Inclus | Inclus | Manuel |
| Image CDN | Inclus | Inclus payant | Inclus | Non |
| Drawer collab client | **Oui (unique)** | Comments PR | Non | Non |
| Pricing free tier | 100 GB BW | 100 GB BW | Illimite | Bas cost dedie |
| Verrou vendor | Faible (HTML+JS) | Moyen (Next-coupled) | Faible | Aucun |

**Choix Nopillo** : Netlify, car les Forms et le Drawer collab font gagner du temps client → reduction du tooling tiers (Typeform, Notion comments, etc.).

## Stack complete recommandee

```
┌─────────────────────────────────────────────────────────┐
│ Astro 4.x                  ← framework                  │
│ Tailwind CSS 4             ← styling                    │
│ TypeScript 5               ← type safety                │
│ @astrojs/netlify (SSR)     ← adapter optionnel          │
│ @astrojs/tailwind          ← integration Tailwind       │
│ @astrojs/sitemap           ← SEO sitemap auto           │
│ astro-icon                 ← icones SVG inline          │
│ Decap CMS / TinaCMS        ← CMS Git-based optionnel    │
└─────────────────────────────────────────────────────────┘
              │
              │ git push
              ▼
┌─────────────────────────────────────────────────────────┐
│ Netlify                                                 │
│  - Build (astro build → dist/)                          │
│  - CDN (statique global)                                │
│  - Forms (capture leads)                                │
│  - Functions (TS, /api/*)                               │
│  - Edge Functions (perso, A/B)                          │
│  - Image CDN (resize, WebP)                             │
│  - Deploy Previews (1 par PR)                           │
└─────────────────────────────────────────────────────────┘
```

## Setup minimal verifie

```bash
# Creer projet
npm create astro@latest -- --template minimal --typescript strict

# Installer Tailwind + Netlify adapter
cd mon-projet
npx astro add tailwind
npx astro add netlify

# Ajouter sitemap
npm install @astrojs/sitemap
```

`astro.config.mjs` final :

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://client.nopillo.com',
  output: 'static',                  // 'server' si SSR necessaire
  adapter: netlify({ imageCDN: true }),
  integrations: [tailwind(), sitemap()],
});
```

`netlify.toml` minimal :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[context.production.environment]
  PUBLIC_ENV = "production"

[context.deploy-preview.environment]
  PUBLIC_ENV = "preview"
```

## Structure projet recommandee

```
.
├── netlify.toml
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/         # composants Astro/React
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Pricing.astro
│   │   ├── ContactForm.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── merci.astro
│   ├── styles/
│   │   └── global.css
│   └── content/            # collections Markdown (FAQ, temoignages)
└── netlify/
    ├── functions/          # serverless TS
    │   └── lead-to-hubspot.ts
    └── edge-functions/     # Deno edge
        └── ab-hero.ts
```

## Cout reel pour Nopillo

Hypothese : 10 landings clients vivantes, ~ 20 GB BW/mois cumule, 50 deploys/mois.

| Plateforme | Cout mensuel |
|------------|--------------|
| Webflow (10 sites Basic 14 USD) | **140 USD** |
| Netlify Pro (1 compte agence) + Astro | **19 USD** |
| Economie | **121 USD/mois (1 452 USD/an)** |

Attention : ce calcul ignore le **temps dev**. Coder une landing prend en moyenne 1.5x plus de temps que la builder dans Webflow → l'economie n'est rentable qu'au bout de plusieurs mois de vie du site.

## A retenir

- Astro + Tailwind + Netlify = stack moderne, performante, pas de lock-in.
- Setup en moins de 10 min avec scaffolding automatise.
- Cout hosting divise par 7-10 vs Webflow multi-sites.
- Necessite une equipe a l'aise avec Git, ligne de commande, Markdown / TS.

## Sources

- [astrojs/netlify integration](https://docs.astro.build/en/guides/integrations-guide/netlify/) — config officielle adapter Astro
- [Deploy your Astro Site to Netlify](https://docs.astro.build/en/guides/deploy/netlify/) — pas a pas deploiement
- [How to deploy an Astro site - Netlify blog](https://www.netlify.com/blog/how-to-deploy-astro/) — cas d'usage et benefices
- [Astro Landing Page (Astro themes)](https://astro.build/themes/details/astro-landing-page/) — reference template Tailwind perf 100
- [How to Use Tailwind CSS with Astro - 2026 Guide](https://astroseoblog.com/blog/astro-tailwind-css-integration-guide) — integration Tailwind 4 + Astro
- [Vercel vs Netlify 2025 Edge Computing Performance - DEV](https://dev.to/dataformathub/vercel-vs-netlify-2025-the-truth-about-edge-computing-performance-2oa0) — comparatif plateformes edge
- [Complete Guide to Netlify Pricing and Plans 2026 - Flexprice](https://flexprice.io/blog/complete-guide-to-netlify-pricing-and-plans) — base calcul cout multi-sites
