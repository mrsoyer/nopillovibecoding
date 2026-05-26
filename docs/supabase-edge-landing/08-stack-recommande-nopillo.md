# 08 - Stack recommande Nopillo : Astro + Tailwind + Netlify + Supabase Edge

> La stack code "moderne" alternative a Webflow pour les projets ou la performance, le code-source maitrise et la personnalisation comptent.

---

## La stack en une image

```
                    +-------------+
                    |  Visiteur   |
                    +------+------+
                           |
                           v
              +------------+-----------+
              |   Netlify CDN (POP)     |
              |  Astro statique HTML    |
              +------------+-----------+
                           |
              fetch context (SSR ou client)
                           v
              +------------+----------+
              | Supabase Edge Function |
              |  (Deno / TypeScript)   |
              +-+-----+-----+-----+----+
                |     |     |     |
                v     v     v     v
            +-----+ +---+ +---+ +-----+
            | DB  | |CRM| |IA | |Email|
            |Pg   | |HS | |OAI| |Resnd|
            +-----+ +---+ +---+ +-----+
```

---

## Pourquoi cette combinaison

| Brique | Atouts |
|--------|--------|
| **Astro** | HTML statique zero-JS pour les pages marketing, Lighthouse 95-100, composants React/Vue/Svelte au choix, MDX natif, SSR optionnel par route, deployable partout |
| **Tailwind CSS** | Design system coherent, bundle minuscule (purge auto), shadcn/ui et Tailwind UI compatibles |
| **Netlify** | Deploy preview par PR, build auto Git, CDN global, Edge Functions disponibles, free tier 100 GB/mois, domaines/SSL/redirects 1 clic |
| **Supabase Edge** | 500k invocations/mois free, Postgres + Auth + Storage + Realtime + Edge integres, TypeScript/Deno, open source vendor-independant (voir chapitres 01-06) |

---

## Setup complet pas-a-pas

### Pre-requis
- Node 18+, comptes GitHub / Netlify / Supabase (free)
- CLIs : `npm i -g supabase netlify-cli`

### Etape 1 : Init Astro

```bash
$ npm create astro@latest nopillo-landing
# Empty project, TypeScript Strict, install deps : yes
$ cd nopillo-landing
$ npx astro add tailwind
$ npx astro add netlify   # adapter Netlify pour SSR
```

`astro.config.mjs` :

```js
import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import netlify from "@astrojs/netlify"

export default defineConfig({
  output: "hybrid",            // statique par defaut, SSR sur certaines routes
  adapter: netlify(),
  integrations: [tailwind()],
})
```

### Etape 2 : Init Supabase

```bash
$ supabase init
$ supabase functions new context
```

Definir `supabase/functions/context/index.ts` (voir [03-personalization-patterns.md](./03-personalization-patterns.md) pour le code complet).

### Etape 3 : Page Astro avec personnalisation SSR

`src/pages/index.astro` :

```astro
---
export const prerender = false   // SSR sur cette route

const SUPABASE_URL = import.meta.env.SUPABASE_URL
const SUPABASE_ANON = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Recup du context cote serveur (zero flash)
let context = { variant: "A", utm: {}, geo: { country: "FR" } }
try {
  const r = await fetch(`${SUPABASE_URL}/functions/v1/context`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON,
      "Content-Type": "application/json",
      "x-forwarded-for": Astro.clientAddress,
    },
    body: JSON.stringify({
      url: Astro.url.toString(),
      utm: Object.fromEntries(Astro.url.searchParams),
    }),
  })
  if (r.ok) context = await r.json()
} catch (e) { console.error("Context fetch failed", e) }

const hero = context.variant === "A"
  ? "Construisez votre site en 7 jours"
  : "Demarrez votre projet web maintenant"
---

<html lang="fr">
  <head><title>Nopillo - {hero}</title></head>
  <body class="bg-white text-gray-900">
    <main class="container mx-auto py-20">
      <h1 class="text-5xl font-bold">{hero}</h1>
      <p class="mt-4 text-xl">Pour {context.geo.country}, source: {context.utm.utm_source ?? "direct"}</p>
      <form method="POST" action="/api/lead" class="mt-10 max-w-md space-y-4">
        <input name="email" type="email" required class="w-full p-3 border rounded" placeholder="votre@email.com" />
        <input name="message" type="text" class="w-full p-3 border rounded" placeholder="Votre projet" />
        <button class="bg-black text-white px-6 py-3 rounded">Envoyer</button>
      </form>
    </main>
  </body>
</html>
```

### Etape 4 : API route Astro qui forward vers Edge Function

`src/pages/api/lead.ts` :

