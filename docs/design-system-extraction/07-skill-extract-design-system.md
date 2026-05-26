# 07 — Skill `/extract-design-system` (Specs)

> Specifications du skill Claude Code dedie a l'aspiration de DS pour Nopillo. Pret a fabriquer avec `skill-maker`.

---

## 1. Identite du Skill

| Champ | Valeur |
|---|---|
| **Nom** | `extract-design-system` |
| **Slug** | `extract-design-system` |
| **Trigger principal** | `/extract-design-system <url>` |
| **Triggers naturels** | "aspire le DS de X", "extract design system X", "tokens X" |
| **Modele** | Opus (raisonnement profond pour curation) |
| **MCPs requis** | `dembrandt`, `chrome-devtools`, `webflow` |
| **Output** | `design-system/` au niveau du projet |

---

## 2. Description (pour SKILL.md)

```yaml
---
name: extract-design-system
description: |
  Aspire un design system complet depuis un site web et le prepare pour Webflow.
  Pipeline : extraction Dembrandt → curation Opus → adaptation client → import Webflow.

  Use cases:
  - L'utilisateur fournit une URL et veut "aspirer" son design system
  - Brief de refonte avec sites de reference a etudier
  - Migration d'un site existant vers Webflow
  - Audit comparatif de plusieurs DS

  <example>
  user: "Aspire le DS de linear.app pour le projet client Acme"
  assistant: "Je lance le pipeline /extract-design-system. J'extrais avec Dembrandt, curate les tokens, adapte aux couleurs Acme, et prepare l'import Webflow."
  </example>

  <example>
  user: "/extract-design-system https://stripe.com"
  assistant: "Pipeline d'aspiration de stripe.com lance. Etape 1/6 : extraction Dembrandt en cours..."
  </example>

model: opus
tools: Read, Write, Edit, Bash, WebFetch, mcp__dembrandt__*, mcp__chrome-devtools__*, mcp__webflow__*
color: cyan
---
```

---

## 3. Architecture du Skill

```
~/.claude/skills/extract-design-system/
├── SKILL.md                    # Specs YAML + instructions
├── README.md                   # Quick start + exemples
├── prompts/                    # 01-extract, 02-screenshots, 03-curate,
│                               # 04-adapt-client, 05-export-webflow, 06-import-webflow
├── templates/                  # tokens-curated.json, webflow-import.css,
│                               # REPORT.md, decisions.md
└── scripts/                    # validate-css.sh, check-contrast.js, snap-spacing.js
```

---

## 4. Pipeline en 6 Steps

### STEP 1 — Setup & Extraction

**Inputs** : `url` (obligatoire), `client-name` (optionnel), `brief-file` (optionnel).
**Actions** : creer `design-system/{source,curated,final}/`, lancer `mcp__dembrandt__get_design_tokens(url)`, sauvegarder `design-system/source/[domain]-raw.json`. Fallback CLI : `npx dembrandt [url] --browser=firefox --slow`.
**Outputs** : `[domain]-raw.json`, `[domain]-DESIGN.md`.
**Validation** : JSON > 1KB, contient au moins 5 colors, 3 font-sizes, 3 spacings.

### STEP 2 — Audit Visuel (Chrome MCP)

**Actions** : `mcp__chrome-devtools__navigate(url)`, screenshots de 5 elements (hero, card, button, nav, footer), extraction CSS variables `:root` via console.
**Outputs** : 5 PNGs `01-hero.png` etc., `[domain]-css-vars.json`.

### STEP 3 — Curation (Opus)

**Inputs** : `[domain]-raw.json`, `[domain]-DESIGN.md`, `[domain]-css-vars.json`.
**Actions** : appliquer regles de curation (cf 03-tokens-extraction.md) — Couleurs grouper/deduper max 50, Typo detecter ratio max 8 sizes max 4 weights, Spacing detecter base snap max 12, Radius max 6, Shadows max 5. Generer 3 layers DTCG + `decisions.md`.
**Outputs** : `tokens-curated.json` (DTCG), `decisions.md`.
**Validation** : 50-80 tokens, semantic referencent primitive (no hardcode), naming kebab-case.

