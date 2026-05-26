# Analyse des Documentations Existantes

## Vue d'Ensemble

Tu as deja produit 6 docs structurees dans `docs/` plus le memo `WEBFLOW-MCP.md`. Cette analyse mappe **ce qui est deja couvert** vs **ce qui manque** pour la formation Nopillo.

Total brut : **6 docs / ~70 fichiers / ~2200 lignes** de contenu reutilisable directement.

## Inventaire detaille

### 1. [google-ads/](../google-ads/) — 10 fichiers (~1700 lignes)

| Fichier | Reutilisable formation |
|---------|----------------------|
| `01-overview.md` | Module 2j/3j (intro Google Ads) |
| `02-campaign-best-practices.md` | Module 2j/3j |
| `03-landing-page-quality-score.md` | **Pivot Module 1j** : "comment Google note ta landing" |
| `04-mcp-google-ads.md` | Module MCP avances (2j+) |
| `05-personalization-dynamic-content.md` | **Pivot Module 1j** : DKI + URL params |
| `06-automation-scripts.md` | Module avance (3j) |
| `07-conversion-tracking.md` | Module 2j/3j (CAPI, GA4, Consent V2) |
| `08-webflow-integration.md` | **Pivot tous formats** : Webflow + Google Ads natif |
| `09-anti-patterns.md` | Anti-patterns transverses |

**Couverture** : excellente sur Google Ads + landing optimization. **Gap** : pas de Meta Ads.

### 2. [hubspot/](../hubspot/) — 13 fichiers (~2256 lignes)

| Fichier | Reutilisable formation |
|---------|----------------------|
| `02-api-architecture.md` | Module 2j/3j (HubSpot integration) |
| `03-api-authentication.md` | Module 2j/3j (Private App tokens) |
| `04-api-crm.md` | **Pivot** : reutiliser pour le skill "form HubSpot Nopillo" |
| `06-api-webhooks.md` | Module 3j (events temps reel) |
| `08-mcp-overview.md` | Module MCPs avances |
| `09-mcp-remote-server.md` | Module MCPs avances (les 13 tools) |
| `11-mcp-clients.md` | Setup HubSpot dans Claude Code |

**Couverture** : exhaustive. Permet de faire un **skill `/connect-hubspot-form`** complet sans recherche additionnelle.

### 3. [meilleures-formations-webflow/](../meilleures-formations-webflow/) — 8 fichiers (~110 lignes index)

| Fichier | Reutilisable formation |
|---------|----------------------|
| `04-webflow-university-officielle.md` | Reference autoformation post-formation |
| `05-landing-pages-best-practices.md` | Module 1j/2j/3j (10 best practices) |
| `06-webflow-mcp-claude.md` | **Critique** : setup Claude + Webflow MCP (Module 1j) |
| `07-comparatif-recommandations.md` | Inspiration pour notre comparatif 1j/2j/3j |

**Couverture** : excellente sur le setup Webflow + Claude. Doc benchmark formations utilisable comme reference.

### 4. [formations-vibecoding-landing/](../formations-vibecoding-landing/) — 9 fichiers

| Fichier | Reutilisable formation |
|---------|----------------------|
| `04-outils-vibecoding.md` | Module 3j (panorama outils alternatifs) |
| `05-claude-code-landing-page.md` | Module 1j/2j (workflow landing en 2h) |
| `06-claude-code-supabase-saas.md` | **Pivot Module 3j** : alternative Webflow |
| `07-conversion-best-practices.md` | Module 1j/2j/3j (14 elements + 40 stats) |

**Couverture** : tres pertinente pour le **module "options sortir de Webflow"** demande par Nopillo.

### 5. [cdc-claude-code-audit/](../cdc-claude-code-audit/) — 7 fichiers

| Fichier | Reutilisable formation |
|---------|----------------------|
| `02-formations-audit.md` | Benchmark concurrents formation Claude Code |
| `03-best-practices.md` | **Critique tous formats** : 20+ best practices Claude Code |
| `04-architecture.md` | **Critique 2j/3j** : 5 piliers d'extension (CLAUDE.md, Skills, Subagents, Hooks, MCP) |
| `05-recommandations.md` | Inspiration pour parcours par profil |
| `06-taches.md` | Modele tache pour atelier pratique |