```ts
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData()
  const payload = Object.fromEntries(formData)
  const SUPABASE_URL = import.meta.env.SUPABASE_URL
  const SUPABASE_ANON = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

  const r = await fetch(`${SUPABASE_URL}/functions/v1/lead-capture`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!r.ok) return new Response("Error", { status: 500 })
  return Response.redirect(new URL("/merci", request.url), 303)
}
```

### Etape 5 : Variables d'env

`.env` (gitignore) :
```
SUPABASE_URL=https://xxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJh...
```

Sur Netlify (via integration Supabase) : injection automatique des memes variables.

### Etape 6 : Deploy

```bash
$ netlify init   # lier au repo Git, build cmd: npm run build, publish dir: dist
$ git push origin main
# Site live en 30 sec via Netlify

$ supabase login && supabase link --project-ref <ref>
$ supabase secrets set HUBSPOT_TOKEN=pat-na1-xxx
$ supabase functions deploy
```

---

## Performance attendue

Sur une landing Astro statique + 1 fetch SSR Edge Function :

| Metric | Valeur attendue | Webflow typique |
|--------|-----------------|-----------------|
| LCP | < 1.5 sec | ~ 1.8 sec |
| FCP | < 0.8 sec | ~ 1.0 sec |
| CLS | 0 | varie |
| TTFB | 200-400 ms (incluant edge call) | 100-300 ms |
| Lighthouse Perf | 95-100 | 80-90 |
| Lighthouse SEO | 95-100 | 85-95 |

---

## Avantages / inconvenients

| Avantages Nopillo | Inconvenients a assumer |
|-------------------|-------------------------|
| Maitrise totale du code (pas de plateforme proprio) | Time to market plus long (1 sem vs 2-3 jours Webflow simple) |
| Performance brute superieure a Webflow | Pas d'editeur visuel client integre (CMS) |
| Cout : free tier couvre 90% des cas | Maintenance dev requise pour modifs profondes |
| Reutilisabilite : composants Astro/Tailwind partages | |
| Stack standard du marche : recrutement facile | |
| Migration future : Astro tourne partout (Netlify, Vercel, Cloudflare, self-hosted) | |

**Solutions CMS** : Markdown/MDX dans le repo (edit via PR ou tinacms.io), CMS headless (Sanity, Strapi, Directus), ou tables Supabase + mini-UI admin.

---

## Quand basculer un client de Webflow vers cette stack

Signaux declencheurs :
- Le client paie deja Memberstack, Zapier, Wized = 100+ USD/mois en plug-ins
- Performance Lighthouse < 80 alors que c'est un point critique business
- Besoin d'A/B test ou personnalisation poussee
- Vision future "on veut une app, pas juste un site"
- Volume de pages CMS depasse les limites Webflow Business

---

## Modele commercial Nopillo possible

| Poste | Fourchette |
|-------|-----------|
| Forfait creation | 5-15 k EUR selon scope (vs 3-8k Webflow seul) |
| Forfait maintenance | 200-500 EUR/mois (deploys, contenu, evolutions) |
| Hosting (refacture) | ~ 25-100 USD/mois (Pro Supabase + Netlify Pro), inclus en marge |

ROI : la maitrise de la stack permet de revendre plus haut et d'eviter les frais Webflow par site (~ 90 USD/an pour le hosting seul).

---

## Check-list de demarrage projet (Nopillo)

- [ ] Brief client : besoins integrations (CRM, paiement, IA, multi-pays) ?
- [ ] Choix stack : Webflow seul / Webflow + Edge / Astro + Edge ?
- [ ] Si Astro : init repo, Tailwind, Netlify
- [ ] Init Supabase project, link CLI
- [ ] Definir les Edge Functions necessaires (context, lead-capture, webhook)
- [ ] Connecter HubSpot via Private App + secret Supabase
- [ ] Deploy preview Netlify pour valider client
- [ ] Brancher analytics (Plausible / Umami sans cookies)
- [ ] Definir les A/B tests + tracking variants en Postgres
- [ ] Documentation interne du repo (README + ce dossier)

---

## Sources

- [Astro + Supabase Backend Guide](https://docs.astro.build/en/guides/backend/supabase/) — integration officielle
- [Supabase Integration Guide Netlify](https://docs.netlify.com/extend/install-and-use/setup-guides/supabase-integration/) — extension Netlify
- [MakersDen - Next.js vs Astro 2025](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website) — perf marketing site
- [Code with Andrea - Modern course platform](https://codewithandrea.com/articles/how-i-built-a-modern-course-platform-in-2024) — retour stack Astro/Supabase
- [Hono + Supabase Edge Functions](https://hono.dev/docs/getting-started/supabase-functions) — pattern Hono + Edge
- [sources.md](./sources.md) — index complet des references
