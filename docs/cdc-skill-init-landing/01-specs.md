# 01 — Specifications fonctionnelles

## Sommaire

- [Flow utilisateur de bout en bout](#flow-utilisateur-de-bout-en-bout)
- [Phase 1 — Interview](#phase-1--interview)
- [Phase 2 — Scaffolding](#phase-2--scaffolding)
- [Phase 3 — Connexion Supabase](#phase-3--connexion-supabase)
- [Phase 4 — Connexion Netlify](#phase-4--connexion-netlify)
- [Phase 5 — Contexte Claude Code](#phase-5--contexte-claude-code)
- [Phase 6 — Verification finale](#phase-6--verification-finale)
- [Gestion des erreurs](#gestion-des-erreurs)

## Flow utilisateur de bout en bout

```
User : /init-landing-stack [optionnel: description rapide]
  │
  ├─ Phase 1 : Interview (6-8 questions ciblees)
  │     └─ Synthese du brief affichee, demande de confirmation
  │
  ├─ Phase 2 : Scaffolding
  │     ├─ mkdir + git init + cd
  │     ├─ npm create astro (ou vite) + integrations
  │     ├─ Structure dossiers : front/, supabase/, docs/, .claude/
  │     └─ Fichiers config : netlify.toml, tsconfig, .gitignore
  │
  ├─ Phase 3 : Supabase
  │     ├─ supabase init (si pas deja fait)
  │     ├─ supabase link OU create project
  │     ├─ Apply migration leads
  │     └─ Deploy edge function contact-form
  │
  ├─ Phase 4 : Netlify
  │     ├─ netlify init (auto-detect framework)
  │     ├─ Connect Git remote (optionnel)
  │     ├─ Install extension Supabase x Netlify
  │     └─ netlify deploy --prod
  │
  ├─ Phase 5 : Contexte Claude Code
  │     ├─ Generate CLAUDE.md (< 80 lignes)
  │     ├─ Generate .claude/rules/ (3-4 rules path-scoped)
  │     ├─ Copy/link skill context-guardian
  │     └─ Generate README.md projet
  │
  └─ Phase 6 : Verification finale
        ├─ Lighthouse sur URL prod
        ├─ Test submission form → vérifier insert leads
        ├─ Run context-guardian
        └─ Rapport final + prochaines etapes
```

## Phase 1 — Interview

### Questions a poser (sequentielles, 1 a 1, avec defaults intelligents)

| # | Question | Default | Pourquoi |
|---|----------|---------|----------|
| Q1 | Nom du projet (kebab-case) ? | derive du dossier courant | sert pour dossier, repo Git, projet Supabase, site Netlify |
| Q2 | Type de landing ? (produit, formation, lead-gen, event, autre) | lead-gen | influence sections par defaut, copywriting tonalite |
| Q3 | Framework frontend ? (Astro recommande / Vite + React / Vite + Vue) | Astro | cf. [02-comparatif-frameworks.md](../stack-landing-claude-code/02-comparatif-frameworks.md) |
| Q4 | Supabase : nouveau projet ou link a existant ? | nouveau | si existant, demander project ref |
| Q5 | Region Supabase ? (eu-west-1 / us-east-1 / ap-southeast-1) | eu-west-1 | RGPD si trafic EU |
| Q6 | Netlify : domaine genere auto ou custom ? | auto | custom = etape DNS supplementaire en post-deploy |
| Q7 | Tracking : aucun / GA4 / GA4+Meta / GA4+Meta+HubSpot | GA4 | conditionne packages + .env + extension |
| Q8 | Connecter a Git ? (GitHub / GitLab / aucun) | GitHub | active deploys auto + previews |

### Synthese affichee avant execution

```
BRIEF VALIDE
  Nom        : ma-landing
  Type       : lead-gen
  Framework  : Astro 6 + Tailwind 4
  Supabase   : nouveau projet, region eu-west-1
  Netlify    : domaine auto (ma-landing.netlify.app)
  Tracking   : GA4 (Plausible alternative possible plus tard)
  Git        : GitHub (push apres init)

DUREE ESTIMEE : 10-12 min execution + 2-3 min OAuth
COUTS : Free tier Supabase + Netlify (suffisant pour landing)

Confirmer ? (oui / modifier / annuler)
```

### Regles d'interview

- 1 question a la fois (jamais batch)
- Toujours un default explicite — l'utilisateur peut juste valider en appuyant entree
- Skip Q5 si Q4 = "link existant" (region heritee)
- Skip Q8 si pas de git CLI installe
- Synthese affichee avant execution avec possibilite de modifier

## Phase 2 — Scaffolding

### Etape 2.1 — Creation du dossier

```bash
cd ~/projets  # ou dossier choisi
mkdir <nom-projet>
cd <nom-projet>
git init
```

### Etape 2.2 — Init framework

**Astro (defaut)** :

```bash
npm create astro@latest front -- --template minimal --typescript strict --yes
cd front
npx astro add tailwind --yes
# Si tracking != aucun
npm install @supabase/supabase-js
```

**Vite + React (alternative)** :

```bash
npm create vite@latest front -- --template react-ts
cd front
npm install
npm install -D vite-react-ssg @netlify/vite-plugin tailwindcss @tailwindcss/vite
npm install @supabase/supabase-js
```

### Etape 2.3 — Structure finale

```
<nom-projet>/
├── .git/
├── .gitignore                  # genere
├── .claude/
│   ├── rules/                  # rules path-scoped
│   │   ├── frontend.md         # path: front/**
│   │   ├── backend.md          # path: supabase/**
│   │   └── claude-md.md        # path: CLAUDE.md
│   └── skills/
│       └── context-guardian/   # symlink ou copie
├── CLAUDE.md                   # < 80 lignes
├── README.md                   # commandes utiles
├── netlify.toml                # config build
├── front/                      # code Astro/Vite
│   ├── astro.config.mjs (ou vite.config.ts)
│   ├── package.json
│   ├── tsconfig.json
│   ├── public/
│   └── src/
│       ├── pages/
│       │   └── index.astro     # hero + form
│       ├── components/         # blocks reutilisables
│       │   ├── Hero.astro
│       │   ├── Features.astro
│       │   └── ContactForm.tsx # island react
│       ├── layouts/
│       │   └── Base.astro
│       ├── styles/
│       │   └── global.css      # tailwind + tokens
│       └── lib/
│           └── supabase.ts
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   │   └── 20260526120000_create_leads.sql
│   └── functions/              # edge functions
│       └── contact-form/
│           └── index.ts
└── docs/                       # docs projet (vide au init)
    └── README.md               # explique l'organisation
```

> Note importante : `front/` est un sous-projet npm complet (son propre `package.json`). Cela respecte la demande utilisateur de tout regrouper sous `front/` tout en gardant les conventions Astro (`src/pages`, `src/components`).

### Etape 2.4 — Fichiers de configuration generes

- `netlify.toml` racine : build dans `front/`, publish `front/dist`, Node 22
- `front/.env.example` : variables d'env attendues
- `front/src/lib/supabase.ts` : client Supabase pre-configure
- `supabase/migrations/<timestamp>_create_leads.sql` : table leads + RLS
- `supabase/functions/contact-form/index.ts` : handler form complet (cf. [05-supabase-integration.md](../stack-landing-claude-code/05-supabase-integration.md))

## Phase 3 — Connexion Supabase

### Etape 3.1 — Login (si pas deja fait)

```bash
supabase login
```

### Etape 3.2 — Create OR link

**Nouveau projet** :

Utiliser le MCP Supabase si disponible (`mcp__claude_ai_supabase__create_project`), sinon CLI :

```bash
supabase projects create <nom-projet> --org-id <org> --region eu-west-1 --db-password <gen>
```

Recuperer le project ref retourne.

**Link a existant** :

```bash
supabase link --project-ref <ref-saisie-en-Q4>
```

### Etape 3.3 — Apply migration

```bash
supabase db push
```

Si erreur (ex: projet pause), reveiller et retry.

### Etape 3.4 — Deploy Edge Function

```bash
supabase functions deploy contact-form
```

Verifier que la fonction est listed :

```bash
supabase functions list
```

### Etape 3.5 — Recuperer les credentials

Via MCP si dispo :
- `mcp__claude_ai_supabase__get_project_url` → SUPABASE_URL
- `mcp__claude_ai_supabase__get_publishable_keys` → SUPABASE_ANON_KEY

Sinon, demander a l'utilisateur de les coller depuis le dashboard.

Stocker dans `front/.env` (gitignored) :

```
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Phase 4 — Connexion Netlify

### Etape 4.1 — Init via CLI (deja installe)

```bash
netlify login   # ouvre browser, OAuth
netlify init
```

Auto-detection : framework Astro / Vite reconnu. Repondre aux prompts :
- "Create & configure a new site"
- Team : (selectionner)
- Site name : `<nom-projet>` (ou auto)
- Build command : `cd front && npm run build`
- Publish directory : `front/dist`

### Etape 4.2 — Connect Git (si Q8 != aucun)

Si Q8 = GitHub : creer le repo distant via gh CLI s'il est installe :

```bash
gh repo create <nom-projet> --private --source=. --remote=origin --push
```

Puis dans Netlify, le link Git est propose par `netlify init`.

### Etape 4.3 — Installer extension Supabase x Netlify

L'extension injecte automatiquement les env vars Supabase dans le build Netlify. Etapes :

1. Demander a l'utilisateur d'aller sur dashboard Netlify > Extensions > "Supabase" > Install
2. Configurer pour ce site : Project configuration > General > Supabase > Connect
3. Selectionner le projet Supabase cree en phase 3

> Note : ce flow OAuth est manuel cote utilisateur (pas automatisable). Le skill ouvre l'URL exacte avec `open` (macOS) ou affiche le lien.

### Etape 4.4 — First deploy

```bash
netlify deploy --prod
```

Recuperer l'URL retournee, l'afficher.

## Phase 5 — Contexte Claude Code

### Etape 5.1 — Generer CLAUDE.md

Template < 80 lignes (cf. [06-claude-code-workflow.md](../stack-landing-claude-code/06-claude-code-workflow.md)) :

```markdown
# CLAUDE.md

## Stack
- Frontend : <Astro 6 | Vite 7 + React> + Tailwind 4
- Backend : Supabase (Postgres + Edge Functions Deno)
- Infra : Netlify
- Code landing dans `front/`, edge functions dans `supabase/functions/`

## Regles MCP critiques
- mcp__claude_ai_supabase__* : utiliser pour migrations et deploys (jamais SQL direct prod)
- mcp__playwright__* : pour test E2E et screenshots
- Ne JAMAIS exposer SUPABASE_SERVICE_ROLE_KEY cote client

## Conventions
- Composants .astro pour statique, .tsx (React) pour islands interactifs
- Form handlers : passer par Edge Function contact-form, jamais Postgres direct cote client
- Images : <Image> d'Astro, jamais <img> brut
- Hydratation : client:visible par defaut, client:load uniquement si necessaire

## Commandes utiles
- cd front && npm run dev — dev local (port 4321 ou 5173)
- supabase functions serve contact-form — Edge Function en local
- npx lighthouse http://localhost:4321 --view — audit perf
- netlify deploy --prod — deploy prod (CI fera ca sur push si Git connecte)

## Cibles de perf
- Lighthouse Performance >= 95
- LCP < 1.5s, CLS < 0.1, INP < 200ms
- Bundle JS client < 50 KB

## Regles MCP (rappel critique)
- Ne JAMAIS exposer SUPABASE_SERVICE_ROLE_KEY cote client
```

### Etape 5.2 — Generer .claude/rules/

3 fichiers rules path-scoped :

`.claude/rules/frontend.md` :
```yaml
---
paths:
  - "front/**"
---
Regles pour le code frontend (Astro/Vite + Tailwind).
Convention : 1 composant = 1 section de landing.
Defaut hydratation : client:visible.
```

`.claude/rules/backend.md` :
```yaml
---
paths:
  - "supabase/**"
---
Regles pour Supabase (migrations, Edge Functions).
RLS toujours active. Service role uniquement cote Edge Function.
CORS restreint au domaine de prod (jamais *) en production.
```

`.claude/rules/claude-md.md` :
```yaml
---
paths:
  - "CLAUDE.md"
---
Maintenir CLAUDE.md < 80 lignes.
Toute regle MCP critique doit etre dans les 3 premieres lignes ET dans les 3 dernieres.
```

### Etape 5.3 — Reference skill context-guardian

Deux options :

**Option A — Symlink global** (recommande si projet sur la meme machine que `~/.claude/`) :
```bash
mkdir -p .claude/skills
ln -s ~/.claude/skills/context-guardian .claude/skills/context-guardian
```

**Option B — Copie locale** (si projet partage ou portable) :
```bash
mkdir -p .claude/skills
cp -r ~/.claude/skills/context-guardian .claude/skills/context-guardian
```

Le skill `init-landing-stack` propose Option A par defaut, fallback Option B si symlink echoue.

### Etape 5.4 — README.md projet

Generer un README avec :
- Description courte
- Commandes utiles (dev, build, deploy, supabase)
- Lien vers le dashboard Netlify et Supabase
- Lien vers le projet sur GitHub (si Q8 != aucun)
- Section "Prochaines etapes" : ajouter sections, configurer tracking, optimiser conversion

## Phase 6 — Verification finale

### Etape 6.1 — Lighthouse audit

```bash
npx lighthouse <url-netlify-prod> \
  --only-categories=performance \
  --chrome-flags="--headless" \
  --quiet --output=json --output-path=/tmp/lh.json
```

Lire le JSON. Extraire `categories.performance.score`. Si < 0.9 : warning, sinon green.

### Etape 6.2 — Test submission form

Via MCP Playwright si disponible, sinon `curl` :

```bash
curl -X POST <supabase-url>/functions/v1/contact-form \
  -H "Content-Type: application/json" \
  -H "apikey: <anon-key>" \
  -d '{"email":"test+initskill@example.com","name":"Init Test","source":"skill-init"}'
```

Verifier `{"ok": true}` retourne, puis verifier insert :

```sql
SELECT * FROM public.leads WHERE email = 'test+initskill@example.com';
```

Via MCP `mcp__claude_ai_supabase__execute_sql`.

### Etape 6.3 — Run context-guardian

```bash
# Si le skill context-guardian est installe via symlink/copie
claude --skill context-guardian
```

Score attendu : >= 60/80 (un projet flambant neuf n'aura pas tout, mais doit avoir l'essentiel).

### Etape 6.4 — Rapport final

```
INIT LANDING STACK : SUCCESS ✓

PROJET
  Nom            : ma-landing
  Dossier        : /Users/.../ma-landing
  Stack          : Astro 6 + Tailwind 4 + Supabase + Netlify
  Git remote     : github.com/user/ma-landing (push effectue)

URLS
  Production     : https://ma-landing.netlify.app
  Dashboard NL   : https://app.netlify.com/sites/ma-landing
  Dashboard SB   : https://app.supabase.com/project/<ref>
  GitHub         : https://github.com/user/ma-landing

VERIFICATIONS
  ✓ Site accessible (HTTP 200)
  ✓ Lighthouse Performance : 96 / 100
  ✓ Form submission : OK (1 lead insere en test)
  ✓ Context-guardian : 68 / 80

PROCHAINES ETAPES
  1. cd front && npm run dev — coder les sections
  2. Personnaliser hero, features, pricing dans front/src/components/
  3. Editer copy dans front/src/pages/index.astro
  4. (Optionnel) /landing-google-ads pour optimiser Google Ads
  5. (Optionnel) /extract-design-system pour aspirer un DS reference
  6. (Optionnel) /connect-hubspot-form pour connecter HubSpot

DOC : @docs/stack-landing-claude-code/07-conversion-checklist.md pour la checklist de mise en prod
```

## Gestion des erreurs

| Etape | Erreur typique | Action |
|-------|---------------|--------|
| 2.2 | `npm create astro` echoue (network) | retry 1x, sinon STOP avec instruction install manuel |
| 3.2 | Supabase login expire | re-run `supabase login` |
| 3.3 | Migration echoue (db reset) | afficher erreur, demander a l'utilisateur de regler dans dashboard |
| 4.1 | Netlify init demande prompts non scriptables | basculer en mode interactif, demander a l'user de suivre |
| 4.3 | Extension Supabase x Netlify non installee | continuer sans (env vars a saisir manuellement), warning a la fin |
| 4.4 | First deploy 404 | verifier publish directory dans netlify.toml |
| 6.2 | Form submission 500 | logs Edge Function via MCP, identifier la cause |
| 6.3 | Context-guardian < 50/80 | afficher les checks rouges, suggerer fixes |

**Principe** : chaque erreur doit etre actionnable. Jamais "echec, abandon". Toujours "echec a l'etape X, voici comment debloquer".

## Sources

- [docs/stack-landing-claude-code/](../stack-landing-claude-code/_index.md) — stack et patterns techniques
- [.claude/skills/context-guardian/SKILL.md](../../.claude/skills/context-guardian/SKILL.md) — checks de contexte
- [Claude Code best practices](https://code.claude.com/docs/en/best-practices) — CLAUDE.md court, MCP rules
