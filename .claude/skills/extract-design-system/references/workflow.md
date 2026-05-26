# Workflow `extract-design-system` — 6 etapes

> Pipeline complet d'aspiration de DS, du setup a l'import Webflow.

---

## Pre-checks (obligatoires avant step 1)

1. Lire `references/anti-patterns.md` — verifier les 5 questions de validation.
2. Confirmer que la source n'est pas un concurrent direct du client.
3. Si fonts payantes detectees dans la source (whitelist Sohne, GT Walsheim, Tiempos, Suisse, Founders, Apercu), preparer une alternative gratuite.
4. Verifier MCPs disponibles : `claude mcp list` doit lister `dembrandt`, `chrome-devtools`, `webflow`. Si absent, fallback CLI documente plus bas.

---

## STEP 1 — Setup & Extraction brute

**Objectif** : aspirer les tokens raw de la source.

**Actions** :

1. Creer la structure :
   ```
   [output]/
     source/
     curated/
     final/
   ```
2. Lancer `mcp__dembrandt__get_design_tokens(url)`.
3. Sauvegarder le JSON brut dans `source/[domain]-raw.json`.
4. Completer avec `mcp__dembrandt__get_color_palette`, `get_typography`, `get_spacing` et merger.
5. Generer `source/[domain]-DESIGN.md` : top 10 colors, fonts utilisees, spacing base, radius approach.

**Fallback CLI si MCP echoue** :
```bash
npx dembrandt [url] --browser=firefox --slow --dtcg --design-md --save-output
```

**Validation gate** :
- JSON > 1KB
- Au moins 5 colors, 3 font-sizes, 3 spacings detectes
- Sinon : alerter, basculer en audit manuel via Chrome (step 2 fait double office).

**Outputs** : `source/[domain]-raw.json`, `source/[domain]-DESIGN.md`.

---

## STEP 2 — Audit visuel (Chrome DevTools MCP)

**Objectif** : capturer les nuances visuelles que Dembrandt rate (gradients, glassmorphism, micro-anims).

**Actions** :

1. `mcp__chrome-devtools__navigate(url)`.
2. Screenshots de 5 elements cles dans `source/screenshots/` :
   - `01-hero.png` (full viewport)
   - `02-card.png` (zoom carte/pricing)
   - `03-button.png` (CTA + hover)
   - `04-nav.png` (nav bar)
   - `05-footer.png`
3. Pour chaque, decrire dominant colors (3-5 hex), typography hierarchy, spacing density, special effects (gradients, blurs, shadows).
4. Extraire les CSS variables `:root` via console :
   ```js
   JSON.stringify(Array.from(document.documentElement.style)
     .filter(p => p.startsWith('--'))
     .reduce((acc, p) => {
       acc[p] = getComputedStyle(document.documentElement).getPropertyValue(p).trim();
       return acc;
     }, {}), null, 2)
   ```
5. Sauvegarder en `source/[domain]-css-vars.json`.

**Outputs** : 5 PNGs + `[domain]-css-vars.json`.

---

## STEP 3 — Curation (Opus)

**Objectif** : reduire 200-500 tokens bruts a 50-80 tokens utiles, organises en 3 couches DTCG.

**Inputs** : `source/[domain]-raw.json`, `[domain]-DESIGN.md`, `[domain]-css-vars.json`.

**Regles strictes** (cf `prompts.md` 03-curate) :

| Categorie | Regle | Cap |
|---|---|---|
| Colors | Grouper par famille, deduper (delta-E < 5), virer celles utilisees < 3 contextes, generer semantic (bg-base, bg-surface, bg-inverse, text-default, text-muted, text-on-brand, border-default) | 50 |
| Typography | Detecter ratio modulaire (1.125, 1.25, 1.333), snap font-sizes au pas de la scale, grouper line-heights (tight 1.0-1.2 headings, normal 1.4-1.6 body) | 8 sizes, 4 weights |
| Spacing | Detecter base unit (4 ou 8) via PGCD des valeurs frequentes, snap au plus proche | 12 valeurs |
| Radius | Identifier la philo (sharp/soft/pill), inclure radius-full | 6 + full |
| Shadows | Preserver multi-layer | 5 elevations |

