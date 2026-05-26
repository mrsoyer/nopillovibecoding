# HubSpot MCP — Vue d'Ensemble

## Qu'est-ce que MCP

**Model Context Protocol (MCP)** est un standard open ouvert (par Anthropic) qui permet a un agent LLM (Claude, ChatGPT, Cursor, Windsurf, etc.) de **demander du contexte** ou **executer des actions** sur des systemes externes via une interface unifiee — l'equivalent d'un "USB-C pour l'IA".

Au lieu de coder a la main une integration entre chaque LLM et chaque service externe, MCP standardise le protocole : un meme serveur MCP est utilisable par n'importe quel client compatible.

## Les deux serveurs MCP HubSpot

HubSpot expose **deux serveurs MCP distincts**, chacun pour un cas d'usage different.

### 1. Remote MCP Server (donnees CRM)

| Aspect | Detail |
|--------|--------|
| URL | `https://mcp.hubspot.com` |
| Type | Hosted par HubSpot |
| Audience | Utilisateurs business + agents IA |
| Auth | OAuth 2.1 + PKCE |
| Statut 2026 | **Generalement disponible** |
| Use case | Donner a Claude/Cursor/ChatGPT acces conversationnel au CRM |

Permet a un assistant IA de lire (et ecrire) des contacts, deals, tickets, engagements, campagnes, etc.

### 2. Developer MCP Server (CLI local)

| Aspect | Detail |
|--------|--------|
| URL | local (CLI `hs mcp setup`) |
| Type | Process local |
| Audience | Developpeurs HubSpot |
| Auth | Auth via HubSpot CLI |
| Statut 2026 | Disponible depuis Developer Platform v2025.2 |
| Use case | Aider l'IA a developper apps/CMS sur HubSpot |

Donne a l'IA des outils pour scaffolder des projets, generer des schemas, deployer des apps, debugger du code CMS HubL.

## Comparaison rapide

| Critere | Remote Server | Developer Server |
|---------|--------------|------------------|
| Hebergement | HubSpot | Local |
| Donnees accessibles | CRM, Marketing, Content | Dev tooling, schemas, code |
| Ideal pour | Sales/Marketing/Support ops | Developers |
| Setup | Creer "MCP Auth App" | `hs mcp setup` |
| Authentification | OAuth 2.1 + PKCE | CLI tokens HubSpot |
| Clients compatibles | Tout client OAuth+PKCE | Claude Code, Cursor, VS Code, Windsurf, Codex CLI, Gemini CLI |

## Modele de securite

### Permissions

- **Heritees du compte HubSpot** : un user qui n'a pas acces aux deals dans HubSpot ne pourra pas y acceder via MCP.
- **Heritees des scopes de l'app** : meme si l'utilisateur a les permissions, l'app MCP doit avoir demande les scopes correspondants.
- **Pas d'acces aux Sensitive Data Properties** : les properties marquees "sensitives" (PII, sante, etc.) sont **bloquees** au niveau MCP.
- **Si Sensitive Data est active sur le compte** : les activites (calls, emails, meetings, notes, tasks) sont **completement bloquees** via MCP.

### OAuth 2.1 + PKCE

Le Remote Server impose **PKCE** (Proof Key for Code Exchange) :

1. Le client genere un `code_verifier` aleatoire (43-128 chars)
2. Derive un `code_challenge = SHA256(code_verifier)` en base64url
3. Envoie `code_challenge` + `code_challenge_method=S256` dans la requete d'authorize
4. Lors de l'echange code → token, envoie le `code_verifier` original

PKCE protege contre l'interception du code d'autorisation, indispensable pour les clients publics.

### Refresh token rotation

Chaque refresh consomme l'ancien refresh token et en genere un nouveau (single-use). Limite la fenetre d'exploitation en cas de fuite.

## Donnees accessibles via Remote Server

### Read & Write

