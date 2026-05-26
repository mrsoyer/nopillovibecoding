# Student Onboarding — Lancer la landing Nopillo en local

> Guide complet pour qu'un etudiant (Mac OU Windows) clone le repo GitHub, installe tout le necessaire, configure ses comptes cloud (Supabase, Netlify, HubSpot optionnel), connecte les MCPs Claude Code, et fasse tourner la landing avec `npm run dev` en moins de 30 minutes.

## Parcours etudiant (en 6 etapes)

| Etape | Duree | Fichier | Action |
|-------|-------|---------|--------|
| **1** | 5-10 min | [01-prerequis-systeme.md](01-prerequis-systeme.md) | Installer Node.js 22+, Git, configurer le terminal |
| **2** | 2 min | [02-cloner-projet.md](02-cloner-projet.md) | `git clone` du repo GitHub du prof |
| **3** | 5 min | [03-installer-clis.md](03-installer-clis.md) | Installer Netlify CLI + Supabase CLI |
| **4** | 5 min | [04-comptes-cloud.md](04-comptes-cloud.md) | Creer comptes Supabase + Netlify, recuperer les IDs |
| **5** | 5 min | [05-config-env-mcp.md](05-config-env-mcp.md) | Configurer `.env`, `.mcp.json`, authentifier les MCPs |
| **6** | 2 min | [06-lancer-dev.md](06-lancer-dev.md) | `npm install` + `npm run dev` → voir la landing localement |
| **+** | si bloque | [07-troubleshooting.md](07-troubleshooting.md) | Erreurs frequentes + solutions |

**Total estime** : 25-30 minutes.

## Ce que l'etudiant aura a la fin

- ✅ Repo clone en local
- ✅ Toutes les CLIs installees et authentifiees
- ✅ Compte Supabase personnel avec projet cree (table `leads` + Edge Functions)
- ✅ Compte Netlify personnel
- ✅ MCPs Claude Code connectes (Supabase, HubSpot, Webflow optionnels)
- ✅ Landing tourne sur http://localhost:4321
- ✅ Formulaire fonctionnel → insertion dans son propre Supabase

## Pre-requis materiels

- Mac (macOS 12+) OU Windows 10/11
- 8 Go RAM minimum
- 5 Go d'espace disque libre
- Connexion internet stable
- Navigateur recent (Chrome, Firefox, Edge)

## Comptes a creer AVANT le cours (par le prof a annoncer)

1. **GitHub** : https://github.com (pour cloner)
2. **Supabase** : https://supabase.com (compte gratuit, 2 projets max)
3. **Netlify** : https://www.netlify.com (compte gratuit)
4. **HubSpot** (optionnel) : https://www.hubspot.com (compte CRM gratuit)
5. **Claude Code** installe : https://code.claude.com

## Checklist pour le prof (a faire la veille)

| ✓ | Action |
|---|--------|
| [ ] | Publier le repo `nopillo-landing-exemple` sur GitHub (public ou privé+invitations) |
| [ ] | Verifier que le repo contient `.env.example`, `.mcp.json`, `CLAUDE.md`, `README.md` |
| [ ] | Verifier que le `.gitignore` exclut bien `.env`, `node_modules`, `dist`, `.netlify`, `supabase/.temp` |
| [ ] | Envoyer le lien GitHub aux etudiants la veille |
| [ ] | Preparer un Slack/Discord pour le support pendant l'atelier |

Sources : 10 pages web consultees le 2026-05-26 (voir [sources.md](sources.md))
