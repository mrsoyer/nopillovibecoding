# Format 2 Jours — "Autonomie sur le Workflow Industrialise"

## Vue d'Ensemble

| Critere | Valeur |
|---------|--------|
| Duree | 14h (2x 7h) |
| Format | Presentiel recommande (immersion) ou visio synchrone |
| Participants max | 6-8 |
| Pre-requis | Format 1j fait OU profil senior Webflow + Claude Code installe |
| Livrable participant | 2-3 landings + 3-5 skills custom Nopillo capitalises |
| Tarif | **1 900 € HT** (2 × 950 € : 1 200 € animation + 700 € prep) |

**Promesse** : a la fin des 2 jours, l'equipe Nopillo a **industrialise** sa production de landings : skills reutilisables, workflow MCP rode, integration HubSpot + tracking ads complete.

## Cible ideale

- Equipe Nopillo prete a investir dans la methodologie
- Bonne maitrise Webflow + au moins 1 personne ayant utilise Claude Code
- Volume reel de landings/mois > 4

## Pre-requis a verifier J-7

| Item | Verification |
|------|-------------|
| Tous les pre-requis du format 1j | Idem |
| Compte HubSpot accessible (sandbox dispo) | Private App token genere |
| Compte Google Ads actif (sandbox MCC dispo) | OAuth Composio ou natif |
| Au moins 2 briefs landing pretes (cas pratiques reels) | Brief client valide |
| Repertoire `.claude/skills/` du repo Nopillo | Initialise |

## JOUR 1 — Maitrise Webflow + Methodologie + Skills

### 9h00 — 9h30 : Framing J1

- Tour de table + objectifs
- Demo : 2 landings produites en parallele en 10 min via skills custom
- Plan des 2 jours

### 9h30 — 11h00 : Module 1 — MCP Webflow approfondi

**Au-dela du 1j** : maitriser **toutes** les 18 categories du MCP Webflow.

**Focus avances** :
- Components advances (Designer API + Bridge App stable)
- Variables modes (light/dark, brand A/B)
- Scripts custom (tracking, A/B, schema.org)
- Webhooks pour automation post-publish
- Limitations connues (locales, throttle CMS bulk)

**Source** : [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) en integralite

**Exercice** : injecter le DS Nopillo (variables + composants) dans un site vide.

### 11h00 — 11h15 : Pause

### 11h15 — 12h30 : Module 2 — Methodologie "Documentation-First"

