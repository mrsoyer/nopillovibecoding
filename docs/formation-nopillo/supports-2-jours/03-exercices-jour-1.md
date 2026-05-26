# 03 — Exercices JOUR 1 (6 exercices)

> 6 exercices encadres J1 avec consigne, livrable, criteres reussite, duree. Couvrent les 4 modules J1 : MCP Webflow, Methodologie Doc-First, CDC, Skills.

## Vue d'ensemble J1

| # | Exercice | Module | Duree | Format |
|---|----------|--------|-------|--------|
| 1.1 | Component Webflow avec props | M1 MCP | 15 min | Solo guide |
| 1.2 | Injecter DS Nopillo dans site vide | M1 MCP | 30 min | Pair |
| 2.1 | Demo `/doc-maker` | M2 Methodo | 10 min | Solo |
| 2.2 | 5 doc-maker en parallele | M2 Methodo | 30 min | Pair |
| 3.1 | CDC complet sur brief reel | M3 CDC | 50 min | Pair |
| 4.1 | Co-construction `/apply-nopillo-ds` | M4 Skills | 25 min | Plenary + pair |
| 4.2 | Co-construction `/landing-google-ads` | M4 Skills | 25 min | Plenary + pair |
| 4.3 | Co-construction `/audit-landing` | M4 Skills | 20 min | Plenary + pair |

## Exercice 1.1 — Component Webflow avec props

### Consigne

Dans le site sandbox Webflow fourni, creer un component "FeatureCard" avec 3 props :
- `title` (texte)
- `description` (richtext)
- `icon` (image)

Via Claude Code + Webflow MCP uniquement (pas de clic dans Designer).

### Livrable

Component cree dans Webflow, visible dans la liste des Components du site.

### Criteres reussite

- [ ] Le component existe avec le nom "FeatureCard"
- [ ] Les 3 props sont accessibles
- [ ] Une instance du component est posee sur la home avec valeurs custom
- [ ] L'utilisateur a utilise UNIQUEMENT le MCP, pas le Designer

### Duree

15 min

### Format

Solo guide (formateur en demo + chacun reproduit)

### Sources

- `docs/WEBFLOW-MCP.md`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 1)

## Exercice 1.2 — Injecter DS Nopillo dans site vide

### Consigne

A partir d'un site Webflow vide et du DS Nopillo fourni (variables de couleur, typo, spacing + 5 composants base), injecter l'integralite du DS dans le site via Webflow MCP.

### Livrable

Site Webflow avec :
- Variables couleur (primary, secondary, neutrals 50-900)
- Variables typo (heading-display, heading-1 a heading-4, body, caption)
- Variables spacing (xs, s, m, l, xl, 2xl)
- 5 composants : Button, Card, Hero, Footer, Navbar

### Criteres reussite

- [ ] Toutes les variables sont visibles dans Webflow Variables
- [ ] Les 5 composants sont creees et visibles
- [ ] Une page demo "Style Guide" affiche tous les elements
- [ ] Test responsive 320px / 1440px sans bug

### Duree

30 min

### Format

Pair programming, rotation driver/navigator toutes les 15 min

### Sources

- `docs/WEBFLOW-MCP.md`
- `docs/design-system-extraction/`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 1, exercice ligne 54)

## Exercice 2.1 — Demo `/doc-maker`

### Consigne

Le formateur lance `/doc-maker meta ads landing pages best practices 2026` en live. Les participants observent et notent dans leur cahier :
- Ce que `/doc-maker` produit comme arborescence
- Le temps total
- La qualite de la doc (echantillon)

### Livrable

Notes individuelles + 1 question / participant a poser apres la demo.

### Criteres reussite

- [ ] Chaque participant a ouvert le dossier `docs/meta-ads/` produit
- [ ] Chaque participant a lu au moins 1 fichier
- [ ] Au moins 1 question posee par participant

### Duree

10 min (demo + Q/R)

### Format

Solo, observation + prise de notes

### Sources

- `docs/methodologie-documentation-first/02-pipeline-doc-cdc-skill.md`

## Exercice 2.2 — 5 doc-maker en parallele

### Consigne

En binome, choisir un brief landing client (vrai ou simule). Lister 5 concurrents directs ou indirects pertinents. Lancer 5 instances `/doc-maker` en parallele dans 5 onglets / sessions Claude Code differents.

Sortie attendue : 5 dossiers `docs/concurrents-[client]/[concurrent-name]/` produits en simultane.

### Livrable

5 dossiers `docs/concurrents-[client]/` avec contenu structure (overview, USP, pricing, design notes, takeaways).

### Criteres reussite

