# Configuration `settings.json` — Reference complete

Tout ce qui concerne la cle `permissions` dans `settings.json`.

## Table de matieres

- [Structure complete](#structure-complete)
- [Locations et precedence](#locations-et-precedence)
- [Allow / Ask / Deny](#allow--ask--deny)
- [Tool syntax](#tool-syntax)
- [Wildcards Bash](#wildcards-bash)
- [Patterns gitignore pour Read/Edit](#patterns-gitignore-pour-readedit)
- [Exemples par scenario](#exemples-par-scenario)

## Structure complete

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [],
    "ask": [],
    "deny": [],
    "additionalDirectories": [],
    "defaultMode": "default",
    "disableBypassPermissionsMode": "disable",
    "disableAutoMode": "disable"
  }
}
```

| Cle | Type | Description |
|-----|------|-------------|
| `allow` | `string[]` | Regles autorisees sans prompt |
| `ask` | `string[]` | Regles qui prompt explicitement |
| `deny` | `string[]` | Regles bloquees (priorite absolue) |
| `additionalDirectories` | `string[]` | Working directories supplementaires |
| `defaultMode` | `string` | Mode par defaut a l'ouverture |
| `disableBypassPermissionsMode` | `"disable"` | Empeche d'utiliser bypassPermissions |
| `disableAutoMode` | `"disable"` | Empeche d'utiliser auto mode |

## Locations et precedence

### Fichiers de settings

| Scope | Path | Affecte | Partage equipe ? |
|-------|------|---------|------------------|
| **Managed** | `/etc/claude-code/managed-settings.json` (Linux/Mac), `C:\Program Files\ClaudeCode\managed-settings.json` (Win) | Tous users | Deploye par IT |
| **User** | `~/.claude/settings.json` | Toi, tous projets | Non |
| **Project** | `.claude/settings.json` | Toute l'equipe sur le repo | Oui (committe) |
| **Local** | `.claude/settings.local.json` | Toi, ce repo seulement | Non (gitignore) |

### Ordre de precedence (du plus fort au plus faible)

1. **Managed** — ne peut PAS etre override
2. **Command line arguments** (`--permission-mode`, `--allowedTools`)
3. **Local** (`.claude/settings.local.json`)
4. **Project** (`.claude/settings.json`)
5. **User** (`~/.claude/settings.json`)

**Exception** : les regles de permissions **mergent** entre scopes au lieu d'override. Toutes les `deny` de toutes les sources s'appliquent. Si un tool est `deny` a n'importe quel niveau, aucun autre niveau ne peut l'`allow`.

### Cas special `defaultMode: "auto"`

> Claude Code **ignore** `defaultMode: "auto"` dans `.claude/settings.json` (projet) ou `.claude/settings.local.json` (local). Seul `~/.claude/settings.json` (user) le prend en compte. C'est une protection pour qu'un repo ne puisse pas s'auto-attribuer auto-mode.

## Allow / Ask / Deny

Rules sont evaluees dans l'ordre : **deny → ask → allow**. Le premier match gagne.

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Read(./.env)",
      "Read(./secrets/**)"
    ],
    "ask": [
      "Bash(git push *)",
      "Bash(npm publish *)"
    ],
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Edit",
      "Write",
      "WebFetch"
    ]
  }
}
```

**Comportement special des deny** :
- Un deny "tool name nu" comme `Bash` **enleve le tool du contexte** de Claude (il ne le voit meme pas)
- Un deny scope comme `Bash(rm *)` **laisse le tool dispo** et bloque les matches a l'execution

## Tool syntax

### Match tous les usages

```
Bash             # tous les Bash
WebFetch         # tous les WebFetch
Read             # tous les reads
```

`Bash(*)` est equivalent a `Bash`.

### Specifiers

```
Bash(npm run build)         # commande exacte
Bash(npm run *)             # tous les npm run X
Read(./.env)                # lecture de ./.env
WebFetch(domain:example.com) # fetch vers example.com
mcp__puppeteer              # tous les tools du serveur puppeteer
mcp__puppeteer__navigate    # tool precis
Agent(Explore)              # subagent Explore
```

## Wildcards Bash

Wildcards `*` peuvent apparaitre **n'importe ou** dans la commande.

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)",
      "Bash(git * main)",
      "Bash(* --version)",
      "Bash(* --help *)"
    ]
  }
}
```

### Word boundary — piege important

```
Bash(ls *)   matche "ls -la" mais PAS "lsof"   (espace avant * = boundary)
Bash(ls*)   matche "ls -la" ET "lsof"          (pas de boundary)
```

### Suffix `:*`

Equivalent a un trailing wildcard avec boundary :

```
Bash(ls:*)   identique a   Bash(ls *)
```

Le `:*` n'est reconnu **qu'a la fin** d'un pattern. `Bash(git:* push)` traite le `:` comme litteral.

### Compound commands

Claude Code reconnait les operateurs shell : `&&`, `||`, `;`, `|`, `|&`, `&`, newlines.

Une regle doit matcher **chaque sous-commande independamment** :
```
Bash(safe-cmd *)   ne donne PAS permission a "safe-cmd && other-cmd"
```

Quand tu approuves un compound avec "Yes, don't ask again", Claude sauvegarde une regle separee pour chaque sous-commande qui necessitait approval (max 5 regles).

### Process wrappers strip

Avant de matcher les regles Bash, Claude Code strip ces wrappers :
- `timeout`, `time`, `nice`, `nohup`, `stdbuf`
- `xargs` (bare, sans flags)

Donc `Bash(npm test *)` matche aussi `timeout 30 npm test`.

**PAS strip** : `direnv exec`, `devbox run`, `mise exec`, `npx`, `docker exec`. Pour ces wrappers, ecrire une regle qui inclut le wrapper et la commande interne :
```
Bash(devbox run npm test)
```

### Read-only commands (toujours sans prompt)

Built-in et **pas configurable** :
- `ls`, `cat`, `echo`, `pwd`, `head`, `tail`, `grep`, `find`, `wc`, `which`, `diff`, `stat`, `du`, `cd`
- Forms read-only de `git`

Pour exiger prompt sur ces commands, ajouter `ask` ou `deny`.

## Patterns gitignore pour Read/Edit

Les rules `Read` et `Edit` suivent la specification gitignore avec 4 ancres :

| Pattern | Sens | Exemple | Matche |
|---------|------|---------|--------|
| `//path` | **Absolute** depuis filesystem root | `Read(//Users/alice/secrets/**)` | `/Users/alice/secrets/**` |
| `~/path` | Depuis **home** directory | `Read(~/Documents/*.pdf)` | `/Users/alice/Documents/*.pdf` |
| `/path` | Relatif a **project root** | `Edit(/src/**/*.ts)` | `<project>/src/**/*.ts` |
| `path` ou `./path` | Relatif a **cwd** | `Read(*.env)` | `<cwd>/*.env` |

⚠️ **Piege** : `/Users/alice/file` n'est PAS un absolute path. C'est relatif au project root. Pour absolute, utiliser `//Users/alice/file`.

### Symlinks

- **Allow** : matche seulement si le symlink ET sa cible matchent. Un symlink dans un dir autorise mais qui pointe hors prompt.
- **Deny** : matche si le symlink OU la cible matche. Un symlink vers un fichier denied est denied.

## Exemples par scenario

### Dev local — autoriser le plus possible sans tomber dans bypass

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm *)",
      "Bash(pnpm *)",
      "Bash(yarn *)",
      "Bash(bun *)",
      "Bash(git *)",
      "Bash(supabase *)",
      "Bash(netlify *)",
      "Bash(astro *)",
      "Bash(tsc *)",
      "Bash(eslint *)",
      "Bash(prettier *)",
      "Edit",
      "Write",
      "WebFetch"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf ~)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/credentials)",
      "Bash(git push --force *)",
      "Bash(git push -f *)"
    ]
  }
}
```

### CI — locked down

```json
{
  "permissions": {
    "defaultMode": "dontAsk",
    "allow": [
      "Bash(npm ci)",
      "Bash(npm run build)",
      "Bash(npm test)",
      "Read",
      "Edit"
    ]
  }
}
```

### Devcontainer isole — bypass total

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": [
      "Bash",
      "Edit",
      "Write",
      "WebFetch",
      "mcp__*"
    ]
  }
}
```