**Sortie** : DTCG 3 couches dans `curated/tokens-curated.json`.

```json
// PRIMITIVE
{ "color": { "blue": { "500": { "$value": "#3B82F6", "$type": "color" } } } }
// SEMANTIC (reference primitive via {alias})
{ "color": { "background": { "primary": { "$value": "{color.blue.500}", "$type": "color" } } } }
```

**Validation gate** :
- 50-80 tokens total
- Tous les semantic referencent des primitives via `{alias}` (no hardcode)
- Naming kebab-case partout
- Sinon : retour curation, alerter.

Generer `curated/decisions.md` expliquant chaque choix (pourquoi virer telle couleur, pourquoi snap a telle valeur).

---

## STEP 4 — Adaptation client (si `--client` set)

**Objectif** : substituer la palette source par celle du client tout en gardant les patterns systemiques.

**Inputs requis** (demander si manquant) :
- Primary brand color (hex)
- Accent color (hex, optionnel)
- Neutral temperature : `warm` / `neutral` / `cool`
- Font preferences (ou `keep source`)

**Substitutions** :

1. Replace source brand color par client primary.
2. Generer scale 50-900 via interpolation OKLCH :
   - 50 : lightness 97%, chroma 0.02
   - 100-400 : monter saturation
   - 500 : valeur client
   - 600-900 : baisser lightness, garder chroma
3. Si neutral temperature differe : `cool` -> zinc/slate, `neutral` -> neutral, `warm` -> stone.
4. Garder spacing, radius, shadows tels quels (patterns systemiques non-marqueurs).
5. Update les semantic tokens pour pointer vers les nouvelles primitives.

**Audit contraste WCAG** : pour chaque pair text/bg :
- PASS-AAA / PASS-AA / FAIL
- Pour FAIL, suggerer la couleur la plus proche qui passe AA dans la meme famille
- **Gate bloquant** : tout FAIL non resolu stoppe le pipeline.

**Outputs** : `final/tokens-final.json`, `final/adaptations.md`, `final/contrast-audit.md`.

Si pas de `--client` : copier `curated/tokens-curated.json` vers `final/tokens-final.json` et passer.

---

## STEP 5 — Export Webflow CSS

**Objectif** : produire un fichier CSS importable par Variable Importer App ou Webflow MCP.

**Actions** :

1. Lire `final/tokens-final.json`.
2. Generer `final/webflow-import.css` :
   - `:root { ... }`
   - Primitives en premier, semantic ensuite
   - Comments par section : `/* === COLORS — PRIMITIVES === */`
   - Naming kebab-case, prefix par categorie : `--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`
3. Valider syntaxe : `npx css-validator final/webflow-import.css` (ou outil equivalent).

**Format type** :
```css
:root {
  /* === COLORS — PRIMITIVES === */
  --color-neutral-50: #FAFAF9;
  --color-brand-500: #0EA5E9;

  /* === COLORS — SEMANTIC === */
  --color-bg-base: var(--color-neutral-50);
  --color-text-default: var(--color-neutral-900);

  /* === SPACING === */
  --space-4: 16px; --space-8: 32px;
}
```

**Output** : `final/webflow-import.css`.

---

## STEP 6 — Import Webflow

**Objectif** : peupler les Webflow Variables.

Voir `references/webflow-import.md` pour les details d'outil et fallbacks.

**Mode auto (MCP)** : `mcp__webflow__variable_tool` cree chaque variable, organise en 3 Collections (Colors, Typography, Spacing & Layout), cree les aliases pour semantic.

**Mode manuel (Variable Importer App)** : output les instructions pas-a-pas, indique le chemin du CSS, rappelle les 6 etapes de l'app.

**Output** : `IMPORT-LOG.md` listant chaque variable creee avec sa Collection/folder.

---

## Post-pipeline

Generer `REPORT.md` final (template dans `prompts.md`) avec :
- Compteurs raw / curated / final par categorie
- Resume adaptations client
- Audit contraste WCAG synthetique
- Methode d'import utilisee
- Prochaine action recommandee

Sauvegarder `.state` avec timestamp et derniere etape reussie pour `--resume`.

Commit Git suggere : `git commit -m "DS aspiration v1: [source] → [client]"`.