### STEP 4 — Adaptation Client (si brief)

**Inputs** : `tokens-curated.json` + brief (couleur primary client, accent, tonalite neutres chaud/froid, typographie souhaitee).
**Actions** : substituer palette primary, generer scale 50-900 via OKLCH, substituer neutres si demande, adapter font families si demande, garder spacing/radius/shadows tels quels (patterns systemiques).
**Outputs** : `tokens-final.json`, `adaptations.md`, `contrast-audit.md` (audit WCAG).

### STEP 5 — Export Webflow CSS

**Actions** : lire `tokens-final.json`, generer `webflow-import.css` (`:root { ... }`, primitives en premier, semantic en second, comments de section, naming kebab-case), valider syntaxe via `scripts/validate-css.sh`.
**Outputs** : `webflow-import.css`.

### STEP 6 — Import Webflow (optionnel)

**Auto** : `mcp__webflow__variable_tool` cree chaque variable, organise en Collections (Colors, Typography, Spacing & Layout), cree aliases pour semantic, liste variables creees.
**Manuel** : output instructions pas-a-pas pour Variable Importer App, indique le chemin du CSS.
**Outputs** : `IMPORT-LOG.md`.

---

## 5. Modes du Skill

| Mode | Comportement |
|---|---|
| `/extract-design-system <url>` | Pipeline complet sans adaptation (= garde le DS source) |
| `/extract-design-system <url> --client <name>` | Pipeline + lit `docs/brief-client.md` ou `briefs/[name].md` pour adapter |
| `/extract-design-system <url> --interactive` | Pause apres chaque step. Demande validation. Recommande pour missions importantes |
| `/extract-design-system --compare <url-a> <url-b>` | Aspire 2 sites en parallele + rapport comparatif. Pas d'adaptation client |
| `/extract-design-system --resume` | Reprend le pipeline a la derniere etape echouee (lit `design-system/.state`) |

---

## 6. Regles Internes (a inclure dans SKILL.md)

```markdown
## Regles Operationnelles

1. Toujours separer source/curated/final : ne jamais ecrire dans source/ apres l'etape 1.
2. Aucune copie 1:1 : si brief = "exactement comme X", alerter et exiger validation explicite.
3. Validation contraste obligatoire : tout pair text/bg en FAIL WCAG AA bloque le pipeline.
4. Curation max 80 tokens : au-dela, alerte + propose plus d'elagage.
5. Documenter chaque substitution dans adaptations.md.
6. Versionner : timestamp dans noms de fichiers (linear-2026-05-05.json).
7. Verifier les fonts : si source utilise font payante (Sohne, GT Walsheim, Tiempos), alerter + alternative gratuite.
8. Refuser sites concurrents directs : si client opere meme secteur que source ET brief mentionne "comme eux", alerter risque "look and feel" et exiger 3+ modifications majeures.
```

---

## 7. Prompts Type Inclus

### prompts/01-extract.md

```markdown
You are extracting the raw design system from {{url}}.

1. Use mcp__dembrandt__get_design_tokens with url={{url}}.
2. Save the raw JSON to design-system/source/{{domain}}-raw.json.
3. Use mcp__dembrandt__get_color_palette and append to the JSON.
4. Use mcp__dembrandt__get_typography and append.
5. Use mcp__dembrandt__get_spacing and append.
6. Generate a brief summary in design-system/source/{{domain}}-DESIGN.md
   listing top 10 colors, fonts used, spacing base, radius approach.

If Dembrandt MCP fails, fall back to:
  Bash: npx dembrandt {{url}} --browser=firefox --slow --dtcg --design-md --save-output
```

### prompts/03-curate.md