**Couverture** : excellente pour structurer la pedagogie Claude Code.

### 6. [cdc-landing-improvement/](../cdc-landing-improvement/) — 4 fichiers

| Fichier | Reutilisable formation |
|---------|----------------------|
| `01-specs.md` | **Critique** : etude de cas reelle (5 defauts critiques d'une landing produite par MCP) |
| `02-taches.md` | **Critique** : decoupage 30 taches en 7 waves (modele de cdc) |
| Tout | **Etude de cas formation** : "voici ce qui se passe quand on lance le MCP sans methode" |

**Couverture** : etude de cas en or pour montrer **pourquoi** la methodo est necessaire.

### 7. [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) — 1 fichier (~340 lignes)

Reference complete du MCP Webflow : 18 categories d'outils, exemples prompts, OAuth, Bridge App, commandes de gestion. **Document central** de tous les formats — chaque participant doit l'avoir.

## Cartographie par module de formation

### Modules deja "documentation-ready" (peu/pas d'enquete)

| Module | Sources |
|--------|---------|
| Setup Webflow MCP + Claude Code | `WEBFLOW-MCP.md`, `meilleures-formations-webflow/06` |
| Best practices Claude Code | `cdc-claude-code-audit/03`, `04` |
| Landing page conversion | `formations-vibecoding-landing/07`, `meilleures-formations-webflow/05`, `google-ads/03` |
| Google Ads + Webflow integration | `google-ads/08`, `google-ads/05`, `google-ads/03` |
| HubSpot API + form integration | `hubspot/03`, `hubspot/04`, `hubspot/06` |
| HubSpot MCP setup | `hubspot/08`, `hubspot/09`, `hubspot/11` |
| Etude de cas "ce qu'il ne faut pas faire" | `cdc-landing-improvement/01`, `02` |
| Methodologie cdc-maker | `cdc-landing-improvement/02`, `cdc-claude-code-audit/_index` |

### Modules "partiellement documentes" (gap a combler)

| Module | Source partielle | Gap |
|--------|------------------|-----|
| Methodologie doc-maker | Aucune doc dediee | Workflow + exemples concrets |
| Methodologie skill-maker | `cdc-claude-code-audit/04` (architecture) | Workflow concret de creation skill |
| Aspirer un design system | Aucune | Technique extraction CSS/HTML/tokens |
| Methodologie pedagogique | Aucune | Format workshop adulte tech |

### Modules "non documentes" (enquete totale necessaire)

| Module | Demande | Pourquoi |
|--------|---------|----------|
| Meta Ads + landings | Explicite Nopillo | Aucune doc Meta Ads existante |
| Meta Ads MCP | Explicite Nopillo | Aucune doc MCP Meta Ads |
| Supabase Edge Functions pour landing | Explicite "alternative Webflow" | Doc Supabase generale absente du repo |
| Netlify deploy landing | Explicite "alternative Webflow" | Doc Netlify absente du repo |
| Profil Nopillo precis | Pour personnaliser | Pas trouvable sur le web public |

## Estimation reutilisation

```
Contenu reutilisable directement       : 65%
Contenu adaptable avec edition mineure : 20%
Enquetes a creer avant formation       : 15%
```

Le terrain est **largement deblaye** — 65% du contenu pedagogique existe deja. Les 35% restants sont concentres sur **Meta Ads** + **alternatives Webflow** + **profil Nopillo**.

## Sources

- [docs/google-ads/](../google-ads/) — couvre fond Google Ads + MCP
- [docs/hubspot/](../hubspot/) — couvre API + MCP HubSpot exhaustivement
- [docs/meilleures-formations-webflow/](../meilleures-formations-webflow/) — couvre formations Webflow + setup MCP Claude
- [docs/formations-vibecoding-landing/](../formations-vibecoding-landing/) — couvre stack alternative Claude Code + Supabase
- [docs/cdc-claude-code-audit/](../cdc-claude-code-audit/) — couvre best practices Claude Code + architecture extensions
- [docs/cdc-landing-improvement/](../cdc-landing-improvement/) — etude de cas reelle MCP Webflow
- [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) — reference MCP Webflow complete
