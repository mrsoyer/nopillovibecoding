---
name: deploy-netlify
description: Build et publie nopillo-landing-exemple en production sur Netlify (https://nopillo-landing-exemple.netlify.app). Build Astro dans front/, deploy --prod via CLI, vérifie HTTP 200 sur l'URL prod. Triggers : "publie sur netlify", "deploy netlify", "déploie en prod", "netlify deploy", "publication netlify", "mise en prod".
user-invocable: true
allowed-tools: Bash
---

# Deploy Netlify — Publier la landing en production

Build `nopillo-landing-exemple/front/` et déploie sur **https://nopillo-landing-exemple.netlify.app** via Netlify CLI.

## Infos projet

| Paramètre | Valeur |
|-----------|--------|
| Site | `nopillo-landing-exemple` |
| Site ID | `66a54af5-c61a-4c80-8b9a-66285bb11891` |
| URL prod | https://nopillo-landing-exemple.netlify.app |
| netlify.toml | `nopillo-landing-exemple/netlify.toml` |
| Build dir | `nopillo-landing-exemple/front/` |
| Publish dir | `nopillo-landing-exemple/front/dist/` |

## Workflow

### Étape 1 — Vérifier l'auth Netlify

```bash
netlify status 2>&1 | head -5
```

Si "You don't appear to be in a folder that is linked" → OK, c'est normal hors du dossier projet.
Si "Not logged in" → lancer `netlify login` et attendre la validation browser.

### Étape 2 — Build Astro

```bash
cd /Users/thomas/webflowlanding/nopillo-landing-exemple/front && npm run build 2>&1
```

Attendu : `✓ Completed` + `1 page(s) built`. Durée ~700ms.

Si erreur TypeScript / import manquant → afficher les lignes d'erreur et stopper. Ne pas déployer un build cassé.

### Étape 3 — Déployer en production

```bash
cd /Users/thomas/webflowlanding/nopillo-landing-exemple && netlify deploy --prod --dir=front/dist 2>&1
```

Attendu : `Deploy is live!` + URL de production affichée.

### Étape 4 — Vérifier HTTP 200

```bash
sleep 3 && curl -s -o /dev/null -w "HTTP %{http_code}\n" https://nopillo-landing-exemple.netlify.app
```

Attendu : `HTTP 200`. Si autre code → afficher et signaler.

### Étape 5 — Rapport

```
DÉPLOIEMENT NETLIFY : SUCCESS

  URL prod    : https://nopillo-landing-exemple.netlify.app
  Site        : nopillo-landing-exemple
  Build       : Astro 6 — 1 page, ~700ms
  CDN         : Netlify Edge (propagation ~30s)

  Dashboard   : https://app.netlify.com/projects/nopillo-landing-exemple
```

## Règles

- **Build avant deploy** : ne jamais déployer sans rebuild local — le `dist/` peut être périmé.
- **`--prod` obligatoire** : sans ce flag, Netlify crée un deploy de preview, pas de production.
- **`--dir=front/dist`** : le netlify.toml a `base = "nopillo-landing-exemple/front"`, le CLI recalcule le publish depuis la racine git, donc passer le chemin explicitement évite toute ambiguïté.
- **Lancer depuis `nopillo-landing-exemple/`** : le `.netlify/` de linkage y est stocké.

## Exemples

```
User: "publie sur netlify"
→ Build OK (700ms) → deploy --prod → HTTP 200 → Rapport

User: "déploie en prod"
→ Build OK → deploy --prod → HTTP 200 → Rapport
```
