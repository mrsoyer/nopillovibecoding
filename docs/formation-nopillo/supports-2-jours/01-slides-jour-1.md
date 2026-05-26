# 01 — Plan slide-by-slide JOUR 1

> 40 slides pour J1 "Maitrise Webflow + Methodologie + Skills". Format : Slidev / Keynote / Google Slides. Chaque slide : titre verbal action, 2-3 bullets contenu, source doc, exercice associe si applicable.

## Bloc 1 — Framing J1 (slides 1-5, 30 min, 9h00-9h30)

### Slide 1 — Couverture

- **Titre** : "Industrialiser la production de landings avec Claude Code + MCP"
- **Contenu** : Logo Nopillo + Logo Thomas, dates J1 + J2, "Format 2 jours - Autonomie sur le workflow industrialise"
- **Source** : `formation-nopillo/05-format-2-jours.md`
- **Duree** : 1 min

### Slide 2 — Tour de table

- **Titre** : "Qui sommes-nous ?"
- **Contenu** : Photo + prenom + role + 1 attente prioritaire pour la formation
- **Exercice** : Speed-share oral, 30 sec / personne
- **Duree** : 8 min

### Slide 3 — Demo "wow"

- **Titre** : "Voici ce que vous saurez faire dans 14h"
- **Contenu** : Demo live - 2 landings produites en parallele en 10 min via skills custom
- **Source** : `formation-nopillo/05-format-2-jours.md` ligne 36
- **Exercice** : observation, pas d'intervention
- **Duree** : 10 min

### Slide 4 — Plan des 2 jours

- **Titre** : "Notre programme"
- **Contenu** : Schema visuel J1 (matin = MCP + Methodo + CDC, apres-midi = Skills) + J2 (matin = HubSpot + Google, apres-midi = Meta + workflow equipe)
- **Source** : `05-format-2-jours.md`
- **Duree** : 5 min

### Slide 5 — Ground rules

- **Titre** : "Comment on travaille ensemble"
- **Contenu** : Pair programming par defaut, Slack workshop ouvert, pause toutes les 90 min, on stoppe si 10 min de blocage
- **Source** : `pedagogie-formation/05-techniques-animation.md`
- **Duree** : 5 min

## Bloc 2 — Module 1 MCP Webflow approfondi (slides 6-13, 90 min, 9h30-11h)

### Slide 6 — Pourquoi MCP Webflow change tout

- **Titre** : "Du clic-clic au prompt-driven"
- **Contenu** : 18 categories MCP Webflow vs design manuel, gain de temps mesure 3-5x
- **Source** : `WEBFLOW-MCP.md`
- **Duree** : 5 min

### Slide 7 — Les 18 categories MCP Webflow

- **Titre** : "L'inventaire complet"
- **Contenu** : Schema visuel des 18 categories regroupees (Pages, Components, Variables, CMS, Assets, Scripts, Webhooks, etc.)
- **Source** : `WEBFLOW-MCP.md`
- **Duree** : 8 min

### Slide 8 — Components avances

- **Titre** : "Designer API + Bridge App stable"
- **Contenu** : Component avec props dynamiques, slot system, embed code custom
- **Source** : `WEBFLOW-MCP.md`
- **Exercice** : Exo 1.1 (creer un component avec 3 props)
- **Duree** : 15 min

### Slide 9 — Variables modes

- **Titre** : "Light / dark + Brand A/B en quelques prompts"
- **Contenu** : Variables modes Webflow + mapping CSS variables + workflow Claude
- **Source** : `WEBFLOW-MCP.md`
- **Duree** : 8 min

### Slide 10 — Scripts custom

- **Titre** : "Tracking, A/B, schema.org sans toucher au site"
- **Contenu** : Custom code Webflow par page, exemples GA4 events, schema markup
- **Source** : `WEBFLOW-MCP.md`
- **Duree** : 8 min

### Slide 11 — Webhooks

- **Titre** : "Automation post-publish"
- **Contenu** : Webhook Webflow -> Zapier / Make / Edge Function, cas d'usage notif Slack
- **Source** : `WEBFLOW-MCP.md`
- **Duree** : 5 min

### Slide 12 — Limitations connues

