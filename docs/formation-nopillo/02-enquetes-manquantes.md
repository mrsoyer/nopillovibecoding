# Enquetes Manquantes — A Lancer Avant la Formation

## Vue d'Ensemble

8 enquetes additionnelles sont necessaires pour livrer une formation Nopillo de niveau professionnel. Chacune est lancable via `/doc-maker` ou recherche manuelle. Priorisation P0 (bloquante) → P3 (nice-to-have).

## P0 — Bloquantes (a faire avant choix du format)

### 1. Profil & contexte Nopillo

**Pourquoi** : Nopillo n'apparait pas dans les recherches web publiques. On ne peut pas adapter la formation sans connaitre :
- Taille equipe (1 freelance ? 5 designers ? 20 ?)
- Stack actuelle (Webflow seul ? Webflow + Framer ? React ?)
- Volume de landings/mois (et complexite type)
- Niveau Claude Code (deja installe ? jamais utilise ?)
- Clients types (B2B SaaS ? E-commerce ? Local ?)
- Budget formation (CPF ? OPCO ? cash ?)

**Methode** : entretien telephonique 30-45 min OU questionnaire (Notion/Tally) en 12 questions. **PAS** une recherche web — donnees inaccessibles.

**Livrable** : `docs/formation-nopillo/00-brief-nopillo.md` (interne, non commercial).

### 2. Meta Ads (Facebook + Instagram) — fondamentaux landings

**Pourquoi** : Nopillo demande explicitement Meta Ads en plus de Google Ads. Aucune doc dans le repo.

**Angles a couvrir** :
- Meta Ads campaign types (Sales, Leads, Engagement, Awareness)
- Lead Forms vs landing page externe (CPL 2-3x meilleur sur Lead Forms)
- Pixel + Conversions API (CAPI) — table stakes en 2026
- Creative-first : 80% du ROI = creative, pas targeting
- Messaging match (vertical video 9:16, hook < 1.7s)
- Advantage+ Shopping campaigns

**Methode** : `/doc-maker meta ads landing pages best practices conversion 2026`

**Livrable estime** : `docs/meta-ads/` (~10 fichiers, ~1500 lignes)

## P1 — Importantes (a faire avant production des supports)

### 3. Meta Ads MCP — panorama serveurs disponibles

**Pourquoi** : Plusieurs solutions existent (Pipeboard, Meta-MCP open source, Adzviser). Permet d'inclure un module MCP avances coherent.

**Angles** :
- Pipeboard (badged Meta Business Partner)
- meta-mcp (brijr/meta-mcp open source)
- Adzviser (no-code OAuth)
- Capabilites comparees : create campaign, ad creative, audience, analytics
- Setup Claude Code pour chaque
- Limites Meta Ads API (App Review, scopes)

**Methode** : `/doc-maker meta ads MCP server comparison setup Claude 2026`

**Livrable estime** : `docs/meta-ads-mcp/` (~6 fichiers, ~800 lignes)

### 4. Aspirer un design system depuis un site existant

**Pourquoi** : Nopillo veut "que les sites ne paraissent pas IA". Methode : aspirer un DS existant (tokens, composants, typo) et le reproduire dans Webflow.

**Angles** :
- Outils d'extraction (DevTools, CSS Stats, Whatfont, Project Wallace)
- Workflow Claude : screenshots → extraction tokens → reproduction Webflow MCP
- CSS variables + Webflow Variables (mapping)
- Anti-patterns (copier au pixel = juridique risque)
- Templates de prompt pour Claude

**Methode** : `/doc-maker extract design system from website tokens CSS variables Claude`

**Livrable estime** : `docs/design-system-extraction/` (~5 fichiers, ~700 lignes)

**Bonus** : ce livrable devient ensuite un **skill Claude Code** `/extract-design-system`.

### 5. Supabase Edge Functions pour landing personnalisees

**Pourquoi** : Nopillo veut une option "sortir de Webflow". Edge Functions = personnalisation server-side rapide (URL params, geo-IP, A/B test).

**Angles** :
- Setup projet (`supabase init`, `supabase functions new`)
- Patterns landing : SSR, edge personalization, A/B test
- Deploy Netlify Edge Functions vs Supabase Edge Functions vs Vercel Edge
- Connexion HubSpot/CRM depuis Edge
- Cost & latence vs Webflow

**Methode** : `/doc-maker supabase edge functions landing page personalization SSR`

**Livrable estime** : `docs/supabase-edge-landing/` (~7 fichiers, ~1000 lignes)

### 6. Netlify pour landing — alternative complete a Webflow

**Pourquoi** : Le module 3j inclut "creer une landing sans Webflow avec Netlify". Necessite stack + workflow concret.

**Angles** :
- Stack recommande (Astro / Next.js / Eleventy + Tailwind)
- Netlify Forms (form sans backend)
- Netlify Functions (serverless TS)
- Deploy preview workflow
- Quand Netlify > Webflow ? (a/b test serveur, custom logic, cost)
- Quand Webflow > Netlify ? (CMS visuel, equipes non-tech)

**Methode** : `/doc-maker netlify landing page deploy alternative webflow stack 2026`

**Livrable estime** : `docs/netlify-landing/` (~6 fichiers, ~900 lignes)

## P2 — Confort (renforcent le format 3 jours)

### 7. Pedagogie workshop tech 1-3 jours

**Pourquoi** : Pour eviter le piege "marathon de slides". Adultes apprennent par la pratique (70/20/10 rule, andragogy).

