---
name: rule-maker
description: Genere une rule path-scoped .claude/rules/{front,back}/ documentant page, composant, island React ou edge function Supabase. Declenche "documente ce composant/cette page/cette edge function", "cree une rule pour", "/rule-maker".
argument-hint: "[chemin-fichier-source]"
allowed-tools: Read Write Glob Grep
model: sonnet
effort: medium
---

# Rule Maker — Generateur de rules path-scoped pour landings

Tu generes UNE rule `.claude/rules/{front,back}/{nom}.md` qui documente UN element discret du projet (page, composant, island, edge function), avec `paths:` frontmatter pour scoping conditionnel.

Resultat : un fichier rule < 200 lignes qui resume role, type, dependances, contraintes et points de vigilance. La rule sera chargee automatiquement par Claude Code quand il lit/edit le fichier source documente.

## References disponibles

| Fichier | Quand le lire |
|---------|---------------|
| [references/templates-front.md](references/templates-front.md) | Etape 6 : template page Astro / composant Astro / island React |
| [references/templates-back.md](references/templates-back.md) | Etape 6 : template edge function Supabase |
| [references/detection-patterns.md](references/detection-patterns.md) | Etapes 2-5 : identifier type + extraire contraintes implicites |

## Workflow (7 etapes)

### Etape 1 — Lecture du fichier source

Le user fournit un chemin (ex: `front/src/components/Hero.astro`).

1. Verifier que le fichier existe (sinon STOP, erreur explicite)
2. Read complet du fichier
3. Si > 1000 lignes : warning "Composant probablement trop gros, considere splitter d'abord"

### Etape 2 — Identification du type

Charge [references/detection-patterns.md](references/detection-patterns.md) section "Identification du type".

| Extension + path | Type | Template a utiliser |
|------------------|------|--------------------|
| `front/src/pages/*.astro` | Page Astro | `templates-front.md` > page |
| `front/src/layouts/*.astro` | Layout Astro | `templates-front.md` > layout |
| `front/src/components/*.astro` | Composant Astro statique | `templates-front.md` > component |
| `front/src/components/*.tsx` | Island React | `templates-front.md` > island |
| `supabase/functions/*/index.ts` | Edge function | `templates-back.md` > edge |

Si type non identifiable : demander a l'user "Quel type ? page / layout / component / island / edge".

### Etape 3 — Extraction des metadonnees

Charge [references/detection-patterns.md](references/detection-patterns.md) section "Extraction".

**Pour un fichier front (.astro ou .tsx)** :
- Lister les `import ... from ...` → dependances sortantes
- Detecter usage `<Image>` d'Astro, `<Picture>`, directives `client:*`
- Detecter usage variables env `import.meta.env.PUBLIC_*`
- Detecter appels `fetch(...)` ou `supabase.functions.invoke(...)` → endpoints sortants

**Pour une edge function (.ts)** :
- Detecter inputs (parsing JSON body, schema Zod si present)
- Detecter outputs (Response objects, status codes utilises)
- Detecter `Deno.env.get(...)` → secrets utilises
- Detecter side effects via supabase client (INSERT, UPDATE, DELETE)

### Etape 4 — Recherche des dependances entrantes

Glob + Grep pour trouver QUI utilise ce composant ou cette edge function.

**Pour un composant front** :
```
Glob: front/src/**/*.{astro,tsx,ts}
Grep pattern: "from.*{NomComponent}" OR "import.*{NomComponent}"
```

**Pour une edge function** :
```
Glob: front/src/**/*.{astro,tsx,ts}
Grep pattern: "/functions/v1/{function-name}" OR "supabase.functions.invoke\\(['\"]{function-name}"
```

Si zero match : warning "Composant/function orphelin ? Aucune dependance entrante trouvee."

### Etape 5 — Detection des contraintes implicites

Charge [references/detection-patterns.md](references/detection-patterns.md) section "Contraintes".

Pour chaque pattern detecte dans le fichier source, ajouter une contrainte explicite dans la section "Contraintes" de la rule. Exemples :
- `loading="eager"` + `<Image>` → "LCP-critical, ne pas changer sans audit Lighthouse"
- `client:load` → "Hydration aggressive, justifier dans la rule"
- Honeypot (`_honey`, hidden field) → "Anti-spam, ne pas supprimer"

### Etape 6 — Generation du fichier rule

Charge le template approprie :
- Front → [references/templates-front.md](references/templates-front.md)
- Back → [references/templates-back.md](references/templates-back.md)

Substitue toutes les variables `{NomComponent}`, `{role}`, `{paths-match}`, etc. avec les donnees extraites aux etapes 1-5.

Renseigne TOUTES les sections (pas de `{...}` placeholder oublie) :
- Role (1-3 phrases : pourquoi ce composant/function existe)
- Type (Astro statique | Island React | Page | Layout | Edge function)
- Structure (front) OU Inputs/Outputs (back)
- Dependances entrantes
- Dependances sortantes
- Contraintes
- A surveiller

