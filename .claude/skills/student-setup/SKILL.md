---
name: student-setup
description: >
  Guide interactif l'etudiant (Mac/Windows) pour cloner le repo et lancer la landing en local.
  Detecte l'OS, installe ce qui manque, demande les credentials Supabase, execute avec retry,
  termine par npm run dev. Itere jusqu'a succes.
argument-hint: ""
allowed-tools: Read Write Edit Bash AskUserQuestion mcp__playwright__browser_navigate mcp__playwright__browser_snapshot mcp__playwright__browser_take_screenshot mcp__playwright__browser_close mcp__playwright__browser_click mcp__playwright__browser_type mcp__playwright__browser_fill_form mcp__playwright__browser_wait_for
model: sonnet
effort: high
---

# Student Setup — Lancer la landing en local de A a Z

Tu guides un etudiant debutant (Mac ou Windows) pas a pas, de zero jusqu'a `npm run dev` qui marche. Tu fais TOUT pour lui : detecter l'OS, verifier les outils, installer ce qui manque, demander ses credentials cloud, configurer ses fichiers, lancer le serveur, verifier que tout marche.

**Tu iteres jusqu'a ce que ca fonctionne.** Si une etape echoue, tu diagnostiques, proposes un fix, et retentes.

## REGLE D'OR (lis ca AVANT TOUT)

> **Tout doit etre installe dans le dossier ou tourne Claude Code (`pwd`)** — JAMAIS dans `~/projets/`, jamais ailleurs.
>
> L'etudiant a lance Claude Code depuis SON dossier (ex : `/Users/thomas/leartest/`). C'est LA que doit aller :
> - Le clone du repo (`git clone` dans un tmp puis `cp -R` vers cwd)
> - Le `.env` (`<cwd>/nopillo-landing-exemple/front/.env`)
> - Le `.mcp.json` (`<cwd>/.mcp.json`)
> - Tout le contenu (`docs/`, `slide/`, `nopillo-landing-exemple/`, etc.)
>
> **Au debut du workflow** : capture le cwd dans une variable `CWD=$(pwd)` et utilise `$CWD` partout pour eviter toute confusion. NE JAMAIS faire `cd ~/projets` ou creer un dossier ailleurs.
>
> **Verification systematique** : avant chaque commande qui ecrit, faire `pwd` pour s'assurer qu'on est bien dans `$CWD` ou un sous-dossier de `$CWD`.

## References disponibles

| Fichier | Quand le lire |
|---------|---------------|
| [references/os-commands-matrix.md](references/os-commands-matrix.md) | Phase 1-3 : equivalences Mac vs Windows pour chaque operation |
| [references/error-patterns.md](references/error-patterns.md) | Phase 7 : 25+ erreurs frequentes + strategie de recovery |

## Documentation projet (source de verite)

Detail complet par phase : [docs/student-onboarding/](../../../docs/student-onboarding/) (9 fichiers, 1300+ lignes).
Reference au besoin, pas obligatoire pour executer le workflow.

## Workflow (7 phases — toujours en ordre)

### Phase 0 — Accueil + detection OS + Git (PRIORITE ABSOLUE)

Saluer l'etudiant brievement :

```
Salut ! Je vais te guider pour lancer la landing Nopillo en local. ~25 min.

Si tu m'entends, c'est que tu as deja :
  ✓ VSCode installe
  ✓ Claude Code CLI installe (tu lances ce skill, donc OK)
  ✓ Telecharge ce skill dans .claude/skills/student-setup/

Premiere etape : je verifie ton systeme et j'installe Git + plugins VSCode si necessaire.
```

**Etape 0.0 — Verifier plugins VSCode (rapide)**

Demander a l'etudiant via AskUserQuestion :

> "As-tu installe les 2 plugins VSCode demandes ?
>  1. **Claude Code** (par Anthropic)
>  2. **XLSX, CSV, TSV & Markdown Editor** (par ramaroe ou similaire)"

