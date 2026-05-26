# HubSpot API — Rate Limits & Quotas

## Vue d'Ensemble

HubSpot impose deux niveaux de rate limiting :
1. **Burst** : nombre de requetes par 10 secondes (court terme)
2. **Daily** : nombre total sur 24 heures glissantes

Depasser declenche un `429 Too Many Requests`. Les marketplaces apps doivent maintenir un taux d'erreur sous **5%** des requetes journalieres pour rester certifiees.

## Limites par type d'app

### Public OAuth Apps (Marketplace)

```
110 requetes / 10 secondes / compte client
```

S'applique **par compte HubSpot** qui a installe l'app. L'add-on "API Limit Increase" **ne s'applique pas** aux Public OAuth Apps.

### Private Apps (Single account)

| Tier abonnement | Burst (10s) | Daily |
|----------------|-------------|-------|
| Free / Starter | 100 / app | 250 000 / compte |
| Professional | 190 / app | 625 000 / compte |
| Enterprise | 190 / app | 1 000 000 / compte |
| + API Limit Increase add-on | 250 / app | +1 000 000 / increase |

Maximum **2 add-ons** API Limit Increase achetable par compte.

## APIs avec limites specifiques

### Search API

| Limite | Valeur |
|--------|--------|
| Requetes/seconde | 5 |
| Resultats accessibles via pagination | 10 000 max |
| Properties par record | 200 max |

Depasser → 429 immediat. Pour > 10 000 records : affiner les filtres.

### Custom Events API

| Limite | Valeur |
|--------|--------|
| Definitions d'events | 500/compte |
| Events completes | 30 millions/mois |
| Send endpoint | 1 250 req/sec |
| Batch endpoint | 500 events/batch |

### Timeline Events

| Limite | Valeur |
|--------|--------|
| Event types par public app | 750 |
| Properties par type | 500 |
| Taille max d'un event | 1 MB |

### Associations & GraphQL APIs

Limites stricter que les endpoints generaux — consulter la doc specifique de chaque API.

## Headers de rate limit

HubSpot expose dans chaque reponse :

| Header | Detail |
|--------|--------|
| `X-HubSpot-RateLimit-Max` | Limite max par intervalle |
| `X-HubSpot-RateLimit-Remaining` | Restant dans l'intervalle (10s) |
| `X-HubSpot-RateLimit-Daily` | Limite journaliere |
| `X-HubSpot-RateLimit-Daily-Remaining` | Restant aujourd'hui |
| `X-HubSpot-RateLimit-Interval-Milliseconds` | Duree de l'intervalle (10000) |
| `X-HubSpot-RateLimit-Secondly` | Limite/seconde sur Search API |

Le **daily reset** se fait a minuit du fuseau horaire configure dans le compte HubSpot.

## Erreur 429

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 10
```

```json
{
  "status": "error",
  "message": "You have reached your daily limit.",
  "errorType": "RATE_LIMIT",
  "category": "RATE_LIMITS",
  "policyName": "DAILY"
}
```

`policyName` peut valoir `DAILY`, `SECONDLY_ROLLING`, `BURST`.

## Patterns Recommandes

### Exponential backoff sur 429

```javascript
async function callHubSpot(url, options, retries = 5) {
  const response = await fetch(url, options);
  if (response.status === 429 && retries > 0) {
    const retryAfter = Number(response.headers.get('Retry-After')) || 10;
    await new Promise(r => setTimeout(r, retryAfter * 1000 * Math.pow(2, 5 - retries)));
    return callHubSpot(url, options, retries - 1);
  }
  return response;
}
```

### Optimisation par batch

```
10 000 contacts a lire individuellement = 10 000 calls
                                       = ~91 minutes a 100 req/10s

10 000 contacts en batches de 100      = 100 calls
                                       = ~1 minute
```

**Reduction 100x** du nombre d'appels.

### Pagination correcte

```javascript
let after;
const allRecords = [];
do {
  const url = `https://api.hubapi.com/crm/v3/objects/contacts?limit=100&after=${after ?? ''}`;
  const data = await fetch(url, { headers }).then(r => r.json());
  allRecords.push(...data.results);
  after = data.paging?.next?.after;
} while (after);
```

### Cache et deduplication

- Cacher les referentiels (pipelines, stages, owners, properties) **1 heure minimum**.
- Dedupliquer les requetes en cours (request coalescing).
- Si l'app affiche des donnees HubSpot a chaque pageload, mettre en cache cote serveur.

### Webhooks > polling

Les webhooks **n'imputent pas** les rate limits API. Pour reagir aux changements, **toujours preferer Webhooks au polling**.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| Polling /contacts toutes les 30s | Sature les 100 req/10s | Webhooks |
| Pas de retry sur 429 | Pertes de donnees | Backoff exponentiel + Retry-After |
| Search API en boucle | 5 req/s = blocage rapide | Batch read direct si IDs connus |
| Boucle 1 record/call | 100x plus de calls | Batch endpoints |
| Pas de cache sur pipelines/owners | Centaines de calls inutiles | TTL 1h sur referentiels |
| Daily limit atteint en milieu de journee | Service down jusqu'a minuit | Monitoring + alerting des headers |
| Multiple workers paralleles non coordonnees | Bursts simultanes | Rate limiter centralise (Redis token bucket) |

## Monitoring recommande

```javascript
const remaining = response.headers.get('X-HubSpot-RateLimit-Remaining');
const dailyRemaining = response.headers.get('X-HubSpot-RateLimit-Daily-Remaining');

// Alerter si on est sous 20% du daily
if (Number(dailyRemaining) < 0.2 * Number(response.headers.get('X-HubSpot-RateLimit-Daily'))) {
  metrics.alert('hubspot_daily_quota_low', { remaining: dailyRemaining });
}
```

## Sources

- [API usage guidelines and limits (officiel)](https://developers.hubspot.com/docs/developer-tooling/platform/usage-guidelines) — limites detaillees par tier
- [HubSpot API usage limits and guidelines](https://developers.hubspot.com/docs/guides/apps/api-usage/usage-details) — vue developpeur
- [Working within the HubSpot API rate limits (legacy)](https://legacydocs.hubspot.com/docs/faq/working-within-the-hubspot-api-rate-limits) — patterns historiques
- [Custom API Integration with HubSpot: Rate Limit Tips](https://www.reform.app/blog/custom-api-integration-hubspot-rate-limit-tips) — strategies production
- [Real Examples of Handling HubSpot API Rate Limits (MoldStud)](https://moldstud.com/articles/p-case-studies-how-developers-successfully-navigate-hubspot-api-rate-limits) — case studies
- [Search API rate limits (Community)](https://community.hubspot.com/t5/APIs-Integrations/Search-API-rate-limits/m-p/925565) — limite specifique Search
