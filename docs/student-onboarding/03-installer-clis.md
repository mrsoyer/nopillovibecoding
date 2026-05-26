# 03 — Installer les CLIs (Netlify + Supabase)

## Table des matieres

- [Netlify CLI](#netlify-cli)
- [Supabase CLI](#supabase-cli)
- [Verifier les versions](#verifier-les-versions)

---

## Netlify CLI

**Mac & Windows (recommande)** :

```bash
npm install -g netlify-cli
```

> Requiert Node.js 18.14.0+ (cf. [01-prerequis-systeme.md](01-prerequis-systeme.md)).

**Mac alternative** :

```bash
brew install netlify-cli
```

### Verifier

```bash
netlify --version
# Doit afficher : netlify-cli/x.x.x ...
```

### Se connecter (a faire MAINTENANT)

```bash
netlify login
```

→ ton browser s'ouvre → login Netlify → "Authorize Netlify CLI" → revenir au terminal.

Le token est sauvegarde dans :
- **Mac** : `~/Library/Preferences/netlify/config.json`
- **Windows** : `%APPDATA%\netlify\Config\config.json`

> Tu n'auras plus a te reconnecter sur cette machine.

---

## Supabase CLI

**Mac (Homebrew)** :

```bash
brew install supabase/tap/supabase
```

**Windows (Scoop)** :

```powershell
# Si scoop n'est pas installe :
iwr -useb get.scoop.sh | iex

# Ajouter le bucket Supabase et installer :
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

> Important : `npm install -g supabase` n'est PAS supporte officiellement. Utilise brew/scoop.

### Verifier

```bash
supabase --version
# Doit afficher : 2.x.x (>= 2.45.0 pour bundle sans Docker)
```

Si version < 2.45 :

```bash
brew upgrade supabase        # Mac
scoop update supabase        # Windows
```

### Se connecter (a faire MAINTENANT)

```bash
supabase login
```

→ ton browser s'ouvre → login Supabase → autoriser → revenir au terminal.

Le Personal Access Token (PAT) est sauvegarde dans :
- **Mac** : `~/.supabase/access-token` ou keychain
- **Windows** : `%USERPROFILE%\.supabase\access-token` ou Credential Manager

---

## Verifier les versions

Lance tout d'un coup :

```bash
node --version       # >= 22.0.0
npm --version        # >= 10.0.0
git --version        # >= 2.30.0
netlify --version    # >= 17.x
supabase --version   # >= 2.45.0
```

Si tout repond → **CLIs OK, passer a [04-comptes-cloud.md](04-comptes-cloud.md).**

## Anti-patterns

- ❌ Installer Supabase CLI via `npm install -g supabase` → cassera, non supporte
- ❌ Garder Supabase CLI < 2.45 → besoin de Docker pour deploy edge functions (lourd)
- ❌ Oublier de faire `netlify login` / `supabase login` → tout va echouer plus tard
- ❌ Installer Netlify CLI dans le projet (`npm install netlify-cli`) sans `-g` → la commande `netlify` n'est pas globale

## Troubleshooting rapide

| Erreur | Solution |
|--------|----------|
| `npm: command not found` | Re-installer Node.js (etape 01) |
| `netlify: command not found` apres install | Re-ouvrir le terminal OU verifier que `npm prefix -g` est dans PATH |
| `EACCES: permission denied` sur Mac | Utiliser `sudo npm install -g ...` OU passer a nvm |
| Scoop refuse car non-admin Windows | Ouvrir PowerShell en admin OU installer via le `.msi` Node |
| `supabase login` ne s'ouvre pas | Copier l'URL affichee dans le terminal et coller dans le browser manuellement |

## Suivant

→ [04-comptes-cloud.md](04-comptes-cloud.md) pour creer ton projet Supabase et ton site Netlify.

## Sources

- [Netlify CLI - Get started](https://docs.netlify.com/cli/get-started/)
- [netlify-cli on npm](https://www.npmjs.com/package/netlify-cli)
- [Supabase CLI Local Development](https://supabase.com/docs/guides/local-development/cli/getting-started)
- [Supabase CLI on Windows guide (DEV.to)](https://dev.to/chiragx309/how-to-install-supabase-cli-on-windows-the-right-way-a-simple-guide-for-everyone-14om)
