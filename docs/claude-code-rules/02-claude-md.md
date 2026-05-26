# CLAUDE.md — Specifications et Bonnes Pratiques

## Table des Matieres
1. [Hierarchie et locations](#hierarchie-et-locations)
2. [Taille et token budget](#taille-et-token-budget)
3. [Structure recommandee](#structure-recommandee)
4. [Imports avec @path](#imports-avec-path)
5. [Anti-patterns CLAUDE.md](#anti-patterns-claude-md)
6. [Pattern pour projets landing](#pattern-pour-projets-landing)

## Hierarchie et Locations

CLAUDE.md peut vivre a 4 niveaux, charges dans cet ordre (du plus general au plus specifique) :

| Scope | Location | Usage |
|-------|----------|-------|
| **Managed policy** | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | Politiques org IT/DevOps |
| **User** | `~/.claude/CLAUDE.md` | Preferences personnelles (tous projets) |
| **Project** | `./CLAUDE.md` ou `./.claude/CLAUDE.md` | Regles equipe versionnees |
| **Local** | `./CLAUDE.local.md` | Personnel projet (gitignore) |

Tous les fichiers decouverts sont **concatenes**, pas overrides. Claude walk up la hierarchie de dossiers : si tu lances dans `foo/bar/`, il charge `foo/CLAUDE.md` puis `foo/bar/CLAUDE.md`.

## Taille et Token Budget

| Taille | Tokens approx | Verdict |
|--------|---------------|---------|
| 80 lignes | ~1 000 | Optimal (adherence max) |
| 200 lignes | ~2 000 | Limite officielle Anthropic |
| 500 lignes | ~5 000-8 000 | Adherence en baisse |
| 1200 lignes | ~42 000 | Catastrophique (Claude ignore la moitie) |

**Cible recommandee : < 80 lignes** pour les projets landing (ce projet impose cette limite via context-guardian check #1).

CLAUDE.md est charge **a chaque session**, prepend a chaque turn. Prompt caching reduit le cout dollar mais pas l'occupation du contexte.

## Structure Recommandee

Sections a inclure (par ordre de priorite) :

```markdown
# CLAUDE.md — <nom-projet>

## Regle MCP critique (primacy)
[2-3 lignes - regles non negociables en tete]

## Stack
- Frontend : Astro 6 + Tailwind 4 + TypeScript strict
- Backend  : Supabase (Postgres + Edge Functions Deno)
- Infra    : Netlify

## Conventions
- [Patterns specifiques au projet, 5-8 lignes]

## Commandes utiles
- npm run dev (port 4321)
- npm run build && npm run preview
- [Commandes que Claude ne peut pas deviner]

## Cibles de perf
- Lighthouse Performance >= 95
- LCP < 1.5s, CLS < 0.1, INP < 200ms

## Documentation
- @docs/ : docs du projet
- .claude/rules/ : regles path-scoped

## Regle MCP critique (recency - rappel)
[Memes regles que primacy, en queue]
```

**Pattern primacy + recency** : les 3 premieres lignes ET les 3 dernieres ont une attention LLM superieure. Mettre les regles critiques aux deux endroits.

## Imports avec @path

Syntaxe `@path/to/file.md` pour modulariser :

```markdown
# CLAUDE.md

@AGENTS.md
@README.md
@docs/architecture.md

## Claude Code

Use plan mode for changes under `src/billing/`.
```

Regles :
- **Profondeur max 5 hops** (recursif)
- Paths relatifs au fichier importateur, pas au cwd
- Imports = charge AU LAUNCH (pas conditionnel) — ne reduit PAS la taille contexte
- Approbation manuelle a la 1ere occurrence

**Utilite reelle** : organisation / lisibilite, PAS reduction tokens. Pour reduire les tokens, utiliser `.claude/rules/` avec `paths:` ou skills.

## Anti-patterns CLAUDE.md

| Anti-pattern | Pourquoi | Correction |
|-------------|----------|------------|
| Liste de tous les fichiers | Inferable par Read | Patterns generaux uniquement |
| "Don't use X, don't use Y" (regles negatives) | Token expensif, vague | Reformuler positif ("Use Y") |
| Documentation API inline | Inferable du code | Lien vers `docs/` |
| "Phases" ou "TODO" | Etat projet, pas contexte | Sortir vers `docs/todo.md` |
| Schema DB inline (> 10 lignes SQL) | Inferable de migrations | `docs/db/schema.md` |
| Tutoriels step-by-step | Pas du contexte | Convertir en skill |

## Pattern pour Projets Landing

Pour un projet Astro + Supabase + Netlify, CLAUDE.md tient en 30-40 lignes :

```markdown
# CLAUDE.md — mon-landing

## Regle MCP critique
- Ne JAMAIS exposer SUPABASE_SERVICE_ROLE_KEY cote client
- Utiliser mcp__claude_ai_supabase__* (jamais SQL direct prod)

## Stack
- Astro 6 + Tailwind 4 + TypeScript strict
- Supabase (Postgres + Edge Functions Deno)
- Netlify (deploy auto)

## Conventions
- .astro pour statique, .tsx pour islands interactifs
- Form handlers via Edge Function `contact-form` (jamais Postgres direct client)
- Images : <Image> d'Astro (jamais <img>)
- Hydratation : client:visible par defaut

## Commandes
- cd front && npm run dev
- netlify deploy --prod

## Cibles perf
- Lighthouse Performance >= 95
- Bundle JS < 50 KB

## Documentation
- @docs/ : reference complete
- .claude/rules/ : regles par fichier (front + back)

## Regle MCP critique (rappel)
- SUPABASE_SERVICE_ROLE_KEY cote serveur UNIQUEMENT
```

Tout le detail (regles par page, par block, par edge function) vit dans `.claude/rules/front/` et `.claude/rules/back/` — voir [05-pattern-rules-landing.md](05-pattern-rules-landing.md).

## Sources

- [How Claude remembers your project](https://code.claude.com/docs/en/memory) — Specs officielles
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Patterns officiels
- [The Complete Guide to CLAUDE.md](https://medium.com/@n913239/the-complete-guide-to-claude-md-make-claude-code-truly-understand-your-project-d9d026b808f1) — Templates concrets
- [My CLAUDE.md Was Eating 42,000 Tokens](https://medium.com/@cem.karaca/my-claude-md-was-eating-42-000-tokens-per-conversation-heres-how-i-fixed-it-85ffba809bd4) — Token budget reel
- [Your CLAUDE.md is eating your token budget](https://medium.com/@kjramsy/your-claude-md-is-eating-your-token-budget-heres-how-to-fix-it-b8d6c4d1c986) — Refactoring patterns