| Reponse | Action |
|---|---|
| Oui les deux | Passer a 0.1 |
| Un seul / Aucun | Donner les commandes ci-dessous |
| Je ne sais pas | Verifier via `code --list-extensions` |

Verification automatique (si VSCode CLI dans PATH) :

```bash
code --list-extensions 2>/dev/null | grep -E "anthropic|claude|csv|xlsx" | head -10
```

Installation rapide en ligne de commande si manquants :

```bash
# Plugin Claude Code (officiel Anthropic)
code --install-extension Anthropic.claude-code

# Plugin XLSX/CSV/Markdown editor (utile pour visualiser les data)
code --install-extension GrapeCity.gc-excelviewer
```

Si `code` n'est pas dans le PATH (Mac) :
> "Dans VSCode : Cmd+Shift+P → tape 'Shell Command: Install code command in PATH' → Enter. Puis recharge le terminal."

Si l'etudiant prefere installer via UI : direction VSCode → onglet Extensions (Cmd+Shift+X) → chercher chaque plugin → Install.

**Ne pas bloquer** sur les plugins : ils sont pratiques mais pas critiques. Si l'etudiant est presse, passer a 0.1 et y revenir plus tard.

**Etape 0.1 — Detecter l'OS**

```bash
uname -s 2>/dev/null || echo "Windows"
```

Possibles resultats :
- `Darwin` → **Mac**
- `Linux` → Linux (rare, traiter comme Mac sauf install)
- Erreur ou `Windows` → **Windows**

Confirmer a l'etudiant : `OS detecte : [Mac / Windows]`.

**Etape 0.2 — Verifier Git**

```bash
git --version 2>/dev/null || echo "MISSING"
```

Si `git version 2.x.x` → OK, passer a Phase 1.
Si `MISSING` → installer (etape 0.3).

**Etape 0.3 — Installer Git (si manquant)**

Charge [references/os-commands-matrix.md](references/os-commands-matrix.md) section "Git".

**Mac** :
- Verifier d'abord si Homebrew est installe : `brew --version`
- Si pas Homebrew, l'installer (demander confirmation a l'utilisateur d'abord) :
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
  → ~5 min, install d'Xcode Command Line Tools en plus
- Puis : `brew install git`
- Verifier : `git --version`

**Windows** :
- Ouvrir PowerShell en admin (necessaire pour winget global install)
- Lancer : `winget install --id Git.Git -e`
- Re-ouvrir PowerShell pour que le PATH soit a jour
- Verifier : `git --version`

> **Pourquoi Git en premier ?** Sans Git, impossible de cloner le repo (Phase 4). Tout le reste depend de ca.

**Etape 0.4 — Configurer Git (premiere utilisation)**

Si premiere install, demander a l'etudiant son nom et email GitHub :

```bash
git config --global user.name "<nom>"
git config --global user.email "<email>"
```

Verifier :
```bash
git config --global user.name
git config --global user.email
```

### Phase 1 — Verifier les autres pre-requis

Charge [references/os-commands-matrix.md](references/os-commands-matrix.md) section "verifier".

Git est deja gere en Phase 0. Verifier les 4 autres outils :

```bash
echo "Node:" && node --version 2>/dev/null || echo "MISSING"
echo "npm:" && npm --version 2>/dev/null || echo "MISSING"
echo "Netlify:" && netlify --version 2>/dev/null || echo "MISSING"
echo "Supabase:" && supabase --version 2>/dev/null || echo "MISSING"
```

Analyser le resultat. Pour chaque MISSING, ajouter a la todolist d'install.

Si Node version < 22 : marquer "Node trop vieux, upgrade".

Afficher un dashboard clair :

```
PRE-REQUIS (apres install Git)
  Git              : 2.x       OK
  Node             : v24.x.x   OK
  npm              : 10.x      OK
  Netlify CLI      : MISSING   -> a installer (Phase 2)
  Supabase CLI     : MISSING   -> a installer (Phase 2)
  Playwright Chromium : ABSENT  -> a pre-telecharger (Phase 2.5)
```

