# 04 — Workflow Claude Code

> Pipeline complet d'aspiration de DS via Claude Code, prompts type, integration MCP Chrome et Dembrandt.

---

## 1. Vue d'Ensemble Pipeline

```
[1] Setup projet Claude Code
[2] Aspiration brute (Dembrandt CLI ou MCP)         → tokens.json + DESIGN.md
[3] Audit visuel complementaire (Chrome MCP)        → screenshots verification
[4] Curation Claude Opus (renommage, debruitage)    → tokens-curated.json
[5] Adaptation client (palette client substituee)   → tokens-final.json
[6] Export Webflow-ready (CSS variables)            → webflow-import.css
[7] Import Webflow Variables (app ou MCP)
```

---

## 2. Setup Initial du Projet

### 2.1 Structure dossier recommandee

```
mon-client-webflow/
├── .claude/settings.json
├── design-system/
│   ├── source/           # Brut Dembrandt + screenshots
│   ├── curated/          # tokens-curated.json + decisions.md
│   ├── final/            # tokens-final.json + webflow-import.css
│   └── README.md
├── docs/brief-client.md
└── CLAUDE.md
```

### 2.2 CLAUDE.md a la racine

```markdown
# Projet : Client Acme — Refonte Webflow

## Contexte
- Brief : refonte landing inspiree de Linear + Stripe
- Stack : Webflow (variables + components)
- Identite client : bleu turquoise #0EA5E9 + neutres chauds

## References sources
- linear.app (DS principal a aspirer)
- stripe.com (patterns de section)

## Regles
- Toute aspiration passe par design-system/source/
- Curation manuelle par Claude Opus avant import
- Aucune copie 1:1 : adaptation systematique aux couleurs client
```

### 2.3 MCP Servers necessaires

```bash
claude mcp add --transport stdio webflow -- npx -y @webflow/mcp-server
claude mcp add --transport stdio chrome-devtools -- npx -y chrome-devtools-mcp
claude mcp add --transport stdio dembrandt -- npx -y dembrandt-mcp
claude mcp list  # verifier
```

---

## 3. Etape 1 — Aspiration Brute

**Option A — CLI direct (rapide)** :

```bash
cd design-system/source/
npx dembrandt linear.app --pages 5 --dtcg --brand-guide --design-md --save-output
```

Resultat dans `output/linear.app/[timestamp]/` : `linear.app.tokens.json` (DTCG), `linear.app.brand-guide.pdf`, `DESIGN.md`.

**Option B — Via Claude Code + MCP** :

```
Use the dembrandt MCP to extract the design system of linear.app.
Save the output to design-system/source/linear-raw.json.
Then read the file and summarize the key tokens (colors, typography, spacing) in a markdown table.
```

Claude execute via `mcp__dembrandt__get_design_tokens` puis Read + synthese.

**Site avec protection anti-bot** : si Dembrandt echoue (timeout, captcha) :

```bash
npx dembrandt linear.app --browser=firefox --slow --pages 3
```

Si encore KO : passage manuel via Chrome DevTools (etape 4).

---

## 4. Etape 2 — Audit Visuel via Chrome MCP

L'aspiration auto manque parfois des nuances visuelles : gradients, glassmorphism, micro-animations.

**Screenshot guide** :

```
Use chrome-devtools MCP to:
1. Open https://linear.app
2. Take screenshots of: hero (full viewport), pricing card (zoomed), nav bar, button hover state, footer
   → save to design-system/source/linear-screenshots/.
3. For each, describe: dominant colors (3-5 hex), typography (family if guessable, hierarchy),
   spacing (compact/spacious), special effects (gradients, blurs, borders, shadows).
```

**Inspection ciblee + extraction CSS variables** :

```
Use chrome-devtools MCP to navigate to https://linear.app and:
1. Find the primary CTA button — get computed styles (bg, color, padding, radius, shadow, font)
2. Find a card component — get computed styles
3. Output as a markdown table: element | property | value
4. Then run in console:
   JSON.stringify(Array.from(document.documentElement.style)
     .filter(p => p.startsWith('--'))
     .reduce((acc, p) => {
       acc[p] = getComputedStyle(document.documentElement).getPropertyValue(p).trim();
       return acc;
     }, {}), null, 2)
   → save to design-system/source/linear-css-vars.json.
```

---

## 5. Etape 3 — Curation Claude Opus

L'aspiration brute donne 200-500 tokens. Reduire a 50-80 tokens utiles.

```
Read design-system/source/linear-raw.json and design-system/source/linear-DESIGN.md.
Curate the design tokens:

1. COLORS: keep only colors used in 3+ contexts, group by family (neutrals, brand, semantic),
   rename to semantic names (color-bg-base, color-text-default), eliminate near-duplicates
   (#1a1a1a and #1c1c1c → keep one).
2. TYPOGRAPHY: detect font scale ratio (1.125, 1.25, 1.333?), max 8 sizes, max 4 weights,
   group line-heights (tight for headings, normal for body).
3. SPACING: detect base unit (4 or 8), snap to closest base multiple, max 12 values.
4. RADIUS: max 6 values + radius-full.
5. SHADOWS: max 5 elevation levels, preserve multi-layer.

Output as W3C DTCG JSON (3 layers: primitive, semantic, component) to
design-system/curated/tokens-curated.json. Also write decisions.md explaining choices.
```

Revue post-curation :

```
Read design-system/curated/tokens-curated.json. Challenge:
- Redundant tokens to merge?
- Naming consistent ({category}-{property}-{variant})?
- Spacing scale follows single base?
- Gaps in typography scale?

Suggest improvements as a diff in design-system/curated/review.md.
```