- [ ] 5 instances Claude Code lancees en parallele
- [ ] 5 dossiers crees au bout de 30 min
- [ ] Chaque dossier contient au moins 3 fichiers
- [ ] Synthese rapide ecrite : 3 takeaways apprises

### Duree

30 min

### Format

Pair, chaque binome travaille sur un brief different

### Sources

- `docs/methodologie-documentation-first/03-pattern-scout-concurrents.md`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 2 ligne 67)

## Exercice 3.1 — CDC complet sur brief reel

### Consigne

Sur un brief landing reel apporte par le participant (ou fourni par Nopillo si pas dispo), generer un CDC complet via `/cdc-maker`.

Etapes :
1. Lancer `/cdc-maker` avec le brief
2. Iterer 2-3 fois pour affiner
3. Decoupage Wave 1 (recherches en parallele) + Wave 2 (production sequentielle)
4. Identifier les executeurs (Webflow MCP, HubSpot MCP, Claude direct, humain)

### Livrable

Fichier `docs/[client]/cdc.md` complet :
- Vue d'ensemble
- Objectifs business
- Cible utilisateur
- USP / messaging
- Sections de la landing
- CTAs et tracking
- Wave 1 + Wave 2 + executeurs
- Criteres de validation

### Criteres reussite

- [ ] CDC complet en 50 min
- [ ] Wave 1 contient au moins 3 taches en parallele
- [ ] Wave 2 contient au moins 5 taches sequentielles
- [ ] Chaque tache a un executeur designe
- [ ] Criteres de validation chiffres et verifiables

### Duree

50 min

### Format

Pair sur le brief de l'un des deux. L'autre prend la rotation suivante.

### Sources

- `docs/cdc-landing-improvement/02-taches.md`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 3 ligne 79)

## Exercices 4.1, 4.2, 4.3 — Co-construction des 3 skills J1

Format identique pour les 3 : plenary (le formateur ouvre le dossier `.claude/skills/[name]/` et construit SKILL.md ensemble) + pair (chaque binome reproduit dans son repo et teste).

### Exercice 4.1 — `/apply-nopillo-ds`

- **Inputs** : siteId Webflow
- **Etapes** : lister/creer variables -> lister/creer composants -> page styleguide
- **Critere clef** : declenchable par "applique le DS Nopillo"
- **Duree** : 25 min (10 plenary + 15 pair)
- **Sources** : `docs/formation-nopillo/03-methodologie-formateur.md`, `docs/methodologie-documentation-first/05-pattern-skills-recurrents.md`

### Exercice 4.2 — `/landing-google-ads`

- **Sections obligatoires** : Hero Quality Score + USP 3 cols + form HubSpot embed + footer + tracking GA4/Pixel/Consent V2
- **Critere clef** : 1 landing < 5 min + Lighthouse mobile > 80 + tracking en DebugView
- **Duree** : 25 min (10 plenary + 15 pair)
- **Sources** : `docs/google-ads/03-landing-page-quality-score.md`, `docs/formation-nopillo/03-methodologie-formateur.md`

### Exercice 4.3 — `/audit-landing`

- **Inputs** : URL
- **Sortie** : `docs/audit-[slug]/audit.md` (Lighthouse, WCAG AA top 5, tracking detecte, forms, anti-patterns)
- **Critere clef** : score chiffre / 100 avec justification
- **Duree** : 20 min (8 plenary + 12 pair)
- **Sources** : `docs/formation-nopillo/03-methodologie-formateur.md`, `docs/cdc-landing-improvement/02-taches.md`

### Livrable global Exo 4

3 dossiers `.claude/skills/[name]/` committed avec SKILL.md fonctionnel + test reussi. SKILL.md contient les 5 sections (frontmatter, description, inputs, etapes, outputs).

## Bilan + pieges + sources

Bilan J1 par binome : 1 site avec DS Nopillo, 5 dossiers concurrents, 1 CDC complet, 3 skills committees.

Exemple structure skill (Exo 4.1) :

```
.claude/skills/apply-nopillo-ds/
├── SKILL.md
├── prompts/
│   ├── 01-create-variables.md
│   └── 02-create-components.md
└── README.md
```

Pieges : (a) rotation driver/navigator stricte 15 min, (b) 2 comptes Claude par poste pour rate limit, (c) plan B Designer manuel si MCP plante, (d) Exo 4.3 en homework si pas le temps.

## Sources

- `docs/formation-nopillo/05-format-2-jours.md`
- `docs/pedagogie-formation/05-techniques-animation.md`
- `docs/pedagogie-formation/07-materiel-pedagogique.md`
