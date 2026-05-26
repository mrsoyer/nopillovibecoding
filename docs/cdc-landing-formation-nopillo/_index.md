# CDC — Landing Formation Nopillo

> Landing page Webflow qui presente simplement les 3 formats de formation Nopillo (1j / 2j / 3j) avec le DS Nopillo deja extrait, applique selon les best practices conversion 2026, et construite via le Webflow MCP.

## Vision en 1 phrase

Convertir un visiteur curieux en lead qualifie pour la formation Nopillo en lui montrant en moins de 30 secondes : (1) ce qu'il va apprendre, (2) quel format choisir, (3) comment reserver.

## Stack detecte

| Layer | Technologie |
|---|---|
| CMS / Hosting | Webflow (workspace Nopillo, site dedie ou page sur site existant) |
| Outillage | Webflow MCP (Data API + Designer API + Bridge App) |
| Form / CRM | HubSpot Forms embed (si stack Nopillo) ou Webflow Forms native (fallback) |
| Tracking | GA4 + Meta Pixel (si Nopillo deja equipe) + Consent Mode V2 |
| Design System | DS Nopillo extrait (88 variables CSS, Futura PT, indigo #4033DB) |
| Code projet | Aucun (no-code 100% via MCP) |

## Phases d'execution

| Phase | Description | Taches | Effort | Parallelisable |
|---|---|---|---|---|
| **P0 — Setup & DS** | Site/page Webflow, import variables DS Nopillo | 4 | XS | 2 waves |
| **P1 — Composants** | Composants reutilisables (Hero, Card, Form, Footer) via Designer MCP | 5 | S | 1 wave parallele |
| **P2 — Contenu sections** | 7 sections de la landing (hero, methodo, 3 formats, social proof, FAQ, CTA, footer) | 7 | M | 1 wave parallele |
| **P3 — Form & Tracking** | Form connecte CRM, tracking conversions, SEO, schema.org | 4 | S | 1 wave |
| **P4 — QA & Publish** | Tests, Lighthouse, publish prod | 4 | XS | sequentiel |

**Total** : 24 taches reparties sur 5 phases, 5 waves d'execution paralleles.

## Index

| Fichier | Contenu |
|---|---|
| [01-specs.md](01-specs.md) | Specifications fonctionnelles : structure landing, contenu de chaque section, application du DS Nopillo |
| [02-taches.md](02-taches.md) | Decoupage des 24 taches : ID, executeur, dependances, livrable, priorite + diagramme waves |
| [sources.md](sources.md) | Documentation referencee + sources externes |

## Resume executif

**Public cible** : decideurs et freelances qui font des landings ads et veulent industrialiser via Claude Code + Webflow MCP.

**Promesse landing** : 3 formats clairs (950 € / 1 900 € / 2 850 € HT), 1 livrable concret par format, ROI sous 7 semaines.

**Structure landing** (8 sections, top-to-bottom) :
1. **Hero** — promesse + CTA principal "Reserver un brief 30 min"
2. **Probleme** — pain points actuels (production landings lente, pas industrialisee, pas de capitalisation)
3. **Solution / Methodologie** — pipeline `/doc-maker` → `/cdc-maker` → `/skill-maker` → MCP
4. **3 Formats** — cards comparatives (1j, 2j, 3j) avec recommandation visuelle 2j
5. **Etude de cas** — `cdc-landing-improvement` We Invest (etude de cas reelle)
6. **Social proof** — quotes + logos clients (a fournir par Nopillo) + KPIs (16 docs, 27k+ lignes capitalisees)
7. **FAQ** — 6-8 questions (financement, niveau requis, livrables, suivi, etc.)
8. **CTA final + Form** — form 5 champs, redirige vers Calendly pour brief

**Documentation referencee** :
- [docs/formation-nopillo/](../formation-nopillo/) — contenu des 3 formats
- [docs/landing-page-best-practices/](../landing-page-best-practices/) — structure, hero, CTA, social proof
- [docs/design-system-extraction/nopillo-extracted/](../design-system-extraction/nopillo-extracted/) — DS Nopillo (couleurs, typo, composants)
- [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) — outils MCP Webflow
- [docs/google-ads/03-landing-page-quality-score.md](../google-ads/03-landing-page-quality-score.md) — Quality Score

## Prochaine etape

Demarrer **Wave 1 — P0** : taches `0.1` (creation site/page Webflow) + `0.2` (import variables DS Nopillo) en parallele. Voir [02-taches.md](02-taches.md).
