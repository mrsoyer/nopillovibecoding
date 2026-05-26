# 03 - MCP Open Source (brijr + ecosysteme)

## brijr/meta-mcp

- **Repo** : [github.com/brijr/meta-mcp](https://github.com/brijr/meta-mcp)
- **Stack** : Node.js / TypeScript
- **Licence** : MIT
- **Outils** : 25
- **Cible** : developpeurs voulant heberger leur propre MCP avec OAuth refresh automatique

### Installation

```bash
npm install -g meta-ads-mcp
```

### Config Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json` :

```json
{
  "mcpServers": {
    "meta-ads": {
      "command": "npx",
      "args": ["-y", "meta-ads-mcp"],
      "env": {
        "META_ACCESS_TOKEN": "your_access_token"
      }
    }
  }
}
```

### Variables d'environnement

| Variable | Role |
|----------|------|
| `META_ACCESS_TOKEN` | **requis** - token API Meta |
| `META_APP_ID` | App ID OAuth |
| `META_APP_SECRET` | Secret OAuth + appsecret_proof |
| `META_BUSINESS_ID` | scoping Business |
| `META_API_VERSION` | defaut `v23.0` |
| `META_AUTO_REFRESH` | refresh token auto |
| `META_REFRESH_TOKEN` | refresh flow |
| `META_MCP_REQUEST_TIMEOUT_MS` | timeout |
| `META_MCP_DEBUG` | logs verbeux |

### Outils (25, par categorie)

- **Analytics** (3) : `get_insights`, `compare_performance`, `export_insights`
- **Campagnes** (4) : `create_campaign`, `update_campaign`, `pause_campaign`, `resume_campaign`
- **Ad Sets** (2) : `create_ad_set`, `list_ad_sets`
- **Ads** (2) : `create_ad`, `list_ads`
- **Audiences** (4) : `list_audiences`, `create_custom_audience`, `create_lookalike_audience`, `get_audience_info`
- **Creatives** (2) : `list_ad_creatives`, `create_ad_creative`
- **Comptes** (3) : `health_check`, `get_ad_accounts`, `get_campaigns`
- **Auth** (1) : `get_token_info`
- **Diagnostics** (2) : `diagnose_campaign_readiness`, `check_account_setup`

### Forces / faiblesses

| Plus | Moins |
|------|-------|
| MIT (vs BSL Pipeboard) | Moins d'outils (25 vs 29-31) |
| Token refresh auto natif | Pas de remote hosted |
| `compare_performance` natif | Necessite Meta Developer App |
| `export_insights` JSON/CSV | Maintenance perso |

## Autres MCP Open Source Meta

### gomarble-ai/facebook-ads-mcp-server

Repo : [github.com/gomarble-ai/facebook-ads-mcp-server](https://github.com/gomarble-ai/facebook-ads-mcp-server)

Interface read + manage. Approche programmatique. Bonne alternative si brijr trop minimal.

### Enriquefft/meta-cli

Repo : [github.com/Enriquefft/meta-cli](https://github.com/Enriquefft/meta-cli)

CLI + MCP server unifies en Go. Tres rapide. Public visee : devs qui scriptent.

## MCP Facebook Ads Library (veille concurrentielle)

L'**Ads Library** est l'API publique Meta des publicites diffusees. Pas besoin d'acces aux comptes : on espionne legalement.

### RamsesAguirre777/facebook-ads-library-mcp

Repo : [github.com/RamsesAguirre777/facebook-ads-library-mcp](https://github.com/RamsesAguirre777/facebook-ads-library-mcp)

- **Stack** : FastMCP (Python)
- **Outils** : 15+
- **Licence** : MIT
- **Pricing** : 100% gratuit

#### Categories d'outils

| Categorie | Capacites |
|-----------|-----------|
| Search & Discovery | Filtres avances, decouverte concurrents, advertisers similaires |
| Deep Analysis | Analyse creative IA, KPIs, audience targeting inferee |
| Monitoring | Detection nouveaux ads en temps reel, estimation budget concurrent |
| Competitive Intel | Comparaison strategies multi-marques, benchmarks sectoriels |
| Prediction | Forecasting ML, generation rapports |
| Export | JSON, CSV, Markdown |

#### Use cases concrets

- "Analyse la strategie Facebook de Nike actuellement"
- "Compare Tesla et BMW"
- "Liste toutes les apps fitness qui ad sur Facebook"
- "Estime le spend mensuel de [concurrent]"

### trypeggy/facebook-ads-library-mcp

Repo : [github.com/trypeggy/facebook-ads-library-mcp](https://github.com/trypeggy/facebook-ads-library-mcp)

Approche batch processing : interroger plusieurs marques + plateformes en parallele. Video batch analysis avec ~88% d'economie de tokens. Smart credit management.

## Recommandation pour Nopillo

| Besoin | MCP open source |
|--------|-----------------|
| **Self-hosted production write** | brijr/meta-mcp (MIT, refresh auto) |
| **Self-hosted production read** | gomarble-ai |
| **Veille / audit concurrent** | RamsesAguirre777 (gratuit, le plus complet) |
| **Audit batch multi-clients** | trypeggy (batch + economies tokens) |

## Sources

Voir [sources.md](./sources.md).
