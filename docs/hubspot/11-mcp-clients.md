# HubSpot MCP — Configuration par Client

## Vue d'Ensemble

Tous les clients MCP recents supportent les serveurs HubSpot. Les details de configuration varient mais le pattern reste le meme : pointer vers `mcp.hubspot.com` (Remote) ou installer via `hs mcp setup` (Developer).

## Claude Desktop / Claude.ai

### Connecteur officiel

HubSpot fournit un **connecteur officiel** pour Claude (au-dela du MCP brut), gere depuis le portail Claude :

1. Dans Claude.ai : **Settings → Connectors**
2. Chercher **HubSpot**
3. Cliquer **Connect**
4. Authoriser via OAuth dans HubSpot
5. Le connecteur expose automatiquement les tools du Remote MCP Server

### Configuration manuelle MCP (claude_desktop_config.json)

Pour Claude Desktop avec config manuelle :

```json
{
  "mcpServers": {
    "hubspot": {
      "url": "https://mcp.hubspot.com",
      "transport": "streamable-http"
    }
  }
}
```

Emplacement du fichier :
- macOS : `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows : `%APPDATA%\Claude\claude_desktop_config.json`

Restart Claude Desktop apres modification.

## Claude Code

### Remote MCP Server

```bash
claude mcp add hubspot --url https://mcp.hubspot.com --transport streamable-http
```

Verification :

```bash
claude mcp list
# ou dans le chat :
/mcp
```

### Developer MCP Server

```bash
hs mcp setup
# Selectionner "Claude Code" dans le wizard
```

## Cursor

### Remote MCP Server

1. **Settings → Cursor Settings**
2. **Tools & MCP** dans la sidebar
3. **Add new MCP server** :

```json
{
  "name": "hubspot",
  "url": "https://mcp.hubspot.com",
  "transport": "streamable-http"
}
```

4. Cursor lance le flow OAuth automatiquement
5. Verifier dans **Installed MCP Servers** : `hubspot` doit etre visible

### Developer MCP Server

```bash
hs mcp setup
# Selectionner "Cursor" dans le wizard
```

Apparait sous le nom **HubSpotDev** dans la liste des servers.

## ChatGPT

ChatGPT supporte MCP via les **Custom Connectors** (plan business+) :

1. **Settings → Connectors → Add custom**
2. URL : `https://mcp.hubspot.com`
3. Type : OAuth 2.1 + PKCE
4. ChatGPT gere le flow OAuth

Une fois connecte, demander en langage naturel : "Liste mes deals fermes ce mois", "Cree un contact avec ces infos", etc.

## Windsurf

1. **Cascade settings → MCP servers**
2. **Add server** :

```json
{
  "hubspot": {
    "url": "https://mcp.hubspot.com",
    "transport": "streamable-http"
  }
}
```

3. OAuth flow automatique
4. Tools disponibles dans Cascade

### Developer MCP

```bash
hs mcp setup
# Selectionner "Windsurf"
```

## VS Code

### Prerequis

Installer la commande `code` dans le PATH (necessaire pour `hs mcp setup` Developer) :

1. VS Code → Cmd+Shift+P
2. "Shell command: Install 'code' command in PATH"

### Remote MCP via extension MCP

```json
// settings.json
{
  "mcp.servers": {
    "hubspot": {
      "url": "https://mcp.hubspot.com",
      "transport": "streamable-http"
    }
  }
}
```

### Developer MCP

```bash
hs mcp setup
# Selectionner "VS Code"
```

## Gemini CLI

```bash
hs mcp setup
# Selectionner "Gemini CLI"
```

Pour Remote, configurer via le fichier de config Gemini :

```json
{
  "mcpServers": [
    {
      "name": "hubspot",
      "url": "https://mcp.hubspot.com"
    }
  ]
}
```

## Codex CLI

```bash
hs mcp setup
# Selectionner "Codex CLI"
```

## Make (workflow automation)

Make expose un **MCP Client** integre. Pour connecter HubSpot MCP :

1. Creer un scenario Make
2. Ajouter le module **MCP Client**
3. URL : `https://mcp.hubspot.com`
4. Authentifier avec OAuth
5. Selectionner les tools a appeler

