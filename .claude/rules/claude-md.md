---
paths:
  - "CLAUDE.md"
---

# Regles pour CLAUDE.md (racine workspace)

## Taille
- Maintenir CLAUDE.md < 80 lignes. Au-dela l'adherence chute (cf. context-guardian check #1).
- Sortir le detail dans `docs/cdc-*/` et linker depuis CLAUDE.md.

## Structure obligatoire
- Premiere ligne : `# CLAUDE.md — webflowlanding workspace`.
- Rappel regles MCP critiques dans les **3 premieres lignes ET 3 dernieres lignes** (primacy/recency).
- Sections : Regles critiques, Workspace, Projet actif, Project IDs, Conventions, Commandes utiles, Cibles de perf, Documentation, MCPs configures, Rappels recency.

## Anti-patterns
- Pas de schema DB inline (> 10 lignes SQL) — sortir dans `.claude/rules/back/`.
- Pas de "Phases" / "Priorites" / "TODO" — c'est du projet (CDC ou GitHub issues).
- Pas de listes exhaustives de fichiers — donner patterns + lien rules.

## Verification
A executer : `/context-guardian` ou "verifie le contexte" (cible >= 70/80).

## A surveiller
- Si ajout d'un nouveau MCP : updater section "MCPs configures".
- Si ajout d'un projet ou skill : updater section "Workspace".
- Si change projet Supabase/HubSpot : updater "Project IDs".
