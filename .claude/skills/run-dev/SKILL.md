---
name: run-dev
description: Lance le serveur de dev Astro local (port 4321) pour nopillo-landing-exemple. Vérifie si le port est libre, cd dans front/, npm run dev en background, confirme HTTP 200. Triggers : "lance en local", "npm run dev", "démarre le projet", "start dev", "dev local", "lance le serveur".
user-invocable: true
allowed-tools: Bash
---

# Run Dev — Lancer la landing en local

Lance `npm run dev` dans `nopillo-landing-exemple/front/` et vérifie que la landing répond sur http://localhost:4321/.

## Workflow

### Étape 1 — Vérifier si le port 4321 est libre

```bash
lsof -ti:4321 2>/dev/null || echo "FREE"
```

Si un PID est retourné (port occupé) :
- Afficher : "Port 4321 déjà utilisé (PID XXXX)."
- Demander via AskUserQuestion : "Tuer le process et relancer ? Ou utiliser le port 4322 ?"
  - **Tuer** : `kill -9 <PID>`, attendre 1s, continuer étape 2
  - **Port 4322** : ajouter `-- --port 4322` à la commande dev, vérifier sur http://localhost:4322/

Si `FREE` : passer directement à l'étape 2.

### Étape 2 — Lancer npm run dev

Depuis la racine du workspace (`/Users/thomas/webflowlanding/`) :

```bash
cd nopillo-landing-exemple/front && npm run dev &
```

Attendre 4 secondes pour le démarrage d'Astro.

### Étape 3 — Vérifier HTTP 200

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:4321/
```

**Si HTTP 200** → afficher le rapport succès ci-dessous.

**Si connection refused** → le serveur n'a pas démarré. Afficher les dernières lignes de log et proposer un diagnostic.

**Si EADDRINUSE dans les logs** → retour étape 1 (port occupé détecté trop tard).

### Étape 4 — Rapport

```
DEV SERVER LANCÉ

  URL     : http://localhost:4321/
  Dossier : nopillo-landing-exemple/front/
  Stack   : Astro 6 + Tailwind 4 + React islands

  Ouvre http://localhost:4321/ dans ton browser.
  Hot reload actif — les modifications sont appliquées en direct.

Pour arrêter : Ctrl+C dans le terminal où tourne npm run dev.
```

## Règles

- **Toujours vérifier HTTP 200** avant de déclarer succès — un process qui démarre ne garantit pas une page qui répond.
- **Jamais `sudo`** pour tuer un process sur port 4321 — un simple `kill -9` suffit.
- **Proposer AskUserQuestion si port occupé** — ne pas tuer automatiquement sans confirmation.
- **Le process tourne en background** (`&`) — Claude peut continuer à répondre pendant que le serveur tourne.

## Exemples

```
User: "lance en local"
→ Port 4321 free → npm run dev & → HTTP 200 → Rapport affiché

User: "start dev"
→ Port 4321 occupé (PID 3421) → AskUserQuestion → User: "tue le"
→ kill -9 3421 → npm run dev & → HTTP 200 → Rapport affiché
```