Permet d'orchestrer des workflows avec d'autres apps Make + HubSpot via MCP.

## Composio (toolkit cross-LLM)

[Composio](https://composio.dev) propose une couche d'abstraction pour utiliser HubSpot MCP avec n'importe quel framework agent (LangChain, CrewAI, AutoGen, etc.) :

```python
from composio import ComposioToolSet, App

toolset = ComposioToolSet()
tools = toolset.get_tools(apps=[App.HUBSPOT])
# Use with any LLM framework
```

## Tableau recapitulatif

| Client | Remote MCP | Developer MCP | OAuth gere par |
|--------|-----------|---------------|---------------|
| Claude Desktop | Connecteur ou config JSON | N/A | Claude |
| Claude Code | `claude mcp add` | `hs mcp setup` | Claude |
| Cursor | Settings UI | `hs mcp setup` | Cursor |
| ChatGPT | Custom Connector | N/A | ChatGPT |
| Windsurf | Settings UI | `hs mcp setup` | Windsurf |
| VS Code | settings.json | `hs mcp setup` | VS Code/extension |
| Gemini CLI | Config file | `hs mcp setup` | Gemini |
| Codex CLI | Config file | `hs mcp setup` | Codex |
| Make | Module integre | N/A | Make |
| Composio | SDK | N/A | Composio |

## Patterns Recommandes

- **Toujours utiliser le connecteur officiel** quand disponible (Claude, ChatGPT) plutot que la config MCP brute : meilleure UX, OAuth simplifie.
- **Documenter dans l'equipe** quels comptes HubSpot sont connectes a quel client (eviter les actions accidentelles cross-environnement).
- **Tester en sandbox HubSpot** avant de connecter le compte production a un agent IA.
- **Limiter les scopes** au moment de l'authorize : meme si l'app MCP en demande beaucoup, l'admin peut affiner.
- **Auditer regulierement** les apps connectees : **HubSpot Settings → Integrations → Connected Apps**.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| Compte HubSpot perso pour MCP equipe | Decouplage user / actions impossible | Compte dedie integration |
| Pas de revoke apres tests | App connectee oubliee | Revoke des installations test |
| Stocker le client_secret en clair en JSON | Compromission | Secret manager + env vars |
| Connecter Production sans Sandbox d'abord | Risque actions destructives | Tester en sandbox |
| Ignorer les MAJ de scopes | Tools manquants apres update | Reinstaller l'app pour autoriser nouveaux scopes |

## Troubleshooting

| Probleme | Cause typique | Solution |
|----------|--------------|----------|
| `hubspot` ne demarre pas dans le client | OAuth incomplet | Verifier la redirect URL dans l'app MCP |
| Tools list vide | Scopes manquants | Re-authoriser l'app avec scopes a jour |
| Erreur "Invalid redirect URI" | Mismatch entre app et client | Aligner exactement les URLs |
| 403 sur write actions | User HubSpot sans permission | Mettre a jour le role du user |
| Activities non listees | Sensitive Data activee globalement | Settings HubSpot → Privacy & Consent |

## Sources

- [Set up and use the HubSpot connector for Claude](https://knowledge.hubspot.com/integrations/set-up-and-use-the-hubspot-connector-for-claude) — connecteur Claude officiel
- [Hubspot MCP Integration with Claude Code (Composio)](https://composio.dev/toolkits/hubspot/framework/claude-code) — Claude Code setup
- [HubSpot - Complete Cursor MCP Server Guide](https://cursormcp.dev/mcp-servers/595-hubspot) — Cursor setup
- [How to connect your agents to a HubSpot MCP via Claude Code (Merge)](https://www.merge.dev/blog/hubspot-mcp-claude-code) — patterns Claude Code
- [How to connect Hubspot to Claude Cowork (Composio)](https://composio.dev/toolkits/hubspot/framework/claude-cowork) — Claude Cowork
- [Use Hubspot from your MCP Client (Speakeasy)](https://www.speakeasy.com/mcp/using-mcp/mcp-server-providers/hubspot) — multi-client
- [MCP Client and HubSpot CRM Integration (Make)](https://www.make.com/en/integrations/mcp-client/hubspotcrm) — Make integration
