# CDC — Amelioration Landing `afterwork-test-mcp`

> Refonte structurelle d'une landing We Invest France (recrutement agents/mandataires immobiliers) generee via Webflow MCP. Score actuel **4.1/10** — rework prioritaire pour atteindre le standard du portfolio existant et les benchmarks 2026.

## Stack detecte

| Layer | Technologie |
|---|---|
| CMS / Hosting | Webflow (site `661e4810af50b7e4bc1e15b7`) |
| Domaine prod | `lp.weinvest.fr` |
| Domaine staging | `we-invest-france-version-test.webflow.io` |
| Outillage | Webflow MCP (HTTP, OAuth, Bridge App actif) |
| Code projet | Aucun (Webflow no-code, automation 100% via MCP) |

## Probleme

La landing genere a partir de l'assemblage des composants existants presente **5 defauts critiques bloquant la conversion** :

1. **Aucune Hero section** (composant inexistant dans le DS)
2. **Aucun formulaire de capture lead** (uniquement newsletter au footer)
3. **Aucune preuve sociale** (testimonials, KPI chiffres)
4. **CTAs casses** (tous pointent vers `#`)
5. **Pas de tracking** (GA4, Meta Pixel, LinkedIn absents)

Score audit actuel vs landing reference `afterwork-cannes` :

| Critere | Actuelle | Reference | Cible |
|---|---|---|---|
| Conversion | 2/10 | 7/10 | 9/10 |
| Confiance | 2/10 | 6/10 | 9/10 |
| SEO | 4/10 | 5/10 | 9/10 |
| Performance | 5/10 | 5/10 | 9/10 |
| Accessibilite | 5/10 | 5/10 | 8/10 |

## Objectifs mesurables

| KPI | Baseline | Cible | Echeance |
|---|---|---|---|
| Taux conversion (form complete) | 0% (form absent) | >= 8% (top quartile B2B) | J+30 post-prod |
| LCP mobile | non mesure | < 2.5s | J+14 |
| CLS | non mesure | < 0.1 | J+14 |
| INP | non mesure | < 200ms | J+14 |
| Score Lighthouse Mobile | non mesure | >= 85 | J+14 |
| Conformite WCAG | partielle | AA | J+21 |

## Phases d'execution

| Phase | Description | Taches | Effort | Parallelisable |
|---|---|---|---|---|
| **P0 — Fondations** | Hero + Form + CTAs fonctionnels | 8 | M | 3 waves |
| **P1 — Confiance** | Social proof, FAQ, schema.org | 6 | M | 2 waves |
| **P2 — Performance** | LCP/CLS/INP, lazy load, accessibility | 7 | S | 1 wave |
| **P3 — Mesure** | Analytics, A/B test infra, tracking | 5 | S | 1 wave |
| **P4 — Production** | Validation, redirects, publish prod | 4 | XS | sequentiel |

**Total** : 30 taches reparties sur 5 phases, 7 waves d'execution.

## Index

| Fichier | Contenu |
|---|---|
| [01-specs.md](01-specs.md) | Specifications fonctionnelles & techniques par section |
| [02-taches.md](02-taches.md) | Decoupage taches + executeurs MCP + dependances |
| [sources.md](sources.md) | Audit source, references, recherches |

## Documentation referencee

- [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) — Reference complete des 18 categories d'outils MCP Webflow utilisables
- Site reference de comparaison : `afterwork-cannes` (live `lp.weinvest.fr/afterwork-cannes`)

## Prochaine etape recommandee

Demarrer **Wave 1 — P0** : taches `1.1` (creer Hero component) + `1.2` (CTAs URLs reelles) + `1.3` (form capture lead) en parallele. Voir [02-taches.md](02-taches.md).