```markdown
You are curating raw design tokens for production use in Webflow.

Input: design-system/source/{{domain}}-raw.json + {{domain}}-DESIGN.md

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

Output: design-system/curated/tokens-curated.json (W3C DTCG, 3 layers) +
  design-system/curated/decisions.md (explain every choice).

Validate before saving: 50-80 tokens total, semantic references primitive via {alias},
  all names kebab-case.
```

### prompts/04-adapt-client.md

```markdown
You are adapting curated tokens to a client's brand identity.

Inputs:
- design-system/curated/tokens-curated.json
- Client brief from {{brief-file}} or user prompt

Required client info (ask if missing): primary brand color (hex), accent color
  (hex, optional), neutral temperature (warm/neutral/cool), font preferences
  (or "keep source").

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

Output: tokens-final.json, adaptations.md, contrast-audit.md (WCAG AA check).
If pair fails AA, suggest nearest passing color from same family.
```

---

## 8. Templates & Tests

### templates/REPORT.md.template

```markdown
# Aspiration DS — {{client-name}} inspire de {{source-domain}}

**Date** : {{date}} | **Source** : {{url}} | **Pipeline** : extract-design-system v1.0

## Tokens Extracted

| Categorie | Brut | Curated | Final |
|---|---|---|---|
| Colors | {{count-raw}} | {{count-curated}} | {{count-final}} |
| Typography | ... | ... | ... |
| Spacing | ... | ... | ... |

## Adaptations Client

{{adaptations-summary}}

## Contraste WCAG

- AAA pass : {{aaa-count}} | AA pass : {{aa-count}} | FAIL : {{fail-count}}

## Webflow Import

Fichier : `design-system/final/webflow-import.css` | Methode : {{import-method}}

## Prochaine Etape

{{next-action}}
```

### Tests d'Acceptance

Le skill est valide si :
- [ ] `/extract-design-system https://linear.app` produit < 80 tokens
- [ ] Tous les semantic referencent des primitives (no hardcode)
- [ ] Contrast audit passe AA pour tous les pairs text/bg
- [ ] CSS final importable par Variable Importer App sans erreur
- [ ] Mode `--interactive` permet de pauser entre chaque step
- [ ] Mode `--compare` produit un rapport comparatif lisible
- [ ] Alerte si font source payante (whitelist : Sohne, GT, Tiempos, Suisse, Founders, Apercu)
- [ ] Alerte si client meme secteur que source (mots-cles a detecter)
- [ ] Tous les artefacts sont versionnes (timestamp dans nom)

---

## 9. Roadmap V2 & Fabrication

| Feature | Priorite |
|---|---|
| Mode Figma : aspirer + exporter en Figma Variables | Haute |
| Generation prompts pour Webflow MCP en sortie | Haute |
| Comparaison multi-sites (3+) | Moyenne |
| Detection auto secteur client (anti "look and feel") | Moyenne |
| Integration sym-docapi pour archiver les aspirations | Basse |
| Mode CI : aspirer le site client toutes les semaines pour detecter la derive | Basse |

**Fabrication** :

```
Use skill-maker to build the extract-design-system skill following
the specs in docs/design-system-extraction/07-skill-extract-design-system.md.
```

Le skill sera installe dans `~/.claude/skills/extract-design-system/` et accessible via `/extract-design-system`.

---

## Sources

- [extract-design-system (arvindrk)](https://github.com/arvindrk/extract-design-system) — skill reference de base
- [Dembrandt GitHub](https://github.com/dembrandt/dembrandt) — outil pipeline d'extraction
- [Webflow MCP server](https://developers.webflow.com/mcp/reference/overview) — reference outils MCP
- [W3C Design Tokens Format](https://www.designtokens.org/tr/drafts/format/) — format DTCG impose en sortie
- [03-tokens-extraction.md](./03-tokens-extraction.md) — regles de curation appliquees
- [04-workflow-claude-code.md](./04-workflow-claude-code.md) — pipeline Claude Code reference

## Suivant

- [sources.md](./sources.md) — References externes
