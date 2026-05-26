# Claude Max vs Claude Enterprise — Documentation Reference

> Comparaison complete des plans Claude Max (5x / 20x) et Claude Enterprise (incluant le sous-tier Team Premium souvent appele "Premium") pour l'usage de Claude Code.

**Avertissement terminologie** : "Claude Entreprise Premium" est un terme ambigu. Anthropic ne commercialise PAS de plan nomme exactement comme ca. Il existe :
- **Claude Enterprise** : plan organisation (custom pricing, $20/seat + usage API)
- **Claude Team Premium seat** : sous-tier du plan Team ($100-125/seat/mois) — c'est generalement ce que les gens appellent "Premium"

Ce dossier couvre les deux interpretations.

## Sommaire

| Fichier | Contenu |
|---------|---------|
| [01-overview.md](01-overview.md) | Vue d'ensemble + clarification du vocabulaire "Premium" |
| [02-pricing.md](02-pricing.md) | Tarifs detailles (Max 5x/20x vs Team Premium vs Enterprise) |
| [03-usage-limits.md](03-usage-limits.md) | Limites d'usage Claude Code (sessions, hebdo, modeles) |
| [04-claude-code-features.md](04-claude-code-features.md) | Fonctionnalites Claude Code par plan (1M context, IDE, MCP, etc.) |
| [05-admin-security.md](05-admin-security.md) | Admin console, SSO, SCIM, audit logs, ZDR, conformite |
| [06-decision-guide.md](06-decision-guide.md) | Quand choisir Max vs Team Premium vs Enterprise |
| [sources.md](sources.md) | Toutes les sources consolidees |

## TL;DR

- **Max 5x ($100/mo)** = solo dev, 5x usage du Pro, fenetres rolling 5h, sans contraintes admin.
- **Max 20x ($200/mo)** = power user solo, 20x usage du Pro, ideal pour sessions Claude Code longues.
- **Team Premium ($100-125/seat/mo, min 5 sieges)** = equipe avec admin console, SSO, et un budget par siege similaire a Max.
- **Enterprise ($20/seat + usage API, min 20-50 sieges)** = grande org regulee : SCIM, audit logs, ZDR, HIPAA, contexte 500K-1M, deploy Bedrock/Vertex/Foundry, OpenTelemetry.

**Pour Claude Code specifiquement** : Max et Team Premium ont les MEMES capacites techniques (1M context Opus 4.6, IDE, MCP, sub-agents, hooks). La difference est l'enveloppe (admin, SSO, billing). Enterprise ajoute compliance/security/deploiement enterprise.

Sources : 16 pages web consultees le 2026-05-26 (8 WebSearch + 8 WebFetch en parallele).
