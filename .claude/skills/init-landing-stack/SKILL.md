---
name: init-landing-stack
description: >
  Bootstrap projet landing complet en 10-12 min : interview guidee, scaffolding Astro + Tailwind,
  connexion Supabase (migration leads + edge function), deploy Netlify, CLAUDE.md + rules genere.
  Declenche : "/init-landing-stack", "nouveau projet landing", "bootstrap landing", "setup landing".
argument-hint: "[nom-projet] [type-landing]"
allowed-tools: Read Write Edit Glob Grep Bash mcp__claude_ai_supabase__apply_migration mcp__claude_ai_supabase__deploy_edge_function mcp__claude_ai_supabase__execute_sql mcp__claude_ai_supabase__get_project_url mcp__claude_ai_supabase__get_publishable_keys mcp__claude_ai_supabase__list_projects mcp__playwright__browser_navigate mcp__playwright__browser_snapshot
model: sonnet
effort: high
---

# Init Landing Stack — Bootstrap complet en 1 commande

Tu bootstrap un projet de landing page **Astro 6 + Tailwind 4 + Supabase + Netlify** en 10-12 minutes.

Phases : **Interview → Scaffold → Supabase → Netlify → Context → Verify**.

**MVP actuel** : Astro uniquement (defaut), tracking aucun, Git GitHub optionnel.

## References disponibles

| Fichier | Quand le lire |
|---------|---------------|
| [references/interview-questions.md](references/interview-questions.md) | Phase 1 : detail des 6 questions |
| [references/stack-decision-tree.md](references/stack-decision-tree.md) | Phase 1 (si user pousse pour Vite) |
| [references/scaffold-patterns.md](references/scaffold-patterns.md) | Phase 2 : commandes exactes |

## Agents disponibles

| Agent | Quand l'utiliser |
|-------|------------------|
| [agents/interviewer.md](agents/interviewer.md) | Phase 1 (interview structuree) |
| [agents/scaffolder.md](agents/scaffolder.md) | Phase 2 (scaffolding fichiers) |
| [agents/connector.md](agents/connector.md) | Phases 3-4 (Supabase + Netlify) |
| [agents/verifier.md](agents/verifier.md) | Phase 6 (verification finale) |

## Workflow (6 phases)

### Phase 1 — Interview

Charge [references/interview-questions.md](references/interview-questions.md) pour le detail.

Pose les questions **une a la fois**, avec defaults intelligents :

| # | Question | Default | Variable |
|---|----------|---------|----------|
| Q1 | Nom du projet (kebab-case) ? | derive du dossier courant | `{{PROJECT_NAME}}` |
| Q2 | Type de landing ? (produit / formation / lead-gen / event) | lead-gen | `{{PROJECT_TYPE}}` |
| Q3 | Supabase : nouveau projet ou link a existant ? | nouveau | `{{SB_MODE}}` |
| Q4 | Region Supabase ? (eu-west-1 / us-east-1) | eu-west-1 | `{{SB_REGION}}` |
| Q5 | Netlify : domaine auto ou custom ? | auto | `{{NL_DOMAIN}}` |
| Q6 | Git : GitHub / aucun ? | GitHub | `{{GIT}}` |

**Regle** : 1 question a la fois. Jamais batch. Si l'utilisateur a deja fourni des arguments via `$ARGUMENTS`, skip les questions correspondantes.

Affiche un **brief de synthese** avant execution. Demande confirmation.

> Pourquoi 1 a 1 : l'utilisateur abandonne ou bacle si on lui balance 6 questions d'un coup.

### Phase 2 — Scaffolding

Charge [references/scaffold-patterns.md](references/scaffold-patterns.md) pour les commandes exactes.

Delegue a l'agent [agents/scaffolder.md](agents/scaffolder.md) pour cette phase.

