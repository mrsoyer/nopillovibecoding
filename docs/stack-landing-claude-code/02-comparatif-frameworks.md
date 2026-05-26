# 02 — Comparatif Vite vs Astro vs Next.js pour landing pages

## Sommaire

- [Vite vs Astro : la confusion classique](#vite-vs-astro-la-confusion-classique)
- [Benchmarks chiffres 2026](#benchmarks-chiffres-2026)
- [Arbre de decision](#arbre-de-decision)
- [Cas concrets](#cas-concrets)

## Vite vs Astro : la confusion classique

Beaucoup de devs hesitent entre "Vite" et "Astro". La realite :

> **Vite est un build tool, pas un framework.** Astro EST un framework qui utilise Vite comme build tool. Donc tu compares en fait "Vite + un framework React/Vue/Svelte" vs "Astro + Vite integre".

| Concept | Vite | Astro 6 |
|---------|------|---------|
| Type | Build tool / dev server | Framework de site statique |
| Sortie par defaut | SPA (HTML vide + JS qui hydrate) | HTML pre-rendu pour chaque page |
| JS au client | Tout le framework (~80 KB pour React) | 0 KB sauf composants explicitement hydrates |
| Architecture | Single-Page Application | Multi-Page Application + Islands |
| Routing | Manuel ou via React Router / Vue Router | File-based (`src/pages/`) |
| Build engine | Vite | Vite (7 dans Astro 6) |

Source : [docs Vite static deploy](https://vite.dev/guide/static-deploy), [docs Astro deploy Netlify](https://docs.astro.build/en/guides/deploy/netlify/).

## Benchmarks chiffres 2026

Tous les chiffres proviennent de [alexbobes.com/programming/astro-vs-nextjs](https://alexbobes.com/programming/astro-vs-nextjs/) (avril 2026, benchmarks reproductibles).

### Taille de bundle

| Framework | Bundle JS par defaut | Reduction vs Next.js |
|-----------|---------------------|---------------------|
| **Astro 6** | 0-15 KB | -96 % |
| **Vite + React** | 80-120 KB | reference |
| **Next.js** | 80-120 KB | reference |

Une landing typique Astro envoie **0 KB de JS** si elle n'a pas de composant interactif (le hero, le footer, les sections statiques n'embarquent rien).

### Core Web Vitals

| Metrique | Astro 6 | Next.js 15 | Cible Google |
|----------|---------|------------|--------------|
| **LCP** (Largest Contentful Paint) | 0.7-1.2 s | 1.5-2.8 s | < 2.5 s |
| **CLS** (Cumulative Layout Shift) | 0.001-0.02 | 0.03-0.08 | < 0.1 |
| **INP** (Interaction to Next Paint) | < 50 ms | 50-200 ms | < 200 ms |
| **Lighthouse Performance** | 95-100 | 80-90 (SSR) | viser 90+ |

Cas reel cite : migration Next.js → Astro d'une landing, Lighthouse passe de 62 a 98 (+58 %), FCP de 2.8 s a 0.6 s (-79 %).

### Build time

| Nombre de pages | Astro 6 | Next.js 15 |
|-----------------|---------|------------|
| 8 pages | 3 s | 8 s |
| 40 pages | 12 s | 19 s |
| 1000 pages | 18 s | 52 s |

Pour le CI Netlify, c'est de la latence en moins a chaque PR.

## Arbre de decision

```
Landing 1-5 pages, contenu majoritairement statique ?
└── OUI → Astro 6 (defaut)

Landing avec calculateur, configurateur, dashboard public interactif ?
├── L'equipe maitrise React → Vite + React + vite-react-ssg
└── L'equipe est ouverte → Astro + island React/Vue cible

Application avec auth, dashboard utilisateur, donnees temps reel ?
└── Next.js ou Nuxt (mais ce n'est plus une landing)

Site statique tres simple, 1 fichier HTML ?
└── HTML pur + Tailwind CDN (overkill non necessaire)
```

## Cas concrets

### Cas 1 — Landing produit SaaS classique

**Contenu** : hero, features, social proof, pricing, FAQ, footer, formulaire de contact.

**Choix** : **Astro 6**. Aucun JS au client sauf l'accordion FAQ (`client:visible`) et le formulaire (`client:load`). LCP < 1s garanti, Lighthouse 100/100 atteignable.

### Cas 2 — Landing avec configurateur interactif

**Contenu** : hero, configurateur produit (slider, calcul prix temps reel), formulaire devis.

**Choix possible 1** : **Astro + island React** pour le configurateur (`client:visible`), reste en .astro statique. Meilleur des deux mondes.

**Choix possible 2** : **Vite + React + vite-react-ssg**. Plus naturel si l'equipe ne veut qu'une seule techno (React partout). On perd le 0 JS sur les zones statiques, mais on garde le SSG et un seul mental model.

### Cas 3 — Multi-landings clients (agence)

**Contenu** : 1 design system, N landings clients avec contenus differents.

**Choix** : **Astro 6** avec tokens design dans Tailwind config par client. Le 0 JS est crucial parce que chaque client a ses propres metriques de conversion et la perf joue directement sur le revenu.

### Cas 4 — Landing connectee a un MCP (Webflow, HubSpot)

**Contenu** : landing avec form qui pousse dans HubSpot via Edge Function, design extrait d'un site existant via MCP Webflow.

**Choix** : **Astro 6**. Le workflow Claude Code (cf. [06-claude-code-workflow.md](06-claude-code-workflow.md)) est tres a l'aise avec Astro grace au file-based routing qui matche bien le mental model "1 section = 1 composant".

## Si tu veux quand meme Vite "nu"

Cas valides :
- L'equipe a deja une bibliotheque de composants React/Vue reutilisable
- La landing est tres interactive (>30 % de surface dynamique)
- Tu veux un mental model unique React partout

Setup recommande : Vite + React + **vite-react-ssg** ([Daydreamer-riri/vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg)) ou Vue + **vite-ssg** ([antfu-collective/vite-ssg](https://github.com/antfu-collective/vite-ssg)) pour pre-rendre les pages au build et ne pas penaliser le LCP.

Sans SSG, Vite + React = SPA classique = HTML vide + JS qui hydrate = LCP catastrophique sur mobile. **A eviter pour une landing.**

Detail du setup : [03-setup-vite-netlify.md](03-setup-vite-netlify.md).

## Synthese

| Critere | Vite + React (SPA) | Vite + React + SSG | Astro 6 | Next.js |
|---------|--------------------|--------------------|---------|---------|
| Defaut zero JS | Non | Non | **Oui** | Non |
| File-based routing | Non | Partiel | **Oui** | Oui |
| Image optimization native | Non | Non | **Oui** | Oui |
| Build pour 8 pages | 5 s | 6 s | **3 s** | 8 s |
| Recommande pour landings | Non | Oui (si React-only) | **Oui (defaut)** | Non (overkill) |

## Sources

- [Astro vs Next.js benchmarks](https://alexbobes.com/programming/astro-vs-nextjs/)
- [Astro Core Web Vitals techniques](https://techsynth.tech/blog/astro-core-web-vitals/)
- [Cipher Projects — Next.js vs Astro 2026](https://cipherprojects.com/blog/posts/nextjs-vs-astro-which-one-fits-your-project/)
- [Astro 6 on Netlify changelog](https://www.netlify.com/changelog/2026-03-10-astro-6/)
- [vite-ssg repo (Antfu)](https://github.com/antfu-collective/vite-ssg)
- [vite-react-ssg repo](https://github.com/Daydreamer-riri/vite-react-ssg)
