# HubSpot API — Webhooks

## Table des Matieres

1. [Vue d'Ensemble](#vue-densemble)
2. [Prerequis](#prerequis)
3. [Configuration des settings](#configuration-des-settings)
4. [Subscriptions disponibles](#subscriptions-disponibles)
5. [Gestion des subscriptions](#gestion-des-subscriptions)
6. [Structure du payload](#structure-du-payload)
7. [Verification de signature](#verification-de-signature)
8. [Retry behavior](#retry-behavior)
9. [Limites et constraints](#limites-et-constraints)
10. [Patterns Recommandes](#patterns-recommandes)
11. [Anti-Patterns](#anti-patterns)

## Vue d'Ensemble

Les Webhooks HubSpot permettent de recevoir des notifications **temps reel** par HTTP POST quand un evenement se produit dans le CRM ou dans les conversations. Alternative obligatoire au polling pour la reactivite.

**Specificite HubSpot** : les webhooks se configurent au niveau **app** (pas au niveau compte). L'app doit etre une **Public App** ou une **Private App** avec les bons scopes.

## Prerequis

- Une app HubSpot enregistree (Public ou Private)
- Un endpoint HTTPS publiquement accessible
- Les scopes OAuth correspondant aux objets a observer
- Un developer API key (pour la config par API)

## Configuration des settings

### Via Developer Dashboard

1. Apps → votre app → **Webhooks**
2. Renseigner **Target URL** (HTTPS obligatoire)
3. Configurer **Throttling** (concurrency)
4. **Save** (effectif sous 5 minutes max)

### Via API

```http
PUT /webhooks/2026-3/{appId}/settings
Content-Type: application/json

{
  "targetUrl": "https://www.example.com/hubspot/target",
  "throttling": {
    "maxConcurrentRequests": 10
  }
}
```

`maxConcurrentRequests` : minimum 5, defaut 10. Configurable selon la capacite de votre endpoint.

## Subscriptions disponibles

### CRM Events

| Subscription | Scope | Quand |
|--------------|-------|-------|
| `contact.creation` | `crm.objects.contacts.read` | Nouveau contact |
| `contact.deletion` | `crm.objects.contacts.read` | Contact supprime |
| `contact.merge` | `crm.objects.contacts.read` | Fusion |
| `contact.associationChange` | `crm.objects.contacts.read` | Association ajoutee/retiree |
| `contact.restore` | `crm.objects.contacts.read` | Restauration |
| `contact.privacyDeletion` | `crm.objects.contacts.read` | Suppression GDPR |
| `contact.propertyChange` | `crm.objects.contacts.read` | Property modifiee |

Memes patterns pour `company.*`, `deal.*`, `ticket.*`, `product.*`, `line_item.*`.

| Object | Scope |
|--------|-------|
| `company.*` | `crm.objects.companies.read` |
| `deal.*` | `crm.objects.deals.read` |
| `ticket.*` | `tickets` |
| `product.*` | `e-commerce` |
| `line_item.*` | `crm.objects.line_items.read` |

### Conversations Events

| Subscription | Scope | Quand |
|--------------|-------|-------|
| `conversation.creation` | `conversations.read` | Thread cree |
| `conversation.deletion` | `conversations.read` | Thread archive |
| `conversation.privacyDeletion` | `conversations.read` | Suppression definitive |
| `conversation.propertyChange` | `conversations.read` | Property thread modifiee |
| `conversation.newMessage` | `conversations.read` | Nouveau message recu |

Properties surveillables : `assignedTo`, `status` (OPEN/CLOSED), `isArchived`.

### Property Change Subscriptions

Pour `*.propertyChange`, il faut specifier **quelle property** observer :

```json
{
  "eventType": "company.propertyChange",
  "propertyName": "companyname",
  "active": false
}
```

Properties **non disponibles** : `num_unique_conversion_events`, `hs_lastmodifieddate`.

## Gestion des subscriptions

### Creer

```http
POST /webhooks/2026-3/{appId}/subscriptions

{
  "eventType": "deal.propertyChange",
  "propertyName": "dealstage",
  "active": false
}
```

### Lister

```http
GET /webhooks/2026-3/{appId}/subscriptions
```

Retourne `id`, `createdAt`, `createdBy`, `active`, `eventType`, `propertyName`.

### Activer/desactiver

```http
PUT /webhooks/2026-3/{appId}/subscriptions/{subscriptionId}

{ "active": true }
```

### Supprimer

```http
DELETE /webhooks/2026-3/{appId}/subscriptions/{subscriptionId}
```

## Structure du payload

HubSpot envoie un **array** de notifications (jusqu'a 100 par requete) :

```json
[
  {
    "objectId": 1246965,
    "propertyName": "lifecyclestage",
    "propertyValue": "subscriber",
    "changeSource": "ACADEMY",
    "eventId": 3816279340,
    "subscriptionId": 25,
    "portalId": 33,
    "appId": 1160452,
    "occurredAt": 1462216307945,
    "eventType": "contact.propertyChange",
    "subscriptionType": "contact.propertyChange",
    "attemptNumber": 0
  }
]
```

### Champs standards

| Champ | Detail |
|-------|--------|
| `objectId` | ID de l'objet affecte |
| `propertyName` / `propertyValue` | Sur les `propertyChange` uniquement |
| `changeSource` | Origine (ACADEMY, IMPORT, API, etc.) |
| `eventId` | Identifiant evenement (pas garanti unique) |
| `portalId` | ID du compte HubSpot client |
| `appId` | ID de votre app |
| `occurredAt` | Timestamp ms (utiliser pour ordering) |
| `attemptNumber` | Nombre de tentatives, demarre a 0 |

### Champs specifiques aux merges

```json
{
  "primaryObjectId": 100,
  "mergedObjectIds": [200, 300],
  "newObjectId": null,
  "numberOfPropertiesMoved": 47
}
```

### Champs specifiques aux associations

```json
{
  "associationType": "CONTACT_TO_COMPANY",
  "fromObjectId": 100,
  "toObjectId": 200,
  "associationRemoved": false,
  "isPrimaryAssociation": true
}
```

**A noter** : un changement d'association declenche **2 evenements** (un par cote de l'association).

## Verification de signature

HubSpot signe chaque requete avec un header `X-HubSpot-Signature` (SHA-256).

### Verification (Node.js)

```javascript
const crypto = require('crypto');

function verifyHubSpotSignature(req) {
  const signature = req.headers['x-hubspot-signature'];
  const body = req.rawBody; // raw, NOT parsed JSON
  const secret = process.env.HUBSPOT_APP_SECRET;

  const hash = crypto
    .createHash('sha256')
    .update(secret + body)
    .digest('hex');

  return signature === hash;
}
```

**Critique** : utiliser le body **brut**, sans re-serialisation JSON.

## Retry behavior

| Trigger | Action HubSpot |
|---------|---------------|
| Connection failure | Retry |
| Reponse > 5s | Timeout + retry |
| 4xx ou 5xx | Retry |
| 2xx | Pas de retry |

- Jusqu'a **10 tentatives** sur **24 heures**
- Intervalles **randomises** (evite les vagues coordonnees)
- Compteur dans `attemptNumber`

## Limites et constraints

| Limite | Valeur |
|--------|--------|
| Concurrence par defaut | 10 requetes simultanees |
| Concurrence min | 5 |
| Events par requete | jusqu'a 100 |
| Subscriptions par app | max 1000 (au-dela : 400) |
| Propagation des changes settings | jusqu'a 5 min |
| Webhooks vs rate limit API | **N'imputent pas** les rate limits API |

## Patterns Recommandes

- **Verify → enqueue → 2xx** : valider la signature, pousser dans une queue (SQS, RabbitMQ, Redis Streams), repondre 2xx en moins de 5s.
- **Idempotence sur `eventId`** : stocker les eventId traites pour dedupliquer (les doublons sont possibles).
- **Ordering avec `occurredAt`** : last-write-wins en comparant les timestamps avant d'appliquer.
- **Endpoint stable** : changer la target URL trop souvent declenche jusqu'a 5 min sans events. Garder l'ancien endpoint actif 5 min apres switch.
- **Subscriptions ciblees** : ne pas s'abonner a toutes les `propertyChange` — risque de saturer le pipeline.
- **Redrive queue** : monitorer les events qui echouent pour replay manuel.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| Traiter le webhook synchronement | Risque timeout 5s | Enqueue + reply immediat |
| Reparser le JSON pour signature | Hash invalide | Body brut requis |
| Ignorer les doublons | Etat CRM corrompu | Idempotence sur `eventId` |
| Subscribe a `*.propertyChange` general | Volume incontrolable | Property par property |
| Pas de signature check | Vulnerabilite spoofing | SHA-256 obligatoire |
| URL non-HTTPS | HubSpot refuse | HTTPS only |
| Reponse 200 mais traitement plante | Loss silencieuse | Logger AVANT enqueue |

## Sources

- [Webhooks API guide (2026-03)](https://developers.hubspot.com/docs/api-reference/latest/webhooks/guide) — reference officielle complete
- [Guide to HubSpot Webhooks: Features and Best Practices (Hookdeck)](https://hookdeck.com/webhooks/platforms/guide-to-hubspot-webhooks-features-and-best-practices) — patterns production
- [Quick Guide to Implementing Webhooks in HubSpot](https://developers.hubspot.com/blog/implementing-webhooks-in-hubspot) — tutoriel officiel
- [Unlocking the Power of Webhooks & Custom Workflow Actions](https://developers.hubspot.com/blog/unlocking-the-power-of-webhooks-workflow-actions-in-hubspots-new-developer-platform) — Developer Platform
- [When is it best to use a Webhook vs. an API with HubSpot](https://developers.hubspot.com/blog/when-is-it-best-to-use-a-webhook-vs.-an-api-with-hubspot) — choix architectural