### Etape 7 — Placement, nommage, validation

**Placement** :
- `.claude/rules/front/` pour pages, composants, islands, layouts
- `.claude/rules/back/` pour edge functions

**Nommage** (kebab-case obligatoire) :
| Type | Nom de fichier rule |
|------|---------------------|
| Page Astro | `pages-{slug}.md` (ex: `pages-index.md`) |
| Layout Astro | `layouts-{nom}.md` (ex: `layouts-base.md`) |
| Composant ou island | `{nom-component}.md` (ex: `hero.md`, `contact-form.md`) |
| Edge function | `{function-name}.md` (ex: `contact-form.md`) |

**Avant ecriture** :
1. Glob `.claude/rules/{front,back}/**/*.md` pour verifier qu'aucune rule existante n'a deja le meme `paths:`
2. Si conflit : demander confirmation `--update` OU suggerer nom alternatif
3. Si generation > 200 lignes : warning + proposer de splitter le composant source

**Apres ecriture** :
1. Read de la rule generee
2. Verifier qu'AUCUN `{placeholder}` ne traine
3. Verifier que `paths:` matche EXACTEMENT le fichier source (pas un glob trop large)
4. Annoncer succes avec chemin de la rule creee

## Exemple d'execution complet

```
User: /rule-maker front/src/components/ContactForm.tsx

Claude:
[Etape 1] Read front/src/components/ContactForm.tsx ... OK (87 lignes)
[Etape 2] Type : Island React (.tsx dans components/)
[Etape 3] Extraction :
  - Imports : react-hook-form, zod, getUTMParams
  - Endpoint : ${PUBLIC_SUPABASE_URL}/functions/v1/contact-form
  - Hydratation : client:visible
[Etape 4] Dependances entrantes :
  - front/src/pages/index.astro (section #contact-form)
  - front/src/pages/contact.astro
[Etape 5] Contraintes detectees :
  - Honeypot field _honey present (anti-spam)
  - Schema Zod (validation client)
[Etape 6] Template front-island applique, variables substituees
[Etape 7] Verification : .claude/rules/front/contact-form.md inexistante. OK.
         Generation : 52 lignes. Validation OK (pas de placeholder, paths exact).

Rule creee : .claude/rules/front/contact-form.md (52 lignes)
Sera chargee automatiquement quand Claude touchera ContactForm.tsx.
```

## Garde-fous

| Cas | Comportement attendu |
|-----|---------------------|
| Fichier source n'existe pas | STOP avec erreur explicite (pas de rule generee) |
| Fichier > 1000 lignes | Warning : "composant trop gros, splitter d'abord ?" puis demander confirmation |
| Rule existe deja (meme paths:) | Demander : update (overwrite) ? skip ? suggerer nom alternatif |
| Aucune dependance entrante trouvee | Warning : "composant orphelin ?" (continuer quand meme) |
| Generation > 200 lignes | Warning + suggerer split en 2 rules ou de simplifier le composant |
| Type non identifie | Demander a l'user : "Quel type ? page / layout / component / island / edge" |

## Regles

- **1 fichier source = 1 rule** : pas de rule qui couvre plusieurs fichiers
- **kebab-case obligatoire** pour les noms de rules (jamais camelCase ni snake_case)
- **`paths:` exact** : matche LE fichier source, pas un glob approximatif
- **Rule < 200 lignes** : si plus, le composant source a probablement plusieurs responsabilites
- **Toujours valider apres ecriture** : relire pour eliminer les placeholders oublies
- **Jamais de secrets dans une rule** : meme avec `paths:`, bug #16299 peut charger globalement

> Pourquoi `paths:` exact : si `paths: ["front/src/components/**"]`, la rule s'applique a TOUS les composants et perd son interet (specialisation par fichier).

> Pourquoi < 200 lignes : une rule trop longue floode le contexte quand le fichier est ouvert. Si tu ne tiens pas en 200 lignes, le composant a probablement plusieurs responsabilites a splitter.

## Anti-patterns a eviter

- Documenter le HTML semantique standard (Claude le sait deja)
- Documenter Tailwind general (utilitaires standards connus de Claude)
- Sur-specifier en regles negatives ("don't use X") au lieu de positives ("use Y")
- Rule fourre-tout couvrant plusieurs fichiers
- Oublier de synchroniser `front/X.md` et `back/X.md` quand ils interagissent

Pour la liste complete des anti-patterns rules : voir `docs/claude-code-rules/06-anti-patterns.md` dans le projet.

## Sources

- `docs/claude-code-rules/03-rules-directory.md` — Format `.claude/rules/` officiel + bugs connus
- `docs/claude-code-rules/05-pattern-rules-landing.md` — Workflow detaille et conventions
- `docs/claude-code-rules/07-templates-rules.md` — Templates de reference complets
- `docs/claude-code-rules/06-anti-patterns.md` — Anti-patterns rules
- `.claude/skills/init-landing-stack/SKILL.md` — Stack Astro 6 + Tailwind 4 + Supabase + Netlify
