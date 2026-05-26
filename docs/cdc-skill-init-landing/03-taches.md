# 03 — Decoupage des taches pour creer le skill

## Sommaire

- [Vue d'ensemble](#vue-densemble)
- [Tableau des taches](#tableau-des-taches)
- [Waves d'execution parallelisables](#waves-dexecution-parallelisables)
- [Diagramme de dependances](#diagramme-de-dependances)
- [Chemin critique](#chemin-critique)
- [Repartition par executeur](#repartition-par-executeur)
- [Estimation effort](#estimation-effort)

## Vue d'ensemble

Pour creer le skill `init-landing-stack`, **23 taches** sont identifiees, reparties en **5 phases** :

1. **Setup & frontmatter** (taches 1.x) — squelette skill
2. **References** (taches 2.x) — fichiers de documentation interne
3. **Templates** (taches 3.x) — tous les .tmpl pour generation projet
4. **Agents & Scripts** (taches 4.x) — logique d'execution
5. **Tests & Polish** (taches 5.x) — evals, audit, doc

**Executeur principal** : `/skill-maker` (skill global qui guide la creation). Quelques taches peuvent etre faites Claude Code direct si on connait deja la cible.

## Tableau des taches

| ID | Tache | Executeur | Deps | Livrable | Prio |
|----|-------|-----------|------|----------|------|
| **1. Setup squelette** | | | | | |
| 1.1 | Creer dossier `~/.claude/skills/init-landing-stack/` | Claude Code (Bash) | — | dossier vide cree | P0 |
| 1.2 | Rediger SKILL.md avec frontmatter + workflow 6 phases | /skill-maker | 1.1 | SKILL.md < 300 lignes, frontmatter valide | P0 |
| 1.3 | Creer evals/evals.json avec 3 cas de test (Astro happy path, Vite-React, erreur Supabase) | /skill-maker | 1.2 | evals.json valide | P1 |
| **2. References** | | | | | |
| 2.1 | references/interview-questions.md — 8 questions detaillees | Claude Code direct | 1.2 | 1 fichier ~80 lignes | P0 |
| 2.2 | references/stack-decision-tree.md — arbre Astro vs Vite | Claude Code direct (reference docs/stack-landing-claude-code/02) | 1.2 | 1 fichier ~60 lignes | P0 |
| 2.3 | references/scaffold-patterns.md — commandes par framework | Claude Code direct (reference docs/stack-landing-claude-code/03 et 04) | 1.2 | 1 fichier ~150 lignes | P0 |
| 2.4 | references/error-recovery.md — gestion d'erreurs | Claude Code direct | 1.2 | 1 fichier ~80 lignes | P1 |
| **3. Templates** | | | | | |
| 3.1 | templates/astro/ — 7 templates Astro (CLAUDE.md, netlify.toml, astro.config, pages/index, Hero, ContactForm, lib/supabase) | sym-fe-ui-react + Claude Code | 2.3 | 7 fichiers .tmpl | P0 |
| 3.2 | templates/vite-react/ — 7 templates equivalents pour Vite + React | sym-fe-ui-react + Claude Code | 2.3 | 7 fichiers .tmpl | P1 |
| 3.3 | templates/vite-vue/ — 7 templates equivalents pour Vite + Vue | sym-fe-composable-vue + Claude Code | 2.3 | 7 fichiers .tmpl | P2 |
| 3.4 | templates/supabase/migration-leads.sql — table + RLS | sym-db-sql | 1.2 | 1 fichier SQL avec leads + RLS | P0 |
| 3.5 | templates/supabase/contact-form.ts — edge function Deno | sym-be-edge | 1.2 | 1 fichier TS (Deno) avec validation + CORS + insert | P0 |
| 3.6 | templates/supabase/config.toml — config CLI | Claude Code direct | 1.2 | 1 fichier toml | P1 |
| 3.7 | templates/claude-rules/ — 3 rules path-scoped (frontend, backend, claude-md) | Claude Code direct | 2.3 | 3 fichiers .md.tmpl | P0 |
| 3.8 | templates/README.md.tmpl + .gitignore.tmpl | Claude Code direct | 2.3 | 2 fichiers | P1 |
| **4. Agents & Scripts** | | | | | |
| 4.1 | agents/interviewer.md — phase 1 | /skill-maker | 2.1 | 1 fichier ~60 lignes | P0 |
| 4.2 | agents/scaffolder.md — phase 2 | /skill-maker | 2.3, 3.1 (ou 3.2/3.3) | 1 fichier ~80 lignes | P0 |
| 4.3 | agents/connector.md — phases 3-4 (Supabase + Netlify) | /skill-maker | 3.4, 3.5 | 1 fichier ~100 lignes | P0 |
| 4.4 | agents/verifier.md — phase 6 | /skill-maker | 4.5, 4.6 | 1 fichier ~60 lignes | P0 |
| 4.5 | scripts/verify-deploy.sh — check HTTP + Lighthouse | Claude Code direct | — | 1 script bash executable | P0 |
| 4.6 | scripts/test-form-submission.sh — POST + verif | Claude Code direct | 3.5 | 1 script bash executable | P0 |
| 4.7 | scripts/parse-lighthouse.py — extract scores | Claude Code direct | 4.5 | 1 script Python | P1 |
| **5. Tests & Polish** | | | | | |
| 5.1 | Test end-to-end : invoquer le skill sur un projet test, valider toutes les phases | Manuel + Playwright MCP | toutes les precedentes | rapport de test, screenshots, log | P0 |
| 5.2 | Audit qualite : skill-maker reviewer | /skill-maker (reviewer) | 5.1 | score >= 18/20 | P0 |
| 5.3 | Documentation : ajouter description dans ~/.claude/CLAUDE.md ou README global | Claude Code direct | 5.2 | mention du skill | P2 |

## Waves d'execution parallelisables

### Wave 1 (P0, sans dependance)
- 1.1 (creer dossier)
- 4.5 (script verify-deploy.sh peut etre fait avant)

### Wave 2 (P0, depend de 1.1)
- 1.2 (SKILL.md)

### Wave 3 (P0, depend de 1.2) — **5 taches en parallele**
- 2.1 (interview-questions.md)
- 2.2 (stack-decision-tree.md)
- 2.3 (scaffold-patterns.md)
- 3.4 (migration-leads.sql)
- 3.5 (contact-form.ts)
- 3.6 (supabase/config.toml)

### Wave 4 (P0, depend de Wave 3)
- 3.1 (templates Astro) — depend de 2.3
- 3.7 (claude-rules templates) — depend de 2.3
- 3.8 (README + gitignore) — depend de 2.3
- 4.1 (agents/interviewer.md) — depend de 2.1
- 4.3 (agents/connector.md) — depend de 3.4 + 3.5
- 4.6 (scripts/test-form-submission.sh) — depend de 3.5
- 2.4 (error-recovery.md) — peut se faire ici (P1)

### Wave 5 (P0, depend de Wave 4)
- 4.2 (agents/scaffolder.md) — depend de 2.3 + 3.1 (au moins Astro)
- 4.4 (agents/verifier.md) — depend de 4.5 + 4.6

### Wave 6 (P1-P2, peut etre fait apres MVP)
- 3.2 (templates Vite-React)
- 3.3 (templates Vite-Vue)
- 4.7 (parse-lighthouse.py)
- 1.3 (evals.json)

### Wave 7 (P0, tests finaux)
- 5.1 (test end-to-end)
- 5.2 (audit)
- 5.3 (doc globale)

## Diagramme de dependances

```
1.1 ─→ 1.2 ─┬─→ 2.1 ─→ 4.1 ─┐
            ├─→ 2.2          │
            ├─→ 2.3 ─┬─→ 3.1 ─┴─→ 4.2 ─┐
            │        ├─→ 3.7           ├─→ 5.1 ─→ 5.2 ─→ 5.3
            │        └─→ 3.8           │
            ├─→ 3.4 ─┬─→ 4.3 ──────────┤
            ├─→ 3.5 ─┤                 │
            │        └─→ 4.6 ──────────┤
            └─→ 3.6                    │
                                       │
4.5 ───────────────────→ 4.4 ──────────┘
1.3 (eval) (parallele 1.2+)

(P1-P2 hors chemin critique)
3.2, 3.3, 4.7, 2.4
```

## Chemin critique

**Chemin le plus long** : 1.1 → 1.2 → 2.3 → 3.1 → 4.2 → 5.1 → 5.2

7 taches sequentielles. Si chaque tache prend 15-30 min, le chemin critique = **2-3h** de travail focus.

Avec parallelisation des waves 3 et 4, le total reel peut tomber a **3-4h** (au lieu de ~10h si tout etait sequentiel).

## Repartition par executeur

| Executeur | Nb taches | Pourquoi |
|-----------|-----------|----------|
| `/skill-maker` | 5 (1.2, 1.3, 4.1, 4.2, 4.3, 4.4, 5.2) | Le skill cree des skills. Idiomatique pour creer SKILL.md + agents + evals + audit |
| Claude Code direct | 11 (1.1, 2.1, 2.2, 2.3, 2.4, 3.6, 3.7, 3.8, 4.5, 4.6, 4.7, 5.3) | Edition de fichiers config/templates, scripts simples |
| `sym-fe-ui-react` | 2 (3.1, 3.2) | Templates Astro et React |
| `sym-fe-composable-vue` | 1 (3.3) | Templates Vue |
| `sym-db-sql` | 1 (3.4) | Migration leads avec RLS bien fait |
| `sym-be-edge` | 1 (3.5) | Edge function Deno avec patterns Hono optionnel |
| Manuel + Playwright MCP | 1 (5.1) | Test end-to-end ne peut pas etre fait par un agent sans interaction reelle |

## Estimation effort

| Phase | Taches | Effort cumule (sequentiel) | Effort reel (parallel) |
|-------|--------|----------------------------|------------------------|
| 1. Setup | 1.1 → 1.3 | 30 min | 30 min |
| 2. References | 2.1 → 2.4 | 1h30 | **30 min** (parallele) |
| 3. Templates | 3.1 → 3.8 | 3h | **1h** (parallele) |
| 4. Agents & Scripts | 4.1 → 4.7 | 2h30 | **1h** (parallele) |
| 5. Tests & Polish | 5.1 → 5.3 | 1h30 | 1h30 |
| **Total** | 23 taches | **9h** | **~4h** |

## MVP vs Full version

Pour iterer rapidement, decomposer en 2 livraisons :

### MVP (P0 uniquement, ~3h focus)

Stack : Astro uniquement (Q3 force a Astro), tracking : aucun (Q7 force a none), Git : optionnel.

Taches livrees : 1.1, 1.2, 2.1, 2.2, 2.3, 3.1, 3.4, 3.5, 3.6, 3.7, 3.8, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2

**Resultat MVP** : skill fonctionnel pour 80 % des cas (Astro + Supabase + Netlify, sans tracking).

### Full version (P0 + P1, ~5h focus)

Ajoute : Vite-React templates, error-recovery doc detaillee, parse-lighthouse, evals complet, tracking GA4.

Taches supplementaires : 1.3, 2.4, 3.2, 4.7

### V2 (P2, futur)

Vite-Vue templates (3.3), tracking Meta + HubSpot integre, support custom domain Netlify, multi-page templates.

## Strategie de creation recommandee

1. **Bloc 1** (1h) : Setup + SKILL.md squelette (taches 1.1, 1.2)
2. **Bloc 2** (1h, parallele) : 4 references + 3 templates Supabase (Wave 3 sans 3.1)
3. **Bloc 3** (1h) : Templates Astro + rules + README (3.1, 3.7, 3.8)
4. **Bloc 4** (1h) : Agents + scripts (4.1 a 4.6)
5. **Bloc 5** (1h) : Test end-to-end + audit + iterations

**Total focus** : **5h** pour un MVP propre, testable et auditable a 18+/20.

## Validation post-creation

Apres creation du skill, executer ces verifications :

```bash
# 1. Frontmatter valide
python ~/.claude/skills/skill-maker/scripts/validate-frontmatter.py ~/.claude/skills/init-landing-stack/SKILL.md

# 2. Liens internes
grep -E "\\[.*\\]\\(.*\\)" ~/.claude/skills/init-landing-stack/SKILL.md | \
  while read l; do echo "TODO check links manually: $l"; done

# 3. Test sur projet bidon
cd /tmp && mkdir test-init-landing && cd test-init-landing && claude
# Puis taper /init-landing-stack et suivre le flow

# 4. Audit final
# /skill-maker reviewer ~/.claude/skills/init-landing-stack/
```

## Sources

- [docs/stack-landing-claude-code/](../stack-landing-claude-code/_index.md) — referencee par tous les templates
- [docs/cdc-skill-init-landing/02-architecture.md](02-architecture.md) — structure detaillee du skill
- [docs/cdc-skill-init-landing/01-specs.md](01-specs.md) — flow utilisateur et phases
- [~/.claude/skills/skill-maker/](../../../.claude/skills/skill-maker/) — guide de creation