**Angles** :
- Format type 1j (intensif, 1 livrable concret)
- Format 2j (theorie J1, pratique J2)
- Format 3j (alternance + projet final)
- Ratio theorie/pratique cible 30/70
- Pauses, cycles 50-90 min
- Animation : pair programming, demo + reproduce, code review collectif
- Evaluation : avant/apres skill check, livrable evaluable
- Materiel : slides, prompts pre-ecrits, checklists, exercices

**Methode** : recherche + experience + ressources type "Train the Trainer"

**Livrable** : `docs/pedagogie-formation/` (~5 fichiers, ~600 lignes)

### 8. Methodologie "Documentation-First" — synthese de la methode Thomas

**Pourquoi** : C'est **le** differentiateur de la formation. Doit etre formalise comme un manifeste reutilisable.

**Angles** :
- Le pipeline : `/doc-maker` -> `/cdc-maker` -> `/skill-maker` -> execution MCP
- Pourquoi documenter avant de coder ? (cite : 65% reutilisation = ROI massif)
- Pattern "scout concurrents" (lance 5 doc-maker en parallele sur top 5 concurrents)
- Pattern "design system aspire" (skill `/extract-ds`)
- Pattern "skill Nopillo recurrent" (form HubSpot, hero high-conv, footer Nopillo)
- ROI mesure : temps avant/apres, qualite avant/apres

**Methode** : redaction interne (pas de recherche externe — c'est ta methode propre)

**Livrable** : `docs/methodologie-documentation-first/` (~4 fichiers, ~500 lignes)

## P3 — Nice-to-have (3 jours seulement)

### 9. CRM alternatives (Brevo, Pipedrive, Airtable) si Nopillo n'utilise pas HubSpot

A demander en P0 brief Nopillo. Si HubSpot n'est pas leur stack, prevoir module equivalent.

### 10. A/B testing infra pour landings ads

Outils 2026 (Posthog, Mida, AB Tasty, ABconvert) avec integration Webflow + Edge Functions.

## Tableau de planification

| # | Enquete | Priorite | Statut | Livrable |
|---|---------|----------|--------|----------|
| 1 | Brief Nopillo | P0 | TODO | Entretien 30-45 min — pas googlable |
| 2 | Meta Ads landings | P0 | **DONE 2026-05-05** | [docs/meta-ads/](../meta-ads/) (10 fichiers, 1133 lignes, 20/20) |
| 3 | Meta Ads MCP | P1 | **DONE 2026-05-05** | [docs/meta-ads-mcp/](../meta-ads-mcp/) (9 fichiers, 1022 lignes, 20/20) |
| 4 | Design system extraction | P1 | **DONE 2026-05-05** | [docs/design-system-extraction/](../design-system-extraction/) (9 fichiers, 1974 lignes, 20/20) |
| 5 | Supabase Edge | P1 | **DONE 2026-05-05** | [docs/supabase-edge-landing/](../supabase-edge-landing/) (10 fichiers, 2030 lignes, 20/20) |
| 6 | Netlify landing | P1 | **DONE 2026-05-05** | [docs/netlify-landing/](../netlify-landing/) (10 fichiers, 1917 lignes, 20/20) |
| 7 | Pedagogie workshop | P2 | **DONE 2026-05-05** | [docs/pedagogie-formation/](../pedagogie-formation/) (9 fichiers, 1349 lignes, 20/20) |
| 8 | Methodologie doc-first | P2 | **DONE 2026-05-05** | [docs/methodologie-documentation-first/](../methodologie-documentation-first/) (8 fichiers, 1607 lignes, 20/20) |

**Statut global** : 7/8 enquetes terminees (87.5%). Reste UNIQUEMENT le brief Nopillo (entretien client).

**Volume produit** : 65 nouveaux fichiers / ~11 000 lignes / tous a 20/20 audit.

## Plan de sequencement recommande

### Sprint enquetes (2 semaines)

**Semaine 1**
- J1 : Brief Nopillo (entretien)
- J2-3 : `/doc-maker meta ads landings` + `/doc-maker meta ads mcp` en parallele
- J4 : `/doc-maker design system extraction`
- J5 : Synthese, decision format

**Semaine 2** (si format 3j retenu)
- J1-2 : `/doc-maker supabase edge landing` + `/doc-maker netlify landing` parallele
- J3 : Doc methodologie + pedagogie
- J4-5 : Production supports formation (slides, exercices, depots Git)

## Sources

- Recherche [Nopillo](https://www.google.com/search?q=Nopillo+agence+webflow) — aucun resultat probant, profil non public
- [Meta Ads Funnel Strategy 2026 - Stackmatix](https://www.stackmatix.com/blog/meta-ads-funnel-strategy)
- [Meta ads best practices to follow in 2026 - LeadsBridge](https://leadsbridge.com/blog/meta-ads-best-practices/)
- [Pipeboard - Meta Ads MCP](https://pipeboard.co/) + [meta-mcp open source](https://github.com/brijr/meta-mcp)
- [Supabase Edge Functions docs](https://supabase.com/docs/guides/functions)
- [Netlify x Supabase integration](https://docs.netlify.com/extend/install-and-use/setup-guides/supabase-integration/)
- [Conducting a Workshop - Community Tool Box](https://ctb.ku.edu/en/table-of-contents/structure/training-and-technical-assistance/workshops/main)
- [Anthropic Skill Creator workflow - MindStudio](https://www.mindstudio.ai/blog/skill-creator-workflow-claude-code-sop-to-skill)
