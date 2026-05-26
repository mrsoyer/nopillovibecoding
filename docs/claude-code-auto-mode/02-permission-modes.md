# Les 6 modes de permission expliques

Reference complete : ce que chaque mode autorise, comment l'activer, et ses limites.

## Table de matieres

- [Comparaison rapide](#comparaison-rapide)
- [`default` — Standard](#default--standard)
- [`acceptEdits` — Auto-approve edits](#acceptedits--auto-approve-edits)
- [`plan` — Plan mode](#plan--plan-mode)
- [`auto` — Auto Mode (classifier)](#auto--auto-mode-classifier)
- [`dontAsk` — Lockdown CI](#dontask--lockdown-ci)
- [`bypassPermissions` — Skip tout](#bypasspermissions--skip-tout)
- [Protected paths](#protected-paths)

## Comparaison rapide

| Mode | Reads | Edits | Bash | Network | Protected paths |
|------|-------|-------|------|---------|-----------------|
| `default` | ✅ | ❓ prompt | ❓ prompt | ❓ prompt | ❓ prompt |
| `acceptEdits` | ✅ | ✅ (cwd seulement) | ⚠️ filesystem cmd OK, autres prompt | ❓ prompt | ❓ prompt |
| `plan` | ✅ | ❌ block | ⚠️ read-only seulement | ❌ block writes | ❓ prompt |
| `auto` | ✅ | ✅ (cwd) | ✅ via classifier | ✅ via classifier | ➡️ classifier |
| `dontAsk` | ✅ pre-approved | ✅ pre-approved | ✅ pre-approved | ✅ pre-approved | ❌ deny |
| `bypassPermissions` | ✅ | ✅ | ✅ | ✅ | ✅ (depuis v2.1.126) |

## `default` — Standard

Reads sans prompt, tout le reste demande confirmation a la premiere utilisation.

```bash
claude --permission-mode default
```

Quand l'utiliser : debut de session, exploration nouveau repo, taches sensibles.

## `acceptEdits` — Auto-approve edits

Auto-approve les edits + un set fixe de commandes filesystem.

**Commandes Bash auto-approuvees** :
- `mkdir`, `touch`, `rm`, `rmdir`, `mv`, `cp`, `sed`
- Aussi quand prefixees par : `LANG=C`, `NO_COLOR=1`, `timeout`, `nice`, `nohup`
- **PowerShell** (si active) : `Set-Content`, `Add-Content`, `Clear-Content`, `Remove-Item`

**Limites** :
- Seulement dans le working directory ou `additionalDirectories`
- Paths hors scope prompt
- Writes aux protected paths prompt
- Toutes les autres commandes Bash prompt

```bash
claude --permission-mode acceptEdits
```

```json
{
  "permissions": { "defaultMode": "acceptEdits" }
}
```

## `plan` — Plan mode

Claude lit, explore, propose un plan, mais **ne modifie rien**. Les prompts s'appliquent comme en `default`.

Activation :
- `Shift+Tab` jusqu'a plan
- `/plan` au debut d'un message
- `claude --permission-mode plan`

A la fin du plan, choix :
- Approuver + entrer en `auto`
- Approuver + entrer en `acceptEdits`
- Approuver + reviewer chaque edit
- Continuer a planifier
- `Ctrl+G` pour editer le plan dans l'editeur

## `auto` — Auto Mode (classifier)

> Necessite Claude Code v2.1.83+

Auto-approve **tout** sauf ce que le classifier bloque. Le classifier est un model separe (Sonnet 4.6) qui review chaque action.

**Bloque par defaut** :
- `curl | bash` (download + execute)
- Envoi de donnees sensibles vers endpoints externes
- Production deploys et migrations
- Mass deletion sur cloud storage
- Grant IAM ou repo permissions
- Modify shared infrastructure
- Destruction irreversible de fichiers pre-existants
- Force push, push direct sur `main`

**Autorise par defaut** :
- Local file operations dans cwd
- Install dependencies declarees dans lock/manifest
- Lire `.env` et envoyer credentials a l'API correspondante
- Read-only HTTP requests
- Push sur la branche de depart ou une branche creee par Claude

**Pre-requis** :
- Plan : All plans (mais admin doit l'activer sur Team/Enterprise)
- Model : Claude Sonnet 4.6, Opus 4.6, ou Opus 4.7
- Provider : Anthropic API uniquement (pas Bedrock/Vertex/Foundry)

**Activation** :
```bash
# Ne marche QUE dans ~/.claude/settings.json (user), ignore dans projet/local
{
  "permissions": { "defaultMode": "auto" }
}
```

**Fallback** : si le classifier bloque 3 fois consecutives ou 20 fois total, auto-mode pause et Claude redemande prompts manuels. En `-p` (headless), la session abort.

Details complets : [05-auto-mode.md](05-auto-mode.md)

## `dontAsk` — Lockdown CI

Auto-deny tout ce qui prompt en `default`. Seulement les `allow` rules et les Bash read-only passent.

**Usage** :
- CI pipelines
- Environnements restreints avec liste fixe de tools

```bash
claude --permission-mode dontAsk
```

**Specifique** : meme les `ask` rules sont denied (au lieu de prompter).

## `bypassPermissions` — Skip tout

Disable tous les prompts et safety checks. Tool calls s'executent immediatement.

**Depuis v2.1.126** : inclut les writes aux protected paths. Avant, ces writes prompt encore.

**Circuit breaker** : `rm -rf /` et `rm -rf ~` prompt quand meme.

**Refus de demarrer en root/sudo** sur Linux/Mac :
```
--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons
```
Le check est skip dans un sandbox reconnu (devcontainer officiel Anthropic).

**Activation** :
```bash
claude --permission-mode bypassPermissions
# equivalent :
claude --dangerously-skip-permissions
```

```json
{
  "permissions": { "defaultMode": "bypassPermissions" }
}
```

**Limites importantes** :
- Aucune protection contre prompt injection
- Pas de safety checks
- A utiliser **uniquement** dans containers/VMs isoles
- Admin peut bloquer via `permissions.disableBypassPermissionsMode: "disable"` en managed settings

## Protected paths

Writes jamais auto-approuves dans tous les modes sauf `bypassPermissions` :

**Directories** :
- `.git`
- `.vscode`
- `.idea`
- `.husky`
- `.claude` (sauf `.claude/commands`, `.claude/agents`, `.claude/skills`, `.claude/worktrees`)

**Files** :
- `.gitconfig`, `.gitmodules`
- `.bashrc`, `.bash_profile`, `.zshrc`, `.zprofile`, `.profile`
- `.ripgreprc`
- `.mcp.json`, `.claude.json`

**Comportement par mode** :
- `default`, `acceptEdits`, `plan` : prompt
- `auto` : route au classifier
- `dontAsk` : deny
- `bypassPermissions` : allow (depuis v2.1.126)

## Sources

- [Choose a permission mode — Anthropic docs](https://code.claude.com/docs/en/permission-modes)
- [Configure permissions — Anthropic docs](https://code.claude.com/docs/en/permissions)
- [Auto mode engineering — Anthropic blog](https://www.anthropic.com/engineering/claude-code-auto-mode)
