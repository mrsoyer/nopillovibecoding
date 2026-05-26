# HubSpot MCP — Remote Server (donnees CRM)

## Vue d'Ensemble

Le **Remote MCP Server** est un endpoint hoste par HubSpot a `https://mcp.hubspot.com` qui permet a tout client MCP compatible OAuth 2.1 + PKCE de lire et ecrire dans le CRM via des outils normalises.

C'est l'equivalent d'un "connecteur HubSpot universel" pour Claude, Cursor, ChatGPT, Windsurf, etc.

## Prerequis

- Un compte HubSpot (admin pour la premiere installation)
- Acces a la **nouvelle Developer Platform** HubSpot
- Un client MCP compatible OAuth 2.1 + PKCE

## Setup : creer une MCP Auth App

1. Dans HubSpot : **Development** → **MCP Auth Apps**
2. **Create MCP auth app** (en haut a droite)
3. Renseigner :
   - **App name** : nom visible
   - **Description** (optionnelle)
   - **Redirect URL** : URL OAuth de votre client (ex : `http://localhost:6274/oauth/callback/debug` pour MCP Inspector)
   - **Icon** (optionnel)
4. **Save** : l'app genere `client_id` et `client_secret`

La premiere redirect URL configuree sera utilisee comme defaut.

## Connexion depuis un client MCP

Configuration generique (a adapter selon le client) :

```json
{
  "mcpServers": {
    "hubspot": {
      "url": "https://mcp.hubspot.com",
      "transport": "streamable-http",
      "auth": {
        "type": "oauth2",
        "client_id": "...",
        "client_secret": "...",
        "redirect_uri": "...",
        "pkce": true
      }
    }
  }
}
```

**Note** : La plupart des clients (Claude Desktop, Cursor) gerent le flow OAuth + PKCE en interne — pas besoin de coder le challenge.

## Liste complete des tools

Le serveur expose **~13 tools** repartis en 3 familles :

### CRM Objects

| Tool | Role | Type |
|------|------|------|
| `get_user_details` | Recupere l'utilisateur HubSpot connecte | Read |
| `search_crm_objects` | Recherche complexe sur contacts/deals/companies/tickets | Read |
| `get_crm_objects` | Recupere des objets par ID | Read |
| `manage_crm_objects` | Cree, met a jour, supprime des objets CRM | Write |

### Properties & Schemas

| Tool | Role | Type |
|------|------|------|
| `search_properties` | Trouve des properties par nom/mot-cle | Read |
| `get_properties` | Recupere les definitions de properties | Read |

### Owners

| Tool | Role | Type |
|------|------|------|
| `search_owners` | Recherche les owners (sales reps, support agents) | Read |

### Campaigns (Marketing)

| Tool | Role | Type |
|------|------|------|
| `get_campaign_analytics` | Metriques des campagnes | Read |
| `get_campaign_asset_metrics` | Metriques par asset (email, page, etc.) | Read |
| `get_campaign_contacts_by_type` | Contacts d'une campagne par type | Read |

### Organisation & Feedback

| Tool | Role | Type |
|------|------|------|
| `get_organization_details` | Infos sur le compte HubSpot | Read |
| `submit_feedback` | Envoyer un feedback a HubSpot sur le serveur MCP | Write |
| `tool_guidance` | Auto-documentation : aide LLM a choisir le bon tool | Meta |

## Acces accorde

### Read access

- **CRM Records** : contacts, companies, deals, tickets, users, carts, invoices, orders, line items, products, quotes, subscriptions, segments (lists)
- **Activities** : calls, emails, meetings, notes, tasks
- **Content/Marketing** : blog posts, landing pages, site pages, campaigns, marketing events

### Write access

- **CRM Records** : contacts, companies, deals, tickets, line items, products
- **Activities** : calls, emails, meetings, notes, tasks

Les actions write **respectent les permissions du user HubSpot** connecte.

## Authentification : OAuth 2.1 + PKCE detaille

PKCE est **obligatoire**. Si votre client gere OAuth en interne (Claude, Cursor, ChatGPT), tout est transparent. Sinon implementer manuellement :

