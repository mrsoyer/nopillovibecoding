---
name: apply-auto-mode
description: Configure Claude Code en mode tout autorise : bypassPermissions + allow rules larges + hook auto-approve. Backup la config existante. Scope user ou project. Declenche : "applique auto mode", "/apply-auto-mode", "yolo mode claude", "bypass permissions", "claude autorise tout".
allowed-tools: Read, Write, Edit, Bash
---

# Apply Auto Mode — Config Claude Code "tout autorise"

Tu installes la config Claude Code qui auto-approuve toutes les actions :
- `defaultMode: bypassPermissions` dans settings.json
- Allow rules larges (Bash, Edit, Write, WebFetch, MCP)
- Deny rules garde-fous (rm -rf /, ssh keys, credentials)
- Hook PermissionRequest qui repond `allow` automatiquement

## References disponibles

| Fichier | Quand le lire |
|---------|---------------|
| [references/safety-guide.md](references/safety-guide.md) | Etape 1 : conseiller user sur le risque selon le scope |

## Workflow (5 etapes)

### Etape 1 — Demander le scope cible

Pose UNE seule question a l'utilisateur :

```
Tu veux appliquer la config auto-mode :

1. **User level** (~/.claude/settings.json) — s'applique a tous tes projets sur cette machine
2. **Project level** (.claude/settings.json) — s'applique a ce projet uniquement (committe au repo)
3. **Local project** (.claude/settings.local.json) — s'applique a ce projet, gitignore (ne se partage pas)

Quel scope ?
```

Si la reponse est ambigue, charge [references/safety-guide.md](references/safety-guide.md) pour expliquer les implications.

Si l'utilisateur est dans un repo sensible (production code visible), recommande **local project** ou **user**.

### Etape 2 — Determiner les chemins cibles

Selon la reponse :

| Scope | settings path | hook path |
|-------|---------------|-----------|
| User | `~/.claude/settings.json` | `~/.claude/hooks/auto-approve-all.sh` |
| Project | `.claude/settings.json` | `.claude/hooks/auto-approve-all.sh` |
| Local | `.claude/settings.local.json` | `.claude/hooks/auto-approve-all.sh` |

Verifie l'existence avec `ls`. Cree les dossiers manquants avec `mkdir -p`.

### Etape 3 — Backup la config existante

Si `settings.json` (ou `.local.json`) existe deja :

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
cp <path>/settings.json <path>/settings.json.backup-$TIMESTAMP
```

Affiche le chemin du backup. **Pourquoi** : permettre rollback rapide si la config casse quelque chose.

Si le fichier n'existe pas, skip cette etape.

### Etape 4 — Merger ou ecrire la config

**Cas A : pas de settings.json existant**

Copier directement le template :
```bash
cp ~/.claude/skills/apply-auto-mode/assets/settings-user.json <path>/settings.json
```

Utiliser `settings-user.json` pour scope user, `settings-project.json` pour project/local.

**Cas B : settings.json existant**

Read le fichier existant. Merger en preservant les cles utilisateur :
- Si `permissions` existe : merger `allow`, `deny`, `ask` (concatener arrays + dedupe)
- Ecraser `defaultMode` avec `bypassPermissions`
- Si `hooks` existe : ajouter `PermissionRequest` sans toucher aux autres events
- Preserver toutes les autres cles (env, statusLine, model, etc.)

Pourquoi ne pas ecraser : l'utilisateur peut avoir des hooks ou env vars critiques. On veut additionner, pas remplacer.

Le merge se fait via Read + Write en JSON, ou via `jq` :
```bash
jq -s '.[0] * .[1] | .permissions.defaultMode = "bypassPermissions"' \
   <path>/settings.json \
   ~/.claude/skills/apply-auto-mode/assets/settings-user.json \
   > <path>/settings.json.tmp && mv <path>/settings.json.tmp <path>/settings.json
```

Note : `jq -s ... *` merge mais ne dedupe pas les arrays. Faire le dedupe manuellement si besoin.

### Etape 5 — Installer le hook script

Copier le hook :
```bash
mkdir -p <hook_dir>
cp ~/.claude/skills/apply-auto-mode/assets/auto-approve-all.sh <hook_path>
chmod +x <hook_path>
```

Verifier que le path dans `settings.json` pointe bien vers le hook installe. Le template utilise `"$CLAUDE_PROJECT_DIR"` pour project/local, ou `$HOME` pour user.

### Etape 6 — Afficher le resume

Format de sortie attendu :

```
✅ Config auto-mode appliquee

