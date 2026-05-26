# 02 — Pipeline Doc -> CDC -> Skill -> Execute

> Le pipeline complet en 4 etapes, avec exemples reels du repo Nopillo.

## Vue d'ensemble

```
┌────────────────┐    ┌─────────────────┐    ┌────────────────┐    ┌──────────────────┐
│ 1. ENQUETER    │ -> │ 2. CADRER       │ -> │ 3. CAPITALISER │ -> │ 4. EXECUTER      │
│ /doc-maker     │    │ /cdc-maker      │    │ /skill-maker   │    │ MCPs + Claude    │
└────────────────┘    └─────────────────┘    └────────────────┘    └──────────────────┘
     docs/[X]/             docs/[client]/        .claude/skills/         Le livrable
```

| Etape | Outil | Livrable | Quand l'invoquer |
|-------|-------|----------|------------------|
| 1. Enqueter | `/doc-maker` | `docs/[sujet]/` | Avant chaque nouveau projet ou nouvelle techno |
| 2. Cadrer | `/cdc-maker` | `docs/[projet]/CDC-*.md` | Avant chaque projet client |
| 3. Capitaliser | `/skill-maker` | `.claude/skills/[skill]/` | Apres avoir fait 2x la meme chose |
| 4. Executer | MCPs + prompts | Le livrable client | A chaque action sur le projet |

## Etape 1 — `/doc-maker` : enqueter

### A quoi ca sert

Avant de coder une landing pour un client, on enquete systematiquement sur :
- **Concurrents** : top 5 sites du secteur, leurs offres, leur structure
- **Design systems** a aspirer : tokens, typos, composants
- **Tech utilisees** : leur stack, leur tracking, leurs A/B tests
- **Best practices** specifiques au vertical (B2B SaaS, e-commerce, local, etc.)

### Format de sortie

```
docs/[sujet]/
├── _index.md              # Index + 3 takeaways
├── 01-overview.md         # Vue ensemble
├── 02-[theme].md
├── 03-[theme].md
├── ...
└── sources.md             # Sources web consultees
```

### Exemples reels du repo

| Folder | Genere par | Contenu |
|--------|-----------|---------|
| `docs/google-ads/` | doc-maker | 12 fichiers (campagnes, keywords, conversion) |
| `docs/meta-ads/` | doc-maker | Specs Meta Ads complete |
| `docs/hubspot/` | doc-maker | 14 fichiers HubSpot CRM + Forms + Marketing |
| `docs/meilleures-formations-webflow/` | doc-maker | Etat de l'art concurrentiel formations |
| `docs/cdc-claude-code-audit/` | doc-maker | Architecture Claude Code analysee |

### Pattern type "scout concurrents"

```
/doc-maker analyse concurrentielle B2B SaaS RH France :
recherche les top 10 concurrents de [client],
documente pour chacun : structure landing, hero, social proof,
formulaires, tracking detecte, design system, anti-patterns observes.
Sortie : docs/concurrents-[client]/
```

5 doc-maker en parallele = 5 docs en 10 min au lieu de 5 jours. Voir `03-pattern-scout-concurrents.md`.

### ROI mesure

| Sans `/doc-maker` | Avec `/doc-maker` |
|-------------------|-------------------|
| 2-3 jours scout manuel | 10-30 min |
| Recherches non capitalisees | Reutilisables sur le client suivant |
| Risque de "blanc" sur les bonnes pratiques | Convergence multi-sources documentee |

## Etape 2 — `/cdc-maker` : cadrer en CDC

### A quoi ca sert

Transformer la commande client floue en **plan d'action structure** :
- Decoupage en taches atomiques
- Estimation effort
- Dependances entre taches
- Assignation executeur (toi, Claude+MCP, agent X)
- Waves d'execution paralleles

### Format de sortie

```
docs/[projet]/
├── _index.md
├── 01-contexte.md
├── 02-taches.md           # Decoupage + dependances
├── 03-architecture.md
├── 04-recommandations.md
├── 05-taches-execution.md # Waves de paralelisation
└── sources.md
```

### Exemple reel : `cdc-landing-improvement`

Tu as deja fait : 30 taches reparties sur 5 phases, 7 waves d'execution paralleles, chacune avec son executeur (Webflow MCP, manuel, etc.).

### Pattern type pour Nopillo

```
/cdc-maker landing recrutement immobilier We Invest :
brief : recruter 50 mandataires/mois via Google Ads,
cible : agents immo independants experimentes,
budget : 10k EUR landing + setup ads,
existant : DS Nopillo + composants Webflow library reutilisable.
Sortie : CDC + decoupage waves + assignation MCP.
```

### ROI mesure

| Sans CDC | Avec CDC |
|----------|----------|
| Surprise sur le perimetre client | Validation explicite avant de coder |
| Retours en boucle sur ce qui manque | Perimetre ferme = facturation propre |
| Pas de paralelisation | Waves -> 30-50% gain de temps |