```javascript
// 1. Generer code_verifier
const code_verifier = base64url(crypto.randomBytes(32));

// 2. Deriver code_challenge
const code_challenge = base64url(sha256(code_verifier));

// 3. Lancer authorize
const authUrl = `https://app.hubspot.com/oauth/authorize?
  client_id=${CLIENT_ID}&
  redirect_uri=${REDIRECT_URI}&
  scope=${SCOPES}&
  code_challenge=${code_challenge}&
  code_challenge_method=S256`;

// 4. Apres redirect, echanger code contre tokens
const tokens = await fetch('https://api.hubapi.com/oauth/2026-03/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    code: authCode,
    redirect_uri: REDIRECT_URI,
    code_verifier: code_verifier
  })
}).then(r => r.json());
```

## Test avec MCP Inspector

L'outil officiel pour tester un serveur MCP :

1. `npx @modelcontextprotocol/inspector` (lance localement)
2. Configurer :
   - **Transport Type** : Streamable HTTP
   - **URL** : `https://mcp.hubspot.com/`
   - **Client ID** + **Client secret** depuis votre app
   - **Redirect URL** : `http://localhost:6274/oauth/callback/debug`
3. Cliquer **Open Auth Settings** → **Guided OAuth Flow**
4. Suivre les etapes (copier les codes d'auth si demande)
5. Retour au panel principal → **Connect**
6. **List Tools** pour voir tous les outils disponibles
7. Tester `get_user_details` pour valider

## Limitations

- **Sensitive Data Properties** custom : non accessibles via MCP
- **Si Sensitive Data globalement active** : activities (calls, emails, meetings, notes, tasks) bloquees
- **Pas de vector search** : utilise la CRM Search API standard
- **Reinstall apres update de scopes** : si l'app MCP gagne de nouveaux tools/scopes, les utilisateurs doivent reinstaller pour autoriser

## Patterns Recommandes

- **Compte HubSpot dedie au MCP** avec permissions limitees (pas admin global).
- **Audit log a activer** : tracer les `manage_crm_objects` pour traçabilite.
- **Property scoping** : si possible, exclure les properties sensibles via configuration HubSpot.
- **Test avec MCP Inspector avant production** pour valider le setup OAuth.
- **Documenter les prompts approuves** : eviter le "free for all" sur les writes.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| Compte admin pour MCP | Erreur LLM = casse production | Compte read-only ou role limite |
| Redirect URL en HTTP | OAuth refuse | HTTPS obligatoire en production |
| Scopes `*` | Risque d'ecriture incontrolee | Scopes minimaux par tool utilise |
| Pas de PKCE | OAuth refuse | PKCE obligatoire |
| Cache infini des tokens | Refresh tokens single-use rotates | Recevoir et stocker le nouveau refresh a chaque rotation |
| MCP pour ETL | Mauvais cas d'usage | API REST batch |

## Troubleshooting

| Probleme | Cause typique | Solution |
|----------|--------------|----------|
| `invalid_grant` | Code expire ou refresh token revoque | Recommencer le flow d'auth |
| Tool list vide | Scopes insuffisants | Verifier la config de l'app MCP |
| 403 sur write | User HubSpot sans droit | Donner les bonnes permissions au user |
| Activities introuvables | Sensitive Data active | Verifier le settings du compte |
| Redirect URI mismatch | Config app != client | Aligner les URL exactement |

## Sources

- [HubSpot MCP Server (officiel)](https://developers.hubspot.com/mcp) — page principale
- [Integrate AI tools with the HubSpot MCP server](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server) — setup detaille Remote
- [HubSpot MCP server - 13 tools (Speakeasy)](https://www.speakeasy.com/product/mcp-gateway/catalog/hubspot) — liste des tools
- [HubSpot MCP Server: AI Agent Integration Guide](https://www.digitalapplied.com/blog/hubspot-mcp-server-ai-agent-integration-guide) — patterns integration
- [HubSpot MCP Server Setup in 2026 (Easy Guide)](https://generect.com/blog/hubspot-mcp-server-setup/) — tutoriel setup
- [Use Hubspot from your MCP Client (Speakeasy)](https://www.speakeasy.com/mcp/using-mcp/mcp-server-providers/hubspot) — connection depuis differents clients
