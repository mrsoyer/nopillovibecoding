# 02 - Pipeboard Meta Ads MCP

## Identite

- **Repo** : [github.com/pipeboard-co/meta-ads-mcp](https://github.com/pipeboard-co/meta-ads-mcp)
- **Editeur** : Pipeboard (San Francisco)
- **Statut** : Le MCP Meta tiers le plus installe pre-lancement officiel
- **Licence** : Business Source License 1.1 (devient Apache 2.0 le 1er janvier 2029)
- **Endpoint hosted** : `https://mcp.pipeboard.co/meta-ads-mcp`

## Sommaire

- [Modes de deploiement](#modes-de-deploiement)
- [Outils (29-31)](#outils-29-31)
- [Capacites cles](#capacites-cles)
- [Authentification](#authentification)
- [Pricing](#pricing)
- [Forces / faiblesses](#forces--faiblesses)

## Modes de deploiement

### Remote MCP (recommande)

Aucun setup local. Pipeboard heberge le serveur, l'utilisateur connecte son compte Meta via OAuth Pipeboard.

### Local self-hosted

```bash
git clone https://github.com/pipeboard-co/meta-ads-mcp.git
cd meta-ads-mcp
uv pip install -e .
export PIPEBOARD_API_TOKEN=your_token
```

Transports supportes : **stdio** (defaut Claude Desktop), **streamable HTTP** (web apps custom).

### Pipeboard CLI (alternative)

Binaire unifie Meta + Google + TikTok, ~50ms de demarrage, ideal pour coding agents.

```bash
brew install pipeboard-co/tap/pipeboard
```

## Outils (29-31)

### Comptes (3)

`get_ad_accounts`, `get_account_info`, `get_account_pages`

### Campagnes (3 + budget)

`get_campaigns`, `get_campaign_details`, `create_campaign`, `update_campaign`, `create_budget_schedule`

### Ad Sets (3)

`get_adsets`, `get_adset_details`, `create_adset`, `update_adset` (frequency caps inclus)

### Ads (3)

`get_ads`, `get_ad_details`, `create_ad`, `update_ad`

### Creatives & medias (5)

`get_ad_creatives`, `upload_ad_image`, `create_ad_creative`, `update_ad_creative`, `get_ad_image`

### Insights (2)

`get_insights` (avec breakdowns age/gender/country), `bulk_get_insights` (multi-comptes)

### Targeting (5-6)

`search_interests`, `get_interest_suggestions`, `validate_interests`, `estimate_audience_size`, `search_behaviors`, `search_demographics`, `search_geo_locations`

### Premium - Duplication (4)

`duplicate_campaign`, `duplicate_adset`, `duplicate_ad`, `duplicate_creative`

### Recherche unifiee (1)

`search` (accounts + campaigns + ads + pages)

## Capacites cles

- **OUTCOME-based objectives** (awareness, traffic, engagement, leads, sales, app)
- **Bid strategies** : `LOWEST_COST_WITHOUT_CAP`, `LOWEST_COST_WITH_BID_CAP`, `COST_CAP`, `LOWEST_COST_WITH_MIN_ROAS`
- **Visualisation creatives** integree (`get_ad_image` retourne preview)
- **Bulk operations** smart-cached (3-5s sur multi-comptes)
- **Budget scheduling** pour pics saisonniers

## Authentification

| Mode | Usage |
|------|-------|
| OAuth interactif Pipeboard | UX consumer, click "Connect" |
| Token URL (`?token=pk_...`) | Integration cote backend |
| Bearer header | `Authorization: Bearer pk_...` (recommande) |
| Token cache local | self-hosted, secure on-device |

Tokens generes sur `pipeboard.co/api-tokens`.

## Pricing

| Tier | Outils | Tarif |
|------|--------|-------|
| **Free** | 25+ outils core | $0 |
| **Premium** | + Duplication suite + bulk insights | non publie |

Limites : 200 calls/h cote API Meta (plafond plateforme, pas Pipeboard).

## Forces / faiblesses

### Forces

- Le plus complet en write-access tiers (29-31 outils)
- Remote MCP zero-setup (URL unique)
- Support large : Claude Desktop, Cursor, Cherry Studio, OpenClaw
- Open source consultable
- CLI complementaire pour devs

### Faiblesses

- Meta only (pas Google ni TikTok dans le MCP - faut le CLI)
- BSL 1.1 limite l'usage SaaS competitif jusqu'en 2029
- Pas de per-client token isolation native (probleme pour agences avec >20 clients)

## Sources

Voir [sources.md](./sources.md).
