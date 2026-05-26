---
name: cdc-maker
description: >
  Cree des cahiers des charges structures avec decoupage taches, dependances et assignation executeurs.
  Detecte le stack technique du projet automatiquement.
  Declenche avec "cahier des charges", "CDC", "specs projet", "decoupage taches", "plan de dev".
argument-hint: "[sujet-ou-feature]"
effort: high
allowed-tools: Read Write Edit Glob Grep Bash WebSearch WebFetch
---

# CDC Maker — Createur de Cahiers des Charges

Tu crees des cahiers des charges professionnels, structures et actionnables.
Tu detectes le stack du projet, analyses la documentation existante,
decoupe en taches avec dependances, et assigne chaque tache a un executeur.

## References disponibles

Charge ces fichiers a la demande selon l'etape en cours :

| Fichier | Quand le lire |
|---------|---------------|
| [references/methodology.md](references/methodology.md) | Etape 3 : structurer le CDC |
| [references/task-breakdown-patterns.md](references/task-breakdown-patterns.md) | Etape 4 : decouper les taches |
| [references/stack-detection.md](references/stack-detection.md) | Etape 2 : detecter le stack |

## Agents disponibles

| Agent | Quand l'utiliser |
|-------|------------------|
| [agents/analyzer.md](agents/analyzer.md) | Etape 2 : analyser le projet |
| [agents/planner.md](agents/planner.md) | Etape 4 : decouper en taches |
| [agents/generator.md](agents/generator.md) | Etape 5 : generer les fichiers |

## Workflow (7 etapes)

### Etape 1 — Cadrer le perimetre

Si `$ARGUMENTS` est fourni, utilise-le comme sujet du CDC.
Sinon, demande : "CDC pour quel projet ou quelle feature ?"

Determine le scope :
- **Projet complet** : CDC global (toutes les phases, de zero a production)
- **Feature majeure** : CDC feature (1 feature, ses sous-taches, son integration)
- **Module** : CDC module (1 bloc technique isole)

Verifie si un CDC existe deja :
- Chercher `docs/cahier-des-charges*/` ou `docs/cdc-*/`
- Si oui, proposer : mettre a jour ou creer un complement

### Etape 2 — Analyser le projet

**Detection automatique du stack** :

Lis ces fichiers dans l'ordre (stopper des qu'on a assez d'info) :

1. `CLAUDE.md` (racine projet) — vision, stack, conventions
2. `package.json` — dependencies frontend/backend
3. `supabase/config.toml` — si Supabase
4. `firebase.json` — si Firebase
5. `app.json` ou `app.config.js` — si Expo/React Native
6. `vite.config.*` ou `next.config.*` — si web
7. `docker-compose.yml` — si containerise
8. `.claude/skills/` — skills existants
9. `docs/` — documentation existante

Charge [references/stack-detection.md](references/stack-detection.md) pour le mapping stack → executeurs.

**Inventorier la documentation existante** :

Lister tout ce qui existe dans `docs/` avec un `Glob("docs/**/*.md")`.
Ces documents sont des inputs pour le CDC — les referencer, pas les dupliquer.

**Output** : Brief projet structure :
```
PROJET : [nom]
STACK : [frontend] + [backend] + [infra]
DOCS EXISTANTES : [liste fichiers docs/]
SKILLS EXISTANTS : [liste skills .claude/skills/]
CONVENTIONS : [langue, nommage, structure]
```

### Etape 3 — Structurer le CDC

Charge [references/methodology.md](references/methodology.md).

Definir les sections du CDC selon le scope :

**CDC Projet Complet** (7 sections) :
1. Contexte & Vision
2. Perimetre Fonctionnel (MVP vs V2+)
3. Architecture Technique
4. Specifications detaillees par module
5. Planning & Phases
6. Criteres de Succes (KPIs)
7. Risques & Mitigations

**CDC Feature** (5 sections) :
1. Contexte & Objectif
2. Specifications Fonctionnelles
3. Specifications Techniques
4. Taches & Dependances
5. Criteres de Succes

**CDC Module** (4 sections) :
1. Objectif
2. Specifications
3. Taches
4. Validation

Pour chaque section, noter les sources d'information :
- Docs existantes → reference directe (pas de copie)
- Recherche web necessaire → lancer WebSearch
- Input utilisateur necessaire → poser la question

### Etape 4 — Decouper les taches

Charge [references/task-breakdown-patterns.md](references/task-breakdown-patterns.md).

**Principes de decoupage** :

1. **1 tache = 1 livrable verifiable**
   Raison : une tache sans livrable est incontrolable.

2. **Identifier les dependances AVANT de lister les taches**
   Raison : l'ordre d'execution decoule des dependances, pas de l'intuition.

3. **Maximiser le parallelisme**
   Raison : les taches sans dependance mutuelle se font en parallele.

4. **Assigner un executeur a chaque tache**
   Raison : une tache sans proprietaire n'avance pas.

**Process** :

```
Pour chaque module/feature :
  1. Lister les taches brutes (brain dump)
  2. Pour chaque tache → definir le livrable verifiable
  3. Pour chaque tache → identifier les dependances (quoi doit etre fait avant)
  4. Regrouper en phases (taches sans dependance = meme phase)
  5. Pour chaque tache → assigner l'executeur optimal
  6. Calculer le chemin critique (chaine de dependances la plus longue)
```

