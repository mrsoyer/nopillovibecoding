# OS Commands Matrix — Mac vs Windows

> Equivalences Mac/Windows pour chaque operation du skill student-setup.

## Detecter l'OS

```bash
# Cross-platform (le check qui marche partout) :
uname -s 2>/dev/null || echo "Windows"
```

Resultats possibles :
- `Darwin` → macOS
- `Linux` → Linux
- Error → Windows (`uname` n'existe pas en PowerShell par defaut)

Alternative plus precise :

```bash
echo "$OSTYPE"
# darwin*    → Mac
# linux-gnu  → Linux
# msys/cygwin → Windows Git Bash
```

## Verifier qu'un outil est installe

| Operation | Mac (zsh/bash) | Windows (PowerShell) |
|-----------|----------------|----------------------|
| Verifier Node | `node --version` | `node --version` |
| Verifier npm | `npm --version` | `npm --version` |
| Verifier Git | `git --version` | `git --version` |
| Verifier Netlify | `netlify --version` | `netlify --version` |
| Verifier Supabase | `supabase --version` | `supabase --version` |
| Trouver le chemin | `which node` | `where.exe node` |
| Liste packages globaux npm | `npm list -g --depth=0` | `npm list -g --depth=0` |

## Installer Node.js

| Methode | Mac | Windows |
|---------|-----|---------|
| **Direct (installer)** | https://nodejs.org/en/download → .pkg | https://nodejs.org/en/download → .msi (cocher "Add to PATH") |
| **Package manager** | `brew install node` | `winget install OpenJS.NodeJS.LTS` OU `scoop install nodejs-lts` |
| **nvm (recommande)** | `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh \| bash` puis `nvm install 24` | Installer nvm-windows depuis https://github.com/coreybutler/nvm-windows/releases (`nvm-setup.exe`) puis `nvm install 24.16.0` |

## Installer Git

### Mac (Homebrew)

**Prerequis** : Homebrew doit etre installe.

Verifier si Homebrew est installe :
```bash
brew --version
```

Si manquant, installer (demande mot de passe Mac + Xcode CLI tools si pas installes) :

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Puis installer Git :

```bash
brew install git
git --version    # verifier : git version 2.x.x
```

### Windows (winget — recommande)

Ouvrir PowerShell **en mode administrateur** (clic droit sur PowerShell → Executer en tant qu'admin).

```powershell
winget install --id Git.Git -e
```

`-e` = exact match (eviter installer un autre Git).

Re-ouvrir PowerShell (sans admin OK) pour que le PATH soit a jour :

```powershell
git --version    # doit afficher git version 2.54.x ou plus
```

### Alternative Windows (sans winget)

Si winget echoue ou n'est pas dispo (Windows < 10.0.17763) :

1. Telecharger le `.exe` sur https://git-scm.com/download/win
2. Double-cliquer → suivre wizard (toutes defaults OK, mais cocher "Use Git from PowerShell")
3. Re-ouvrir PowerShell → `git --version`

### Configurer Git (premiere fois)

```bash
git config --global user.name "Ton Nom"
git config --global user.email "ton@email.com"
```

Verifier :

```bash
git config --global user.name
git config --global user.email
```

> Utiliser le meme email que ton compte GitHub pour que tes commits soient attribues correctement.

## Installer Netlify CLI

Identique partout :

```bash
npm install -g netlify-cli
```

Mac alternative : `brew install netlify-cli`.

## Installer Supabase CLI

| OS | Commande |
|----|----------|
| Mac | `brew install supabase/tap/supabase` |
| Windows | `scoop bucket add supabase https://github.com/supabase/scoop-bucket.git && scoop install supabase` |

**Important** : `npm install -g supabase` est **PAS supporte**. Toujours brew/scoop.

## Installer scoop (Windows uniquement)

Si scoop manque pour installer Supabase CLI :

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
iwr -useb get.scoop.sh | iex
```

## Mettre a jour les CLIs

| Outil | Mac | Windows |
|-------|-----|---------|
| Node (via nvm) | `nvm install 24 --reinstall-packages-from=current` | `nvm install 24.16.0 && nvm use 24.16.0` |
| Netlify | `npm update -g netlify-cli` | `npm update -g netlify-cli` |
| Supabase | `brew upgrade supabase` | `scoop update supabase` |
| Git | `brew upgrade git` | `winget upgrade Git.Git` |

## Operations fichiers

| Operation | Mac (Terminal) | Windows (PowerShell) |
|-----------|----------------|----------------------|
| Lister fichiers | `ls -la` | `ls` OU `Get-ChildItem -Force` |
| Copier | `cp source dest` | `Copy-Item source dest` OU `copy source dest` |
| Deplacer/renommer | `mv source dest` | `Move-Item source dest` OU `move source dest` |
| Supprimer | `rm fichier` | `Remove-Item fichier` OU `del fichier` |
| Lire fichier | `cat fichier` | `Get-Content fichier` OU `type fichier` |
| Creer dossier | `mkdir -p dir/sub` | `mkdir dir\sub -Force` |

## Variables d'environnement

| Operation | Mac (zsh) | Windows (PowerShell) |
|-----------|-----------|----------------------|
| Lire variable | `echo $HOME` | `$env:USERPROFILE` |
| Definir temporaire | `export VAR=value` | `$env:VAR = "value"` |
| Definir permanent | Ajouter dans `~/.zshrc` | `[System.Environment]::SetEnvironmentVariable("VAR","value","User")` |

## Tuer un processus sur un port

| OS | Commande |
|----|----------|
| Mac/Linux | `lsof -ti:4321 \| xargs kill -9` |
| Windows | `Get-NetTCPConnection -LocalPort 4321 \| Stop-Process -Id { $_.OwningProcess } -Force` |

## Ouvrir un fichier/dossier dans VS Code

Identique :

```bash
code .            # ouvre le dossier courant
code fichier.txt  # ouvre un fichier specifique
```

Si la commande `code` n'est pas reconnue :
- Mac : VS Code → Cmd+Shift+P → "Shell Command: Install 'code' command in PATH"
- Windows : reinstaller VS Code en cochant "Add to PATH" pendant l'install

## Tester une URL HTTP

| Mac | Windows |
|-----|---------|
| `curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:4321/` | `(Invoke-WebRequest -Uri http://localhost:4321/ -UseBasicParsing).StatusCode` |

## Long-running process en background

Pour `npm run dev` qui ne termine pas :

| Mac | Windows |
|-----|---------|
| `npm run dev &` (ajouter `&`) puis `jobs` | `Start-Job -ScriptBlock { npm run dev }` |

Alternative cross-platform : demander a l'utilisateur d'ouvrir un autre terminal et lancer dans celui-ci.

## Path conventions

| Mac | Windows |
|-----|---------|
| Slash `/` | Backslash `\` OU slash `/` (PowerShell accepte les deux) |
| Home : `~` ou `$HOME` | Home : `$HOME` ou `$env:USERPROFILE` |
| Separateur PATH : `:` | Separateur PATH : `;` |

## Auth GitHub (HTTPS)

| Mac | Windows |
|-----|---------|
| Keychain auto (si Xcode CLI installe) | Git Credential Manager auto (livre avec Git for Windows) |
| Fallback : `gh auth login` | Fallback : `gh auth login` |