Scope : [user|project|local]
Settings : <path>/settings.json
Hook : <path>/hooks/auto-approve-all.sh
Backup : <path>/settings.json.backup-YYYYMMDD-HHMMSS [si applicable]

Ce qui est applique :
- defaultMode: bypassPermissions
- Allow : Bash, Edit, Write, WebFetch, Read, mcp__*
- Deny garde-fous : rm -rf /, ~/.ssh/**, ~/.aws/credentials, git push --force
- Hook PermissionRequest : auto-allow tous les prompts

⚠️ Pour activer :
1. Redemarre Claude Code (Cmd+Q puis relance)
2. Verifier : tape /permissions dans Claude Code

⚠️ Limites :
- En Desktop app macOS : settings parfois ignore (Issues GitHub)
- rm -rf /, rm -rf ~ prompt quand meme (circuit breaker built-in)
- Si claude run en root/sudo : refuse de demarrer (sauf dans devcontainer)

🔄 Rollback :
cp <path>/settings.json.backup-* <path>/settings.json
```

## Regles importantes

- **Toujours backup** avant d'ecrire. Pourquoi : la config peut casser le workflow, le rollback doit etre instantane.
- **Toujours merger**, jamais ecraser brutalement. Pourquoi : l'utilisateur peut avoir des hooks, env, settings statusLine importants.
- **Toujours afficher le path complet** des fichiers crees/modifies. Pourquoi : l'utilisateur doit pouvoir verifier manuellement.
- **Ne pas appliquer en user level dans un projet sensible** sans confirmation. Pourquoi : le user level s'applique partout, y compris dans des repos production.
- **Si scope project** : verifier que `.gitignore` exclut bien `.claude/settings.local.json`. Sinon le warning.

## Exemple complet d'execution

User dit : `/apply-auto-mode`

```
Tu veux appliquer la config auto-mode :

1. User level (~/.claude/settings.json) — tous tes projets
2. Project level (.claude/settings.json) — ce projet, committe au repo
3. Local project (.claude/settings.local.json) — ce projet, gitignore

Quel scope ?
```

User dit : `local`

```
[Verifications]
- .claude/ existe : oui
- .claude/settings.local.json existe : oui → backup en cours
- .claude/hooks/ existe : non → mkdir

[Actions]
✅ Backup : /Users/thomas/webflowlanding/.claude/settings.local.json.backup-20260526-180000
✅ Settings merge : /Users/thomas/webflowlanding/.claude/settings.local.json
✅ Hook installe : /Users/thomas/webflowlanding/.claude/hooks/auto-approve-all.sh (chmod +x)

[Resume]
Scope : local project
Settings appliques :
  - defaultMode: bypassPermissions
  - Allow rules (15 entries)
  - Deny rules (7 entries)
  - Hook PermissionRequest auto-allow

⚠️ Redemarre Claude Code pour activer
⚠️ Verifie avec /permissions
🔄 Rollback : cp .claude/settings.local.json.backup-* .claude/settings.local.json
```

## Cas particuliers

### L'utilisateur est root/sudo

Refuse l'application en user level. Explique que `--dangerously-skip-permissions` refuse de demarrer en root sauf en devcontainer reconnu. Propose project level a la place.

### Le scope project est demande mais pas de git repo

OK, mais warn que `settings.json` sera trackee si tu commit. Suggere `local` si pas voulu.

### Hook deja existant pour PermissionRequest

Merger les hooks en ajoutant le nouveau au tableau, pas en l'ecrasant. Pourquoi : l'utilisateur peut avoir un hook custom logging par exemple.

### Auto Mode preferee plutot que bypass

Si l'utilisateur dit "j'ai un plan Max/Team", proposer `defaultMode: "auto"` a la place de `bypassPermissions`. C'est plus safe (classifier ML) et c'est la voie officielle Anthropic. Doit etre dans user level uniquement (ignore en project).

## Sources

Documentation source : `/Users/thomas/webflowlanding/docs/claude-code-auto-mode/`
- 03-settings-json.md : structure complete settings.json
- 06-hooks-auto-approve.md : hook PermissionRequest details
- 08-config-recommandee.md : Config D (bypass user level) et Config C (devcontainer)
