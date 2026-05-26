# 02 — Architecture technique du skill

## Sommaire

- [Choix d'architecture](#choix-darchitecture)
- [Frontmatter cible](#frontmatter-cible)
- [Structure du skill](#structure-du-skill)
- [SKILL.md squelette](#skillmd-squelette)
- [References / fichiers de support](#references--fichiers-de-support)
- [Scripts](#scripts)
- [Agents](#agents)
- [Templates inclus](#templates-inclus)
- [Decisions et rationale](#decisions-et-rationale)

## Choix d'architecture

D'apres les signaux du besoin :

| Signal | Decision |
|--------|----------|
| Pipeline multi-etapes (interview → scaffold → connect → verify) | Architecture **modulaire** avec `references/` + `agents/` |
| Templates recurrents (CLAUDE.md, netlify.toml, migration leads, etc.) | Dossier `assets/templates/` |
| Logique de validation (Lighthouse parsing, response check) | Dossier `scripts/` Python ou Bash |
| Plusieurs frameworks frontend (Astro / Vite-React / Vite-Vue) | Templates conditionnels |
| Effort : 10-12 min execution + appels MCP + npm/CLI | `effort: high` |
| Pas d'envoi mail/push critique | `disable-model-invocation: false` (defaut) |
| Doit etre invocable par l'utilisateur | `user-invocable: true` (defaut) |

**Verdict** : skill complet avec `SKILL.md`, `references/`, `agents/`, `scripts/`, `assets/templates/`.

## Frontmatter cible

```yaml
---
name: init-landing-stack
description: >
  Bootstrap un projet de landing page complet : interview guidee, scaffolding Astro/Vite + Tailwind,
  connexion Supabase (project + migration leads + edge function contact-form), deploy Netlify via CLI,
  generation CLAUDE.md + .claude/rules/ + skill context-guardian, et verification finale (Lighthouse + test form).
  Declenche avec "/init-landing-stack", "nouveau projet landing", "bootstrap landing",
  "setup landing complet", "init landing supabase netlify".
argument-hint: "[nom-projet] [type-landing] [framework]"
allowed-tools: Read Write Edit Glob Grep Bash mcp__claude_ai_supabase__create_project mcp__claude_ai_supabase__apply_migration mcp__claude_ai_supabase__deploy_edge_function mcp__claude_ai_supabase__execute_sql mcp__claude_ai_supabase__get_project_url mcp__claude_ai_supabase__get_publishable_keys mcp__claude_ai_supabase__list_projects mcp__playwright__browser_navigate mcp__playwright__browser_snapshot
model: sonnet
effort: high
---
```

**Justifications** :

- `name: init-landing-stack` — kebab-case, descriptif, < 30 caracteres
- `description` — front-loader le cas d'usage (verbe d'action), liste les phrases-types de declenchement, < 250 chars utiles
- `argument-hint` — 3 args optionnels qui permettent de skipper Q1/Q2/Q3 si fournis
- `allowed-tools` — Bash pour CLI npm/supabase/netlify, MCP Supabase pour create/migration/deploy, Playwright pour verif
- `model: sonnet` — pas besoin d'Opus (pas de raisonnement profond), Sonnet suffit et est plus rapide/economique
- `effort: high` — pipeline 10-12 min avec multiples etapes externes

## Structure du skill

```
~/.claude/skills/init-landing-stack/
ou .claude/skills/init-landing-stack/ (projet)
│
├── SKILL.md                          # workflow principal (< 300 lignes)
│
├── references/
│   ├── interview-questions.md        # questions detaillees + defaults intelligents
│   ├── stack-decision-tree.md        # arbre de decision framework
│   ├── scaffold-patterns.md          # patterns scaffolding par framework
│   └── error-recovery.md             # gestion d'erreurs detaillee
│
├── agents/
│   ├── interviewer.md                # phase 1 : interview utilisateur
│   ├── scaffolder.md                 # phase 2 : creation fichiers/dossiers
│   ├── connector.md                  # phases 3-4 : Supabase + Netlify
│   └── verifier.md                   # phase 6 : verification finale
│
├── scripts/
│   ├── verify-deploy.sh              # check HTTP + Lighthouse en CLI
│   ├── test-form-submission.sh       # POST sur edge function + verif insert
│   └── parse-lighthouse.py           # extrait scores du JSON Lighthouse
│
├── assets/
│   └── templates/
│       ├── astro/
│       │   ├── CLAUDE.md.tmpl
│       │   ├── netlify.toml.tmpl
│       │   ├── astro.config.mjs.tmpl
│       │   ├── pages/index.astro.tmpl
│       │   ├── components/Hero.astro.tmpl
│       │   ├── components/ContactForm.tsx.tmpl
│       │   └── lib/supabase.ts.tmpl
│       ├── vite-react/
│       │   ├── CLAUDE.md.tmpl
│       │   ├── netlify.toml.tmpl
│       │   ├── vite.config.ts.tmpl
│       │   ├── routes.tsx.tmpl
│       │   └── ... (idem structure)
│       ├── vite-vue/
│       │   └── ... (idem)
│       ├── supabase/
│       │   ├── migration-leads.sql.tmpl
│       │   ├── contact-form.ts.tmpl
│       │   └── config.toml.tmpl
│       ├── claude-rules/
│       │   ├── frontend.md.tmpl
│       │   ├── backend.md.tmpl
│       │   └── claude-md.md.tmpl
│       ├── README.md.tmpl
│       └── .gitignore.tmpl
│
└── evals/
    └── evals.json                    # 3-5 cas de test
```

## SKILL.md squelette

Le SKILL.md doit faire < 300 lignes en suivant la structure :

```markdown
---
[frontmatter]
---

# Init Landing Stack — Bootstrap complet en 1 commande

Bootstrap un projet de landing page (Astro/Vite + Tailwind + Supabase + Netlify) en 10-12 minutes.
Interview > Scaffold > Connect (Supabase + Netlify) > Context > Verify.

## References disponibles

| Fichier | Quand le lire |
|---------|---------------|
| [references/interview-questions.md](references/interview-questions.md) | Phase 1 |
| [references/stack-decision-tree.md](references/stack-decision-tree.md) | Phase 1 (Q3) |
| [references/scaffold-patterns.md](references/scaffold-patterns.md) | Phase 2 |
| [references/error-recovery.md](references/error-recovery.md) | Sur erreur |

## Agents disponibles

| Agent | Quand l'utiliser |
|-------|------------------|
| [agents/interviewer.md](agents/interviewer.md) | Phase 1 |
| [agents/scaffolder.md](agents/scaffolder.md) | Phase 2 |
| [agents/connector.md](agents/connector.md) | Phases 3-4 |
| [agents/verifier.md](agents/verifier.md) | Phase 6 |

## Workflow (6 phases)

### Phase 1 — Interview
[detail Phase 1]

### Phase 2 — Scaffolding
[detail Phase 2]

[...]

### Phase 6 — Verification

## Regles

- Toujours referencer @docs/stack-landing-claude-code/ pour les decisions techniques
- 1 question a la fois en phase 1, jamais batch
- Erreur = STOP + instruction de debug, jamais abandon silencieux
- CLAUDE.md genere doit faire < 80 lignes (cf. context-guardian)
- Verification finale obligatoire, sinon le skill n'a pas fini son job
```

Le detail des phases est inline dans SKILL.md (court, sequentiel), avec renvois aux references pour le detail.

## References / fichiers de support

### `references/interview-questions.md` (~80 lignes)

Detail des 8 questions avec :
- Texte exact a afficher
- Default explicite
- Validation de l'input (regex pour kebab-case, etc.)
- Conditions de skip
- Effet de chaque reponse sur la suite

### `references/stack-decision-tree.md` (~60 lignes)

Arbre de decision visuel Astro vs Vite-React vs Vite-Vue, base sur :
- Profil equipe (React-only ? Vue-only ?)
- Niveau d'interactivite landing (statique vs configurateur)
- Reference vers [docs/stack-landing-claude-code/02-comparatif-frameworks.md](../stack-landing-claude-code/02-comparatif-frameworks.md)

### `references/scaffold-patterns.md` (~150 lignes)

Patterns de scaffolding detailes par framework :
- Astro : commandes exactes `npm create astro`, `astro add tailwind`, structure `front/src/...`
- Vite + React : `npm create vite`, install plugins, configuration vite.config + routes SSG
- Vite + Vue : equivalent
- Patterns communs : `.gitignore`, `netlify.toml`, README

### `references/error-recovery.md` (~80 lignes)

Pour chaque erreur typique (cf. table dans 01-specs.md section "Gestion des erreurs"), une procedure de recovery actionnable.

## Scripts

### `scripts/verify-deploy.sh`

```bash
#!/usr/bin/env bash
# Usage : verify-deploy.sh <url-prod>
# Exit 0 si OK, exit 1 si HTTP != 200, exit 2 si Lighthouse < 90
URL="$1"
[ -z "$URL" ] && { echo "Usage: $0 <url>"; exit 3; }

# Check HTTP
STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$URL")
[ "$STATUS" != "200" ] && { echo "HTTP $STATUS"; exit 1; }

# Lighthouse
npx --yes lighthouse "$URL" --only-categories=performance \
  --chrome-flags="--headless" --quiet \
  --output=json --output-path=/tmp/lh.json

SCORE=$(python -c "import json; print(int(json.load(open('/tmp/lh.json'))['categories']['performance']['score']*100))")
echo "Lighthouse Performance: $SCORE / 100"
[ "$SCORE" -lt 90 ] && exit 2
exit 0
```

### `scripts/test-form-submission.sh`

```bash
#!/usr/bin/env bash
# Usage : test-form-submission.sh <supabase-url> <anon-key>
SB_URL="$1"; ANON="$2"
TEST_EMAIL="test+initskill-$(date +%s)@example.com"

RES=$(curl -s -X POST "$SB_URL/functions/v1/contact-form" \
  -H "Content-Type: application/json" \
  -H "apikey: $ANON" \
  -d "{\"email\":\"$TEST_EMAIL\",\"name\":\"Init Test\",\"source\":\"skill-init\"}")

echo "$RES" | grep -q '"ok":true' && echo "OK form submission" || { echo "FAIL: $RES"; exit 1; }
echo "Test email used: $TEST_EMAIL"
```

### `scripts/parse-lighthouse.py`

Wrapper Python pour extraire et formater les scores Lighthouse (lecture JSON, affichage compact).

## Agents

### `agents/interviewer.md`

Mission : conduire l'interview en 6-8 questions, valider les inputs, produire le brief structure.

Format : Mission > Process (Q1 a Q8 sequentiel) > Output (brief markdown) > Regles.

### `agents/scaffolder.md`

Mission : a partir du brief, executer le scaffolding complet (dossiers, deps, fichiers config, templates).

Process : 4 etapes (dir + git, framework init, structure dirs, fichiers config).

Outputs verifiables : `front/package.json` existe, `supabase/config.toml` existe, `netlify.toml` existe.

### `agents/connector.md`

Mission : connecter le projet a Supabase (create/link, migration, edge fn) et Netlify (init, deploy).

Process : phases 3 et 4 du flow.

Particularite : recoit le brief en input, retourne URL Supabase, URL Netlify, et statut.

### `agents/verifier.md`

Mission : verifier que tout fonctionne post-deploy.

Process : Lighthouse + form submission + context-guardian + rapport final formate.

Sortie : rapport markdown affiche a l'utilisateur (cf. 01-specs.md section 6.4).

## Templates inclus

Tous les templates utilisent `{{VAR}}` pour les substitutions. Variables disponibles :

| Variable | Source |
|----------|--------|
| `{{PROJECT_NAME}}` | Q1 (interview) |
| `{{PROJECT_TYPE}}` | Q2 |
| `{{FRAMEWORK}}` | Q3 |
| `{{SUPABASE_URL}}` | Phase 3 (MCP get_project_url) |
| `{{SUPABASE_ANON_KEY}}` | Phase 3 (MCP get_publishable_keys) |
| `{{SUPABASE_PROJECT_REF}}` | Phase 3 |
| `{{NETLIFY_SITE_URL}}` | Phase 4 (output netlify deploy) |
| `{{NETLIFY_SITE_NAME}}` | Phase 4 |
| `{{TRACKING}}` | Q7 (none / ga4 / ga4-meta / ga4-meta-hubspot) |
| `{{GIT_REMOTE}}` | Q8 (github / gitlab / aucun) |
| `{{TIMESTAMP}}` | runtime (utilise pour migration filename) |

Liste complete des templates : cf. structure du skill plus haut (~20 fichiers .tmpl).

## Decisions et rationale

### Pourquoi un dossier `front/` racine (et pas tout a la racine) ?

**Decision** : `front/` contient le sous-projet npm Astro/Vite. `supabase/` et `docs/` sont a cote.

**Raison** : separe clairement le code landing du backend (edge functions, migrations). Permet aussi d'avoir un monorepo si on ajoute un dashboard admin plus tard (`admin/`). Demande utilisateur explicite : "toutes les pages du la landing ou block seront stoqué dans un dossier front".

**Conventions Astro respectees** : `front/src/pages/`, `front/src/components/`, `front/src/layouts/`. Le dossier `front/` est un repo npm classique.

### Pourquoi `supabase/functions/` et pas `edges/` ?

**Decision** : utiliser `supabase/functions/` (convention CLI Supabase).

**Raison** : `supabase functions deploy` cherche obligatoirement dans `supabase/functions/`. Changer ce path casserait la CLI. Pour respecter la demande utilisateur ("dossier edges fonctions pour toutes les fonctions supabase"), on peut ajouter un README dans `supabase/functions/` qui appelle ce dossier "Edge Functions" et qui linkera vers `front/` en explication. Si l'utilisateur veut absolument un dossier `edges/`, on peut faire un symlink `edges → supabase/functions/`.

### Pourquoi Sonnet et pas Opus ?

**Decision** : `model: sonnet`.

**Raison** : le skill execute une suite d'actions techniques bien definies. Pas besoin de raisonnement profond (l'arbre de decision est explicite, les commandes sont scriptees). Sonnet est plus rapide et moins cher pour ce profil.

### Pourquoi `effort: high` ?

**Decision** : `effort: high`.

**Raison** : 10-12 minutes d'execution avec ~30 etapes, multiples appels CLI/MCP, generation de fichiers. C'est un skill "lourd" qui justifie de prevenir l'utilisateur de l'engagement temps.

### Pourquoi pas d'integration GA4/Meta/HubSpot directement dans le skill ?

**Decision** : Q7 collecte le besoin mais le skill se contente d'ajouter les placeholders. L'integration complete est deleguee a d'autres skills (`connect-hubspot-form`, `landing-google-ads`, etc.).

**Raison** : ces skills existent deja et sont matures. Dupliquer leur logique creerait de la maintenance double. Le rapport final liste les commandes a executer (ex: `/connect-hubspot-form` apres le bootstrap).

### Pourquoi context-guardian en option (symlink ou copie) ?

**Decision** : symlink par defaut, fallback copie.

**Raison** : symlink permet a `context-guardian` de rester a jour automatiquement quand le skill global evolue. Copie est une option pour les projets partages avec d'autres dev qui n'ont pas le skill installe globalement.

## Sources

- [docs/stack-landing-claude-code/](../stack-landing-claude-code/_index.md) — patterns techniques references par tous les templates
- [.claude/skills/context-guardian/SKILL.md](../../.claude/skills/context-guardian/SKILL.md) — utilise en phase 6
- [~/.claude/skills/skill-maker/](../../../.claude/skills/skill-maker/) — utilise pour creer ce skill (frontmatter, prompting, anti-patterns)