## Etape 3 — `/skill-maker` : capitaliser

### A quoi ca sert

Transformer un workflow que tu refais souvent en **slash command Claude Code** appelable d'un mot.

Format officiel : un skill = 1 dossier `.claude/skills/[nom]/` avec un `SKILL.md` (frontmatter YAML + instructions markdown). Auto-invoque selon le contexte ou appelable explicitement.

### Format SKILL.md minimal

```markdown
---
name: connect-hubspot-form
description: Embed un form HubSpot dans Webflow + tracking GA4/Meta
---

# Connect HubSpot Form

## Inputs
- portalId : portal HubSpot
- formId : ID du form
- pageId Webflow : page cible

## Steps
1. Generer code embed (script + container)
2. Inserer dans la page Webflow via MCP
3. Configurer events GA4 form_submit
4. Configurer Meta Pixel Lead event
5. Tester avec email perso
6. Verifier contact dans HubSpot

## Validation
- [ ] Form visible
- [ ] Submit fonctionnel
- [ ] Contact cree dans HubSpot
- [ ] Event GA4 detecte (DebugView)
- [ ] Event Meta detecte (Test Events)
```

### Pattern de creation

```
/skill-maker je veux un skill /connect-hubspot-form qui :
1. Prend en parametre le portalId HubSpot et l'ID du form
2. Genere le code embed Webflow (script + container)
3. Configure les events de tracking (form_submit dans GA4 + Meta Pixel)
4. Documente le mapping champs HubSpot ↔ Webflow
Sources : docs/hubspot/04-api-crm.md, docs/google-ads/07-conversion-tracking.md
```

### Skills Nopillo type

Voir `05-pattern-skills-recurrents.md` pour la liste complete avec priorisation.

### ROI mesure

| Sans skill | Avec skill |
|------------|------------|
| 30 min de prompt detaille a chaque fois | 1 mot : `/connect-hubspot-form` |
| Variabilite selon qui code | Workflow standardise = qualite stable |
| Onboarding nouveaux membres long | Nouveau dev -> skills deja la |

## Etape 4 — Executer via MCPs

### MCPs Nopillo deployees

| MCP | Utilite | Format formation |
|-----|---------|------------------|
| **Webflow** | Manipulation site (CMS, pages, composants, scripts) | 1j, 2j, 3j |
| **HubSpot** | Forms, contacts, lifecycle | 2j, 3j |
| **Google Ads** | Campagnes, keywords, conversions | 2j, 3j |
| **Meta Ads** | Campagnes Meta, lead forms | 2j, 3j |
| **Context7** | Doc a jour des libs (Astro, Tailwind, etc.) | 3j (option Netlify) |
| **Supabase** | Edge functions, DB | 3j (option) |

### Pattern d'execution type

Chaque tache du CDC = 1 prompt Claude Code qui combine :
1. **Skill** (s'il existe) : `/landing-google-ads`
2. **MCP calls** : Webflow CMS, Webflow Pages, etc.
3. **Validation** : screenshot + verification visuelle, run audit script

### Exemple complet end-to-end

```
Brief client recu : "landing pour recruter 50 mandataires immo"
     |
     v
[1] /doc-maker : pas de docs/concurrents-immo-recrutement/ -> on enquete
     -> 30 min plus tard : 5 fiches concurrents documentees
     |
     v
[2] /cdc-maker : pas de docs/we-invest/ -> on cadre
     -> 1h plus tard : CDC en 4 phases, 8 waves, executeurs assignes
     |
     v
[3] Skill check : skill `/landing-recrutement-immo` existe ?
     -> Non, on note "creer apres ce projet"
     -> Pour l'instant on prompt detaille
     |
     v
[4] Execution :
     - Use webflow MCP : creation page selon CDC
     - Use hubspot MCP : connection form mandataire
     - Use google-ads (eventuel) : setup conversion
     - Verification : screenshot + test form + Lighthouse
     |
     v
LIVRABLE VALIDE
     |
     v
[BONUS APRES] : on a fait ce type de landing 2x ?
     -> /skill-maker /landing-recrutement-immo
     -> Prochaine fois : 1 mot
```

## Iteration et amelioration continue

Le pipeline n'est pas lineaire mais **circulaire** :
- Chaque execution genere des apprentissages
- Les apprentissages enrichissent docs/ (via doc-maker re-run)
- Les workflows recurrents deviennent des skills (skill-maker)
- Les CDC deviennent des templates reutilisables

## Sources

- `docs/formation-nopillo/03-methodologie-formateur.md`
- `docs/cdc-claude-code-audit/04-architecture.md`
- `docs/cdc-landing-improvement/02-taches.md` — exemple CDC reel
- `docs/google-ads/`, `docs/hubspot/`, `docs/meta-ads/` — exemples doc-maker reels