- **Titre** : "Ce que MCP Webflow ne fait PAS"
- **Contenu** : Locales (limite), CMS bulk throttle (10/min), pas de UI editing direct
- **Source** : `WEBFLOW-MCP.md`
- **Duree** : 5 min

### Slide 13 — Exercice 1 brief

- **Titre** : "Injecter le DS Nopillo dans un site vide"
- **Contenu** : Brief exercice + livrable + criteres reussite
- **Exercice** : Exo 1.2 (cf `03-exercices-jour-1.md`)
- **Duree** : 30 min (incl. exo)

## Bloc 3 — Module 2 Methodologie Doc-First (slides 14-20, 75 min, 11h15-12h30)

### Slide 14 — Le manifeste Doc-First

- **Titre** : "Les 5 principes a accrocher au mur"
- **Contenu** : 1. Enqueter, 2. Cadrer, 3. Capitaliser, 4. Executer MCP, 5. Verifier
- **Source** : `methodologie-documentation-first/01-manifeste.md`
- **Duree** : 8 min

### Slide 15 — Pipeline doc-cdc-skill

- **Titre** : "Le pipeline en 4 etapes"
- **Contenu** : `/doc-maker` -> `/cdc-maker` -> `/skill-maker` -> execution MCP, schema visuel
- **Source** : `methodologie-documentation-first/02-pipeline-doc-cdc-skill.md`
- **Duree** : 10 min

### Slide 16 — Pattern scout 5 concurrents

- **Titre** : "Lancer 5 doc-maker en parallele"
- **Contenu** : Schema parallele 5 instances, sortie : 5 docs en 30 min, ROI 5x
- **Source** : `methodologie-documentation-first/03-pattern-scout-concurrents.md`
- **Exercice** : Exo 2.1 (cf `03-exercices-jour-1.md`)
- **Duree** : 10 min

### Slide 17 — Pattern aspirer un design system

- **Titre** : "Extraire un DS d'un site existant"
- **Contenu** : Tokens (couleur, typo, spacing), screenshots -> tokens -> Webflow Variables
- **Source** : `methodologie-documentation-first/04-pattern-aspirer-design-system.md` + `design-system-extraction/`
- **Duree** : 12 min

### Slide 18 — Pattern etude de cas inverse

- **Titre** : "Pourquoi cette landing convertit ?"
- **Contenu** : Audit reverse engineering : Hero, social proof, CTA, form, tracking
- **Source** : `methodologie-documentation-first/`
- **Duree** : 8 min

### Slide 19 — ROI mesure de la methode

- **Titre** : "65% de reutilisation = ROI massif"
- **Contenu** : Avant/apres temps par landing, chiffres clients, KPIs
- **Source** : `methodologie-documentation-first/06-roi-mesure.md`
- **Duree** : 5 min

### Slide 20 — Exercice 2 brief

- **Titre** : "5 doc-maker en parallele sur votre brief"
- **Contenu** : Brief exercice 2 (cf `03-exercices-jour-1.md`)
- **Exercice** : Exo 2.2 (30 min)
- **Duree** : 30 min (incl. exo)

## Bloc 4 — Module 3 CDC-maker (slides 21-26, 90 min, 14h00-15h30)

### Slide 21 — Pourquoi un CDC avant Webflow

- **Titre** : "Eviter le piege du re-work"
- **Contenu** : Statistiques re-work sans CDC, exemple concret
- **Source** : `cdc-landing-improvement/02-taches.md`
- **Duree** : 5 min

### Slide 22 — Anatomie d'un CDC

- **Titre** : "Sections, taches, dependances"
- **Contenu** : Vue d'ensemble + objectifs + decoupage waves + executeurs
- **Source** : `cdc-landing-improvement/02-taches.md`
- **Duree** : 10 min

### Slide 23 — Decoupage Wave 1 / Wave 2

- **Titre** : "Parallele puis sequentiel"
- **Contenu** : Wave 1 = recherches independantes en parallele, Wave 2 = production sequentielle
- **Source** : `cdc-landing-improvement/02-taches.md`
- **Duree** : 8 min

### Slide 24 — Demo /cdc-maker live

