# CDC — Audit Formations & Best Practices Claude Code 2026

> Audit complet de l'ecosysteme Claude Code en 2026 : formations (France + international), best practices officielles Anthropic, architecture (MCP/Skills/Subagents/Hooks), et recommandations selon profil. Livrable : referentiel decisionnel pour choisir formation, structurer un workflow, et industrialiser Claude Code en equipe.

## Contexte

| Element | Valeur |
|---|---|
| Demande utilisateur | "Recherches sur formations Claude Code + best practices + audit complet" |
| Date audit | 2026-05-05 |
| Maturite Claude Code | Production-ready (lance 2024, Academy officielle mars 2026) |
| Adoption marche | 73% equipes ingenierie utilisent IA coding quotidiennement (fev 2026) |
| Croissance | VS Code extension : 17.7M -> 29M installs/jour (jan-fev 2026) |

## Stack detecte

Le projet hote (`/Users/thomas/webflowlanding/`) utilise :

| Layer | Technologie |
|---|---|
| Plateforme | Webflow + Webflow MCP |
| Framework Claude | SYM v4.8 (47 agents : 28 projet + 19 framework) |
| Skills disponibles | cdc-maker, doc-maker, skill-maker, find-docs, simplify, claude-api, etc. |
| MCP installes | webflow, supabase, context7, doctrine, lemlist, n8n, pappers, hubspot |

Le CDC est donc **adapte au workflow SYM existant** : les taches references les agents SYM disponibles plutot que des executeurs generiques.

## Objectifs de l'audit

| Objectif | Metrique | Cible |
|---|---|---|
| Cartographier formations FR eligibles CPF/Qualiopi | Nb formations identifiees | >= 8 |
| Cartographier formations internationales | Nb plateformes | >= 5 |
| Documenter best practices officielles | Nb pratiques compilees | >= 20 |
| Expliciter architecture extensions | 5 piliers couverts | MCP + Skills + Subagents + Hooks + CLAUDE.md |
| Recommandations par profil | Nb personae adressees | >= 4 |

## Phases

| Phase | Description | Livrables | Effort | Statut |
|---|---|---|---|---|
| **P0 — Recherche** | Web search + fetch sources officielles | 4 recherches + 2 fetches | XS | DONE |
| **P1 — Compilation** | Synthese formations + best practices | Fichiers 02 + 03 | M | DONE (ce CDC) |
| **P2 — Architecture** | Decoder MCP/Skills/Subagents/Hooks | Fichier 04 | M | DONE |
| **P3 — Recommandations** | Parcours par profil | Fichier 05 | S | DONE |
| **P4 — Plan d'action** | Roadmap mise en application | Fichier 06 | S | DONE |

## Index

| Fichier | Contenu | Lignes |
|---|---|---|
| [01-contexte.md](01-contexte.md) | Vision, scope, methodologie de l'audit | ~80 |
| [02-formations-audit.md](02-formations-audit.md) | Formations FR (Human Coders, BGB, NoCode IA, PLB, Sparks, Alfie, formation-claudecode) + International (Anthropic Academy, Coursera, Udemy, Vanderbilt) | ~250 |
| [03-best-practices.md](03-best-practices.md) | 20+ best practices officielles Anthropic : context, prompting, plan mode, verification, fan-out | ~270 |
| [04-architecture.md](04-architecture.md) | 5 piliers d'extension : CLAUDE.md, Skills, Subagents, Hooks, MCP — quand utiliser quoi | ~220 |
| [05-recommandations.md](05-recommandations.md) | Parcours par profil (debutant, dev senior, equipe, entreprise) + comparatif final | ~180 |
| [06-taches.md](06-taches.md) | Plan d'execution : appliquer l'audit au projet (creer skills, hooks, CLAUDE.md, etc.) | ~200 |
| [sources.md](sources.md) | 30+ sources web consolidees | ~80 |

## Resume executif (TL;DR)

**1. Pour apprendre Claude Code en 2026, l'ordre optimal est :**
1. Anthropic Academy (gratuit, 13 cours) -> [Skilljar](https://anthropic.skilljar.com/)
2. Cours Coursera "Claude Code in Action" (gratuit) ou Vanderbilt "Software Engineering with Generative AI Agents"
3. Pratique 2-4 semaines sur projet personnel
4. Approfondir via communaute (awesome-claude-code) + best practices officielles

**2. Pour formation finançable CPF en France :**
- Top 3 : **BGB Formation** (1490€HT, 2j, Qualiopi/CPF) | **Human Coders** (Qualiopi, Paris/Lyon/Bordeaux) | **NoCode IA Toulouse** (5j, vibe coding focus)
- Format entreprise : PLB, Sparks, Alfie Formation (par Paulin Reboul)

**3. Best practices critiques (top 5) :**
1. **Donner un moyen de verification** (tests, screenshots) -> +ROI immediat
2. **Explore -> Plan -> Code** (utiliser plan mode pour taches non-triviales)
3. **CLAUDE.md court et cible** (sinon Claude ignore les regles)
4. **Subagents pour la recherche** (preserve le contexte principal)
5. **`/clear` entre taches non-reliees** (eviter pollution contexte)

**4. Architecture decisionnelle :**
- **CLAUDE.md** = conventions persistantes (court !)
- **Skills** = workflows reutilisables (replace commands)
- **Subagents** = isoler le contexte (recherche, audit)
- **Hooks** = enforcement deterministe (lint, format)
- **MCP** = integration externe (DB, APIs)

## Documentation referencee

- [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) — MCP Webflow installe sur ce projet
- [docs/cdc-landing-improvement/_index.md](../cdc-landing-improvement/_index.md) — Refonte landing Webflow (en cours)
- [docs/formations-vibecoding-landing/_index.md](../formations-vibecoding-landing/_index.md) — Doc complementaire vibecoding general

## Prochaine etape recommandee

Demarrer **Wave 1 — P0** des taches : creer un `CLAUDE.md` projet optimise + activer 2 skills cles (`find-docs`, `simplify`) sur le projet `webflowlanding`. Voir [06-taches.md](06-taches.md).
