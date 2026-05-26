# Import Webflow — `extract-design-system`

> Comment transformer `webflow-import.css` en Webflow Variables. Methode MCP (auto) + Variable Importer App (manuel) + fallback Figma.

---

## 1. Pre-requis

```bash
claude mcp add --transport stdio webflow -- npx -y @webflow/mcp-server
claude mcp list  # verifier "webflow" present
```

Premiere session : appeler `mcp__webflow__webflow_guide_tool` une fois pour decouvrir les capacites.

---

## 2. Structure cible Webflow (3 Collections)

```
Collection: Colors
  ├── Primitives/    (neutral-50..900, brand-50..900, success/warning/error/info)
  └── Semantic/      (bg-base/surface/inverse, text-default/muted/on-brand, border-*)

Collection: Typography
  ├── Families/      (font-sans, font-serif, font-mono)
  ├── Sizes/         (font-size-xs..5xl)
  └── Weights/       (font-weight-regular..bold)

Collection: Spacing & Layout
  ├── Spacing/       (space-0..32)
  ├── Radius/        (radius-none..full)
  └── Shadows/       (shadow-sm..xl) — note: garder en custom CSS si multi-couches
```

---

## 3. Methode A — Webflow MCP (auto, recommandee)

**Outils disponibles** :
- `mcp__webflow__variable_tool` : create/update/delete variables, gestion aliases
- `mcp__webflow__component_builder` : monter Buttons / Cards / Sections referencant les variables
- `mcp__webflow__style_tool` : classes CSS
- `mcp__webflow__data_sites_tool` : selection du site cible
- `mcp__webflow__webflow_guide_tool` : docs MCP

**Prompt creation** : voir `prompts.md` section 06.

**Mapping types** :

| Token DTCG | Webflow type | Collection |
|---|---|---|
| `$type: color` | Color | Colors |
| `$type: dimension` (px) sur `--space-*`, `--radius-*` | Size | Spacing & Layout |
| `$type: dimension` sur `--font-size-*` | Size | Typography |
| `$type: fontFamily` | Font Family | Typography |
| `$type: fontWeight` | Number | Typography |
| `$type: shadow` (multi-layer) | NON SUPPORTE | Custom CSS au composant |

**Aliases** : pour chaque semantic referencant une primitive, creer la variable comme alias (pas valeur hardcodee). Le MCP gere nativement si on passe le format `var(--color-neutral-900)`.

**Audit existant** :

```
Use the webflow MCP to:
1. List all current variables in the site
2. List all classes used
3. Identify duplicates, unused variables, naming inconsistencies
4. Output a markdown audit report with refactoring suggestions
```

---

## 4. Methode B — Variable Importer App (manuel, fallback)

**Installation** : Webflow Designer → Apps panel → "Variable Importer" → Install. URL : `webflow.com/apps/detail/variable-importer`.

