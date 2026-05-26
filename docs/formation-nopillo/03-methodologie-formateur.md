# Methodologie Formateur — "Documentation-First Workflow"

## Vue d'Ensemble

C'est le **fil rouge** des 3 formats de formation : ta methode personnelle qui transforme Claude Code d'un simple outil de generation en une **chaine industrielle de production de landings**.

Le principe : **documenter avant de coder**, **capitaliser apres avoir code**.

## Le Pipeline en 4 etapes

```
┌────────────────┐    ┌─────────────────┐    ┌────────────────┐    ┌──────────────────┐
│ 1. ENQUETER    │ -> │ 2. CADRER       │ -> │ 3. CAPITALISER │ -> │ 4. EXECUTER      │
│ /doc-maker     │    │ /cdc-maker      │    │ /skill-maker   │    │ MCPs + Claude    │
└────────────────┘    └─────────────────┘    └────────────────┘    └──────────────────┘
```

| Etape | Outil | Livrable | Quand l'invoquer |
|-------|-------|----------|------------------|
| 1. Enqueter | `/doc-maker` | `docs/[sujet]/` | Avant chaque nouveau projet ou nouvelle techno |
| 2. Cadrer | `/cdc-maker` | `docs/[projet]/CDC-*.md` | Avant chaque projet client |
| 3. Capitaliser | `/skill-maker` | `.claude/skills/[skill]/` | Apres avoir fait 2x la meme chose |
| 4. Executer | MCPs + prompts | Le livrable client | A chaque action sur le projet |

## Etape 1 — `/doc-maker` : enqueter

### A quoi ca sert

Avant de coder une landing pour un client, tu enquetes systematiquement sur :
- **Concurrents** : top 5 sites du secteur, leurs offres, leur structure
- **Design systems** a aspirer : tokens, typos, composants
- **Tech utilisees** : leur stack, leur tracking, leurs A/B tests
- **Best practices specifiques** au vertical (B2B SaaS, e-commerce, local, etc.)

### Pattern type "scout concurrents"

```
/doc-maker analyse concurrentielle B2B SaaS RH France :
recherche les top 10 concurrents de [client],
documente pour chacun : structure landing, hero, social proof,
formulaires, tracking detecte, design system, anti-patterns observes.
Sortie : docs/concurrents-[client]/
```

5 doc-maker en parallele = 5 docs en 10 minutes au lieu de 5 jours.

### ROI mesure

| Sans `/doc-maker` | Avec `/doc-maker` |
|-------------------|-------------------|
| 2-3 jours scout manuel par projet | 10-30 min |
| Recherches non capitalisees | Reutilisables sur le client suivant |
| Risque de "blanc" sur les bonnes pratiques | Convergence multi-sources documentee |

### Skills Nopillo a creer (basees sur `/doc-maker`)

| Skill | Genere |
|-------|--------|
| `/scout-concurrents [client] [vertical]` | docs/concurrents-X/ |
| `/audit-landing [url]` | docs/audit-X/ avec score |
| `/extract-design-system [url]` | docs/ds-X/ + tokens CSS |

## Etape 2 — `/cdc-maker` : cadrer en cahier des charges

### A quoi ca sert

Transformer la commande client floue en **plan d'action structure** :
- Decoupage en taches atomiques
- Estimation effort
- Dependances entre taches
- Assignation executeur (toi, Claude+MCP, agent X)
- Waves d'execution paralleles

### Exemple reel : `cdc-landing-improvement`

Tu as deja fait : 30 taches reparties sur 5 phases, 7 waves d'execution paralleles, chacune avec son executeur (Webflow MCP, manuel, etc.).

### Pattern type pour Nopillo

```
/cdc-maker landing recrutement immobilier We Invest :
brief : recruter 50 mandataires/mois via Google Ads,
cible : agents immo independants experimentes,
budget : 10k€ landing + setup ads,
existant : DS Nopillo + composants Webflow library reutilisable.
Sortie : CDC + decoupage waves + assignation MCP.
```

### ROI mesure

| Sans CDC | Avec CDC |
|----------|----------|
| Surprise sur le perimetre client | Validation explicite avant de coder |
| Retours en boucle sur ce qui manque | Periemetre ferme = facturation propre |
| Pas de paralelisation | Waves -> 30-50% de gain de temps |

## Etape 3 — `/skill-maker` : capitaliser en skill reutilisable

### A quoi ca sert

Transformer un workflow que tu refais souvent en **slash command Claude Code** appelable d'un mot.

