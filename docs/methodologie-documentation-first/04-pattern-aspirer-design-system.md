# 04 — Pattern : Aspirer un design system

> Workflow concret pour extraire le design system d'un site reference (concurrent, inspiration, client) et le transformer en tokens reutilisables dans Webflow / CSS / autre.

## Pourquoi ce pattern

Cas types :
- "Notre client veut une landing dans le style de [site reference]"
- "On a aime ce composant chez [concurrent], on veut s'en inspirer"
- "On rebrand : aspirer le DS du nouveau guideline visuel"
- "Construire le DS Nopillo a partir d'observations du marche"

Sans methode : 1-2 jours de "pifometre" + iterations.
Avec methode : 30 min pour aspirer tokens, 1h pour reproduire composants.

## Workflow en 5 etapes

```
[1] CAPTURER         [2] EXTRAIRE         [3] FORMALISER
URL/screenshot       Tokens automatique   tokens.css
     |                      |                    |
     v                      v                    v
[4] REPRODUIRE      [5] CAPITALISER
Composants Webflow   docs/ds-[ref]/
```

## Etape 1 — Capturer (5 min)

### Inputs necessaires

- URL du site (acces public ou login si fourni)
- 5-10 screenshots des pages cles : home, produit, footer, form, modal
- Si possible : devTools open + capture des CSS variables

### Commande type

```
/doc-maker aspirer DS [site] :
URL : [url]
Pages cibles : home, produit, pricing, contact, footer
Mode : extraction CSS variables + analyse visuelle
Sortie : docs/ds-[ref]/raw/
```

## Etape 2 — Extraire les tokens (10 min)

Le doc-maker doit produire un dump structure :

### Tokens couleur

```markdown
# Tokens couleur — [Site]

## Primary
- primary-50  : #F0F9FF
- primary-100 : #E0F2FE
- primary-500 : #0EA5E9   <- couleur principale
- primary-700 : #0369A1
- primary-900 : #0C4A6E

## Neutral
- gray-50  : #F9FAFB
- gray-100 : #F3F4F6
- gray-500 : #6B7280
- gray-900 : #111827

## Semantic
- success : #10B981
- warning : #F59E0B
- error   : #EF4444
- info    : #3B82F6
```

### Tokens typo

```markdown
# Tokens typo — [Site]

## Familles
- font-display : 'Inter', sans-serif
- font-body    : 'Inter', sans-serif
- font-mono    : 'JetBrains Mono', monospace

## Tailles (rem base 16px)
- xs   : 0.75rem (12px)
- sm   : 0.875rem (14px)
- base : 1rem (16px)
- lg   : 1.125rem (18px)
- xl   : 1.25rem (20px)
- 2xl  : 1.5rem (24px)
- 3xl  : 1.875rem (30px)
- 4xl  : 2.25rem (36px)
- 5xl  : 3rem (48px)

## Poids
- light    : 300
- regular  : 400
- medium   : 500
- semibold : 600
- bold     : 700

## Line-heights
- tight   : 1.25
- normal  : 1.5
- relaxed : 1.75
```

### Tokens espacement / radius

```markdown
# Spacing scale (rem base 16px)
- 1 : 0.25rem (4px)
- 2 : 0.5rem (8px)
- 3 : 0.75rem (12px)
- 4 : 1rem (16px)
- 6 : 1.5rem (24px)
- 8 : 2rem (32px)
- 12 : 3rem (48px)
- 16 : 4rem (64px)

# Border radius
- sm   : 0.25rem
- md   : 0.5rem
- lg   : 0.75rem
- xl   : 1rem
- full : 9999px

# Shadows
- sm  : 0 1px 2px rgba(0,0,0,0.05)
- md  : 0 4px 6px rgba(0,0,0,0.1)
- lg  : 0 10px 15px rgba(0,0,0,0.1)
- xl  : 0 20px 25px rgba(0,0,0,0.15)
```

## Etape 3 — Formaliser en tokens.css (5 min)

Sortie standardisee :

```css
/* tokens.css — DS [Site] aspire */
:root {
  /* Couleurs primary */
  --color-primary-50:  #F0F9FF;
  --color-primary-500: #0EA5E9;
  --color-primary-700: #0369A1;

  /* Typo */
  --font-display: 'Inter', sans-serif;
  --text-base: 1rem;
  --text-lg: 1.125rem;

  /* Spacing */
  --space-4: 1rem;
  --space-8: 2rem;

  /* Radius */
  --radius-md: 0.5rem;

  /* Shadows */
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
```