**Workflow 6 etapes** (a guider l'utilisateur si MCP indispo) :

1. Coller le contenu de `final/webflow-import.css` (ou uploader le `.css`)
2. L'app parse les `--var-name: value;` detectees
3. Choisir convention de nommage : **kebab-case** (convention Nopillo)
4. Editer les noms si besoin (renommer `--c1` en `--color-brand-500`)
5. Choisir la Collection de destination (Colors / Typography / Spacing & Layout)
6. Preview + import en batch

**Limites a documenter au client** :

- N'importe que les variables `:root` (pas les `:root[data-theme="dark"]`)
- Modes Light/Dark a recreer manuellement
- Pas d'import des aliases : `--color-bg-base: var(--color-neutral-50)` cree 2 variables avec valeurs hardcodees -> refaire l'alias manuellement dans le Designer
- Box-shadows multi-couches : Webflow ne supporte pas encore les variables shadow -> garder en custom CSS

**Workflow recommande hybride** :
1. Generer un CSS contenant uniquement les PRIMITIVES
2. Importer via Variable Importer App
3. Creer manuellement les SEMANTIC dans Webflow en aliasing les primitives
4. Creer les MODES (Light/Dark) si applicable

---

## 5. Methode C — Figma to Webflow (si DS deja en Figma)

Plugin Figma : "Figma to Webflow (HTML, CSS and Website)". App Webflow companion : "Figma to Webflow".

**Capacites** : sync Components Figma → Components Webflow, Variables Figma → Variables Webflow, Styles Figma → Classes Webflow.

**Pre-requis** : tous les layers a synchroniser DOIVENT etre en Auto Layout. Pas de webhook natif : sync manuel via le plugin.

**Limitations** : seul le default mode des variables est recree (pas les modes multiples Figma). Sync asynchrone depuis octobre 2024.

**Quand l'utiliser** : client a deja un DS Figma mature, equipe design garde Figma comme source de verite.
**Quand l'eviter** : DS aspire depuis un site web (autant aller direct CSS → Webflow), beaucoup de modes a gerer.

---

## 6. Conventions Nopillo Webflow

### Nommage

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

### Modes

- Toujours Light Mode par defaut
- Dark Mode si demande client
- Jamais de modes "responsive" via Variables (utiliser breakpoints Webflow natifs : Mobile / Mobile L / Tablet / Desktop)

---

## 7. Composants en bonus (apres import variables)

```
Use the webflow MCP component_builder to create:

1. Button component with 3 variants (primary, secondary, ghost)
   - Use --color-bg-primary, --color-text-on-brand for primary
   - --space-3 (vertical) and --space-6 (horizontal) padding
   - --radius-md for border-radius
   - --font-sans, --font-size-base, --font-weight-medium

2. Card component
   - Background: --color-bg-surface
   - Padding: --space-6
   - Border-radius: --radius-lg
   - Shadow: --shadow-md (custom CSS si multi-layer)
   - Inner gap: --space-4

3. Section component
   - Padding-y: --space-24
   - Padding-x: --space-6 (mobile) / --space-12 (desktop via responsive)
   - Background: --color-bg-base

Reference all properties via Variables, never hardcode values.
```

---

## 8. Erreurs frequentes & fix

| Probleme | Cause | Solution |
|---|---|---|
| Import echoue silencieusement | CSS mal forme (manque `;`) | Valider via `npx css-validator` avant import |
| Variables crees sans alias | Variable Importer ne suit pas `var()` | Recreer aliases manuellement OR utiliser MCP |
| Couleurs en double | 2 hex tres proches non dedupes | Curation plus stricte (tolerance 5% delta-E) |
| Shadows non supportees | Pas de var box-shadow multi-couches | Definir shadows en custom CSS au niveau composant |
| Modes Dark casses | References absentes en Dark | Verifier que CHAQUE primitive a une valeur en Light ET Dark |
| Performance lente apres import | 200+ variables creees inutiles | Curation pre-import (max 80 tokens, hard cap) |

---

## 9. Output `IMPORT-LOG.md`

A generer apres step 6, format :

```markdown
# Webflow Import Log — {{date}}

**Site cible** : {{site-name}} ({{site-id}})
**Methode** : MCP auto | Variable Importer manuel
**Source** : {{output}}/final/webflow-import.css

## Variables creees

### Collection: Colors

- Primitives/color-neutral-50 = #FAFAFA
- Primitives/color-brand-500 = #0EA5E9
- Semantic/color-bg-base = alias(color-neutral-50)
- ... ({{count}} total)

### Collection: Typography
... ({{count}} total)

### Collection: Spacing & Layout
... ({{count}} total)

## Skipped

- {{token-name}} : raison (ex. shadow multi-layer non supporte)

## Manual TODO

- [ ] Recreer mode Dark dans Webflow Designer
- [ ] Custom CSS pour shadows multi-layer
- [ ] Verifier rendu sur 4 breakpoints
```
