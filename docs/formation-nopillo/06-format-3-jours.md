# Format 3 Jours — "Maitrise Complete + Alternatives Webflow"

## Vue d'Ensemble

| Critere | Valeur |
|---------|--------|
| Duree | 21h (3x 7h) |
| Format | Presentiel obligatoire (immersion + projet final) |
| Participants max | 6 (qualite > volume) |
| Pre-requis | Equipe Nopillo motivee, Claude Code installe, briefs reels |
| Livrable participant | 1 projet client complet de A a Z + 6-8 skills + maitrise alternative Webflow |
| Tarif | **2 850 € HT** (3 × 950 € : 1 800 € animation + 1 050 € prep) |

**Promesse** : maitrise totale du workflow industrialise + capacite a sortir de Webflow quand c'est pertinent (Supabase Edge + Netlify) + savoir-faire pour former en interne les juniors.

## Cible ideale

- Equipe Nopillo prete a "operationnaliser" Claude Code comme infrastructure
- Au moins 1 dev senior dans le groupe (peut etre auto-didacte)
- Vision long-terme : devenir une **agence "Claude-native"**, pas juste utilisateur

## JOUR 1 — Programme du format 2 jours, JOUR 1

Identique au [format 2 jours, J1](05-format-2-jours.md).

Resume : MCP Webflow approfondi + Methodologie doc-maker + cdc-maker + 3 skills crees collectivement.

## JOUR 2 — Programme du format 2 jours, JOUR 2

Identique au [format 2 jours, J2](05-format-2-jours.md).

Resume : HubSpot integration + Google Ads avance + Meta Ads + workflow d'equipe.

## JOUR 3 — Alternatives Webflow + Projet final + Train-the-trainer

### 9h00 — 9h15 : Framing J3

- Recap J1+J2
- Promesse J3 : sortir de Webflow quand pertinent + livrer un projet complet

### 9h15 — 10h45 : Module 9 — Quand sortir de Webflow ?

**Objectifs** :
- Cartographie : quand Webflow > Code, quand Code > Webflow
- Cas types : A/B test serveur, personalization avancee, custom logic, cost
- Decision matrix Nopillo : quel client merite quel stack ?

