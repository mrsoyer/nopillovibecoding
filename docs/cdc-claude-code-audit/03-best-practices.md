# 03 — Best Practices Claude Code (Officielles Anthropic)

> Compilation des best practices officielles documentees sur https://code.claude.com/docs/en/best-practices, organisees par theme et priorisees pour adoption immediate.

## Table des matieres

- [Principe fondateur](#principe-fondateur)
- [Theme 1 — Verification](#theme-1--verification-ce-qui-a-le-plus-dimpact)
- [Theme 2 — Plan Mode](#theme-2--plan-mode-explore-plan-code)
- [Theme 3 — Specificite des prompts](#theme-3--specificite-des-prompts)
- [Theme 4 — Configuration environnement](#theme-4--configuration-environnement)
- [Theme 5 — Communication](#theme-5--communication)
- [Theme 6 — Gestion de session](#theme-6--gestion-de-session)
- [Theme 7 — Automatisation et scaling](#theme-7--automatisation-et-scaling)
- [Anti-patterns a eviter](#anti-patterns-a-eviter)
- [Top 10 priorise](#top-10-priorise)

## Principe fondateur

> **"La performance LLM degrade quand le contexte se remplit. Le context window est la ressource la plus importante a gerer."**
> — Documentation officielle Anthropic

Toutes les best practices decoulent de ce principe : preserver, focaliser, et nettoyer le contexte.

## Theme 1 — Verification (ce qui a le plus d'impact)

### BP-1.1 — Donner un moyen de verification

> "C'est la chose a plus haut effet de levier que vous puissiez faire."

| Avant | Apres |
|---|---|
| "implement a function that validates email" | "write a validateEmail function. Test cases: user@example.com is true, invalid is false. Run tests after implementing" |
| "make the dashboard look better" | "[paste screenshot] implement this design. Take a screenshot, compare to original, list differences and fix them" |
| "the build is failing" | "the build fails with [paste error]. Fix and verify it succeeds. Address root cause, don't suppress" |

### BP-1.2 — Verification visuelle UI

Utiliser l'extension **Claude in Chrome** : ouvre des onglets, teste l'UI, itere jusqu'a ce que ca marche.

### BP-1.3 — Adresser les root causes, pas les symptomes

Toujours demander : "address the root cause, don't suppress the error".

## Theme 2 — Plan Mode (Explore -> Plan -> Code)

### BP-2.1 — Le workflow en 4 phases

```
1. EXPLORE (plan mode active)
   └─ Claude lit et repond, sans modifier
   └─ Ex: "read /src/auth and explain how sessions work"

2. PLAN (plan mode active)
   └─ Claude propose un plan implementation detaille
   └─ Ctrl+G pour ouvrir le plan dans editeur et l'editer
   └─ Ex: "Add Google OAuth. What files? Session flow? Create plan"

3. IMPLEMENT (plan mode off)
   └─ Claude code en suivant son plan
   └─ Ex: "implement the OAuth flow. write tests. run suite. fix failures"

4. COMMIT (plan mode off)
   └─ Claude commit + PR
   └─ Ex: "commit with descriptive message and open a PR"
```

### BP-2.2 — Quand sauter le planning

> "Si vous pouvez decrire le diff en une phrase, sautez le plan."

A utiliser : typo, log line, rename de variable, fix trivial.

A NE PAS utiliser : modifications multi-fichiers, code que vous ne connaissez pas, scope flou.

## Theme 3 — Specificite des prompts

### BP-3.1 — Scoper la tache

| Avant | Apres |
|---|---|
| "add tests for foo.py" | "write tests for foo.py covering edge case where user is logged out. Avoid mocks." |

### BP-3.2 — Pointer vers les sources

| Avant | Apres |
|---|---|
| "why is ExecutionFactory's API weird?" | "look through ExecutionFactory's git history and summarize how its api came to be" |

### BP-3.3 — Referencer les patterns existants

| Avant | Apres |
|---|---|
| "add a calendar widget" | "look at how widgets are implemented on home page. HotDogWidget.php is good example. Follow the pattern. Build from scratch without new libraries." |

### BP-3.4 — Decrire les symptomes (pour bugs)

| Avant | Apres |
|---|---|
| "fix the login bug" | "users report login fails after session timeout. Check src/auth/, especially token refresh. Write a failing test that reproduces, then fix it" |

### BP-3.5 — Fournir du contenu riche

| Methode | Usage |
|---|---|
| `@filename` | Reference fichier (Claude le lit avant de repondre) |
| Drag/drop image | Coller screenshots directement |
| URLs | Documentation/API references (allowlister via `/permissions`) |
| `cat error.log \| claude` | Pipe data directement |
| "Pull context yourself" | Laisser Claude utiliser Bash/MCP/Read |

## Theme 4 — Configuration environnement

### BP-4.1 — CLAUDE.md court et cible

> "Si Claude continue de faire X malgre une regle, c'est probablement que le fichier est trop long et la regle se perd."

**Regle d'or** : pour chaque ligne, demander : "supprimer cette ligne ferait-il faire des erreurs a Claude ?". Sinon, couper.

| Inclure | Exclure |
|---|---|
| Commandes Bash que Claude ne peut deviner | Tout ce que Claude peut deduire en lisant le code |
| Style code different des defaults | Conventions standard du langage |
| Instructions tests + runners preferes | Documentation API detaillee (linker plutot) |
| Repository etiquette (branches, PRs) | Information qui change souvent |
| Decisions architecturales projet | Explications longues / tutos |
| Quirks dev environment (env vars) | Description fichier-par-fichier |
| Gotchas / comportements non-evidents | Pratiques evidentes ("ecrire du code propre") |

**Locations possibles** :
- `~/.claude/CLAUDE.md` : toutes sessions
- `./CLAUDE.md` : projet (commit dans git)
- `./CLAUDE.local.md` : personnel (gitignore)
- `[parent]/CLAUDE.md` : monorepos
- `[child]/CLAUDE.md` : pulled on-demand

### BP-4.2 — Imports CLAUDE.md

```markdown
See @README.md for project overview and @package.json for npm commands.

# Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md
```

### BP-4.3 — Permissions modes

| Mode | Quand l'utiliser |
|---|---|
| Default | Debutant, taches sensibles |
| Auto | Confiance dans direction generale, mais pas tous les details (classifier filtre) |
| Allowlist (`/permissions`) | Outils specifiques surs (npm lint, git commit) |
| Sandbox | Isolation OS-level (FS + network) |

### BP-4.4 — Outils CLI

> "Les CLI tools sont la facon la plus context-efficient d'interagir avec services externes."

Installer `gh`, `aws`, `gcloud`, `sentry-cli`. Sans `gh`, Claude utilise l'API GitHub mais hits rate limits.

**Astuce** : `Use 'foo-cli-tool --help' to learn about foo, then use it to solve A, B, C`

### BP-4.5 — Hooks (deterministe)

> "Hooks are deterministic and guarantee the action happens. CLAUDE.md instructions are advisory."

Use cases :
- Lint/format apres edit
- Bloquer ecritures dans `migrations/`
- Quality gates avant commit

Claude peut ecrire ses propres hooks : "Write a hook that runs eslint after every file edit"

### BP-4.6 — Skills

> "Skills extend Claude's knowledge with project/team/domain specific information."

Format minimal :
```markdown
.claude/skills/api-conventions/SKILL.md
---
name: api-conventions
description: REST API design conventions
---
# API Conventions
- Use kebab-case for URL paths
- Use camelCase for JSON properties
```

Workflows aussi (avec `disable-model-invocation: true` pour eviter auto-trigger).

### BP-4.7 — Subagents

> "Run in their own context with their own tools. Useful for tasks reading many files or specialized focus."

Format :
```markdown
.claude/agents/security-reviewer.md
---
name: security-reviewer
description: Reviews code for security
tools: Read, Grep, Glob, Bash
model: opus
---
You are a senior security engineer. Review for...
```

Invoquer : "Use a subagent to review this code for security issues"

## Theme 5 — Communication

### BP-5.1 — Poser des questions de senior engineer

A demander a Claude (zero prompting special) :
- "How does logging work?"
- "How do I make a new API endpoint?"
- "What does `async move { ... }` do on line 134?"
- "What edge cases does CustomerOnboardingFlowImpl handle?"

C'est un workflow d'onboarding tres efficace.

### BP-5.2 — Laisser Claude vous interviewer

Pour features complexes :

```
I want to build [brief]. Interview me using AskUserQuestion tool.
Ask about technical implementation, UI/UX, edge cases, tradeoffs.
Don't ask obvious questions, dig into hard parts.
Keep interviewing until everything covered, then write SPEC.md.
```

Puis : nouvelle session pour implementer (contexte propre + spec ecrit).

## Theme 6 — Gestion de session

### BP-6.1 — Course-correct early and often

| Action | Effet |
|---|---|
| `Esc` | Stop Claude mid-action, contexte preserve |
| `Esc + Esc` ou `/rewind` | Restorer etat precedent (conversation/code) |
| "Undo that" | Claude revert ses changes |
| `/clear` | Reset contexte entier |

> "Si vous corrigez Claude plus de 2 fois sur la meme issue, le contexte est pollue. `/clear` et reprenez avec un meilleur prompt initial."

### BP-6.2 — Manage context aggressively

- `/clear` entre taches non-reliees
- Auto-compaction declenche pres de la limite (preserve code + decisions)
- `/compact <instructions>` pour controler ("Focus on API changes")
- `Esc + Esc` -> Summarize from here pour compaction partielle
- `/btw` pour quick questions (dismissable overlay, pas dans l'historique)

### BP-6.3 — Subagents pour investigation

> "Subagents run in separate context windows and report back summaries."

```
Use subagents to investigate how our authentication system handles
token refresh, and whether we have any existing OAuth utilities I should reuse.
```

### BP-6.4 — Checkpoints

- Auto-checkpoint avant chaque change
- `Esc Esc` ou `/rewind` pour menu
- Persistent across sessions
- ATTENTION : track only Claude's changes, pas les processus externes -> pas un remplacement de git

### BP-6.5 — Resume conversations

```bash
claude --continue              # Reprend la derniere session
claude --resume                # Choisir dans la liste
/rename oauth-migration        # Nommer la session
```

## Theme 7 — Automatisation et scaling

### BP-7.1 — Non-interactive mode

```bash
# One-off
claude -p "Explain what this project does"

# Pour scripts
claude -p "List all API endpoints" --output-format json

# Streaming
claude -p "Analyze this log file" --output-format stream-json
```

Use cases : CI, pre-commit hooks, batch processing.

### BP-7.2 — Sessions paralleles

Choisir selon coordination voulue :

| Methode | Coordination | Use case |
|---|---|---|
| Worktrees | Manuel | Sessions CLI isolees, edits separes |
| Desktop app | Visuel | Multi-sessions avec UI |
| Claude Code on the web | Cloud | Sessions VM isolees Anthropic |
| Agent teams | Auto | Coordination + messaging + team lead |

### BP-7.3 — Pattern Writer/Reviewer

Improve quality via fresh context :

| Session A (Writer) | Session B (Reviewer) |
|---|---|
| "Implement rate limiter for API" | "Review @src/middleware/rateLimiter.ts. Edge cases? Race conditions? Existing patterns?" |
| "Address feedback: [B output]" | |

Variation : Tests-First Writer, then Code Writer.

### BP-7.4 — Fan-out across files

```bash
# Generate task list
"list all 2,000 Python files that need migrating"

# Loop with -p
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit *)"
done
```

`--allowedTools` essentiel pour batch unattended.

### BP-7.5 — Auto mode

```bash
claude --permission-mode auto -p "fix all lint errors"
```

Classifier separe verifie commands. Bloque scope escalation, infrastructure unknown, hostile content. En mode `-p` : abort si bloque trop souvent.

## Anti-patterns a eviter

| Anti-pattern | Symptome | Fix |
|---|---|---|
| **Kitchen sink session** | Une session pour tout | `/clear` entre taches non-reliees |
| **Correcting over and over** | Meme erreur corrigee 3x | Apres 2 tentatives : `/clear` + meilleur prompt |
| **Over-specified CLAUDE.md** | Claude ignore les regles | Pruning ruthless. Convertir en hooks. |
| **Trust-then-verify gap** | Code "plausible" qui ne marche pas | TOUJOURS donner moyen de verification |
| **Infinite exploration** | "Investigue X" -> 100 files lus | Scoper l'investigation OU subagent |

## Top 10 priorise

Par impact decroissant (a appliquer dans l'ordre) :

| # | Best practice | Effort | Impact | Theme |
|---|---|---|---|---|
| 1 | Donner moyen de verification systematique | Bas | Tres haut | BP-1.1 |
| 2 | `/clear` entre taches non-reliees | Bas | Tres haut | BP-6.2 |
| 3 | CLAUDE.md court (< 50 lignes) | Moyen | Haut | BP-4.1 |
| 4 | Plan mode pour multi-files | Bas | Haut | BP-2.1 |
| 5 | Subagents pour investigation | Bas | Haut | BP-6.3 |
| 6 | Specificite prompts (5W : qui/quoi/quand/ou/pourquoi) | Bas | Haut | BP-3 |
| 7 | Hooks pour enforcement (lint, format) | Moyen | Haut | BP-4.5 |
| 8 | Allowlist permissions outils sufrs | Bas | Moyen | BP-4.3 |
| 9 | Skills pour workflows reutilisables | Haut | Haut (a terme) | BP-4.6 |
| 10 | Pattern Writer/Reviewer pour code review | Moyen | Moyen | BP-7.3 |

Voir [04-architecture.md](04-architecture.md) pour decision MCP vs Skills vs Subagents vs Hooks.
