# HubSpot Forms API — Documentation Reference

> Recherche complete sur les 2 APIs publiques HubSpot pour les forms : **lire** les definitions (Marketing Forms API v3) et **soumettre** des donnees (Forms Submission API v3).

## Contenu

| Fichier | Contenu |
|---------|---------|
| [01-overview.md](01-overview.md) | Vue d'ensemble : 2 APIs distinctes, versions, endpoints principaux, cas d'usage |
| [02-get-forms.md](02-get-forms.md) | **GET** : lister les forms du portail + recuperer schema (fields, fieldTypes, configuration) |
| [03-submit-form.md](03-submit-form.md) | **POST** : submit endpoint (unauth + auth), payload complet, response format |
| [03b-exemples.md](03b-exemples.md) | Exemples complets copy-paste (JS browser, curl, Deno, React hook) |
| [04-tracking-hutk.md](04-tracking-hutk.md) | Cookie `hubspotutk`, context object, integration tracking GA/Ads |
| [05-best-practices.md](05-best-practices.md) | Rate limits, erreurs 429, retries exponential backoff, validation |
| [06-analyse-form-projet.md](06-analyse-form-projet.md) | **Analyse** du `ContactForm.tsx` de ce projet vs API HubSpot |
| [06b-migration.md](06b-migration.md) | Plan de migration concret Contacts API → Forms Submissions API |
| [sources.md](sources.md) | Sources consultees (20 pages web officielles + community) |

## TL;DR

| Action | Endpoint | Auth |
|--------|----------|------|
| Lister forms | `GET /marketing/v3/forms` | Bearer (private app) |
| Get form | `GET /marketing/v3/forms/{formId}` | Bearer (private app) |
| Submit form (public) | `POST api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}` | Aucune (50 req/10s) |
| Submit form (auth) | `POST api.hsforms.com/submissions/v3/integration/secure/submit/{portalId}/{formGuid}` | Bearer (100-200 req/10s) |

## Cas d'usage pour ce projet (nopillo-landing-exemple)

Le projet utilise actuellement l'API **Contacts CRM** (`POST /crm/v3/objects/contacts`) dans l'Edge Function `contact-form`. La Forms API est une alternative qui apporte :

- **Workflows HubSpot** declenches automatiquement (lead notifications, scoring, drip emails)
- **Attribution multi-touch** via le cookie `hubspotutk`
- **Soumission anonyme possible** (pas besoin de token cote serveur, mais public submit)
- **Re-utilisation** de forms HubSpot existants (changer un champ sans redeployer)

Voir [06-analyse-form-projet.md](06-analyse-form-projet.md) pour la decision recommandee.

Sources : 10 pages web consultees le 2026-05-26
