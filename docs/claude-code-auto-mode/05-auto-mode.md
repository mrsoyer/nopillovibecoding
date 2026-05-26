# Auto Mode — Le successeur du bypass

> Mode auto-approval avec classifier ML qui valide chaque action en arriere-plan.

## TL;DR

Auto Mode est la reponse officielle d'Anthropic au probleme du bypass : au lieu de tout autoriser aveuglement, un classifier (Sonnet 4.6) review chaque action et bloque ce qui est dangereux. Resultat : 0.4% de faux positifs sur le trafic reel, 17% de faux negatifs sur les actions overeager.

Pratique pour qui veut "tout autoriser" mais sans risquer un `rm -rf /` ou un `git push --force main`.

## Table de matieres

- [Comment ca marche](#comment-ca-marche)
- [Pre-requis](#pre-requis)
- [Activation](#activation)
- [Ce qui est bloque par defaut](#ce-qui-est-bloque-par-defaut)
- [Ce qui est autorise par defaut](#ce-qui-est-autorise-par-defaut)
- [Boundaries en conversation](#boundaries-en-conversation)
- [Fallback et limites](#fallback-et-limites)
- [Allow rules droppees en auto-mode](#allow-rules-droppees-en-auto-mode)
- [Subagents en auto-mode](#subagents-en-auto-mode)
- [Cout et latence](#cout-et-latence)

## Comment ca marche

Architecture en 2 couches :

### Input layer — Prompt-Injection Probe
Un scanner server-side examine les tool outputs **avant** qu'ils n'arrivent dans le contexte de Claude. Si du contenu hostile est detecte (essai de hijack via fichier ou page web), un warning est injecte.

### Output layer — Transcript Classifier
Tourne sur Sonnet 4.6. Reviewe chaque action proposee :

1. **Stage 1** : filtre rapide single-token (yes/no), tune vers le blocage
2. **Stage 2** : chain-of-thought reasoning, declenche seulement si Stage 1 flag — reduit les faux positifs

**Reasoning-blindness by design** : le classifier voit les user messages + tool commands mais **strip les explications de Claude et les tool results**. Empeche le modele d'etre persuade par ses propres rationalisations.

## Ordre de decision

Chaque action passe par cet ordre (premier match gagne) :

1. **Allow/deny rules user** resolvent immediatement
2. **Read-only actions** et **edits dans cwd** auto-approved (sauf protected paths)
3. **Tout le reste** part au classifier
4. **Si le classifier bloque** : Claude recoit la raison et essaie une alternative

## Pre-requis

| Critere | Requis |
|---------|--------|
| **Version Claude Code** | v2.1.83 ou plus |
| **Plan** | All plans (mais Team/Enterprise : admin doit activer) |
| **Model** | Claude Sonnet 4.6, Opus 4.6, ou Opus 4.7 (Sonnet 4.5, Opus 4.5, Haiku, claude-3 = NON) |
| **Provider** | Anthropic API uniquement (PAS Bedrock, Vertex, Foundry) |
| **Admin** | Sur Team/Enterprise : admin enable dans [admin settings](https://claude.ai/admin-settings/claude-code) |

Si Claude Code dit "auto mode unavailable", c'est qu'un pre-requis n'est pas rempli — pas une panne transitoire.

## Activation

### Via settings.json (recommande)

```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

⚠️ **Doit etre dans `~/.claude/settings.json` (user)**, PAS dans `.claude/settings.json` (projet) ni `.claude/settings.local.json` (local). Sinon ignore silencieusement (protection anti-self-grant).

### Via CLI

```bash
claude --permission-mode auto
```

### En session

Press `Shift+Tab` pour cycler. Auto-mode apparait apres `plan` si les pre-requis sont remplis.

Premiere fois : un opt-in prompt apparait. Tu peux choisir "No, don't ask again" pour le retirer du cycle.

### VS Code extension

Le setting `claudeCode.initialPermissionMode` n'accepte PAS `auto`. Utiliser `defaultMode` dans user settings.

## Ce qui est bloque par defaut

Liste des comportements bloques sans configuration custom :

- **Downloading + executing code** : `curl | bash`, `wget | sh`, etc.
- **Envoi de donnees sensibles** vers endpoints externes
- **Production deploys** et migrations
- **Mass deletion** sur cloud storage
- **Granting IAM ou repo permissions**
- **Modifying shared infrastructure**
- **Destruction irreversible** de fichiers pre-existants
- **Force push** ou push direct sur `main`
- **Sandbox network access requests** (route au classifier au lieu d'etre allow par defaut)

Pour la liste complete :
```bash
claude auto-mode defaults
```

## Ce qui est autorise par defaut

- **Local file operations** dans cwd
- **Install dependencies** declarees dans lock files ou manifests (`package.json`, `requirements.txt`, etc.)
- **Read `.env`** et envoyer credentials a l'API correspondante
- **Read-only HTTP requests**
- **Push** sur la branche de depart ou une branche creee par Claude

## Boundaries en conversation

Tu peux donner des contraintes au classifier directement en chat :

```
"Don't push to main"
"Wait until I review before deploying"
"Don't run any destructive command"
```

Le classifier les traite comme block signals. Une boundary reste active jusqu'a ce que tu la leves explicitement.

⚠️ **Limite** : les boundaries ne sont pas stockees comme rules. Le classifier les re-lit depuis le transcript a chaque check. **Une boundary peut etre perdue si la compaction du contexte supprime le message qui l'a posee**. Pour une garantie hard, utiliser une `deny` rule.

## Fallback et limites

**Thresholds non configurables** :
- **3 deny consecutives** OU **20 deny total** par session → auto-mode pause, Claude redemande prompts manuels
- Approuver une action en prompt resume auto-mode
- Toute action allowed reset le compteur consecutif
- Le compteur total persiste jusqu'au trigger

**En headless (`-p`)** : repeated blocks abort la session (pas d'user pour prompt).

Pour reduire les false positives, configurer trusted infrastructure :
```
admin -> autoMode.environment setting
```

Voir [Configure auto mode](https://code.claude.com/docs/en/auto-mode-config) pour les details.

## Allow rules droppees en auto-mode

A l'entree en auto-mode, certaines allow rules **broad** sont automatiquement droppees pour eviter qu'elles ne contournent le classifier :

- Blanket `Bash(*)` ou `PowerShell(*)`
- Wildcarded interpreters comme `Bash(python*)`
- Package-manager run commands generaux
- `Agent` allow rules

**Restent** : les regles narrow comme `Bash(npm test)`.

Quand tu sors d'auto-mode, les droppees sont restaurees.

## Subagents en auto-mode

Le classifier check le subagent 3 fois :

1. **Avant le spawn** : la task description est evaluee. Une tache dangereuse-looking bloque au spawn.
2. **Pendant l'execution** : chaque action du subagent passe par le classifier comme le parent. Le `permissionMode` du subagent frontmatter est **ignore**.
3. **A la fin** : review de l'action history complete. Si concern, warning prepended aux resultats.

## Cout et latence

- Classifier tourne sur un **model server-configured** independant de ton `/model` selection
- Les calls classifier **comptent dans ton token usage**
- Chaque check envoie une portion du transcript + l'action pending → round-trip avant execution
- **Reads et working-dir edits hors protected paths skip le classifier** → l'overhead vient surtout des shell commands et network operations

## Performance reelle (donnees Anthropic)

| Dataset | Stage 1 FPR | Stage 1 FNR | Pipeline complet FPR | Pipeline complet FNR |
|---------|-------------|-------------|----------------------|----------------------|
| Trafic interne reel (n=10000) | 8.5% | — | 0.4% | — |
| Actions overeager reelles (n=52) | — | 6.6% | — | 17% |
| Synthetic exfiltration (n=1000) | — | 1.8% | — | 5.7% |

**Le 17% miss rate sur overeager actions** = situations ou les users donnent une autorisation vague ("clean up branches") qui ne couvre pas le blast radius reel.

## Disable auto-mode

Admin peut bloquer via managed settings :
```json
{
  "permissions": {
    "disableAutoMode": "disable"
  }
}
```

User peut aussi se locker out a son niveau.

## Difference avec bypass

| Critere | `bypassPermissions` | `auto` |
|---------|---------------------|--------|
| **Validation actions** | Aucune | Classifier ML |
| **Prompt injection** | Pas de protection | Probe + classifier |
| **Destruction** | Tout passe sauf rm -rf /, ~ | `curl|bash`, force push, mass delete bloques |
| **Cout token** | Zero | Round-trip classifier sur shell/network |
| **Plan requis** | Tous | Max/Team/Enterprise/API |
| **Model requis** | Tous | Sonnet 4.6+ / Opus 4.6+ |
| **Confiance recommandee** | Container/VM seulement | Workspace user normal |

## Sources

- [Choose a permission mode — Anthropic docs](https://code.claude.com/docs/en/permission-modes) — section auto mode
- [Claude Code auto mode engineering deep dive — Anthropic](https://www.anthropic.com/engineering/claude-code-auto-mode) — architecture classifier
- [Auto Mode safer than dangerously-skip — Claude Code AI blog](https://claudecodeai.blog/claude-code-auto-mode/) — vulgarisation
- [Auto Mode replaced Permission-Skipping — Charles Jones](https://charlesjones.dev/blog/claude-code-auto-mode-vs-dangerously-skip-permissions) — retour terrain
- [Auto Mode on Max, Team, Enterprise — claudefa.st](https://claudefa.st/blog/guide/development/auto-mode) — availability par plan
