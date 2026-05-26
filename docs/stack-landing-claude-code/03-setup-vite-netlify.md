# 03 — Setup Vite + Tailwind + Netlify (avec SSG)

> Cas d'usage : tu veux rester sur React/Vue exclusivement, ou tu as beaucoup d'interactivite. Pour une landing 95 % statique, prefere [04-setup-astro-netlify.md](04-setup-astro-netlify.md).

## Sommaire

- [Stack cible](#stack-cible)
- [Setup initial](#setup-initial)
- [Configuration SSG](#configuration-ssg)
- [Configuration Tailwind](#configuration-tailwind)
- [Configuration Netlify](#configuration-netlify)
- [Deploy](#deploy)
- [Pieges a eviter](#pieges-a-eviter)

## Stack cible

- **Vite 7** (build tool)
- **React 19** ou **Vue 3** (UI library)
- **vite-react-ssg** ou **vite-ssg** (static site generation)
- **Tailwind CSS 4** (styling)
- **TypeScript** (recommande)
- **Netlify** (hosting)
- **Supabase JS client** (DB) + **Edge Functions** (form handlers)

## Setup initial

### React

```bash
# Init projet
npm create vite@latest ma-landing -- --template react-ts
cd ma-landing

# Dependencies UI + SSG
npm install
npm install -D vite-react-ssg

# Tailwind 4
npm install -D tailwindcss @tailwindcss/vite

# Supabase
npm install @supabase/supabase-js

# Netlify Vite plugin
npm install -D @netlify/vite-plugin
```

### Vue (alternative)

```bash
npm create vite@latest ma-landing -- --template vue-ts
cd ma-landing
npm install
npm install -D vite-ssg
npm install -D tailwindcss @tailwindcss/vite
npm install @supabase/supabase-js
npm install -D @netlify/vite-plugin
```

## Configuration SSG

> Sans SSG, Vite produit une SPA = HTML vide qui hydrate cote client = LCP catastrophique = mauvaise landing. **Le SSG est obligatoire.**

### React : vite-react-ssg

`vite.config.ts` :

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    netlify(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
```

`package.json` (scripts) :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite-react-ssg build",
    "preview": "vite preview"
  }
}
```

`src/main.tsx` :

```typescript
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './index.css'

export const createRoot = ViteReactSSG({ routes })
```

`src/routes.tsx` :

```typescript
import type { RouteRecord } from 'vite-react-ssg'
import Home from './pages/Home'
import Pricing from './pages/Pricing'

export const routes: RouteRecord[] = [
  { path: '/', element: <Home />, entry: 'src/pages/Home.tsx' },
  { path: '/pricing', element: <Pricing />, entry: 'src/pages/Pricing.tsx' },
]
```

### Vue : vite-ssg

`package.json` (scripts) :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite-ssg build",
    "preview": "vite preview"
  }
}
```

`src/main.ts` :

```typescript
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './index.css'

export const createApp = ViteSSG(App, {
  routes: [
    { path: '/', component: () => import('./pages/Home.vue') },
    { path: '/pricing', component: () => import('./pages/Pricing.vue') },
  ],
})
```

## Configuration Tailwind

`src/index.css` :

```css
@import "tailwindcss";

/* Design tokens (couleurs, fonts) */
@theme {
  --color-brand-50: oklch(0.98 0.02 250);
  --color-brand-500: oklch(0.55 0.18 250);
  --color-brand-900: oklch(0.25 0.10 250);
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

Pas besoin de `tailwind.config.js` en Tailwind 4 : tout est inline via `@theme`.

## Configuration Netlify

`netlify.toml` a la racine :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

# SPA fallback uniquement pour les routes qui ne sont pas pre-rendues
# Avec vite-react-ssg / vite-ssg, les routes listees sont pre-rendues → pas besoin de fallback
# Sinon, decommenter :
# [[redirects]]
#   from = "/*"
#   to = "/index.html"
#   status = 200

# Headers de securite recommandes
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## Deploy

### Premiere fois

```bash
# Login Netlify (le CLI est deja installe)
netlify login

# Init project (auto-detection Vite)
netlify init

# Choisir : "Create & configure a new site"
# Netlify detecte : build = "npm run build", publish = "dist"
# Suivre les prompts pour connecter Git (recommande)

# Premier deploy
netlify deploy --prod
```

### Deploys suivants

Avec Git connecte : chaque push sur la branche principale = deploy auto. Chaque PR = deploy preview avec URL dediee.

Sans Git : `netlify deploy --prod` apres chaque `npm run build`.

## Pieges a eviter

| Piege | Symptome | Fix |
|-------|----------|-----|
| Oubli du SSG | LCP > 3s sur mobile, contenu invisible avec JS desactive | Installer vite-react-ssg / vite-ssg et changer le build script |
| Oubli du redirect SPA pour routes dynamiques | 404 au refresh sur `/pricing` | Ajouter le redirect `/* → /index.html` si la route n'est pas dans `routes` |
| `base` mal configure | Tous les assets en 404 | Garder `base: '/'` sauf si tu deploies sur un sous-chemin |
| Secrets Supabase exposes | Service role key visible en prod | Utiliser `VITE_PUBLIC_SUPABASE_ANON_KEY` (publique) et JAMAIS `SUPABASE_SERVICE_ROLE_KEY` cote client |
| Node 18 sur Netlify | Build casse | Forcer `NODE_VERSION = "22"` dans `netlify.toml` |

## Variables d'environnement

Vite expose uniquement les variables prefixees `VITE_*` cote client.

`.env.example` :

```bash
# Cote client (OK)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Cote serveur uniquement (Netlify Functions / Edge Functions)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

L'extension Netlify x Supabase (cf. [05-supabase-integration.md](05-supabase-integration.md)) injecte ces variables automatiquement avec les bons prefixes.

## Structure de projet recommandee

```
ma-landing/
├── netlify.toml
├── vite.config.ts
├── tsconfig.json
├── package.json
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx           # entree SSG
│   ├── routes.tsx         # routes file
│   ├── index.css          # tailwind + tokens
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Pricing.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── ContactForm.tsx
│   └── lib/
│       └── supabase.ts    # client Supabase
└── supabase/
    └── functions/
        └── contact-form/  # Edge Function
            └── index.ts
```

## Quand cette stack est meilleure qu'Astro

- Equipe React/Vue avec composants reutilisables existants
- Landing avec gros besoin d'interactivite client (configurateur, calculateur)
- Volonte de garder un seul mental model (pas envie d'apprendre la syntaxe `.astro`)

Dans 80 % des cas restants, Astro est plus simple et plus performant : [04-setup-astro-netlify.md](04-setup-astro-netlify.md).

## Sources

- [Vite static deploy](https://vite.dev/guide/static-deploy)
- [Netlify Vite setup guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/)
- [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg)
- [vite-ssg (Antfu, Vue)](https://github.com/antfu-collective/vite-ssg)
- [Vite SSG single static page tutorial](https://medium.com/@navynj/vite-setup-for-single-static-page-using-ssg-d84360595af4)
