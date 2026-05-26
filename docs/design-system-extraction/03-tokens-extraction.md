# 03 — Categories de Tokens a Extraire

> Quels tokens chercher, comment les organiser en couches, et le format DTCG standard W3C.

---

## 1. Le Modele en 3 Couches (DTCG)

Le standard W3C Design Tokens Community Group definit 3 couches.

**Couche 1 — Primitive** : valeurs brutes sans contexte. La "palette de peinture".
**Couche 2 — Semantic** : reference une primitive avec un nom d'usage. Tokens utilises dans les composants.
**Couche 3 — Component** : reference un semantic pour un composant precis. Optionnel chez Nopillo (Webflow gere via classes).

```json
// PRIMITIVE
{
  "color": {
    "blue": {
      "50":  { "$value": "#EFF6FF", "$type": "color" },
      "500": { "$value": "#3B82F6", "$type": "color" },
      "900": { "$value": "#1E3A8A", "$type": "color" }
    }
  },
  "size": {
    "1": { "$value": "4px",  "$type": "dimension" },
    "4": { "$value": "16px", "$type": "dimension" },
    "8": { "$value": "32px", "$type": "dimension" }
  }
}

// SEMANTIC
{
  "color": {
    "background": { "primary": { "$value": "{color.blue.500}", "$type": "color" } },
    "text":       { "default": { "$value": "{color.gray.900}", "$type": "color" } }
  },
  "spacing": {
    "section":    { "$value": "{size.16}", "$type": "dimension" },
    "card-inner": { "$value": "{size.6}",  "$type": "dimension" }
  }
}

// COMPONENT
{
  "button": {
    "primary": {
      "background":    { "$value": "{color.background.primary}" },
      "padding-x":     { "$value": "{size.6}" },
      "border-radius": { "$value": "{radius.md}" }
    }
  }
}
```

---

## 2. Couleurs

### 2.1 Ce qu'on cherche

| Type | Quoi extraire | Exemple |
|---|---|---|
| Neutres | Echelle gris (5-11 valeurs) | `#FAFAFA #F4F4F5 ... #18181B` |
| Brand | 1 couleur principale + variantes (50-900) | `#3B82F6` + 9 shades |
| Accent | 1-3 couleurs de support | rose / vert / orange |
| Semantic | success/warning/error/info | `#10B981 #F59E0B #EF4444 #3B82F6` |
| Background | surface, elevated, inverse | `#FFFFFF #FAFAFA #18181B` |
| Foreground | text default, muted, disabled, inverse | 4-5 valeurs |
| Border | default, hover, focus | 2-4 valeurs |

### 2.2 Comment les detecter

**Auto** (Dembrandt confidence scoring) : Logo SVG → couleur brand high-confidence. Navigation → couleurs frequentes. Buttons primary/secondary → semantic background + foreground. Cards/sections backgrounds → surfaces. Body text → text default. Liens → text primary.

**Manuel** (DevTools Computed) :
1. Inspecter H1 → `color` = text default
2. Inspecter `<a>` → `color` = brand primary
3. Inspecter `body` → `background-color` = surface base
4. Inspecter une carte → `background-color` = surface elevated
5. Comparer 5 boutons primary → couleur identique = vraie variable

### 2.3 Anti-pattern

NE PAS extraire : couleurs presentes 1 seule fois (ad hoc), couleurs avec opacite differente comme tokens distincts (token = couleur + opacite separes), couleurs des images/photos.

### 2.4 Output type Nopillo

```css
/* Primitives */
--color-neutral-50:  #FAFAFA;  --color-neutral-900: #18181B;
--color-brand-500:   #3B82F6;  --color-success-500: #10B981;

/* Semantic */
--color-bg-base:        var(--color-neutral-50);
--color-bg-surface:     #FFFFFF;
--color-bg-inverse:     var(--color-neutral-900);
--color-text-default:   var(--color-neutral-900);
--color-text-muted:     var(--color-neutral-500);
--color-text-on-brand:  #FFFFFF;
--color-border-default: var(--color-neutral-200);
```

