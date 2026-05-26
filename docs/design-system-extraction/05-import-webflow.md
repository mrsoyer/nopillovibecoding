# 05 — Import dans Webflow

> Comment transformer les tokens curated en Webflow Variables, Components et Styles. Workflow Variable Importer App + Webflow MCP.

---

## 1. Webflow Variables — Rappel Technique

### 1.1 Ce que sont les Variables Webflow

Design tokens reutilisables stockes au niveau site, accessibles dans le Designer.

**Capacites cles** :
- Variables par type : Color, Size (px/em/rem/vh/vw/%), Font Family, Number, Percentage
- Aliases : une variable peut referencer une autre
- Modes : meme variable, valeurs differentes selon contexte (Light/Dark, Mobile/Desktop)
- Folders : organisation par dossiers
- Fonctions natives : `clamp()`, `min()`, `max()` supportees pour fluid responsive
- Acces via Designer panel (W key) ou Webflow API

### 1.2 Structure recommandee Nopillo

3 Collections au minimum :

```
Collection: Colors
  ├── Primitives/    (neutral-50..900, brand-50..900, success/warning/error/info)
  └── Semantic/      (bg-base/surface/inverse, text-default/muted/on-brand, border-*)

Collection: Typography
  ├── Families/      (font-sans, font-serif, font-mono)
  ├── Sizes/         (size-xs..5xl)
  └── Weights/       (weight-regular..bold)

Collection: Spacing & Layout
  ├── Spacing/       (space-0..32)
  ├── Radius/        (radius-none..full)
  └── Shadows/       (shadow-sm..xl)
```

---

## 2. Methode A — Variable Importer App (officielle)

**Installation** : Webflow Designer → Apps panel → "Variable Importer" → Install. URL : `webflow.com/apps/detail/variable-importer`.

**Workflow 6 etapes** :
1. Coller le CSS ou uploader un `.css`
2. L'app parse les `--var-name: value;` detectees
3. Choisir convention de nommage : camelCase / PascalCase / snake_case / kebab-case (Nopillo : kebab-case)
4. Editer les noms individuellement (renommer `--c1` en `--color-brand-500`)
5. Choisir la Collection de destination
6. Preview + import en batch

**Format CSS attendu** :

```css
:root {
  --color-brand-500: #0EA5E9;
  --color-neutral-50: #FAFAFA;
  --space-4: 16px;
  --radius-md: 8px;
}
```

L'app accepte tous types compatibles Webflow : colors (hex, rgb, hsl), sizes (px, em, rem, %), strings simples.

**Limites** :
- N'importe que les variables `:root` (pas les `:root[data-theme="dark"]`)
- Modes Light/Dark a recreer manuellement
- Pas d'import des aliases automatique : `--color-bg-base: var(--color-neutral-50)` cree 2 variables avec valeurs hardcodees, refaire l'alias manuellement
- Box-shadows multi-couches : Webflow ne supporte pas encore les variables shadow → garder en custom CSS

**Workflow recommande** :
1. Generer `webflow-import.css` avec uniquement les PRIMITIVES
2. Importer via Variable Importer App
3. Manuellement creer les SEMANTIC dans Webflow en aliasing les primitives
4. Manuellement creer les MODES (Light/Dark) si applicable

---

## 3. Methode B — Webflow MCP (automatise via Claude)

Le Webflow MCP server permet de creer/modifier variables et composants directement par prompt.

```bash
claude mcp add --transport stdio webflow -- npx -y @webflow/mcp-server
```

Verifier :
```
Use webflow_guide_tool to list all available Webflow MCP capabilities.
```

**Familles d'outils** :
- **Designer API** : Layout (sections, containers, grids responsive), Styling (classes, proprietes CSS, variables design), Components (reutilisables), Design systems (color schemes, typography, spacing)
- **Data API** : CMS (collections, fields, bulk updates), Assets (dossiers, optimisation), SEO (meta, OG tags), Audits (broken links, alt text)

**Prompt — Creer toutes les variables** :

```
Use the webflow MCP to import the design system from design-system/final/tokens-final.json.

For each token in the JSON:
1. Determine the Webflow variable type (Color / Size / Font Family / Number)
2. Create the variable in the appropriate Collection:
   - Colors → "Colors" collection, in "Primitives" or "Semantic" folder
   - Sizes (spacing, radius) → "Spacing & Layout" collection
   - Font properties → "Typography" collection
3. For semantic tokens that reference primitives, create them as ALIASES (not hardcoded values)
4. Use kebab-case naming (color-brand-500, space-4, etc.)

After creation, list all variables created with their Collection/folder location.
```

**Prompt — Audit existant** :

```
Use the webflow MCP to:
1. List all current variables in the site
2. List all classes used
3. Identify:
   - Duplicate values (same color used in 3+ classes without a variable)
   - Variables defined but never used
   - Inconsistent naming (mix of camelCase and kebab-case)
4. Output a markdown audit report with refactoring suggestions
```

**Prompt — Construction composants** :

