# 01 — Pre-requis systeme (Node.js, Git, terminal)

## Table des matieres

- [Verifier ce qui est deja installe](#verifier-ce-qui-est-deja-installe)
- [Installer Node.js (Mac)](#installer-nodejs-mac)
- [Installer Node.js (Windows)](#installer-nodejs-windows)
- [Installer Git](#installer-git)
- [Configurer le terminal](#configurer-le-terminal)

---

## Verifier ce qui est deja installe

**Mac** : ouvrir l'app `Terminal` (Cmd+Espace, taper "terminal").
**Windows** : ouvrir `PowerShell` (Touche Win, taper "powershell").

Lance ces 3 commandes :

```bash
node --version
git --version
npm --version
```

| Resultat | Action |
|----------|--------|
| `v22.x.x` ou plus (Node) + `git version 2.x` + `npm 10.x` | Tout OK, passer a l'etape 02 |
| Command not found / Aucun resultat | Installer (suite de cette page) |

---

## Installer Node.js (Mac)

**Option 1 — Recommandee : via nvm (Node Version Manager)**

Avantage : tu peux changer de version Node sans tout casser.

```bash
# 1. Installer nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 2. Recharger ton shell
source ~/.zshrc    # ou ~/.bash_profile selon ton shell

# 3. Installer Node 24 LTS (recommande 2026)
nvm install 24
nvm use 24

# 4. Verifier
node --version    # doit afficher v24.x.x
```

**Option 2 — Plus simple : installer directe**

1. Aller sur https://nodejs.org/en/download
2. Telecharger le `.pkg` LTS macOS
3. Double-cliquer → suivre le wizard
4. Re-ouvrir le terminal → `node --version` doit afficher v24.x

**Option 3 — Via Homebrew (si deja installe)**

```bash
brew install node
node --version
```

---

## Installer Node.js (Windows)

**Option 1 — Recommandee : via nvm-windows**

1. Telecharger `nvm-setup.exe` depuis https://github.com/coreybutler/nvm-windows/releases
2. Lancer l'installer → suivre le wizard (path par defaut OK)
3. Re-ouvrir PowerShell **en mode Administrateur** (clic droit → "Executer en tant qu'admin")
4. Installer Node :
   ```powershell
   nvm install 24.16.0
   nvm use 24.16.0
   node --version
   ```

**Option 2 — Installer direct (plus simple)**

1. Aller sur https://nodejs.org/en/download
2. Telecharger le `.msi` LTS Windows x64
3. Double-cliquer → suivre le wizard
   - **Cocher "Add to PATH"** (case importante !)
   - Cocher "Automatically install necessary tools" (compilateurs C++ optionnels)
4. Re-ouvrir PowerShell → `node --version` doit afficher v24.x

**Option 3 — Via Scoop**

```powershell
scoop install nodejs-lts
node --version
```

---

## Installer Git

**Mac** :
```bash
# Git est souvent pre-installe sur Mac. Verifier :
git --version

# Sinon installer via brew :
brew install git
```

**Windows** :
1. Telecharger https://git-scm.com/download/win
2. Lancer l'installer → defaults OK (cocher "Git Bash Here" et "Use Git from PowerShell")
3. Re-ouvrir PowerShell → `git --version`

**Configurer Git (1 fois pour toutes)** :

```bash
git config --global user.name "Ton Nom"
git config --global user.email "ton@email.com"
```

> Utiliser le meme email que ton compte GitHub pour que tes commits soient attribues correctement.

---

## Configurer le terminal

### Mac

Le `Terminal.app` standard fonctionne. **Optionnel** : installer iTerm2 (https://iterm2.com/) pour plus de confort.

Si tu utilises **zsh** (defaut Mac), `~/.zshrc` est ton fichier de config.

### Windows

**PowerShell** fonctionne mais a quelques quirks. **Recommande** : utiliser **Windows Terminal** (gratuit, dans le Microsoft Store).

Pour avoir une experience proche d'un terminal Mac/Linux, installer **Git Bash** (livre avec Git) ou **WSL2** (Windows Subsystem for Linux).

### Verifier que tout fonctionne

Tape dans ton terminal :

```bash
node --version    # >= 22.0.0
npm --version     # >= 10.0.0
git --version     # >= 2.30.0
```

Si toutes les commandes repondent → **Pre-requis OK, passer a [02-cloner-projet.md](02-cloner-projet.md).**

## Anti-patterns courants

- ❌ Installer Node.js via `apt` ou `yum` sur Linux → version souvent trop vieille
- ❌ Avoir 2 versions de Node installees en meme temps (installer + nvm) → conflits
- ❌ Oublier de cocher "Add to PATH" sur Windows → commandes introuvables
- ❌ Ouvrir un terminal AVANT d'installer Node → re-ouvrir apres install

## Sources

- [Node.js — Download](https://nodejs.org/en/download)
- [nvm-sh/nvm (Mac/Linux)](https://github.com/nvm-sh/nvm)
- [coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
- [Git for Windows](https://git-scm.com/download/win)