Aussi disponible en :
- Tailwind config (`tailwind.config.js` extend.theme)
- Webflow Variables (style guide page)
- Figma Variables (export JSON)
- Style Dictionary (output multi-formats)

## Etape 4 — Reproduire des composants (1h)

Avec les tokens en main, reproduire les composants cles :

### Composants type a reproduire

| Composant | Effort | Priorite |
|-----------|--------|----------|
| Bouton primary / secondary / tertiary | 15 min | 1 |
| Card (image + titre + texte + CTA) | 20 min | 1 |
| Form input (text, select, textarea) | 20 min | 1 |
| Hero section (titre + sub + CTA + visuel) | 30 min | 2 |
| Footer | 30 min | 2 |
| Modal | 20 min | 3 |
| Navigation desktop + mobile | 45 min | 3 |

### Pattern de reproduction Webflow MCP

```
Use Webflow MCP : dans le site [siteId], page "/style-guide" :
cree les composants ci-dessous avec les tokens du fichier tokens.css aspire :
- Button primary (taille md, label "Action")
- Button secondary
- Card avec image cover, titre H3, texte, CTA
- Form input (text, label, helper)

Ces composants doivent etre reutilisables (design library).
Sortie : URL preview style-guide.
```

## Etape 5 — Capitaliser (10 min)

### Structure docs/ds-[ref]/

```
docs/ds-[ref]/
├── _index.md              # Vue d'ensemble + screenshots
├── 01-tokens-couleur.md
├── 02-tokens-typo.md
├── 03-tokens-spacing.md
├── 04-composants/
│   ├── button.md
│   ├── card.md
│   ├── form.md
│   └── ...
├── tokens.css             # Fichier CSS prêt a coller
├── tokens.json            # Format JSON (Style Dictionary)
└── sources.md
```

### Reusable

Le DS aspire est ensuite reutilisable :
- Pour des projets clients du meme vertical/style
- Pour comparer plusieurs DS et choisir
- Pour benchmarker le DS Nopillo

## Skills Nopillo a creer

| Skill | Effet |
|-------|-------|
| `/extract-design-system [url]` | Lance le workflow complet etapes 1-3 |
| `/reproduce-component [url] [type]` | Reproduit un composant specifique en Webflow |
| `/compare-ds [ds-a] [ds-b]` | Compare 2 DS aspires (tableaux + diff) |

## Pieges

| Piege | Fix |
|-------|-----|
| CSS dynamique JS non capture | Capture screenshots manuels en plus |
| Variables CSS non exposees | Inspecter computed styles, pas just :root |
| Couleurs avec opacity variable | Capter rgba avec alpha explicite |
| Typo via @font-face local | Identifier nom + chercher equivalent web safe |
| Composants images svg integres | Capter SVG inline + tokeniser |

## Anti-pattern : aspirer 100% sans adaptation

Aspirer un DS = **point de depart**, pas livrable final.
Toujours adapter au client :
- Renommer les tokens (--color-primary-500 vs --brand-blue-medium)
- Ajuster pour brand client (pas copier-coller)
- Documenter ce qui a ete change vs source

## ROI mesure

| Methode | Temps | Qualite tokens | Reproduction |
|---------|-------|----------------|--------------|
| Manuel (pifometre) | 1-2 jours | Variable | Approximative |
| Manuel + DevTools | 4-6h | Bonne | Bonne |
| **Pattern aspirer DS** | **30 min + 1h compo** | **Excellente** | **Fidele** |

Gain : x10 sur le temps, qualite tokens objective et documentee.

## Cas d'usage Nopillo

- DS Stripe pour landing pricing
- DS Linear pour landing produit B2B
- DS Apple pour landing premium DTC
- DS Notion pour landing collaboration

A chaque fois : tokens en main en 30 min, composants en 1h.

## Sources

- `docs/formation-nopillo/03-methodologie-formateur.md` — pattern dans le manifeste
- `docs/cdc-claude-code-audit/04-architecture.md` — MCP Webflow capacities
- Style Dictionary doc (https://styledictionary.com) — format tokens standard
