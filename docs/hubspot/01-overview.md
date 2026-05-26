# HubSpot — Vue d'Ensemble

## Vue d'Ensemble

HubSpot expose deux modes d'integration programmable :

1. **API REST publique** (`api.hubapi.com`) : pour integrations classiques entre systemes (back-end → HubSpot).
2. **Serveurs MCP** (`mcp.hubspot.com` + CLI local) : pour donner a un agent IA (Claude, Cursor, ChatGPT, etc.) un acces controle au CRM ou au Developer Platform.

Les deux mecanismes coexistent et utilisent OAuth, mais ils ne s'adressent pas aux memes cas d'usage.

## Quand utiliser quoi

| Besoin | Solution recommandee |
|--------|---------------------|
| Sync de contacts depuis votre back-end | API REST + Private App |
| Integration multi-comptes distribuee sur le Marketplace | API REST + OAuth 2.1 |
| Reception d'evenements CRM en temps reel | Webhooks API |
| Donner a un assistant IA un acces conversationnel au CRM | MCP Remote Server |
| Aider votre IA a developper sur la HubSpot Developer Platform | MCP Developer Server (CLI local) |
| Job batch quotidien de mise a jour | API REST + endpoints `/batch/` |

## Cartographie des APIs disponibles

L'API HubSpot est segmentee en familles fonctionnelles :

- **CRM API** : contacts, companies, deals, tickets, custom objects, line items, products, invoices, quotes, orders, carts, subscriptions
- **Marketing API** : forms, marketing emails, campaigns, blogs, landing pages, communication preferences
- **Sales API** : leads, sequences, forecasts, meetings, calls, engagements
- **Service API** : tickets, feedback submissions, knowledge base
- **Content / CMS API** : pages, blog posts, HubDB, URL redirects, source code
- **Commerce API** : orders, payments, invoices, products, line items
- **Conversations API** : threads, messages, channels
- **Webhooks API** : subscriptions aux evenements CRM et conversations
- **Settings API** : users, teams, owners, properties, pipelines, schemas, audit logs
- **Files API** : upload et gestion d'assets

Toutes ces APIs partagent la meme base URL `https://api.hubapi.com/` et la meme authentification OAuth/Private App.

## Cartographie MCP

HubSpot fournit **deux serveurs MCP distincts** :

| Serveur | Type | Audience | Acces |
|---------|------|----------|-------|
| **Remote MCP Server** | Hosted (`mcp.hubspot.com`) | Utilisateurs business/agents IA | Lecture/ecriture CRM, marketing, content |
| **Developer MCP Server** | Local (CLI) | Developpeurs HubSpot | Scaffolding apps, CMS dev, schemas |

Le Remote Server est en disponibilite generale depuis 2026 et compatible avec Claude, Cursor, ChatGPT, Windsurf et tout client MCP supportant OAuth 2.1 + PKCE.

## Anti-Patterns

- **Utiliser encore les API keys** — depreciees depuis le 30 novembre 2022, a remplacer par OAuth ou Private App tokens.
- **Polling repetitif** au lieu d'utiliser les Webhooks pour la reactivite temps reel.
- **Appeler l'API endpoint par endpoint** au lieu d'utiliser les `/batch/` endpoints (jusqu'a 100 records par requete, divise les calls par 100).
- **Confondre les deux serveurs MCP** : Remote = donnees CRM, Developer = outils de dev.

## Sources

- [HubSpot Developers](https://developers.hubspot.com/) — portail officiel
- [APIs by Tier](https://developers.hubspot.com/apisbytier) — disponibilite par abonnement
- [HubSpot MCP](https://developers.hubspot.com/mcp) — page MCP officielle