```
Use the webflow MCP component_builder to create:

1. A Button component with 3 variants (primary, secondary, ghost)
   - Use --color-bg-primary, --color-text-on-brand for primary
   - --space-3 (vertical) and --space-6 (horizontal) padding
   - --radius-md for border-radius
   - --font-sans, --font-size-base, --font-weight-medium

2. A Card component
   - Background: --color-bg-surface, Padding: --space-6
   - Border-radius: --radius-lg, Shadow: --shadow-md, Inner gap: --space-4

3. A Section component
   - Padding-y: --space-24
   - Padding-x: --space-6 (mobile) / --space-12 (desktop via responsive)
   - Background: --color-bg-base

Reference all properties via Variables, never hardcode values.
```

---

## 4. Methode C — Figma to Webflow (si DS deja en Figma)

Plugin Figma : "Figma to Webflow (HTML, CSS and Website)". App Webflow companion : "Figma to Webflow".

**Capacites** : sync Components Figma → Components Webflow, Variables Figma → Variables Webflow, Styles Figma → Classes Webflow.

**Pre-requis stricts** : tous les layers a synchroniser DOIVENT etre en Auto Layout. Pas de webhook natif : sync manuel via le plugin.

**Limitations** : seul le default mode des variables est recree (Webflow ne supporte pas encore les modes multiples Figma). Sync asynchrone : depuis octobre 2024, plus besoin que les 2 apps soient ouvertes en meme temps.

**Quand l'utiliser** : client a deja un DS Figma mature, equipe design garde Figma comme source de verite, evite la double saisie. **Quand l'eviter** : DS aspire depuis un site web (autant aller direct CSS → Webflow), beaucoup de modes a gerer.

---

## 5. Pipeline End-to-End Type Nopillo

```
[1] Aspiration via Dembrandt        → design-system/source/raw.json
[2] Curation Claude (Opus)          → design-system/curated/tokens-curated.json
[3] Adaptation client               → design-system/final/tokens-final.json
[4] Generation CSS import           → design-system/final/webflow-import.css

[5a] Variable Importer App                 [5b] Webflow MCP
     - Import primitives                        - Prompt creation auto
     - Manual aliasing semantic                 - Aliases natifs
     - Manual modes Light/Dark                  - Modes via prompt

[6] Build composants Webflow MCP    → Buttons, Cards, Sections, Forms (referencent les Variables)
[7] QA visuel                       → Comparaison side-by-side, contrastes WCAG, test responsive 4 breakpoints
```

---

## 6. Conventions Nopillo Webflow

### 6.1 Nommage

| Element | Pattern | Exemple |
|---|---|---|
| Variable couleur primitive | `color-{family}-{shade}` | `color-brand-500` |
| Variable couleur semantic | `color-{usage}-{variant}` | `color-bg-primary` |
| Variable size spacing | `space-{step}` | `space-4` |
| Variable size radius | `radius-{size}` | `radius-md` |
| Variable font size | `font-size-{step}` | `font-size-base` |
| Variable font weight | `font-weight-{name}` | `font-weight-medium` |
| Class composant | `c-{component}` | `c-button` |
| Class variant | `c-{component}--{variant}` | `c-button--primary` |
| Class utilitaire | `u-{property}-{value}` | `u-text-center` |

### 6.2 Organisation & Modes

3 Collections fixes : `Colors`, `Typography`, `Spacing & Layout`. Chaque variable rentre dans une de ces 3.

Modes : toujours Light Mode par defaut. Dark Mode si demande client. Jamais de modes "responsive" via Variables (utiliser breakpoints Webflow natifs).

---

## 7. Erreurs Frequentes & Fix

| Probleme | Cause | Solution |
|---|---|---|
| Import echoue silencieusement | CSS mal forme (manque `;`) | Valider via `npx css-validator` avant import |
| Variables crees sans alias | Variable Importer ne suit pas `var()` | Recreer aliases manuellement OR utiliser MCP |
| Couleurs en double | 2 hex tres proches non dedupes | Curation Claude plus stricte (tolerance 5% delta-E) |
| Shadows non supportees | Pas de var box-shadow multi-couches | Definir shadows en custom CSS au niveau composant |
| Modes Dark casses | References absentes en Dark | Verifier que CHAQUE primitive a une valeur en Light ET Dark |
| Performance lente apres import | 200+ variables creees inutiles | Curation pre-import (max 80 tokens) |

---

## Sources

- [Variable Importer App (Webflow)](https://webflow.com/apps/detail/variable-importer) — app officielle d'import CSS → Variables
- [Webflow MCP server docs](https://developers.webflow.com/mcp/reference/overview) — reference des outils MCP Webflow
- [Variables Help Center](https://help.webflow.com/hc/en-us/articles/33961268146323-Variables) — documentation officielle Variables
- [The Webflow Way — Variables](https://webflow.com/webflow-way/design-systems/variables) — best practices officielles
- [Best practices Webflow Variables (Caleb Raney)](https://www.calebraney.com/post/how-to-best-utilize-webflow-variables-an-in-depth-guide) — guide approfondi praticien
- [Figma to Webflow plugin](https://www.figma.com/community/plugin/1164923964214525039/figma-to-webflow-html-css-and-website) — sync Figma → Webflow

## Suivant

- [06-anti-patterns-legal.md](./06-anti-patterns-legal.md) — Cadre legal
- [07-skill-extract-design-system.md](./07-skill-extract-design-system.md) — Skill Claude Code dedie
