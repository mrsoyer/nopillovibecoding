# 06 — Plan d'execution : appliquer l'audit au projet

> Decoupage taches concretes pour appliquer les conclusions de l'audit au projet `/Users/thomas/webflowlanding/`. Chaque tache a un livrable verifiable et un executeur designe (skill Cowork, agent SYM, ou Claude Code direct).

## Table des matieres

- [Diagnostic du projet hote](#diagnostic-du-projet-hote)
- [Phases d'execution](#phases-dexecution)
- [Tableau des taches](#tableau-des-taches)
- [Diagramme de dependances](#diagramme-de-dependances)
- [Waves d'execution paralleles](#waves-dexecution-paralleles)
- [Chemin critique](#chemin-critique)
- [Estimation effort total](#estimation-effort-total)

## Diagnostic du projet hote

Avant les taches, verification de l'etat actuel :

| Element | Etat | Action requise |
|---|---|---|
| `~/.claude/CLAUDE.md` (global) | Present (~700 lignes) | Optimiser : trop long, voir BP-4.1 |
| `./CLAUDE.md` (projet) | **MANQUANT** | A creer |
| `./CLAUDE.local.md` (perso) | **MANQUANT** | Optionnel |
| `.claude/skills/` projet | Pas de skills locaux (8 globaux) | Identifier 2-3 skills projet specifiques |
| `.claude/agents/` projet | Pas d'agents locaux (47 globaux) | Reutiliser SYM, ajouter si besoin specifique |
| `.claude/settings.json` hooks | **MANQUANT** | A creer (lint, format) |
| MCP installes | 8 (webflow, supabase, context7, ...) | OK, audit pertinence |
| Plan mode usage | Non documente | A formaliser via skill |
| Anthropic Academy formation | Non realisee | Planifier (Tom -> 1 cours/semaine) |

## Phases d'execution

| Phase | Description | Taches | Effort | Parallelisable |
|---|---|---|---|---|
| **P0 — Fondations** | CLAUDE.md projet + audit CLAUDE.md global | 4 | XS-S | 2 waves |
| **P1 — Hooks** | Lint + typecheck + security en deterministe | 3 | S | 1 wave |
| **P2 — Skills projet** | 2-3 skills metier (Webflow, recherche, audit) | 4 | M | 2 waves |
| **P3 — Subagents** | Reviewer + explorer dedies projet | 2 | S | 1 wave |
| **P4 — Formation** | Anthropic Academy + best practices | 3 | M | 1 wave |
| **P5 — Industrialisation** | Pattern Writer/Reviewer + non-interactive | 3 | M | 1 wave |
| **P6 — Mesure** | KPIs + retro mensuelle | 2 | XS | sequentiel |

**Total** : 21 taches reparties sur 7 phases, 9 waves d'execution.

## Tableau des taches

| ID | Tache | Executeur | Dep. | Livrable | Prio |
|---|---|---|---|---|---|
| **0.1** | Auditer ~/.claude/CLAUDE.md (700+ lignes) — pruning ruthless | sym-evolve | - | CLAUDE.md global < 200 lignes, regles testees | P0 |
| **0.2** | Creer ./CLAUDE.md projet webflowlanding (< 50 lignes) | Claude Code direct | - | ./CLAUDE.md commit avec conventions Webflow + SYM | P0 |
| **0.3** | Tester ./CLAUDE.md sur 2 prompts reels (mesurer adherence) | Claude Code direct | 0.2 | Rapport adherence regles + ajustements | P0 |
| **0.4** | Optionnel: ./CLAUDE.local.md perso (gitignore) | Claude Code direct | - | Fichier local (env vars, prefs) | P3 |
| **1.1** | Creer .claude/settings.json avec hook PostToolUse lint Webflow | Claude Code direct | 0.2 | Hook actif valide a chaque Edit/Write | P1 |
| **1.2** | Hook PreToolUse pour bloquer ecritures dans `docs/cahier-des-charges*/` | Claude Code direct | 1.1 | Hook actif teste sur ecriture protegee | P1 |
| **1.3** | Hook SessionStart : afficher dashboard SYM + KPIs projet | sym-session | 1.1 | Hook produit un resume actionnable | P2 |
| **2.1** | Skill projet "webflow-audit" : audit composants, sections, score conversion | skill-maker | 0.2 | .claude/skills/webflow-audit/SKILL.md fonctionnel | P0 |
| **2.2** | Skill projet "landing-section-create" : workflow creation Hero/Form/Proof | skill-maker | 2.1 | Skill genere section conforme DS Webflow | P0 |
| **2.3** | Skill projet "competitor-analysis" : recherche + audit landing concurrente | skill-maker | - | Skill produit rapport audit avec score | P2 |
| **2.4** | Skill projet "deploy-staging-prod" : workflow Webflow staging -> prod | skill-maker | 2.1 | Skill execute deploy avec validations | P1 |
| **3.1** | Subagent "webflow-reviewer" : audit accessibilite + perfs + SEO | sym-meta | 0.2 | .claude/agents/webflow-reviewer.md teste | P1 |
| **3.2** | Subagent "lp-explorer" : recherche best practices landing depuis docs/ | sym-meta | 0.2 | .claude/agents/lp-explorer.md teste | P2 |
| **4.1** | Suivre Anthropic Academy "Claude Code 101" (4h) | Manuel (Thomas) | - | Certificat + notes synthese | P0 |
| **4.2** | Suivre Anthropic Academy "Introduction to Agent Skills" (4h) | Manuel (Thomas) | 4.1 | Certificat + 2 skills appliques au projet | P1 |
| **4.3** | Lire et appliquer 5 best practices Top 10 (cf. 03-best-practices.md) | Manuel (Thomas) | 4.1 | Checklist completee dans rapport | P0 |
| **5.1** | Mettre en place pattern Writer/Reviewer pour feature `cdc-landing-improvement` | Claude Code direct | 3.1 | 2 sessions paralleles avec roles distincts | P1 |
| **5.2** | Pipeline `claude -p` non-interactive : audit auto par PR Webflow | Claude Code direct | 5.1 | Script CI fonctionnel | P2 |
| **5.3** | Mode auto + classifier sur taches batch (audit multi-pages) | Claude Code direct | 5.2 | 1 batch reussi sans interruption | P2 |
| **6.1** | Definir KPIs measurables (productivity, errors, adoption) | sym-project | 5.1 | Tableau KPIs avec baseline | P0 |
| **6.2** | Retro mensuelle : analyse usage Claude Code + ajustements | Manuel (Thomas) | 6.1 | Rapport mensuel dans docs/ | P1 |

## Diagramme de dependances

```
P0 — FONDATIONS
   0.1 audit global ──────────────────────┐
                                          │
   0.2 CLAUDE.md projet ──────┬───────────┤
                              │           │
                              ▼           ▼
                        0.3 test    (utilise par tout)
                              │
                              ▼
                            DONE P0

P1 — HOOKS
   1.1 hook lint ─────┬─── 1.2 hook block writes
                      │
                      └─── 1.3 hook dashboard

P2 — SKILLS PROJET
   2.1 webflow-audit ────────┬──── 2.2 landing-section-create
                             │
                             └──── 2.4 deploy
   2.3 competitor-analysis (independant)

P3 — SUBAGENTS
   3.1 webflow-reviewer ─── (parallele) ─── 3.2 lp-explorer

P4 — FORMATION
   4.1 Claude Code 101 ─── 4.2 Agent Skills
   4.3 Best practices (parallele apres 4.1)

P5 — INDUSTRIALISATION
   5.1 Writer/Reviewer ─── 5.2 CI pipeline ─── 5.3 Auto mode

P6 — MESURE
   6.1 KPIs ─── 6.2 retro
```

## Waves d'execution paralleles

```
WAVE 1 (independant, lancer en parallele)
├── 0.1 audit ~/.claude/CLAUDE.md global
├── 0.2 creer ./CLAUDE.md projet
├── 4.1 Claude Code 101 (Thomas, 4h)
└── 2.3 skill competitor-analysis (independant)

WAVE 2 (apres wave 1)
├── 0.3 test CLAUDE.md projet
├── 1.1 hook PostToolUse lint
├── 2.1 skill webflow-audit
├── 3.1 subagent webflow-reviewer
├── 3.2 subagent lp-explorer
└── 4.3 appliquer 5 best practices top

WAVE 3 (apres wave 2)
├── 1.2 hook PreToolUse block writes
├── 1.3 hook SessionStart dashboard
├── 2.2 skill landing-section-create
├── 2.4 skill deploy
└── 4.2 Agent Skills (Anthropic Academy)

WAVE 4 (apres wave 3)
├── 5.1 Writer/Reviewer pattern
└── 6.1 KPIs definition

WAVE 5 (apres wave 4)
├── 5.2 CI pipeline non-interactive
└── 6.2 premiere retro

WAVE 6 (apres wave 5)
└── 5.3 mode auto sur batch
```

## Chemin critique

```
0.2 CLAUDE.md projet (1h)
   ↓
2.1 webflow-audit skill (3h)
   ↓
2.2 landing-section-create (2h)
   ↓
5.1 Writer/Reviewer (2h)
   ↓
5.2 CI pipeline (3h)
   ↓
5.3 mode auto (2h)
   ↓
6.2 retro (1h)

= 14h de travail incompressible (sans formation Anthropic Academy)
```

Avec formation Anthropic Academy parallele : 14h dev + 8h formation Thomas = ~3 jours-equivalents temps plein.

## Estimation effort total

| Phase | Effort dev | Effort formation Thomas | Total |
|---|---|---|---|
| P0 — Fondations | 4h | - | 4h |
| P1 — Hooks | 3h | - | 3h |
| P2 — Skills projet | 8h | - | 8h |
| P3 — Subagents | 3h | - | 3h |
| P4 — Formation | - | 8h | 8h |
| P5 — Industrialisation | 7h | - | 7h |
| P6 — Mesure | 2h | - | 2h |
| **TOTAL** | **27h** | **8h** | **35h** |

Repartition : ~1 semaine intensive ou 3 semaines a temps partiel.

## Definition of Done par phase

| Phase | DoD |
|---|---|
| P0 | ./CLAUDE.md teste sur 2 prompts, regles respectees a 100% |
| P1 | 3 hooks actifs, lint declenche apres 100% Edit/Write |
| P2 | 4 skills fonctionnels, testes sur 1 use case reel chacun |
| P3 | 2 subagents invocables, retournent rapports utilisables |
| P4 | 2 certificats Anthropic Academy + 5 BPs cochees |
| P5 | 1 PR Webflow auditee automatiquement par CI |
| P6 | Tableau KPIs avec baseline + 1 retro mensuelle realisee |

## Prochaine etape recommandee

**Demarrer Wave 1 maintenant** :
- Lancer 0.1 (sym-evolve audit CLAUDE.md global) en parallele
- Creer 0.2 (./CLAUDE.md projet) immediatement
- Inscrire Thomas a Claude Code 101 (4.1)

Ensuite Wave 2 dans les 24-48h suivantes pour beneficier de l'effet compose (CLAUDE.md + hooks + skills + subagents).
