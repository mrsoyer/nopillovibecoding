# HubSpot API — Authentification

## Vue d'Ensemble

HubSpot supporte deux methodes d'authentification depuis le sunset des API keys (30 novembre 2022) :

1. **OAuth 2.0/2.1** — pour applications publiques multi-comptes (Marketplace)
2. **Private Apps** — pour integrations a un seul compte (interne)

Les API keys (`hapikey=...`) sont **definitivement depreciees** et ne doivent plus etre utilisees.

## Choisir entre OAuth et Private App

| Critere | OAuth 2.0/2.1 | Private App |
|---------|--------------|-------------|
| Nombre de comptes HubSpot | Plusieurs (Marketplace) | Un seul |
| Token | Refresh + access (rotation) | Token statique long-terme |
| Setup | Console developpeur + serveur OAuth | Settings du compte HubSpot |
| Scopes | Configurables par app | Configurables par app |
| Audit | Centralise (developpeur) | Local au compte |
| Use case typique | SaaS distribue | Script interne, ETL, automatisation |

## Private App — Setup rapide

1. Dans HubSpot : **Settings → Integrations → Private Apps**
2. **Create a private app**
3. Selectionner les scopes necessaires (ex : `crm.objects.contacts.read`, `crm.objects.contacts.write`)
4. Copier le **Access Token** affiche

Usage du token :

```bash
curl https://api.hubapi.com/crm/v3/objects/contacts \
  -H "Authorization: Bearer pat-na1-xxxxxxxxxxxxxxxxxxxxxxxx"
```

Le format du token commence par `pat-` (Private App Token). Ces tokens sont **detectes par GitGuardian et autres scanners** : ne jamais les committer.

## OAuth 2.0/2.1 — Vue technique

### Endpoints

| Endpoint | Methode | Role |
|----------|---------|------|
| `/oauth/2026-03/token` | POST | Generer access token (initial ou refresh) |
| `/oauth/2026-03/token/introspect` | POST | Inspecter validite/scopes d'un token |

Tous les parametres passent dans le **body** (`application/x-www-form-urlencoded`), jamais en query string, pour eviter les fuites dans les logs serveur.

### Cycle de vie des tokens

| Token | Duree | Role |
|-------|-------|------|
| Authorization code | Single-use, courte | Echange initial apres redirect |
| Access token | 30 minutes | Bearer dans les requetes API |
| Refresh token | Long-terme | Generer un nouvel access token |

### Flow OAuth complet

**1. Redirect utilisateur vers HubSpot**

```
https://app.hubspot.com/oauth/authorize
  ?client_id={CLIENT_ID}
  &redirect_uri={REDIRECT_URI}
  &scope=crm.objects.contacts.read%20crm.objects.contacts.write
```

**2. Echange du code contre les tokens**

```bash
curl --request POST \
  --url https://api.hubapi.com/oauth/2026-03/token \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data client_id=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee \
  --data client_secret=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee \
  --data code=na1-aaaa-bbbb-cccc-dddd-eeeeeeeeeeee \
  --data grant_type=authorization_code \
  --data redirect_uri=http://localhost:3000/oauth-callback
```

Reponse :

```json
{
  "token_type": "bearer",
  "access_token": "...",
  "refresh_token": "...",
  "hub_id": 12345678,
  "scopes": ["crm.objects.contacts.read", "crm.objects.contacts.write"],
  "expires_in": 1800
}
```

**3. Refresh du token (toutes les ~30 minutes)**

```bash
curl --request POST \
  --url https://api.hubapi.com/oauth/2026-03/token \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data client_id=... \
  --data client_secret=... \
  --data refresh_token=... \
  --data grant_type=refresh_token
```

**4. Utilisation du token sur les API**

```bash
curl https://api.hubapi.com/crm/v3/objects/contacts \
  -H "Authorization: Bearer {access_token}"
```

### Introspection (verification d'un token)

```bash
curl --request POST \
  --url https://api.hubapi.com/oauth/2026-03/token/introspect \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data client_id=... \
  --data client_secret=... \
  --data token_type_hint=access_token \
  --data access_token=...
```

## Scopes (extrait)

Les scopes suivent un namespace coherent :

| Scope | Permission |
|-------|-----------|
| `crm.objects.contacts.read` | Lire les contacts |
| `crm.objects.contacts.write` | Creer/modifier les contacts |
| `crm.objects.companies.read` | Lire les companies |
| `crm.objects.deals.write` | Creer/modifier les deals |
| `tickets` | Acces complet aux tickets (ancien format) |
| `e-commerce` | Acces aux produits, line items, orders |
| `crm.lists.read` | Lire les listes |
| `automation` | Workflows |
| `forms` | Formulaires |
| `content` | CMS pages, blogs |
| `oauth` | Refresh tokens |

Liste complete dans la console developpeur lors de la creation/modification d'app.

## Erreurs OAuth (RFC 6749)

```json
{
  "error": "invalid_grant",
  "error_description": "refresh token is invalid, expired or revoked",
  "status": "BAD_REFRESH_TOKEN"
}
```

| `error` | Cause typique |
|---------|--------------|
| `invalid_grant` | Code expire ou refresh token revoque |
| `invalid_client` | Mauvais client_id ou client_secret |
| `invalid_scope` | Scope demande non disponible sur le tier |
| `unauthorized_client` | App non autorisee pour le grant_type |

## Patterns Recommandes

- **Cacher l'access token et son `expires_in`** dans Redis/memcached, refresh proactif a T-2 minutes.
- **Stocker le refresh token chiffre en base** (rotation 1 fois/refresh ~6 mois).
- **Logger les introspections** pour detecter les tokens revoques avant le prochain appel.
- **Scopes minimaux** : ne demander que ce dont l'app a besoin (principle of least privilege).
- **Rotation reguliere des Private App tokens** : regenerer tous les ~6 mois minimum.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| API key (`?hapikey=...`) | Depreciee depuis 2022 | Migrer vers Private App ou OAuth |
| Token en query string | Logue dans nginx/Cloudflare | Toujours en header `Authorization: Bearer` |
| Refresh a chaque appel API | Rate limit OAuth + latence | Cacher avec TTL `expires_in - 120s` |
| Token committed en clair | Compromission immediate | `.env` + secret manager |
| Scopes `*` ou trop larges | Risque RGPD/securite | Scopes minimaux par app |

## Sources

- [Manage OAuth access tokens with the 2026-03 API](https://developers.hubspot.com/docs/api-reference/latest/authentication/manage-oauth-tokens) — endpoints OAuth 2026-03
- [Upcoming: API Key Sunset](https://developers.hubspot.com/changelog/upcoming-api-key-sunset) — sunset des API keys
- [How to Get Your HubSpot API Key: Private App Token Setup (2026)](https://sfailabs.com/guides/how-to-get-hubspot-api-key) — setup Private App
- [Custom API Integration with HubSpot: Security Guide](https://www.reform.app/blog/custom-api-integration-hubspot-security-guide) — best practices securite
- [HubSpot Private App Token detector (GitGuardian)](https://docs.gitguardian.com/secrets-detection/secrets-detection-engine/detectors/specifics/hubspot_private_app_token) — format des tokens
