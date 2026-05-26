# Tokens — Couleurs, Typo, Spacing, Radius, Shadows

> Valeurs réelles extraites de nopillo.com (computed styles, 800+ éléments). Source : `docs/design-system-extraction/nopillo-extracted/02-tokens-couleurs.md` + `03-tokens-typographie.md` + `04-tokens-spacing-radius.md`.

## Couleurs

### Brand (critiques)

| Token CSS | Hex | Rôle |
|-----------|-----|------|
| `--black` | `#09090B` | Texte par défaut, CTA primaire bg |
| `--indigo-600` | `#4033DB` | Brand primary, CTA sections, icônes accroche |
| `--indigo-100` | `#DEDAFF` | Hero bg soft, borders cards |
| `--white` | `#FFFFFF` | Cards bg, texte sur dark |
| `--secondary-600` | `#0CC28C` | Highlight vert mint, badges success |

### Échelle Indigo (primaire)

| Token | Hex | Usage |
|-------|-----|-------|
| `--indigo-5` | `#FAFAFE` | Wash très subtil |
| `--indigo-10` | `#EEECFF` | Wash sections |
| `--indigo-50` | `#F6F5FD` | Sub-sections |
| `--indigo-100` | `#DEDAFF` | Hero soft, borders |
| `--indigo-200` | `#BDB5FF` | Hover potentiel |
| `--indigo-500` | `#5747FF` | Liens texte |
| `--indigo-600` | `#4033DB` | **PRIMARY** |
| `--indigo-700` | `#2D23B7` | Hover primary |
| `--indigo-900` | `#0F0167` | Texte indigo profond |

### Échelle Graycool (neutres avec sous-ton bleu)

| Token | Hex |
|-------|-----|
| `--graycool25` | `#FCFCFD` |
| `--graycool50` | `#F9F9FB` |
| `--graycool100` | `#EFF1F5` |
| `--graycool200` | `#DCDFEA` |
| `--graycool400` | `#7D89B0` |
| `--graycool500` | `#5D6B98` |
| `--graycool800` | `#30374F` |

### Sémantique (alias pour usage simple)

| Token | Alias | Usage |
|-------|-------|-------|
| `--bg-base` | `--white` | Background page |
| `--bg-soft` | `--indigo-100` | Sections highlight |
| `--bg-inverse` | `--black` | Sections sombres |
| `--text-default` | `--black` | Texte principal |
| `--text-muted` | `--graycool500` | Texte secondaire |
| `--text-link` | `--indigo-500` | Liens |
| `--border-default` | `--indigo-100` | Borders cards |

### Autres échelles disponibles

