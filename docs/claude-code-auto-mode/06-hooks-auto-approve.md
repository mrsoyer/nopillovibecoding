# Hooks pour auto-approuver les prompts

> Si les `allow` rules ne suffisent pas et que tu veux un controle programmatique, les hooks `PermissionRequest` et `PreToolUse` sont la solution.

## TL;DR

Les hooks Claude Code permettent d'executer des commands shell a des moments precis du cycle de vie. Deux hooks sont utiles pour auto-approuver :

- **`PermissionRequest`** : intercepte le prompt de permission AVANT qu'il soit affiche, retourne `allow`/`deny`/`ask`
- **`PreToolUse`** : execute AVANT le tool, peut block en exit code 2

Bonus : les hooks marchent meme quand le mode `bypassPermissions` est cassé.

## Hooks disponibles

Claude Code supporte 18+ events de hooks. Les plus pertinents pour auto-approve :

| Event | Quand il fire | Peut block ? |
|-------|---------------|--------------|
| `PreToolUse` | Avant chaque tool call | ✅ (exit code 2) |
| `PostToolUse` | Apres tool execute | ❌ |
| `PermissionRequest` | Quand Claude Code va afficher un dialog de permission | ✅ (retourne JSON) |
| `Notification` | Quand Claude attend input | ❌ |
| `SessionStart` | Au debut de session | ❌ |
| `Stop` | Quand Claude finit | ❌ |

> Note : `PermissionRequest` ne fire **PAS** en non-interactive mode (`-p`). En headless, utiliser `PreToolUse`.

## Configuration

Hooks dans `~/.claude/settings.json` (user), `.claude/settings.json` (projet), ou `.claude/settings.local.json` (local) :

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "PatternToMatch",
        "hooks": [
          {
            "type": "command",
            "command": "shell command here"
          }
        ]
      }
    ]
  }
}
```

`matcher` est vide pour match tous, ou un regex sur le tool name (ex : `Edit|Write`).

## Patterns d'auto-approve

### 1. Auto-approve TOUT (sandbox uniquement)

⚠️ **Equivaut a bypass total**. A utiliser dans devcontainer isole seulement.

```json
{
  "hooks": {
    "PermissionRequest": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "echo '{\"behavior\": \"allow\"}'"
          }
        ]
      }
    ]
  }
}
```

### 2. Auto-approve ExitPlanMode

Le cas le plus courant : tu veux que le passage de plan a execution se fasse sans prompt.

```json
{
  "hooks": {
    "PermissionRequest": [
      {
        "matcher": "ExitPlanMode",
        "hooks": [
          {
            "type": "command",
            "command": "echo '{\"behavior\": \"allow\"}'"
          }
        ]
      }
    ]
  }
}
```

### 3. Auto-approve avec liste de commandes safe

Script externe qui decide selon le contenu :

```bash
# .claude/hooks/auto-approve.sh
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Auto-allow certains tools entierement
case "$TOOL_NAME" in
  Read|Grep|Glob|WebFetch)
    echo '{"behavior": "allow"}'
    exit 0
    ;;
esac

# Auto-allow certaines commandes Bash
if [ "$TOOL_NAME" = "Bash" ]; then
  case "$COMMAND" in
    "npm "*|"pnpm "*|"yarn "*|"bun "*)
      echo '{"behavior": "allow"}'
      exit 0
      ;;
    "git status"|"git diff"*|"git log"*|"git branch"*)
      echo '{"behavior": "allow"}'
      exit 0
      ;;
    "rm -rf /"|"rm -rf ~")
      echo '{"behavior": "deny", "message": "Destructive command blocked"}'
      exit 0
      ;;
  esac
fi

# Default : laisser le prompt s'afficher
echo '{"behavior": "ask"}'
```

```bash
chmod +x .claude/hooks/auto-approve.sh
```

```json
{
  "hooks": {
    "PermissionRequest": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/auto-approve.sh"
          }
        ]
      }
    ]
  }
}
```

### 4. Block d'edits aux fichiers sensibles

Avec `PreToolUse` + exit code 2 :

```bash
# .claude/hooks/protect-files.sh
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED=(".env" "package-lock.json" ".git/" "secrets/")

