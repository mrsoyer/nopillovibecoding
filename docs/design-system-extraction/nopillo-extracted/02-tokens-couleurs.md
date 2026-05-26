# Tokens Couleurs — Nopillo

> 88 variables CSS extraites de `:root` sur nopillo.com (2026-05-05). Comptes d'usage mesures sur ~800 elements DOM.

## Sommaire

- [Couleurs de marque](#couleurs-de-marque)
- [Echelle Indigo (primaire)](#echelle-indigo-primaire)
- [Echelle Graycool (neutres)](#echelle-graycool-neutres)
- [Echelle Secondary (vert mint)](#echelle-secondary-vert-mint)
- [Echelle Emeraude (vert profond)](#echelle-emeraude-vert-profond)
- [Echelle Orange](#echelle-orange)
- [Echelle Neutral / Neutrale](#echelle-neutral--neutrale)
- [Couleurs Landing Page (LP)](#couleurs-landing-page-lp)
- [Couleurs systeme et speciales](#couleurs-systeme-et-speciales)
- [Usage reel sur la page d'accueil](#usage-reel-sur-la-page-daccueil)

---

## Couleurs de Marque

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--black` | `#09090B` | **Brand black** (texte, CTA primaire) | 662 elements (texte par defaut) |
| `--indigo-600` / `--indigo` | `#4033DB` | **Brand primary** (CTA section, icones) | 4 elements color, 8 elements bg |
| `--white` | `#FFFFFF` | Backgrounds cards, texte sur dark | 36 color, 20 bg |
| `--secondary-600` | `#0CC28C` | **Vert mint highlight** | 2 elements |

Note : `--black` est utilise meme pour les textes (`color: rgb(9, 9, 11)` sur 662 elements). Le DS evite `#000` pur.

## Echelle Indigo (Primaire)

| Token | Hex | Echantillon | Usage |
|-------|-----|-------------|-------|
| `--indigo-5` | `#FAFAFE` | tres subtil | Backgrounds tres legers |
| `--indigo-10` / `--indigos-50` (variant) | `#EEECFF` / `#EBE9FF` | wash | Section `section_software-screen` |
| `--indigo-50` | `#F6F5FD` | wash | Backgrounds sub-sections |
| `--indigo-100` | `#DEDAFF` | **Hero soft** | Hero bg (60% opacity), borders cards |
| `--indigo-200` | `#BDB5FF` | | Hover states potentiels |
| `--indigo-300` | `#9C90FF` | | Accents |
| `--indigo-400` | `#8275FF` | | |
| `--indigo-500` | `#5747FF` | | Liens texte |
| `--indigo-600` / `--indigo` | `#4033DB` | **PRIMARY** | CTA section, icones d'accroche |
| `--indigo-700` | `#2D23B7` | | Hover primary |
| `--indigo-800` | `#1E1693` | | |
| `--indigo-900` | `#0F0167` | | Texte sombre indigo |

**Hierarchie d'usage observee** :
- `--indigo-100` apparait dans 10 elements bg + utilise dans 23 elements en `rgba(255,255,255,0.3)` overlay
- `--indigo-600` est **la** couleur de la section CTA finale (`.section_cta-callback`)

## Echelle Graycool (Neutres)

| Token | Hex | Notes |
|-------|-----|-------|
| `--graycool25` | `#FCFCFD` | Quasi-blanc |
| `--graycool50-501` | `#F9F9FB` | Backgrounds neutres |
| `--graycool100` / `--white-smoke` | `#EFF1F5` | Cards neutres |
| `--graycool200` | `#DCDFEA` | Borders subtiles |
| `--graycool300` | `#B9C0D4` | |
| `--graycool400` | `#7D89B0` | Texte secondaire |
| `--graycool500` | `#5D6B98` | |
| `--graycool600` | `#4A5578` | |
| `--graycool700` | `#404968` | |
| `--graycool800` | `#30374F` | |
| `--graycool900-901` | `#111322` | (alias `--black`) |

Note : `--graycool900` est mappee a `#0073E6` dans le CSS (probable erreur Webflow). La vraie noire est `--black`.

## Echelle Secondary (Vert Mint)

| Token | Hex | Usage |
|-------|-----|-------|
| `--secondary-10` | `#EEFCF0` | Wash |
| `--secondary-50` | `#E4FFEA` | Backgrounds success |
| `--secondary-100` | `#CEFDD8` | Cards success (rgba 80%) |
| `--secondary-200` | `#93FCBB` | |
| `--secondary-400` | `#48ED9B` | |
| `--secondary-600` | `#0CC28C` | **Highlight vert principal** |

## Echelle Emeraude (Vert Profond)

| Token | Hex | Notes |
|-------|-----|-------|
| `--emeraude-300` / `--emeraude-400` | `#6DF6A4` | Alias |
| `--emeraude-500` | `#11E28F` | Vert vif |
| `--emeraude-800` | `#058376` | |
| `--emeraude-900` | `#036C6C` | Vert profond |

## Echelle Orange

| Token | Hex | Usage |
|-------|-----|-------|
| `--orange-50` | `#FFFBF5` | Tres soft |
| `--orange-100` | `#FFF3DF` | **Headband bg** (annonces top) |
| `--orange-200` | `#FFE9C9` | |
| `--orange-600` | `#FFA057` | |
| `--lp--orange` | `#FFC192` | Headband paid (variant) |
| `--yellow` | `#FDEEC7` | |
| `--yellow-600` | `#F5A623` | |

## Echelle Neutral / Neutrale

| Token | Hex |
|-------|-----|
| `--neutral-50` / `--neutrale-50` / `--neutral-100` | `#FAFAFA` / `whitesmoke` |
| `--neutrale-200` | `#EBEBEB` |
| `--neutral-200` / `--slate-200` | `#CCD6EB` |
| `--neutral-500` | `#8E98AD` |
| `--gray-color` | `#CCC` |
| `--color-neutral-400` | `#BDBDBD` |
| `--color-neutral-500` | `#ADADAD` |
| `--gray` | `#E5E4E6` |
| `--light-grey` | `#F4F4F4` |
| `--grey` (alpha) | `#8383831A` |

## Couleurs Landing Page (LP)

Variantes utilisees uniquement sur les `.lp_*` (boutons Splinesans, sections promo) :

| Token | Hex | Usage |
|-------|-----|-------|
| `--lp--red` | `#F45B69` | Erreurs/promos LP |
| `--lp--light-green` / `--green` | `#ADEFC5` | Backgrounds LP |
| `--lp--dark-green` | `#186031` | Texte sur green |
| `--lp--light-purple` | `#CDBDFF` | LP variant |
| `--lp--dark-purple` | `#25245E` | LP texte |
| `--lp--orange` | `#FFC192` | Headband paid |
| `--lp--taupe` | `#F6F7F2` | LP background |
| `--floral-white` | `#FBF7F0` | LP soft bg |
| `--beige-50` | `#FEFFF7` | |
| `--beige-200` | `#ECEDE1` | |

## Couleurs Systeme et Speciales

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-color-blue` | `#1864CF` | Liens classiques |
| `--steel-blue` | `#07B` | |
| `--blue` | `#D2E8FD` | Accent blue soft |
| `--danger-50` | `#FDEAED` | Erreurs bg |
| `--danger-500` | `#DB3352` | Erreurs principales |
| `--pale-turquoise` | `#99D3C6` | |
| `--aquamarine` | `#96EBD2` | |
| `--pastel-dark` | `#315656` | |
| `--orchid` | `#AA78A633` | (avec alpha 20%) |
| `--orchid-2` | `#AA78A617` | (alpha 9%) |
| `--black-2` | `#111` | |
| `--black-lighter` | `#202020` | |
| `--color-simulateur--dark-green` | `#186031` | Simulateur LMNP |
| `--color-simulateur--light-green` | `#ADEFC5` | Simulateur LMNP |
| `--transparent` | `transparent` | |

## Usage Reel sur la Page d'Accueil

Top 8 couleurs **effectivement** utilisees comme `color` sur le DOM (sur ~800 elements) :

| # | Couleur | Hex | Count | Notes |
|---|---------|-----|-------|-------|
| 1 | `--black` | `rgb(9, 9, 11)` | **662** | Texte par defaut, h1-h6 |
| 2 | Pure black | `rgb(0, 0, 0)` | 85 | Boutons LP Splinesans |
| 3 | White | `rgb(255, 255, 255)` | 36 | Texte sur boutons noirs |
| 4 | `--indigo-900` | `rgb(15, 1, 103)` | 6 | Texte indigo profond |
| 5 | `--indigo-500` | `rgb(87, 71, 255)` | 4 | Liens |
| 6 | `--indigo-600` | `rgb(64, 51, 219)` | 4 | Highlights |
| 7 | `--secondary-600` | `rgb(12, 194, 140)` | 2 | Vert mint |
| 8 | `#333` | `rgb(51, 51, 51)` | 1 | Cookie banner |

Top backgrounds utilises :

| # | Couleur | Hex/RGBA | Count |
|---|---------|----------|-------|
| 1 | White (alpha 30%) | `rgba(255, 255, 255, 0.3)` | 23 — **cards translucides** |
| 2 | White solid | `#FFFFFF` | 20 — navbar, cards opaques |
| 3 | `--black` solid | `#09090B` | 10 — boutons primaires |
| 4 | `--indigo-100` | `#DEDAFF` | 10 — bg sections |
| 5 | `--indigo-600` | `#4033DB` | 8 — boutons secondaires CTA |
| 6 | `--indigo-100` (alpha 60%) | `rgba(222, 218, 255, 0.6)` | 2 — hero |
| 7 | `--secondary-600` | `#0CC28C` | 2 — badges success |
| 8 | `--indigo-10` | `#EEECFF` | 1 — section software |
| 9 | `--neutral-50` | `#FAFAFA` | 1 — section chart |

## Patterns d'Usage (Recommandations)

### Texte
- **Tous les textes** : `--black` (#09090B) — pas `#000`
- **Texte secondaire / muted** : `--graycool500` (#5D6B98) ou `--neutral-500` (#8E98AD)
- **Liens** : `--indigo-500` (#5747FF) — ou inherits black avec underline

### Backgrounds Sections
Pattern d'alternance observe :
1. Section neutre : `#FFF` ou `--neutral-50`
2. Section soft : `--indigo-100` 60% (`rgba(222,218,255,0.6)`)
3. Section accent : `--indigo-100` 100% (`#DEDAFF`)
4. Section CTA finale : `--indigo-600` (#4033DB) avec texte blanc

### Cards
- Bg : `rgba(255, 255, 255, 0.3)` (translucide sur fond indigo)
- Border : `1px solid --indigo-100` (#DEDAFF)
- Shadow : `0 1px 10px rgba(0,0,0,.06)`

## Sources

- Extraction : `getComputedStyle(document.documentElement)` sur `:root`
- Methodologie : iteration sur `styles[i]` filtree `--*`
- Date : 2026-05-05
