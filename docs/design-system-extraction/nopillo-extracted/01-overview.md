# Vue d'Ensemble — Design System Nopillo

## Identite de la Marque

**Nopillo** est une plateforme francaise specialisee dans la **declaration fiscale LMNP** (Location Meublee Non Professionnelle). Tagline : *"Votre declaration LMNP. Simplifiee. Optimisee."*

Le DS est cohérent autour de :
- **Pedagogie** : illustrations isometriques, chiffres mis en avant, sections "Comment ca marche"
- **Confiance** : reviews clients visibles, chiffres cles (24M€, 12000 clients, 95%), badges "Outil gratuit"
- **Action** : CTAs noirs (high-contrast) + outline secondaires, simulateurs interactifs

## Stack Technique

| Couche | Tech | Detail |
|--------|------|--------|
| **Site builder** | Webflow | meta `generator: Webflow` |
| **CDN assets** | `cdn.prod.website-files.com/62efb778b7b092165085a6f6/` | Toutes images et SVG |
| **Polices** | Adobe Fonts (Typekit) | `use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css` |
| **Police principale** | Futura PT | Variantes 300/400/500/600/700/800 + italics |
| **Police secondaire** | Splinesans | Utilisee uniquement sur boutons LP (`.lp_button`) |
| **CSS principal** | `nopillo.webflow.shared.76b184fda.min.css` | Webflow standard build |
| **Animations** | 1 seul `@keyframes spin` | Tres minimal — Webflow gere les interactions JS |
| **Transitions** | `all 0.3s ease` (defaut Webflow) | Tres uniforme |

## Repere Chromatique

Le DS expose **88 variables CSS** sur `:root`, organisees en 8 echelles principales :

| Echelle | Plage | Usage |
|---------|-------|-------|
| `--indigo-*` | 5, 10, 50, 100-900 | **Primaire** (CTA, highlights, sections) |
| `--graycool*` | 25, 50, 100-900 | Neutres avec sous-ton bleu |
| `--secondary-*` | 10, 50-600 | Vert mint (success, accents) |
| `--emeraude-*` | 300-900 | Vert profond (alternative) |
| `--orange-*` | 50, 100-600 | Headband annonces |
| `--neutral-*` | 50-500 | Greyscale neutres |
| `--danger-*` | 50, 500 | Erreurs |
| `--lp--*` | red/green/orange/purple/taupe | Couleurs landing page (Splinesans variant) |

**Couleur signature** : `#4033DB` (indigo-600) — present partout : icones d'accroche, CTAs sections, badges "Declaration", liens.

## Tonalite Visuelle

### Ce qui frappe immediatement

1. **Heading display geant** : h1 a 59.2px / weight 700 / line-height 72px
2. **Backgrounds sections en indigo doux** (5 a 10% opacite) — jamais blanc pur sur sections importantes
3. **Boutons pill** systematiques (border-radius: 999px) — pas de boutons rectangulaires
4. **Black brand non pur** : `#09090B` au lieu de `#000` → plus chaleureux
5. **Cards translucides** : `rgba(255,255,255,0.3)` + bordure `indigo-100` + shadow tres legere

### Ce qui differencie

| Decision | Choix Nopillo | Convention courante |
|----------|---------------|---------------------|
| Couleur de marque | Indigo electrique (#4033DB) | Bleu corporate (#0066CC) |
| Container max | 1120px | 1280-1440px |
| Radius cards | 16px | 8-12px |
| Radius CTAs | 999px (pill) | 6-8px (rounded) |
| Black | `#09090B` (chaleur subtile) | `#000` (pur) |
| Background sections | Indigo soft alternant | Blanc / gris alterant |
| Police corps | Futura PT (geometrique) | Inter / system-ui |

## Hierarchie Visuelle

L'extraction revele une hierarchie tres explicite :

```
H1 display      59.2px / 700 / 72px LH    → Hero only
H2 section      56px   / 600 / 64px LH    → Section titles
H3 card         26px   / 700 / 28px LH    → Card titles
H4-H5           ~22-20px tight           → Sub-sections
Body large      20px   / 400 / 32px LH    → Lead paragraphs
Body            16px   / 400 / 24px LH    → Default
Small / labels  12-14px                  → Captions, footer
```

## Approche Layout

- **Grid 3-colonnes** (`362.664px × 3, gap 16px`) pour cards de fonctionnalites
- **Grid 4-colonnes** pour grilles tarifs/options
- **Section padding pattern** : `padding: 80px 0` (large) ou `57px 0 78px` (regular asymmetrique)
- **Container regular** : `max-width: 1120px` (centered)
- **Container navbar** : `max-width: 1408px` (plus large pour menu)

## Sources Visuelles d'Inspiration Detectees

L'esthetique generale evoque :
- **Stripe** (typographie geometrique, indigo, cards subtiles)
- **Linear** (radius 16px, neutres soft)
- **Notion** (illustrations isometriques figuratives)

Mais avec une **touche francaise immobiliere** : palette plus chaleureuse (orange, vert mint, indigo soft vs indigo cold de Stripe).

## Sources

- URL : `https://www.nopillo.com/`
- Extracteur : Playwright MCP `browser_evaluate` (computed styles sur 800+ elements)
- Date : 2026-05-05
