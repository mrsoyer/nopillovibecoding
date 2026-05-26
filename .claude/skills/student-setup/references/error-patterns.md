# Error Patterns & Recovery Strategies

> 25+ erreurs frequentes au setup etudiant + strategies de retry/fix.

## Table des matieres

- [Node.js / npm](#nodejs--npm)
- [Git / GitHub](#git--github)
- [Netlify CLI](#netlify-cli)
- [Supabase CLI](#supabase-cli)
- [MCPs Claude Code](#mcps-claude-code)
- [npm install / npm run dev](#npm-install--npm-run-dev)
- [Formulaire / Edge Function](#formulaire--edge-function)

---

## Node.js / npm

### `node: command not found` (apres install)

| Cause | Fix |
|-------|-----|
| PATH pas a jour | Mac : `source ~/.zshrc` puis retest. Windows : re-ouvrir PowerShell |
| Install incomplet | Re-lancer l'install (cf. os-commands-matrix.md) |

**Strategie retry** : re-source le shell, sinon proposer un terminal frais.

### `EACCES: permission denied` au `npm install -g ...`

| Cause | Fix |
|-------|-----|
| npm tente d'ecrire dans `/usr/local` proteges | **PROPRE** : passer a nvm (no sudo). **RAPIDE** : `sudo npm install -g ...` (mac) |

**Strategie** : proposer nvm en priorite. Sudo seulement si l'etudiant insiste.

### `npm WARN EBADENGINE` ou "Unsupported engine"

| Cause | Fix |
|-------|-----|
| Node version trop ancienne | `nvm install 24 && nvm use 24` |

### `npm ERR! code ENOSPC`

| Cause | Fix |
|-------|-----|
| Disque plein | Liberer espace, supprimer `node_modules` anciens (`find . -name node_modules -prune -exec rm -rf {} \;`) |

---

## Git / GitHub

### `Permission denied (publickey)` au `git clone`

| Cause | Fix |
|-------|-----|
| Pas de cle SSH | Switcher vers HTTPS : copier l'URL en HTTPS depuis GitHub (`https://github.com/...`) au lieu de SSH (`git@github.com:...`) |

### `Authentication failed for 'https://...'`

| Cause | Fix |
|-------|-----|
| GitHub refuse password depuis 2021 | Installer + utiliser `gh` CLI : `gh auth login` puis re-cloner |

### `fatal: not a git repository`

| Cause | Fix |
|-------|-----|
| L'etudiant n'est pas dans le bon dossier | `cd <dossier-projet>` |

### `error: Your local changes ... would be overwritten by checkout`

| Cause | Fix |
|-------|-----|
| Modifs locales non commitees | Stash : `git stash` OU reset : `git checkout -- .` (PERTE de travail) |

---

## Netlify CLI

### `netlify: command not found` (apres install npm)

| Cause | Fix |
|-------|-----|
| PATH npm global pas dans PATH | Mac : verifier `npm prefix -g`, ajouter au PATH dans `~/.zshrc`. Windows : re-ouvrir PowerShell |

**Strategie** : tester `which netlify` (mac) / `where.exe netlify` (windows). Si vide, fix PATH.

### `netlify login` ne s'ouvre pas

| Cause | Fix |
|-------|-----|
| Browser default mal detecte | Copier l'URL affichee dans le terminal, coller dans Chrome/Firefox manuellement |

### "Token invalidated"

| Cause | Fix |
|-------|-----|
| User a reset password Netlify | `netlify logout && netlify login` |

---

## Supabase CLI

### `Cannot connect to the Docker daemon`

| Cause | Fix |
|-------|-----|
| CLI < 2.45 essaie d'utiliser Docker | `brew upgrade supabase` (Mac) / `scoop update supabase` (Windows) → version 2.45+ bundle sans Docker |

**Strategie retry** :
```bash
brew upgrade supabase  # OU scoop update supabase
supabase --version     # verifier >= 2.45
# retry la commande
```

### `Cannot find project ref`

| Cause | Fix |
|-------|-----|
| Pas link au projet | `supabase link --project-ref <REF>` (demander le ref a l'etudiant) |

### `Database password authentication failed`

| Cause | Fix |
|-------|-----|
| Mauvais password | Dashboard Supabase → Settings → Database → Reset password → recommencer link |

### `failed to fetch dynamic config`

| Cause | Fix |
|-------|-----|
| Reseau ou Supabase down | Verifier https://status.supabase.com → si UP, retry dans 30s |

### `npm install -g supabase` echoue

| Cause | Fix |
|-------|-----|
| Pas supporte | Utiliser brew (Mac) ou scoop (Windows) au lieu de npm |

---

## MCPs Claude Code

### `/mcp` ne liste rien

| Cause | Fix |
|-------|-----|
| `.mcp.json` absent | Verifier presence du fichier a la racine du projet (pas dans front/). Re-creer via `claude mcp add` |

### MCP statut "Failed to connect"

| Cause | Fix |
|-------|-----|
| URL fausse | HubSpot doit etre `/anthropic`, Webflow `/mcp`, Supabase avec `?project_ref=XXX` |
| OAuth pas effectue | Lancer `/mcp`, selectionner le MCP, completer le browser flow |

### MCP "Needs authentication" reste apres OAuth

| Cause | Fix |
|-------|-----|
| Token pas stocke | Quitter Claude Code (Cmd+Q / Ctrl+Q), re-ouvrir, refaire `/mcp` |

### Browser ne s'ouvre pas pour OAuth

| Cause | Fix |
|-------|-----|
| Default browser non detecte | Copier l'URL du terminal, ouvrir manuellement |

---

## npm install / npm run dev

### `EADDRINUSE: address already in use :::4321`

| Cause | Fix |
|-------|-----|
| Port 4321 deja pris | **Option A** : tuer le process (cf. os-commands-matrix.md). **Option B** : `npm run dev -- --port 4322` |

**Strategie** : demander a l'etudiant son choix via AskUserQuestion.

### `PUBLIC_SUPABASE_URL is undefined` au runtime

| Cause | Fix |
|-------|-----|
| `.env` dans le mauvais dossier | Doit etre dans `front/.env`, pas a la racine. Verifier `ls front/.env` |

### Page blanche sur localhost:4321

| Cause | Fix |
|-------|-----|
| Erreur JS bloquante | DevTools (F12) → Console → lire l'erreur |
| Adobe Typekit bloque | Verifier firewall/adblocker (rare) |

### CSS pas applique (tout gris)

| Cause | Fix |
|-------|-----|
| Tailwind 4 pas charge | Re-run `npm install` puis `npm run dev` |
| `global.css` mal importe | Verifier `front/src/styles/global.css` commence par `@import "tailwindcss";` |

### `Module not found: Can't resolve 'react'`

| Cause | Fix |
|-------|-----|
| React pas installe (rare apres clean clone) | `npm install react react-dom @astrojs/react` dans front/ |

### Hot reload ne marche pas

| Cause | Fix |
|-------|-----|
| Watcher pas actif (rare sur Windows) | Killer + relancer `npm run dev` |
| Fichier en dehors de `front/src/` | C'est normal, seul `src/` est watche |

---

## Formulaire / Edge Function

### "Failed to fetch" au submit

| Cause | Fix |
|-------|-----|
| Edge function pas deployee | `supabase functions deploy contact-form --no-verify-jwt --project-ref <REF>` |
| URL mauvaise dans `lib/supabase.ts` | Verifier que `PUBLIC_SUPABASE_URL` dans `.env` est correct |

### "CORS error" au submit

| Cause | Fix |
|-------|-----|
| `localhost:4321` pas dans `ALLOWED_ORIGINS` | Editer `supabase/functions/contact-form/index.ts`, ajouter, redeploy |

### Erreur 400 "Email invalide"

| Cause | Fix |
|-------|-----|
| Email malforme | Utiliser un email standard `xxx@yyy.zz` |

### Lead pas visible dans Supabase

| Cause | Fix |
|-------|-----|
| Table `leads` pas creee | `supabase db push` pour appliquer les migrations |
| Pas dans le bon projet | Verifier que le `project_ref` est celui de l'etudiant, pas du prof |

---

## Strategies generales de retry

### Pattern 1 — Re-verifier apres install

Apres chaque `brew install` / `npm install -g`, **toujours** lancer `<tool> --version`. Si echec, ne pas continuer.

### Pattern 2 — Confirmer avant destructive

Avant `sudo`, modification PATH, ou `git reset --hard` : utiliser AskUserQuestion pour confirmer.

### Pattern 3 — Diagnostiquer avant fix

Si une commande echoue :
1. Capturer les 10 dernieres lignes de log
2. Identifier le pattern d'erreur dans cette doc
3. Proposer le fix correspondant
4. Retenter

### Pattern 4 — Limiter les tentatives

Max 3 retentatives sur une meme erreur. Apres : STOP et demander a l'etudiant de contacter le prof.

### Pattern 5 — Logs verbeux pour debug complexe

```bash
NPM_CONFIG_LOGLEVEL=verbose npm install
DEBUG=* npm run dev
supabase functions deploy contact-form --debug
```
