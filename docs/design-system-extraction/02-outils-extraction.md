# 02 — Outils d'Extraction

> Stack technique Nopillo : du manuel rapide (Whatfont) a l'automatise complet (Dembrandt + Claude Code).

---

## 1. Vue d'Ensemble du Stack

```
+-------------------+   +---------------------+   +----------------------+
|  AUDIT VISUEL     |-->|  EXTRACTION AUTO    |-->|  CURATION CLAUDE     |
|  (manuel rapide)  |   |  (CLI + Playwright) |   |  (Opus, semantique)  |
+-------------------+   +---------------------+   +----------------------+
        |                       |                          |
        v                       v                          v
  Whatfont                Dembrandt                Webflow Variables
  ColorZilla              designlang               Webflow MCP
  CSS Peeper              extract-design-system    Variable Importer
  Chrome DevTools         Project Wallace
```

Chaque outil a un cas d'usage precis. On combine, on ne remplace pas.

---

## 2. Niveau 1 — Audit Visuel Manuel (5-15 min)

### 2.1 Chrome DevTools (gratuit, integre)

Ouvrir DevTools (`Cmd+Opt+I`), inspecter un element, onglet "Computed" pour voir les valeurs CSS resolues. Color picker integre (`Cmd+Shift+C`). Depuis Chrome 113+ panneau "CSS Variables" liste toutes les `--var-*` du site.

**Workflow rapide** :
1. Inspecter le H1 → `font-family`, `font-size`, `line-height`, `font-weight`, `color`
2. Inspecter un bouton primary → `background`, `border-radius`, `padding`, `box-shadow`
3. Onglet "Computed" → filtre "color" pour voir tous les colors utilises
4. Console : `getComputedStyle(document.body).getPropertyValue('--primary')` pour lire une variable

### 2.2 Extensions Chrome (audit rapide)

| Extension | Ce qu'elle extrait | Particularite |
|---|---|---|
| **WhatFont** | family, size, weight, line-height, color, source (Google/Adobe) | 1 clic, hover element, tooltip |
| **ColorZilla** | hex/rgb/hsl/css, page palette, gradient stops | Eyedropper + analyzer |
| **CSS Peeper** | Couleurs groupees, fonts, spacings, radius, export CSS | Sidebar visuelle organisee |
| **Eye Dropper** | Color picker simple | Alternative ColorZilla |
| **DesignTap** | Picker, fonts, palettes, exports multi-formats | Webapp + extension |

Limites communes : 1 element a la fois, pas d'export en masse. Cas d'usage : audit en debut de mission pour estimer la richesse du DS.

---

## 3. Niveau 2 — Audit CSS Automatise

### 3.1 Project Wallace

**URL** : `projectwallace.com/analyze-css`

Analyse via URL ou upload CSS. Genere : SLOC, taille moyenne des regles, count selecteurs, specificite max et commune, complexite globale, frequence des unites, count de @media. Outil dedie "Design Tokens" extrait colors, font-sizes, shadows, custom properties. Audit Code Quality avec score. API + CLI + CI hookable.

```bash
npm install -g @projectwallace/css-analyzer
wallace-cli https://stripe.com > stripe-audit.json
```

**Cas d'usage** : mesurer la sante CSS (specificite > 30 et 800 selecteurs => DS incoherent), trouver les couleurs/fonts les plus utilisees (= les vrais tokens), ignorer les valeurs orphelines (1 fois = pas un token).

### 3.2 Design Token Extractor (Chrome extension)

1 clic, export tokens JSON / CSS / TypeScript / Tailwind. Limite : moins puissant que CLI Playwright (lit le DOM accessible, pas les styles dynamiques).

---

## 4. Niveau 3 — Extraction Auto Complete (CLI + Playwright)

### 4.1 Dembrandt — la reference open source

**URL** : `github.com/dembrandt/dembrandt`

**Categories extraites (7)** : Colors (avec confidence scoring high/medium/low : logo > nav > generic UI), Typography (families, sizes, weights, sources), Spacing (margin/padding scales), Borders (radius, width, style, color), Shadows, Components (buttons, badges, inputs, links avec computed styles), Breakpoints.

**Stack** : Playwright (Chromium par defaut, Firefox optionnel), anti-detection bypass bots, extraction des computed DOM styles (pas des feuilles CSS brutes), timing "8s initial + 4s stabilization" pour SPA JS-lourds.

**CLI** :
```bash
# Basique
npx dembrandt example.com

# Multi-pages avec sitemap
dembrandt example.com --pages 10 --sitemap

# Dark mode + mobile viewport
dembrandt example.com --dark-mode --mobile

# Firefox + timeout etendu
dembrandt example.com --browser=firefox --slow

# Suite complete : DTCG + brand guide PDF + DESIGN.md + JSON
dembrandt example.com --dtcg --brand-guide --design-md --save-output
```

**Sorties** : `output/example.com/YYYY-MM-DDTHH-MM-SS.json` (JSON brut), `*.tokens.json` (W3C DTCG, compatible Style Dictionary), `brand-guide.pdf` (resume visuel), `DESIGN.md` (texte plain pour LLM).

**MCP integration** :
```bash
claude mcp add --transport stdio dembrandt -- npx -y dembrandt-mcp
```

7 fonctions exposees : `get_design_tokens`, `get_color_palette`, `get_typography`, `get_component_styles`, `get_surfaces`, `get_spacing`, `get_brand_identity`.

