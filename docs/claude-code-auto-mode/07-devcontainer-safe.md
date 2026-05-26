# DevContainer + Firewall — La voie safe pour tout autoriser

> Si tu veux vraiment `--dangerously-skip-permissions` en mode "YOLO total", la seule maniere safe c'est de l'isoler dans un container avec firewall.

## TL;DR

Anthropic fournit un **devcontainer officiel** dans le repo `anthropics/claude-code` qui inclut :
- Container Docker non-root
- Firewall qui bloque tous les domaines sauf une allowlist (api.claude.com, github, npm, etc.)
- Volume mount persistant pour `~/.claude` (auth)
- `NET_ADMIN`/`NET_RAW` capabilities pour gerer le firewall
- Variables d'env qui disable telemetry et auto-updates

Dans ce sandbox, `--dangerously-skip-permissions` est **autorise meme en mode normal** (la verification root est skip dans les sandbox reconnus) et limite les degats au container.

## Pourquoi le devcontainer ?

Sans isolation, bypass permissions = arbitrary code execution sur ta machine. Avec :

1. **Non-root user** confine les acces fichiers a ce que le user peut toucher
2. **Network firewall** empeche l'exfiltration vers des domaines arbitraires
3. **Bind-mount du workspace** : Claude touche seulement le projet, pas le reste du host
4. **Persistent volumes separes** : credentials separes du code source

## Structure du repo

```
.devcontainer/
├── devcontainer.json    # Volume mounts, capabilities, extensions
├── Dockerfile           # Base image, tools, Claude Code install
└── init-firewall.sh     # Network egress firewall script
```

## devcontainer.json minimal

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
  "runArgs": [
    "--cap-add=NET_ADMIN",
    "--cap-add=NET_RAW"
  ],
  "containerEnv": {
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "DISABLE_AUTOUPDATER": "1"
  }
}
```

**Elements cles** :
- `remoteUser: node` : non-root → permet `--dangerously-skip-permissions`
- `claude-code-config` volume : persiste auth a travers les rebuilds
- `NET_ADMIN`/`NET_RAW` : capacities Docker pour iptables (firewall)
- Env vars : disable telemetry et auto-update

## Firewall — domaines autorises

Le `init-firewall.sh` officiel bloque tout par defaut et n'autorise que :

**Inference Anthropic** :
- `api.claude.com`
- `gateway.claude.com`

**Authentification** :
- `auth.claude.com`

**Dev tools** :
- `registry.npmjs.org` (npm)
- `github.com`, `api.github.com`, `objects.githubusercontent.com` (GitHub)
- `pypi.org`, `files.pythonhosted.org` (pip)
- `raw.githubusercontent.com` (fetch raw files)

**Telemetry (optionnel, disable avec env var)** :
- `api.telemetry.claude.com`
- `sentry.io`

Tu peux modifier `init-firewall.sh` pour ajouter tes propres domaines (ex : `supabase.co`, `netlify.app`).

## Setup en 4 etapes

### 1. Creer la structure

```bash
mkdir -p .devcontainer
```

### 2. Coller le devcontainer.json officiel

Copier depuis [github.com/anthropics/claude-code/tree/main/.devcontainer](https://github.com/anthropics/claude-code/tree/main/.devcontainer).

### 3. Rebuild le container

Dans VS Code : `Cmd+Shift+P` → "Dev Containers: Rebuild Container"

### 4. Lancer Claude en mode bypass

```bash
claude --dangerously-skip-permissions
```

Dans le sandbox reconnu, la verification root est skip et le bypass est total.

## Pour qui veut TOUT autoriser dans le container

Dans le container, par-dessus le firewall, mettre une config maximale :

`/home/node/.claude/settings.json` (user level dans le container) :

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": [
      "Bash",
      "Edit",
      "Write",
      "WebFetch",
      "mcp__*",
      "Agent(*)"
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

→ Claude peut tout faire DANS le container, mais le firewall l'empeche d'aller ailleurs et le bind-mount limite l'acces fichier au projet.

## Managed settings dans le container

Pour empecher engineers de modifier les protections :

```dockerfile
# Dockerfile
RUN mkdir -p /etc/claude-code
COPY managed-settings.json /etc/claude-code/managed-settings.json
```

`managed-settings.json` :
```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf ~)",
      "Bash(* /etc/*)",
      "Bash(sudo *)"
    ]
  }
}
```

Les policies dans `/etc/claude-code/managed-settings.json` **override** tout. Ne peuvent pas etre bypass par repo edits.

## Limites a comprendre

### Pas immune aux attaques

⚠️ **Aucun systeme n'est completement immunise**. Meme avec firewall et isolation :
- Un repo malveillant peut exfiltrer tout ce qui est DANS le container, **y compris `~/.claude` credentials**
- Le firewall ne bloque pas les domaines whitelist (donc une page github.com peut etre malveillante)

**Best practice** :
- Develop only avec **trusted repositories**
- Monitor les activites de Claude (logs hooks)
- **Ne pas mount host secrets** : pas de `~/.ssh`, pas de `~/.aws/credentials`
- Utiliser **repository-scoped tokens** au lieu de tokens permanents

### Auth persistence

Pour GitHub Codespaces (rebuilds frequents), stocker credentials comme Codespaces secrets :

```bash
ANTHROPIC_API_KEY=sk-ant-...
# ou pour long-lived token :
CLAUDE_CODE_OAUTH_TOKEN=$(claude setup-token)
```

Codespaces les rend dispos comme env vars automatiquement.

### Bind-mount considerations

Si tu mount le workspace en read-write (default), Claude peut **modifier les fichiers du projet** depuis le container. Ces changes sont persistes sur le host.

Pour test "ephemeral" total :
```json
{
  "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind,readonly"
}
```

→ Claude voit le code mais ne peut pas le modifier. Utile pour exploration safe d'un repo inconnu.

## Alternatives au devcontainer

### Docker direct

```bash
docker run -it --rm \
  -v "$PWD:/workspace" \
  -v claude-code-config:/root/.claude \
  --cap-add=NET_ADMIN --cap-add=NET_RAW \
  -w /workspace \
  anthropic/claude-code:latest \
  --dangerously-skip-permissions
