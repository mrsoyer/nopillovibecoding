# 03 — Submit form (POST API)

## Table des matieres

- [Deux endpoints (public vs auth)](#deux-endpoints-public-vs-auth)
- [Payload complet](#payload-complet)
- [Authentification](#authentification)
- [Response format](#response-format)
- [Exemples complets](#exemples-complets)
- [Anti-patterns](#anti-patterns)

---

## Deux endpoints (public vs auth)

| Type | URL | Auth | Rate limit |
|------|-----|------|------------|
| **Public** | `POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}` | Aucune | 50 req/10s |
| **Auth** | `POST https://api.hsforms.com/submissions/v3/integration/secure/submit/{portalId}/{formGuid}` | Bearer (private app) | 100-200 req/10s |

> Le path differe : `submit` (public) vs `secure/submit` (auth). Le hostname est le meme : `api.hsforms.com`.

### Quand utiliser quel endpoint ?

- **Public** : form depuis le navigateur du visiteur sur landing page. Aucun secret expose. Anti-spam recommande (honeypot, captcha).
- **Auth** : appel server-side avec rate limit plus eleve, validation pre-envoi, sources internes (CRM sync, backoffice).

---

## Payload complet

```json
{
  "submittedAt": 1779800000000,
  "fields": [
    {
      "objectTypeId": "0-1",
      "name": "email",
      "value": "jean@exemple.fr"
    },
    {
      "objectTypeId": "0-1",
      "name": "firstname",
      "value": "Jean"
    },
    {
      "objectTypeId": "0-1",
      "name": "utm_term",
      "value": "expert comptable LMNP"
    }
  ],
  "context": {
    "hutk": "abc123def456",
    "ipAddress": "192.168.1.42",
    "pageUri": "https://nopillo.fr/lp/expert-comptable-lmnp",
    "pageName": "Expert comptable LMNP - Nopillo",
    "pageId": "12345678",
    "sfdcCampaignId": "701D000000xxx",
    "goToWebinarWebinarKey": "..."
  },
  "legalConsentOptions": {
    "consent": {
      "consentToProcess": true,
      "text": "J'accepte que Nopillo traite mes donnees...",
      "communications": [
        {
          "value": true,
          "subscriptionTypeId": 999,
          "text": "J'accepte de recevoir des emails marketing"
        }
      ]
    }
  },
  "skipValidation": false
}
```

### Champs du payload

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `submittedAt` | number | Non | Unix ms. Defaut : `Date.now()` |
| `fields` | array | **Oui** | Voir ci-dessous |
| `context` | object | Recommande | Voir ci-dessous |
| `legalConsentOptions` | object | Si RGPD | Voir ci-dessous |
| `skipValidation` | boolean | Non | `true` pour bypass validation HubSpot (deconseille) |

### Format `fields[]`

```json
{
  "objectTypeId": "0-1",     // Contact (0-1), Company (0-2), Deal (0-3)
  "name": "email",            // Internal name de la property HubSpot
  "value": "jean@exemple.fr"  // String, number ou bool (selon fieldType)
}
```

> Pour des valeurs multiples (multi-checkbox), envoyer plusieurs entrees avec le meme `name`.

### Format `context`

| Cle | Description | Source typique |
|-----|-------------|----------------|
| `hutk` | Cookie de tracking HubSpot (35-40 chars) | `document.cookie["hubspotutk"]` |
| `ipAddress` | IP du visiteur | `req.headers["x-forwarded-for"]` |
| `pageUri` | URL de la page | `window.location.href` |
| `pageName` | Titre de la page | `document.title` |
| `pageId` | ID CMS HubSpot (si page CMS HubSpot) | (CMS only) |
| `sfdcCampaignId` | ID campagne Salesforce (si sync SFDC) | (param URL) |
| `goToWebinarWebinarKey` | Pour GoToWebinar integration | (specifique) |

Detail tracking : [04-tracking-hutk.md](04-tracking-hutk.md).

### `legalConsentOptions`

3 variantes selon la legitimite RGPD :

```json
// Cas 1 : consentement explicite (most common in EU)
"legalConsentOptions": {
  "consent": {
    "consentToProcess": true,
    "text": "J'accepte le traitement de mes donnees personnelles.",
    "communications": [
      { "value": true, "subscriptionTypeId": 123, "text": "Newsletter" }
    ]
  }
}

// Cas 2 : interet legitime (B2B)
"legalConsentOptions": {
  "legitimateInterest": {
    "value": true,
    "subscriptionTypeId": 123,
    "legalBasis": "LEAD",
    "text": "Base sur l'interet legitime de Nopillo pour..."
  }
}

// Cas 3 : pas d'opt-in (deconseille hors B2B intra-EU)
// Omettre legalConsentOptions
```

---

## Authentification

### Endpoint public (`/submit/`)

Aucun header d'authentification requis. Inclure simplement :

```http
Content-Type: application/json
```

> Origine de la requete : le navigateur du visiteur (CORS autorise par HubSpot pour tous les domaines).

### Endpoint auth (`/secure/submit/`)

```http
Content-Type: application/json
Authorization: Bearer pat-na1-xxxxxxxxx
```

Le token est un **Private App Access Token** cree dans HubSpot :
1. Settings → Integrations → Private Apps → Create
2. Activer scopes : `forms` + `forms-uploaded-files`
3. Copier l'access token (format `pat-na1-...`)

> Le token ne doit JAMAIS apparaitre cote client. Si tu submites depuis le navigateur, utilise l'endpoint public.

---

## Response format

### Succes (HTTP 200)

```json
{
  "inlineMessage": "<p>Merci pour votre demande...</p>",
  "redirectUri": "https://nopillo.fr/merci"
}
```

L'un OU l'autre est present selon `configuration.postSubmitAction.type` du form.

### Erreurs

| Status | Body | Cause |
|--------|------|-------|
| 400 | `{ status: "error", message: "Error in 'fields.email'", correlationId: "..." }` | Validation echouee (email invalide, champ requis manquant) |
| 401 | `{ status: "error", message: "Authentication credentials not found" }` | Token absent (endpoint auth) |
| 403 | `{ status: "error", message: "..." }` | Scope insuffisant ou form archive |
| 404 | `{ status: "error", message: "Form not found" }` | formGuid ou portalId invalide |
| 429 | `Rate limit exceeded` (text/plain) | Trop de submissions |
| 500 | `{ status: "error", message: "Internal server error" }` | Bug HubSpot |

Gestion fine des erreurs : [05-best-practices.md](05-best-practices.md).

---

> Exemples complets de code (JS browser, curl, Deno) : voir [03b-exemples.md](03b-exemples.md)

---

## Anti-patterns

1. **Submission cote client avec Bearer token** : ne JAMAIS exposer `HUBSPOT_API_KEY` dans le bundle JS. Utiliser l'endpoint public ou passer par un proxy server.

2. **skipValidation: true par defaut** : bypass la validation HubSpot. A reserver aux imports legacy. Risque : pollution du CRM avec donnees invalides.

3. **Oubli du `objectTypeId`** : sans cet attribut, HubSpot refuse les champs custom. Tous les champs Contact doivent avoir `"objectTypeId": "0-1"`.

4. **Re-soumettre sur 429** sans backoff : tu satures davantage et HubSpot peut blacklister l'IP. Voir [05-best-practices.md](05-best-practices.md).

5. **Omettre `hutk`** : tu perds l'attribution et le visiteur apparait en "direct traffic". Toujours capturer le cookie si dispo.

## Sources

- [Submit Form endpoint v3 secure](https://developers.hubspot.com/docs/api-reference/legacy/forms-v3-legacy/post-submissions-v3-integration-secure-submit-portalId-formGuid) — specs officielles
- [Robert Ainslie - HubSpot Forms submission JavaScript gist](https://gist.github.com/robertainslie/b110b8275beee1b27255c4d6e2ba2e8c) — code complet
- [Kevin Leary - Using HubSpot API to submit forms](https://www.kevinleary.net/blog/using-hubspot-api-to-submit-forms/) — tutorial Bearer + scopes
- [Acciyo - Mastering HubSpot Form Submission via API](https://www.acciyo.com/mastering-hubspot-form-submission-via-api-your-ultimate-guide/) — best practices auth + payload
