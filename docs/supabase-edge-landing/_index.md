# Supabase Edge Functions pour landings personnalisees

> Documentation de reference pour l'agence Nopillo
> Date : mai 2026
> Audience : equipe Nopillo (chefs de projet, integrateurs, devs front)

---

## Pourquoi cette doc

Webflow couvre 80 % des besoins de landing page : design system visuel, CMS, formulaires, hosting. Mais des qu'on entre dans la **personnalisation serveur** (geo-IP, A/B test serveur, contenu dynamique selon UTM, push CRM en temps reel sans Zapier), Webflow montre ses limites.

Les **Supabase Edge Functions** sont une alternative ou un complement credible :
- TypeScript / Deno, deploye globalement en quelques secondes
- Free tier genereux (500 000 invocations / mois)
- Integration native avec Postgres, Auth, Storage
- Compatibilite npm (2 millions de modules)
- Deployable a cote de Netlify, Astro, Next.js

Cette doc cible deux usages chez Nopillo :
1. **Backend leger** pour landings hebergees ailleurs (Webflow, Framer, Astro, Netlify)
2. **Stack alternatif complet** : Astro + Tailwind + Netlify + Supabase Edge

---

## Sommaire

| # | Fichier | Sujet |
|---|---------|-------|
| 01 | [01-overview.md](./01-overview.md) | Supabase Edge en 2026, ecosysteme Deno, architecture |
| 02 | [02-setup-projet.md](./02-setup-projet.md) | `supabase init`, `functions new`, deploy CLI / Dashboard |
| 03 | [03-personalization-patterns.md](./03-personalization-patterns.md) | URL params, geo-IP, A/B test, segmentation audience |
| 04 | [04-integration-hubspot.md](./04-integration-hubspot.md) | Appeler HubSpot CRM depuis une Edge Function |
| 05 | [05-deploy-options.md](./05-deploy-options.md) | Supabase hosted, Netlify Edge, Vercel Edge - comparatif |
| 06 | [06-cost-latency.md](./06-cost-latency.md) | Benchmarks, free tier, cold starts, scaling |
| 07 | [07-quand-vs-webflow.md](./07-quand-vs-webflow.md) | Decision matrix Webflow vs Edge Functions |
| 08 | [08-stack-recommande-nopillo.md](./08-stack-recommande-nopillo.md) | Astro + Tailwind + Netlify + Supabase Edge |
| -- | [sources.md](./sources.md) | Toutes les sources web utilisees |

---

## TL;DR pour decideur

| Critere | Webflow seul | Webflow + Supabase Edge | Astro + Supabase Edge (full stack) |
|---------|--------------|-------------------------|-------------------------------------|
| Time to market | ++ | + | = |
| Personnalisation serveur | -- | + | ++ |
| Cout / mois (10k visites) | 23 EUR | 23 EUR + 0 EUR | ~0 EUR |
| Lock-in | Webflow | Webflow + Supabase | Supabase uniquement |
| Maintenance dev | Faible | Moyenne | Plus elevee |
| SEO / perf brute | Bon | Bon | Excellent |

**Recommandation Nopillo** : commencer avec Webflow + Edge Functions pour les clients pressed, basculer en stack Astro + Edge pour les clients qui veulent un site performant, lean et personnalise.

---

## Pre-requis

- Compte Supabase (gratuit) : https://supabase.com
- Supabase CLI : `npm install -g supabase` ou `brew install supabase/tap/supabase`
- Deno (optionnel pour dev local avance) : `brew install deno`
- Node 18+ pour les outils de build

---

## Conventions de cette doc

- Tous les exemples sont en **TypeScript / Deno** (runtime officiel des Edge Functions)
- Les chemins de fichiers utilisent la convention Supabase : `supabase/functions/<nom>/index.ts`
- Les variables d'env sont en MAJUSCULES (`SUPABASE_URL`, `HUBSPOT_TOKEN`, etc.)
- Les commandes CLI commencent par `$` pour clarte
