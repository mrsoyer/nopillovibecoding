# Meta Ads MCP - Documentation Nopillo

> Documentation de reference sur les serveurs MCP Meta Ads et leur integration dans Claude Code.

## Contexte

Les serveurs Model Context Protocol (MCP) permettent a Claude Code, Claude Desktop, Cursor et autres clients IA de piloter directement Meta Ads (Facebook + Instagram) en langage naturel : creation de campagnes, analyse des performances, gestion des creatives, optimisation budgetaire.

Pour Nopillo (agence Meta Ads + automatisation IA), choisir le bon MCP est strategique : impact direct sur la productivite des consultants media buyers, sur la securite des comptes clients, et sur la valeur ajoutee delivree.

## Sommaire

| Fichier | Contenu |
|---------|---------|
| [01-overview.md](./01-overview.md) | Qu'est-ce qu'un MCP Meta Ads, ecosysteme, vue panoramique |
| [02-pipeboard.md](./02-pipeboard.md) | Pipeboard - le MCP open-source le plus installe |
| [03-meta-mcp-opensource.md](./03-meta-mcp-opensource.md) | brijr/meta-mcp + autres MCP open source (Ads Library, GoMarble) |
| [04-adzviser.md](./04-adzviser.md) | Adzviser - solution no-code OAuth pour non-developpeurs |
| [05-comparatif.md](./05-comparatif.md) | Matrice capacites, cout, setup, securite |
| [06-setup-claude-code.md](./06-setup-claude-code.md) | Configuration concrete dans Claude Code |
| [07-meta-api-app-review.md](./07-meta-api-app-review.md) | Process App Review Meta, scopes, Standard vs Advanced Access |
| [sources.md](./sources.md) | Sources et references |

## Recommandation Nopillo (TL;DR)

| Usage | MCP recommande |
|-------|----------------|
| **Production agence (multi-clients)** | **MCP officiel Meta** (lance avril 2026) - OAuth Business, pas d'App Review, granulaire |
| **Power user / dev interne** | **Pipeboard** (29-31 outils, write access, remote MCP) |
| **Veille concurrentielle** | **facebook-ads-library-mcp** (RamsesAguirre777, gratuit, 15+ outils) |
| **Consultants non techniques** | **Adzviser** (no-code, $0.99 trial) |

Le MCP officiel Meta (sortie 29 avril 2026) supprime le besoin d'App Review et de developer app : c'est la voie standard pour Nopillo en 2026.

## Date

Documentation a jour au **5 mai 2026**.
