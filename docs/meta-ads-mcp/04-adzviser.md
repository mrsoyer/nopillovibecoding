# 04 - Adzviser (no-code OAuth)

## Identite

- **Site** : [adzviser.com](https://adzviser.com)
- **Page integration Meta** : [adzviser.com/connect/meta-ads-to-claude-integration](https://adzviser.com/connect/meta-ads-to-claude-integration)
- **Modele** : SaaS no-code, MCP managed
- **Cible** : marketers / consultants non developpeurs

## Proposition de valeur

Adzviser supprime totalement l'aspect technique : pas d'App Meta a creer, pas de tokens a gerer, pas de YAML/JSON. L'utilisateur cree un workspace, connecte ses comptes Meta via OAuth Adzviser, choisit Claude comme destination, et peut requeter en langage naturel en moins de 5 minutes.

## Setup en 4 etapes

1. Creation compte Adzviser (trial 14j a $0.99)
2. Connexion source de donnees -> Meta Ads (OAuth managed)
3. Selection destination -> Claude
4. Requetage dans Claude

Pas une seule ligne de config locale.

## Capacites

| Categorie | Exemples |
|-----------|----------|
| Budget pacing | Suivi quotidien vs cible mensuelle |
| Creative fatigue | Frequence vs declin perf |
| Audience optimization | Lookalike vs interets vs custom |
| Placement intelligence | FB feed vs IG Reels vs Audience Network |
| Attribution | Cross-funnel awareness->conversion |

Le MCP est **read-only / snapshot** : Claude lit et analyse, mais ne modifie pas les campagnes.

## Destinations supportees

- Claude (focus principal via MCP)
- ChatGPT
- Google Sheets / Excel
- Looker Studio
- Power BI

## Pricing

| Plan | Tarif |
|------|-------|
| Trial 14j | $0.99 |
| Pro | $34.99 / mois |
| Enterprise | sur devis |

Inclus : connexions Meta illimitees, requetes MCP illimitees.

## Securite

- OAuth managed Adzviser (pas de partage token brut)
- Encryption at rest et in transit
- Pas d'acces backend client expose

## Forces / faiblesses

| Plus | Moins |
|------|-------|
| Setup < 5 min | Read-only (pas de write) |
| Aucune competence dev | $34.99/mo vs $0 open source |
| Multi-destinations | Profondeur analytique limitee (snapshot) |
| Pas de Meta Developer App | Pas d'attribution avancee |
| OAuth managed -> securite client | Vendor lock-in |

## Verdict pour Nopillo

Adzviser est pertinent si :

- Les consultants media buyers ne veulent pas toucher au terminal
- Le besoin est **lecture/reporting** (pas write)
- Le client paye un abonnement low-touch sans developpement

Adzviser est moins pertinent si :

- Le workflow exige creation/modification de campagnes via IA
- Il faut analyses avancees (cohortes, attribution multi-touch)
- Volume eleve de comptes (cout cumule)

Pour Nopillo, Adzviser peut servir de **pont initial** pendant la formation des consultants au MCP officiel ou Pipeboard.

## Concurrents directs no-code

| Solution | Differenciation |
|----------|----------------|
| **Composio (metaads)** | Marketplace 100+ apps, OAuth managed, pay-per-call |
| **Windsor.ai** | Attribution avancee, 50+ connecteurs, $19/mo |
| **Flyweel** | Free unlimited, Meta+Google+TikTok+CRM, 9.8/10 dans comparatifs |
| **Ryze** | Agent autonome multi-compte, per-client isolation |

## Sources

Voir [sources.md](./sources.md).
