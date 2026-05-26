# Prompts type — `extract-design-system`

> Catalogue de prompts pre-ecrits a copier-coller (ou a passer en argument) pour chaque etape du pipeline. Variables a substituer notees `{{var}}`.

---

## 01 — Extraction brute (step 1)

```
You are extracting the raw design system from {{url}}.

1. Use mcp__dembrandt__get_design_tokens with url={{url}}.
2. Save the raw JSON to {{output}}/source/{{domain}}-raw.json.
3. Use mcp__dembrandt__get_color_palette and append to the JSON.
4. Use mcp__dembrandt__get_typography and append.
5. Use mcp__dembrandt__get_spacing and append.
6. Generate a brief summary in {{output}}/source/{{domain}}-DESIGN.md
   listing top 10 colors, fonts used, spacing base, radius approach.

If Dembrandt MCP fails, fall back to:
  Bash: npx dembrandt {{url}} --browser=firefox --slow --dtcg --design-md --save-output

Validate before continuing: JSON > 1KB, contient >= 5 colors, 3 font-sizes, 3 spacings.
```

---

## 02 — Audit visuel Chrome (step 2)

```
Use chrome-devtools MCP to:
1. Navigate to {{url}}
2. Take screenshots of: hero (full viewport), pricing card (zoomed), CTA button
   (with hover state), nav bar, footer.
   → save to {{output}}/source/screenshots/01-hero.png ... 05-footer.png
3. For each, describe in a markdown note: dominant colors (3-5 hex), typography
   (family if guessable + hierarchy), spacing (compact/spacious), special effects
   (gradients, blurs, borders, shadows).
4. Run in console:
   JSON.stringify(Array.from(document.documentElement.style)
     .filter(p => p.startsWith('--'))
     .reduce((acc, p) => {
       acc[p] = getComputedStyle(document.documentElement).getPropertyValue(p).trim();
       return acc;
     }, {}), null, 2)
   → save to {{output}}/source/{{domain}}-css-vars.json
```

---

## 03 — Curation Opus (step 3)

```
You are curating raw design tokens for production use in Webflow.

Inputs:
- {{output}}/source/{{domain}}-raw.json
- {{output}}/source/{{domain}}-DESIGN.md
- {{output}}/source/{{domain}}-css-vars.json

Apply strictly:

COLORS: group by family, dedupe (delta-E < 5), drop colors used in <3 contexts,
  generate semantic layer (bg-base, bg-surface, bg-inverse, text-default, text-muted,
  text-on-brand, border-default), max 50 colors total.

TYPOGRAPHY: detect modular ratio (1.125, 1.25, 1.333?), snap font-sizes to nearest
  scale step, max 8 font-sizes, max 4 weights, group line-heights (tight 1.0-1.2 for
  headings, normal 1.4-1.6 for body).

SPACING: detect base unit (4 or 8) via GCD of frequent values, snap to nearest base,
  max 12 values.

RADIUS: identify philosophy (sharp/soft/pill), max 6 values + radius-full.

SHADOWS: preserve multi-layer definitions, max 5 elevation levels.

Output:
- {{output}}/curated/tokens-curated.json (W3C DTCG, 3 layers: primitive, semantic, component)
- {{output}}/curated/decisions.md (explain every choice)

Validate before saving:
- 50-80 tokens total
- semantic references primitive via {alias}
- all names kebab-case
```

---

## 04 — Adaptation client (step 4)

```
You are adapting curated tokens to a client's brand identity.

Inputs:
- {{output}}/curated/tokens-curated.json
- Client brief from {{brief-file}} or user prompt

Required client info (ask if missing):
- primary brand color (hex)
- accent color (hex, optional)
- neutral temperature (warm | neutral | cool)
- font preferences (or "keep source")

Substitutions:
1. Replace source brand color with client primary
2. Generate full 50-900 scale using OKLCH interpolation:
   - 50: lightness 97%, chroma 0.02
   - 100-400: increase saturation
   - 500: client value
   - 600-900: decrease lightness, maintain chroma
3. If neutral temperature differs: cool → zinc/slate, neutral → neutral, warm → stone
4. Keep spacing, radius, shadows AS-IS (systemic patterns)
5. Update semantic tokens to reference new primitives

Output:
- {{output}}/final/tokens-final.json
- {{output}}/final/adaptations.md
- {{output}}/final/contrast-audit.md (WCAG AA check, every text/bg pair)

If a pair fails AA, suggest the nearest passing color from the same family and
BLOCK the pipeline until resolved.
```

---

## 05 — Export Webflow CSS (step 5)

```
Read {{output}}/final/tokens-final.json. Generate {{output}}/final/webflow-import.css:

1. All primitive + semantic tokens as :root CSS custom properties
   (semantic referencing primitives via var())
2. Naming kebab-case, prefix per category:
   --color-*, --font-*, --space-*, --radius-*, --shadow-*
3. Group by category with comments:
   /* === COLORS — PRIMITIVES === */
   /* === COLORS — SEMANTIC === */
4. Order semantic AFTER primitives.

This file will be imported into Webflow via Variable Importer App or Webflow MCP.

After writing, validate via:
  Bash: npx css-validator {{output}}/final/webflow-import.css
```

---

## 06 — Import Webflow (step 6)

```
Use the webflow MCP to import the design system from
{{output}}/final/tokens-final.json.

For each token in the JSON:
1. Determine the Webflow variable type (Color / Size / Font Family / Number)
2. Create the variable in the appropriate Collection:
   - Colors → "Colors" collection, in "Primitives" or "Semantic" folder
   - Sizes (spacing, radius) → "Spacing & Layout" collection
   - Font properties → "Typography" collection
3. For semantic tokens that reference primitives, create them as ALIASES
   (not hardcoded values)
4. Use kebab-case naming (color-brand-500, space-4, etc.)

After creation, write {{output}}/IMPORT-LOG.md listing all variables created
with their Collection/folder location.
```

---

## Comparaison 2 sites (`--compare`)

```
Aspirate both {{url-a}} and {{url-b}} with dembrandt MCP. Compare:
- palette structure (more colors? warmer/cooler?)
- typography scale (ratio? weights?)
- spacing base (4 or 8?)
- radius philosophy (sharp/soft/pill?)
- shadow approach (flat/layered?)

Output {{output}}/COMPARE.md with a markdown comparison table + recommend
patterns to inspire from for the project. Skip client adaptation.
```

---

## Quick audit (5 min)

```
Use chrome-devtools MCP to visit {{url}} and:
- list all :root CSS custom properties
- list the dominant 5 colors
- list the font families loaded
Output as a markdown table.
```

---

## Template REPORT.md (post-pipeline)

```markdown
# Aspiration DS — {{client-name}} inspire de {{source-domain}}

**Date** : {{date}} | **Source** : {{url}} | **Pipeline** : extract-design-system v1.0

## Tokens Extracted

| Categorie | Brut | Curated | Final |
|---|---|---|---|
| Colors | {{count-raw}} | {{count-curated}} | {{count-final}} |
| Typography | ... | ... | ... |
| Spacing | ... | ... | ... |
| Radius | ... | ... | ... |
| Shadows | ... | ... | ... |

## Adaptations Client

{{adaptations-summary}}

## Contraste WCAG

- AAA pass : {{aaa-count}} | AA pass : {{aa-count}} | FAIL : {{fail-count}}

## Webflow Import

Fichier : `{{output}}/final/webflow-import.css`
Methode : {{import-method}} (MCP auto | Variable Importer manuel)

## Prochaine Etape

{{next-action}}
```
