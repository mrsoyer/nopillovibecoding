# 02 — Plan slide-by-slide JOUR 2

> 40 slides pour J2 "Integration ads, HubSpot, Meta Ads + workflow equipe". Demarrage avec recap interactif (anti decroche). Format : Slidev / Keynote / Google Slides.

## Bloc 1 — Recap J1 + brief J2 (slides 1-5, 30 min, 9h00-9h30)

### Slide 1 — Couverture J2

- **Titre** : "JOUR 2 - Integration ads, HubSpot, Meta Ads"
- **Contenu** : Recap promesse 14h, planning J2
- **Source** : `formation-nopillo/05-format-2-jours.md`
- **Duree** : 1 min

### Slide 2 — Quiz pair J1

- **Titre** : "On reactive"
- **Contenu** : 5 questions sur J1 (manifeste 5 principes, 18 categories MCP, anatomie skill)
- **Exercice** : Exo 5.1 (binomes se posent les questions, 10 min)
- **Source** : `pedagogie-formation/05-techniques-animation.md`
- **Duree** : 10 min

### Slide 3 — Speed-share J1

- **Titre** : "Resume J1 a ton voisin"
- **Contenu** : 1 min / personne pour resumer J1
- **Exercice** : Speed-share oral
- **Source** : `pedagogie-formation/05-techniques-animation.md`
- **Duree** : 10 min

### Slide 4 — Q/R J1 ouvert

- **Titre** : "Ce qui a coince"
- **Contenu** : Le formateur prend les questions / blocages
- **Duree** : 7 min

### Slide 5 — Plan J2 detaille

- **Titre** : "Aujourd'hui on assemble"
- **Contenu** : Schema visuel J2 - HubSpot (matin) + Google + Meta (apres-midi) + workflow equipe
- **Source** : `formation-nopillo/05-format-2-jours.md`
- **Duree** : 2 min

## Bloc 2 — Module 5 HubSpot integration (slides 6-13, 90 min, 9h15-10h45)

### Slide 6 — HubSpot dans la stack landing

- **Titre** : "Pourquoi HubSpot pour les landings"
- **Contenu** : Lifecycle stages, lead scoring, automation marketing
- **Source** : `hubspot/04-api-crm.md`
- **Duree** : 8 min

### Slide 7 — Private Apps vs OAuth

- **Titre** : "Choisir le bon mode d'authentification"
- **Contenu** : Private App = interne / OAuth = clients externes, scopes
- **Source** : `hubspot/03-api-authentication.md`
- **Duree** : 8 min

### Slide 8 — HubSpot MCP setup

- **Titre** : "Connecter HubSpot a Claude Code"
- **Contenu** : `claude mcp add hubspot`, token, validation
- **Source** : `hubspot/09-mcp-remote-server.md` + `hubspot/11-mcp-clients.md`
- **Duree** : 10 min

### Slide 9 — Forms HubSpot dans Webflow

- **Titre** : "Embed natif vs custom"
- **Contenu** : Embed officiel HubSpot vs form Webflow + API call, comparaison
- **Source** : `hubspot/04-api-crm.md`
- **Duree** : 10 min

### Slide 10 — Skill /connect-hubspot-form

- **Titre** : "Co-construction du skill"
- **Contenu** : Brief skill - input formId + page Webflow, output embed + tracking
- **Exercice** : Exo 5.2 (co-construction live)
- **Source** : `formation-nopillo/05-format-2-jours.md`
- **Duree** : 30 min (incl. exo)

### Slide 11 — Tracking conversion form

- **Titre** : "GA4 + Pixel sur form_submit"
- **Contenu** : Events GA4 (form_view, form_submit), Pixel custom event
- **Source** : `hubspot/04-api-crm.md` + `google-ads/07-conversion-tracking.md`
- **Duree** : 8 min

### Slide 12 — Mapping champs

- **Titre** : "Webflow form -> HubSpot contact"
- **Contenu** : Mapping standard, champs custom, validation
- **Source** : `hubspot/04-api-crm.md`
- **Duree** : 8 min

