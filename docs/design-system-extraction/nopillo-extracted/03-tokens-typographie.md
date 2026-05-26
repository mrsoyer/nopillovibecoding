# Tokens Typographie — Nopillo

> Specs typographiques mesurees sur computed styles de la page d'accueil. Police principale : **Futura PT** (Adobe Typekit).

## Sommaire

- [Familles de polices](#familles-de-polices)
- [Echelle des tailles](#echelle-des-tailles)
- [Echelle des poids](#echelle-des-poids)
- [Line-heights](#line-heights)
- [Specs par tag HTML](#specs-par-tag-html)
- [Classes typographiques observees](#classes-typographiques-observees)
- [Implementation CSS](#implementation-css)

---

## Familles de Polices

### Police principale : Futura PT

```css
font-family: futura-pt, sans-serif;
/* fallback (sur p): "Futura PT", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif */
```

**Source** : Adobe Fonts (Typekit) via `https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css`

**Variantes chargees** (detectees via classes `wf-futurapt-*` sur `<html>`) :
- 300 / 300i (light)
- 400 / 400i (regular)
- 500 / 500i (medium)
- 600 / 600i (demi)
- 700 / 700i (bold)
- 800 / 800i (heavy)
- Variant **Futura PT Bold** (separate kit)

**Variable CSS** : `--futura-pt: futura-pt, sans-serif;` et `--futura-pt-bold: futura-pt-bold, sans-serif;`

### Police secondaire : Splinesans

Utilisee uniquement sur les boutons LP (`.lp_button`) :
```css
font-family: Splinesans, sans-serif;
```

C'est une variante visuelle pour pages "marketing" specifiques (pas le DS principal).

### Police tierce : Source Sans 3 (cookie banner)

```css
font-family: 'Source Sans 3', sans-serif;
```
Chargee via `fonts.axept.io` — utilisee uniquement sur le banner cookies axeptio. **A ignorer** dans le DS de marque.

## Echelle des Tailles

Tailles **effectivement** utilisees, ordonnees par frequence d'apparition :

| Taille | Count | Usage typique | Token suggere |
|--------|-------|---------------|---------------|
| `16px` | **644** | Body texte, default | `--text-base` |
| `18px` | 50 | Boutons, lead text | `--text-lg` |
| `24px` | 19 | Sub-titles | `--text-2xl` |
| `20px` | 23 | Lead, blockquotes, liens | `--text-xl` |
| `22px` | 13 | H6, sub-headings | `--text-xl-alt` |
| `40px` | 12 | H4 grand, chiffres cles | `--text-4xl` |
| `48px` | 7 | H3 grand, h2 mobile | `--text-5xl` |
| `28px` | 6 | H4, card titles grands | `--text-3xl` |
| `12px` | 5 | Captions, labels footer | `--text-xs` |
| `56px` | 5 | **H2 default** | `--text-display-md` |
| `26px` | 4 | **H3 default** | `--text-2xl-alt` |
| `68px` | 3 | H1 mobile, chiffres geants | `--text-display-xl` |
| `14px` | 3 | Small | `--text-sm` |
| `59.2px` | 2 | **H1 default** (3.7em base) | `--text-display-lg` |
| `32px` | 1 | H4-H5 | `--text-3xl-alt` |

**Echelle simplifiee proposee** :
```
xs:    12px
sm:    14px
base:  16px       ← body
lg:    18px       ← buttons, lead
xl:    20px
2xl:   24px
3xl:   28px / 32px
4xl:   40px / 48px
display-md: 56px  ← h2
display-lg: 60px  ← h1
display-xl: 68px  ← chiffres geants
```

## Echelle des Poids

Distribution observee :

| Poids | Count | Usage |
|-------|-------|-------|
| `400` | 611 | **Regular** — body, defaults |
| `600` | 98 | **Demi** — H2, badges, navigation |
| `500` | 67 | **Medium** — buttons CTA, sub-titles |
| `700` | 24 | **Bold** — H1, H3 |

**Hierarchie d'usage** :
- Body : 400
- Liens, sub-titles, buttons CTA : 500
- H2, h6, navigation links : 600
- H1, H3, valeurs cles : 700

Note : pas de 300 (light) ni 800 (heavy) detecte dans le DOM rendu, malgre le chargement des variantes.

## Line-Heights

| LH | Count | Usage |
|----|-------|-------|
| `24px` | 505 | LH du body (avec font-size 16px) → ratio **1.5** |
| `32px` | 50 | Body large (font 20px) → ratio **1.6** |
| `28px` | 22 | Body medium (font 18px / 22px) |
| `64px` | 11 | H2 (font 56px) → ratio **1.14** |
| `72px` | 2 | H1 (font 59.2px) → ratio **1.22** |
| `48px` | 12 | Display medium |
| `36px` | 6 | Sub-headings |

**Patterns de ratios** :
- Body : 1.5 (16/24)
- Lead text : 1.6 (20/32)
- Headings display : 1.14-1.22 (tight, characteristic du Futura PT)

## Specs par Tag HTML

### H1 — Heading display

```css
h1 {
  font-family: futura-pt, sans-serif;
  font-size: 59.2px;          /* ~3.7em base */
  font-weight: 700;
  line-height: 72px;          /* ratio 1.22 */
  margin-bottom: 24px;
  color: rgb(9, 9, 11);
  letter-spacing: normal;
  text-transform: none;
}
```

### H2 — Section title

```css
h2 {
  font-family: futura-pt, sans-serif;
  font-size: 56px;            /* 3.5em base */
  font-weight: 600;           /* moins lourd que h1 */
  line-height: 64px;          /* ratio 1.14 */
  margin: 0;
  color: rgb(9, 9, 11);
}
```

### H3 — Card title

```css
h3 {
  font-family: futura-pt, sans-serif;
  font-size: 26px;            /* 1.625em base */
  font-weight: 700;           /* re-bold pour cards */
  line-height: 28px;          /* ratio 1.08 — tres tight */
  margin: 0;
  color: rgb(9, 9, 11);
}
```

### P — Body default

```css
p {
  font-family: "Futura PT", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgb(9, 9, 11);
  margin: 0;
}
```

### A — Liens

```css
a {
  font-family: futura-pt, sans-serif;
  font-size: 20px;            /* default plus grand que body */
  font-weight: 400;
  line-height: 32px;          /* ratio 1.6 */
  color: rgb(9, 9, 11);
  text-decoration: none;      /* implicite */
}
```

## Classes Typographiques Observees

Webflow expose des **utility classes** typographiques :

| Classe | Usage |
|--------|-------|
| `text-size-b1-futura` | Body 1, Futura PT |
| `heading-style-h1-futura` | H1 styled |
| `heading-style-h5-futura` | H5 styled |
| `heading-style-h6-futura` | H6 styled |
| `heading-style-h7-futura` | H7 (custom Webflow) |
| `is-600` | Variant weight 600 |
| `is-navbar` | Variant navbar |
| `news-header_component-title` | Component-specific |
| `card_titles-text-position` | Card titles |
| `chart_titles` | Chart-specific |
| `title_news` / `title_avis` / `titles_link-footer` | Section-specific |
| `wrapper_titles-card-price` | Pricing card titles |

**Pattern de naming Webflow** : `[component]_[element]-[modifier]` — convention BEM-like adoptee par Webflow.

## Implementation CSS

Variables proposees pour reutilisation :

```css
:root {
  /* Familles */
  --font-display: futura-pt, sans-serif;
  --font-body: "Futura PT", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-button-lp: Splinesans, sans-serif;

  /* Tailles */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 28px;
  --text-4xl: 40px;
  --text-display-sm: 48px;
  --text-display-md: 56px;
  --text-display-lg: 60px;     /* 59.2px arrondi */
  --text-display-xl: 68px;

  /* Poids */
  --font-regular: 400;
  --font-medium: 500;
  --font-demi: 600;
  --font-bold: 700;

  /* Line-heights */
  --leading-tight: 1.14;       /* h2 */
  --leading-snug: 1.22;        /* h1 */
  --leading-normal: 1.5;       /* body */
  --leading-relaxed: 1.6;      /* lead */
}

/* Headings */
h1 {
  font-family: var(--font-display);
  font-size: var(--text-display-lg);
  font-weight: var(--font-bold);
  line-height: var(--leading-snug);
  margin-bottom: 24px;
}

h2 {
  font-family: var(--font-display);
  font-size: var(--text-display-md);
  font-weight: var(--font-demi);
  line-height: var(--leading-tight);
}

h3 {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: var(--font-bold);
  line-height: 1.08;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
}
```

## Anti-Patterns Observes (a NE PAS reproduire)

1. **Tailles fractionnaires** : `59.2px`, `18.4px`, `22.4px`, `23.008px`, `57.008px` — Webflow injecte des valeurs em-converties imprecises. Dans un DS rebuild, **arrondir** a 60px / 18px / 22px / 23px / 57px.

2. **Mix de families sans regle claire** : Splinesans n'est utilise que sur 1-2 classes LP. Ajouter une seconde police = ajouter charge reseau pour usage marginal.

3. **Trop de classes typo specifiques** : `news-header_component-title`, `chart_titles`, `title_avis`, etc. — manque d'abstraction reutilisable. Preferer une echelle de 6-8 classes utilities (`text-h1`, `text-body-lg`...).

## Sources

- Methode : `getComputedStyle()` sur 800+ elements de la page d'accueil
- Date : 2026-05-05
- Adobe Fonts kit : `c1b0b72bff15bb9715f23b2ce31c51654439d865`