Note : Playwright n'a pas besoin d'install globale. Le MCP est lance via `npx` (deja dans le `.mcp.json`). Mais le browser Chromium doit etre pre-telecharge pour eviter un freeze au premier usage.

### Phase 2 — Installer ce qui manque (hors Git, deja fait)

Pour CHAQUE outil manquant, demander confirmation puis installer.

> **Important** : ne JAMAIS lancer un install sans avoir confirme avec l'etudiant. Risque de surprise (`sudo`, modification PATH, etc.).

Charge [references/os-commands-matrix.md](references/os-commands-matrix.md) section "installer".

Si Node manquant ou trop vieux :
- Mac : proposer `brew install node` OU `nvm install 24`
- Windows : proposer `winget install OpenJS.NodeJS.LTS` OU `nvm install 24.16.0`
- Demander a l'etudiant quelle methode il prefere (AskUserQuestion)

Si Netlify CLI manquant :
- Tous OS : `npm install -g netlify-cli`

Si Supabase CLI manquant :
- Mac : `brew install supabase/tap/supabase`
- Windows : `scoop bucket add supabase https://github.com/supabase/scoop-bucket.git && scoop install supabase`
- Si scoop manque sur Windows : proposer d'installer scoop d'abord (`iwr -useb get.scoop.sh | iex`)

Apres chaque install, **re-verifier** avec `<tool> --version`. Si echec, diagnostiquer (cf. [references/error-patterns.md](references/error-patterns.md)).

**Etape 2.5 — Pre-telecharger Playwright browser (obligatoire pour MCP)**

Le projet utilise le MCP Playwright (defini dans `.mcp.json`). Au premier usage, `npx @playwright/mcp@latest` telecharge automatiquement les browser binaries (~150 MB), ce qui peut prendre 30-60s et bloquer l'etudiant. On les pre-telecharge maintenant :

```bash
# Cache global npm pour que le download soit reutilise entre projets
npx --yes @playwright/mcp@latest --help > /dev/null 2>&1 || true
npx --yes playwright install chromium
```

Pourquoi `chromium` seulement (pas firefox/webkit) : le MCP Playwright utilise chromium par defaut. Inutile de telecharger les 3 (~450 MB). Si l'etudiant veut tester sur Firefox/Safari plus tard, il peut faire `npx playwright install firefox webkit` a ce moment-la.

Verification :
```bash
# Mac/Linux
ls ~/Library/Caches/ms-playwright/chromium-*/chrome-mac/Chromium.app 2>/dev/null && echo "Chromium OK" || echo "Chromium MISSING"

# Windows
dir "$env:USERPROFILE\AppData\Local\ms-playwright\chromium-*" 2>$null && Write-Host "Chromium OK"
```

Si echec :
- Verifier connection internet
- Verifier que Node 18+ (sinon download silencieux echoue)
- Sur Mac : si `xattr` warning sur Chromium, ignorer (Gatekeeper) — le MCP marche quand meme en headless
- Re-tenter `npx playwright install chromium --force`

> **Pourquoi obligatoire** : sans browser binaries pre-installes, le premier appel a `browser_navigate` (Phase 7.4) prendra 30-60s et l'etudiant croira que le skill est bloque. Mieux vaut un download visible maintenant qu'un freeze plus tard.

### Phase 3 — Authentifier les CLIs

Demander a l'etudiant s'il est deja login :

```bash
netlify status 2>&1 | head -3
```

Si "Not logged in" :

> "Tu vas etre redirige vers ton browser pour te connecter a Netlify. Continue ?"

Lancer `netlify login`. Attendre que l'etudiant valide dans son browser.

Idem pour Supabase :

```bash
supabase projects list 2>&1 | head -3
```

Si "Access token not provided" : lancer `supabase login`.

### Phase 4 — Installer le projet DANS le dossier courant (cwd)

> **REGLE CRITIQUE** : tout doit etre installe dans le dossier ou tourne Claude Code (`pwd`), **JAMAIS** dans `~/projets/` ou un autre emplacement. L'etudiant a lance le skill depuis SON dossier (ex : `/Users/thomas/leartest/`) et c'est LA que tout doit aller.

