# 02 — Theorie : Skill / Rule / MCP / Hook

> Module theorique de 40 min projete en debut d'apres-midi (13h50-14h30). Tout est applique directement apres dans le projet skill custom. **Pas de slides** : projeter ce fichier en grand format.

## Table des Matieres

1. [Le probleme que Claude ne resout pas seul](#le-probleme-que-claude-ne-resout-pas-seul)
2. [Les 4 mecanismes de Claude Code](#les-4-mecanismes-de-claude-code)
3. [CLAUDE.md — le contexte permanent](#claudemd--le-contexte-permanent)
4. [Rules — la connaissance scopee](#rules--la-connaissance-scopee)
5. [Skills — les competences workflow](#skills--les-competences-workflow)
6. [MCP — les outils externes](#mcp--les-outils-externes)
7. [Hooks — l'enforcement deterministe](#hooks--lenforcement-deterministe)
8. [Le decision tree](#le-decision-tree)
9. [Anti-patterns frequents](#anti-patterns-frequents)
10. [Demos live](#demos-live)

## Le probleme que Claude ne resout pas seul

A chaque conversation, Claude **oublie tout** :
- Tes conventions de code
- L'architecture de ton projet
- Tes workflows recurrents
- Tes regles de qualite

**Sans mecanisme de persistence** : tu retape les memes choses a chaque session, tu obtiens des resultats incoherents entre dev, et l'IA "hallucine" parce qu'elle invente faute de contexte.

**Solution** : 4 mecanismes de Claude Code qui injectent du contexte ou des actions de facon controlee.

## Les 4 mecanismes de Claude Code

| Mecanisme | Repond a | Charge | Cible |
|---|---|---|---|
| **CLAUDE.md** | "Quelles sont les regles globales ?" | Auto a chaque session | Contexte permanent |
| **Rules** | "Quelle regle vaut pour CE fichier ?" | Auto si match de chemin | Connaissance scopee |
| **Skills** | "Comment fait-on X ?" | A la demande (trigger description) | Workflow / procedure |
| **MCP** | "Quels outils externes ?" | Au boot session | Tools (APIs externes) |
| **Hooks** | "Garantir qu'une action s'execute" | Lifecycle events | Enforcement deterministe |

> **Definition cle** :
> - Les **skills** sont des **competences pour lancer un workflow** (verbes : deployer, auditer, scaffolder...).
> - Les **rules** sont de la **doc qui resume ce que fait une page / un block / une edge function** (noms : ce QUI existe).

## CLAUDE.md — le contexte permanent

**Fichier** : `CLAUDE.md` a la racine du projet.

**Contenu** : conventions / stack / regles critiques **valides pour TOUT le projet**.

**Exemple** (extrait de `nopillo-landing-exemple/CLAUDE.md`) :

```markdown
# CLAUDE.md — nopillo-landing-exemple

## Regle MCP critique
- Ne JAMAIS exposer SUPABASE_SERVICE_ROLE_KEY cote client.
- Utiliser mcp__claude_ai_supabase__* pour migrations.

## Stack
- Frontend : Astro 6 + Tailwind 4 + React (islands)
- Backend : Supabase (Postgres + Edge Function contact-form)
- Infra : Netlify

## Conventions
- Composants .astro pour statique, .tsx pour islands
- Variables d'env client : prefixe PUBLIC_*

## Cibles de perf
- Lighthouse Performance >= 95
- LCP < 2s, CLS < 0.1
```

**Regle critique** : **< 80 lignes**. Au-dela, l'adherence de Claude chute (test verifie par `context-guardian` check #1).

**Si > 80 lignes** : sortir le detail dans `docs/` et linker.

## Rules — la connaissance scopee

**Fichier** : `.claude/rules/[nom].md` avec frontmatter YAML.

**Contenu** : ce que fait **UN composant precis** / **UNE page** / **UNE edge function**.

**Charge auto** quand Claude touche un fichier matchant le pattern `paths:`.

**Exemple** : `.claude/rules/front/hero.md`

```markdown
---
paths:
  - "front/src/components/Hero.astro"
---

# Hero — composant LCP

## Role
Premiere section visible. Element LCP du Lighthouse.

## Contraintes
- <Image> Astro, loading="eager"
- Texte CTA depuis front/.env (HERO_CTA)
- Pas d'animation framer-motion (CLS)

## Dependencies
- HeroBackground.tsx
- CTAButton.astro
```

**Quand creer une rule ?**
- "Claude doit savoir CE QUE fait ce fichier quand il y touche"
- "Cette regle ne vaut que pour `front/**` ou `supabase/**`"
- "Un nouveau dev aurait besoin de cette info pour bosser sur ce fichier"

**Pas pour** :
- Une procedure (utilise skill)
- Une regle universelle (utilise CLAUDE.md)

## Skills — les competences workflow

**Fichier** : `.claude/skills/[verbe-kebab]/SKILL.md` avec frontmatter YAML.

**Contenu** : procedure repetable avec etapes.

**Charge a la demande** : Claude detecte le trigger dans la description.

**Exemple** : `.claude/skills/deploy-landing/SKILL.md`

```yaml
---
name: deploy-landing
description: Deploy une landing Astro vers Netlify avec validation Lighthouse. Use when "deploy", "ship to prod", "publier la landing".
allowed-tools: Read Write Bash mcp__claude_ai_supabase__*
model: sonnet
effort: medium
---

# Deploy Landing Workflow

1. Verifier build OK : cd front && npm run build
2. Snapshot bundle size
3. netlify deploy --prod
4. Lighthouse check (cible 95+)
5. Report markdown
```

**Quand creer un skill ?**
- "Je tape les memes etapes dans le chat plusieurs fois"
- "Cette procedure a 5+ etapes avec ordre strict"
- "Cette action doit gerer des erreurs / retry / validation"

**Pas pour** :
- Du contexte permanent (utilise CLAUDE.md ou rule)
- Un simple rappel (utilise rule)

**4 elements indispensables d'un bon skill** :
1. **`name`** : verbe-kebab clair (`audit-lcp`, pas `lighthouse-stuff`)
2. **`description`** : avec triggers explicites ("Use when X, Y, Z")
3. **Etapes numerotees** : ordre clair, verifications integrees
4. **Sortie attendue** : qu'est-ce que l'utilisateur recoit a la fin ?

## MCP — les outils externes

MCP = **Model Context Protocol**. Standard pour connecter Claude a des **outils / APIs externes**.

**Exemples** :
- `mcp__claude_ai_supabase__*` : execute SQL, apply migration, deploy edge function
- `mcp__webflow__*` : creer pages, manipuler design (Bridge App)
- `mcp__playwright__*` : controler un navigateur (test E2E)

**Difference cle vs skill** :
- **Skill** = procedure (Claude suit les etapes)
- **MCP** = outil concret (Claude appelle une fonction)

**Un skill peut UTILISER un MCP** :

```yaml
---
name: apply-migration-safe
allowed-tools: mcp__claude_ai_supabase__apply_migration mcp__claude_ai_supabase__execute_sql
---

1. SELECT count(*) FROM table (via execute_sql) — verifier etat
2. apply_migration (via MCP)
3. SELECT count(*) again — verifier delta
```

**Quand ajouter un MCP ?**
- Tu veux que Claude touche un service externe (Supabase, Stripe, GitHub...)
- Tu veux exposer des outils internes (DB, files...)

**Liste MCP installes** : `claude mcp list` dans Terminal.

## Hooks — l'enforcement deterministe

**Fichier** : `.claude/settings.json` (ou `~/.claude/settings.json` pour global).

**Quand** : une action **DOIT** s'executer sans exception (lint, format, audit).

**Exemple** : `.claude/settings.json`

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "command": "cd front && npm run lint -- --fix"
    }]
  }
}
```

**Difference vs skill** :
- **Skill** = Claude decide de l'appeler (peut oublier)
- **Hook** = Le harness execute systematiquement (oubli impossible)

**Pas pour** :
- Du contexte (utilise rule)
- Une procedure complexe (utilise skill)

## Le decision tree

```
Tu veux ajouter du contexte ou une action a Claude.

Q1 : Est-ce une procedure repetable avec etapes (deploy, audit, scaffold) ?
  OUI → SKILL  (.claude/skills/[verbe]/SKILL.md)
  NON → Q2

Q2 : Est-ce un fait permanent qui doit etre vrai a chaque session ?
  OUI → CLAUDE.md (court, < 80 lignes)
  NON → Q3

Q3 : Est-ce un fait specifique a UN fichier / UN dossier / UNE feature ?
  OUI → RULE  (.claude/rules/[nom].md avec paths:)
  NON → Q4

Q4 : Est-ce une action qui DOIT s'executer (lint, format, audit) ?
  OUI → HOOK (settings.json PreToolUse / PostToolUse)
  NON → Q5

Q5 : Tu veux acceder a un service / API externe ?
  OUI → MCP (claude mcp add ...)
  NON → Reconsiderer ; rarement justifie d'ajouter du contexte.
```

## Anti-patterns frequents

| Anti-pattern | Pourquoi c'est mal | Correction |
|---|---|---|
| CLAUDE.md > 80 lignes | Adherence chute, Claude ignore les regles | Sortir le detail dans `docs/` |
| Skill sans triggers explicites | Claude ne sait pas quand l'utiliser | Ajouter "Use when X, Y, Z" |
| Rule sans `paths:` | Charge tout le temps, pollue le contexte | Toujours scoper avec `paths:` |
| Skill = "fait un truc avec X" | Trop vague, Claude improvise | 1 verbe, 1 livrable concret |
| Mettre des secrets dans CLAUDE.md | Commit par erreur, leak | Variables d'env + `.gitignore` |
| Skill avec 20 etapes | Trop long, Claude se perd | Decouper en 2 skills |
| Hook qui formate sans confirmation | Modifie code malgre l'user | Limiter aux operations non destructives |

## Demos live (15 min)

Apres la theorie, demos en LIVE dans le terminal pour ancrer :

### 1. `/doc-maker` (10 min) — produire une doc reference

```
Sujet : un truc qui vous interesse — proposez

Exemples :
- "Best practices SEO 2026 pour landing ads"
- "Optimisation Lighthouse mobile"
- "Validation form RGPD"

Claude lance 6 WebSearch en parallele, fetch les 8 meilleures
URLs en parallele, et genere docs/[sujet]/ avec 5-8 fichiers.
```

Resultat attendu : `docs/[sujet]/_index.md` + 4-6 fichiers thematiques.

### 2. `/cdc-maker` (5 min) — cahier des charges structure

```
Sujet : un projet client reel d'un participant

Claude detecte le stack du projet courant, decoupe en taches
avec dependances, propose un plan d'execution.
```

Resultat attendu : `docs/cdc-[nom]/01-specs.md` + `02-taches.md`.

### 3. `/rule-maker` (5 min) — generer une rule

```
Cible : un composant existant dans le projet
(ex: front/src/components/Hero.astro)

Claude lit le composant et genere .claude/rules/front/hero.md
avec paths:, contraintes, dependencies.
```

Resultat attendu : `.claude/rules/front/[nom].md` avec frontmatter complet.

## A retenir (slide finale 2 min)

```
1. CLAUDE.md  = LES regles globales (< 80 lignes)
2. Rule       = CE qu'est un fichier (noms, faits)
3. Skill      = COMMENT faire un workflow (verbes, etapes)
4. MCP        = QUELS outils externes (Supabase, Webflow...)
5. Hook       = QUE garantir d'executer (lint, audit, format)
```

**Ton skill cet apres-midi** : 1 verbe, 1 livrable, 5-8 etapes.
Voir [04-livrable-skill-pm.md](04-livrable-skill-pm.md).

## Sources

- [docs/claude-code-rules/04-skills-vs-rules.md](../claude-code-rules/04-skills-vs-rules.md) — Decision tree complet + comparatif detaille
- [docs/claude-code-rules/02-claude-md.md](../claude-code-rules/02-claude-md.md) — Best practices CLAUDE.md
- [docs/claude-code-rules/06-anti-patterns.md](../claude-code-rules/06-anti-patterns.md) — Anti-patterns rules
- [nopillo-landing-exemple/CLAUDE.md](../../nopillo-landing-exemple/CLAUDE.md) — Exemple concret CLAUDE.md
- [.claude/skills/init-landing-stack/SKILL.md](../../.claude/skills/init-landing-stack/SKILL.md) — Exemple skill avance
- [.claude/skills/apply-nopillo-ds/SKILL.md](../../.claude/skills/apply-nopillo-ds/SKILL.md) — Exemple skill simple