Etapes :
1. `mkdir <PROJECT_NAME> && cd <PROJECT_NAME> && git init`
2. `npm create astro@latest front -- --template minimal --typescript strict --install --git no --yes`
3. `cd front && npx astro add tailwind --yes && npm install @supabase/supabase-js`
4. Creer la structure annexe : `supabase/`, `docs/`, `.claude/{rules,skills}/`
5. Generer les fichiers depuis les templates `assets/templates/astro/` et `assets/templates/supabase/` (substitution `{{VAR}}`)

**Verification post-scaffold** :
- `front/package.json` existe ET contient `astro` + `@astrojs/tailwind`
- `supabase/config.toml` existe
- `netlify.toml` existe a la racine
- `CLAUDE.md` < 80 lignes

> Pourquoi `front/` racine : separation claire code landing vs backend (`supabase/`), permet d'ajouter `admin/` plus tard.

### Phase 3 — Supabase

Delegue a [agents/connector.md](agents/connector.md).

Etapes (utilise les MCP Supabase prioritairement) :
1. `supabase login` si necessaire
2. Si `{{SB_MODE}}` = nouveau : creer projet via dashboard (afficher URL) OU CLI `supabase projects create`
3. `supabase link --project-ref <ref>`
4. `mcp__claude_ai_supabase__apply_migration` avec le contenu de `assets/templates/supabase/migrations/create_leads.sql.tmpl`
5. `mcp__claude_ai_supabase__deploy_edge_function` avec le contenu de `assets/templates/supabase/functions/contact-form/index.ts.tmpl`
6. Recuperer URL et anon key via `mcp__claude_ai_supabase__get_project_url` + `get_publishable_keys`
7. Ecrire `front/.env` avec `PUBLIC_SUPABASE_URL` + `PUBLIC_SUPABASE_ANON_KEY`

**Anti-pattern** : ne JAMAIS exposer `SUPABASE_SERVICE_ROLE_KEY` cote client. Seule l'anon key va dans `.env` accessible au build.

### Phase 4 — Netlify

Etapes (avec CLI `netlify` deja installe) :
1. `netlify login` si necessaire (browser OAuth)
2. `netlify init` dans le dossier projet
   - Repondre : "Create & configure a new site"
   - Site name : `{{PROJECT_NAME}}`
   - Build command : `cd front && npm run build`
   - Publish directory : `front/dist`
3. Si `{{GIT}}` = GitHub et `gh` est installe :
   ```bash
   gh repo create {{PROJECT_NAME}} --private --source=. --remote=origin --push
   ```
4. Ouvrir l'URL d'installation de l'extension Netlify x Supabase (manuel, OAuth) :
   ```
   https://app.netlify.com/extensions/supabase
   ```
   Afficher l'URL exacte du projet site_id pour activer la connexion. Attendre confirmation utilisateur.
5. `netlify deploy --prod`
6. Recuperer l'URL de production retournee.

**Si l'extension n'est pas installable** (pas Team Owner) : continuer sans, mais setter les env vars manuellement via `netlify env:set` :
```bash
netlify env:set PUBLIC_SUPABASE_URL "$SB_URL"
netlify env:set PUBLIC_SUPABASE_ANON_KEY "$SB_ANON_KEY"
```

### Phase 5 — Context Claude Code

Generer dans le dossier projet :

1. `CLAUDE.md` racine — utilise `assets/templates/astro/CLAUDE.md.tmpl`, substitution des `{{VAR}}`. **Doit faire < 80 lignes** apres substitution.
2. `.claude/rules/frontend.md`, `.claude/rules/backend.md`, `.claude/rules/claude-md.md` — depuis `assets/templates/claude-rules/`
3. `.claude/skills/context-guardian` — tenter symlink, fallback copie :
   ```bash
   ln -s ~/.claude/skills/context-guardian .claude/skills/context-guardian 2>/dev/null \
     || cp -r ~/.claude/skills/context-guardian .claude/skills/
   ```
4. `README.md` racine — depuis `assets/templates/README.md.tmpl`

