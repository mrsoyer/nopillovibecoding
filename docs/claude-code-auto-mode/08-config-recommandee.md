# Config recommandee selon ton contexte

> Decision tree + configs pretes a l'emploi pour avoir un automode qui marche en 2026.

## Decision tree

```
Tu veux "tout autoriser" sur Claude Code ?
│
├─ Plan = Max, Team, Enterprise, ou API direct ?
│   │
│   ├─ OUI -> Utilise Auto Mode (config A)
│   │
│   └─ NON (Pro/Bedrock/Vertex/Foundry)
│       │
│       └─ Tu acceptes le risque "vraiment tout passe" ?
│           │
│           ├─ NON -> acceptEdits + allow list large (config B)
│           │
│           └─ OUI
│               │
│               └─ Tu peux mettre Claude dans un container/VM ?
│                   │
│                   ├─ OUI -> bypassPermissions dans devcontainer (config C)
│                   │
│                   └─ NON -> bypassPermissions + hooks user (config D, risque elevé)
```

## Config A — Auto Mode (recommandee)

Pre-requis : plan Max/Team/Enterprise/API + Sonnet 4.6 ou Opus 4.6+.

**`~/.claude/settings.json` (user level)** :
```json
{
  "permissions": {
    "defaultMode": "auto",
    "allow": [
      "Bash(npm test)",
      "Bash(npm run lint)",
      "Bash(npm run build)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/credentials)"
    ]
  }
}
```

> ⚠️ `defaultMode: "auto"` est ignore dans `.claude/settings.json` (projet) et `.claude/settings.local.json` (local). DOIT etre dans user level.

**Avantages** :
- Classifier ML bloque les actions vraiment dangereuses
- Garde la securite contre prompt injection
- 0.4% de faux positifs en pratique
- Solution officielle Anthropic

**Limites** :
- Necessite un plan paye
- Token cost supplementaire (round-trip classifier sur Bash/network)
- 17% des actions overeager peuvent passer

## Config B — acceptEdits + allow large (pragmatique sans plan paid)

Pour ceux qui veulent reduire les prompts sans bypass total.

**`~/.claude/settings.json`** :
```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm *)",
      "Bash(pnpm *)",
      "Bash(yarn *)",
      "Bash(bun *)",
      "Bash(git status*)",
      "Bash(git diff*)",
      "Bash(git log*)",
      "Bash(git branch*)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git checkout *)",
      "Bash(git pull*)",
      "Bash(git fetch*)",
      "Bash(git merge *)",
      "Bash(git rebase *)",
      "Bash(git stash*)",
      "Bash(supabase *)",
      "Bash(netlify *)",
      "Bash(astro *)",
      "Bash(tsc *)",
      "Bash(eslint *)",
      "Bash(prettier *)",
      "Bash(docker *)",
      "Bash(jq *)",
      "Bash(curl https://api.github.com/*)",
      "Bash(curl https://*.supabase.co/*)",
      "Edit",
      "Write",
      "WebFetch"
    ],
    "ask": [
      "Bash(git push *)",
      "Bash(npm publish *)",
      "Bash(supabase db push*)"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf ~)",
      "Bash(git push --force *)",
      "Bash(git push -f *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/credentials)",
      "Read(~/.config/gh/**)"
    ]
  }
}
```

**Avantages** :
- Marche sur tous les plans
- Couvre 90% des actions courantes sans prompt
- Liste explicite de ce qui passe → audit facile

**Limites** :
- Edit files demande encore prompt si hors cwd
- Tu dois maintenir la liste a jour

## Config C — bypassPermissions dans devcontainer (YOLO safe)

Pour les sessions ou tu veux 100% bypass MAIS en sandbox.

### 1. `.devcontainer/devcontainer.json`

```json
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  },
  "remoteUser": "node",
  "mounts": [
    "source=claude-code-config,target=/home/node/.claude,type=volume"
  ],
  "runArgs": ["--cap-add=NET_ADMIN", "--cap-add=NET_RAW"],
  "containerEnv": {
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "DISABLE_AUTOUPDATER": "1"
  }
}
```

### 2. Settings dans le container : `/home/node/.claude/settings.json`

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": [
      "Bash",
      "Edit",
      "Write",
      "WebFetch",
      "Read",
      "mcp__*"
    ]
  },
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

### 3. Managed settings garde-fous : `/etc/claude-code/managed-settings.json` (dans Dockerfile)

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf /home)",
      "Bash(sudo *)",
      "Bash(* /etc/*)"
    ]
  }
}
```

### 4. Launch

```bash
# Hote :
code .  # ouvre VS Code, prompt "Reopen in Container"

