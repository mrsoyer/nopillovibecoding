# 04 — Fonctionnalites Claude Code par Plan

## Table des matieres

- [Fonctionnalites communes a tous les plans payants](#fonctionnalites-communes-a-tous-les-plans-payants)
- [Fenetres de contexte](#fenetres-de-contexte)
- [Difference Max vs Team Premium vs Enterprise](#difference-max-vs-team-premium-vs-enterprise)
- [Exclusivites Enterprise pour Claude Code](#exclusivites-enterprise-pour-claude-code)

## Fonctionnalites communes a tous les plans payants

Tous les plans payants (Pro, Max 5x, Max 20x, Team Standard, Team Premium, Enterprise) donnent acces aux fonctionnalites coeur de Claude Code :

- **CLI terminal** : `claude` en ligne de commande
- **IDE plug-ins** : VS Code, JetBrains
- **Desktop / Web app** : agent SDK + Claude Code
- **Modeles** : Opus 4.7, Sonnet 4.6, Haiku 4.5
- **Extended thinking** : raisonnement long
- **MCP (Model Context Protocol)** : connecteurs externes
- **Sub-agents** : delegation a des agents specialises
- **Hooks** : automation des evenements (PreToolUse, PostToolUse, etc.)
- **Slash commands** : commandes custom + skills
- **Memoire CLAUDE.md** : contexte de projet persistant
- **Cowork** : delegation multi-step depuis Desktop

## Fenetres de contexte

Depuis mars 2026 (annonce Opus 4.6) :

| Plan | Fenetre contexte Claude Code (Opus 4.6+) |
|------|------------------------------------------|
| Free | Non concerne (Claude Code indisponible) |
| Pro | 200K standard, **1M en overage paye** |
| Max 5x | **1M** (inclus, no surcharge) |
| Max 20x | **1M** (inclus, no surcharge) |
| Team Standard | **1M** (inclus) |
| Team Premium | **1M** (inclus) |
| Enterprise | **1M** Claude Code + **500K** sur Claude chat |

> "Max, Team (both Standard and Premium seats), and Enterprise users on Opus 4.6 automatically get a 1 million token context window in Claude Code with no additional configuration and no long-context pricing surcharge."

Implication concrete : un repo de taille moyenne (~50k lignes) tient dans une seule session sans chunking.

## Difference Max vs Team Premium vs Enterprise

Cote **Claude Code core**, les trois plans sont quasi-equivalents en capacite technique. La difference est sur la couche organisationnelle.

| Capacite Claude Code | Max 5x/20x | Team Premium | Enterprise |
|----------------------|-----------|--------------|------------|
| CLI + IDE | Oui | Oui | Oui |
| MCP servers (user-defined) | Oui | Oui | Oui |
| Sub-agents | Oui | Oui | Oui |
| Hooks | Oui | Oui | Oui |
| Slash commands / skills | Oui | Oui | Oui |
| Modeles Opus/Sonnet/Haiku | Oui | Oui | Oui |
| 1M context | Oui (Opus 4.6+) | Oui | Oui |
| Background tasks | Oui | Oui | Oui |
| GitHub native integration | Oui | Oui | Oui (centralise admin) |
| Acces prioritaire nouveaux modeles | Oui | Oui | Oui |

### Difference de gouvernance

| Critere | Max | Team Premium | Enterprise |
|---------|-----|--------------|------------|
| Configuration centralisee Claude Code | Non | Limitee | **Oui** (policy enforcement org-wide) |
| Restriction tools/MCP par admin | Non | Limitee | **Oui** |
| File access restrictions par admin | Non | Non | **Oui** |
| Deploy MCP servers org-wide | Non | Non | **Oui** |
| Usage analytics Claude Code | Non | Basique | **Avance** (lines accepted, accept rate, patterns) |

## Exclusivites Enterprise pour Claude Code

Source : [Claude Code for Enterprise](https://claude.com/product/claude-code/enterprise).

### Deploiement
- **Anthropic Cloud (SaaS)** : par defaut
- **Amazon Bedrock** : BYO infrastructure AWS
- **Google Cloud Vertex AI** : BYO infrastructure GCP
- **Microsoft Foundry** : BYO infrastructure Azure
- **VPC isolation** : private endpoints disponibles

Aucun autre plan ne donne acces a Bedrock/Vertex/Foundry pour Claude Code.

### Securite
- **TLS 1.3** en transit, **AES-256** au repos
- **SOC 2 Type II** gouvernance
- **SSO** : Okta, Azure AD, ou tout SAML 2.0
- **SCIM** : provisioning/de-provisioning automatique
- **Fine-grained role-based permissions**
- **Bring Your Own Keys** sur les 3 clouds

### Monitoring & Observability
- **Contribution Metrics Dashboard** : patterns, PRs, lignes acceptees
- **OpenTelemetry export** : pousse les metrics Claude Code vers ta stack observability
- **Cost tracking** integre (tokens + spending) sans integration custom
- **Compliance API** : acces programmatique aux donnees d'usage

### Administration centralisee
- Configurer Claude Code **centralement** pour toute l'org
- Controler les **tool permissions** disponibles aux users
- Restreindre l'**acces fichiers** par repo
- Setup les **MCP servers** depuis un panel admin unique
- Spend limits org + per-user
- Selective data deletion via Compliance API

### Donnees
- "We do not train Claude on your Enterprise data" (garanti contractuellement)
- ZDR (Zero Data Retention) en option (addendum)
- Custom data retention controls
- HIPAA-ready (sales-assisted only) — note : Claude Code lui-meme n'est PAS couvert par l'offre HIPAA-ready, c'est une exclusion explicite

## Ce que Max a en MOINS qu'Enterprise

| Manque | Impact pour solo dev |
|--------|----------------------|
| Pas d'admin console | OK, tu es seul |
| Pas de SSO/SCIM | OK, login direct |
| Pas d'audit logs | Pas de tracabilite formelle |
| Pas de ZDR/HIPAA | Aucune donnee patient/regulee |
| Pas de Bedrock/Vertex | Tu paies via Anthropic direct |
| Pas d'OpenTelemetry | Pas de metrics observability |
| Pas de policy enforcement | Tes settings sont locaux |

## Ce que Max a en PLUS qu'Enterprise (cote pratique)

| Avantage | Impact |
|----------|--------|
| Forfait fixe | Predictibilite cout 100% |
| Pas de minimum sieges | Tu commences seul |
| Quota inclus | Pas besoin de gerer un budget API |
| Setup zero | Login = pret |
| Acces immediat prioritaire nouveaux modeles | Idem Enterprise mais sans negotiation contrat |

## Sources

- [Claude Code for Enterprise](https://claude.com/product/claude-code/enterprise)
- [Anthropic News — Claude Code on Team and Enterprise](https://www.anthropic.com/news/claude-code-on-team-and-enterprise)
- [Claude Help Center — Claude Code with Team/Enterprise](https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan)
- [Anthropic — Claude Code product page](https://www.anthropic.com/claude-code)