### Slide 13 — Exercice 5 brief

- **Titre** : "Embed form HubSpot sur la landing J1"
- **Contenu** : Brief Exo 5.3
- **Exercice** : Exo 5.3 (cf `04-exercices-jour-2.md`, 25 min)
- **Duree** : 25 min (incl. exo)

## Bloc 3 — Module 6 Google Ads avance (slides 14-20, 90 min, 11h00-12h30)

### Slide 14 — MCP Google Ads — landscape

- **Titre** : "Officiel vs Composio vs Cohnen"
- **Contenu** : Comparatif des 3 MCP, capacites, prerequis OAuth
- **Source** : `google-ads/04-mcp-google-ads.md`
- **Duree** : 10 min

### Slide 15 — Setup Composio Google Ads

- **Titre** : "OAuth en 5 min"
- **Contenu** : Demo live setup
- **Source** : `google-ads/04-mcp-google-ads.md`
- **Duree** : 10 min

### Slide 16 — Conversions et audiences

- **Titre** : "Setup conversions custom"
- **Contenu** : Conversion actions, GCLID, enhanced conversions, audiences custom
- **Source** : `google-ads/07-conversion-tracking.md`
- **Duree** : 12 min

### Slide 17 — Performance Max

- **Titre** : "PMax pour les landings ads"
- **Contenu** : Asset groups, signaux audience, KPIs cibles
- **Source** : `google-ads/06-automation-scripts.md`
- **Duree** : 8 min

### Slide 18 — Skill /setup-tracking-ads

- **Titre** : "Co-construction skill tracking"
- **Contenu** : GA4 + Pixel + CAPI + Consent V2 dans 1 skill
- **Exercice** : Exo 6.1 (co-construction)
- **Source** : `formation-nopillo/05-format-2-jours.md`
- **Duree** : 25 min

### Slide 19 — Anti-patterns Google Ads

- **Titre** : "Ce qui plombe le Quality Score"
- **Contenu** : Pages lentes, mismatch ad/landing, formulaires lourds, tracking foireux
- **Source** : `google-ads/09-anti-patterns.md`
- **Duree** : 8 min

### Slide 20 — Exercice 6 brief

- **Titre** : "Connecter MCP, lister campagnes, generer 1 conversion"
- **Contenu** : Brief Exo 6.2
- **Exercice** : Exo 6.2 (cf `04-exercices-jour-2.md`, 17 min)
- **Duree** : 17 min (incl. exo)

## Bloc 4 — Module 7 Meta Ads (slides 21-29, 105 min, 14h00-15h45)

### Slide 21 — Meta vs Google : ce qui change

- **Titre** : "Creative-first vs intent-first"
- **Contenu** : Tableau comparatif - intent (Google) vs interruption (Meta), implications landing
- **Source** : `meta-ads/`
- **Duree** : 8 min

### Slide 22 — Lead Forms vs landing externe

- **Titre** : "CPL 2-3x meilleur sur Lead Forms"
- **Contenu** : Quand utiliser Lead Forms (mobile, top funnel) vs landing (deep funnel, B2B)
- **Source** : `meta-ads/`
- **Duree** : 8 min

### Slide 23 — Vertical 9:16 + hook < 1.7s

- **Titre** : "Messaging match creative -> landing"
- **Contenu** : Hook < 1.7s creative, replication tonalite landing, vertical-first
- **Source** : `meta-ads/`
- **Duree** : 10 min

### Slide 24 — Pixel + CAPI

- **Titre** : "Table stakes en 2026"
- **Contenu** : Pixel browser side + CAPI server side, deduplication, EMQ score
- **Source** : `meta-ads/`
- **Duree** : 10 min

### Slide 25 — Meta Ads MCP — landscape

- **Titre** : "Pipeboard / meta-mcp / Adzviser"
- **Contenu** : Comparatif des 3 MCP Meta, capacites
- **Source** : `meta-ads-mcp/`
- **Duree** : 10 min

