# 05 — Recommandations par profil

> Parcours de formation et d'adoption Claude Code recommandes selon profil. Chaque parcours combine : formation officielle gratuite + best practices critiques + actions concretes premiere semaine.

## Table des matieres

- [Profil 1 — Developpeur autodidacte](#profil-1--developpeur-autodidacte-budget-0)
- [Profil 2 — Developpeur senior production](#profil-2--developpeur-senior-production-budget-50-1500)
- [Profil 3 — Tech Lead / CTO industrialiser equipe](#profil-3--tech-lead--cto-industrialiser-equipe-budget-1500-15000)
- [Profil 4 — Entrepreneur / Vibecoder no-code](#profil-4--entrepreneur--vibecoder-no-code-budget-0-2500)
- [Profil 5 — Formateur / RH selectionner prestataire](#profil-5--formateur--rh-selectionner-prestataire)
- [Synthese : la "stack ideale" pour 2026](#synthese--la-stack-ideale-pour-2026)

## Profil 1 — Developpeur autodidacte (budget 0€)

**Contexte** : developpeur ayant base programmation (1+ an), veut apprendre Claude Code en autonomie.

### Parcours formation (4-6 semaines)

| Semaine | Action | Source | Effort |
|---|---|---|---|
| 1 | Installer Claude Code + Claude Code 101 sur Anthropic Academy | https://anthropic.skilljar.com/claude-code-101 | 4h |
| 1-2 | Lire les best practices officielles | https://code.claude.com/docs/en/best-practices | 2h |
| 2-3 | Faire 1 projet personnel (CRUD app, < 1000 lignes) avec verification systematique | (pratique) | 10h |
| 3-4 | Cours "Claude Code in Action" (Anthropic Academy ou Coursera) | https://www.coursera.org/learn/claude-code-in-action | 6h |
| 4-5 | Approfondir architecture : Skills + Subagents + Hooks | [04-architecture.md](04-architecture.md) | 4h |
| 5-6 | Explorer awesome-claude-code pour patterns avances | https://github.com/hesreallyhim/awesome-claude-code | 3h |

### Top 5 best practices a appliquer immediatement

1. **Verification systematique** (BP-1.1) : tests / screenshots / outputs attendus dans chaque prompt
2. **Plan mode** (BP-2.1) : pour toute tache multi-fichiers
3. **CLAUDE.md court** (BP-4.1) : creer dans projet, max 50 lignes
4. **Subagents pour recherche** (BP-6.3) : "use subagents to investigate X"
5. **`/clear` entre taches** (BP-6.2)

### KPI personnel

- Apres 4 semaines : creer une feature multi-fichiers en 1 session sans correction repetee
- Apres 8 semaines : ecrire un Skill projet operationnel
- Apres 12 semaines : maitriser au moins 2 MCP

## Profil 2 — Developpeur senior production (budget 50-1500€)

**Contexte** : developpeur experimente (3+ ans), production, veut maximiser productivite et integrer dans CI/CD.

### Parcours formation accelere (2-3 semaines)

| Semaine | Action | Source | Effort |
|---|---|---|---|
| 1 | Vanderbilt Coursera "Software Engineering with Generative AI Agents" | https://www.coursera.org/learn/claude-code | 6h |
| 1 | OU formation BGB (CPF eligible, 2j) si CPF dispo | https://bgbformation.fr/formation-claude-code-cpf | 14h |
| 2 | Configurer environnement production : CLAUDE.md + Hooks lint/test + permissions allowlist | [03-best-practices.md](03-best-practices.md) BP-4 | 4h |
| 2 | Mettre en place pattern Writer/Reviewer + non-interactive pour CI | [03-best-practices.md](03-best-practices.md) BP-7 | 6h |
| 3 | Approfondir cours Anthropic Skills + MCP + Agent Skills | https://anthropic.skilljar.com/ | 8h |

### Top 5 best practices specifiques production

1. **Hooks lint/format/typecheck** (BP-4.5) : enforcement deterministe
2. **Auto mode + classifier** (BP-7.5) : pour batch operations
3. **Pattern Writer/Reviewer** (BP-7.3) : qualite via fresh context
4. **Allowlist permissions** (BP-4.3) : commandes sures sans prompt
5. **CLAUDE.md hierarchique** (BP-4.1) : `~/.claude/CLAUDE.md` perso + `./CLAUDE.md` equipe

### Setup recommande projet

```
project-root/
├── CLAUDE.md                    # < 50 lignes, conventions team
├── CLAUDE.local.md              # gitignore, perso
├── .claude/
│   ├── settings.json            # hooks: PostToolUse lint+typecheck
│   ├── skills/
│   │   ├── deploy/SKILL.md      # workflow deploy + tests
│   │   └── code-review/SKILL.md # checklist review
│   └── agents/
│       └── security-reviewer.md # subagent audit security
└── ...
```

### KPI production

- Reduction interruptions permission : >= 80% via allowlist + auto mode
- Coverage hooks : 100% Edit/Write declenchent lint+typecheck
- Time-to-PR : -30% via Writer/Reviewer pattern

## Profil 3 — Tech Lead / CTO industrialiser equipe (budget 1500-15000€)

**Contexte** : equipe 5-50 devs, voulant adoption homogene, gouvernance, ROI mesurable.

### Parcours en 3 phases (3 mois)

**Phase 1 — Pilote (1 mois)**

| Semaine | Action |
|---|---|
| 1 | Designer 2 champions internes -> Anthropic Academy (gratuit) |
| 2 | Champions creent CLAUDE.md projet pilote + 3 skills critiques (lint, deploy, review) |
| 3 | Pilote sur 3-5 devs : metriques baseline (time-to-PR, bugs) |
| 4 | Premiere retro : ajustements + decision go/no-go |

**Phase 2 — Formation equipe (1 mois)**

Selectionner UN prestataire principal :

| Critere | PLB | Human Coders | Alfie | Sparks |
|---|---|---|---|---|
| Industrialisation | Fort | Moyen | Fort (Cowork) | Moyen |
| Securite IA | Fort | Moyen | Faible | Moyen |
| CPF eligible | OUI | OUI | OUI | OUI |
| Format equipe | OUI | OUI | OUI | OUI |
| Volume cours | Adaptable | Standard | Methode + templates | Pipeline focus |

**Recommandation** : PLB pour equipes mixtes (front + back + DevOps), Alfie si focus collaboration et templates reutilisables, Human Coders pour formats petits groupes intensifs.

**Phase 3 — Industrialisation (1 mois)**

| Semaine | Action |
|---|---|
| 1 | Plugin equipe : packager skills + hooks + agents en 1 install |
| 2 | Pipeline CI : `claude -p` non-interactive pour PR review automatique |
| 3 | Gouvernance : permissions enterprise + CLAUDE.md managed |
| 4 | KPI dashboard : adoption, ROI, blockers |

### KPI strategiques

| KPI | Baseline | Cible 3 mois | Cible 6 mois |
|---|---|---|---|
| % devs utilisateurs reguliers | <30% | 70% | 95% |
| Time-to-PR | T0 | -25% | -40% |
| Bugs production / PR | B0 | -15% | -30% |
| Heures perdues sur taches repetitives | H0 | -50% | -70% |
| Satisfaction dev (NPS) | N0 | +20pts | +40pts |

### Architecture equipe recommandee

Voir [04-architecture.md](04-architecture.md) pour details. En resume :

```
Enterprise CLAUDE.md (managed) : compliance, security, branding
   |
~/.claude/CLAUDE.md (user)     : preferences perso
   |
./CLAUDE.md (project, git)     : conventions equipe
   |
Plugin Cowork "team-stack" :
   ├── 5-10 skills (deploy, review, refactor, ...)
   ├── 2-5 subagents (security, perf, accessibility)
   ├── 3-5 hooks (lint, format, typecheck, security-scan)
   └── MCP servers (DB, monitoring, ticketing)
```

## Profil 4 — Entrepreneur / Vibecoder no-code (budget 0-2500€)

**Contexte** : non-developpeur, veut creer MVP / SaaS / landing pages avec IA, sans apprendre la programmation classique.

### Parcours recommande

**Option A — Budget 0€** :
- Anthropic Academy "Introduction to Claude Cowork" (https://anthropic.skilljar.com/introduction-to-claude-cowork)
- ccforeveryone.com tutoriels gratuits
- Pratique sur projet personnel + community (Discord/Slack vibecoding)

**Option B — Formation FR (~1500-2500€, CPF possible)** :
- **NoCode IA Toulouse** (5j) : https://nocodetoulouse.fr/formation-claude-code-vibe-coding/
  - Pour : creer app autonome IA de A->Z
- **Alfie Formation** : methode + templates reutilisables, focus collaboration
  - Pour : entrepreneurs voulant automatiser equipe
- **formation-claudecode.com** : "10x plus vite avec l'IA"
  - Pour : vouloir specialiste pure-player Claude Code

### Top best practices vibecoders

1. **Plan mode systematique** (BP-2.1) : avant tout code, faire planifier Claude
2. **Verification visuelle** (BP-1.2) : screenshots + Claude in Chrome
3. **Skills metier** : creer un skill par flow business (signup, paiement, support)
4. **MCP** : Webflow + Supabase + Stripe + n8n -> integrations sans code
5. **Subagent "Explore"** : pour comprendre code genere

### Stack vibecoding 2026 recommandee

```
Claude Code (CLI ou Web)
   ├── MCP webflow / framer    : UI
   ├── MCP supabase            : backend (DB, auth, edge functions)
   ├── MCP stripe              : paiement
   ├── MCP n8n                 : automatisation no-code
   └── Skill custom : workflow business specifique
```

## Profil 5 — Formateur / RH selectionner prestataire

**Contexte** : choisir prestataire pour former 5-50 collaborateurs, criteres CPF/Qualiopi indispensables.

### Grille de selection (10 criteres)

| # | Critere | Poids | Comment evaluer |
|---|---|---|---|
| 1 | Qualiopi certifie | 5 | Demander attestation |
| 2 | Eligible CPF | 5 | Code RNCP / RS |
| 3 | Adapte au profil cible | 4 | Demander demo / extract |
| 4 | Mise a jour 2026 | 4 | Lire syllabus, dates |
| 5 | Practice / labs reels | 4 | Quel % temps pratique ? |
| 6 | Formateur Claude Code expert | 4 | Profil LinkedIn / certifications |
| 7 | Suivi post-formation | 3 | Slack / mentor / Q&A 1 mois ? |
| 8 | Format adapte (presentiel / distanciel) | 3 | Match besoins equipe |
| 9 | Tarif transparent | 2 | Devis sans negociation |
| 10 | Temoignages clients verifiables | 3 | Demander 2 references |

### Top 4 prestataires France comparatifs

| Critere | BGB | Human Coders | PLB | Alfie |
|---|---|---|---|---|
| Qualiopi | OUI | OUI | OUI | OUI |
| CPF | OUI | OUI | OUI | OUI |
| Pricing public | 1490€ HT/dev (2j) | Sur devis | Sur devis | Sur devis |
| Format groupe | Variable | 3-6 pers | Variable | Variable |
| Specificite | Tarif transparent | Petits groupes | Securite IA | Cowork team |
| Profil ideal | Devs FR seniors | Multi-villes FR | Equipes industrielles | Equipes Cowork |

**Recommandation finale** :
- Volume < 6 devs : **Human Coders** (petits groupes, multi-villes)
- Volume 6-15 devs : **PLB** ou **Alfie** selon focus
- Volume > 15 devs ou tarif strict : **BGB** (intra-entreprise possible)

## Synthese : la "stack ideale" pour 2026

Quel que soit le profil, la stack minimale recommandee pour 2026 :

```
FORMATION
├── Anthropic Academy (gratuit) — toujours, en complement
└── 1 formation FR Qualiopi/CPF (si possible)

SETUP TECHNIQUE
├── CLAUDE.md projet (< 50 lignes, conventions equipe)
├── 3 skills custom critiques (deploy, review, refactor par exemple)
├── 2 subagents specialises (security-reviewer + explorer)
├── 2 hooks deterministes (PostToolUse lint + PreCommit security)
└── 3 MCP minimum (selon stack : DB + version control + business tool)

WORKFLOW
├── Plan mode pour multi-files
├── Verification systematique (tests/screenshots)
├── /clear entre taches
├── Subagents pour investigation
└── Pattern Writer/Reviewer pour features importantes

GOUVERNANCE
├── Allowlist permissions
├── Hooks pour quality gates
└── Re-audit best practices tous les 6 mois (releases mensuels Anthropic)
```

Voir [06-taches.md](06-taches.md) pour le plan d'execution applique au projet hote.
