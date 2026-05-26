---
name: student-setup
description: >
  Guide interactif l'etudiant (Mac/Windows) pour cloner le repo et lancer la landing en local.
  Detecte l'OS, installe ce qui manque, demande les credentials Supabase, execute avec retry,
  termine par npm run dev. Itere jusqu'a succes.
argument-hint: ""
allowed-tools: Read Write Edit Bash AskUserQuestion
model: sonnet
effort: high
---

# Student Setup — Lancer la landing en local de A a Z

Tu guides un etudiant debutant (Mac ou Windows) pas a pas, de zero jusqu'a `npm run dev` qui marche. Tu fais TOUT pour lui : detecter l'OS, verifier les outils, installer ce qui manque, demander ses credentials cloud, configurer ses fichiers, lancer le serveur, verifier que tout marche.

**Tu iteres jusqu'a ce que ca fonctionne.** Si une etape echoue, tu diagnostiques, proposes un fix, et retentes.

## References disponibles

| Fichier | Quand le lire |
|---------|---------------|
| [references/os-commands-matrix.md](references/os-commands-matrix.md) | Phase 1-3 : equivalences Mac vs Windows pour chaque operation |
| [references/error-patterns.md](references/error-patterns.md) | Phase 7 : 25+ erreurs frequentes + strategie de recovery |

## Documentation projet (source de verite)

| Fichier | Contenu |
|---------|---------|
| [docs/student-onboarding/_index.md](../../../docs/student-onboarding/_index.md) | Vue d'ensemble du parcours |
| [docs/student-onboarding/01-prerequis-systeme.md](../../../docs/student-onboarding/01-prerequis-systeme.md) | Detail Node.js + Git |
| [docs/student-onboarding/03-installer-clis.md](../../../docs/student-onboarding/03-installer-clis.md) | Detail Netlify CLI + Supabase CLI |
| [docs/student-onboarding/04-comptes-cloud.md](../../../docs/student-onboarding/04-comptes-cloud.md) | Detail Supabase + Netlify |
| [docs/student-onboarding/05-config-env-mcp.md](../../../docs/student-onboarding/05-config-env-mcp.md) | Detail .env + MCPs |
| [docs/student-onboarding/07-troubleshooting.md](../../../docs/student-onboarding/07-troubleshooting.md) | Detail erreurs |

> Tu PEUX referencer ces docs si l'etudiant veut comprendre plus, mais tu n'as PAS besoin de les lire pour executer les phases.

## Workflow (7 phases — toujours en ordre)

### Phase 0 — Accueil + detection OS + Git (PRIORITE ABSOLUE)

Saluer l'etudiant brievement :

```
Salut ! Je vais te guider pour lancer la landing Nopillo en local. ~25 min.

Premiere etape : je verifie ton systeme et j'installe Git si necessaire (indispensable pour cloner le repo).
```

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
  Git       : 2.x       OK
  Node      : v24.x.x   OK
  npm       : 10.x      OK
  Netlify   : MISSING   -> a installer
  Supabase  : MISSING   -> a installer
```

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

### Phase 4 — Cloner le repo du prof

**URL fixe du projet** : `https://github.com/mrsoyer/nopillovibecoding`

Verifier d'abord si on est deja dans le repo :

```bash
git remote -v 2>&1 | grep nopillovibecoding
ls front/package.json 2>/dev/null
```

**Si deja clone et a jour** : skip, passer a Phase 5.

**Si pas clone** :

```bash
# Mac
mkdir -p ~/projets && cd ~/projets

# Windows PowerShell
mkdir $HOME\projets -Force; cd $HOME\projets
```

Puis :

```bash
git clone https://github.com/mrsoyer/nopillovibecoding.git
cd nopillovibecoding
```

Si l'auth GitHub est demandee :
- **Option facile** : installer GitHub CLI et faire `gh auth login`
  - Mac : `brew install gh && gh auth login`
  - Windows : `winget install GitHub.cli && gh auth login`
  - Puis re-tenter : `gh repo clone mrsoyer/nopillovibecoding`
- **Sinon** : Git Credential Manager (Mac keychain ou Windows Credential Store) gere l'auth via browser

Verifier que le clone a reussi :

```bash
ls -la
# doit contenir : .claude/ .mcp.json CLAUDE.md README.md docs/ front/ netlify.toml supabase/
```

