# 02 — Taches & Dependances

## Table des Matieres

1. [Vue d'ensemble](#vue-densemble)
2. [Convention executeurs](#convention-executeurs)
3. [Phases & taches](#phases--taches)
4. [Diagramme de dependances](#diagramme-de-dependances)
5. [Waves d'execution](#waves-dexecution)
6. [Chemin critique](#chemin-critique)

## Vue d'ensemble

**24 taches** reparties en **5 phases** et **5 waves d'execution**.

**Effort total estime** : 1 a 2 journees de production avec Claude + Webflow MCP (sans le contenu redactionnel client qui est externe).

**Hypothese** : DS Nopillo deja extrait (DONE), Webflow workspace accessible, Bridge App active.

## Convention executeurs

| Code | Detail |
|---|---|
| `MCP-DATA` | Webflow MCP famille Data API (Sites/Pages/CMS/Scripts/Webhooks) — pas de Bridge App requis |
| `MCP-DESIGN` | Webflow MCP famille Designer API (Elements/Styles/Variables/Components) — Bridge App requis |
| `SKILL` | Skill Claude Code custom du projet (`/apply-nopillo-ds`, `/connect-hubspot-form`, `/landing-google-ads`) |
| `CLAUDE` | Prompt Claude Code direct sans MCP (texte, copywriting, validation) |
| `MANUEL` | Action humaine (validation client, screenshots, recolte quotes) |

## Phases & taches

### Phase 0 — Setup & Design System (Wave 1)

| ID | Tache | Executeur | Deps | Livrable | Priorite |
|---|---|---|---|---|---|
| 0.1 | Creer page `landing-formation` dans le site Webflow Nopillo | MCP-DATA | — | URL page draft accessible | P0 |
| 0.2 | Importer variables couleurs DS Nopillo (depuis `tokens.css` extrait) | MCP-DESIGN | — | 88 variables visibles dans Webflow Variables | P0 |
| 0.3 | Importer variables typo (Futura PT + Splinesans) | MCP-DESIGN | — | Typo Variables Webflow disponibles | P0 |
| 0.4 | Configurer Container, Spacing, Radius variables | MCP-DESIGN | — | Tokens spacing/radius accessibles | P0 |

### Phase 1 — Composants reutilisables (Wave 2)

Toutes parallelisables apres Phase 0.

| ID | Tache | Executeur | Deps | Livrable | Priorite |
|---|---|---|---|---|---|
| 1.1 | Creer composant `Section Wrapper` (container 1120px, padding 96/64) | MCP-DESIGN | 0.2-0.4 | Composant reutilisable Webflow | P0 |
| 1.2 | Creer composant `Card Format` (card translucide + shadow signature) | MCP-DESIGN | 0.2-0.4 | Composant `card-format` | P0 |
| 1.3 | Creer composant `Pill Button` (primary, secondary, outline) | MCP-DESIGN | 0.2-0.4 | 3 variantes boutons | P0 |
| 1.4 | Creer composant `Pain Card` (icone + heading + sub) | MCP-DESIGN | 0.2-0.4 | Composant `pain-card` | P1 |
| 1.5 | Creer composant `FAQ Item` (collapsible) | MCP-DESIGN | 0.2-0.4 | Composant `faq-item` interactif | P1 |

### Phase 2 — Sections content (Wave 3)

Toutes parallelisables apres Phase 1. Chaque tache produit 1 section visible sur la page.

| ID | Tache | Executeur | Deps | Livrable | Priorite |
|---|---|---|---|---|---|
| 2.1 | **Section Hero** : H1 + sub + 2 CTAs + visuel + trust badge | MCP-DESIGN + SKILL `/apply-nopillo-ds` | 1.1, 1.3 | Section Hero rendue, A/B variantes texte preparees | P0 |
| 2.2 | **Section Probleme** : 3 Pain Cards | MCP-DESIGN | 1.1, 1.4 | Section Probleme rendue avec 3 cards | P0 |
| 2.3 | **Section Methodologie** : pipeline 4 etapes (icones + texte) | MCP-DESIGN | 1.1 | Section Methodo rendue | P0 |
| 2.4 | **Section 3 Formats** : 3 Card Format (1j / 2j highlight / 3j) | MCP-DESIGN | 1.1, 1.2, 1.3 | Section 3 formats rendue, badge "Recommande" sur 2j | P0 |
| 2.5 | **Section Etude de cas** : avant/apres We Invest | MCP-DESIGN | 1.1 | Section etude de cas avec metrics | P1 |
| 2.6 | **Section Social Proof** : KPIs methode + 3 quotes placeholders + logos | MCP-DESIGN | 1.1 | Section social proof rendue | P1 |
| 2.7 | **Section FAQ** : 8 FAQ Items | MCP-DESIGN | 1.1, 1.5 | Section FAQ avec 8 questions interactives | P1 |
| 2.8 | **Section CTA final + Form** | MCP-DESIGN + SKILL `/connect-hubspot-form` | 1.1, 1.3, 3.1 | Section CTA + form 5 champs visible | P0 |

### Phase 3 — Form, Tracking, SEO (Wave 4)

| ID | Tache | Executeur | Deps | Livrable | Priorite |
|---|---|---|---|---|---|
| 3.1 | Configurer form (HubSpot embed OU Webflow Forms native — selon brief Nopillo) | SKILL `/connect-hubspot-form` ou MCP-DATA | — | Form genere, IDs HubSpot/Webflow connus | P0 |
| 3.2 | Injecter scripts tracking (GA4 + Pixel + Consent V2) via Webflow MCP Scripts | MCP-DATA | 0.1 | 3 scripts inline registered + applied to page | P0 |
| 3.3 | Configurer SEO meta : title, description, OG image (1200x630), schema.org Course | MCP-DATA | 0.1 | Page settings remplies, OG visible dans share preview | P0 |
| 3.4 | Page `/merci` post-submit avec event conversion + lien Calendly | MCP-DATA | 3.1 | URL `/merci` accessible, conversion tracked | P0 |

### Phase 4 — QA & Publish (Wave 5)

Sequentiel. Aucune tache parallelisable car chaque depend de la precedente.

| ID | Tache | Executeur | Deps | Livrable | Priorite |
|---|---|---|---|---|---|
| 4.1 | Audit visuel desktop + mobile (320 / 768 / 1440), screenshots | CLAUDE + MANUEL | toutes 2.x | Checklist OK + screenshots dans `docs/cdc-landing-formation-nopillo/screenshots/` | P0 |
| 4.2 | Test form submission complet (form → CRM → /merci → conversion GA4) | MANUEL | 3.1, 3.2, 3.4 | 1 contact test cree dans HubSpot + event GA4 verifie | P0 |
| 4.3 | Audit Lighthouse (LCP < 2s mobile, CLS < 0.1, INP < 200ms, score >= 85) | MANUEL ou MCP-DATA | toutes 2.x, 3.x | Rapport Lighthouse joint, scores valides | P0 |
| 4.4 | Publish prod (staging d'abord, puis domaine custom) | MCP-DATA | 4.1, 4.2, 4.3 | URL prod live, sitemap soumis | P0 |

## Diagramme de dependances

```
WAVE 1 — Setup (parallele)
[0.1 Page] [0.2 Couleurs] [0.3 Typo] [0.4 Spacing/Radius]
        |        |             |             |
        +--------+-------------+-------------+
                            |
WAVE 2 — Composants (parallele apres Wave 1)
[1.1 Section] [1.2 Card]  [1.3 Button] [1.4 Pain]  [1.5 FAQ]
        |          |          |          |          |
        +----------+----------+----------+----------+
                            |
WAVE 3 — Sections content (parallele apres Wave 2)
[2.1 Hero] [2.2 Pain] [2.3 Methodo] [2.4 Formats] [2.5 Cas] [2.6 Proof] [2.7 FAQ]
                                                                                |
                              [3.1 Form]------------+                          |
                                       |             |                          |
                                       v             |                          |
                                   [2.8 CTA+Form] <--+                          |
                                       |                                        |
        +------------------------------+----------------------------------------+
        |
WAVE 4 — Tracking, SEO, /merci (parallele de 2.x)
[3.2 Tracking] [3.3 SEO] [3.4 /merci]
                            |
WAVE 5 — QA & Publish (sequentiel)
[4.1 QA visuel] -> [4.2 Test form] -> [4.3 Lighthouse] -> [4.4 Publish]
```

## Waves d'execution

| Wave | Taches | Mode | Effort |
|---|---|---|---|
| **Wave 1** | 0.1, 0.2, 0.3, 0.4 | Parallele (4 simultane) | 30 min |
| **Wave 2** | 1.1, 1.2, 1.3, 1.4, 1.5 | Parallele (5 simultane) | 1h |
| **Wave 3** | 2.1 a 2.7 + 3.1 + 2.8 (qui depend de 3.1) | Parallele (8 simultane) puis 2.8 | 2-3h |
| **Wave 4** | 3.2, 3.3, 3.4 | Parallele (3 simultane) | 30 min |
| **Wave 5** | 4.1 → 4.2 → 4.3 → 4.4 | Sequentiel | 1h |

**Total temps actif** : ~5-6h de production effective via MCP (vs 15-25h sans methode).

## Chemin critique

```
0.2 (variables couleurs) → 1.2 (card format) → 2.4 (section 3 formats) → 4.1 (QA) → 4.4 (publish)
```

5 taches sequentielles. Optimiser ce chemin = optimiser le delai de livraison.

## Repartition par executeur

| Executeur | Nombre de taches |
|---|---|
| MCP-DATA | 7 |
| MCP-DESIGN | 13 |
| SKILL `/apply-nopillo-ds` | 1 (combine avec MCP) |
| SKILL `/connect-hubspot-form` | 1 (combine avec MCP) |
| CLAUDE / MANUEL | 4 |

## Pre-requis avant de commencer

| Item | Status |
|---|---|
| DS Nopillo extrait dans `docs/design-system-extraction/nopillo-extracted/` | DONE |
| Acces Webflow workspace Nopillo | TODO (brief) |
| Bridge App active dans Webflow Designer | TODO |
| Skills `/apply-nopillo-ds` et `/connect-hubspot-form` disponibles | DONE |
| Compte HubSpot ou choix Webflow Forms native | TODO (brief) |
| Compte GA4 + Pixel | TODO (brief) |
| Texte definitif des 3 variantes hero (A/B/C) | TODO Thomas |
| Quotes clients (3) ou placeholders | TODO Thomas |
| OG image (1200x630) | TODO design |

## Sources

- [docs/landing-page-best-practices/02-structure-sections.md](../landing-page-best-practices/02-structure-sections.md) — structure type
- [docs/design-system-extraction/nopillo-extracted/_index.md](../design-system-extraction/nopillo-extracted/_index.md) — DS Nopillo
- [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) — outils MCP utilises
- [.claude/skills/apply-nopillo-ds/SKILL.md](../../.claude/skills/apply-nopillo-ds/SKILL.md) — skill DS
- [.claude/skills/connect-hubspot-form/SKILL.md](../../.claude/skills/connect-hubspot-form/SKILL.md) — skill form
