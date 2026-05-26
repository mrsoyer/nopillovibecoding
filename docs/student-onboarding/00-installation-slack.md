# Formation Vibecoding — Installation avant le jour J

> **A faire AVANT la formation** (~20 min). Ce message est a coller dans Slack pour les participants.

---

## 6 etapes pour etre pret le jour J

Salut a tous,

Pour qu'on demarre fort le matin de la formation sans perdre 1h30 d'install, voici les 6 etapes a faire **avant** d'arriver. Ca prend ~20 min.

A la fin, vous lancerez un **skill Claude Code** qui s'occupera de tout le reste (clone du repo, config Supabase, lancement du serveur).

---

### Etape 1 — Telecharger Visual Studio Code

Si pas deja installe :

- **Mac / Windows / Linux** : https://code.visualstudio.com
- Telecharger → ouvrir le `.dmg` ou `.exe` → suivre le wizard
- Lancer VSCode une fois pour confirmer que ca s'ouvre

> Verification : VSCode s'ouvre.

---

### Etape 2 — Creer le dossier de projet

Un endroit ou tout sera regroupe.

**Mac (Finder)** :
- Aller dans `~/Documents` (ou ou tu veux)
- Faire un nouveau dossier : `vibecoding-formation`

**Windows (Explorateur)** :
- Aller dans `C:\Users\TonNom\Documents`
- Faire un nouveau dossier : `vibecoding-formation`

> Verification : le dossier `vibecoding-formation` existe.

---

### Etape 3 — Installer Claude Code (CLI)

C'est l'outil ligne de commande qu'on va utiliser toute la journee.

1. Ouvrir le **terminal** :
   - **Mac** : `Cmd + Espace` → taper "terminal" → Enter
   - **Windows** : touche Win → taper "powershell" → Enter

2. Suivre le guide officiel :
   **https://code.claude.com/docs/en/quickstart**

   Commande la plus rapide (necessite Node 18+) :
   ```
   npm install -g @anthropic-ai/claude-code
   ```

   Si tu n'as pas Node : installer depuis https://nodejs.org/en (version LTS) puis relancer la commande.

3. Tester que la commande fonctionne :
   ```
   claude --version
   ```

   Tu dois voir un numero de version (ex: `1.2.0`).

> Verification : `claude --version` affiche un numero. **Envoie le screenshot dans le Slack**.

---

### Etape 4 — Installer 2 plugins VSCode

Ouvrir VSCode, aller dans **Extensions** (Cmd+Shift+X sur Mac, Ctrl+Shift+X sur Windows).

Installer ces 2 plugins :

| Plugin | Pour quoi faire |
|---|---|
| **Claude Code** (par Anthropic) | Integration Claude Code dans VSCode (chat dans la sidebar) |
| **XLSX, CSV, TSV & Markdown Editor** (par GrapeCity ou similaire) | Visualiser proprement les fichiers `.md` et `.csv` |

**Methode rapide en ligne de commande** (si tu connais) :
```
code --install-extension Anthropic.claude-code
code --install-extension GrapeCity.gc-excelviewer
```

> Verification : les 2 plugins sont marques "Installed" dans l'onglet Extensions.

---

### Etape 5 — Telecharger le skill `student-setup`

C'est le skill Claude qui s'occupera de tout l'installation technique le jour J.

1. **Telecharger le `.zip` du skill** depuis ce thread Slack (lien plus haut).

2. **Decompresser** dans le dossier `vibecoding-formation/.claude/skills/` :

   - Ouvrir le terminal dans `vibecoding-formation` :
     - **Mac** : clic droit sur le dossier → "Services" → "Nouveau Terminal au dossier"
     - **Windows** : Shift+clic droit dans le dossier → "Ouvrir dans PowerShell"
   - Taper :
     ```
     mkdir -p .claude/skills
     ```
   - Puis copier le dossier `student-setup` decompresse dans `.claude/skills/`.

   **Structure finale attendue** :
   ```
   vibecoding-formation/
   └── .claude/
       └── skills/
           └── student-setup/
               ├── SKILL.md
               ├── references/
               └── ...
   ```

> Verification : le fichier `.claude/skills/student-setup/SKILL.md` existe.

---

### Etape 6 — Lancer le skill setup

Toujours dans le dossier `vibecoding-formation` :

1. Ouvrir VSCode dans ce dossier :
   ```
   code .
   ```
   (le `.` veut dire "le dossier courant")

2. Dans VSCode, ouvrir le terminal integre (Ctrl+`) et lancer Claude :
   ```
   claude
   ```

3. **Dans le chat Claude qui s'ouvre**, taper :
   ```
   lance le skill student-setup
   ```

   OU directement :
   ```
   /student-setup
   ```

Claude prend la main et te guide pour :
- Verifier ce qui est installe
- Installer ce qui manque (Git, Node, Netlify CLI, Supabase CLI)
- Cloner le repo de la formation
- Configurer Supabase (il te demandera des credentials)
- Lancer la landing en local

> Verification : a la fin, ta landing tourne sur **http://localhost:4321**.

---

## Probleme ? Bloque sur une etape ?

- **Replique dans ce thread Slack** avec :
  - L'etape qui coince (1, 2, 3, 4, 5 ou 6)
  - Le message d'erreur exact (screenshot ok)
  - Ton OS (Mac / Windows)

Je depanne le soir ou le matin de la formation.

---

## Et apres ?

Une fois le skill termine et la landing en local sur `http://localhost:4321` :

**Go vibe code.** On se voit le jour J.

A samedi.
Thomas
thomas@feaderz.co

---

## Variante TL;DR (pour les pros)

```bash
# 1. Install VSCode : https://code.visualstudio.com
# 2. Install Claude Code
npm install -g @anthropic-ai/claude-code
claude --version

# 3. VSCode plugins
code --install-extension Anthropic.claude-code
code --install-extension GrapeCity.gc-excelviewer

# 4. Setup dossier projet
mkdir -p ~/Documents/vibecoding-formation/.claude/skills
cd ~/Documents/vibecoding-formation

# 5. Telecharger skill student-setup depuis Slack, placer dans .claude/skills/

# 6. Lancer
code .
# Dans terminal VSCode :
claude
# Dans chat Claude :
> /student-setup
```
