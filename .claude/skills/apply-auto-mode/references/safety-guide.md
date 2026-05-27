# Guide securite — Quand utiliser quel scope

> A consulter quand l'utilisateur hesite entre user / project / local, ou si le contexte semble risque.

## Decision rapide

| Contexte | Scope recommande |
|----------|------------------|
| Dev solo sur projet jetable/POC | User OU Local |
| Vibe coding, exploration nouveau repo | Local |
| Projet partage en equipe | Local (puis evoluer vers Project si l'equipe est d'accord) |
| Projet client/prod | Local SEULEMENT, avec config restrictive |
| Devcontainer isole | Project (sans risque) |
| Machine perso, plusieurs projets similaires | User |
| CI/CD | NE PAS UTILISER ce skill — preferer dontAsk mode |

## Risques par scope

### User level (`~/.claude/settings.json`)

**Avantage** : applique partout, plus besoin de configurer par projet.

**Risque** : si tu ouvres un repo malveillant, Claude peut tout autoriser dedans.

**Quand l'eviter** :
- Tu pull regulierement des repos non-trustes
- Tu fais du code review de PRs externes
- Tu as des credentials sensibles dans `~/.aws`, `~/.ssh`, `~/.config/gh/`

### Project level (`.claude/settings.json`)

**Avantage** : config partagee avec l'equipe (git tracked).

**Risque** :
- N'importe qui qui clone le repo a la config auto-approve
- Si push sur public repo, expose la config
- Peut entrer en conflit avec les preferences personnelles des contributeurs

**Quand l'eviter** :
- Projet open source
- Equipe avec des regles strictes sur Claude Code
- Tu n'as pas l'accord de l'equipe

### Local project (`.claude/settings.local.json`)

**Avantage** : par projet, prive (gitignore), pas de risque equipe.

**Risque** : faible — limite a ce projet, ne se partage pas.

**Quand verifier** : que `.claude/settings.local.json` est bien dans `.gitignore`. Par defaut Claude Code l'ajoute, mais a verifier.

```bash
grep -q "settings.local.json" .gitignore || echo "settings.local.json" >> .gitignore
```

## Le user a-t-il des credentials sensibles ?

Si tu detectes (via `ls ~/` ou question) :
- `~/.ssh/` avec des cles privees
- `~/.aws/credentials`
- `~/.config/gh/hosts.yml` (GitHub CLI tokens)
- `~/.netrc`
- `~/.gnupg/`

→ Insister sur le scope **local** OU recommander un devcontainer (voir docs/claude-code-auto-mode/07-devcontainer-safe.md).

→ Les deny rules par defaut dans le template bloquent l'acces a ces paths, mais une vulnerabilite Claude Code ou un exploit prompt injection pourrait contourner.

## Recommandation finale

**Pour la majorite des cas** : scope **local project** + commit du `.gitignore` updated.

**Pour un setup vraiment safe** : devcontainer Anthropic + scope user dans le container. Pas dans ce skill.

**Pour un YOLO total assume** : scope user, avec git commit avant chaque session. L'utilisateur prend la responsabilite.

## Ce que le skill bloque automatiquement (toujours)

Meme en mode "tout autorise", le template applique des deny rules :

- `rm -rf /`, `rm -rf ~` et variants
- `sudo *` (en project scope)
- Lecture de `~/.ssh/id_*`, `~/.aws/credentials`, `~/.netrc`
- Edition de `~/.bashrc`, `~/.zshrc`, `~/.gitconfig`

Le hook bash ajoute une seconde couche pour les commandes destructives et fork bombs.

## Si l'utilisateur insiste pour un bypass VRAIMENT total

Le skill ne le fait pas par defaut. Pour aller plus loin :
1. Editer manuellement les `deny` rules pour les enlever
2. Editer le hook `auto-approve-all.sh` pour supprimer les BLOCKLIST

→ Inviter a relire `docs/claude-code-auto-mode/04-bypass-broken.md` avant.

## Auto Mode plutot que bypass ?

Si l'utilisateur a un plan **Max**, **Team**, **Enterprise** ou API direct :

Proposer `defaultMode: "auto"` au lieu de `bypassPermissions`.

Avantages :
- Classifier ML bloque les actions vraiment dangereuses (curl|bash, force push main, prod deploy)
- 0.4% de faux positifs sur trafic reel
- Voie officielle Anthropic
- Garde la protection contre prompt injection

Limites :
- DOIT etre dans `~/.claude/settings.json` (user) — ignore en project/local
- Necessite Sonnet 4.6, Opus 4.6 ou 4.7
- Cost token additionnel sur les calls classifier
- 17% des actions overeager peuvent passer

Pour activer Auto Mode au lieu de bypass, remplacer dans le template :
```json
"defaultMode": "bypassPermissions"
```
par :
```json
"defaultMode": "auto"
```

Et installer en user level uniquement.