Format officiel : un skill = 1 dossier `.claude/skills/[nom]/` avec un `SKILL.md` (frontmatter YAML + instructions markdown). Auto-invoque selon le contexte ou appelable explicitement.

### Skills Nopillo a creer

| Skill | Quand l'invoquer | Beneficiaires |
|-------|------------------|---------------|
| `/connect-hubspot-form` | Ajouter un form HubSpot a une page Webflow | Toute l'equipe |
| `/apply-nopillo-ds` | Appliquer le DS Nopillo a une nouvelle page | Toute l'equipe |
| `/landing-google-ads` | Generer landing optimisee Google Ads (DKI, Quality Score) | Equipe + freelances |
| `/landing-meta-ads` | Generer landing optimisee Meta Ads (vertical, lead form) | Equipe + freelances |
| `/scout-concurrents` | Lancer 5 doc-maker concurrents en parallele | Toi |
| `/setup-tracking` | GA4 + Pixel + CAPI + Consent V2 | Equipe |
| `/extract-design-system` | Aspirer DS d'un site reference | Toi |

Une fois capitalises, ces skills se **commit** dans le repo : toute l'equipe Nopillo herite des memes workflows.

### Pattern de creation

```
/skill-maker je veux un skill /connect-hubspot-form qui :
1. Prend en parametre le portalId HubSpot et l'ID du form
2. Genere le code embed Webflow (script + container)
3. Configure les events de tracking (form_submit dans GA4 + Meta Pixel)
4. Documente le mapping champs HubSpot ↔ Webflow
Sources : docs/hubspot/04-api-crm.md, docs/google-ads/07-conversion-tracking.md
```

### ROI mesure

| Sans skill | Avec skill |
|------------|------------|
| 30 min de prompt detaille a chaque fois | 1 mot : `/connect-hubspot-form` |
| Variabilite selon qui code (qualite incoherente) | Workflow standardise = qualite stable |
| Onboarding nouveaux membres long | Nouveau dev → skills deja la |

## Etape 4 — Executer via MCPs

### MCPs a maitriser pour Nopillo

| MCP | Utilite | Format formation |
|-----|---------|------------------|
| **Webflow** | Manipulation site (CMS, pages, composants, scripts) | 1j, 2j, 3j |
| **HubSpot** | Forms, contacts, lifecycle | 2j, 3j |
| **Google Ads** (officiel ou Composio) | Campagnes, keywords, conversions | 2j, 3j |
| **Meta Ads** (Pipeboard, meta-mcp) | Campagnes Meta, lead forms | 2j, 3j |
| **Context7** | Doc a jour des libs (Astro, Tailwind, etc.) | 3j (option Netlify) |
| **Supabase** | Edge functions, DB | 3j (option) |

### Pattern d'execution type

Chaque tache du CDC = 1 prompt Claude Code qui combine :
1. **Skill** (s'il existe) : `/landing-google-ads`
2. **MCP calls** : Webflow CMS, Webflow Pages, etc.
3. **Validation** : screenshot + verification visuelle, run audit script

## Le manifeste Nopillo (a accrocher au mur)

```
1. ENQUETER avant de coder.
   Si je n'ai pas de doc dans docs/, je lance /doc-maker.

2. CADRER avant de toucher Webflow.
   Si pas de CDC dans docs/[client]/, je lance /cdc-maker.

3. CAPITALISER apres la 2e fois.
   Si je le refais, je lance /skill-maker pour automatiser.

4. EXECUTER via MCP, jamais a la main quand ca peut etre automate.
   Webflow, HubSpot, Ads, tout passe par MCP.

5. VERIFIER chaque output Claude.
   Screenshot + clic sur les CTAs + DevTools.
   Claude se trompe encore, surtout sur le visuel.
```

## Sources

- [Anthropic Skill Creator workflow - MindStudio](https://www.mindstudio.ai/blog/skill-creator-workflow-claude-code-sop-to-skill)
- [Claude Code Skills Complete Guide](https://claude-world.com/articles/skills-guide/)
- [Awesome Claude Code (curated list)](https://github.com/hesreallyhim/awesome-claude-code)
- [docs/cdc-claude-code-audit/03-best-practices.md](../cdc-claude-code-audit/03-best-practices.md) — best practices Claude Code
- [docs/cdc-claude-code-audit/04-architecture.md](../cdc-claude-code-audit/04-architecture.md) — 5 piliers d'extension
- [docs/cdc-landing-improvement/02-taches.md](../cdc-landing-improvement/02-taches.md) — exemple CDC reel decoupe en waves
