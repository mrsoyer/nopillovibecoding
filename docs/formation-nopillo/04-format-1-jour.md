# Format 1 Jour — "Decouverte + Premiere Landing Live"

## Vue d'Ensemble

| Critere | Valeur |
|---------|--------|
| Duree | 7h (9h-12h30 / 14h-17h30) |
| Format | Presentiel ou visio synchrone |
| Participants max | 6-8 |
| Pre-requis | Maitrise Webflow basique + ordi avec Claude Code installe |
| Livrable participant | 1 landing "ads-ready" produite pendant la formation |
| Tarif | **950 € HT** (tout inclus : 600 € animation + 350 € prep) |

**Promesse** : a la fin de la journee, chaque participant a produit une landing optimisee Google Ads via Claude Code + Webflow MCP, et sait reproduire le workflow.

## Cible ideale

- Equipe Nopillo curieuse mais pas encore convaincue (decouverte)
- Profil decideur (CEO, Head of Design) qui veut evaluer avant d'engager
- Freelance/independant qui veut tester avant 2j ou 3j

## Pre-requis a verifier J-7

| Item | Verification |
|------|-------------|
| Compte Webflow Workspace | Acces participant valide |
| Claude Code installe | `claude --version` >= dernier release |
| MCP Webflow connecte | OAuth Webflow + Bridge App testes |
| Brief landing | Brief client minimal (cible, offre, CTA) |

## Programme heure par heure

### 9h00 — 9h30 : Tour de table + framing

- Presentations participants + objectifs personnels
- Demonstration eclair : 1 landing produite en 5 min en live
- **Promesse de la journee** : vous repartez avec ce livrable

### 9h30 — 10h45 : Module 1 — Setup & MCP Webflow

**Objectifs** :
- Comprendre Claude Code + MCP en 15 min
- Installer/verifier Webflow MCP
- Maitriser les 18 categories d'outils du MCP Webflow

**Source** : [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) + [meilleures-formations-webflow/06-webflow-mcp-claude.md](../meilleures-formations-webflow/06-webflow-mcp-claude.md)

**Exercice** : "Liste mes sites Webflow, recupere les pages du site X, modifie le SEO d'une page test"

### 10h45 — 11h00 : Pause

### 11h00 — 12h30 : Module 2 — Methodologie "Documentation-First"

**Objectifs** :
- Comprendre le pipeline `/doc-maker` -> `/cdc-maker` -> `/skill-maker` -> MCP
- Pratiquer `/doc-maker` sur un concurrent du brief

**Source** : [03-methodologie-formateur.md](03-methodologie-formateur.md)

**Etude de cas** : presentation de [cdc-landing-improvement](../cdc-landing-improvement/) — "voici ce qui se passe sans methodo : 5 defauts critiques"

**Exercice** : `/doc-maker scout concurrent [URL]` -> obtenir la doc en 10 min

### 12h30 — 14h00 : Pause dejeuner

### 14h00 — 15h30 : Module 3 — Production landing Google Ads

**Objectifs** :
- Best practices landing Google Ads 2026 (Quality Score, LCP, mobile-first)
- Generer une landing complete : Hero, social proof, form, CTAs
- Personnalisation URL params (DKI, audiences)

**Sources** :
- [google-ads/03-landing-page-quality-score.md](../google-ads/03-landing-page-quality-score.md)
- [google-ads/05-personalization-dynamic-content.md](../google-ads/05-personalization-dynamic-content.md)
- [google-ads/08-webflow-integration.md](../google-ads/08-webflow-integration.md)

**Exercice principal** : produire une landing complete via prompts + MCP Webflow.

### 15h30 — 15h45 : Pause

### 15h45 — 16h45 : Module 4 — Tracking & Conversion

**Objectifs** :
- GA4 + Google Ads conversions
- Form HubSpot connecte (preview du module 2j)
- Consent Mode V2 minimal

**Sources** :
- [google-ads/07-conversion-tracking.md](../google-ads/07-conversion-tracking.md)
- [hubspot/04-api-crm.md](../hubspot/04-api-crm.md) (extrait)

**Exercice** : ajouter un form + tracking conversion sur la landing produite.

### 16h45 — 17h30 : Bilan + ouverture

- Demo des landings produites (1 par participant ou par binome)
- Q&A
- Ouverture sur formats 2j et 3j (slides 5 min sur ce qui n'a pas pu etre couvert)
- Distribution du **kit de continuation** : prompts pre-ecrits, links docs, depot Git template

## Repartition theorie / pratique

```
Theorie / Demo : 35% (~2.5h)
Pratique guidee : 50% (~3.5h)
Bilan / Q&A     : 15% (~1h)
```

## Materiel fourni participants

- [ ] Slides PDF (20-30 pages)
- [ ] Acces depot Git template `nopillo-landing-template`
- [ ] Doc reference imprimee (4 pages : MCP Webflow + checklist landing ads)
- [ ] Acces lecture aux 6 docs `docs/` du repo
- [ ] **Skill genere ensemble** : `.claude/skills/nopillo-landing-google-ads/`
- [ ] Replay video (visio) ou notes formateur (presentiel)

## Ce qui n'est PAS couvert (frustrations a anticiper)

| Frustration | Reponse | Renvoi vers |
|------------|---------|------------|
| "On voulait Meta Ads" | Pas le temps en 1j, on a focalise Google | Format 2j |
| "Et HubSpot avance ?" | Vu en surface | Format 2j |
| "Et si on sort de Webflow ?" | Hors scope | Format 3j |
| "Comment industrialiser dans l'equipe ?" | Pas de skill avance | Format 2j |
| "On veut un projet client complet" | Pas le temps | Format 3j |

## Risques & mitigation

| Risque | Mitigation |
|--------|-----------|
| Bridge App Webflow plante en live | Demo de fallback Data API only |
| Quotas Webflow MCP atteints | Comptes test pre-prepares |
| Niveau Claude Code heterogene | Binomage debutant + senior |
| Brief landing pas pret | Brief generique fourni par formateur |

## Sources

- [docs/WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) — reference MCP
- [docs/google-ads/](../google-ads/) — modules Google Ads
- [docs/hubspot/](../hubspot/) — extrait form HubSpot
- [docs/cdc-landing-improvement/](../cdc-landing-improvement/) — etude de cas
- [Conducting a Workshop - Community Tool Box](https://ctb.ku.edu/en/table-of-contents/structure/training-and-technical-assistance/workshops/main) — pedagogie