## Bugs connus a date (mai 2026)

| Bug | Issue | Status |
|-----|-------|--------|
| `WebFetch(domain:example.com)` ne matche pas `www.example.com` | [#11972](https://github.com/anthropics/claude-code/issues/11972) | Open |
| Wildcards `Bash(*)` ignores dans Desktop app | [#27139](https://github.com/anthropics/claude-code/issues/27139) | Open |
| `defaultMode: bypassPermissions` ignore (Desktop macOS) | [#29026](https://github.com/anthropics/claude-code/issues/29026) | Open |
| `defaultMode: bypassPermissions` n'a aucun effet | [#34923](https://github.com/anthropics/claude-code/issues/34923) | Open |
| Bypass casse depuis v2.1.78 | [#36168](https://github.com/anthropics/claude-code/issues/36168) | Open |
| Permission mode reset mid-session | [#39057](https://github.com/anthropics/claude-code/issues/39057) | Open |

## Sources

- [Configure permissions — Anthropic docs](https://code.claude.com/docs/en/permissions)
- [Claude Code settings — Anthropic docs](https://code.claude.com/docs/en/settings)
- [Permissions explained — Frontend Master](https://allahabadi.dev/blogs/ai/claude-code-permissions-settings-explained/) — wildcards detailles
- [Claude Code Permissions guide — Pete Freitag](https://www.petefreitag.com/blog/claude-code-permissions/) — exemples pratiques