**Recommandation Nopillo** : outil par defaut.

### 4.2 designlang — option premium

**URL** : `designlang.vercel.app`

**Differenciateurs** : 17+ fichiers de sortie, 3 layers (primitive/semantic/composite), multi-plateforme (Tailwind v4, Figma Variables JSON light/dark, shadcn/ui theme CSS, CSS custom properties, motion tokens, composant anatomy en TSX), crawl jusqu'a 5000 noeuds DOM avec 25+ proprietes par noeud, capture inline SVG + font sources + image metadata, WCAG 2.1 scoring (ratios contraste fg/bg) + a11y remediation (couleurs proches passant AA/AAA), design grading lettre A-F sur 7 categories.

**CLI** :
```bash
npx designlang https://stripe.com           # Extraction complete
npx designlang grade https://stripe.com     # Report card
npx designlang grade https://stripe.com --badge  # SVG badge
npx designlang remix https://stripe.com --as cyberpunk  # Restyle
npx designlang battle stripe.com linear.app # Comparaison
npx designlang mcp                          # Lance MCP server
```

MCP compatible Claude Code, Cursor, Windsurf. **Cas d'usage Nopillo** : projets avec besoin Figma + Webflow simultane.

### 4.3 extract-design-system (skill Claude)

**URL** : `github.com/arvindrk/extract-design-system`. Format skill installable : `npx skills add arvindrk/extract-design-system`.

Categories : colors, typography, spacing, border-radius, shadows. Sorties : `.extract-design-system/raw.json`, `.extract-design-system/normalized.json`, `design-system/tokens.json` (W3C), `design-system/tokens.css` (custom properties).

```
"Extract the design system from https://linear.app and generate starter token files for this project."
```

**Cas d'usage** : workflow Claude Code natif avec output local au projet.

### 4.4 design-extract (Manavarya09)

**URL** : `github.com/Manavarya09/design-extract`

DTCG + semantic + primitive + composite. MCP server natif Claude Code/Cursor/Windsurf. Multi-platform emitters (iOS SwiftUI, Android Compose, Flutter, WordPress) + Tailwind v4 + Figma Variables + shadcn/ui. CSS health audit + WCAG remediation. Chrome extension companion. **Cas d'usage** : projets multi-plateformes (rare chez Nopillo, principalement Webflow).

### 4.5 Brandfetch

**URL** : `brandfetch.dev`. Extrait colors, typography, spacing, component styles. Export JSON/Markdown. API SaaS plutot qu'outil dev. **Cas d'usage** : recherche rapide d'identite de marque (logo, palette officielle) plus que DS technique.

---

## 5. Matrice de Decision

| Besoin | Outil prioritaire | Fallback |
|---|---|---|
| Curiosite rapide sur 1 element | Whatfont + ColorZilla | DevTools Computed |
| Audit qualite CSS source | Project Wallace | CSS Peeper |
| Extraction complete pour Webflow | Dembrandt | designlang |
| Extraction multi-plateforme | designlang | design-extract |
| Workflow Claude Code natif | extract-design-system OR design-extract MCP | Dembrandt + manuel |
| Identite de marque rapide | Brandfetch | Site officiel + DevTools |
| Site protege anti-bot | Dembrandt `--browser=firefox --slow` | DevTools manuel |

---

## 6. Pre-requis Locaux Nopillo

```bash
# Node 20+
node --version

# Outils principaux
npm install -g @projectwallace/css-analyzer
npx dembrandt --help     # Premier appel telecharge Chromium
npx designlang --help

# Claude Code skill
npx skills add arvindrk/extract-design-system

# MCP Dembrandt (recommande pour pipeline)
claude mcp add --transport stdio dembrandt -- npx -y dembrandt-mcp

# Chrome extensions (manuel via Web Store) : WhatFont, ColorZilla, CSS Peeper, Design Token Extractor
```

---

## 7. Limites Communes a TOUS les Outils

1. **Sites generes 100% canvas/WebGL** (ex: certaines landings Awwwards) : aucun CSS exploitable
2. **Sites lourdement minifies/obfusques** : variables renommees `--a`, `--b`, perdent toute semantique
3. **Sites Server Side avec CSS-in-JS** (Vercel, Linear) : OK mais besoin de Playwright pour resoudre les classes hashees
4. **Cloudflare strict / Datadome** : anti-bot bloque les CLI, utiliser Firefox engine ou DevTools manuel
5. **Sites a contenu derriere auth** : besoin de cookies/login, aucun outil auto ne le gere bien

---

## Sources

- [Dembrandt GitHub](https://github.com/dembrandt/dembrandt) — outil reference open source pour extraction DS
- [designlang.vercel.app](https://designlang.vercel.app/) — CLI premium 17+ outputs, MCP, WCAG scoring
- [extract-design-system skill](https://github.com/arvindrk/extract-design-system) — skill Claude Code natif
- [Project Wallace CSS Analyzer](https://www.projectwallace.com/analyze-css) — audit qualite CSS source
- [@projectwallace/css-analyzer (npm)](https://www.npmjs.com/package/@projectwallace/css-analyzer) — CLI installable
- [Brandfetch](https://brandfetch.dev/) — API SaaS identite de marque

## Suivant

- [03-tokens-extraction.md](./03-tokens-extraction.md) — Quels tokens, comment les structurer
- [04-workflow-claude-code.md](./04-workflow-claude-code.md) — Pipeline Claude Code complet
