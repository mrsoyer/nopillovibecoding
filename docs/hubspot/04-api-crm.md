# HubSpot API — CRM

## Table des Matieres

1. [Vue d'Ensemble](#vue-densemble)
2. [Objets CRM standards](#objets-crm-standards)
3. [Endpoints CRUD](#endpoints-crud)
4. [Batch operations](#batch-operations)
5. [Upsert](#upsert)
6. [Search API](#search-api)
7. [Properties](#properties)
8. [Associations](#associations)
9. [Pin Activity](#pin-activity)
10. [Custom Objects](#custom-objects)
11. [Patterns Recommandes](#patterns-recommandes)
12. [Anti-Patterns](#anti-patterns)

## Vue d'Ensemble

L'API CRM est le coeur de HubSpot : tous les objets metier (contacts, companies, deals, tickets, custom objects, etc.) suivent la **meme structure d'endpoints** : seul le nom de l'objet change. Maitriser le pattern sur les contacts donne acces a toute la famille.

## Objets CRM standards

| Objet | URL segment | Object Type ID | Scope read | Scope write |
|-------|-------------|----------------|-----------|-------------|
| Contacts | `contacts` | `0-1` | `crm.objects.contacts.read` | `crm.objects.contacts.write` |
| Companies | `companies` | `0-2` | `crm.objects.companies.read` | `crm.objects.companies.write` |
| Deals | `deals` | `0-3` | `crm.objects.deals.read` | `crm.objects.deals.write` |
| Tickets | `tickets` | `0-5` | `tickets` | `tickets` |
| Products | `products` | `0-7` | `e-commerce` | `e-commerce` |
| Line items | `line_items` | `0-8` | `crm.objects.line_items.read` | `crm.objects.line_items.write` |
| Quotes | `quotes` | `0-14` | `crm.objects.quotes.read` | `crm.objects.quotes.write` |
| Calls/Emails/Meetings/Notes/Tasks | `calls`, `emails`, `meetings`, `notes`, `tasks` | varies | `crm.objects.engagements.read` | `crm.objects.engagements.write` |

Tous accessibles sous `/crm/v3/objects/{name}` (legacy) ou `/crm/objects/2026-03/{name}` (nouveau).

## Endpoints CRUD

### Lecture

| Endpoint | Detail |
|----------|--------|
| `GET /crm/v3/objects/contacts/{id}` | Un contact par ID |
| `GET /crm/v3/objects/contacts/{email}?idProperty=email` | Par email (ou autre property unique) |
| `GET /crm/v3/objects/contacts` | Liste paginee (max 100/page) |

Query params utiles :

- `properties=email,firstname,lifecyclestage` — limiter les champs retournes
- `propertiesWithHistory=lifecyclestage` — inclure l'historique des changements
- `associations=companies,deals` — inclure objets associes
- `limit=100` (max) + `after={cursor}` — pagination

### Creation

```bash
POST /crm/v3/objects/contacts
Content-Type: application/json
Authorization: Bearer {token}

{
  "properties": {
    "email": "jane@example.com",
    "firstname": "Jane",
    "lastname": "Doe",
    "lifecyclestage": "lead"
  }
}
```

### Creation avec association

```json
{
  "properties": {
    "email": "jane@example.com",
    "firstname": "Jane"
  },
  "associations": [
    {
      "to": { "id": 123456 },
      "types": [
        { "associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 279 }
      ]
    }
  ]
}
```

### Mise a jour

```bash
PATCH /crm/v3/objects/contacts/{id}
Content-Type: application/json

{
  "properties": {
    "lifecyclestage": "customer",
    "jobtitle": "VP Engineering"
  }
}
```

Mise a jour par email :

```bash
PATCH /crm/v3/objects/contacts/{email}?idProperty=email
```

### Suppression

```bash
DELETE /crm/v3/objects/contacts/{id}
```

Soft-delete : le record passe en `archived: true`. Utiliser le portail pour purge GDPR (ou `contact.privacyDeletion` event).

## Batch operations

**Critique pour la performance** : 1 batch = 1 call = 1 unite de rate limit pour 100 records traites.

| Endpoint | Detail |
|----------|--------|
| `POST /crm/v3/objects/contacts/batch/create` | Creer jusqu'a 100 |
| `POST /crm/v3/objects/contacts/batch/read` | Lire jusqu'a 100 |
| `POST /crm/v3/objects/contacts/batch/update` | Mettre a jour jusqu'a 100 |
| `POST /crm/v3/objects/contacts/batch/upsert` | Upsert jusqu'a 100 |
| `POST /crm/v3/objects/contacts/batch/archive` | Supprimer jusqu'a 100 |

### Batch read

```json
{
  "properties": ["email", "lifecyclestage", "jobtitle"],
  "inputs": [
    { "id": "1234567" },
    { "id": "987456" }
  ]
}
```

### Variantes batch read

| Cible | Cle dans le body |
|-------|-----------------|
| Par email | `"idProperty": "email"` + `inputs: [{id: "user@example.com"}]` |
| Par ID custom | `"idProperty": "internalcustomerid"` + `inputs: [{id: "12345"}]` |
| Avec historique | `"propertiesWithHistory": ["lifecyclestage"]` |

## Upsert

**Endpoint dedie** : `POST /crm/v3/objects/contacts/batch/upsert`

Specifier `idProperty` pour cibler par email ou par ID custom :

```json
{
  "inputs": [
    {
      "properties": { "phone": "+18884827768" },
      "id": "test@test.com",
      "idProperty": "email"
    }
  ]
}
```

L'upsert cree si l'email n'existe pas, met a jour sinon. Indispensable pour les sync depuis systemes externes ou l'ID HubSpot n'est pas connu.

## Search API

Endpoint dedie pour requetes complexes : `POST /crm/v3/objects/{objectType}/search`

```json
{
  "filterGroups": [
    {
      "filters": [
        { "propertyName": "lifecyclestage", "operator": "EQ", "value": "customer" },
        { "propertyName": "createdate", "operator": "GTE", "value": "1672531200000" }
      ]
    }
  ],
  "properties": ["email", "firstname", "lifecyclestage"],
  "sorts": [{ "propertyName": "createdate", "direction": "DESCENDING" }],
  "limit": 100,
  "after": 0
}
```

**Operateurs** : `EQ`, `NEQ`, `LT`, `LTE`, `GT`, `GTE`, `BETWEEN`, `IN`, `NOT_IN`, `HAS_PROPERTY`, `NOT_HAS_PROPERTY`, `CONTAINS_TOKEN`, `NOT_CONTAINS_TOKEN`.

**Limites Search API** :
- Max 5 requetes/seconde par private app
- Max 10 000 resultats accessibles via pagination (au-dela : affiner les filtres)
- Max 200 properties retournees par record

## Properties

Lire toutes les properties d'un objet :

```bash
GET /crm/v3/properties/{objectTypeId}
# Exemple : GET /crm/v3/properties/0-1   (contacts)
```

Lire une property specifique :

```bash
GET /crm/v3/properties/0-1/lifecyclestage
```

Creer une custom property :

```bash
POST /crm/v3/properties/0-1
{
  "name": "internal_customer_id",
  "label": "Internal Customer ID",
  "type": "string",
  "fieldType": "text",
  "groupName": "contactinformation",
  "hasUniqueValue": true
}
```

`hasUniqueValue: true` permet d'utiliser cette property comme `idProperty` dans les batch read/upsert.

## Associations

Creer une association explicite :

```bash
PUT /crm/v3/objects/contacts/{contactId}/associations/companies/{companyId}/{associationTypeId}
```

Recuperer les types d'associations possibles entre deux objets :

```bash
GET /crm/v4/associations/contacts/companies/labels
```

Recuperer toutes les companies associees a un contact :

```bash
GET /crm/v4/objects/contacts/{contactId}/associations/companies
```

## Pin Activity

Epinglener une activite (call, meeting, note) en haut du record :

```bash
PATCH /crm/v3/objects/contacts/{contactId}
{ "properties": { "hs_pinned_engagement_id": 123456789 } }
```

## Custom Objects

Disponibles sur Sales/Service/Content Hub Enterprise. Memes endpoints CRUD/batch/search en remplacant le nom :

```bash
GET /crm/v3/objects/{custom_object_name}
POST /crm/v3/objects/{custom_object_name}/batch/upsert
```

Le `custom_object_name` correspond au nom defini lors de la creation du schema (`POST /crm/v3/schemas`).

## Patterns Recommandes

- **Toujours `properties=`** pour limiter les payloads (par defaut tres riches).
- **Batch read par email** au lieu de N appels GET unitaires.
- **`hasUniqueValue: true`** sur les IDs externes pour permettre les upserts robustes.
- **Soft-delete + archive filter** plutot que delete dur (recuperation possible sous 14 jours).
- **Search API limite** : preferer Webhooks pour le streaming, Search pour les rapports a la demande.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| `getById` en boucle | 1 call par record | `/batch/read` 100 par 100 |
| `?properties=*` (toutes) | Payloads enormes, latence | Lister explicitement |
| Search API pour synchros | 5 req/s max | Use Webhooks ou batch read |
| Creer doublons sans upsert | Polluer le CRM | Toujours `/batch/upsert` avec `idProperty` |
| Supprimer puis recreer | Casse les associations + historique | `PATCH` ou upsert |

## Sources

- [HubSpot Contacts API Guide](https://developers.hubspot.com/docs/api-reference/legacy/crm/objects/contacts/guide) — exemples complets sur tous les verbes
- [HubSpot CRM Tickets Guide](https://developers.hubspot.com/blog/a-developers-guide-to-hubspot-crm-objects-ticket-object) — pattern objet ticket
- [How are Deals linked to Companies (HubSpot Community)](https://community.hubspot.com/t5/APIs-Integrations/How-are-Deals-linked-to-Companies-and-Contacts-API/td-p/1190773) — patterns associations
- [HubSpot Deals API guide](https://mpiresolutions.com/blog/hubspot-deals-api/) — exemples deals
- [HubSpot API Integration: A Production Guide for B2B SaaS (2026)](https://unified.to/blog/hubspot_api_integration_a_production_guide_for_b2b_saas_2026) — patterns batch/upsert en production