- **Titre** : "Generer un CDC en 5 min"
- **Contenu** : Demo live sur un brief reel
- **Source** : `cdc-landing-improvement/`
- **Duree** : 12 min

### Slide 25 — Anti-patterns CDC

- **Titre** : "Ce qui rate"
- **Contenu** : CDC trop generique, pas de wave, pas de critere de succes, pas d'executeur designe
- **Source** : `cdc-landing-improvement/`
- **Duree** : 5 min

### Slide 26 — Exercice 3 brief

- **Titre** : "CDC complet sur votre brief reel"
- **Contenu** : Brief exercice 3
- **Exercice** : Exo 3.1 (cf `03-exercices-jour-1.md`, 50 min)
- **Duree** : 50 min (incl. exo)

## Bloc 5 — Module 4 Skills Nopillo (slides 27-40, 105 min, 15h45-17h30)

### Slides 27-40 (table compactee)

| # | Titre | Contenu cle | Source | Exo | Duree |
|---|-------|-------------|--------|-----|-------|
| 27 | Anatomie d'un skill | Structure `.claude/skills/[name]/`, SKILL.md frontmatter, helpers | `formation-nopillo/03-methodologie-formateur.md` | - | 10 min |
| 28 | Quand creer un skill | "Rule of two" - capitaliser apres la 2e fois | `methodologie-documentation-first/05-pattern-skills-recurrents.md` | - | 5 min |
| 29 | Demo `/apply-nopillo-ds` | Demo live creation skill | `formation-nopillo/03-methodologie-formateur.md` | Exo 4.1 | 25 min |
| 30 | Skill `/landing-google-ads` | Sections obligatoires (Hero, Form, CTAs, tracking) | `google-ads/03-landing-page-quality-score.md` | - | 8 min |
| 31 | Skill `/landing-google-ads` (suite) | Co-construction SKILL.md + prompts + helpers | idem | Exo 4.2 | 25 min |
| 32 | Skill `/audit-landing` | Brief : Lighthouse, accessibilite, tracking, anti-patterns | `formation-nopillo/03-methodologie-formateur.md` | - | 8 min |
| 33 | Skill `/audit-landing` (suite) | Co-construction SKILL.md + checklist criteres + sortie | idem | Exo 4.3 | 20 min |
| 34 | Tester un skill | Test sur 3 cas, edge cases, doc | `methodologie-documentation-first/` | - | 5 min |
| 35 | Versioning skills | Convention nommage Nopillo (prefixes, semver), commit messages | `formation-nopillo/03-methodologie-formateur.md` | - | 5 min |
| 36 | Partage equipe | Repo `.claude/skills/` partage Git, push/pull, conflit | `cdc-claude-code-audit/04-architecture.md` | - | 5 min |
| 37 | Documentation skill | SKILL.md = description + declenchement + params + exemples | `formation-nopillo/03-methodologie-formateur.md` | - | 5 min |
| 38 | Recap 3 skills J1 | Tableau apply-nopillo-ds, landing-google-ads, audit-landing | `formation-nopillo/05-format-2-jours.md` | - | 3 min |
| 39 | Retro J1 | Post-it 2 colonnes "marche / a ameliorer" | `pedagogie-formation/05-techniques-animation.md` | retro | 15 min |
| 40 | Brief J2 | Plan J2 + lecture ce soir `hubspot/03-api-authentication.md` | `formation-nopillo/05-format-2-jours.md` | - | 5 min |

## Repartition + sources

Theorie/Demo 30% (~2.1h), Pratique guidee 60% (~4.2h), Retro 10% (~0.7h).

Exemple frontmatter SKILL.md (slide 27) :

```yaml
---
name: apply-nopillo-ds
description: Applique le DS Nopillo (variables + composants) a un site Webflow
declenchement: "applique le DS Nopillo sur le site [siteId]"
inputs:
  - siteId: ID du site Webflow cible
---
```

## Sources

- `docs/formation-nopillo/05-format-2-jours.md`, `docs/WEBFLOW-MCP.md`
- `docs/pedagogie-formation/07-materiel-pedagogique.md`
- `docs/methodologie-documentation-first/01-manifeste.md`
- `docs/cdc-landing-improvement/02-taches.md`
- `docs/google-ads/03-landing-page-quality-score.md`
