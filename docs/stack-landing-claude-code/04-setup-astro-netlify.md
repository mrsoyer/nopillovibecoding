# 04 — Setup Astro 6 + Tailwind + Netlify (recommande par defaut)

> Stack recommandee pour 80 % des landings. Astro 6 utilise Vite 7 sous le capot, donc tu beneficies de la rapidite Vite + des optimisations specifiques sites de contenu.

## Sommaire

- [Stack cible](#stack-cible)
- [Setup initial](#setup-initial)
- [Configuration Tailwind](#configuration-tailwind)
- [Configuration Netlify](#configuration-netlify)
- [Composants Astro vs Islands](#composants-astro-vs-islands)
- [Optimisation Core Web Vitals](#optimisation-core-web-vitals)
- [Deploy](#deploy)
- [Pieges a eviter](#pieges-a-eviter)

## Stack cible

- **Astro 6** (framework, integre Vite 7)
- **Tailwind CSS 4** (styling, via `@astrojs/tailwind`)
- **`@astrojs/netlify`** adapter (uniquement si SSR/Edge ; pour static, optionnel)
- **TypeScript** (active par defaut)
- **Netlify** (hosting)
- **Supabase JS client** + **Edge Functions**
- **Optionnel** : React, Vue ou Svelte pour les islands interactifs

## Setup initial

```bash
# Init projet
npm create astro@latest ma-landing
# Choisir : Empty, TypeScript Strict, Yes pour install deps

cd ma-landing

# Tailwind 4
npx astro add tailwind

# Adapter Netlify (uniquement si tu veux des routes SSR ou Edge)
npx astro add netlify

# Si tu veux des islands React
npx astro add react

# Supabase
npm install @supabase/supabase-js
```

## Configuration Tailwind

L'install via `npx astro add tailwind` configure tout. Tu te retrouves avec :

`astro.config.mjs` :

```javascript
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import netlify from '@astrojs/netlify' // optionnel

export default defineConfig({
  integrations: [tailwind()],
  // adapter: netlify(), // decommenter si SSR/Edge
})
```

Design tokens dans `src/styles/global.css` :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-brand-500: 99 102 241;
    --color-brand-700: 79 70 229;
    --font-sans: 'Inter', system-ui, sans-serif;
  }
}
```

## Configuration Netlify

Avec le CLI deja installe, c'est tres simple. Netlify auto-detecte Astro.

`netlify.toml` (optionnel mais recommande) :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Pas besoin de redirect SPA** : Astro genere un fichier HTML par route, donc chaque URL est servie nativement.

## Composants Astro vs Islands

### Composant Astro pur (.astro)

Le 95 % de ta landing. Pas de JS au client.

`src/components/Hero.astro` :

```astro
---
// Frontmatter (TypeScript)
interface Props {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
}
const { title, subtitle, ctaText, ctaHref } = Astro.props
---

<section class="bg-gradient-to-b from-brand-50 to-white py-24">
  <div class="mx-auto max-w-4xl px-4 text-center">
    <h1 class="text-5xl font-bold text-gray-900">{title}</h1>
    <p class="mt-6 text-xl text-gray-600">{subtitle}</p>
    <a href={ctaHref} class="mt-8 inline-block rounded-lg bg-brand-700 px-8 py-4 text-white">
      {ctaText}
    </a>
  </div>
</section>

<style>
  /* Scoped CSS si besoin */
</style>
```

### Island React (pour interactivite)

Uniquement la ou tu as VRAIMENT besoin de JS.

`src/components/ContactForm.tsx` :

```tsx
import { useState } from 'react'

export default function ContactForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    const res = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setStatus(res.ok ? 'sent' : 'error')
  }

  return (
    <form onSubmit={handleSubmit} class="flex gap-2">
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
        class="flex-1 rounded border px-4 py-2" placeholder="votre@email.com" />
      <button type="submit" disabled={status === 'sending'}
        class="rounded bg-brand-700 px-6 py-2 text-white disabled:opacity-50">
        {status === 'sending' ? '...' : 'Envoyer'}
      </button>
    </form>
  )
}
```

Usage dans la page :

```astro
---
import ContactForm from '../components/ContactForm'
---

<!-- client:visible = hydrate quand le composant entre dans le viewport -->
<ContactForm client:visible />
```

### Les 4 directives d'hydratation

| Directive | Quand hydrater | Usage type |
|-----------|---------------|-----------|
| `client:load` | Immediatement au chargement | Form au-dessus de la fold |
| `client:idle` | Quand le browser est idle | Widget non critique |
| `client:visible` | Quand le composant entre dans le viewport | Accordion FAQ, form contact en bas |
| `client:media={query}` | Quand un media query matche | Carousel uniquement mobile |

**Anti-pattern** : utiliser `client:load` partout, ca tue l'interet d'Astro. Defaut → `client:visible`.

## Optimisation Core Web Vitals

Astro 6 cible LCP < 1s sur les landings bien faites. Patterns :

### Images

```astro
---
import { Image } from 'astro:assets'
import heroImg from '../assets/hero.jpg'
---

<!-- Auto WebP/AVIF, responsive, dimensions inferrees -->
<Image src={heroImg} alt="Hero" loading="eager" fetchpriority="high" />

<!-- Images below fold -->
<Image src={featureImg} alt="Feature" loading="lazy" />
```

### Fonts

Eviter Google Fonts (200-400 ms de latence DNS+TLS). Self-host :

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

Et preload uniquement la fonte critique :

```astro
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
```

### CSS critique

Astro inline le CSS critique par route **automatiquement**. Rien a faire.

### Resultat attendu

- Lighthouse Performance : 95-100
- LCP : < 1 s
- CLS : < 0.02
- Bundle JS : 0-15 KB

Source : [techsynth.tech/blog/astro-core-web-vitals](https://techsynth.tech/blog/astro-core-web-vitals/).

## Deploy

### Premiere fois

```bash
netlify login   # si pas deja fait
netlify init    # auto-detection Astro
# Choisir "Create & configure a new site"
# Connect to Git (recommande pour les deploy previews)

netlify deploy --prod
```

### Deploys suivants

Avec Git : auto sur push. PR = preview URL.

Sans Git : `netlify deploy --prod`.

## Pieges a eviter

| Piege | Symptome | Fix |
|-------|----------|-----|
| Adapter Netlify oublie pour SSR | Routes SSR cassees au deploy | `npx astro add netlify` et `output: 'server'` ou `output: 'hybrid'` |
| Astro 6 sur Node 18/20 | Build casse | Forcer `NODE_VERSION = "22"` (Astro 6 a drop Node 18 et 20) |
| Legacy content collections | Erreurs de build apres upgrade | Migrer vers Content Layer API (Astro 6) |
| `import.meta.env` pour secrets | Secrets bakes dans le bundle | Utiliser `process.env` dans les routes serveur, jamais `import.meta.env` pour des secrets |
| `client:load` partout | Bundle JS gonfle, perf perdue | Prefer `client:visible`, audit avec `astro check` |
| Self-host fonts oublies | LCP penalise par Google Fonts | Self-hosted + `font-display: swap` + preload de la fonte critique |

## Variables d'environnement

L'extension Netlify x Supabase injecte automatiquement :
- `SUPABASE_DATABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (cote serveur uniquement)
- `SUPABASE_ANON_KEY`

Pour Astro, les variables exposees au client doivent etre prefixees `PUBLIC_*` :
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

Detail : [05-supabase-integration.md](05-supabase-integration.md).

## Structure de projet recommandee

```
ma-landing/
├── netlify.toml
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   └── fonts/
│       └── inter-var.woff2
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   └── pricing.astro
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Pricing.astro
│   │   ├── FAQ.astro
│   │   └── ContactForm.tsx     # island React
│   ├── layouts/
│   │   └── Base.astro
│   ├── styles/
│   │   └── global.css
│   └── lib/
│       └── supabase.ts
└── supabase/
    └── functions/
        └── contact-form/
            └── index.ts
```

## Sources

- [Astro deploy Netlify](https://docs.astro.build/en/guides/deploy/netlify/)
- [Netlify Astro setup guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/astro/)
- [Astro 6 changelog Netlify](https://www.netlify.com/changelog/2026-03-10-astro-6/)
- [Astro Core Web Vitals techniques](https://techsynth.tech/blog/astro-core-web-vitals/)