- **CRM Records** : contacts, companies, deals, tickets, line items, products
- **Engagements** : calls, emails, meetings, notes, tasks
- **E-commerce** : carts, orders, invoices, quotes, subscriptions, segments

### Read Only

- **Organisationnel** : users, teams, owners, roles, seats, reporting structures
- **Marketing/Content** : campaigns + metrics, landing pages, website pages, blog posts, marketing events

## Cas d'usage MCP

### Avec Remote Server

| Cas | Exemple |
|-----|---------|
| Lookup conversationnel | "Cherche tous les deals fermes ce mois-ci dans le pipeline Enterprise" |
| Mise a jour rapide | "Marque le contact john@example.com comme MQL" |
| Synthese | "Resume les notes des 5 derniers calls avec Acme Corp" |
| Reporting ad-hoc | "Combien de tickets sont ouverts depuis plus de 7 jours sur le brand X ?" |
| Enrichissement | "Ajoute un note sur ce deal avec le compte rendu de la reunion" |

### Avec Developer Server

| Cas | Exemple |
|-----|---------|
| Scaffolding | "Cree-moi une app HubSpot avec un module CMS et un workflow custom" |
| Schema design | "Genere un schema custom object pour gerer les abonnements premium" |
| Debug HubL | "Pourquoi ce module HubL ne rend pas la variable contact ?" |
| Deploy | "Deploie cette app en mode developpement sur le sandbox" |

## Compatibilite clients

Tout client supportant **MCP + OAuth 2.1 avec PKCE** :

- **Claude** (Code, Desktop, Cowork)
- **Cursor**
- **ChatGPT** (avec connector)
- **Windsurf**
- **VS Code** (avec extension)
- **Gemini CLI**
- **Codex CLI**
- **Make** (workflow automation)
- **Composio** (toolkit cross-LLM)

## Limites actuelles

- Pas d'acces aux Sensitive Data Properties (custom)
- Pas de PHI (donnees de sante)
- Pas de vector search natif (utilise CRM Search API)
- Activites bloquees si Sensitive Data globalement active sur le compte
- Les utilisateurs doivent **reinstaller l'app** apres ajout de nouveaux scopes

## Patterns Recommandes

- **MCP = lecture conversationnelle**, pas un remplacement d'API REST pour des integrations transactionnelles a haut volume.
- **Donner les permissions minimales** au compte HubSpot connecte (principle of least privilege).
- **Auditer les actions write** dans les logs HubSpot (audit log API).
- **Combiner les deux serveurs** quand on developpe : Developer pour le code, Remote pour tester avec des donnees reelles.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| Connecter MCP avec un compte admin | Risque ecriture massive sur erreur LLM | Compte avec permissions limitees |
| Pas de revue humaine sur les `manage_crm_objects` | Suppression accidentelle | Validation manuelle pour writes |
| MCP pour synchroniser 100k contacts | Pas le cas d'usage | API REST batch + webhooks |
| Confondre Remote et Developer Server | Mauvais outil | Remote = donnees, Developer = dev |

## Sources

- [HubSpot MCP (officiel)](https://developers.hubspot.com/mcp) — page d'entree des deux serveurs
- [Remote HubSpot MCP server is now generally available](https://developers.hubspot.com/changelog/remote-hubspot-mcp-server-is-now-generally-available) — annonce GA
- [The HubSpot MCP Server - available in Public Beta](https://developers.hubspot.com/changelog/mcp-server-beta) — beta initiale
- [What Is MCP? The USB-C for AI, Explained](https://vantagepoint.io/blog/sf/integrations/what-is-mcp-model-context-protocol-explained) — vulgarisation MCP
- [How to Connect HubSpot to AI Agents with MCP](https://vantagepoint.io/blog/hs/hubspot-mcp-ai-agents-practical-guide) — patterns pratiques
- [Plug In and Power Up: 10 AI Use Cases Enabled by MCP](https://huble.com/blog/hubspot-mcp-ai-use-cases) — exemples concrets