# Container :
claude --dangerously-skip-permissions
```

**Avantages** :
- Vraiment tout passe (sauf circuit breaker rm -rf /)
- Risque limite au container (firewall + non-root + bind-mount workspace)
- Manage settings empechent self-modification dans le container

**Limites** :
- Setup initial (devcontainer Docker)
- Performance container vs natif
- Auth a re-faire dans le container

## Config D — bypassPermissions sur host (risque eleve)

⚠️ **A faire seulement sur projet jetable / VM / hardware dedie**.

**`~/.claude/settings.json`** :
```json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": [
      "Bash",
      "Edit",
      "Write",
      "WebFetch",
      "Read",
      "mcp__*"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf ~)",
      "Bash(rm -rf /home)",
      "Bash(rm -rf /etc)",
      "Bash(rm -rf /usr)",
      "Bash(sudo *)",
      "Read(~/.ssh/id_*)",
      "Read(~/.aws/credentials)",
      "Read(~/.config/gh/hosts.yml)",
      "Edit(~/.ssh/**)",
      "Edit(~/.bashrc)",
      "Edit(~/.zshrc)",
      "Edit(~/.gitconfig)"
    ]
  },
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

Plus un alias dans `~/.zshrc` :
```bash
alias ccy='claude --dangerously-skip-permissions'
```

**Pourquoi c'est dangereux** :
- Une prompt injection dans un fichier ou page web peut faire executer n'importe quoi
- Un repo malveillant peut lire tes credentials, modifier ton shell, push depuis tes tokens
- Pas de fallback automatique si Claude se trompe (contrairement a Auto Mode)

**Quand quand meme l'utiliser** :
- Projet local jetable (POC, exploration)
- VM dediee
- Repo 100% contrôle par toi
- Tu git commit avant CHAQUE session

## Verifier que ta config marche

```bash
# Voir le mode actif :
# Dans Claude Code, tape :
/permissions

# Verifier la version :
claude --version

# Voir les regles actives :
# Dans Claude Code :
/permissions
# Tu vois les rules + le settings.json source
```

## Troubleshooting

### "Claude prompt encore malgre defaultMode: bypassPermissions"

1. **Version trop ancienne** : si < v2.1.126, certains writes prompt malgre bypass. Update.
2. **Desktop app macOS** : connu pour ignorer settings (Issues #29026, #27139, #34923). Utilise CLI.
3. **Path protege** : si tu editais `.git/`, `.bashrc`, etc., c'etait normal avant v2.1.126.
4. **defaultMode: "auto" dans projet** : il faut le mettre en user. Auto est ignore en projet.
5. **Mode reset mid-session** (Issue #39057) : restart la session.

### "Auto mode unavailable"

Un des pre-requis manque :
- Plan : pas sur Pro (sauf API)
- Model : Sonnet 4.5 / Opus 4.5 / Haiku ne marchent pas
- Provider : Bedrock/Vertex/Foundry ne supportent pas
- Admin (Team/Enterprise) : doit enable dans admin settings

### "Settings.json applique mais prompts apparaissent"

- Verifier precedence : managed > CLI args > local > project > user
- Un `deny` a n'importe quel niveau override tous les `allow`
- Hook qui exit 2 block meme si rule allow
- Tester avec `claude --permission-mode bypassPermissions` au CLI pour confirmer

## Quel choix selon ton cas

| Cas | Config |
|-----|--------|
| Dev landing page solo, plan Pro | B (acceptEdits + allow large) |
| Dev solo, plan Max | A (auto mode) |
| Equipe avec audit | A + deny rules en managed settings |
| Vibe coding YOLO long task | C (devcontainer bypass) |
| POC / exploration jetable | D (bypass + hooks user) |
| CI/CD | dontAsk + allow list precise |

## Sources

- [Permission modes — Anthropic docs](https://code.claude.com/docs/en/permission-modes)
- [Configure permissions — Anthropic docs](https://code.claude.com/docs/en/permissions)
- [Auto mode safety — Anthropic engineering](https://www.anthropic.com/engineering/claude-code-auto-mode)
- [Configuration: Permissions, Models, and YOLO Mode — developertoolkit](https://developertoolkit.ai/en/claude-code/quick-start/configuration/)
- [Safe vs Fast Development Modes — claudefa.st](https://claudefa.st/blog/guide/development/permission-management)
