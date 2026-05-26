# Google Ads MCP — Integration avec Claude Code

## Table des Matieres

1. [Vue d'ensemble MCP Google Ads](#vue-densemble-mcp-google-ads)
2. [Comparaison des implementations](#comparaison-des-implementations)
3. [MCP Officiel Google](#mcp-officiel-google)
4. [MCP cohnen (open source populaire)](#mcp-cohnen-open-source-populaire)
5. [MCP Composio (managed)](#mcp-composio-managed)
6. [Cas d'usage avec Claude](#cas-dusage-avec-claude)
7. [Securite et limitations](#securite-et-limitations)

## Vue d'Ensemble MCP Google Ads

Le **Model Context Protocol (MCP)** permet a Claude (et autres LLMs) d'interagir avec Google Ads en **langage naturel**. Au lieu de naviguer dans les dashboards ou ecrire du code GAQL, tu poses des questions a Claude qui execute les outils MCP.

**Capacites typiques** :
- Lister les comptes Google Ads accessibles
- Analyser performance de campagnes / ad groups / keywords
- Executer des requetes GAQL personnalisees
- Generer des rapports CSV/JSON
- (Selon implementation) Modifier des elements (creer listes, gerer audiences)

## Comparaison des Implementations

| Implementation | Type | Read/Write | Self-hosted | Best for |
|----------------|------|------------|-------------|----------|
| **Google Officiel** | Reference | Read-only (v1) | Oui | Production, securite max |
| **cohnen/mcp-google-ads** | Open source | Read | Oui | Bricoleurs, flexibilite |
| **johnoconnor0/google-ads-mcp** | Open source | Read + Write | Oui | Multi-LLM (Claude, ChatGPT, Gemini) |
| **Composio** | Managed | Read + Write limite | Non (SaaS) | Setup rapide, OAuth gere |
| **Adzviser** | Managed | Read | Non (SaaS) | Non-developpeurs |
| **Markifact** | Managed | Read | Non (SaaS) | Marketing teams |

## MCP Officiel Google

Source : `developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server`

### Authentification

Trois methodes :
- **OAuth 2.0** (Client ID + Secret)
- **Service Account** (JSON key)
- **Application Default Credentials** via Google Cloud

### Outils Disponibles (v1, Read-Only)

| Tool | Fonction |
|------|----------|
| `list_accessible_customers` | Liste les Google Ads customer IDs accessibles |
| `search` | Execute une requete GAQL (Google Ads Query Language) |
| `get_resource_metadata` | Recupere metadata sur les types de ressources |

**Limitation v1** : pas de write operations (impossible de modifier bids, pause campagnes, creer assets).

### Setup Local (Claude Code)

Configuration dans `~/.claude/settings.json` ou `claude_desktop_config.json` :

```json
{
  "mcpServers": {
    "google-ads-mcp": {
      "command": "pipx",
      "args": [
        "run",
        "--spec",
        "git+https://github.com/googleads/google-ads-mcp.git",
        "google-ads-mcp"
      ],
      "env": {
        "GOOGLE_PROJECT_ID": "YOUR_PROJECT_ID",
        "GOOGLE_ADS_DEVELOPER_TOKEN": "YOUR_DEVELOPER_TOKEN"
      }
    }
  }
}
```

### Prerequis

- **Developer Token** : 22 caracteres, demande via Google Ads MCC
- **Google Cloud Project** active avec API Google Ads
- **OAuth credentials** ou Service Account JSON

### Deploiement Cloud Run (production)

1. Build Docker image via Cloud Build
2. Deploy avec env vars : `GOOGLE_PROJECT_ID`, `GOOGLE_ADS_DEVELOPER_TOKEN`
3. Set `FASTMCP_HOST=0.0.0.0` pour connexions externes
4. Configurer client MCP avec `httpUrl` vers endpoint Cloud Run

## MCP cohnen (Open Source Populaire)

Source : `github.com/cohnen/mcp-google-ads`

### Outils Disponibles

| Tool | Fonction |
|------|----------|
| `list_accounts` | Liste tous les comptes Google Ads |
| `execute_gaql_query` | Execute une requete GAQL custom |
| `get_campaign_performance` | Metrics de campagne sur periodes |
| `get_ad_performance` | Analyse efficacite creatives |
| `run_gaql` | GAQL avec format CSV/JSON/table |

### Installation

```bash
# 1. Clone repo
git clone https://github.com/cohnen/mcp-google-ads.git
cd mcp-google-ads

# 2. Setup Python venv
python -m venv .venv
source .venv/bin/activate

# 3. Install deps
pip install -r requirements.txt

# 4. Config env
cp .env.example .env
# Editer .env avec credentials
```

### Config Claude Desktop

```json
{
  "mcpServers": {
    "googleAdsServer": {
      "command": "/PATH/TO/.venv/bin/python",
      "args": ["/PATH/TO/google_ads_server.py"],
      "env": {
        "GOOGLE_ADS_CREDENTIALS_PATH": "/PATH/TO/credentials.json",
        "GOOGLE_ADS_DEVELOPER_TOKEN": "YOUR_TOKEN",
        "GOOGLE_ADS_LOGIN_CUSTOMER_ID": "YOUR_MANAGER_ID"
      }
    }
  }
}
```

### Exemples de Requetes

```
"Show my top campaigns from the last 30 days"
"Analyze keyword performance where impressions exceed 1,000"
"Generate a performance report for ad group X in CSV format"
"Which keywords have a Quality Score below 5?"
```

## MCP Composio (Managed)

Source : `composio.dev/toolkits/googleads/framework/claude-code`

### Avantages

- **OAuth gere** : pas besoin de configurer Google Cloud Project
- **Tool Router** : decouverte automatique des outils
- **Multi-comptes** : gestion utilisateurs simple
- **Setup en 5 min**

### Setup avec Claude Code

```bash
# 1. Install Claude Code (si pas deja fait)
curl -fsSL https://claude.ai/install.sh | bash

# 2. Install Composio
pip install composio-core python-dotenv

# 3. Config .env
echo "COMPOSIO_API_KEY=your_key" >> .env
echo "USER_ID=your_user_id" >> .env

# 4. Generer MCP URL (Python)
python -c "
from composio import Composio
import os
client = Composio(api_key=os.getenv('COMPOSIO_API_KEY'))
session = client.create(user_id=os.getenv('USER_ID'), toolkits=['googleads'])
print(session.mcp.url)
"

# 5. Register dans Claude Code
claude mcp add --transport http googleads-composio "YOUR_MCP_URL" \
  --headers "X-API-Key:YOUR_KEY"
```

### Outils Composio

- `Create customer list` — Cree une liste pour campagnes ciblees
- `Get Campaign By ID` — Detail campagne par ID
- `Get campaign by name` — Recherche par nom
- `Get customer lists` — Liste les audiences existantes
- `Add or remove to customer list` — Gestion membres

### Authentification

Au premier appel d'outil, Claude redirige vers le navigateur pour OAuth Google Ads. Une fois authentifie, les sessions persistent.

## Cas d'Usage avec Claude

### Analyse Performance

```
User: "Quelles sont mes 5 campagnes avec le pire CPA ce mois-ci ?"

Claude:
[execute_gaql_query]
SELECT campaign.name, metrics.cost_micros, metrics.conversions,
       metrics.cost_per_conversion
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
ORDER BY metrics.cost_per_conversion DESC
LIMIT 5

→ Retourne et synthetise
```

### Audit Quality Score

```
User: "Donne-moi tous mes keywords avec Quality Score <= 4"

Claude:
[execute_gaql_query]
SELECT ad_group_criterion.keyword.text,
       ad_group_criterion.quality_info.quality_score,
       campaign.name
FROM keyword_view
WHERE ad_group_criterion.quality_info.quality_score <= 4
ORDER BY ad_group_criterion.quality_info.quality_score
```

### Diagnostic Cross-Campagne

```
User: "Compare le ROAS de mes campagnes Search vs Performance Max"

Claude utilise plusieurs queries + synthese.
```

### Generation de Rapports

```
User: "Genere un rapport CSV de toutes mes campagnes actives avec
       impressions, clics, conversions, CPA pour ce trimestre"

Claude execute query + sauvegarde fichier local.
```

## Securite et Limitations

### Securite

- **Tokens** : developer token, OAuth client secret, et service account JSON sont **sensibles**. Stocker dans :
  - `.env` avec `.gitignore`
  - Secrets manager cloud pour production
  - JAMAIS dans le code source ou le repo
- **Scopes minimum** : limiter les permissions OAuth au strict necessaire
- **Audit** : Composio et autres SaaS chiffrent at-rest et in-transit, mais verifier compliance interne avant production

### Limitations 2026

| Limitation | Detail |
|------------|--------|
| **Read-only par defaut** | MCP officiel v1 ne fait que lire |
| **Pas de write atomique** | Pas de transactions, modifs sequentielles |
| **Rate limits** | API Google Ads : 15K ops/jour standard |
| **GAQL learning curve** | Necessite connaitre Google Ads Query Language |
| **Latence** | Quelques secondes par query (pas temps reel UI) |
| **Pas tous les write ops** | Certaines operations ne sont pas exposees (asset library, smart bidding tuning) |

### Quand NE PAS Utiliser MCP

- Modifications massives (preferer scripts Google Ads natifs)
- Workflows visuels (interface Google Ads reste superieure)
- Setup initial de compte (UI guide, MCP n'est pas onboarding)

## Recommandation 2026

| Contexte | Implementation recommandee |
|----------|---------------------------|
| **Projet pro / production** | MCP Officiel Google self-hosted |
| **Setup rapide / freelance** | Composio Claude Code integration |
| **Multi-LLM (Claude + Cursor)** | cohnen/mcp-google-ads |
| **Equipe marketing non-tech** | Adzviser ou Markifact |

## Sources

- [Google Ads MCP Server official docs (Google)](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server) — Reference officielle
- [GitHub cohnen/mcp-google-ads](https://github.com/cohnen/mcp-google-ads) — Implementation populaire
- [Composio Google Ads + Claude Code](https://composio.dev/toolkits/googleads/framework/claude-code) — Solution managed
- [GitHub johnoconnor0/google-ads-mcp](https://github.com/johnoconnor0/google-ads-mcp) — Implementation multi-LLM
- [Markifact Google Ads MCP](https://www.markifact.com/google-ads-mcp) — Comparatif solutions
- [How to Connect Claude Code to Google Ads using MCP (Metaflow AI)](https://metaflow.life/blog/connect-claude-desktop-google-ads-model-context-protocol) — Tutoriel Claude Desktop