```

### Podman avec YOLO sandbox

Le projet [github.com/con/yolo](https://github.com/con/yolo) wrap claude-code dans podman pour un sandbox plus simple. Setup en 2 commandes.

### macOS Seatbelt

`claude-safe-yolo` : shell function qui lance Claude avec Anthropic's srt (sandbox-runtime) via overlay file + deny rules pour les ops destructives. Voir [github gist vladolaru/2154aa7c6d743d3c376c0418790ba4b9](https://gist.github.com/vladolaru/2154aa7c6d743d3c376c0418790ba4b9).

### VM complete

Pour isolation maximale : VM Linux dediee, Claude installe dedans, snapshot avant chaque session. Plus lourd mais zero risque host.

## Git checkpoint avant YOLO

Meme dans un sandbox, le git workflow reste critique :

```bash
git add -A && git commit -m "checkpoint pre-yolo"
claude --dangerously-skip-permissions
# Si ca part en couille :
git reset --hard HEAD
```

## Disable bypass via managed settings (cas org)

Si tu es admin et veux **interdire** a tes engineers d'utiliser bypass meme en local :

```json
{
  "permissions": {
    "disableBypassPermissionsMode": "disable"
  }
}
```

A placer dans `/etc/claude-code/managed-settings.json` ou via MDM.

## Sources

- [Development containers — Anthropic docs](https://code.claude.com/docs/en/devcontainer) — guide officiel
- [anthropics/claude-code/.devcontainer — GitHub](https://github.com/anthropics/claude-code/tree/main/.devcontainer) — reference implementation
- [init-firewall.sh — GitHub](https://github.com/anthropics/claude-code/blob/main/.devcontainer/init-firewall.sh) — script firewall officiel
- [Claude Code Yolo Mode security research — hartphoenix gist](https://gist.github.com/hartphoenix/698eb8ef8b08ad2ce6a99cf7346cd7cc) — layered defense
- [claude-safe-yolo — vladolaru gist](https://gist.github.com/vladolaru/2154aa7c6d743d3c376c0418790ba4b9) — sandboxed YOLO mode macOS
- [con/yolo — GitHub](https://github.com/con/yolo) — podman sandbox
- [Sandboxing AI Coding Agents — mfyz](https://mfyz.com/ai-coding-agent-sandbox-container/) — firewall + restricted shell
- [DevContainer Practical Guide — Claude Lab](https://claudelab.net/en/articles/claude-code/claude-code-devcontainer-secure-isolated-environment)