**Format tache** :

| Champ | Description |
|-------|-------------|
| ID | Identifiant unique (ex: 1.3) |
| Tache | Description courte et actionnable |
| Executeur | Skill Cowork, agent SYM, Claude Code direct, ou manuel |
| Dependances | IDs des taches pre-requises |
| Livrable | Ce qu'on peut verifier a la fin |
| Priorite | P0 (bloquant) → P4 (nice-to-have) |

**Assignation executeurs** (adapter au stack detecte) :

| Type de travail | Executeur type |
|----------------|----------------|
| Schema/migration DB | Agent DB specialise (sym-db-migration, etc.) |
| Policies/securite DB | Agent DB SQL (sym-db-sql, etc.) |
| Types/interfaces | Agent frontend core (sym-fe-core, etc.) |
| Skill interactif (CRUD, monitoring) | Skill Cowork custom |
| Orchestration multi-agents | Skill Cowork custom (effort: high) |
| Script one-shot | Claude Code direct |
| Templates/contenu | Claude Code direct |
| Tache recurrente | Tache planifiee (`/schedule`) |
| UI/dashboard web | Agent UI (sym-fe-ui-vue, sym-fe-ui-react, etc.) |
| Audit securite | Agent securite (sym-security) |
| Integration cross-layer | Agent integration (sym-integ) |

### Etape 5 — Generer les fichiers

Creer la structure dans `docs/cahier-des-charges/` (ou `docs/cdc-[feature]/` si feature).

**Structure CDC Projet Complet** :
```
docs/cahier-des-charges/
├── _index.md              # Index avec liens + resume executif
├── 01-vision.md           # Contexte, vision, objectifs
├── 02-perimetre.md        # Features MVP vs V2+, user stories
├── 03-architecture.md     # Stack, schemas, integrations
├── 04-specs-[module].md   # 1 fichier par module (si > 1)
├── 05-planning.md         # Phases, waves, timeline
├── 06-taches.md           # Decoupage complet avec executeurs
├── 07-kpis.md             # Criteres de succes, metriques
└── sources.md             # Docs referencees + recherches
```

**Structure CDC Feature** :
```
docs/cdc-[feature]/
├── _index.md
├── 01-specs.md
├── 02-taches.md
└── sources.md
```

**Regles de generation** :
- Chaque fichier < 300 lignes (sinon decouper)
- Table des matieres si > 100 lignes
- Jamais dupliquer le contenu d'un doc existant → reference avec lien
- Sources citees dans chaque fichier
- Diagrammes ASCII pour dependances et architecture

**`_index.md`** doit contenir :
```markdown
# [Nom] — Cahier des Charges

> [Resume executif en 2-3 phrases]

## Stack detecte
[Frontend] + [Backend] + [Infra]

## Phases
| Phase | Description | Taches | Effort |
|-------|-------------|--------|--------|

## Index
| Fichier | Contenu |
|---------|---------|

## Documentation referencee
- [doc1.md](chemin) — ce qu'on en utilise
```

**`06-taches.md`** (le coeur du CDC) doit contenir :
- Tableau complet ID | Tache | Executeur | Dependance | Livrable | Priorite
- Diagramme de dependances ASCII
- Waves d'execution (groupes parallelisables)
- Estimation effort par phase
- Chemin critique identifie

### Etape 6 — Auditer

Executer `python ${CLAUDE_SKILL_DIR}/scripts/cdc-audit.py [chemin]` si disponible.

Sinon, appliquer manuellement :

| Check | Poids |
|-------|-------|
| `_index.md` avec resume executif | 3 |
| Stack detecte et documente | 2 |
| Toutes taches ont un executeur assigne | 3 |
| Toutes taches ont un livrable verifiable | 3 |
| Dependances documentees | 2 |
| Waves parallelisables identifiees | 2 |
| KPIs mesurables | 2 |
| Fichiers < 300 lignes | 1 |
| Sources/docs referencees (pas dupliquees) | 2 |

Score /20 :
- 18+ : CDC professionnel
- 14-17 : Bon, ajustements mineurs
- < 14 : Retravailler

### Etape 7 — Resume

```
CDC CREE
Projet : [nom]
Scope : [complet/feature/module]
Stack : [frontend] + [backend] + [infra]
Emplacement : [chemin]
Fichiers : [N] fichiers, [X] lignes total
Score : [Y]/20

Decoupage :
  [N] taches au total
  [N] phases
  [N] taches parallelisables
  Chemin critique : [N] taches sequentielles

Executeurs :
  [N] skills Cowork a creer
  [N] agents SYM a invoquer
  [N] taches Claude Code direct
  [N] taches planifiees

Prochaine etape recommandee :
  [Premiere tache P0 sans dependance]
```

## Regles

- Detecter le stack automatiquement — ne jamais demander ce qui est dans les fichiers
- 1 tache = 1 livrable verifiable = 1 executeur assigne
- Referencer les docs existantes, jamais les dupliquer
- Maximiser le parallelisme dans les waves d'execution
- Adapter les executeurs au stack detecte (pas de recommandation Supabase si Firebase)
- Fichiers dans `docs/` — jamais dans `.claude/rules/`
- Format `.md` — jamais `.mdc`
