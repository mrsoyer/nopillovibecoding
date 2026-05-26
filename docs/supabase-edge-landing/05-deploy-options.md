# 05 - Options de deploiement et comparatif

> Trois facons de deployer du code edge en 2026. Chacune avec ses tradeoffs. Vue d'ensemble pour Nopillo.

---

## Option 1 : Supabase Edge Functions (hosted)

### Principe

Vous push du TypeScript / Deno via la CLI Supabase. Supabase bundle (ESZip), distribue sur son reseau global, expose une URL `https://<project>.supabase.co/functions/v1/<nom>`.

### Pour
- **Integration native Postgres** : pas de credentials externes, le client Supabase est pre-configure
- **Free tier** : 500k invocations/mois sans CB
- **Deno + npm** : 2M packages dispo, TypeScript first
- **Setup zero** : pas de compte Vercel/CF/Netlify a creer
- **Logs centralises** : Dashboard Supabase

### Contre
- Cold start 200-500 ms (plus que Cloudflare Workers ~5 ms)
- Pas d'IP egress statique (impossible de whitelist IP cote API tierce)
- Reseau moins dense que Cloudflare (mais en croissance)
- Limite de timeout 60 sec en Free, 150 sec en Pro

### Quand l'utiliser
- Le projet utilise deja Supabase (Postgres, Auth, Storage)
- Vous voulez un **un seul vendor** pour back + DB
- Latence pas ultra-critique (sub-300ms acceptable)

---

## Option 2 : Netlify Edge Functions

### Principe

Netlify deploie vos fonctions edge sur le reseau Deno Deploy (le meme que Supabase utilise en sous-jacent partiellement) + le reseau Netlify. Code en TypeScript / Deno.

### Avantages
- **Hosting + edge dans le meme dashboard** : vous deployez la landing Astro/Next + les fonctions edge en un seul `netlify deploy`
- **Geo headers natifs** : `x-nf-geo` injecte par Netlify
- **Integration Supabase officielle** : extension Netlify connecte automatiquement les env vars Supabase
- **Reseau global Netlify** : 100+ POPs

### Inconvenients
- Quotas plus stricts en Free (1M invocations vs 500k Supabase mais limite a 100h CPU)
- Pas de DB native (faut tout connecter ailleurs)
- Vendor lock-in modere (specifique aux conventions Netlify)

### Setup avec Supabase

1. Installer l'extension Supabase dans Netlify : **Extensions > Supabase > Install**
2. Connecter via OAuth votre projet Supabase
3. Selectionner le projet et le framework (Astro / Next / Vue)
4. Netlify injecte automatiquement :
   - `SUPABASE_DATABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_ANON_KEY`

Source : `docs.netlify.com/extend/install-and-use/setup-guides/supabase-integration/`.

### Quand l'utiliser
- La landing est hebergee sur Netlify
- Vous voulez **edge + hosting + supabase backend** sans 3 dashboards
- Pas besoin de IP statique

---

## Option 3 : Vercel Edge Functions

### Principe

Vercel run son edge sur Cloudflare Workers en sous-jacent. Code en TypeScript, runtime restreint (subset de Web APIs, pas tout Node).

### Avantages
- **DX excellente avec Next.js** : `export const runtime = 'edge'` dans une route
- **Geo headers** : `request.geo.country`, `request.geo.city` natifs
- **Reseau Cloudflare** : 330+ villes, < 50 ms de 95% des users