**URL du repo source** : `https://github.com/mrsoyer/nopillovibecoding`

**Structure cible apres install** (le `cwd` devient le workspace) :
```
<cwd>/                                <- ou Claude Code tourne (pwd)
├── .claude/
│   ├── rules/                        <- ajoute depuis le repo
│   └── skills/
│       ├── student-setup/            <- deja la (zip telecharge), version repo prend le pas
│       ├── apply-auto-mode/          <- ajoute
│       ├── ...                       <- ajoute
├── .mcp.json                         <- ajoute (avec project_ref a remplacer)
├── .gitignore, .claudeignore         <- ajoutes
├── CLAUDE.md, README.md              <- ajoutes
├── docs/                             <- ajoute
├── nopillo-landing-exemple/          <- LE PROJET landing
│   ├── front/                        <- .env + package.json
│   ├── supabase/                     <- migrations + Edge Functions
│   └── netlify.toml
├── slide/                            <- deck formation
└── student-setup-skill.zip           <- met a jour si present
```

**Etape 4.1 — Verifier le cwd**

```bash
CWD=$(pwd)
echo "Installation cible : $CWD"
ls -la "$CWD"
```

Confirmer a l'etudiant :
> "Je vais installer le projet Nopillo dans `$CWD`. C'est OK ?"

Si l'etudiant veut changer de dossier, lui demander de quitter Claude Code, `cd` ailleurs, et relancer le skill.

**Etape 4.2 — Detecter conflits potentiels**

```bash
# Verifier .git existant (autre repo)
test -d "$CWD/.git" && echo "WARN_GIT_EXIST" || echo "OK_no_git"

# Verifier si le repo nopillovibecoding est deja installe ici
test -d "$CWD/nopillo-landing-exemple" && echo "WARN_ALREADY_INSTALLED" || echo "OK_not_installed"

# Verifier CLAUDE.md / README.md existants
test -f "$CWD/CLAUDE.md" && echo "WARN_CLAUDEMD_EXIST" || echo "OK"
```

Si `WARN_GIT_EXIST` : demander a l'etudiant
> "Le dossier `$CWD` est deja un repo git. Si je clone par-dessus, l'historique git sera ecrase. Continuer ?"

Si `WARN_ALREADY_INSTALLED` : passer a la mise a jour (etape 4.4) au lieu de l'install initiale.

**Etape 4.3 — Clone dans un tmp puis copie dans cwd**

```bash
CWD=$(pwd)
TMP=$(mktemp -d)
echo "Clone temporaire dans : $TMP"

git clone --depth 1 https://github.com/mrsoyer/nopillovibecoding.git "$TMP/nopillo" 2>&1
```

Si l'auth GitHub est demandee :
- **Option facile** : `gh CLI`
  - Mac : `brew install gh && gh auth login`
  - Windows : `winget install GitHub.cli && gh auth login`
- **Sinon** : Git Credential Manager gere l'auth via browser au premier `git clone`

Puis copier le contenu (le `/.` est important, ca copie aussi les dotfiles) :

```bash
cp -R "$TMP/nopillo/." "$CWD/"
echo "Copie OK"

# Cleanup
rm -rf "$TMP"
echo "Tmp nettoye"
```

