# 06 — Deploy workflow : CI, branches, preview, rollback

## Vue d'ensemble du workflow

```
┌──────────┐    git push     ┌─────────┐   detect   ┌──────────┐
│ Dev local│ ───────────────▶│ GitHub  │──────────▶│ Netlify  │
└──────────┘                 └─────────┘            └────┬─────┘
                                                         │
                            ┌────────────────────────────┼────────────────────────┐
                            │                            │                        │
                       branch main             branch feature/X            PR opened
                            │                            │                        │
                            ▼                            ▼                        ▼
                   ┌────────────────┐         ┌──────────────────┐     ┌──────────────────┐
                   │ Production     │         │ Branch deploy     │     │ Deploy preview   │
                   │ client.com     │         │ feature-x--prj... │     │ deploy-preview-N │
                   └────────────────┘         └──────────────────┘     └──────────────────┘
```

## Setup initial

### 1. Connexion repo Git

Dashboard Netlify → "Add new project" → "Import an existing project" → choisir GitHub/GitLab/Bitbucket/Azure DevOps → autoriser → choisir le repo.

Netlify detecte automatiquement le framework (Astro, Next.js, Nuxt) et propose les bons settings :
- **Build command** : `npm run build` (ou `astro build`)
- **Publish directory** : `dist`
- **Functions directory** : `netlify/functions`

### 2. `netlify.toml` versionne

Toute la config dans le repo :

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"
  edge_functions = "netlify/edge-functions"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--no-audit --no-fund"

# Headers globaux securite
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), camera=(), microphone=()"

