# Stack Decision Tree

> Le MVP du skill force Astro 6. Cette reference existe pour les cas ou l'utilisateur insiste pour Vite. A consulter SEULEMENT si question explicite "pourquoi Astro et pas Vite/Next".

## Arbre de decision

```
Le projet est une LANDING (1-5 pages, contenu majoritairement statique) ?
│
├── OUI (90% des cas)
│   │
│   ├── L'equipe a deja une lib de composants React/Vue maintenue ?
│   │   ├── OUI -> Astro avec islands React/Vue cibles (meilleur des deux mondes)
│   │   └── NON -> Astro pur (.astro partout) ← DEFAUT
│   │
│   └── La landing a un configurateur, calculateur, ou dashboard public ?
│       ├── OUI, +30% surface dynamique -> Vite + React + vite-react-ssg
│       └── NON, < 30% -> Astro
│
└── NON, c'est une APP (auth, dashboard, multi-pages dynamiques)
    └── Pas le bon skill. Suggerer Next.js ou Nuxt, hors scope init-landing-stack.
```

## Pourquoi Astro par defaut (chiffres 2026)

| Metrique | Astro 6 | Vite + React (SPA) | Next.js |
|----------|---------|--------------------|---------|
| Bundle JS par defaut | 0-15 KB | 80-120 KB | 80-120 KB |
| LCP median | 0.7-1.2 s | 1.5-2.8 s | 1.5-2.8 s |
| Lighthouse Perf | 95-100 | 80-90 | 80-90 |
| Build time (8 pages) | 3 s | 6 s | 8 s |
| Courbe apprentissage | nouvelle syntaxe `.astro` (proche HTML) | familier si React | familier si React |

Source : [docs/stack-landing-claude-code/02-comparatif-frameworks.md](../../../webflowlanding/docs/stack-landing-claude-code/02-comparatif-frameworks.md).

## Si l'utilisateur insiste pour Vite

Repondre :

> Astro utilise deja Vite 7 sous le capot. Choisir Astro = beneficier de Vite + des optimisations specifiques landing (0 JS par defaut, file-based routing, image optimization native).
>
> Si tu insistes pour Vite "nu" parce que ton equipe est React-only avec composants existants, on peut le faire mais il faut ABSOLUMENT vite-react-ssg sinon LCP catastrophique.
>
> Le MVP actuel force Astro. Pour Vite + React, le skill devra etre etendu (cf. roadmap V1.1).

Ne PAS dévier du MVP en cours.

## Frameworks exclus

| Framework | Pourquoi exclu |
|-----------|----------------|
| Next.js | Surdimensionne pour une landing, 80+ KB JS minimum, build 2-3x plus lent |
| Nuxt | Equivalent Next pour Vue, meme verdict |
| Eleventy | Pas d'integration Tailwind native, ecosysteme moins dynamique en 2026 |
| HTML pur | Pas de build = pas de Tailwind purge = bundle lourd, pas de design tokens |
| Webflow | Hors scope skill (no-code, pas de CLI/Claude Code workflow direct) |

## Lien avec d'autres skills

- Si le projet vient d'un site Webflow existant : `/extract-design-system` AVANT d'init pour aspirer les tokens.
- Si le client veut du no-code apres init : on n'init pas avec ce skill, on reste sur Webflow.
- Si la landing doit etre optimisee Google Ads : `/landing-google-ads` apres init.
- Si la landing doit etre optimisee Meta Ads : `/landing-meta-ads` apres init.
