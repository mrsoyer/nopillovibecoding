# Pattern Concret — Rules pour Projets Landing

> Specification operationnelle pour le futur `/skill-maker` qui generera des rules adaptees aux landings scaffoldes par `/init-landing-stack`.

## Table des Matieres
1. [Vue d'ensemble du pattern](#vue-densemble-du-pattern)
2. [Convention de nommage](#convention-de-nommage)
3. [Workflow de generation](#workflow-de-generation)
4. [Specs pour /skill-maker](#specs-pour-skill-maker)

Pour les templates concrets et exemples detailles, voir [07-templates-rules.md](07-templates-rules.md).

## Vue d'Ensemble du Pattern

### Principe
Chaque element discret du projet (page, block, edge function, migration) merite **un fichier rule dedie** qui resume :
- Ce qu'il **est** (role)
- Ce qu'il **fait** (responsabilites)
- Avec quoi il **interagit** (dependances entrantes/sortantes)
- Quelles **contraintes** s'y appliquent

### Resultat
Quand Claude touche `front/src/components/Hero.astro`, il a INSTANTANEMENT en contexte :
- Que c'est l'element LCP
- Que l'image doit etre `<Image>` Astro avec `loading="eager"`
- Que le CTA pointe vers `#contact-form`
- Que toute modif doit preserver le Lighthouse score

Sans rules : Claude doit lire le fichier, le composant CTAButton, le ContactForm, le netlify.toml, le package.json... avant de comprendre.

### Beneficies attendus
| Sans rules par fichier | Avec rules par fichier |
|------------------------|------------------------|
| Claude relit 5-10 fichiers pour comprendre | Contexte immediat (1 fichier rule) |
| Risque d'oublier les contraintes implicites | Contraintes explicites en tete |
| Edits qui cassent les dependances cachees | Liens entrants/sortants documentes |
| Onboarding humain ET IA lent | Documentation reutilisable pour les deux |

## Convention de Nommage

### Structure dossiers

```
.claude/rules/
├── front/
│   ├── pages-{slug}.md         # Pages : index, pricing, about, contact
│   ├── {component}.md          # Composants individuels
│   ├── layouts-{nom}.md        # Layouts Astro
│   └── styles-globals.md       # Styles globaux
└── back/
    ├── {function-name}.md      # Edge functions (1 fichier par function)
    ├── migrations-{table}.md   # Migrations (1 fichier par table)
    └── rpc-{nom}.md            # Fonctions RPC SQL
```

### Regles de naming
- **kebab-case** pour les fichiers (jamais camelCase ni snake_case)
- **Prefixe** pour les pages (`pages-`), layouts (`layouts-`), migrations (`migrations-`)
- **Sans prefixe** pour les composants directs (`hero.md`, pas `component-hero.md`)
- **1 fichier = 1 element** (pas de fichier qui couvre 3 composants)

### Match `paths:` au fichier source

| Fichier source | `paths:` attendu |
|----------------|------------------|
| `front/src/components/Hero.astro` | `front/src/components/Hero.astro` |
| `front/src/components/ContactForm.tsx` | `front/src/components/ContactForm.tsx` |
| `front/src/pages/index.astro` | `front/src/pages/index.astro` |
| `supabase/functions/contact-form/` | `supabase/functions/contact-form/**` |
| `supabase/migrations/*_leads.sql` | `supabase/migrations/*_leads.sql` |

## Workflow de Generation

Le futur `/skill-maker` doit suivre ce workflow pour generer une rule :

### Etape 1 — Lecture du fichier source
- Read complet du fichier (ex: `front/src/components/Hero.astro`)
- Identification du type : component .astro, island .tsx, page, layout, edge function, migration, RPC

### Etape 2 — Extraction des metadonnees
- **Imports** → dependances sortantes (composants, helpers, env vars)
- **Patterns specifiques** :
  - `<Image>` Astro → contrainte LCP
  - `client:load` / `client:visible` → niveau d'hydratation
  - `Deno.env.get()` → secrets backend
  - `SECURITY DEFINER` → RPC privilegiee

### Etape 3 — Recherche des dependances entrantes
- `grep -r "HeroComponent" front/src/` pour trouver qui importe ce composant
- `grep -r "/functions/v1/contact-form" front/src/` pour trouver qui appelle l'edge function

### Etape 4 — Detection des contraintes implicites

| Pattern detecte | Contrainte a documenter |
|-----------------|------------------------|
| `loading="eager"` | LCP-critical, ne pas changer sans audit |
| `client:load` | Hydration aggressive, justifier dans la rule |
| `SECURITY DEFINER` | RLS-bypass, justifier dans la rule |
| Hardcode d'URL externe | Documenter (config? env?) |
| Honeypot field | Anti-spam, ne pas supprimer |

### Etape 5 — Generation du fichier rule
- Template approprie selon le type (voir [07-templates-rules.md](07-templates-rules.md))
- Substitution des variables `{NomComponent}`, `{role}`, etc.
- Renseignement des sections : Role, Type, Dependances, Contraintes, A surveiller

### Etape 6 — Placement et nommage
- `front/` ou `back/` selon le type
- kebab-case, prefixe si page/layout/migration
- Verifier qu'aucune rule existante n'a deja le meme `paths:`

### Etape 7 — Validation
- Fichier rule < 200 lignes
- `paths:` matche exactement le fichier source
- Toutes les sections du template sont remplies (pas de placeholder `{...}` oublie)

## Specs pour /skill-maker

Le `/skill-maker` doit etre un skill (`.claude/skills/skill-maker/SKILL.md`) qui :

### Args attendus

| Arg | Format | Usage |
|-----|--------|-------|
| Chemin fichier | `front/src/components/Hero.astro` | Generer rule pour 1 fichier |
| Pattern glob | `front/src/components/*.{astro,tsx}` | Batch mode (multiples rules) |
| `--update` | flag | Mettre a jour une rule existante |
| `--all` | flag | Generer rules pour TOUS les fichiers du projet |

### Frontmatter du skill

```yaml
---
name: skill-maker
description: Generate path-scoped rules in .claude/rules/{front,back}/ to document landing pages, components, blocks, edge functions and migrations. Use when "documenter ce composant", "creer une rule pour", "generer rules front", "documenter cette edge function", "/skill-maker".
allowed-tools: Read Write Glob Grep
model: sonnet
effort: medium
---
```

### References necessaires (`SKILL.md` doit pointer vers)
- `docs/claude-code-rules/03-rules-directory.md` — Format `paths:` et structure
- `docs/claude-code-rules/05-pattern-rules-landing.md` — Workflow et conventions
- `docs/claude-code-rules/07-templates-rules.md` — Templates concrets
- `docs/claude-code-rules/06-anti-patterns.md` — Anti-patterns a eviter

### Note sur le naming

Malgre le nom `skill-maker`, ce skill CREE DES RULES (pas des skills).
Le nom vient de l'usage utilisateur : c'est l'outil qui "fabrique" les artefacts de connaissance projet.
Si le naming prete a confusion, renommer en `rule-maker` est une option.

### Garde-fous attendus

| Cas | Comportement attendu |
|-----|---------------------|
| Rule existe deja avec meme `paths:` | Demander `--update` ou skip |
| Fichier source n'existe pas | Erreur explicite (pas de rule generee) |
| Fichier source > 1000 lignes | Warning : composant probablement trop gros, splitter d'abord |
| Pattern `**/*` trop large | Refuser, demander pattern plus precis |
| Aucune dependance entrante trouvee | Warning : composant orphelin ? |
| Generation > 200 lignes | Warning + splitter (1 composant = 1 rule courte) |

## Sources

- [How Claude remembers your project](https://code.claude.com/docs/en/memory) — `.claude/rules/` officiel
- [Claude Code Rules Directory](https://claudefa.st/blog/guide/mechanics/rules-directory) — Patterns d'organisation
- Project actuel : `.claude/skills/init-landing-stack/SKILL.md` — Contexte stack Astro + Supabase + Netlify