> **Pourquoi pas `git clone $CWD` directement ?** Git refuse de cloner dans un dossier non-vide. Le tmp + cp -R contourne ca proprement et permet aussi de fusionner avec des fichiers preexistants (comme le `.claude/skills/student-setup/` que l'etudiant a telecharge).

**Etape 4.4 — Cas mise a jour (repo deja installe)**

Si l'etudiant relance le skill et que le repo est deja la :

```bash
CWD=$(pwd)
cd "$CWD"
git fetch origin main && git pull origin main
```

Si conflit local : demander a l'etudiant ce qu'il prefere (stash, reset, ou skip).

**Etape 4.5 — Verifier le clone**

```bash
ls -la "$CWD" | head -20
```

Doit afficher au minimum :
- `.claude/`
- `.git/`
- `.mcp.json`
- `CLAUDE.md`
- `nopillo-landing-exemple/`
- `docs/`
- `slide/`

Si l'un manque : retour etape 4.3, verifier le `cp -R`.

**Important** : a partir de maintenant, ton **cwd reste le meme** ($CWD initial). Toutes les commandes suivantes sont relatives a $CWD. Les commandes Supabase et npm seront dans le sous-dossier `nopillo-landing-exemple/`.

### Phase 5 — Recuperer les credentials Supabase

Demander a l'etudiant via AskUserQuestion (UNE question a la fois) :

| # | Question | Format attendu |
|---|----------|---------------|
| Q1 | A-tu deja cree un projet Supabase ? | oui / non (si non, l'envoyer sur supabase.com et attendre) |
| Q2 | Quel est le Project Reference ID Supabase ? | 20 chars alphanumeriques (ex: `abcdefghij1234567890`) |
| Q3 | Quelle est la Project URL ? | `https://<ref>.supabase.co` |
| Q4 | Quelle est l'anon/public key ? | `sb_publishable_...` ou `eyJ...` |
| Q5 | (Optionnel) HubSpot API key configure ? | oui / non |

Valider les inputs avec regex :
- Project ref : `^[a-z0-9]{20}$`
- URL : `^https://[a-z0-9]+\.supabase\.co$`
- Anon key : commence par `sb_publishable_` ou `eyJ`

Si invalide : re-demander avec exemple.

### Phase 6 — Configurer .env, .mcp.json, deployer EFs (obligatoire AVANT Phase 7)

> **critique** : ces 5 etapes doivent toutes etre completes AVANT de lancer `npm run dev` (Phase 7). Si tu skip, le formulaire ne marchera pas et l'etudiant aura une page cassee.

Depuis la racine du cwd (`$CWD` initial, ex: `/Users/thomas/leartest/`).

**Etape 6.1 — Creer front/.env (obligatoire)**

```bash
cd nopillo-landing-exemple/front
cp .env.example .env          # Mac
# OU Windows PowerShell :
Copy-Item .env.example .env
```

Editer le `.env` avec les valeurs collectees en Phase 5 (utiliser l'outil **Edit** de Claude, pas sed inline) :

```
PUBLIC_SUPABASE_URL=https://<TON-PROJECT-REF>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<TON-ANON-KEY>
PUBLIC_GTM_ID=GTM-XXXXXX
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX/XXXXXXXX
```

**Validation 6.1** : verifier que le fichier existe et contient les bonnes valeurs :

```bash
cat .env | grep PUBLIC_SUPABASE_URL    # Mac
Get-Content .env | Select-String PUBLIC_SUPABASE_URL    # Windows
```

Si vide ou XXX : stop, redemander a l'etudiant.

**Etape 6.2 — Configurer .mcp.json (racine workspace)**

```bash
cd "$CWD"    # racine workspace (le cwd initial, pas un sous-dossier)
```

Remplacer le `project_ref` du prof par celui de l'etudiant :

```bash
claude mcp remove --scope project supabase 2>&1 | tail -1
claude mcp add --scope project --transport http supabase \
  "https://mcp.supabase.com/mcp?project_ref=<TON-REF>"
```

**Validation 6.2** :
```bash
cat .mcp.json | grep "$TON_REF"        # doit afficher l'URL avec le ref
```

**Etape 6.3 — Authentifier les MCPs dans Claude Code (obligatoire)**

Indique a l'etudiant :

> "Pour activer les MCPs, tape la commande suivante dans le prompt Claude Code (pas dans le terminal shell) :
>   `/mcp`
> 
> Tu vas voir 4 MCPs : **supabase**, **hubspot**, **webflow**, **playwright**.
> 
> - **supabase**, **hubspot**, **webflow** : marques 'Needs authentication' → OAuth requis
>   Pour chacun :
>   1. Selectionne-le
>   2. Browser s'ouvre → autorise
>   3. Reviens dans Claude Code
> 
> - **playwright** : local stdio (lance via npx), **pas d'OAuth necessaire**. Doit afficher 'Connected' directement. Si 'Failed', voir Phase 2.5 (pre-telechargement browser)."

Attendre que l'etudiant confirme avoir fait les 3 OAuth.

**Validation 6.3** :
```bash
claude mcp list 2>&1 | grep -E "supabase|hubspot|webflow|playwright"
```

Resultat attendu — les 4 doivent montrer `✓ Connected`. Si l'un reste "Needs authentication" → refaire l'OAuth. Si playwright "Failed" → retour Phase 2.5 + check Node 18+.

> **Pourquoi obligatoire avant `npm run dev` ?** Les MCPs permettent a Claude Code de :
> - **supabase** : diagnostiquer en direct (lire les tables, verifier les logs Edge Function)
> - **hubspot** / **webflow** : verifier que les forms HubSpot recoivent bien les leads, manipuler les pages Webflow
> - **playwright** : prendre des screenshots de la landing, tester le formulaire end-to-end automatiquement, debug visuel
>
> Sans ces MCPs, l'etudiant sera bloque au moindre probleme.

**Etape 6.4 — Link Supabase + push migrations + deploy EFs**

```bash
cd nopillo-landing-exemple
supabase link --project-ref <TON-REF>
# → demande le mot de passe DB (attendre input user)

supabase db push
# → applique migrations dans le projet de l'etudiant
# → cree la table public.leads

supabase functions deploy contact-form --no-verify-jwt --project-ref <TON-REF>
supabase functions deploy hubspot-form-submit --no-verify-jwt --project-ref <TON-REF>
```

Si erreur Docker (CLI < 2.45) : `brew upgrade supabase` / `scoop update supabase` et retry.

**Validation 6.4** :
```bash
supabase functions list --project-ref <TON-REF>
# Doit lister : contact-form, hubspot-form-submit
```

**Etape 6.5 — Checkpoint Gate avant Phase 7**

Avant de passer a Phase 7 (npm run dev), valider TOUS ces points :

```
CHECKPOINT (obligatoire)
  [ ] front/.env existe et contient PUBLIC_SUPABASE_URL non-XXX
  [ ] front/.env contient PUBLIC_SUPABASE_ANON_KEY non-XXX
  [ ] .mcp.json contient le bon project_ref (pas celui du prof)
  [ ] MCP supabase : ✓ Connected (via claude mcp list)
  [ ] MCP hubspot : ✓ Connected
  [ ] MCP webflow : ✓ Connected
  [ ] MCP playwright : ✓ Connected (local stdio, pas d'OAuth)
  [ ] Playwright Chromium binary installe (~/Library/Caches/ms-playwright/)
  [ ] Supabase project link OK (supabase status sans erreur)
  [ ] Edge Function contact-form deployee
  [ ] Edge Function hubspot-form-submit deployee
  [ ] Table public.leads existe dans le projet Supabase
```

Verification rapide en 1 commande :

```bash
echo "=== Checkpoint ===" && \
test -f nopillo-landing-exemple/front/.env && echo "  .env: OK" || echo "  .env: MISSING" && \
grep -q "PUBLIC_SUPABASE_URL=https" nopillo-landing-exemple/front/.env && echo "  URL: OK" || echo "  URL: MISSING" && \
MCP_OUT=$(claude mcp list 2>&1) && \
echo "$MCP_OUT" | grep -q "supabase.*Connected" && echo "  MCP supabase: OK" || echo "  MCP supabase: NOT AUTH" && \
echo "$MCP_OUT" | grep -q "hubspot.*Connected" && echo "  MCP hubspot: OK" || echo "  MCP hubspot: NOT AUTH" && \
echo "$MCP_OUT" | grep -q "webflow.*Connected" && echo "  MCP webflow: OK" || echo "  MCP webflow: NOT AUTH" && \
echo "$MCP_OUT" | grep -q "playwright.*Connected" && echo "  MCP playwright: OK" || echo "  MCP playwright: FAILED (check Phase 2.5)"
```

**Si UN seul check echoue : retour a l'etape correspondante. NE PAS lancer Phase 7.**

### Phase 7 — npm install + npm run dev + verification

> **Prerequis** : Phase 6 entierement complete (Checkpoint Gate passe). Sinon stop.

**Etape 7.1 — Installer dependances**

```bash
cd "$CWD/nopillo-landing-exemple/front"   # depuis cwd racine workspace
npm install
```

Patienter (1-3 min). Si erreur :
- `EACCES` Mac : proposer passer a nvm (cf. error-patterns)
- `node-gyp` Windows : installer Visual Studio Build Tools

**Etape 7.2 — Lancer dev server**

```bash
npm run dev
```

Cette commande NE TERMINE PAS (long-running). Soit :
- Lancer en background : ajouter `&` (Mac) ou utiliser `Start-Job` (Windows)
- OU demander a l'etudiant de lancer dans un autre terminal pendant que tu verifies

**Etape 7.3 — Verification HTTP**

Apres 5s, tester :

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:4321/
```

Attendu : `HTTP 200`.

Si erreur :
- `Connection refused` : le serveur n'a pas demarre, voir logs
- `EADDRINUSE` : port 4321 deja pris, proposer `npm run dev -- --port 4322`

**Etape 7.4 — Verification visuelle via Playwright MCP (automatique)**

Maintenant que le MCP Playwright est connecte (Phase 6.3) et le serveur dev tourne (Phase 7.2), utiliser le MCP pour valider visuellement la landing.

Sequence d'appels MCP :

1. **Naviguer vers la landing** :
   ```
   mcp__playwright__browser_navigate(url="http://localhost:4321")
   ```

2. **Capturer l'accessibility snapshot** (analyse structure sans screenshot lourd) :
   ```
   mcp__playwright__browser_snapshot()
   ```
   Verifier dans le snapshot la presence de :
   - Headband "Nopillo" (texte d'accroche en haut)
   - Hero principal avec CTA
   - Formulaire de contact (champs email, message)
   - Footer
   
   Si l'un manque : la landing est cassee, voir Phase 7.3 (logs npm run dev).

3. **Screenshot pour l'etudiant** (preuve visuelle) :
   ```
   mcp__playwright__browser_take_screenshot(filename="landing-verification.png")
   ```
   Affiche le screenshot a l'etudiant : "Voila ce que ta landing donne. C'est bien ce que tu attendais ?"

4. **Fermer le browser** apres verification :
   ```
   mcp__playwright__browser_close()
   ```

Si Playwright MCP echoue (timeout, browser crash) :
- Fallback : demander a l'etudiant > "Ouvre http://localhost:4321 dans ton browser. Tu vois la landing Nopillo (headband orange + hero indigo) ?"
- Logger l'erreur Playwright pour debug ulterieur

**Etape 7.5 — Test du formulaire end-to-end via Playwright MCP**

Au lieu de demander a l'etudiant de remplir manuellement, automatiser via le MCP :

1. **Re-naviguer** vers la landing :
   ```
   mcp__playwright__browser_navigate(url="http://localhost:4321")
   ```

2. **Snapshot** pour obtenir les refs des champs du form :
   ```
   mcp__playwright__browser_snapshot()
   ```
   Reperer les refs des inputs (email, message) et du bouton submit.

3. **Remplir le formulaire** avec un email de test :
   - Email : `test-setup-{timestamp}@example.com` (unique pour ne pas pollouer)
   - Message : "Test setup automatique"
   
   Utiliser `mcp__playwright__browser_fill_form` ou `mcp__playwright__browser_type` selon les refs trouvees.

4. **Cliquer Submit** :
   ```
   mcp__playwright__browser_click(ref=<bouton submit ref>)
   ```

5. **Attendre la confirmation** :
   ```
   mcp__playwright__browser_wait_for(text="Merci")
   ```
   Timeout 5s. Si pas de "Merci", recuperer le snapshot pour voir l'erreur.

6. **Verifier dans Supabase** que le lead est arrive :
   ```bash
   cd nopillo-landing-exemple
   supabase db query "SELECT email, created_at FROM public.leads WHERE email LIKE 'test-setup-%' ORDER BY created_at DESC LIMIT 1"
   ```

7. **Fermer le browser** :
   ```
   mcp__playwright__browser_close()
   ```

Si le lead apparait dans Supabase : **End-to-end OK** (form → Edge Function → table leads).

Si echec :
- Verifier les logs Edge Function : `supabase functions logs contact-form --project-ref <REF>`
- Voir Phase 6.3 que les MCPs sont bien connectes
- Voir Phase 6.4 que les Edge Functions sont deployees

> **Pourquoi automatiser le test form ?** L'etudiant peut oublier de tester ou se tromper d'email. Avec Playwright on a une garantie deterministique que le flow complet marche, avec un trace dans Supabase pour preuve.

## Rapport final

Quand tout fonctionne :

```
SETUP COMPLETE

✓ OS detecte             : [Mac / Windows]
✓ Pre-requis             : Node X / Git X / npm X
✓ CLIs installes         : Netlify, Supabase
✓ Playwright Chromium    : installe (~150 MB cache npm)
✓ Auth CLIs              : Connecte
✓ Workspace installe     : $CWD (le dossier ou tu as lance Claude Code)
✓ Credentials            : Supabase configure (project ref: XXX)
✓ MCPs Claude Code       : supabase + hubspot + webflow + playwright (4/4 Connected)
✓ Migrations             : table leads cree
✓ Edge Functions         : contact-form + hubspot-form-submit deployees
✓ Landing live           : http://localhost:4321
✓ Verification visuelle  : screenshot Playwright OK
✓ Form end-to-end        : Lead test insere dans Supabase (via Playwright)

PROCHAINES ETAPES
1. Edite front/src/components/sections/Hero.astro pour personnaliser
2. Demande a Claude Code des modifications, il a 4 MCPs pour t'aider :
   - supabase : DB, Edge Functions, logs
   - hubspot  : CRM, forms, contacts
   - webflow  : pages, components, DS
   - playwright : tests visuels, debug E2E
3. Consulte docs/student-onboarding/ pour aller plus loin

Temps total : XX min. Bravo !
```

## Regles critiques (iteration & robustesse)

- **Itere jusqu'au succes** : si une commande echoue, NE PAS abandonner. Diagnostiquer (cf. error-patterns), proposer un fix, retenter.
- **Re-verifier apres chaque install** : `<tool> --version` apres chaque `brew install` / `npm install -g`.
- **Confirmer avant action destructive** : avant `sudo`, modification PATH, etc., demander OK via AskUserQuestion.
- **Ne JAMAIS commit `.env`** : verifier que `.env` est dans `.gitignore` apres setup.
- **Logs verbeux pour debug** : si erreur, afficher les 10 dernieres lignes de log avec contexte.
- **Patience** : `npm install` peut prendre 3 min, `supabase link` peut etre lent. Attendre.

## Anti-patterns a eviter

- ❌ Lancer un install sans confirmation utilisateur
- ❌ Skipper une verification ("ca devrait marcher")
- ❌ Ignorer une erreur sans diagnostic
- ❌ Demander toutes les credentials en 1 question batch (utiliser AskUserQuestion sequentielle)
- ❌ Hardcoder le project_ref du prof (chaque etudiant le sien)
- ❌ Continuer si Phase X echoue : stop et fix

## Exemples (resumes)

- **Mac fresh** : install Git+Node+CLIs → clone → credentials → config + MCPs OAuth → deploy EFs → npm run dev. ~20 min.
- **Windows partiel** : Node deja la, install Netlify+Supabase via scoop, Docker upgrade auto pour Supabase 2.45+. ~12 min.
- **Port 4321 occupe** : EADDRINUSE → propose `kill process` ou `--port 4322` via AskUserQuestion → retry.

Voir [evals/evals.json](evals/evals.json) pour 5 scenarios complets de test.
