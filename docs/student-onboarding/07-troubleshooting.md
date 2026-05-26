# 07 — Troubleshooting (erreurs frequentes)

## Table des matieres

- [Erreurs Node.js / npm](#erreurs-nodejs--npm)
- [Erreurs Git / GitHub](#erreurs-git--github)
- [Erreurs Netlify CLI](#erreurs-netlify-cli)
- [Erreurs Supabase CLI](#erreurs-supabase-cli)
- [Erreurs MCP Claude Code](#erreurs-mcp-claude-code)
- [Erreurs au npm run dev](#erreurs-au-npm-run-dev)
- [Erreurs sur le formulaire](#erreurs-sur-le-formulaire)

---

## Erreurs Node.js / npm

### `node: command not found` (apres install)

**Cause** : PATH pas mis a jour.

**Mac** : re-ouvrir le terminal OU `source ~/.zshrc`.
**Windows** : re-ouvrir PowerShell.

### `EACCES: permission denied` au `npm install`

**Cause** : permissions sur `/usr/local` (Mac) ou Program Files (Windows).

**Solution propre** : passer a nvm (cf. [01-prerequis-systeme.md](01-prerequis-systeme.md)). nvm installe dans `~/.nvm` (pas de sudo necessaire).

**Solution rapide (deconseillee)** : `sudo npm install` (Mac uniquement).

### `npm WARN EBADENGINE` ou "Unsupported engine"

**Cause** : version Node trop ancienne. Le projet exige Node 22+.

```bash
node --version    # verifier
nvm install 24    # installer
nvm use 24
```

---

## Erreurs Git / GitHub

### `Permission denied (publickey)` au `git clone`

**Cause** : pas de cle SSH configuree.

**Solution** : cloner avec HTTPS au lieu de SSH :
```bash
git clone https://github.com/<prof>/<repo>.git
```

OU configurer SSH :
```bash
ssh-keygen -t ed25519 -C "ton@email.com"
cat ~/.ssh/id_ed25519.pub    # copier la cle
# Coller dans GitHub > Settings > SSH and GPG keys > New SSH key
```

### `Authentication failed for 'https://github.com/...'`

**Cause** : GitHub n'accepte plus les mots de passe pour HTTPS depuis 2021.

**Solution** : utiliser GitHub CLI :
```bash
gh auth login    # suivre les prompts
```

---

## Erreurs Netlify CLI

### `netlify: command not found`

**Cause** : install pas reussi OU PATH pas a jour.

```bash
which netlify              # Mac : devrait afficher un chemin
where.exe netlify          # Windows
npm list -g netlify-cli    # verifier l'install
```

Re-installer si necessaire :
```bash
npm install -g netlify-cli
```

### `netlify login` ne s'ouvre pas

**Cause** : browser default non detecte (rare).

**Solution** : copier l'URL affichee dans le terminal et coller manuellement dans Chrome/Firefox.

### "Token invalidated"

**Cause** : tu as reset ton mot de passe Netlify.

**Solution** : `netlify logout` puis `netlify login` a nouveau.

---

## Erreurs Supabase CLI

### `Cannot connect to the Docker daemon`

**Cause** : ta version de Supabase CLI est < 2.45 et essaie d'utiliser Docker pour bundler les Edge Functions.

```bash
supabase --version    # verifier
brew upgrade supabase           # Mac
scoop update supabase           # Windows
```

Si tu ne peux pas update, installer Docker Desktop : https://www.docker.com/products/docker-desktop/

### `failed to inspect docker image`

Meme cause que ci-dessus.

### `Cannot find project ref`

**Cause** : tu n'as pas link ton projet.

```bash
supabase link --project-ref <TON-PROJECT-REF>
```

### `Database password authentication failed`

**Cause** : mauvais mot de passe DB.

Si tu as oublie le mot de passe : Dashboard Supabase → Settings → Database → "Reset database password" (genere un nouveau).

### `npm install -g supabase` echoue

**Cause** : pas supporte officiellement.

**Solution** : utiliser brew (Mac) ou scoop (Windows). Cf. [03-installer-clis.md](03-installer-clis.md).

---

## Erreurs MCP Claude Code

### `/mcp` ne liste rien

**Cause** : `.mcp.json` introuvable.

```bash
ls .mcp.json    # doit exister a la racine du projet (pas dans front/)
```

Si manquant, recreer :
```bash
claude mcp add --scope project --transport http supabase \
  "https://mcp.supabase.com/mcp?project_ref=<TON-REF>"
```

### MCP statut "Failed to connect"

**Cause 1** : URL fausse.
- HubSpot : doit etre `https://mcp.hubspot.com/anthropic` (avec `/anthropic`)
- Webflow : `https://mcp.webflow.com/mcp`
- Supabase : `https://mcp.supabase.com/mcp?project_ref=<ref>`

**Cause 2** : OAuth jamais effectue.
→ Lancer `/mcp` dans Claude Code et selectionner le MCP pour declencher OAuth.

### Browser ne s'ouvre pas pour OAuth

**Solution** : copier l'URL affichee dans le terminal et coller manuellement dans le browser.

### "Needs authentication" reste meme apres OAuth

**Solution** : 
1. Verifier que tu as bien clique "Authorize" dans le browser
2. Quitter Claude Code (Cmd+Q ou Ctrl+Q)
3. Re-ouvrir → `/mcp` → devrait etre Connected

Si persiste : `/mcp` → selectionner le MCP → "Clear authentication" → recommencer.

---

## Erreurs au npm run dev

### `EADDRINUSE: address already in use :::4321`

**Cause** : un autre processus utilise deja le port 4321.

**Solution 1** : tuer le processus :
```bash
# Mac/Linux
lsof -ti:4321 | xargs kill -9

# Windows PowerShell
Get-NetTCPConnection -LocalPort 4321 | Stop-Process -Id { $_.OwningProcess } -Force
```

**Solution 2** : lancer sur un autre port :
```bash
npm run dev -- --port 4322
```

### `PUBLIC_SUPABASE_URL is undefined`

**Cause** : `.env` n'est pas dans le bon dossier.

Le `.env` doit etre dans `front/.env` (pas a la racine du projet).

```bash
ls front/.env    # doit exister
cat front/.env   # verifier le contenu
```

### Page blanche au browser

**Cause possible 1** : erreur JavaScript bloquante.
→ Ouvrir DevTools (F12) → Console → lire les erreurs.

**Cause possible 2** : Adobe Typekit bloque (rare).
→ Verifier que ton firewall/adblocker n'empeche pas `use.typekit.net`.

### CSS pas applique (tout est gris)

**Cause** : Tailwind 4 pas charge.

```bash
cd front
npm install      # re-installer
npm run dev      # relancer
```

Si persiste, verifier que `front/src/styles/global.css` commence par `@import "tailwindcss";`.

---

## Erreurs sur le formulaire

### "Failed to fetch" au submit

**Cause** : l'Edge Function n'est pas deployee OU URL fausse.

```bash
# Verifier la liste des fonctions deployees :
supabase functions list --project-ref <TON-REF>
```

Si la fonction `contact-form` manque :
```bash
supabase functions deploy contact-form --no-verify-jwt --project-ref <TON-REF>
```

### "CORS error" au submit

**Cause** : ton URL de dev (ex: `http://localhost:4321`) n'est pas dans `ALLOWED_ORIGINS` de l'Edge Function.

**Solution** : editer `supabase/functions/contact-form/index.ts`, ajouter `http://localhost:4321` dans `ALLOWED_ORIGINS`, redeployer.

### Erreur 400 "Email invalide"

**Cause** : tu as saisi un email malforme (ex: `test@test`).

→ Utiliser un email valide format `xxx@yyy.zz` (ex: `test@example.com`).

### Lead pas visible dans Supabase

**Verifier la table** :
```bash
# Via supabase CLI
supabase db query "SELECT count(*) FROM public.leads"

# Via dashboard
# Supabase > Table Editor > leads
```

Si la table n'existe pas :
```bash
supabase db push    # applique les migrations
```

---

## Demander de l'aide

Si bloque apres 10 min :
1. **Slack/Discord du cours** : poster erreur exacte + OS + etape + ce que tu as essaye
2. **Claude Code** : copier-coller l'erreur, dire ton OS → Claude propose une solution
3. **Le prof** : pendant l'atelier, lever la main

## Sources

- [Astro EADDRINUSE issue](https://github.com/withastro/astro/issues/9133)
- [Fix EADDRINUSE Node.js](https://oneuptime.com/blog/post/2026-01-25-fix-eaddrinuse-nodejs/view)
- [Astro Connection Refused](https://markaicode.com/errors/astro-connection-refused-error-fix/)
- [GitHub - Caching credentials](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git)
