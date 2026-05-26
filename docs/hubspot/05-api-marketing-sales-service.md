# HubSpot API — Marketing, Sales, Service & Content Hubs

## Vue d'Ensemble

Au-dela du CRM, HubSpot expose des APIs specialisees par "Hub" produit. **La disponibilite de chaque API depend du tier de l'abonnement** (Free, Starter, Professional, Enterprise) du compte HubSpot connecte.

Toutes utilisent la meme base URL `https://api.hubapi.com/`, le meme schema OAuth/Private App, les memes patterns CRUD/batch.

## Free Tier (80+ APIs)

Disponibles meme sur le plan gratuit :

- **CRM Core** : Contacts, Companies, Deals, Tickets, Custom Objects (lecture)
- **Activities** : Calls, Emails, Meetings, Notes, Tasks
- **Commerce** : Carts, Products, Orders, Discounts, Invoices
- **Content** : Pages, Posts, Blogs, URLs, Site Search
- **Infrastructure** : Properties, Pipelines, Schemas, **Webhooks**, Files
- **Account** : Audit Logs, Brands, Users, OAuth

## Marketing Hub

| Tier | APIs disponibles |
|------|------------------|
| **Starter** | Communication Preferences (v4), Goal Targets |
| **Professional** | Campaigns, Marketing Emails, Posts, Site Search, Transactional emails, HubDB, Automation |
| **Enterprise** | Events, Event Definitions, Brands, Advanced communication preferences |

### Endpoints cles

| Endpoint | Usage |
|----------|-------|
| `GET /marketing/v3/emails` | Liste des emails marketing |
| `POST /marketing/v3/emails/{id}/send-async` | Envoi transactionnel |
| `GET /marketing/v3/campaigns` | Campagnes |
| `POST /marketing/v3/forms/{formId}/submissions` | Soumissions formulaires |
| `GET /marketing/v3/transactional/single-email/send` | Envoi single email |
| `GET /communication-preferences/v4/subscriptions` | Subscriptions/optouts |

## Sales Hub

| Tier | APIs disponibles |
|------|------------------|
| **Starter** | Goal Targets |
| **Professional** | Forecasts, Forecast Types, Leads, Sequences, Workflows, Visitor Identification |
| **Enterprise** | Custom Objects, Schemas, Deal Splits, Advanced event tracking |

### Endpoints cles

| Endpoint | Usage |
|----------|-------|
| `GET /crm/v3/objects/leads` | CRM Leads (Sales Pro+) |
| `POST /automation/v4/sequences/enrollments` | Enrollments dans une sequence |
| `GET /crm/v3/objects/meetings` | Reunions planifiees |
| `POST /crm/v3/objects/calls` | Logger un appel |
| `GET /forecasting/v1/forecasts` | Forecasts |

## Service Hub

| Tier | APIs disponibles |
|------|------------------|
| **Professional** | Feedback Submissions, Automation V4, Goal Targets, Sequences |
| **Enterprise** | Custom Objects, Schemas, Events, Event Definitions |

### Endpoints cles

| Endpoint | Usage |
|----------|-------|
| `POST /crm/v3/objects/tickets` | Creer un ticket |
| `GET /feedback/v3/feedback-submissions` | NPS / surveys (Pro+) |
| `GET /crm/v3/pipelines/tickets` | Pipelines de support |

## Content Hub (ex-CMS Hub)

| Tier | APIs disponibles |
|------|------------------|
| **Starter** | Blog Settings, CMS Source Code, Posts, Tags, URL Redirects |
| **Professional** | HubDB, Site Search, Automation |
| **Enterprise** | Content Audit, Brands, Custom Objects, Schemas |

### Endpoints cles

| Endpoint | Usage |
|----------|-------|
| `GET /cms/v3/blogs/posts` | Articles de blog |
| `GET /cms/v3/pages/site-pages` | Pages du site |
| `GET /hubdb/api/v2/tables/{tableId}/rows` | HubDB rows (Pro+) |
| `GET /cms/v3/source-code/{environment}/content/{path}` | Source code module |
| `POST /cms/v3/url-redirects` | URL redirects |

## Commerce Hub

Complete les APIs e-commerce de base avec :

- Subscriptions (recurring billing)
- Invoices avancees
- Quote workflows
- Tax management

### Endpoints cles

| Endpoint | Usage |
|----------|-------|
| `GET /crm/v3/objects/subscriptions` | Abonnements |
| `POST /commerce/v3/quotes` | Quotes/devis |
| `GET /crm/v3/objects/invoices` | Factures |

## Operations Hub / Data Hub

Disponible Pro/Enterprise avec :

- Custom Code Actions dans les workflows (cron, transformations)
- Datasets / Data Sync
- Data quality rules

## Smart CRM (transverse)

APIs de plateforme :

- **Pipelines** : `GET /crm/v3/pipelines/{objectType}`
- **Schemas** : `GET /crm/v3/schemas`
- **Owners** : `GET /crm/v3/owners`
- **Properties Groups** : `GET /crm/v3/properties/{objectType}/groups`
- **Audit Logs** : `GET /audit-logs/v3/logs`

## Conversations API

Pour brancher une boite de chat externe ou lire les conversations :

| Endpoint | Usage |
|----------|-------|
| `GET /conversations/v3/conversations/threads` | Threads |
| `POST /conversations/v3/conversations/threads/{id}/messages` | Envoyer message |
| `GET /conversations/v3/conversations/inbox` | Inbox |

## Patterns Recommandes

- **Detecter le tier du compte** au moment du linking (via `/integrations/v1/me`) pour ne proposer que les fonctionnalites accessibles.
- **Encapsuler les calls dans une couche d'abstraction** "feature flag par tier" pour eviter les 403 en production.
- **Lire la doc tier-by-tier** : un endpoint Pro retournera 403 sur un compte Starter avec un message peu explicite.
- **Marketing Emails transactionnels** necessitent un add-on payant separe — verifier le scope `transactional-email`.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| Hardcoder un endpoint Enterprise | 403 sur la majorite des comptes | Detecter le tier d'abord |
| Ignorer Marketing Email API throttle | Anti-spam HubSpot bloque | Respecter quotas par jour/heure |
| Storer les pipelines en cache infini | Modifications en console pas reflectees | TTL ~1h max |
| Custom Objects pour tout | Quotas couteux | Utiliser objets standards quand possible |

## Sources

- [APIs by Tier (HubSpot officiel)](https://developers.hubspot.com/apisbytier) — table complete tier par tier
- [Hubspot Marketing Hub API Essential Guide (Rollout)](https://rollout.com/integration-guides/hubspot-marketing-hub/api-essentials) — endpoints Marketing detailles
- [Understanding HubSpot API Endpoints](https://www.hyphadev.io/blog/understanding-hubspot-api-endpoints) — vue transverse
- [API Integrations in HubSpot: A Beginner Guide (SmartBug)](https://www.smartbugmedia.com/blog/hubspot-api-integrations-guide) — patterns par hub
