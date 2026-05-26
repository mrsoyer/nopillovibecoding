# Claude Code Auto Mode & Bypass Permissions — Documentation Reference

> Etat des modes de permissions en 2026 : pourquoi `--dangerously-skip-permissions` ne marche plus comme avant, comment configurer un vrai auto-mode qui autorise (presque) tout, et les bonnes pratiques pour le faire sans se cramer.

## Contexte

Depuis fevrier 2026, le mode "bypass" historique a ete progressivement neutralise par Anthropic. Le remplacant officiel est **Auto Mode** (lance le 24 mars 2026), un classifier qui valide chaque action au lieu de tout autoriser aveuglement. Pour ceux qui veulent vraiment "tout autoriser", il faut combiner plusieurs mecanismes : `defaultMode`, regles `allow`, hooks `PermissionRequest`, et idealement un devcontainer isole.

## Sommaire

| Fichier | Contenu |
|---------|---------|
| [01-overview.md](01-overview.md) | Etat actuel : bypass casse, auto-mode comme remplacant, ce qui marche en 2026 |
| [02-permission-modes.md](02-permission-modes.md) | Les 6 modes de permission expliques (`default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`) |
| [03-settings-json.md](03-settings-json.md) | Configuration complete de `settings.json` (allow/deny/ask, wildcards, precedence) |
| [04-bypass-broken.md](04-bypass-broken.md) | Pourquoi `--dangerously-skip-permissions` ne marche plus depuis v2.1.78 + workarounds |
| [05-auto-mode.md](05-auto-mode.md) | Auto Mode en detail : classifier, blocages par defaut, configuration |
| [06-hooks-auto-approve.md](06-hooks-auto-approve.md) | Hooks `PermissionRequest` et `PreToolUse` pour auto-approuver |
| [07-devcontainer-safe.md](07-devcontainer-safe.md) | DevContainer + firewall : la seule maniere safe de tout autoriser |
| [08-config-recommandee.md](08-config-recommandee.md) | Config pratique pour un automode total selon ton contexte |
| [sources.md](sources.md) | Toutes les URLs consultees |

## A retenir en 30 secondes

1. `--dangerously-skip-permissions` **continue d'exister** mais le comportement a change : les paths proteges (`.git`, `.claude`, `.bashrc`, etc.) prompt quand meme. Depuis v2.1.78.
2. **Auto Mode** (`defaultMode: "auto"`) est la nouvelle direction officielle : classifier qui valide chaque action. Necessite Sonnet 4.6 / Opus 4.6+ et plan Max/Team/Enterprise/API.
3. Pour un **vrai automode "j'autorise tout"** : `defaultMode: "bypassPermissions"` + `allow: ["Bash", "Edit", "Write", "WebFetch"]` + hooks `PermissionRequest` qui repondent `allow` + devcontainer isole.
4. Le `defaultMode: "auto"` **est ignore** dans `.claude/settings.json` (projet/local) — il faut le mettre dans `~/.claude/settings.json` (user).
5. Sur Linux/Mac, `--dangerously-skip-permissions` **refuse de demarrer en root/sudo**, sauf dans un sandbox reconnu (devcontainer Anthropic).

Sources : 16 pages web consultees le 26 mai 2026. Voir [sources.md](sources.md).
