# 06 - Setup Claude Code pour chaque MCP

## Prerequis

- Claude Code installe : `curl -fsSL https://claude.ai/install.sh | bash`
- Node.js LTS : `node --version`
- Compte Meta Business (sauf MCP officiel : compte FB classique suffit pour tester)

## 1. MCP officiel Meta (recommande)

### Setup

Le MCP officiel utilise **OAuth Business**, pas de developer app.

```bash
claude mcp add --transport http meta-ads-official "https://mcp.facebook.com/ads"
```

Au premier lancement, Claude Code ouvre un navigateur OAuth Meta Business -> selection comptes ad + Pages -> permissions read-only ou read+write -> handshake.

### Test

Dans Claude Code :

```
Show me my Meta ad accounts
```

### Limites

- Beta publique depuis 29 avril 2026, tarification post-beta inconnue
- Pas de bid management sub-seconde
- Approche human-in-the-loop assumed

## 2. Pipeboard remote MCP

### Setup rapide (recommande)

```bash
claude mcp add --transport http pipeboard-meta "https://mcp.pipeboard.co/meta-ads-mcp"
```

OAuth Pipeboard au premier appel.

### Avec token direct

```bash
claude mcp add --transport http pipeboard-meta "https://mcp.pipeboard.co/meta-ads-mcp?token=pk_YOUR_TOKEN"
```

### Pipeboard self-hosted (uvx)

```bash
git clone https://github.com/pipeboard-co/meta-ads-mcp.git
cd meta-ads-mcp && uv pip install -e .
export PIPEBOARD_API_TOKEN=your_token
```

Config Claude Code (mcp.json) :

```json
{
  "mcpServers": {
    "meta-ads-local": {
      "command": "uvx",
      "args": ["meta-ads-mcp"],
      "env": {
        "PIPEBOARD_API_TOKEN": "your_token"
      }
    }
  }
}
```

## 3. brijr/meta-mcp (self-hosted)

### Prerequis : Meta Developer App

1. `developers.facebook.com` -> Create App (Business type)
2. Graph API Explorer -> generer token avec `ads_read`, `ads_management`, `business_management`
3. Token Debugger -> convertir short-lived (~1h) en long-lived (60j)
4. Recuperer Ad Account ID dans Ads Manager URL : `act_XXXXXXXXXX`

### Installation

```bash
npm install -g meta-ads-mcp
```

### Config Claude Code

```bash
claude mcp add -e META_ACCESS_TOKEN=YOUR_LONG_LIVED_TOKEN \
               -e META_AD_ACCOUNT_ID=act_XXXXXXXXXX \
               meta-ads-brijr -- npx -y meta-ads-mcp
```

Equivalent JSON (`~/Library/Application Support/Claude/claude_desktop_config.json` pour Desktop) :

```json
{
  "mcpServers": {
    "meta-ads": {
      "command": "npx",
      "args": ["-y", "meta-ads-mcp"],
      "env": {
        "META_ACCESS_TOKEN": "EAAxxxxx",
        "META_AD_ACCOUNT_ID": "act_1234567890",
        "META_API_VERSION": "v23.0",
        "META_AUTO_REFRESH": "true",
        "META_APP_ID": "your_app_id",
        "META_APP_SECRET": "your_app_secret"
      }
    }
  }
}
```

## 4. Adzviser (no-code via MCP managed)

Adzviser ne s'integre pas directement dans Claude Code via terminal : c'est une UI web ou Claude (Pro/Max) consomme via integration.

Setup :

1. `adzviser.com` -> creer compte
2. Workspace -> Source : Meta Ads (OAuth)
3. Destination : Claude
4. Dans Claude Pro : `claude.ai/settings/integrations` -> Add Integration -> URL fournie par Adzviser

Pour Claude Code en CLI, preferer Pipeboard ou Meta officiel.

## 5. Composio (multi-app managed)

```bash
claude mcp add --transport http metaads-composio \
  "YOUR_COMPOSIO_MCP_URL" \
  --headers "X-API-Key:YOUR_COMPOSIO_API_KEY"
```

Composio gere l'OAuth multi-clients via toolkit `metaads`.

## 6. Facebook Ads Library MCP (veille)

### RamsesAguirre777 (FastMCP Python)

```bash
git clone https://github.com/RamsesAguirre777/facebook-ads-library-mcp.git
cd facebook-ads-library-mcp
pip install -r requirements.txt
```

Config Claude Code :

```json
{
  "mcpServers": {
    "fb-ads-library": {
      "command": "python",
      "args": ["/path/to/facebook-ads-library-mcp/server.py"],
      "env": {
        "FB_ACCESS_TOKEN": "your_graph_api_token_with_ads_read"
      }
    }
  }
}
```

## Verification

```bash
claude mcp list
```

Doit afficher tous les MCP enregistres.

Test dans Claude Code :

```
List my Meta ad accounts
What's my CTR last 7 days on campaign X?
Compare frequency vs CPM on top 10 ad sets
```

## Troubleshooting

| Erreur | Cause probable | Solution |
|--------|---------------|----------|
| "MCP Server Not Found" | Binaire pas installe | `npm install -g meta-ads-mcp` |
| Auth error 401 | Token expire | Regenerer (long-lived 60j) |
| Rate limit 17 | 200 calls/h Meta | Attendre / batcher avec `bulk_get_insights` |
| Timeout | Reseau ou Meta degrade | `META_MCP_REQUEST_TIMEOUT_MS=60000` |
| `act_` prefix manque | ID mal formate | Toujours `act_` devant |

## Sources

Voir [sources.md](./sources.md).
