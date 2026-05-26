# Tokens Spacing, Radius, Shadows — Nopillo

> Distribution des valeurs reellement utilisees sur le DOM (computed styles, ~800 elements).

## Sommaire

- [Border-radius](#border-radius)
- [Box-shadows](#box-shadows)
- [Spacing (padding/margin/gap)](#spacing-paddingmargingap)
- [Containers et largeurs](#containers-et-largeurs)
- [Grids et layouts](#grids-et-layouts)
- [Transitions](#transitions)

---

## Border-Radius

| Valeur | Count | Usage typique |
|--------|-------|---------------|
| `16px` | **42** | **Cards** (signature) |
| `9999.01px` / `9999px` | 18 | **Pills** (boutons header) |
| `100px` / `999px` | 16 | Pills (boutons LP) |
| `8px` | 6 | Inputs, small elements |
| `32px` | 4 | Boutons LP rounded |
| `24px` | 3 | Cards larges |
| `50%` | 3 | Circles (avatars, icones) |
| `6px` | 2 | Badges |
| `150px` | 1 | Pill geant |

**Echelle proposee** :
```css
--radius-xs:   4px
--radius-sm:   6px      /* badges */
--radius-md:   8px      /* inputs */
--radius-lg:   16px     /* cards (DEFAULT) */
--radius-xl:   24px     /* cards larges */
--radius-2xl:  32px     /* cards XL */
--radius-pill: 999px    /* boutons */
--radius-full: 9999px   /* pills extreme */
--radius-circle: 50%    /* avatars */
```

**Pattern signature** :
- `16px` est de loin le radius dominant pour cards (42 occurrences)
- Pills `999px` quasi-systematiques sur les CTAs
- Le DS evite les radius "moyens" (12px, 20px) — il alterne **radius doux (16px)** vs **pill complete (999px)**

## Box-Shadows

Seulement **3 variations** detectees sur toute la page :

| Shadow | Count | Usage |
|--------|-------|-------|
| `rgba(0, 0, 0, 0.06) 0px 1px 10px 0px` | **25** | **Cards** (signature) |
| `rgba(0, 0, 0, 0.08) 0px 1px 16px 0px` | 6 | Cards "elevated" |
| `rgba(0, 0, 0, 0.05) 0px 1px 10px 0px` | 3 | Variantes legere |

**Echelle proposee** :
```css
--shadow-card:     0 1px 10px rgba(0, 0, 0, 0.06);   /* DEFAULT */
--shadow-elevated: 0 1px 16px rgba(0, 0, 0, 0.08);
--shadow-subtle:   0 1px 10px rgba(0, 0, 0, 0.05);
```

**Caracteristiques** :
- Toujours `y: 1px` (pas d'offset vertical)
- Blur `10-16px` doux
- Opacity `5-8%` — tres subtil
- **Aucun spread** (`spread: 0`)
- Aucune shadow "dramatic" (pas de shadows colorees, pas d'elevations type Material)

**Philosophie** : shadows quasi-invisibles. Le DS s'appuie sur les **borders** (1px solid indigo-100) pour delimiter, pas sur les shadows.

## Spacing (Padding/Margin/Gap)

### Paddings courants

| Padding | Count | Usage |
|---------|-------|-------|
| `24px` | **27** | **Cards** (signature) |
| `8px 16px` | 11 | Buttons compact, badges |
| `0px 8px` | 10 | Wrapper text |
| `16px` | 9 | Cards small, inputs |
| `0px 16px 8px` | 9 | Liste items |
| `20px` | 7 | Buttons headers |
| `0px 128px` | 7 | Sections wrapper |
| `20px 12px` | 6 | Mobile buttons |
| `4px 20px` | 6 | Badges |
| `12px 8px` | 4 | Compact items |
| `16px 20px` | 4 | Cards medium |
| `16px 24px` | 4 | Cards medium |
| `26px 48px` | 2 | CTA primary section |
| `80px 0px` | 2 | **Sections (large)** |

### Sections (vertical padding)

| Pattern | Usage |
|---------|-------|
| `80px 0` | Section large (default `padding-section-large`) |
| `72px 0` | Section paid (chart) |
| `64px 0px 88px` | Software screen (asymmetric) |
| `57px 0 78px` | Choices/livres-blancs (asymmetric signature) |
| `160px 0 44px` | Hero homepage |

**Echelle de section padding** :
```css
--section-pt-hero:    160px
--section-pb-hero:    44px
--section-pv-large:   80px
--section-pv-medium:  64px
--section-pv-small:   40px
```

### Gaps (flexbox/grid)

| Gap | Count | Usage |
|-----|-------|-------|
| `8px` | **78** | Element interne (icone+text) |
| `30px` | 21 | Card content gap |
| `24px` | 18 | Sections content |
| `16px` | **13** | Grid gap (DEFAULT) |
| `6px` | 7 | Tight |
| `5px` | 5 | Tres tight |
| `32px` | 5 | Sections larges |
| `10px` | 4 | |
| `4px` | 3 | Micro gap |
| `13px` / `11px` | 6 | Imprecis (Webflow auto) |
| `56px` / `48px` / `36px` / `70px` | 7 | Larges |

**Echelle simplifiee** :
```css
--gap-1:  4px
--gap-2:  8px         /* DEFAULT element */
--gap-3:  12px
--gap-4:  16px        /* GRID DEFAULT */
--gap-6:  24px
--gap-8:  32px
--gap-12: 48px
--gap-16: 64px
```

**Pattern observe** : echelle 4-8-16-24-32 (multiples de 4 et 8).

## Containers et Largeurs

| Classe | max-width | width | Notes |
|--------|-----------|-------|-------|
| `container-regular` | **1120px** | 1120px | Container DEFAULT |
| `navbar_container is-navbar` | 1408px | 1312px | Navbar plus large |

**Token CSS** :
```css
--container-regular: 1120px;
--container-navbar:  1408px;
--container-padding-x: 16px;   /* deduit du gutter */
```

**Singularite Nopillo** :
- 1120px est **etroit** comparé aux standards (1280-1440px chez la plupart des sites SaaS)
- Donne un effet "pose" et "centre" — moins industrial, plus magazine

## Grids et Layouts

### Grid signature : 3 colonnes egales

```css
.grid_position-business.is-tabs-1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
/* Width effectif observe : 362.664px × 3 + 16px × 2 = 1120px */
```

### Grid 4 colonnes

```css
.grid_position-business.is-tabs-2,
.grid_position-business.is-tabs-3 {
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
}
```

### Grid 3 colonnes (variant)

```css
.grid_position-business.is-tabs-4 {
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
```

**Pattern recurrent** : `gap: 16px` sur tous les grids de cards. Pas de gap variable.

## Transitions

Distribution sur 800+ elements `<a>`, `<button>`, `[class*="card"]` :

| Transition | Count | Usage |
|-----------|-------|-------|
| `all 0.3s ease` | **797** | Defaut Webflow (presque universel) |
| `0.3s` | 1 | Custom LP button |
| `filter 0.1s cubic-bezier(0, 0, 0.2, 1)` | 1 | Image hover (Webflow) |
| `max-height 0.4s` | 1 | Dropdown nav |

**Token CSS** :
```css
--transition-default: all 0.3s ease;
--transition-fast:    all 0.15s ease;
--transition-slow:    all 0.5s ease;
--ease-default:       cubic-bezier(0.4, 0, 0.2, 1);
```

**Limite** : Le DS Webflow par defaut utilise `transition: all 0.3s ease` partout — ce n'est PAS une bonne pratique (transitions sur `all` peuvent declencher des layout shifts inutiles). Dans un rebuild, prefere :
```css
transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
```

## Animations (@keyframes)

**Une seule animation** declaree dans le CSS :

```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

Utilisee probablement pour loader. Le reste des animations est gere par **Webflow Interactions** (JSON dans le JS, pas dans le CSS).

## Synthese Visuelle

```
┌─────────────────────────────────────────┐
│  ECHELLE SPACING (multiples 4)          │
│  4 - 8 - 12 - 16 - 24 - 32 - 48 - 64    │
├─────────────────────────────────────────┤
│  RADIUS                                 │
│  • Cards : 16px                         │
│  • CTAs  : 999px (pill)                 │
│  • Inputs: 8px                          │
├─────────────────────────────────────────┤
│  SHADOWS                                │
│  • Card  : 0 1px 10px rgba(0,0,0,.06)   │
│  • Hover : 0 1px 16px rgba(0,0,0,.08)   │
├─────────────────────────────────────────┤
│  CONTAINER                              │
│  • Regular : 1120px                     │
│  • Navbar  : 1408px                     │
└─────────────────────────────────────────┘
```

## Sources

- Methode : `Array.from(document.querySelectorAll('*'))` puis comptage des computed styles
- Echantillon : 800 premiers elements DOM
- Date : 2026-05-05