---

## 3. Typographie

### 3.1 Ce qu'on cherche

| Element | Quoi extraire |
|---|---|
| Font families | Sans-serif body, serif/display headings, monospace code |
| Font sources | Google Fonts, Adobe, self-hosted, system stack |
| Font sizes | Echelle complete (8-12 paliers) |
| Font weights | Set utilise (regular, medium, semibold, bold) |
| Line heights | Par taille (titres serres, body aere) |
| Letter spacings | Par taille (titres souvent negatifs) |
| Text styles | Combinaisons completes (h1, h2, body, caption) |

### 3.2 Echelles typo communes

| Ratio | Sequence | Reference |
|---|---|---|
| 1.25 (Major Third) | 12, 14, 18, 22, 28, 36, 44, 56, 72 | Modulaire |
| 1.333 (Perfect Fourth) | 12, 14, 18, 24, 32, 42, 56, 75 | Modulaire |
| 1.5 (Perfect Fifth) | 12, 14, 21, 32, 47, 71, 107 | Modulaire |
| Heuristique Nopillo | 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 80, 96 | Pragmatique |

Identifier l'echelle = trouver le ratio entre 2 tailles consecutives.

Detection auto (Dembrandt, designlang) : `font-family`, `font-size` (px ou rem normalise), `font-weight` (numerique 100-900), `line-height` (souvent unitless 1.2-1.6), `letter-spacing` (em ou px), `font-variation-settings` pour variable fonts.

### 3.3 Output type Nopillo

```css
/* Primitives — families */
--font-sans:   "Inter", "Inter Tight", system-ui, sans-serif;
--font-serif:  "Tiempos Headline", Georgia, serif;
--font-mono:   "JetBrains Mono", "SF Mono", monospace;

/* Primitives — sizes */
--font-size-xs: 12px;  --font-size-sm: 14px;  --font-size-base: 16px;
--font-size-lg: 18px;  --font-size-xl: 24px;  --font-size-2xl: 32px;
--font-size-3xl: 48px; --font-size-4xl: 64px; --font-size-5xl: 96px;

/* Primitives — weights */
--font-weight-normal: 400; --font-weight-medium: 500;
--font-weight-semibold: 600; --font-weight-bold: 700;

/* Semantic — text styles */
--text-h1-size: 96px; --text-h1-weight: 700;
--text-h1-line-height: 1.05; --text-h1-letter-spacing: -0.04em;

--text-body-size: 16px; --text-body-weight: 400;
--text-body-line-height: 1.6; --text-body-letter-spacing: 0;
```

### 3.4 Anti-pattern

Reproduire une font payante (Sohne, Tiempos, GT Walsheim) sans verifier la licence. Extraire 30 tailles differentes (reduire a 8-10 max). Mixer rem et px sans normaliser.

---

## 4. Spacing

99% des DS modernes utilisent une echelle base 4 ou base 8. Detecter la base : examiner les paddings/margins frequents et trouver le PGCD.

| Base | Sequence | Usage |
|---|---|---|
| 4 (Tailwind, Material) | 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 | Defaut |
| 8 (Apple HIG, plus rares) | 0, 8, 16, 24, 32, 48, 64, 96, 128 | Rythme plus large |

| Categorie | Usage | Echelle typique |
|---|---|---|
| Inset (padding) | Interieur des composants | 4-32px |
| Stack (margin vertical) | Espace entre elements verticaux | 8-128px |
| Inline (margin horizontal) | Espace entre elements horizontaux | 4-32px |
| Layout | Sections de page | 64-256px |

