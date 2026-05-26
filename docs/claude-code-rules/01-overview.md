# Vue d'Ensemble — Les Mecanismes de Contexte Claude Code

## Le Probleme

Chaque session Claude Code commence avec une **fenetre de contexte vide**. Pour donner du contexte projet, Claude Code propose 5 mecanismes complementaires. Bien les choisir est la difference entre un agent fiable et un agent qui derive.

## Les 5 Mecanismes

| Mecanisme | Chargement | Pour quoi | Token cost |
|-----------|-----------|-----------|------------|
| **CLAUDE.md** | Chaque session, integral | Regles universelles projet (stack, conventions) | Recurrent |
| **`.claude/rules/`** | Chaque session, filtrable par `paths:` | Regles par domaine (frontend, backend, feature) | Recurrent (filtre) |
| **`.claude/skills/`** | A la demande (fuzzy match description) | Workflows reutilisables, procedures multi-etapes | Conditionnel |
| **`.claude/agents/`** (subagents) | Delegation explicite ou auto | Taches isolees qui floodent le contexte | Isole |
| **Hooks** (settings.json) | Lifecycle events (deterministique) | Actions garanties (lint, validation, blocs) | Externe au modele |

## Decision Matrix

| Besoin | Choix | Pourquoi |
|--------|-------|----------|
| Une regle vraie pour TOUT le projet, TOUTE session | `CLAUDE.md` | Chargee partout |
| Une regle qui ne s'applique qu'a `front/**` ou `supabase/**` | `.claude/rules/[nom].md` avec `paths:` | Filtree par fichier touche |
| Une procedure repetable (deploy, audit, PR) | `.claude/skills/[nom]/SKILL.md` | Charge a la demande seulement |
| Du contexte specifique a UNE page ou UN block | `.claude/rules/front/[nom].md` avec `paths:` | Granularite fichier |
| Une recherche/exploration qui flood le contexte | Subagent (Task tool) | Contexte separe |
| Une action qui DOIT s'executer (lint, format) | Hook PreToolUse / PostToolUse | Deterministique |

## Ordre de Chargement (au demarrage)

1. **Managed policy** CLAUDE.md (IT/DevOps, le plus haut)
2. **User** `~/.claude/CLAUDE.md` (preferences personnelles)
3. **Project** `./CLAUDE.md` (regles equipe versionnees)
4. **Local** `./CLAUDE.local.md` (personnel, gitignored)
5. **Imports** `@path/file.md` (depth max 5)
6. **Rules** `.claude/rules/*.md` (recursif, sans `paths:` = global, avec `paths:` = conditionnel)

Les fichiers CLAUDE.md des sous-dossiers chargent **a la demande** quand Claude lit un fichier dans ce sous-dossier.

## Priorites de Contexte

Les regles dans `.claude/rules/` recoivent **la meme priorite haute que CLAUDE.md**. Elles ne sont pas "moins importantes" — elles sont juste **scopables**.

## Pourquoi 5 Mecanismes et Pas 1 ?

- **Token budget** : un CLAUDE.md de 1200 lignes consomme ~42K tokens par session. Modulariser via rules + skills reduit jusqu'a 94%.
- **Adherence** : passer 200 lignes degrade l'adherence de Claude aux regles (cf. context-guardian check #1).
- **Separation des responsabilites** : ce qui change souvent (rules par feature) vs ce qui est stable (CLAUDE.md projet).

## Sources

- [How Claude remembers your project](https://code.claude.com/docs/en/memory) — Specs officielles
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Patterns officiels
- [Mental model: Skills, Subagents, Plugins](https://levelup.gitconnected.com/a-mental-model-for-claude-code-skills-subagents-and-plugins-3dea9924bf05) — Quand utiliser quoi
