# 02 — Cloner le projet depuis GitHub

## Pre-requis
- Git installe (voir [01-prerequis-systeme.md](01-prerequis-systeme.md))
- Compte GitHub (https://github.com/signup si tu n'en as pas)

## Etape 1 — Recuperer le lien du repo

Le prof a partage un lien GitHub du type :

```
https://github.com/<prof>/nopillo-landing-exemple
```

Copie ce lien.

## Etape 2 — Choisir ou cloner

Recommande : un dossier dedie a tes projets.

**Mac** :
```bash
mkdir -p ~/projets
cd ~/projets
```

**Windows (PowerShell)** :
```powershell
mkdir $HOME\projets -Force
cd $HOME\projets
```

## Etape 3 — Cloner

```bash
git clone https://github.com/<prof>/nopillo-landing-exemple.git
cd nopillo-landing-exemple
```

Si demande un mot de passe (premiere fois) :
- **Mac** : la cle SSH peut etre demandee. Cliquer "Authoriser" dans le popup keychain.
- **Windows** : Git Credential Manager s'ouvre dans un browser → login GitHub → autoriser.

**Si erreur d'authentification** :

Plus simple : utiliser GitHub CLI (`gh`) qui gere l'auth.

```bash
# Installer gh (mac)
brew install gh

# Installer gh (windows)
winget install GitHub.cli

# Login
gh auth login
# → choisir GitHub.com → HTTPS → "Yes" pour Git auth → Login with web browser

# Puis cloner via gh
gh repo clone <prof>/nopillo-landing-exemple
cd nopillo-landing-exemple
```

## Etape 4 — Inspecter la structure

```bash
ls -la
```

Tu devrais voir :

```
.claude/              # Skills + rules pour Claude Code
.gitignore
.mcp.json             # Config MCPs Supabase/HubSpot/Webflow
CLAUDE.md             # Contexte du projet pour Claude Code
README.md             # Documentation principale
docs/                 # Docs internes (CDC, DS, best practices)
front/                # Landing Astro 6 + Tailwind 4
netlify.toml          # Config Netlify (build + headers)
supabase/             # Migrations + Edge Functions
```

## Etape 5 — Ouvrir dans VS Code (recommande)

```bash
code .
```

Si la commande `code` n'est pas connue :
- **Mac** : ouvrir VS Code → Cmd+Shift+P → "Shell Command: Install 'code' command"
- **Windows** : VS Code installe l'integration PowerShell par defaut

VS Code va te proposer d'installer l'extension **Claude Code** si tu ne l'as pas → accepter.

## Verification

Le repo est clone si tu peux faire :

```bash
cat README.md | head -20      # Mac
type README.md                # Windows PowerShell
```

et que tu vois le contenu du README.

## Anti-patterns

- ❌ Cloner avec `git clone` HTTPS sans setup auth → demande mot de passe a chaque push
- ❌ Cloner dans le Bureau ou Telechargements → dossiers indexes/synced (lent)
- ❌ Modifier des fichiers AVANT le clone (mauvais ordre)

## Suivant

→ [03-installer-clis.md](03-installer-clis.md) pour installer Netlify CLI + Supabase CLI.

## Sources

- [GitHub Docs - Caching credentials](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git)
- [Git Credential Manager Mac](https://mac.install.guide/git/credential-manager)
- [How to Clone a GitHub Repository (beginner)](https://multicaretechnical.com/how-to-clone-a-github-repository-beginner-friendly-guide)
