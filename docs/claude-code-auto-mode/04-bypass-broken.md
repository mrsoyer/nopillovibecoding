# Pourquoi `--dangerously-skip-permissions` ne marche plus

> "Bypass broken in all Claude Code versions newer than v2.1.77" — Issue #36168 (mars 2026)

## TL;DR

Le bypass a ete intentionnellement neutralise par Anthropic en fevrier 2026 a partir de la version **v2.1.78**. Ce n'est pas un bug : c'est une protection ajoutee contre la self-modification. La doc cite que **93% des prompts etaient deja approuves** par les users, ce qui justifie le pivot vers Auto Mode.

Pour retrouver un comportement "vraiment bypass", il faut combiner plusieurs leviers.

## Ce qui a change

### Avant v2.1.78
```bash
claude --dangerously-skip-permissions
# = aucun prompt, jamais, sur rien
```

### Apres v2.1.78
```bash
claude --dangerously-skip-permissions
# = aucun prompt SAUF :
# - Writes a .git/, .vscode/, .idea/, .husky/, .claude/
# - Writes a .gitconfig, .bashrc, .zshrc, .mcp.json, .claude.json
# - rm -rf / et rm -rf ~
```

### Apres v2.1.81
Ajout de `.claude/skills/` aux paths proteges.

### Apres v2.1.126
**Bonne nouvelle** : `bypassPermissions` autorise enfin les writes aux protected paths. Seul `rm -rf /` et `rm -rf ~` continuent de prompt comme circuit breaker.

## Pourquoi Anthropic a fait ca

Source : [Auto mode announcement](https://www.anthropic.com/engineering/claude-code-auto-mode)

1. **93% de prompts auto-approuves** : les users cliquaient yes sans lire → faux sentiment de securite
2. **Risque self-modification** : Claude pouvait modifier `.git/`, `.claude/`, `.bashrc` en mode bypass et compromettre l'environnement
3. **Prompt injection** : du contenu hostile dans un fichier ou page web pouvait declencher des actions destructrices
4. **Strategie produit** : positionner Auto Mode comme nouvelle norme

Quote de la doc :
> "For background safety checks without prompts, use auto mode instead."

## Le bug additionnel (April 2026)

En plus du changement intentionnel, plusieurs bugs ont ete signales :

1. **`--dangerously-skip-permissions` silencieusement downgrade en auto mode** sur certaines versions
2. **`defaultMode: "auto"` dans settings.json ignore** sans erreur (si dans projet/local au lieu de user)
3. **Desktop app macOS** : settings `permissions.allow` et `defaultMode: bypassPermissions` n'ont aucun effet, prompts apparaissent malgre tout (Issues #29026, #34923, #27139)
4. **Permission mode reset** : passe de "Bypass permissions" a "Edit automatically" en cours de session (Issue #39057)

## Workarounds

### 1. Downgrade vers v2.1.77 (option drastique)

```bash
npm install -g @anthropic-ai/claude-code@2.1.77
```

⚠️ Pas recommande long terme : tu perds tous les fixes et features post-fevrier.

### 2. Combiner `bypassPermissions` + `allow` complete

Cible v2.1.126+ qui a restaure le comportement attendu :

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

Place ce fichier dans **`~/.claude/settings.json`** (user level, pas projet) si tu veux que ca s'applique partout.

### 3. Forcer via CLI

```bash
claude --permission-mode bypassPermissions
# ou (equivalent) :
claude --dangerously-skip-permissions
```

Combine avec un wrapper alias :
```bash
# ~/.zshrc
alias ccy="claude --dangerously-skip-permissions"
```

### 4. Hooks `PermissionRequest` qui repondent `allow`

Plus robuste car ne depend pas du mode. Voir [06-hooks-auto-approve.md](06-hooks-auto-approve.md).

Exemple minimal :
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

⚠️ Auto-approve **tout** sans review. A utiliser uniquement en sandbox.

### 5. Auto Mode (la voie officielle)

Si tu as un plan Max/Team/Enterprise/API :

```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

**Dans `~/.claude/settings.json` (user)**, pas projet. Sinon ignore silencieusement.

Voir [05-auto-mode.md](05-auto-mode.md).

## Refus de demarrer en root/sudo

Sur Linux/Mac, le bypass refuse de demarrer si tu es root :

```
--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons
```

**Workaround officiel** : utiliser le devcontainer officiel Anthropic, qui run Claude Code comme user non-root. Voir [07-devcontainer-safe.md](07-devcontainer-safe.md).

## Comportement actuel verifie (mai 2026)

Sur version 2.1.130+ :

| Action | Mode `default` | Mode `bypassPermissions` | Mode `auto` |
|--------|----------------|--------------------------|-------------|
| Read fichier projet | ✅ silent | ✅ silent | ✅ silent |
| Edit fichier projet | ❓ prompt | ✅ silent | ✅ silent |
| Edit `.gitignore` | ❓ prompt | ✅ silent | ➡️ classifier |
| Edit `~/.zshrc` | ❓ prompt | ✅ silent | ➡️ classifier (block probable) |
| `rm -rf /` | ❓ prompt | ❓ prompt (circuit breaker) | ❓ prompt (circuit breaker) |
| `curl https://...` | ❓ prompt | ✅ silent | ➡️ classifier (block si suspect) |
| `git push --force` | ❓ prompt | ✅ silent | ❌ block |
| `npm install` | ❓ prompt | ✅ silent | ✅ silent |

## Recommandation pragmatique

Si tu as fait une "grosse config bypass" et que ca prompt encore :

1. **Verifier la version** : `claude --version`. Si < v2.1.126, update.
2. **Verifier l'emplacement** : `defaultMode` dans `~/.claude/settings.json` (user) ET `.claude/settings.json` (projet) — pour s'assurer que les deux sont alignes
3. **Verifier le mode actif** : `/permissions` dans Claude Code montre le mode et les sources
4. **Tester avec un alias** : `alias ccy="claude --dangerously-skip-permissions"` force le mode au lancement
5. **Si Desktop app** : connu pour ignorer settings (Issues #29026, #27139, #34923) — utiliser CLI ou downgrade

## Sources

- [Issue #36168 — Bypass broken](https://github.com/anthropics/claude-code/issues/36168) — bug report v2.1.78+
- [Issue #29026 — Desktop ignores settings](https://github.com/anthropics/claude-code/issues/29026)
- [Issue #34923 — defaultMode bypassPermissions no effect](https://github.com/anthropics/claude-code/issues/34923)
- [Issue #39057 — Mode resets mid-session](https://github.com/anthropics/claude-code/issues/39057)
- [Claude Code Just Broke Bypass Permissions — Roborhythms (mars 2026)](https://www.roborhythms.com/claude-code-bypass-permissions-broken-2026/) — analyse du changement
- [Stop Using --dangerously-skip-permissions — Medium](https://medium.com/@kumaran.isk/claude-code-stop-using-dangerously-skip-permissions-8e0e45c162ae)
- [Bypass permissions default mode notes — daniel rosehill](https://github.com/danielrosehill/Claude-Code-Notes/blob/main/notes/bypass-permissions-default-mode.md)
