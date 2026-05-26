# Stack Landing Pages avec Claude Code — Documentation Reference

> Stack technique recommandee pour creer des landing pages avec Claude Code, Supabase (DB + Edge Functions) et Netlify, avec comparatif Vite / Astro / Next.js et exemples concrets.

## Reponse rapide

**Stack recommandee** : **Astro 6 + Tailwind + Supabase + Netlify** (Astro tourne sur Vite 7 sous le capot, donc tu beneficies de Vite ET d'une optimisation specifique landing pages).

**Si tu veux Vite "nu" (sans Astro)** : Vite + React/Vue + vite-ssg + Tailwind. Valable pour landings tres custom ou si l'equipe est deja React-only, mais tu perds 60-80 % du JS gratuit que t'offre Astro.

## Sommaire

| Fichier | Contenu |
|---------|---------|
| [01-overview.md](01-overview.md) | Vue d'ensemble + imperatifs + recommandation rapide chiffree |
| [02-comparatif-frameworks.md](02-comparatif-frameworks.md) | Vite vs Astro vs Next.js — benchmarks 2026, quand choisir quoi |
| [03-setup-vite-netlify.md](03-setup-vite-netlify.md) | Setup concret Vite + Tailwind + Netlify (deploy step-by-step) |
| [04-setup-astro-netlify.md](04-setup-astro-netlify.md) | Setup concret Astro 6 + Tailwind + Netlify (alternative recommandee) |
| [05-supabase-integration.md](05-supabase-integration.md) | Supabase DB + Edge Functions + integration Netlify (extension officielle) |
| [06-claude-code-workflow.md](06-claude-code-workflow.md) | Workflow Claude Code pour developper une landing de bout en bout |
| [07-conversion-checklist.md](07-conversion-checklist.md) | Optimisation conversion + checklist de mise en production |
| [sources.md](sources.md) | Toutes les sources consultees |

## Decision en 30 secondes

```
Tu veux une landing performante (LCP < 1s, Lighthouse 95+) ?
├── OUI → Astro 6 (sous le capot c'est Vite 7) → 04-setup-astro-netlify.md
└── OUI mais l'equipe est React-only et veut pas apprendre Astro ?
    └── Vite + React + vite-react-ssg → 03-setup-vite-netlify.md

Tu as besoin d'un dashboard / app complexe avec auth + temps reel ?
└── Tu ne veux pas une landing, tu veux une app → Next.js (hors scope)
```

Sources : 12 pages web consultees le 2026-05-26 (doc officielle Astro, Vite, Netlify, Supabase, Claude Code + benchmarks tiers).