for pattern in "${PROTECTED[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done

exit 0
```

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      }
    ]
  }
}
```

### 5. Auto-format apres edit

`PostToolUse` pour relancer Prettier automatiquement :

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

## Format de reponse JSON

Le hook `PermissionRequest` doit ecrire du JSON sur stdout :

```json
{ "behavior": "allow" }   // auto-approve, bypass le prompt
{ "behavior": "deny", "message": "raison" }   // block
{ "behavior": "ask" }     // forcer prompt manuel
```

## Format input du hook

Stdin recoit du JSON avec la structure :

```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/transcript",
  "hook_event_name": "PermissionRequest",
  "tool_name": "Bash",
  "tool_input": {
    "command": "npm install",
    "description": "Install dependencies"
  }
}
```

Pour Edit/Write :
```json
{
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "/path/to/file.ts",
    "old_string": "...",
    "new_string": "..."
  }
}
```

## Hooks vs permission rules

| Critere | Allow rules | Hooks |
|---------|-------------|-------|
| **Expressivite** | Patterns statiques | Logique programmatique illimitee |
| **Performance** | Eval rapide en memoire | Spawn process shell |
| **Robustesse vs bugs** | Affecte par bugs version | Marche meme si bypass casse |
| **Maintenance** | JSON simple | Code shell a maintenir |
| **Override par deny rules** | Non | Oui (deny rules > hooks) |

**Recommandation** : commencer par les allow rules, ajouter des hooks pour les cas que les rules ne couvrent pas.

## Important : precedence

Les **deny rules sont evaluees avant les hooks**. Un hook qui retourne `allow` est override par une `deny` rule qui matche.

Inverse : un hook qui exit code 2 (block) **override les allow rules**. Pratique pour "tout autoriser sauf X" :
- `allow: ["Bash"]` + hook qui block les commandes destructrices

## Variables d'environnement disponibles

Les hooks ont acces a :
- `$CLAUDE_PROJECT_DIR` — racine du projet
- `$CLAUDE_ENV_FILE` — fichier pour persister env vars
- Variables d'env standard du shell

## Hooks managed only

Sur Enterprise, admin peut forcer `allowManagedHooksOnly: true` dans managed settings : seuls les hooks managed/SDK/plugins force-enabled tournent.

## Exemple complet : automode safe pour landing project

Pour un projet comme une landing page (low-risk), config qui auto-approve tout sauf destructif :

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm *)",
      "Bash(pnpm *)",
      "Bash(git status*)",
      "Bash(git diff*)",
      "Bash(git log*)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Edit",
      "Write",
      "Read",
      "WebFetch"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf ~)",
      "Bash(git push --force *)",
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  },
  "hooks": {
    "PermissionRequest": [
      {
        "matcher": "ExitPlanMode",
        "hooks": [
          {
            "type": "command",
            "command": "echo '{\"behavior\": \"allow\"}'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -I {} sh -c 'test -f {} && npx prettier --write {} 2>/dev/null || true'"
          }
        ]
      }
    ]
  }
}
```

## Sources

- [Automate workflows with hooks — Anthropic docs](https://code.claude.com/docs/en/hooks-guide) — guide complet
- [Hooks reference — Anthropic docs](https://code.claude.com/docs/en/hooks) — schemas detailles
- [Claude Code Hooks: All 12 Lifecycle Events — claudefa.st](https://claudefa.st/blog/tools/hooks/hooks-guide) — exemples concrets
- [How Hooks Automate Permission Management — bswen](https://docs.bswen.com/blog/2026-03-21-claude-code-hooks-auto-permissions/) — pattern auto-approve detaille
- [PreToolUse, PostToolUse & Stop — pixelmojo](https://www.pixelmojo.io/blogs/claude-code-hooks-production-quality-ci-cd-patterns) — CI patterns
