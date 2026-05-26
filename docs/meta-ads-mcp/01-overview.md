# 01 - Overview MCP Meta Ads

## Qu'est-ce qu'un MCP

Le **Model Context Protocol** (MCP) est un standard ouvert (initie par Anthropic) qui expose des APIs externes a un assistant IA via un serveur intermediaire. L'IA peut ainsi appeler des "outils" structures (tools) pour lire ou modifier des donnees externes : ici, les comptes publicitaires Meta.

## Pourquoi un MCP Meta Ads

Sans MCP, un media buyer doit basculer entre Claude et Ads Manager, copier-coller des chiffres, retaper des prompts. Avec un MCP Meta Ads, Claude peut :

- Lire les performances en temps reel (impressions, ROAS, CTR, frequency)
- Creer / mettre a jour campagnes, ad sets, ads
- Uploader des creatives et generer des A/B tests
- Comparer audiences (lookalike vs interets vs custom)
- Detecter creative fatigue, anomalies, opportunites
- Generer rapports clients en langage naturel

## Ecosysteme MCP Meta Ads (mai 2026)

### Categorie 1 : Officiel Meta

| Solution | Lance | Modele | Outils |
|----------|-------|--------|--------|
| **Meta Ads MCP** (officiel) | 29 avril 2026 | OAuth Business, hosted | 29 outils |
| **Meta CLI** (officiel) | 29 avril 2026 | Binaire CLI npm | Equivalent CLI |

Endpoint officiel : `https://mcp.facebook.com/ads`

### Categorie 2 : Tiers commerciaux SaaS

| Solution | Auth | Multi-plateforme | Pricing |
|----------|------|------------------|---------|
| **Pipeboard** | OAuth + token | Meta + Google + TikTok | Free tier + premium |
| **Adzviser** | OAuth no-code | Meta + Google | $0.99 trial -> $34.99/mo |
| **Composio (metaads)** | OAuth managed | 100+ apps | Pay-per-call |
| **Windsor.ai** | OAuth | 50+ connecteurs | $19/mo |
| **Flyweel** | OAuth 2.1 | Meta + Google + TikTok + CRM | Free unlimited |

### Categorie 3 : Open source self-hosted

| Repo | Stack | Outils | Use case |
|------|-------|--------|----------|
| `pipeboard-co/meta-ads-mcp` | Python (uvx) | 29-31 | Production write-access |
| `brijr/meta-mcp` | Node (npx) | 25 | Dev custom + OAuth refresh |
| `gomarble-ai/facebook-ads-mcp-server` | Python | ~20 | Read/manage |
| `RamsesAguirre777/facebook-ads-library-mcp` | FastMCP | 15+ | Veille concurrentielle (Ad Library) |
| `trypeggy/facebook-ads-library-mcp` | TypeScript | ~10 | Ad Library + batch |
| `Enriquefft/meta-cli` | Go | CLI + MCP | Dev tooling |

## Read-only vs Read-Write

**Read-only** (Ad Library MCPs, Adzviser snapshot, Flyweel) : pas de risque de modifier les comptes clients par erreur. Securise pour analyse.

**Read-Write** (Pipeboard, brijr, Meta officiel write scope) : Claude peut creer / modifier / pauser. Exige supervision et idealement campagnes en `PAUSED` par defaut a la creation.

## Point cle pour Nopillo

Le **lancement officiel du MCP Meta** (29 avril 2026) change la donne. Auparavant, chaque agence devait creer une Meta Developer App, passer App Review (3-5 jours, voire +), gerer Standard vs Advanced Access et Business Verification. Maintenant, l'OAuth Business standard (le meme qu'utilise Shopify ou Mailchimp) suffit. Plus de developer app a maintenir.

Voir [07-meta-api-app-review.md](./07-meta-api-app-review.md) pour les details du contournement.

## Sources

Voir [sources.md](./sources.md).