Si le repo est vide (cas d'erreur edge) :
- STOP et signaler a l'etudiant de contacter le prof
- Le repo `mrsoyer/nopillovibecoding` doit contenir le code source

> **Note** : Le student-setup ne demande PAS l'URL a l'etudiant (URL hardcodee). Le prof a partage l'URL en amont via Slack/Discord.

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

### Phase 6 — Configurer .env, .mcp.json, deployer EFs

**Etape 6.1 — front/.env**

```bash
cd front
cp .env.example .env  # Mac/Linux
copy .env.example .env  # Windows PowerShell (utiliser : (Test-Path .env) -or (Copy-Item .env.example .env))
```

Editer le `.env` avec les valeurs collectees en Phase 5 :

```bash
PUBLIC_SUPABASE_URL=<URL>
PUBLIC_SUPABASE_ANON_KEY=<ANON_KEY>
PUBLIC_GTM_ID=GTM-XXXXXX
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX/XXXXXXXX
```

Utiliser l'outil Edit (pas sed inline) pour eviter les erreurs de quoting.

**Etape 6.2 — .mcp.json**

Remplacer le `project_ref` du prof par celui de l'etudiant :

```bash
cd ..  # remonter racine
claude mcp remove --scope project supabase 2>&1 | tail -1
claude mcp add --scope project --transport http supabase \
  "https://mcp.supabase.com/mcp?project_ref=<TON-REF>"
```

**Etape 6.3 — Link Supabase + push migrations + deploy EFs**

```bash
supabase link --project-ref <TON-REF>
# → demande le mot de passe DB (attendre input user)

supabase db push
# → applique migrations dans le projet de l'etudiant

supabase functions deploy contact-form --no-verify-jwt --project-ref <TON-REF>
supabase functions deploy hubspot-form-submit --no-verify-jwt --project-ref <TON-REF>
```

Si erreur Docker (CLI < 2.45) : proposer `brew upgrade supabase` / `scoop update supabase` et retry.

### Phase 7 — npm install + npm run dev + verification

**Etape 7.1 — Installer dependances**

```bash
cd front
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

**Etape 7.4 — Verification visuelle (optionnel)**

Si MCP Playwright dispo, prendre un screenshot :

```bash
# Si l'utilisateur a installe Playwright MCP global
# Sinon : demander a l'etudiant d'ouvrir http://localhost:4321 dans son browser
```

OU demander a l'etudiant :

> "Ouvre http://localhost:4321 dans ton browser. Tu vois la landing Nopillo (headband orange + hero indigo) ?"

Si OUI : SUCCESS.
Si NON : diagnostic (cf. error-patterns).

**Etape 7.5 — Test du formulaire end-to-end**

Demander :

> "Scroll jusqu'au formulaire de contact, remplis avec ton email test, et clique Envoyer. Tu vois 'Merci !' ?"

Si OUI : verifier dans le Supabase de l'etudiant :

```bash
# Via supabase CLI
supabase db query "SELECT email, created_at FROM public.leads ORDER BY created_at DESC LIMIT 1"
```

Si le lead apparait : **End-to-end OK**.

## Rapport final

Quand tout fonctionne :

```
SETUP COMPLETE

✓ OS detecte         : [Mac / Windows]
✓ Pre-requis        : Node X / Git X / npm X
✓ CLIs installes    : Netlify, Supabase
✓ Auth CLIs         : Connecte
✓ Repo clone        : ~/projets/nopillo-landing-exemple
✓ Credentials       : Supabase configure (project ref: XXX)
✓ Migrations        : table leads cree
✓ Edge Functions    : contact-form + hubspot-form-submit deployees
✓ Landing live      : http://localhost:4321
✓ Form end-to-end   : Lead test insere dans Supabase

PROCHAINES ETAPES
1. Edite front/src/components/sections/Hero.astro pour personnaliser
2. Lance `claude code` dans ce dossier pour avoir l'aide de Claude
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
- ❌ Continuer si Phase X echoue : STOP et fix

## Exemples de scenarios

### Scenario 1 — Mac fresh install

```
User: /student-setup
Skill: Detecte Mac. Node manquant.
       Demande : "brew ou nvm ?" → brew.
       Installe Node, Git, Netlify CLI, Supabase CLI.
       Demande URL GitHub du prof. Clone.
       Demande credentials Supabase. Configure .env + .mcp.json.
       Link + migrate + deploy EFs.
       npm install + npm run dev.
       Verifie HTTP 200. SUCCESS en 18 min.
```

### Scenario 2 — Windows avec partiel

```
User: /student-setup
Skill: Detecte Windows. Node v22 OK, Git OK, Netlify et Supabase manquants.
       Installe netlify-cli via npm, Supabase CLI via scoop.
       Verifie qu'on est dans le repo (oui, deja clone).
       Demande credentials Supabase. Configure.
       Deploy EFs : erreur Docker → upgrade CLI → retry → OK.
       npm install + npm run dev. SUCCESS en 12 min.
```

### Scenario 3 — Erreur port 4321 occupe

```
User: /student-setup (apres tout setup OK)
Skill: npm run dev → EADDRINUSE
       Diagnostic : port 4321 occupe (autre projet ?)
       Propose : `lsof -ti:4321 | xargs kill -9` OU `npm run dev -- --port 4322`
       User : "kill"
       Skill execute, retry, OK sur 4321.
```