**Sources** :
- [formations-vibecoding-landing/06-claude-code-supabase-saas.md](../formations-vibecoding-landing/06-claude-code-supabase-saas.md)
- [formations-vibecoding-landing/04-outils-vibecoding.md](../formations-vibecoding-landing/04-outils-vibecoding.md)
- `docs/netlify-landing/` (a creer — enquete #6)
- `docs/supabase-edge-landing/` (a creer — enquete #5)

**Exercice** : sur 5 briefs clients fournis, decider Webflow vs Code, justifier.

### 10h45 — 11h00 : Pause

### 11h00 — 12h30 : Module 10 — Stack alternative : Astro + Netlify + Supabase

**Objectifs** :
- Setup projet Astro + Tailwind en 5 min via Claude Code
- Deploy Netlify (preview + prod)
- Form Netlify natif (sans backend)
- Personnalisation via Supabase Edge Functions

**Sources** :
- `docs/netlify-landing/` (a creer)
- `docs/supabase-edge-landing/` (a creer)
- [Netlify x Supabase integration](https://docs.netlify.com/extend/install-and-use/setup-guides/supabase-integration/)

**Exercice** : creer une landing alternative en pure code (Astro), deployee sur Netlify, form Netlify connecte HubSpot.

### 12h30 — 14h00 : Dejeuner

### 14h00 — 16h00 : Module 11 — Projet final (cas client)

**Objectifs** :
- Mettre tout en pratique sur un cas reel
- Choisir le stack (Webflow ou Astro/Netlify)
- Produire de A a Z : `/doc-maker` -> `/cdc-maker` -> execution

**Cas client suggere** : un brief reel Nopillo (a fournir J-7), choisi pour sa complexite moyenne (B2B SaaS recrutement, e-commerce DTC, etc.).

**Workflow type pendant l'exercice** :
1. `/doc-maker` 5 concurrents en parallele (10 min)
2. `/extract-design-system` du concurrent reference (15 min)
3. `/cdc-maker` projet (30 min)
4. Execution waves : MCP Webflow ou Astro/Netlify (1h)
5. Tracking + form (`/connect-hubspot-form`) (15 min)

**Livrable** : landing en preview, demo individuelle ou par binome a 16h.

### 16h00 — 16h15 : Pause

### 16h15 — 17h00 : Module 12 — Train-the-trainer Nopillo

**Objectifs** :
- Comment former vos prochains juniors en interne ?
- Pedagogie tech : pair programming, demo + reproduce, code review
- Materiel pedagogique reutilisable

**Sources** :
- `docs/pedagogie-formation/` (a creer — enquete #7)
- [Conducting a Workshop - Community Tool Box](https://ctb.ku.edu/en/table-of-contents/structure/training-and-technical-assistance/workshops/main)

**Livrable** : "kit onboarding nouveau dev Nopillo" : Day 1 / Week 1 / Month 1 todo + skills a maitriser.

### 17h00 — 17h30 : Bilan & plan 90 jours

- Demo des projets finaux
- Plan d'action 90 jours par participant
- Q&A ouverte
- Remise du kit complet (Git, slides, templates, skills, docs)

## Repartition theorie / pratique

```
Theorie / Demo : 20% (~4h)
Pratique guidee : 50% (~10h)
Projet final : 20% (~4h)
Bilan / Train-the-trainer : 10% (~3h)
```

## Materiel fourni participants

- [ ] Tout le materiel des formats 1j et 2j
- [ ] **Stack alternative complet** : repo template `nopillo-landing-astro` (Astro + Tailwind + Netlify + Supabase Edge)
- [ ] **Decision matrix** Webflow vs Code (PDF + Notion template)
- [ ] **Kit train-the-trainer** : checklist onboarding, exercices types, materiel pedagogique
- [ ] **6-8 skills capitalises** (les 6 du format 2j + au moins 2 nouveaux issus du projet final)
- [ ] Acces lifetime aux nouvelles versions des docs `docs/`
- [ ] Suivi 30 jours post-formation : 1 session async Q&A par participant

## Differenciateurs vs format 2 jours

| Apport unique 3j | Pourquoi c'est important |
|------------------|--------------------------|
| Sortir de Webflow | Eviter le piege "tout Webflow" pour des cas qui meritent du code |
| Astro + Netlify + Supabase | Stack moderne 2026 pour landings ultra-rapides |
| Projet final cas reel | Confiance acquise sur un projet complet |
| Train-the-trainer | Autonomie pour faire grandir l'equipe en interne |
| Decision matrix | Outil de devis : quel stack pour quel client ? |

## Risques specifiques 3j

| Risque | Mitigation |
|--------|-----------|
| Fatigue J3 (overload) | Alterner formats : 50% pratique, 20% projet, 30% theorie/co-construction |
| Setup Astro/Netlify long | Boilerplate pre-prepare + Codespaces dispo |
| Cas client trop complexe | Brief simplifie, ouvert au "pas tout faire mais bien faire le coeur" |
| Participant largue J2-J3 | Binomage senior+junior, sessions de catch-up midi |

## Ce qui n'est PAS couvert (vraiment, cette fois)

| Sujet | Pourquoi pas |
|-------|-------------|
| Build d'app SaaS complete (auth, dashboards, billing) | Hors scope landings — orienter vers une formation tech specifique |
| SEO programmatique a grande echelle | Sujet a part entiere |
| Prog ads management quotidien | C'est un metier, pas un outil |
| Subagents Claude / Hooks avances | Trop niche pour une agence — laisser pour mentoring 1:1 |

## Plan de suivi 90 jours post-formation

| Semaine | Action |
|---------|--------|
| S1 | Implementation skills sur 1 projet client reel |
| S2-3 | Async Q&A 1:1 (30 min) avec Thomas |
| M1 | Audit des 3 premieres landings produites par Nopillo post-formation |
| M2 | Workshop demi-journee : "ce qu'on a appris en 1 mois" |
| M3 | Bilan ROI : temps avant/apres, qualite avant/apres |

## Sources

- Tout le materiel formats 1j et 2j +
- `docs/netlify-landing/` (enquete #6)
- `docs/supabase-edge-landing/` (enquete #5)
- `docs/pedagogie-formation/` (enquete #7)
- [Supabase Edge Functions docs](https://supabase.com/docs/guides/functions)
- [Netlify Supabase Integration](https://docs.netlify.com/extend/install-and-use/setup-guides/supabase-integration/)
- [Best Vercel alternatives 2026 - Northflank](https://northflank.com/blog/best-vercel-alternatives-for-scalable-deployments)
- [docs/formations-vibecoding-landing/06-claude-code-supabase-saas.md](../formations-vibecoding-landing/06-claude-code-supabase-saas.md)
