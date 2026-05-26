# Vue d'Ensemble — Etat des modes Claude Code en 2026

## TL;DR

Le mode "bypass total" ne marche plus comme avant. Anthropic a volontairement ajoute des protections (paths proteges, classifier obligatoire en auto) parce que **93% des prompts etaient approuves automatiquement** par les users, ce qui rendait le mecanisme inutile et dangereux. La nouvelle direction officielle est **Auto Mode** : un classifier ML valide chaque action.

Pour un vrai "j'autorise tout", il faut empiler plusieurs couches : `defaultMode: bypassPermissions` + regles `allow` + hooks + devcontainer.

## Chronologie 2026

| Date | Evenement |
|------|-----------|
| **Fevrier 2026** | `bypassPermissions` casse a partir de v2.1.78 — protected directory logic ajoute pour `.git/`, `.claude/`, `.bashrc`, etc. |
| **24 mars 2026** | Auto Mode lance en research preview (Team plan d'abord) |
| **Mars 2026** | v2.1.81 etend les paths proteges (`.claude/skills/`) |
| **16 avril 2026** | Auto Mode devient default-available, ajout sur Max users |
| **Apres v2.1.111** | Flag `--enable-auto-mode` deprecie (auto-mode en cycle par defaut) |
| **v2.1.126** | `bypassPermissions` mode autorise enfin les writes aux protected paths |

## Les 6 modes disponibles

| Mode | Sans prompt | Pour |
|------|-------------|------|
| `default` | Reads seulement | Debut de session, taches sensibles |
| `acceptEdits` | Reads + edits + filesystem cmd (`mkdir`, `mv`, `cp`...) | Iteration code review-friendly |
| `plan` | Reads seulement (pas d'edits) | Exploration avant changement |
| `auto` | Tout, avec safety checks classifier | Long taches, reduction prompt fatigue |
| `dontAsk` | Seulement les tools pre-approuves | CI lockdown, scripts |
| `bypassPermissions` | Tout | **Containers/VMs isoles uniquement** |

> Dans tous les modes sauf `bypassPermissions`, les writes aux [protected paths](02-permission-modes.md#protected-paths) ne sont jamais auto-approuves.

## Comment switcher

```bash
# Au startup
claude --permission-mode auto
claude --permission-mode bypassPermissions
claude --dangerously-skip-permissions  # equivalent au precedent

# En session
# Shift+Tab pour cycler default -> acceptEdits -> plan

# Comme defaut permanent
# Dans ~/.claude/settings.json :
{
  "permissions": {
    "defaultMode": "acceptEdits"
  }
}
```

> Note importante : `defaultMode: "auto"` est **ignore** dans `.claude/settings.json` (projet) ou `.claude/settings.local.json` (local). Il doit etre place dans `~/.claude/settings.json` (user). C'est une protection pour qu'un repo ne puisse pas s'auto-attribuer auto-mode.

## Pourquoi le bypass historique a ete neutralise

Anthropic explique sa decision dans la doc et le post engineering :

1. **93% de prompts auto-approuves** = les users cliquaient yes sans lire, faux sentiment de securite
2. **Risque self-modification** : Claude pouvait modifier `.git/`, `.claude/`, `.bashrc` en mode bypass et casser l'environnement de l'user
3. **Prompt injection** : du contenu hostile dans un fichier/page pouvait declencher des actions dangereuses sans review
4. **Strategie produit** : push vers Auto Mode comme experience par defaut

## Ce qui marche encore aujourd'hui (mai 2026)

✅ **`defaultMode: "bypassPermissions"`** dans `~/.claude/settings.json` ou `.claude/settings.json`
- Skip tous les prompts (sauf `rm -rf /`, `rm -rf ~` qui prompt comme circuit breaker)
- **Depuis v2.1.126** : permet aussi les writes aux protected paths
- **Refuse de demarrer si root/sudo** sauf dans un sandbox reconnu

✅ **`--dangerously-skip-permissions`** au startup (equivalent du precedent)

✅ **Regles `allow` granulaires** : `Bash(*)`, `Edit`, `Write`, `WebFetch(domain:*)`, `mcp__*`

✅ **Hooks `PermissionRequest`** qui retournent `{"behavior": "allow"}` (auto-approve scopable)

✅ **Auto Mode** (`defaultMode: "auto"`) — la voie recommandee par Anthropic

## Ce qui ne marche plus / partiellement

❌ Bypass "vraiment total" sans contournement : les paths proteges prompt encore selon version

❌ `--dangerously-skip-permissions` silencieusement downgrade en auto-mode sur certaines versions (avril 2026, bug)

❌ `WebFetch(domain:example.com)` ne matche pas `www.example.com` (Issue #11972, bug toujours ouvert)

❌ Wildcards `Bash(*)` peuvent ne pas etre respectes dans le Desktop app (Issue #27139, bug)

⚠️ `bypassPermissions` ne donne **aucune protection** contre la prompt injection

## La recommandation Anthropic actuelle

> "For background safety checks without prompts, use auto mode instead."
> — Doc officielle, section bypassPermissions

Auto Mode est positionne comme le successeur de bypass. Difference cle :
- **Bypass** : aucun controle, tout passe
- **Auto** : classifier ML reviewe chaque action, bloque les operations dangereuses (curl|bash, force push, prod deploy, etc.)

Voir [05-auto-mode.md](05-auto-mode.md) pour les details.

## Sources

- [Choose a permission mode — Anthropic docs](https://code.claude.com/docs/en/permission-modes) — modes officiels, timeline
- [Claude Code auto mode: a safer way to skip permissions — Anthropic](https://www.anthropic.com/engineering/claude-code-auto-mode) — pourquoi et comment du classifier
- [Issue #36168 bypass broken — GitHub](https://github.com/anthropics/claude-code/issues/36168) — bug bypass v2.1.78+
- [Claude Code Bypass Permissions: How to Enable It — Kanaries](https://docs.kanaries.net/topics/AICoding/claude-code-desktop-bypass-permissions) — limitations actuelles