# Cache assets fingerprintes (Astro/Vite)
[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Redirect API propres
[[redirects]]
  from = "/api/*"
  to   = "/.netlify/functions/:splat"
  status = 200

# Contexts par environnement
[context.production]
  command = "npm run build"
  [context.production.environment]
    PUBLIC_ENV = "production"

[context.deploy-preview]
  command = "npm run build:preview"
  [context.deploy-preview.environment]
    PUBLIC_ENV = "preview"

[context.branch-deploy]
  [context.branch-deploy.environment]
    PUBLIC_ENV = "staging"
```

### 3. Variables d'environnement

3 facons :

```bash
# CLI (recommande)
netlify env:set HUBSPOT_TOKEN "pat-xxx" --context=production
netlify env:set HUBSPOT_TOKEN "pat-test" --context=deploy-preview --context=branch-deploy

# Import depuis .env
netlify env:import .env

# Dashboard UI
# Site settings → Environment variables → New variable
```

**Scopes disponibles** : Builds, Functions, Runtime, Post-processing.
**Contexts** : production, deploy-preview, branch-deploy, branch:<nom>, all.

Pour Nopillo : separer **toujours** les tokens prod et preview (eviter de polluer HubSpot prod avec des leads de test).

## Trois types de deploys

### 1. Production deploy

Trigger : push sur la branche de production (par defaut `main` ou `master`).

URL : domaine custom + `https://<projet>.netlify.app`.

### 2. Branch deploy

Trigger : push sur une branche enregistree comme branch deploy.

URL : `https://<branch>--<projet>.netlify.app`.

Utilite : avoir un staging permanent (`develop`, `staging`).

Activer dans : Site configuration → Build & deploy → Branches and deploy contexts.

### 3. Deploy preview

Trigger : ouverture d'une PR / MR sur `main` (ou sur une branche deploy enregistree).

URL : `https://deploy-preview-<N>--<projet>.netlify.app`.

Mis a jour automatiquement a chaque push sur la PR.

**Workflow agency Nopillo recommande** :
1. Dev cree branche `feat/hero-redesign`.
2. Ouvre PR vers `main`.
3. Netlify build → poste l'URL preview en commentaire de la PR.
4. Lien envoye au client.
5. Client commente via **Netlify Drawer** (screenshots, video, sync vers GitHub).
6. Dev push fix → preview se met a jour automatiquement.
7. Approuve + merge → deploy production automatique.

## Netlify Drawer (collab client)

Outil unique de Netlify pour la collab agence-client.

- Active sur toute deploy preview.
- Le client ouvre le drawer (raccourci `Ctrl+\` / `Cmd+\`) ou via badge en bas de page.
- Possibilites :
  - Annoter la page (screenshot).
  - Enregistrer une video du bug.
  - Tester en mode mobile.
  - Laisser commentaire texte.
- Sync automatique vers : **GitHub Issues, GitLab Issues, Jira Software, Jira Server, Azure DevOps Work Items, Trello cards**.

Pour Nopillo : remplace 80 % des outils tiers (Loom + Notion comments + screenshots Slack).

## CLI Netlify (workflow dev)

```bash
# Installation globale
npm install -g netlify-cli

# Login
netlify login

# Lier projet local a un site Netlify
netlify link

# Dev local (build + functions + edge + forms)
netlify dev

# Deploy preview manuel (pas via Git)
netlify deploy

# Deploy production manuel
netlify deploy --prod

# Voir status site
netlify status

# Logs functions en stream
netlify functions:log <nom>

# Trigger build via CLI
netlify build
```

## Build hooks (declenchement externe)

URL unique pour declencher un rebuild sans push Git. Utile pour :
- CMS headless qui notifie Netlify quand un contenu change.
- Cron externe (n8n, Zapier).
- Refresh contenu API (pricing, stock).

```bash
# Dashboard → Build & deploy → Build hooks → Add build hook
# Donne une URL : https://api.netlify.com/build_hooks/abc123

curl -X POST -d '{}' https://api.netlify.com/build_hooks/abc123
```

## Rollback

3 methodes :

### 1. Dashboard (rapide)
Site → Deploys → cliquer sur un ancien deploy → "Publish deploy".

Le deploy redevient actif en quelques secondes (les anciens artefacts sont conserves).

### 2. CLI
```bash
netlify api restoreSiteDeploy --data '{"site_id":"xxx","deploy_id":"yyy"}'
```

### 3. Git revert
Annule le commit fautif → push → Netlify rebuild → deploy.

Prefere la methode dashboard pour les rollback urgents (quelques secondes vs full rebuild).

## Strategie branching Nopillo recommandee

```
main             ← production (auto-deploy production)
└── develop      ← staging permanent (branch deploy)
    ├── feat/*   ← features (deploy preview via PR)
    ├── fix/*    ← hotfix (deploy preview via PR)
    └── client/* ← demos client (branch deploy nomme)
```

Regles :
- PR obligatoire vers `main` (jamais de push direct).
- 1 PR = 1 ticket / 1 feature.
- Reviewer assigne dans GitHub.
- Lighthouse CI lance sur preview (cf. ci-dessous).
- Merge = squash + delete branche.

## Checks automatises sur preview

### Lighthouse CI via GitHub Action

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse on preview
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Wait for Netlify deploy
        uses: probablyup/wait-for-netlify-action@3.4.0
        id: netlify
        with:
          site_id: ${{ secrets.NETLIFY_SITE_ID }}
          max_timeout: 360
      - name: Lighthouse audit
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: ${{ steps.netlify.outputs.url }}
          uploadArtifacts: true
          temporaryPublicStorage: true
          configPath: ./.lighthouserc.json
```

`.lighthouserc.json` :

```json
{
  "ci": {
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:seo": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

## Securite et access control

- **Password protect previews** (Site config → Access & security), **role-based access** sur Pro (Owner/Developer/Reviewer/Billing), **deploy notifications** Slack/email a chaque deploy.

## A retenir

Le workflow Netlify pour Nopillo = **Git-driven, preview par PR, collab client via Drawer, rollback en 1 clic**. C'est l'argument structurant face a Webflow : **vraie traceabilite Git, environnements multiples, integration CI/CD natifs**, le tout sans serveur a gerer.

## Sources

- [Deploy Previews - Netlify docs](https://docs.netlify.com/deploy/deploy-types/deploy-previews/) — previews PR officielles
- [Deploy overview - Netlify docs](https://docs.netlify.com/deploy/deploy-overview/) — types de deploys (production, branch, preview)
- [Manage deploys - Netlify docs](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/) — rollback et restore
- [Build environment variables](https://docs.netlify.com/build/configure-builds/environment-variables/) — contexts production/preview/branch
- [Get started with Netlify CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/) — commandes CLI workflow
- [Netlify Deploy Previews and Branch Deployments - The Pi Guy](https://the-pi-guy.com/blog/netlify_deploy_previews_and_branch_deployments/) — patterns CI/CD
