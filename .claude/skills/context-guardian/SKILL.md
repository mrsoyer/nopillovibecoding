---
name: context-guardian
description: >
  Verifie et maintient la sante du contexte Claude Code : CLAUDE.md taille/structure,
  rules/ coherence et path-scoping, agents/ pertinence, .claudeignore couverture,
  skills frontmatter complet, synchronisation DB schema, crons vs edge functions,
  settings proprete. Score /80 avec auto-fix des problemes simples.
  Declenche avec "verifie le contexte", "context check", "context guardian",
  "audit contexte", "sante du projet", "check claude md".
argument-hint: "[--fix] [--verbose]"
allowed-tools: Read Write Edit Glob Grep Bash mcp__supabase__execute_sql
model: sonnet
effort: medium
---

# Context Guardian — Maintenance Continue du Contexte Claude Code

Verifie 8 domaines du contexte Claude Code et produit un dashboard ASCII avec score /80.
Corrige automatiquement les problemes simples (auto-fix).

## References disponibles

| Fichier | Quand le lire |
|---------|---------------|
| [references/checks-detail.md](references/checks-detail.md) | Pour les queries SQL et seuils de scoring detailles |

## Workflow

Execute les 8 checks sequentiellement. Pour chaque check, calcule un score /10.
Affiche le dashboard final avec le score global /80.

### Check 1 — CLAUDE.md taille et structure

Lis `CLAUDE.md`. Compte les lignes.

| Condition | Score | Action |
|-----------|-------|--------|
| <= 80 lignes | 10 | OK |
| 81-150 lignes | 7 | WARNING — identifier sections a extraire |
| > 150 lignes | 3 | CRITICAL — trop long, adherence degradee |

Verifie que la regle MCP (`mcp__supabase__*`) est presente dans les 3 premieres lignes ET dans les 3 dernieres lignes.
Raison : primacy/recency bias — les regles en haut et bas du fichier sont mieux suivies.

Si schema DB inline (> 10 lignes SQL) : -3 points.
Si "Priorites de Developpement" ou "Phases" : -2 points (ca va dans docs/).

### Check 2 — .claude/rules/ coherence

Liste tous les fichiers `.claude/rules/*.md` avec Glob.

Pour chaque fichier avec un frontmatter `paths:` :
1. Extrais les patterns glob
2. Verifie avec Glob que chaque pattern matche au moins 1 fichier existant
3. Si un pattern ne matche rien : WARNING — path obsolete

Score :
- 7+ fichiers rules : 10
- 4-6 fichiers : 7
- 1-3 fichiers : 4
- 0 fichiers : 0

Retire 2 points par path obsolete (pattern qui ne matche rien).

### Check 3 — .claude/agents/ pertinence

Liste `.claude/agents/*.md` avec Glob.

Pour chaque agent, verifie dans le frontmatter YAML :
- `name` present
- `description` present et > 20 mots
- `model` present (haiku, sonnet, ou opus)
- `tools` present

Score : 10 si tous les champs sont presents sur tous les agents. -2 par champ manquant.
Si aucun agent : 5 (pas bloquant mais sous-optimal).

### Check 4 — .claudeignore couverture

Verifie que `.claudeignore` existe.

Si existe : verifie que ces patterns sont presents :
- `node_modules` (ou variante)
- `*.lock` ou `package-lock.json`
- `.git` des sous-projets (si heroku-mail-relay/ existe)

Score : 10 si existe + couvre les 3 patterns. -3 par pattern manquant. 0 si fichier absent.

### Check 5 — Skills frontmatter complet

Liste `.claude/skills/*/SKILL.md` avec Glob.

Pour chaque SKILL.md, verifie dans le frontmatter :
- `name` present
- `description` present
- `allowed-tools` present (pas tout herite)
- `model` present

Comptabilise : X/Y skills complets.
Score : (skills_complets / total_skills) * 10, arrondi.

### Check 6 — Synchronisation DB

Charge [references/checks-detail.md](references/checks-detail.md) pour la query SQL exacte.

Compte les tables reelles via `mcp__supabase__execute_sql` :
```sql
SELECT count(*) FROM pg_tables WHERE schemaname = 'public';
```

Lis `.claude/rules/postgresql/db-schema.md`. Compte les tables mentionnees (lignes contenant `|` dans les tableaux).

| Ecart | Score | Action |
|-------|-------|--------|
| 0-2 tables | 10 | Synchronise |
| 3-5 tables | 7 | WARNING — lister les manquantes |
| > 5 tables | 4 | CRITICAL — mettre a jour db-schema.md |

**Auto-fix** : si ecart > 3, lister les tables reelles manquantes dans le rapport.
Si `--fix` : ajouter les tables manquantes au bon groupe dans db-schema.md.

### Check 7 — Crons vs Edge Functions

Charge [references/checks-detail.md](references/checks-detail.md) pour la query SQL exacte.

Liste les cron jobs actifs via SQL. Liste les EF locales via Glob sur `supabase/functions/*/index.ts`.

Identifie :
- Crons qui appellent une EF non presente en local → WARNING
- EF "orchestrator/pump/cron" sans cron job → WARNING

Score : 10 - (2 * nombre_warnings).

### Check 8 — settings.local.json proprete

Lis `.claude/settings.local.json`. Compte les lignes dans `permissions.allow`.

| Condition | Score | Action |
|-----------|-------|--------|
| <= 30 lignes | 10 | Propre |
| 31-50 lignes | 7 | Accumulation legere |
| > 50 lignes | 4 | Nettoyage necessaire |

Cherche des tokens/secrets : pattern `eyJ`, `Bearer ey`, `api_key=`, `sk-`.
Si trouve : -5 points + CRITICAL.

## Dashboard Final

Apres les 8 checks, affiche :

```
CONTEXT GUARDIAN — MyCommu — [date]
===================================

  CLAUDE.md        [==========] 10/10  [detail]
  Rules            [========  ]  8/10  [detail]
  Agents           [==========] 10/10  [detail]
  .claudeignore    [==========] 10/10  [detail]
  Skills           [========  ]  8/10  [detail]
  DB sync          [======    ]  6/10  [detail]
  Crons            [========  ]  8/10  [detail]
  Settings         [==========] 10/10  [detail]

  SCORE GLOBAL     70/80 (87%)

  ACTIONS :
  1. [AUTO-FIX] ...
  2. [WARNING] ...
```

Genere la barre `[===...]` proportionnellement au score (10 caracteres = 10 points).

## Regles

- Executer les 8 checks dans l'ordre, sans en sauter
- Raison : chaque check peut influencer les recommandations du suivant
- Toujours afficher le dashboard meme si score parfait
- Auto-fix uniquement si `--fix` est passe OU si score >= 70/80
- Raison : en dessous de 70, demander confirmation avant de modifier
- Si `--verbose` : afficher le detail de chaque check (fichiers lus, queries, resultats bruts)
- Ne jamais modifier CLAUDE.md sans afficher le diff propose d'abord
- Raison : CLAUDE.md est critique, toute modification doit etre visible