> Pourquoi < 80 lignes CLAUDE.md : au-dela, l'adherence de Claude aux regles chute (cf. context-guardian check #1).

### Phase 6 — Verification

Delegue a [agents/verifier.md](agents/verifier.md).

Etapes :
1. **HTTP + Lighthouse** :
   ```bash
   bash .claude/skills/init-landing-stack/scripts/verify-deploy.sh <URL_NETLIFY> 85
   ```
   Cible : Performance >= 85 (un projet fresh n'a pas de contenu lourd, doit etre haut).

2. **Form submission test** :
   ```bash
   bash .claude/skills/init-landing-stack/scripts/test-form-submission.sh <SB_URL> <SB_ANON_KEY>
   ```
   Puis verifier l'insert via MCP :
   ```
   mcp__claude_ai_supabase__execute_sql
   SQL : SELECT count(*) FROM public.leads WHERE source = 'skill-init'
   ```
   Attendu : count >= 1.

3. **Context-guardian** : afficher score (manuel par l'utilisateur via `claude` puis "verifie le contexte").

4. **Rapport final** : afficher un resume formate avec URLs, scores, prochaines etapes.

## Format du rapport final

```
INIT LANDING STACK : SUCCESS

PROJET
  Nom         : {{PROJECT_NAME}}
  Dossier     : <chemin absolu>
  Stack       : Astro 6 + Tailwind 4 + Supabase + Netlify
  Git remote  : <github.com/user/{{PROJECT_NAME}} ou aucun>

URLS
  Production    : {{NETLIFY_SITE_URL}}
  Dashboard NL  : https://app.netlify.com/sites/{{NETLIFY_SITE_NAME}}
  Dashboard SB  : https://app.supabase.com/project/{{SB_PROJECT_REF}}

VERIFICATIONS
  HTTP 200            : OK
  Lighthouse Perf     : 96 / 100
  Form submission     : OK (1 lead test insere)

PROCHAINES ETAPES
  1. cd <projet> && cd front && npm run dev
  2. Editer front/src/components/Hero.astro pour personnaliser
  3. (Optionnel) /connect-hubspot-form pour HubSpot
  4. (Optionnel) /landing-google-ads pour optimisation SEA

DOC : @docs/stack-landing-claude-code/07-conversion-checklist.md pour la checklist de mise en prod
```

## Regles

- **1 question a la fois** en phase 1, jamais batch — l'utilisateur abandonne sinon
- **Brief de synthese** affiche avant execution avec confirmation requise
- **Erreur = STOP + instruction de debug** explicite, jamais abandon silencieux
- **CLAUDE.md < 80 lignes** apres substitution — sinon l'adherence chute
- **Verification finale obligatoire** — sans verif, le skill n'a pas fini son job
- **Service role key JAMAIS cote client** — uniquement Edge Functions et secrets Supabase
- **Astro par defaut** — Vite uniquement si l'utilisateur insiste (rare)
- **Documenter chaque action** dans la console : l'utilisateur doit pouvoir suivre

## Gestion d'erreurs

| Phase | Erreur | Action |
|-------|--------|--------|
| 2 | `npm create astro` echoue (network) | retry 1x, sinon STOP, instruction install manuel |
| 3 | `supabase login` expire | re-run, demander a l'user |
| 3 | Migration echoue | logs MCP, fix SQL si simple, sinon STOP avec rapport |
| 4 | `netlify init` demande prompts non scriptables | basculer en mode interactif, suivre |
| 4 | Extension Supabase non installable | fallback `netlify env:set` manuel |
| 4 | First deploy 404 | verifier `publish` dans `netlify.toml` |
| 6 | Form submission 500 | logs Edge Function via MCP `get_logs`, identifier la cause |
| 6 | Lighthouse < 85 | warning, lister les top issues, ne pas bloquer |

Principe : chaque erreur doit etre actionnable. Toujours "echec a l'etape X, voici comment debloquer".
