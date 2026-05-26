# Design System Nopillo — Extrait depuis nopillo.com

> Extraction complete du Design System de [nopillo.com](https://www.nopillo.com/) le 2026-05-05 via Playwright MCP. Site Webflow, marque LMNP (declaration fiscale location meublee).

---

## Sommaire

| Fichier | Contenu |
|---------|---------|
| [01-overview.md](01-overview.md) | Vue d'ensemble : marque, stack, ton visuel, repere chromatique |
| [02-tokens-couleurs.md](02-tokens-couleurs.md) | Palette complete (88 variables CSS) — primaire, secondaire, semantique |
| [03-tokens-typographie.md](03-tokens-typographie.md) | Polices (Futura PT + Splinesans), echelle h1-h6, ratios |
| [04-tokens-spacing-radius.md](04-tokens-spacing-radius.md) | Spacing, gap, border-radius, container, shadows |
| [05-composants-buttons.md](05-composants-buttons.md) | Boutons primaire/outline/secondaire avec specs exactes |
| [06-composants-navbar-footer.md](06-composants-navbar-footer.md) | Header (headband + nav fixed), footer multi-colonnes |
| [07-composants-cards-sections.md](07-composants-cards-sections.md) | Cards translucides, sections colorees, grids |
| [08-logo-assets.md](08-logo-assets.md) | Logo SVG, icones, illustrations isometriques |
| [09-tokens-dtcg.json](09-tokens-dtcg.json) | Tokens au format DTCG pour import Webflow Variables |
| [tokens.css](tokens.css) | Variables CSS pretes-a-coller |
| [sources.md](sources.md) | URLs et methode d'extraction |
| `assets/` | Screenshots (full-page, hero, navbar) + logo SVG |

---

## TL;DR

| Aspect | Valeur |
|--------|--------|
| **Stack** | Webflow + Typekit (Futura PT) + Source Sans 3 (cookie banner uniquement) |
| **Brand black** | `#09090B` (graycool-900-901) — pas du noir pur |
| **Brand primary** | `#4033DB` (indigo-600) — violet/indigo electrique |
| **Brand soft** | `#DEDAFF` (indigo-100) — backgrounds sections |
| **Secondaire** | `#0CC28C` (secondary-600) — vert mint pour highlights |
| **Police titre** | Futura PT (Adobe Fonts), 600-700 |
| **Police sec.** | Splinesans (boutons LP) |
| **Container** | 1120px (regular) / 1408px (navbar) |
| **Radius dominant** | 16px (cards), 999px (boutons pill) |
| **Shadow signature** | `0 1px 10px rgba(0,0,0,.06)` |

---

## Regle d'Or (Nopillo)

> **Aspirer pour comprendre, pas pour reproduire.** Cette extraction documente les **decisions de design** (echelles, ratios, ombres, contrastes) — pas une identite a copier.
>
> Le client doit avoir SON DS, inspire de bonnes decisions, jamais photocopie.

Voir [docs/design-system-extraction/06-anti-patterns-legal.md](../06-anti-patterns-legal.md) pour les limites legales.

---

## Tonalite Visuelle

- **Indigo soft** comme couleur dominante des sections (alternance blanc / indigo-100 / indigo-10)
- **Pill-shaped CTAs** (border-radius 999px)
- **Black brand** soft (#09090B vs #000)
- **Cards translucides** (white 30% + border indigo-100 + shadow legere)
- **Typographie Futura PT** — geometrique sans-serif, premium et moderne
- **Illustrations isometriques** (checkmarks, calculators, charts)
- **Hero 2 colonnes** avec heading display geant + form interactif
- **Headband orange** discret au-dessus du nav pour annonces

---

## Statut

- **Date extraction** : 2026-05-05
- **URL source** : https://www.nopillo.com/
- **Methode** : Playwright MCP (`browser_evaluate` sur computed styles)
- **Surface** : page d'accueil uniquement (1 page sur ~30+ du site)
- **Confiance** : haute pour tokens (extraction directe DOM), moyenne pour composants (1 page)