### Slide 26 — Setup Pipeboard

- **Titre** : "Demo setup en live"
- **Contenu** : OAuth Pipeboard, validation, premier prompt
- **Source** : `meta-ads-mcp/`
- **Duree** : 10 min

### Slide 27 — Skill /landing-meta-ads

- **Titre** : "Co-construction skill Meta"
- **Contenu** : Variante landing creative-first, vertical-first
- **Exercice** : Exo 7.1 (co-construction)
- **Source** : `formation-nopillo/05-format-2-jours.md`
- **Duree** : 25 min

### Slide 28 — Advantage+ Shopping

- **Titre** : "Pour e-commerce uniquement"
- **Contenu** : Catalog feed, dynamic ads, integration Webflow CMS
- **Source** : `meta-ads/`
- **Duree** : 8 min

### Slide 29 — Exercice 7 brief

- **Titre** : "Variante landing Meta Ads"
- **Contenu** : Brief Exo 7.2
- **Exercice** : Exo 7.2 (cf `04-exercices-jour-2.md`, 16 min)
- **Duree** : 16 min (incl. exo)

## Bloc 5+6 — Workflow equipe + Bilan (slides 30-40, 90 min, 16h00-17h30)

| # | Titre | Contenu cle | Source | Exo | Duree |
|---|-------|-------------|--------|-----|-------|
| 30 | Repo `.claude/skills/` partage | Git, branches, PR review | `cdc-claude-code-audit/04-architecture.md` | - | 8 min |
| 31 | Convention nommage skills | Prefixes (apply-, landing-, audit-, connect-, setup-), semver, README | `formation-nopillo/03-methodologie-formateur.md` | - | 8 min |
| 32 | Onboarding nouveau dev | Checklist : clone, install MCP, lire 5 SKILL.md clefs | `formation-nopillo/05-format-2-jours.md` | - | 10 min |
| 33 | Exercice 8 brief | Push skills J1+J2 dans repo Git Nopillo | idem | Exo 8.1 | 25 min |
| 34 | Code review collective | 1-2 binomes presentent + feedback formateur | `pedagogie-formation/05-techniques-animation.md` | - | 10 min |
| 35 | Recap 6 skills livres | Tableau visuel 3 J1 + 3 J2 | `formation-nopillo/05-format-2-jours.md` | - | 4 min |
| 36 | Demo finale "live" | Production landing complete < 15 min, formateur + 1 participant en parallele | idem | demo | 15 min |
| 37 | Plan d'action 30 jours | Chacun ecrit ses 3 skills cibles + deadline | `pedagogie-formation/06-evaluation.md` | plan ecrit | 5 min |
| 38 | Skill check post + NPS | Lien Tally / Typeform | `07-evaluation-skill-check.md` | check | 5 min |
| 39 | Office hours + suivi | 2h offert, Slack workshop, mail J+30 / J+90 | `pedagogie-formation/07-materiel-pedagogique.md` | - | 3 min |
| 40 | Kit avance et merci | 5 templates (SaaS, recrutement, e-commerce, local, lead-gen B2B) | `formation-nopillo/05-format-2-jours.md` | - | 2 min |

## Repartition + sources

Theorie/Demo 25% (~1.75h), Pratique guidee 65% (~4.55h), Bilan/skill check 10% (~0.7h).

Exemple prompt MCP HubSpot (slide 8) :

```bash
claude mcp add hubspot --token <PRIVATE_APP_TOKEN>
claude mcp list
# > hubspot ✓ connected
```

## Sources

- `docs/formation-nopillo/05-format-2-jours.md` (programme officiel J2)
- `docs/hubspot/` (03-api-authentication, 04-api-crm, 09-mcp-remote-server, 11-mcp-clients)
- `docs/google-ads/` (04-mcp-google-ads, 06-automation-scripts, 07-conversion-tracking, 09-anti-patterns)
- `docs/meta-ads/` + `docs/meta-ads-mcp/`
- `docs/pedagogie-formation/05-techniques-animation.md`