---

## 6. Etape 4 — Adaptation a l'Identite Client

C'est l'etape qui fait la difference entre "aspiration intelligente" et "copie".

```
Read design-system/curated/tokens-curated.json and docs/brief-client.md.

Client brand: Primary #0EA5E9 (turquoise), Accent #F97316 (orange), Neutrals warm (beige tint).

Adapt:
1. Replace source brand (Linear purple #5E6AD2) with client primary #0EA5E9
2. Generate full 50-900 scale for client primary via OKLCH interpolation
3. Swap cold gray scale → warm gray (zinc → stone in Tailwind terms)
4. Keep typography scale, spacing scale, shadows AS-IS (client requested patterns)
5. Adapt semantic tokens accordingly

Save to design-system/final/tokens-final.json + document adaptations.md.
```

Verification contraste :

```
Read design-system/final/tokens-final.json.
For every text-on-bg pair (text-default on bg-base, text-on-brand on bg-primary):
1. Compute WCAG contrast ratio → mark PASS-AAA / PASS-AA / FAIL
2. For FAIL, suggest nearest passing color from same family
Output design-system/final/contrast-audit.md.
```

---

## 7. Etape 5 — Export Webflow-Ready

```
Read design-system/final/tokens-final.json. Generate webflow-import.css:
1. All primitive + semantic tokens as :root CSS custom properties (semantic referencing primitives)
2. Naming kebab-case, prefix per category: --color-*, --font-*, --space-*, --radius-*, --shadow-*
3. Group by category with comments. Order semantic AFTER primitives.
This file will be imported into Webflow via the Variable Importer App.
```

Format final type :

```css
:root {
  /* === COLORS — PRIMITIVES === */
  --color-neutral-50: #FAFAF9; --color-neutral-900: #1C1917; --color-brand-500: #0EA5E9;

  /* === COLORS — SEMANTIC === */
  --color-bg-base:      var(--color-neutral-50);
  --color-text-default: var(--color-neutral-900);
  --color-bg-primary:   var(--color-brand-500);

  /* === TYPOGRAPHY === */
  --font-sans: "Inter Tight", system-ui, sans-serif;
  --font-size-base: 16px; --font-size-h1: 96px;

  /* === SPACING / RADIUS / SHADOWS === */
  --space-4: 16px; --space-8: 32px;
  --radius-md: 8px;
  --shadow-md: 0 4px 6px rgb(0 0 0 / 0.10);
}
```

---

## 8. Prompts Type Reutilisables

**Quick audit (5 min)** :

```
Use chrome-devtools MCP to visit [URL] and: list all :root CSS custom properties,
list the dominant 5 colors, list the font families loaded. Output as markdown table.
```

**Extraction complete autonome (20 min)** :

```
Aspirate the DS of [URL] for [project-name]:
1. dembrandt MCP → raw tokens to design-system/source/
2. chrome-devtools MCP → 5 screenshots (hero, card, button, nav, footer)
3. Curate to max 80 tokens, 3-layer DTCG
4. Adapt to client palette: primary [#hex], accent [#hex]
5. Generate webflow-import.css + summary report design-system/REPORT.md
```

**Comparaison de 2 sites** :

```
Aspirate both [URL-A] and [URL-B] with dembrandt MCP. Compare:
palette structure (more colors? warmer/cooler?), typography scale (ratio? weights?),
spacing base (4 or 8?), radius philosophy (sharp/soft?), shadow approach (flat/layered?).
Output markdown comparison table + recommend patterns to inspire from for our project.
```

**Audit qualite source** :

```
Bash: npx wallace-cli [URL] > audit.json
Read audit.json → report CSS quality score, unique colors/fonts/spacings, specificity max
(alert if > 30). Verdict: clean DS or mess to filter?
```

---

## 9. Bonnes Pratiques

1. **Separer source / curated / final** : source = brut jamais touche, curated = decision analyste, final = livre Webflow. Permet rollback sans relancer aspiration.
2. **Documenter chaque decision** dans `decisions.md` (pourquoi virer telle couleur, pourquoi garder tel pattern, pourquoi substituer).
3. **Versionner** : `git commit -m "DS aspiration v1: Linear → client X (curated)"`. Permet plusieurs variantes au client.
4. **Revue humaine obligatoire** sur contraste WCAG (technique + visuel), coherence brand client, faisabilite Webflow (gradients complexes ne passent pas en variables).

---

## Sources

- [Webflow MCP integration with Claude Code (Composio)](https://composio.dev/toolkits/webflow/framework/claude-code) — setup MCP officiel
- [Anthropic Claude + Webflow integration](https://webflow.com/integrations/anthropic-claude) — page integration
- [Webflow connector guide (Milan Kostic)](https://www.milankostic.com/blog/how-to-use-the-webflow-connector-in-claude-complete-guide) — workflow detaille
- [AI Website Cloner (Pasquale Pillitteri)](https://pasqualepillitteri.it/en/news/1528/ai-website-cloner-claude-code-skill-13000-stars-2026) — pipeline aspiration auto
- [Dembrandt GitHub](https://github.com/dembrandt/dembrandt) — outil d'extraction principal
- [Set up design system in Claude Design](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design) — best practices Anthropic

## Suivant

- [05-import-webflow.md](./05-import-webflow.md) — Import dans Webflow
- [07-skill-extract-design-system.md](./07-skill-extract-design-system.md) — Skill Claude Code dedie
