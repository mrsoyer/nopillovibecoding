# CDC — Slides theorie (Reveal.js 5 + DS Nopillo)

> Presentation HTML statique de 18 slides theoriques pour la formation Vibecoding J1. Stack : Reveal.js 5 (CDN, zero-build) + theme custom inspire du Design System Nopillo (couleurs, typo, composants). Output dans `slide/` a la racine du projet. Peut etre deployee sur Netlify ou ouverte en local.

## Vision en 1 phrase

Produire une presentation **branded Nopillo**, autonome (1 fichier HTML), professionnelle (export PDF possible), pour le module theorique de 40 min du Jour 1 — avec contenu integral des [07-slides-theorie.md](../cours-formation-vibecoding-j1/07-slides-theorie.md).

## Stack detecte

| Layer | Technologie | Source |
|---|---|---|
| Framework slides | Reveal.js 5 (via CDN) | [docs/reveal-js-5/](../reveal-js-5/) |
| Theme | Custom (inspire DS Nopillo) | [.claude/skills/apply-nopillo-ds/assets/tokens.css](../../.claude/skills/apply-nopillo-ds/assets/tokens.css) |
| Typo | Futura PT (Adobe Typekit) ou system fallback | [apply-nopillo-ds/assets/adobe-typekit.html](../../.claude/skills/apply-nopillo-ds/assets/adobe-typekit.html) |
| Plugins Reveal | RevealNotes, RevealHighlight, RevealMarkdown | [docs/reveal-js-5/07-plugins.md](../reveal-js-5/07-plugins.md) |
| Build | Aucun (CDN, HTML statique) | [docs/reveal-js-5/02-installation.md](../reveal-js-5/02-installation.md) |
| Hosting | Local OR Netlify static | - |

> Pourquoi pas de build : 1 fichier `slide/index.html` editable directement, deployable n'importe ou (Netlify, GitHub Pages, ouverture locale). Aligne avec la philosophie "Documentation-First" : pas de complexite inutile.

## Phases d'execution