```css
/* Primitives — base 4 */
--space-0: 0;
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 20px;  --space-6: 24px;  --space-8: 32px;  --space-10: 40px;
--space-12: 48px; --space-16: 64px; --space-20: 80px; --space-24: 96px;
--space-32: 128px;

/* Semantic */
--space-card-inner:    var(--space-6);   /* 24 */
--space-card-gap:      var(--space-4);   /* 16 */
--space-section-y:     var(--space-24);  /* 96 */
--space-page-padding:  var(--space-6);   /* 24 mobile */
```

---

## 5. Border Radius

Trois familles d'approche : **Sharp** (Linear, Vercel) 4px partout, parfois 6 ou 8 max. **Soft** (Stripe) 4, 8, 12, 16. **Pill** (Apple modern, Notion) 8, 12, 16, 24, 9999 (full).

```css
--radius-none: 0;
--radius-sm:   2px;
--radius-md:   4px;
--radius-lg:   8px;
--radius-xl:   12px;
--radius-2xl:  16px;
--radius-3xl:  24px;
--radius-full: 9999px;
```

---

## 6. Shadows

Pattern moderne : layered shadows. Les DS premium superposent 2-3 ombres pour une profondeur subtile.

```css
/* Pattern Stripe-like */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.05);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.05);
```

Detection : Dembrandt extrait `box-shadow` brut. Toujours verifier avec DevTools si l'ombre est composee (multi-layers).

---

## 7. Motion & Breakpoints

| Token | Exemple |
|---|---|
| Durations | 100ms (instant), 200ms (fast), 300ms (default), 500ms (slow) |
| Easings | `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out), `cubic-bezier(0, 0, 0.2, 1)` (decelerate) |
| Springs | rare en CSS, plus en framer-motion |

```css
--duration-fast:    150ms;
--duration-default: 250ms;
--duration-slow:    400ms;
--ease-out:        cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:     cubic-bezier(0.65, 0, 0.35, 1);

/* Breakpoints standards (Webflow alignes) */
--bp-sm:  640px;   /* mobile L */
--bp-md:  768px;   /* tablet */
--bp-lg:  1024px;  /* laptop */
--bp-xl:  1280px;  /* desktop */
--bp-2xl: 1536px;  /* wide */
```

designlang extrait les motion tokens nativement. Webflow a ses breakpoints natifs (Mobile / Mobile L / Tablet / Desktop) qu'on aligne.

---

## 8. Recap : Checklist Token

Pour chaque DS aspire, livrer au client :

- [ ] Palette neutre (5-11 valeurs)
- [ ] Brand color + variantes (50-900)
- [ ] Couleurs semantic background, text, border
- [ ] Couleurs semantic success/warning/error/info
- [ ] Font families (1-3 max)
- [ ] Font sizes (8-10 valeurs)
- [ ] Font weights (3-5 valeurs)
- [ ] Text styles complets H1-H6 + body + caption
- [ ] Spacing base 4 ou 8 (10-15 valeurs)
- [ ] Border radius (5-7 valeurs incluant full)
- [ ] Shadows (4-6 niveaux d'elevation)
- [ ] Motion durations + easings
- [ ] Breakpoints alignes Webflow

---

## Sources

- [W3C Design Tokens Format Module](https://www.designtokens.org/tr/drafts/format/) — standard DTCG officiel pour les 3 couches
- [Material Design 3 Tokens](https://m3.material.io/foundations/design-tokens) — modele primitive/semantic/component
- [USWDS Design Tokens](https://designsystem.digital.gov/design-tokens/) — exemple gouvernemental complet
- [Tokens in Design Systems (Nathan Curtis)](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421) — fondation conceptuelle
- [Penpot dev guide to tokens](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) — implementation CSS variables
- [Theming with design tokens (Webflow)](https://webflow.com/blog/theming-design-tokens) — adaptation Webflow

## Suivant

- [04-workflow-claude-code.md](./04-workflow-claude-code.md) — Pipeline d'execution complet
- [05-import-webflow.md](./05-import-webflow.md) — Import dans Webflow
