# 01 — Vue d'ensemble HubSpot Forms

## Table des matieres

- [Deux APIs distinctes](#deux-apis-distinctes)
- [Versions](#versions)
- [Endpoints principaux](#endpoints-principaux)
- [Authentification globale](#authentification-globale)
- [Cas d'usage](#cas-dusage)

---

## Deux APIs distinctes

HubSpot expose **deux APIs separees** pour les formulaires :

### 1. Marketing Forms API (read/manage)

Hote : `api.hubapi.com`

Permet de **gerer la definition** des forms (creer, lister, get, archiver). C'est l'API qu'on appelle quand on veut connaitre la structure d'un form existant ou en creer un programmatiquement.

| Methode | Endpoint | Usage |
|---------|----------|-------|
| GET | `/marketing/v3/forms` | Lister tous les forms du portail |
| GET | `/marketing/v3/forms/{formId}` | Recuperer la definition complete |
| POST | `/marketing/v3/forms` | Creer un form |
| PATCH | `/marketing/v3/forms/{formId}` | Modifier un form |
| DELETE | `/marketing/v3/forms/{formId}` | Archiver un form |

**Scopes OAuth** : `forms`

### 2. Forms Submission API (post data)

Hote : `api.hsforms.com` (different !)

Permet d'**envoyer** des donnees de soumission a un form. Pas pour gerer la definition.

| Methode | Endpoint | Auth | Rate limit |
|---------|----------|------|------------|
| POST | `/submissions/v3/integration/submit/{portalId}/{formGuid}` | Aucune (public) | 50 req/10s |
| POST | `/submissions/v3/integration/secure/submit/{portalId}/{formGuid}` | Bearer (private app) | 100-200 req/10s |

**Scopes OAuth** (pour l'endpoint secure) : `forms`, `forms-uploaded-files`

> Pourquoi 2 hotes ? Historiquement la submission API tournait sur `forms.hubspot.com` puis a migre vers `api.hsforms.com`. La gestion via `api.hubapi.com` est restee sur le domaine standard HubSpot APIs.

---

## Versions

| API | Version | Statut |
|-----|---------|--------|
| Marketing Forms | **v3** | Production (2024+) |
| Marketing Forms | v2 | Legacy, encore supportee |
| Submissions | **v3** | Production (recommande) |
| Submissions | v2 | Legacy, deprecated dans certains contextes |

Le **v3** est la version recommandee pour tous les nouveaux projets en 2026.

---

## Endpoints principaux

### Recuperer la liste des forms

```http
GET https://api.hubapi.com/marketing/v3/forms
Authorization: Bearer pat-na1-xxxx-xxxx
```

**Response** :
```json
{
  "total": 12,
  "results": [
    {
      "id": "d9afc0c5-1234-5678-9abc-def012345678",
      "name": "Contact LMNP",
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-04-20T14:22:00Z",
      "archived": false,
      "formType": "hubspot",
      "fieldGroups": [...],
      "configuration": {...}
    }
  ],
  "paging": { "next": { "after": "..." } }
}
```

### Soumettre des donnees

```http
POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
Content-Type: application/json

{
  "submittedAt": 1779800000000,
  "fields": [
    {"objectTypeId": "0-1", "name": "email", "value": "lead@example.com"},
    {"objectTypeId": "0-1", "name": "firstname", "value": "Jean"}
  ],
  "context": {
    "hutk": "abc123...",
    "pageUri": "https://example.com/lp",
    "pageName": "Landing LMNP"
  }
}
```

Detail complet : [03-submit-form.md](03-submit-form.md).

---

## Authentification globale

3 modes selon le contexte :

| Mode | Quand ? | Securite |
|------|---------|----------|
| **Aucune** (submit public) | Form sur landing page publique, donnees non sensibles | OK pour lead-gen |
| **Bearer private app** | API server-side, gestion forms, secure submit | Recommande |
| **OAuth 2.0** | Public apps multi-portails | Marketplace HubSpot |

> Ne JAMAIS exposer un token private app cote client (JS). Pour un form public, utiliser l'endpoint unauth `submit/...` qui ne necessite pas de token.

---

## Cas d'usage

### Cas 1 — Form Marketing connecte a un workflow

Tu as cree un form dans HubSpot UI avec workflows attaches (lead notification, scoring, email confirmation). Tu veux que ton site (Astro/React) submit a ce form.

→ **Endpoint** : `POST submissions/v3/integration/submit/{portalId}/{formGuid}` (public)
→ Workflows HubSpot se declenchent automatiquement post-submission.

### Cas 2 — API server-side avec donnees sensibles

Backend Node/Deno qui recoit le form et veut le pousser a HubSpot avec validation server-side.

→ **Endpoint** : `POST submissions/v3/integration/secure/submit/...` avec Bearer token
→ Rate limit 100-200 req/10s.

### Cas 3 — Sync bidirectionnelle CRM

Tu veux pousser des contacts directement sans passer par un form (ex : import CSV, sync depuis autre DB).

→ **Pas la Forms API** : utiliser `POST /crm/v3/objects/contacts` (Contacts API).

### Cas 4 — Decouvrir le schema d'un form pour generer un client

Tu veux generer un formulaire HTML dynamique dont les champs correspondent a un form HubSpot.

→ **Endpoint** : `GET /marketing/v3/forms/{formId}` + parser `fieldGroups[].fields[]`.

---

## Decision tree

```
Form sur landing publique (lead-gen) ?
├── Workflows HubSpot attendus ?
│   ├── OUI → Submissions API public (unauth)
│   └── NON → Contacts API direct (plus simple)
│
└── Donnees sensibles / volume eleve ?
    └── OUI → Submissions API auth (secure)
```

## Sources

- [HubSpot Forms API v3 reference](https://developers.hubspot.com/docs/reference/api/marketing/forms/v3) — endpoints et schemas
- [Forms API v3 Developer Preview announcement](https://developers.hubspot.com/changelog/announcing-forms-api-v3-developer-preview-is-now-available) — historique
- [HubSpot Community - Choosing API for forms](https://community.hubspot.com/t5/APIs-Integrations/fill-and-submit-forms-using-Private-App/m-p/736785) — patterns auth