| Phase | Description | Taches | Effort | Parallelisable |
|---|---|---|---|---|
| **P0 — Setup** | Structure `slide/`, theme custom Nopillo, init reveal.js | 4 | XS | 2 waves |
| **P1 — Intro** | Slides 1-3 (titre, probleme, vue d'ensemble) | 3 | XS | 1 wave parallele |
| **P2 — Concepts** | Slides 4-11 (CLAUDE.md, Rules, Skills, MCP, Hooks) | 8 | M | 4 waves paralleles |
| **P3 — Decision & Methodo** | Slides 12-15 (decision tree + Documentation-First + pipeline) | 4 | S | 2 waves |
| **P4 — Final** | Slides 16-18 (anti-patterns, transition, recap) | 3 | XS | 1 wave parallele |
| **P5 — QA & Livraison** | Tests cross-browser, export PDF, speaker notes | 3 | S | sequentiel |

**Total** : 25 taches reparties sur 6 phases, ~10 waves d'execution.

**Effort total** : 3-4h de travail avec parallelisation, ~6-8h sequentiel.

## Index

| Fichier | Contenu |
|---|---|
| [01-specs.md](01-specs.md) | Architecture technique, structure `slide/`, theme Nopillo, integration reveal.js, conventions |
| [02-taches.md](02-taches.md) | Decoupage 25 taches : ID, executeur, dependances, livrable, priorite + diagramme waves |
| [sources.md](sources.md) | Documentation referencee + ressources reveal.js + DS Nopillo |

## Resume executif

**Livrable** :
- Dossier `slide/` autonome (ouvrable en local, deployable Netlify)
- `slide/index.html` : 18 slides reveal.js avec contenu integral de [07-slides-theorie.md](../cours-formation-vibecoding-j1/07-slides-theorie.md)
- Theme custom Nopillo : couleurs, typo Futura PT, pills, cards, container 1120px
- Mode speaker : notes formateur visibles (touche `S`)
- Export PDF possible (`?print-pdf` URL)

**Promesse formateur** :
- Slides utilisables le jour J (zero retouche manuelle)
- Brandees Nopillo (coherence visuelle avec la landing)
- Editables facilement (HTML standard, pas de build)
- Versionnables (1 fichier, git-friendly)

**Documentation referencee** :
- [docs/cours-formation-vibecoding-j1/07-slides-theorie.md](../cours-formation-vibecoding-j1/07-slides-theorie.md) — Contenu integral des 18 slides
- [docs/reveal-js-5/](../reveal-js-5/) — Framework slides (11 fichiers reference)
- [.claude/skills/apply-nopillo-ds/](../../.claude/skills/apply-nopillo-ds/) — Tokens CSS + composants DS Nopillo

## Decoupage rapide des 18 slides (rappel)

| # | Section | Titre | Duree |
|---|---|---|---|
| 1 | Intro | Titre formation | 30s |
| 2 | Intro | Le probleme : Claude oublie tout | 2 min |
| 3 | Concepts | Les 5 mecanismes en 1 tableau | 2 min |
| 4 | CLAUDE.md | Le contexte permanent | 2 min |
| 5 | CLAUDE.md | La regle des 80 lignes | 1 min |
| 6 | Rules | La connaissance scopee | 2 min |
| 7 | Rules | Anatomie (exemple Hero) | 2 min |
| 8 | Skills | Les competences workflow | 2 min |
| 9 | Skills | Les 4 elements d'un bon skill | 2 min |
| 10 | MCP | Les outils externes | 2 min |
| 11 | Hooks | L'enforcement deterministe | 1 min |
| 12 | Decision | Le decision tree | 3 min |
| 13 | Decision | Cas concrets | 1 min |
| 14 | Methodo | Documentation-First | 2 min ⭐ |
| 15 | Methodo | Pipeline en pratique | 2 min ⭐ |
| 16 | Anti-patterns | Top 7 | 2 min |
| 17 | Transition | On passe en live | 30s |
| 18 | Recap | A retenir | 1 min |

## Prochaine etape recommandee

Demarrer **Wave 1 — P0** :
- Tache `0.1` (creation dossier `slide/` + `index.html` squelette)
- Tache `0.2` (creation `slide/theme/nopillo.css` from tokens.css)

En parallele. Voir [02-taches.md](02-taches.md).

## Criteres de succes

| KPI | Cible | Verification |
|---|---|---|
| 18 slides creees | 18/18 | Compter sections dans index.html |
| Theme Nopillo applique | OK visuellement | Couleurs indigo + Futura PT visibles |
| Speaker notes presentes | 18/18 | `<aside class="notes">` sur chaque slide |
| Export PDF fonctionnel | OK | Tester URL `?print-pdf` |
| Slide 14-15 (methodo) visuelles | Distinctives | Encadre indigo + diagramme pipeline |
| Demarrage local | < 1 sec | `open slide/index.html` |
| Mobile-friendly | Pas critique | Bonus si OK |

## Sources

- [docs/cours-formation-vibecoding-j1/07-slides-theorie.md](../cours-formation-vibecoding-j1/07-slides-theorie.md) — Contenu source des 18 slides
- [docs/reveal-js-5/](../reveal-js-5/) — Documentation reveal.js 5 complete
- [.claude/skills/apply-nopillo-ds/SKILL.md](../../.claude/skills/apply-nopillo-ds/SKILL.md) — Skill DS Nopillo (assets tokens)
- [.claude/skills/apply-nopillo-ds/assets/tokens.css](../../.claude/skills/apply-nopillo-ds/assets/tokens.css) — 88 variables CSS DS Nopillo
- [docs/design-system-extraction/nopillo-extracted/](../design-system-extraction/nopillo-extracted/) — DS Nopillo complet
