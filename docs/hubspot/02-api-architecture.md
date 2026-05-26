# HubSpot API — Architecture

## Vue d'Ensemble

L'API HubSpot est une API REST classique exposee sur `https://api.hubapi.com/` avec reponses JSON. Depuis mars 2026, HubSpot a introduit un nouveau systeme de versioning par date qui coexiste avec l'ancien systeme `v3`/`v4`.

## Base URL

Toutes les requetes utilisent la meme racine :

```
https://api.hubapi.com/
```

Aucune difference selon la region ou le tier d'abonnement.

## Versioning : 2 systemes en parallele

### Nouveau : versioning date-based (2026-03)

Format des endpoints :

```
/{api-name}/2026-03/{resource}
```

Exemples :

```
GET  /crm/objects/2026-03/contacts
POST /oauth/2026-03/token
GET  /webhooks/2026-3/{appId}/subscriptions
```

Chaque API publie une nouvelle version a date fixe (ex : `2026-03`, `2026-09-beta`). Les anciennes versions continuent de fonctionner jusqu'a leur date d'end-of-life officielle, ce qui laisse le temps de migrer.

### Legacy : versioning numerique (v1, v3, v4)

L'ancien format reste fonctionnel et tres present dans la documentation tierce :

```
/crm/v3/objects/contacts
/crm/v4/objects/{objectType}/{id}/associations/{toObjectType}
/webhooks/v3/{appId}/subscriptions
```

| Version | Statut | Quand l'utiliser |
|---------|--------|------------------|
| `v1` | Legacy, en sunset progressif | Code existant uniquement |
| `v3` | Stable, largement utilise | OK pour code existant |
| `v4` | Stable (associations notamment) | OK pour code existant |
| `2026-03` | Latest, recommande | Nouvelles integrations |

**Recommandation officielle** : pour toute nouvelle integration, utiliser la derniere version date-based.

## Format des requetes/reponses

- **Methodes HTTP** : `GET`, `POST`, `PATCH`, `PUT`, `DELETE`
- **Body** : JSON pour la majorite des endpoints, `application/x-www-form-urlencoded` pour OAuth
- **Reponses** : JSON systematique
- **Encodage** : UTF-8

### Pattern de reponse list

```json
{
  "results": [
    { "id": "33451", "properties": { ... }, "createdAt": "...", "updatedAt": "..." }
  ],
  "paging": {
    "next": {
      "after": "33452",
      "link": "https://api.hubspot.com/crm/objects/v3/contacts?limit=1"
    }
  }
}
```

### Pattern de reponse erreur

```json
{
  "status": "error",
  "message": "Property values were not valid",
  "correlationId": "...",
  "category": "VALIDATION_ERROR"
}
```

## Pagination

Les endpoints de listing utilisent un curseur opaque :

| Parametre | Type | Detail |
|-----------|------|--------|
| `limit` | integer | Max 100 par requete |
| `after` | string | Curseur retourne dans `paging.next.after` |

Boucle de pagination type :

```javascript
let after = undefined;
do {
  const url = `https://api.hubapi.com/crm/v3/objects/contacts?limit=100${after ? `&after=${after}` : ''}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await response.json();
  // process data.results
  after = data.paging?.next?.after;
} while (after);
```

## Associations

Les objets CRM peuvent etre associes entre eux (contact → company, deal → contact, etc.).

```
GET    /crm/v4/objects/{fromObjectType}/{fromId}/associations/{toObjectType}
PUT    /crm/v3/objects/contacts/{contactId}/associations/{toObjectType}/{toId}/{associationTypeId}
DELETE /crm/v3/objects/contacts/{contactId}/associations/{toObjectType}/{toId}/{associationTypeId}
GET    /crm/v4/associations/{fromObjectType}/{toObjectType}/labels
```

Categories d'associations : `HUBSPOT_DEFINED` (predefinis) ou `USER_DEFINED` (personnalises).

## GraphQL (alternatif)

HubSpot expose aussi un endpoint GraphQL pour requetes complexes multi-objets en un seul appel. Disponible principalement sur les tiers Professional/Enterprise. Reduit le nombre de round-trips reseau.

## Patterns Recommandes

- **Toujours specifier `properties=`** sur les endpoints de lecture pour ne recuperer que les champs necessaires (reduit la bande passante).
- **Utiliser `/batch/read`, `/batch/create`, `/batch/update`, `/batch/upsert`** pour traiter jusqu'a 100 records par requete.
- **Stocker l'access token et son expiration** plutot que d'en demander un a chaque appel (duree de vie : 30 minutes).
- **Migrer progressivement vers 2026-03** sans bloquer les anciens endpoints.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| Boucle 1 contact/requete | 10 000 contacts = 10 000 calls | Batch endpoint = 100 calls |
| Polling toutes les 30s | Sature les rate limits | Webhooks pour le push |
| Pas de pagination | On rate des donnees | Toujours boucler tant que `paging.next` existe |
| Hardcoder version `v3` partout | Pas pret pour la migration 2026-03 | Variable d'env / config centrale |
| Recuperer toutes les properties | Reponses lourdes | `?properties=email,firstname,lastname` |

## Sources

- [API Reference Overview 2026-03](https://developers.hubspot.com/docs/api-reference/latest/overview) — base URL, versioning, structure
- [Introducing date-based API versioning](https://developers.hubspot.com/changelog/introducing-date-based-api-versioning) — changelog officiel
- [Understanding HubSpot API Endpoints](https://www.hyphadev.io/blog/understanding-hubspot-api-endpoints) — recapitulatif des families d'API
- [HubSpot Contacts API Guide](https://developers.hubspot.com/docs/api-reference/legacy/crm/objects/contacts/guide) — exemples concrets pagination