### Inconvenients
- **Vendor lock-in fort** : difficile de migrer hors Vercel/Next
- **Pas de filesystem npm complet** : seulement les modules compatibles edge
- **Tarif** : Free tier OK, mais Pro 20 USD/mois min (par membre d'equipe)
- **Pas de DB** : Postgres via Neon, KV via Upstash, etc. (chaque service a part)

### Quand l'utiliser
- Site full Next.js, deja sur Vercel
- Besoin de SSR + edge sur la meme route
- Pas envie de gerer un compte Supabase

---

## Comparatif synthetique

| Critere | Supabase Edge | Netlify Edge | Vercel Edge |
|---------|---------------|--------------|-------------|
| Runtime | Deno | Deno | V8 isolate (CF) |
| Cold start | 200-500 ms | 100-300 ms | 5-50 ms |
| Reseau | ~30 POPs | 100+ POPs | 330+ POPs (CF) |
| Free tier invocations | 500k/mois | 1M/mois | 1M/mois |
| Compat npm | Oui (npm:) | Oui (npm:) | Partielle (compat layer) |
| DB integree | Postgres natif | Non | Non |
| Geo headers natifs | Via x-forwarded-for | x-nf-geo | request.geo |
| IP egress statique | Non | Non | Non |
| CLI deploy | `supabase functions deploy` | `netlify deploy` | `vercel` |
| Versioning / rollback | Via CLI / Git | Oui (deploy preview) | Oui (deploy preview) |
| Pricing au-dela | 2 USD / 1M invoc | 25 USD/mois plan Pro | 20 USD/mois Pro |

---

## Hybride : Netlify hosting + Supabase Edge

Configuration la plus interessante pour Nopillo :

```
[Visiteur] 
    |
    v
[Netlify CDN] <- statique Astro / landing
    |
    | (fetch dans le composant)
    v
[Supabase Edge Function] <- personnalisation, lead capture
    |
    +-> Postgres (Supabase)
    +-> HubSpot API
    +-> Resend (email)
```

Pourquoi cette combo :
- **Netlify** excelle en hosting front statique (Astro, build rapide, deploy preview par PR)
- **Supabase** excelle en backend (DB + Edge dans un seul vendor)
- Couts maitrises : Netlify gratuit + Supabase 0 a 25 USD/mois selon trafic
- Pas de duplication backend

Inconvenient : 2 dashboards a gerer (Netlify pour le front, Supabase pour les fonctions et DB). L'integration officielle reduit la friction.

---

## Cas Webflow

Webflow ne sait PAS heberger d'Edge Function. Il faut donc OBLIGATOIREMENT externaliser :

```
[Visiteur sur Webflow] -> [JS custom code] -> fetch -> [Supabase Edge Function]
```

Tous les exemples de la doc supposent ce pattern. Webflow reste le CMS, Supabase Edge fait le travail backend (lead capture, personnalisation, etc.).

---

## Decision tree

```
Besoin d'une fonction edge ?
|
+- Le projet utilise deja Supabase ?
|     OUI -> Supabase Edge Functions
|     NON -> question suivante
|
+- Le hosting est sur Vercel + Next.js ?
|     OUI -> Vercel Edge (route segment edge)
|     NON -> question suivante
|
+- Le hosting est sur Netlify ?
|     OUI -> Netlify Edge Functions OU Supabase Edge (selon besoin DB)
|     NON -> question suivante
|
+- C'est Webflow / Framer / Squarespace ?
      OUI -> Supabase Edge Functions (seule option viable)
```

---

## Recommandation finale Nopillo

Pour **90% des cas client**, choisir **Supabase Edge Functions**, peu importe le hosting de la landing :
- Cohabite avec n'importe quel hosting (Webflow, Astro/Netlify, Next/Vercel)
- Backend complet (DB + auth + storage + edge) chez un seul vendor
- Free tier suffit pour la plupart des landings
- TypeScript / Deno = code propre et moderne

Reserver Vercel Edge aux projets **Next.js full-stack** et Netlify Edge aux projets **Astro hosting Netlify avec besoin minimal de DB**.

---

## Sources

- [Supabase Integration Guide Netlify](https://docs.netlify.com/extend/install-and-use/setup-guides/supabase-integration/) — extension auto, env vars
- [Supabase vs Cloudflare 2026](https://www.buildmvpfast.com/compare/supabase-vs-cloudflare) — comparatif reseau et runtime
- [Cloudflare Workers vs Vercel 2026](https://www.morphllm.com/comparisons/cloudflare-workers-vs-vercel) — cold start, lock-in
- [Vercel vs Supabase 2026 (UI Bakery)](https://uibakery.io/blog/vercel-vs-supabase) — pricing, DX
- [Querying Supabase from Netlify Edge](https://www.netlify.com/blog/querying-supabase-from-the-edge-with-polyscale/) — pattern hybride
- [sources.md](./sources.md) — index complet des references