**Approfondissement vs format 1j** :
- Pattern "scout 5 concurrents en parallele" (5 doc-maker simultanes)
- Pattern "aspirer un design system" (technique d'extraction CSS + tokens)
- Pattern "etude de cas inverse" (analyser pourquoi une landing convertit)

**Sources** :
- [03-methodologie-formateur.md](03-methodologie-formateur.md)
- [cdc-claude-code-audit/03-best-practices.md](../cdc-claude-code-audit/03-best-practices.md)

**Exercice** : binome -> chaque binome lance 5 doc-maker concurrents sur leur brief, sortie : 5 docs en 30 min.

### 12h30 — 14h00 : Dejeuner

### 14h00 — 15h30 : Module 3 — Cahiers des charges (`/cdc-maker`)

**Objectifs** :
- Comprendre la mecanique CDC -> waves -> executeurs
- Generer un CDC complet pour une landing client
- Decoupage Wave 1 (parallele), Wave 2 (sequentiel), etc.

**Source** : [cdc-landing-improvement/02-taches.md](../cdc-landing-improvement/02-taches.md)

**Exercice** : `/cdc-maker` sur le brief reel du participant -> CDC valide en 1h.

### 15h30 — 15h45 : Pause

### 15h45 — 17h30 : Module 4 — Skills Nopillo (`/skill-maker`)

**Objectifs** :
- Comprendre l'anatomie d'un skill Claude Code
- Capitaliser les workflows recurrents Nopillo en skills

**Skills produits ensemble** :
1. `/apply-nopillo-ds` — applique le DS Nopillo (variables + composants base)
2. `/landing-google-ads` — landing optimisee Google Ads (Hero, Form, CTAs, tracking)
3. `/audit-landing` — audit conversion d'une landing existante

Sources :
- [03-methodologie-formateur.md](03-methodologie-formateur.md)
- [google-ads/03-landing-page-quality-score.md](../google-ads/03-landing-page-quality-score.md)

**Livrable J1** : 3 skills committed dans `.claude/skills/` du repo Nopillo.

## JOUR 2 — Integration ads, HubSpot, Meta Ads

### 9h00 — 9h15 : Recap J1 + plan J2

### 9h15 — 10h45 : Module 5 — HubSpot integration complete

**Objectifs** :
- Comprendre HubSpot CRM API + MCP
- Skill `/connect-hubspot-form` ecrit ensemble
- Form HubSpot embed dans Webflow + tracking conversion

**Sources** :
- [hubspot/03-api-authentication.md](../hubspot/03-api-authentication.md) (Private Apps)
- [hubspot/04-api-crm.md](../hubspot/04-api-crm.md)
- [hubspot/09-mcp-remote-server.md](../hubspot/09-mcp-remote-server.md)
- [hubspot/11-mcp-clients.md](../hubspot/11-mcp-clients.md)

**Exercice** : sur la landing produite J1, ajouter form HubSpot via skill, valider creation de contact + tracking GA4.

### 10h45 — 11h00 : Pause

### 11h00 — 12h30 : Module 6 — Google Ads avance + MCP

**Objectifs** :
- MCP Google Ads (officiel + Composio + cohnen)
- Setup conversions, audiences custom, Performance Max
- Skills `/setup-tracking-ads`

**Sources** :
- [google-ads/04-mcp-google-ads.md](../google-ads/04-mcp-google-ads.md)
- [google-ads/06-automation-scripts.md](../google-ads/06-automation-scripts.md)
- [google-ads/07-conversion-tracking.md](../google-ads/07-conversion-tracking.md)
- [google-ads/09-anti-patterns.md](../google-ads/09-anti-patterns.md)

**Exercice** : connecter Google Ads MCP, lister campagnes, generer une conversion sur la landing J1.

### 12h30 — 14h00 : Dejeuner

### 14h00 — 15h45 : Module 7 — Meta Ads (Facebook + Instagram)

**Pre-requis enquete** : enquete #2 + #3 doit etre faite (voir [02-enquetes-manquantes.md](02-enquetes-manquantes.md)).

**Objectifs** :
- Specificites Meta Ads vs Google Ads (creative-first, vertical 9:16, Lead Forms)
- Pixel + Conversions API (CAPI) — table stakes 2026
- Meta Ads MCP (Pipeboard, meta-mcp)
- Skill `/landing-meta-ads`

**Sources** : `docs/meta-ads/` (a produire) + `docs/meta-ads-mcp/` (a produire)

**Exercice** : produire une variante de la landing optimisee Meta Ads (vertical-first, hook < 1.7s, message-match).

### 15h45 — 16h00 : Pause

### 16h00 — 17h00 : Module 8 — Workflow d'equipe

**Objectifs** :
- Setup `.claude/skills/` partage en equipe via Git
- Convention de nommage skills Nopillo
- Onboarding nouveau dev : que faire en J1 ?

**Sources** :
- [03-methodologie-formateur.md](03-methodologie-formateur.md)
- [cdc-claude-code-audit/04-architecture.md](../cdc-claude-code-audit/04-architecture.md)

**Exercice** : push des skills crees J1+J2 dans le repo Git Nopillo.

### 17h00 — 17h30 : Bilan + plan d'action 30 jours

- Demo finale : production "live" d'une landing complete en < 15 min
- Plan d'action 30 jours par participant : 3 skills a creer apres la formation
- Q&A
- Distribution du kit avance (5 templates de landing : SaaS, recrutement, e-commerce, local, lead-gen B2B)

## Repartition theorie / pratique

```
Theorie / Demo : 25% (~3.5h)
Pratique guidee : 60% (~8h)
Co-construction skills + bilan : 15% (~2.5h)
```

## Materiel fourni participants

- [ ] Tout le materiel du format 1j
- [ ] **5 skills capitalises** dans `.claude/skills/` Nopillo
- [ ] **5 templates landing** ads-ready (Webflow Workspace clone-ready)
- [ ] Convention de nommage skills (markdown)
- [ ] Checklist onboarding nouveau dev (1 page)
- [ ] Repertoire `docs/concurrents-{client}` template

## Skills produits collectivement

| Skill | Source | Contenu |
|-------|--------|---------|
| `/apply-nopillo-ds` | J1 | Applique variables + composants Nopillo |
| `/landing-google-ads` | J1 | Landing optimisee Google Ads |
| `/audit-landing` | J1 | Audit conversion d'une URL |
| `/connect-hubspot-form` | J2 | Embed form HubSpot + tracking |
| `/setup-tracking-ads` | J2 | GA4 + Pixel + CAPI + Consent V2 |
| `/landing-meta-ads` | J2 | Variante landing Meta Ads (creative-first) |

## Ce qui n'est PAS couvert

| Frustration | Renvoi vers |
|------------|------------|
| "Et si on sort de Webflow ?" | Format 3j |
| "Supabase Edge / Netlify ?" | Format 3j |
| "Cas client complet J1-J5" | Format 3j |
| "Pedagogie pour former les juniors en interne" | Format 3j |

## Sources

- Tout le materiel format 1j +
- [docs/hubspot/](../hubspot/) — modules HubSpot complets
- [docs/google-ads/04-mcp-google-ads.md](../google-ads/04-mcp-google-ads.md)
- `docs/meta-ads/` (a creer — voir enquete #2)
- `docs/meta-ads-mcp/` (a creer — voir enquete #3)
- [Meta Ads Best Practices 2026 - LeadSync](https://leadsync.me/blog/meta-ads-best-practices/) — backup pour module Meta
- [Pipeboard Meta Ads MCP](https://pipeboard.co/) — MCP Meta utilise
