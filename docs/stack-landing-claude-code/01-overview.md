# 01 — Vue d'ensemble et imperatifs

## Le besoin

Creer des landing pages avec Claude Code, en respectant trois contraintes non negociables :

1. **Supabase** pour la base de donnees (Postgres + RLS)
2. **Supabase Edge Functions** pour la logique cote serveur (form handling, integrations tierces)
3. **Netlify** pour l'hebergement et le CI/CD (CLI deja installe)

Le reste du stack (framework frontend, CSS, outillage) est ouvert.

## Pourquoi cette stack tient la route en 2026

| Brique | Role | Pourquoi ce choix |
|--------|------|-------------------|
| **Netlify** | Hosting + CDN + Forms + Edge Functions | Auto-detection du framework, deploy preview par PR, integration Supabase officielle qui injecte les env vars |
| **Supabase** | DB + Auth + Edge Functions (Deno) | Postgres "vrai" (pas du NoSQL bricolage), Edge Functions globalement distribuees, integration native Netlify |
| **Frontend (Astro ou Vite)** | Rendu HTML + interactivite ciblee | Vite 7 sous le capot des deux → builds rapides, HMR instantane |
| **Tailwind CSS** | Design system | Bundle final < 15 KB, integration native Astro/Vite |
| **Claude Code** | Generation de code | Permet de scaffolder une landing complete en 1 session si CLAUDE.md est bien fait |

## La question Vite vs Astro

Tu as demande un exemple Vite. Voici le point cle :

> **Astro 6 utilise Vite 7 comme moteur de build.** Choisir Astro = choisir Vite + une couche d'optimisation specifique pour les sites de contenu (landings, blogs, docs).

Concretement, sur une landing 1-pager :

| Metrique | Vite pur (React) | Astro 6 |
|----------|------------------|---------|
| JS envoye au client par defaut | 80-120 KB (React runtime) | 0 KB |
| LCP median | 1.5-2.8 s | 0.7-1.2 s |
| Lighthouse Performance | 80-90 | 95-100 |
| Build time (8 pages) | ~8 s | ~3 s |
| Courbe d'apprentissage | Familier si React | Nouveau syntax (.astro), tres proche HTML |

Source : benchmarks [alexbobes.com/programming/astro-vs-nextjs](https://alexbobes.com/programming/astro-vs-nextjs/) et [techsynth.tech/blog/astro-core-web-vitals](https://techsynth.tech/blog/astro-core-web-vitals/), 2026.

**Verdict** : tu peux faire Vite pur, mais sur une landing, Astro divise par 10 le JS envoye au client sans effort. Pour une page dont l'objectif est de convertir vite, c'est le bon choix par defaut.

## Recommandation finale

```
Defaut : Astro 6 + Tailwind + Supabase + Netlify
        (cf. 04-setup-astro-netlify.md)

Cas Vite pur : si l'equipe veut rester sur React/Vue exclusivement,
              ou si la landing a beaucoup d'interactivite (calculateur,
              configurateur, dashboard public)
              (cf. 03-setup-vite-netlify.md)
```

Les deux setups sont detailles. Tu pourras choisir apres lecture.

## Pourquoi pas Next.js pour une landing ?

| Critere | Next.js | Landing typique |
|---------|---------|-----------------|
| Pages dynamiques avec auth | Fort | Pas necessaire (1-5 pages statiques) |
| React Server Components | Avantage si app | Surdimensionne pour une landing |
| Bundle JS minimum | 80 KB+ | Tue le LCP mobile |
| Vendor lock-in | Moyen (couple a Next) | Risque inutile |
| Build time | 2-3x plus lent qu'Astro | Frottement CI |

Next.js est excellent pour des **apps** (dashboard, marketplace). Pour une **landing**, c'est sortir l'artillerie lourde.

## Ce que Claude Code change dans ce setup

- **Init projet** : `claude` + un bon `CLAUDE.md` permet de scaffolder Astro/Vite + Supabase + Tailwind en 1 commande
- **Subagents** : un subagent dedie a la creation de sections de landing (hero, pricing, FAQ) avec contrats clairs
- **MCP servers** : MCP Supabase (deja configure dans ce projet), MCP Netlify et MCP Webflow disponibles
- **Verification** : Claude peut lancer Lighthouse en local et iterer jusqu'a Lighthouse 95+

Detail dans [06-claude-code-workflow.md](06-claude-code-workflow.md).

## Sources

- [Astro vs Next.js benchmarks 2026](https://alexbobes.com/programming/astro-vs-nextjs/) — chiffres LCP, bundle, build time
- [Astro Core Web Vitals techniques](https://techsynth.tech/blog/astro-core-web-vitals/) — patterns LCP < 1s
- [Astro 6 sur Netlify changelog](https://www.netlify.com/changelog/2026-03-10-astro-6/) — Astro 6 = Vite 7
- [Claude Code best practices](https://code.claude.com/docs/en/best-practices) — workflow officiel
