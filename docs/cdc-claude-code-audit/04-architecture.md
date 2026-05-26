# 04 — Architecture des Extensions Claude Code

> Decoder les 5 piliers d'extensibilite de Claude Code et savoir quand utiliser quoi : CLAUDE.md, Skills, Subagents, Hooks, MCP. Avec matrice de decision et exemples concrets.

## Table des matieres

- [Vue d'ensemble](#vue-densemble)
- [Pilier 1 — CLAUDE.md (memoire projet)](#pilier-1--claudemd-memoire-projet)
- [Pilier 2 — Skills (workflows reutilisables)](#pilier-2--skills-workflows-reutilisables)
- [Pilier 3 — Subagents (contexte isole)](#pilier-3--subagents-contexte-isole)
- [Pilier 4 — Hooks (enforcement deterministe)](#pilier-4--hooks-enforcement-deterministe)
- [Pilier 5 — MCP (integration externe)](#pilier-5--mcp-integration-externe)
- [Comment ils interagissent](#comment-ils-interagissent)
- [Matrice de decision](#matrice-de-decision)
- [Exemples du projet hote](#exemples-du-projet-hote)

## Vue d'ensemble

```
                     CLAUDE.md
                  (contexte persistant)
                          |
                          v
                       SKILLS
               (workflows reutilisables)
                  /              \
                 v                v
          SUBAGENTS              MCP
       (contexte isole)    (integration externe)
                 \              /
                  v            v
                     HOOKS
              (enforcement deterministe)
```

Source : alexop.dev/posts/understanding-claude-code-full-stack/

**Regle de partage** :
- **Skills + MCP** couvrent 80% des workflows
- **Hooks** automatisent linting/guardrails
- **Subagents** delegent quand contexte devient lourd
- **Plugins** packagent tout pour l'equipe

## Pilier 1 — CLAUDE.md (memoire projet)

### Definition

Fichier markdown hierarchique fournissant du contexte projet persistant : conventions, architecture, patterns. Charge automatiquement au demarrage de chaque session.

### Quand utiliser

- Connaissances statiques (tech stack, code standards, build commands)
- Patterns d'equipe qui ne changent pas par conversation
- Reference que Claude doit toujours consulter

### Quand NE PAS utiliser

- Workflows dynamiques -> use **Skills**
- Instructions temporaires -> use chat context
- Documentation API verbose -> linker vers la source

### Hierarchie

```
Enterprise (managed)              -> applique a tous projets en organisation
   |
~/.claude/CLAUDE.md (User)        -> applique a toutes vos sessions
   |
./CLAUDE.md (Project)             -> commit dans git (equipe)
   |
./CLAUDE.local.md (Personal)      -> gitignore (perso)
   |
[parent]/CLAUDE.md (Monorepo)     -> auto-pulled
   |
[child]/CLAUDE.md (On-demand)     -> charge quand on bosse dans ce dossier
```

### Imports

```markdown
See @README.md for overview and @package.json for commands.

# Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md
```

### Format optimal

Voir [03-best-practices.md](03-best-practices.md#bp-41--claudemd-court-et-cible) pour la liste a inclure / exclure.

## Pilier 2 — Skills (workflows reutilisables)

### Definition

Folders modulaires avec fichier `SKILL.md` definissant comportements reutilisables. **Modele unifie** remplacant l'ancien split commands/skills.

### Quand utiliser

- Workflows repetables ET expertise domaine
- Enforcement automatique de patterns projet
- Auto-invocation OU manuel-trigger

### Quand NE PAS utiliser

- Connaissance projet statique -> use **CLAUDE.md**
- Tache one-shot avec configuration minimale -> direct prompt

### Format

```markdown
.claude/skills/api-conventions/SKILL.md
---
name: api-conventions
description: REST API design conventions for our services
---
# API Conventions
- Use kebab-case for URL paths
- Use camelCase for JSON properties
- Always include pagination for list endpoints
- Version APIs in URL path (/v1/, /v2/)
```

### Frontmatter avance

| Cle | Effet |
|---|---|
| `description:` set | Auto-invoque quand task match |
| `disable-model-invocation: true` | Manuel uniquement (`/skill-name`) |
| `context: fork` | Execution dans subagent isole |
| `allowed-tools: ...` | Restriction outils |

### Workflow comme skill

```markdown
.claude/skills/fix-issue/SKILL.md
---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---
Analyze and fix GitHub issue: $ARGUMENTS.

1. Use `gh issue view` to get details
2. Search codebase for relevant files
3. Implement fix
4. Write and run tests
5. Lint + typecheck
6. Commit + push + PR
```

Invoquer : `/fix-issue 1234`

### Anti-pattern

> "Si vous avez ecrit les memes instructions a Claude deux fois, c'aurait du etre un skill la premiere fois."

## Pilier 3 — Subagents (contexte isole)

### Definition

Personalites IA specialisees avec contexte isole, system prompt specifique, et acces outils restreint. Pour deleguer du travail.

### Quand utiliser

- **Execution parallele** (audit securite + generation tests simultanes)
- **Travail computationnel lourd** qui pollurait le contexte principal
- **Deep dives specialises** (recherche, audit)

### Quand NE PAS utiliser

- Taches simples / rapides : main context suffit
- Travail necessitant feedback frequent du primary agent

### Beneficie cle

> "Prevenir le context poisoning : quand le travail d'implementation detaille pollute votre conversation principale."

### Format

```markdown
.claude/agents/security-auditor.md
---
name: security-auditor
description: Reviews code for security vulnerabilities
tools: Read, Grep, Bash
model: sonnet
---
You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command)
- Auth and authorization flaws
- Secrets in code
- Insecure data handling

Provide line refs and suggested fixes.
```

### Subagents builtin

| Type | Caracteristique | Use case |
|---|---|---|
| **Explore** | Fast, read-only, Haiku | Recherche codebase rapide |
| **Plan** | Research-focused | Planification implementation |
| **General-purpose** | Full access | Multi-step tasks complexes |

### Invocation

> "Tell Claude to use subagents explicitly."

```
Use a subagent to review this code for security issues
```

```
Use subagents to investigate how our auth handles token refresh
```

## Pilier 4 — Hooks (enforcement deterministe)

### Definition

Event handlers JSON dans `.claude/settings.json` qui se declenchent automatiquement sur events lifecycle. **Pas d'invocation manuelle**.

### Quand utiliser

- Auto-enforcement apres edits (linting, formatting)
- Quality gates necessitant approbation
- Comportements reactifs lies a events specifiques

### Quand NE PAS utiliser

- Workflows primaires -> **Skills**
- Logique de decision complexe -> **Skill prompts**

### Difference vs CLAUDE.md

> "Hooks sont deterministes et garantissent que l'action arrive. CLAUDE.md instructions sont advisory."

### Events disponibles

| Categorie | Events |
|---|---|
| Tool lifecycle | `PreToolUse`, `PostToolUse` |
| Session lifecycle | `SessionStart`, `Stop` |
| File changes | `FileChanged`, `CwdChanged` |
| Task lifecycle | `TaskCreated`, `TaskCompleted` |

### Exemple : auto-lint apres edits

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "run-oxlint.sh" }
        ]
      }
    ]
  }
}
```

### Auto-generation

Claude peut ecrire ses propres hooks :
- "Write a hook that runs eslint after every file edit"
- "Write a hook that blocks writes to the migrations folder"

### Browse hooks

```bash
/hooks                    # List configured hooks
```

## Pilier 5 — MCP (integration externe)

### Definition

**Model Context Protocol** : adaptateur universel connectant Claude Code a outils externes, APIs, databases via protocole standardise.

### Quand utiliser

- Integration GitHub, databases, third-party APIs
- Exposer capabilities systeme externe comme slash commands
- Connectivite universelle multi-services

### Quand NE PAS utiliser

- Logique projet interne -> **Skills**
- Quand context overhead critique : MCP charge schemas complets upfront

### Limitation cle

> "MCP servers expose their own tools. They don't inherit Claude's Read, Write, or Bash unless you provide them."

### Setup

```bash
# Add MCP server
claude mcp add playwright npx @playwright/mcp@latest

# List MCPs
claude mcp list

# Use MCP tool
/mcp__playwright__create-test [args]
```

### MCPs notables

| MCP | Usage |
|---|---|
| **GitHub** (officiel) | Issues, PRs, comments |
| **Webflow** | CMS, pages, components |
| **Supabase** | DB, RLS, edge functions, migrations |
| **Notion** | Pages, databases |
| **Figma** | Designs, components |
| **Sentry** | Error tracking |
| **Playwright** | E2E testing |
| **context7** | Docs libraries up-to-date |

## Comment ils interagissent

```
1. Project loads CLAUDE.md
   (standards established)
        |
        v
2. Skill auto-invokes based on task match
   (workflow triggered)
        |
        v
3. Skill delegates heavy work to Subagent
   (context fork)
        |
        v
4. Hook enforces quality after Subagent completes
   (lint, format, security)
        |
        v
5. MCP integration fetches external data
   (DB query, API call)
```

### Real-world flow exemple

Implementer feature "user export" :

```
1. CLAUDE.md indique conventions API + style code
2. Skill `feature-create` declenche
3. Skill delegue a `Explore` subagent : "find similar export features"
4. Subagent retourne summary -> contexte reste leger
5. Skill code la feature en suivant patterns
6. Hook PostToolUse : eslint + tsc apres chaque Edit
7. MCP supabase : applique migration schema export_jobs
8. MCP github : ouvre PR avec description
```

## Matrice de decision

| Besoin | Outil | Pourquoi |
|---|---|---|
| Contexte durable | **CLAUDE.md** | Persiste entre conversations |
| Automatisation workflow | **Skill** | Reutilisable, configurable |
| Travail parallele | **Subagent** | Contextes isoles |
| Enforcement automatique | **Hook** | Event-driven, zero friction |
| Integration externe | **MCP** | Adapter universel |

### Arbre de decision rapide

```
Tache repetitive ?
   |
   YES --> Workflow ou knowledge ?
   |        WORKFLOW --> Skill
   |        KNOWLEDGE --> CLAUDE.md
   |
   NO ---> Heavy / parallel ?
            |
            YES --> Subagent
            |
            NO ---> Doit toujours s'executer ?
                     |
                     YES --> Hook (deterministe)
                     |
                     NO ---> External system ?
                              |
                              YES --> MCP
                              |
                              NO ---> Direct prompt
```

## Exemples du projet hote

Le projet `/Users/thomas/webflowlanding/` utilise ces 5 piliers :

| Pilier | Exemples installes | Detail |
|---|---|---|
| **CLAUDE.md** | `~/.claude/CLAUDE.md` (~700 lignes) | SYM Framework v4.8 (47 agents) |
| **Skills** | 8 skills Cowork | cdc-maker, doc-maker, find-docs, simplify, claude-api, skill-maker, etc. |
| **Subagents** | 47 agents SYM | sym-fe-core, sym-be-edge, orchestrator, sym-debug, etc. |
| **Hooks** | A configurer | Pas detecte sur ce projet (opportunite cf. [06-taches.md](06-taches.md)) |
| **MCP** | 8 servers | webflow, supabase, context7, doctrine, lemlist, n8n, pappers, hubspot |

**Observations** :
- Setup riche cote skills + subagents + MCP
- **Manque** : hooks (lint, format, typecheck post-edit)
- **Manque** : `./CLAUDE.md` projet (uniquement global) -> conventions projet a expliciter
- Voir [06-taches.md](06-taches.md) pour plan d'action.