- **Secondary (vert mint)** : `--secondary-50` à `--secondary-600`
- **Émeraude (vert profond)** : `--emeraude-300` à `--emeraude-900`
- **Orange (headband)** : `--orange-50` à `--orange-600`, `#FFF3DF` (headband)
- **Danger** : `--danger-50` (#FDEAED), `--danger-500` (#DB3352)
- **LP variants** : `--lp--red`, `--lp--light-green`, `--lp--orange`, etc.

## Typographie

### Polices

```css
--font-display: futura-pt, sans-serif;
--font-body: "Futura PT", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**Adobe Typekit Nopillo** : `c1b0b72bff15bb9715f23b2ce31c51654439d865`

Variantes chargées : 300, 400, 500, 600, 700, 800 (+ italics).

### Échelle des tailles

| Token | Valeur | Usage |
|-------|--------|-------|
| `--text-xs` | `12px` | Captions, footer legals |
| `--text-sm` | `14px` | Labels |
| `--text-base` | `16px` | **Body default** |
| `--text-lg` | `18px` | Boutons, lead text |
| `--text-xl` | `20px` | Lead, blockquotes |
| `--text-2xl` | `24px` | Sub-titles |
| `--text-3xl` | `28px` | H4, card titles grands |
| `--text-4xl` | `40px` | H4 grand, chiffres clés |
| `--text-display-sm` | `48px` | H3 grand |
| `--text-display-md` | `56px` | **H2 default** |
| `--text-display-lg` | `60px` | **H1 default** (59.2px arrondi) |
| `--text-display-xl` | `68px` | Chiffres géants |

### Poids

| Token | Valeur | Usage |
|-------|--------|-------|
| `--font-regular` | `400` | Body, defaults |
| `--font-medium` | `500` | Buttons CTA, sub-titles |
| `--font-demi` | `600` | H2, h6, navigation |
| `--font-bold` | `700` | H1, H3, valeurs clés |

### Line-heights

| Token | Ratio | Usage |
|-------|-------|-------|
| `--leading-tight` | `1.14` | H2 display (56px → 64px) |
| `--leading-snug` | `1.22` | H1 display (60px → 72px) |
| `--leading-normal` | `1.5` | **Body** (16px → 24px) |
| `--leading-relaxed` | `1.6` | Lead text (20px → 32px) |

### Specs par tag HTML

```css
h1 {
  font-family: var(--font-display);
  font-size: var(--text-display-lg);    /* 60px */
  font-weight: var(--font-bold);         /* 700 */
  line-height: var(--leading-snug);      /* 1.22 */
  color: var(--black);
  margin-bottom: 24px;
}

h2 {
  font-family: var(--font-display);
  font-size: var(--text-display-md);    /* 56px */
  font-weight: var(--font-demi);         /* 600 */
  line-height: var(--leading-tight);     /* 1.14 */
  color: var(--black);
}

h3 {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: var(--font-bold);         /* 700 */
  line-height: 1.08;                     /* tight */
  color: var(--black);
}

p {
  font-family: var(--font-body);
  font-size: var(--text-base);           /* 16px */
  font-weight: var(--font-regular);      /* 400 */
  line-height: var(--leading-normal);    /* 1.5 */
  color: var(--black);
}
```

## Spacing

Échelle 4-base :

| Token | Valeur |
|-------|--------|
| `--space-1` | `4px` |
| `--space-2` | `8px` (gap default éléments) |
| `--space-3` | `12px` |
| `--space-4` | `16px` (**gap default grid**) |
| `--space-6` | `24px` (padding cards) |
| `--space-8` | `32px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |
| `--space-20` | `80px` (**section padding large**) |
| `--space-32` | `128px` |

### Patterns observés

- **Padding cards** : `24px`
- **Section padding-y** : `80px` (default) / `64px` (medium) / `40px` (small)
- **Hero padding-y** : `160px` top / `44px` bottom
- **Grid gap** : `16px` partout
- **Element gap** : `8px` (icône + texte)

## Border-radius

| Token | Valeur | Usage |
|-------|--------|-------|
| `--radius-xs` | `4px` | Inputs petits |
| `--radius-sm` | `6px` | Badges |
| `--radius-md` | `8px` | Inputs |
| `--radius-lg` | `16px` | **Cards (DEFAULT 42 occurrences)** |
| `--radius-xl` | `24px` | Cards larges |
| `--radius-2xl` | `32px` | Cards XL |
| `--radius-pill` | `999px` | **Boutons (signature)** |
| `--radius-full` | `9999px` | Pills extrême |
| `--radius-circle` | `50%` | Avatars, icônes circulaires |

**Pattern signature** :
- `16px` pour cards (42 occurrences mesurées)
- `999px` pour CTAs (34 occurrences mesurées)
- Le DS **évite** les radius moyens (12px, 20px) — alternance doux/extreme

## Shadows

3 variations seulement (philosophie "shadows quasi-invisibles, les borders délimitent") :

| Token | CSS | Usage |
|-------|-----|-------|
| `--shadow-card` | `0 1px 10px rgba(0, 0, 0, 0.06)` | **Default cards** (25 occurrences) |
| `--shadow-elevated` | `0 1px 16px rgba(0, 0, 0, 0.08)` | Cards "elevated" (6 occurrences) |
| `--shadow-subtle` | `0 1px 10px rgba(0, 0, 0, 0.05)` | Variante légère |

**Caractéristiques** :
- Toujours `y: 1px` (pas d'offset vertical)
- Blur `10-16px` doux
- Opacity `5-8%` — très subtil
- Aucun spread, aucune shadow colorée

## Containers

| Token | Valeur | Usage |
|-------|--------|-------|
| `--container-regular` | `1120px` | **Container DEFAULT** |
| `--container-navbar` | `1408px` | Navbar plus large |
| `--container-padding-x` | `16px` | Gutter mobile |

## Transitions

```css
--transition-default: all 0.3s ease;        /* Webflow legacy — NE PAS utiliser */
--transition-bg: background-color 0.2s ease;
--transition-transform: transform 0.2s ease;
--transition-shadow: box-shadow 0.2s ease;
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
```

**Règle** : préférer transitions explicites (background, transform, shadow) plutôt que `all`.

## Variables CSS prêtes-à-coller

Toutes ces valeurs sont déjà dans `assets/tokens.css` (88 variables). Le fichier est prêt à être copié dans `front/src/styles/tokens.css`.
