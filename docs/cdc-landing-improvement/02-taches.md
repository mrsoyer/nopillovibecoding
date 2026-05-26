# Decoupage Taches — Executeurs MCP

## Legende executeurs

| Code | Outil/Agent | Description |
|---|---|---|
| `MCP:builder` | `mcp__webflow__element_builder` | Creer elements canvas (DOM/section/div/heading/button/image) |
| `MCP:whtml` | `mcp__webflow__whtml_builder` | Inserer markup HTML+CSS bloc complet |
| `MCP:component` | `mcp__webflow__component_builder` / `de_component_tool` | Inserer instances composants existants |
| `MCP:style` | `mcp__webflow__style_tool` | CSS classes (create/update + breakpoints + pseudo) |
| `MCP:variable` | `mcp__webflow__variable_tool` | Tokens (couleurs/sizes/typo) |
| `MCP:asset` | `mcp__webflow__asset_tool` | Upload + alt assets |
| `MCP:page` | `mcp__webflow__de_page_tool` / `data_pages_tool` | CRUD pages, SEO, slug, draft |
| `MCP:scripts` | `mcp__webflow__data_scripts_tool` | Custom code (GA4, Pixel, JSON-LD, head injection) |
| `MCP:cms` | `mcp__webflow__data_cms_tool` | Si CMS testimonials/FAQ |
| `MCP:publish` | `mcp__webflow__data_sites_tool` (publish_site) | Publication staging/prod |
| `sym-test-web` | Agent SYM Playwright | E2E tests + Lighthouse CI |
| `sym-perf` | Agent SYM Performance | Audit LCP/CLS/INP, recommandations |
| `sym-security` | Agent SYM Security | RGPD, headers, CSP |
| `Claude:direct` | Claude Code direct | One-shot (copy, JSON-LD, redactionnel) |
| `Manual:user` | Action humaine | Validation visuelle, decisions creatives |

## Tableau complet (30 taches)

### Phase P0 — Fondations

| ID | Tache | Executeur | Dependances | Livrable | Priorite |
|---|---|---|---|---|---|
| 1.1 | Creer style `Body Landing` (display:block) + appliquer body | MCP:style + MCP:builder | — | Style cree, body visible sans intervention manuelle | P0 |
| 1.2 | Upload asset hero image (AVIF + fallback) | MCP:asset | — | Asset uploade, alt descriptif `equipe We Invest reunie` | P0 |
| 1.3 | Creer composant Hero (h1+sub+meta+2 CTAs+image) | MCP:whtml | 1.1, 1.2 | Component `Hero LP` reutilisable + insere top du body | P0 |
| 1.4 | Creer composant Form Capture (5 champs + RGPD) | MCP:whtml | 1.1 | Component `Form Lead` avec form-name `afterwork-rdv` | P0 |
| 1.5 | Inserer ancre `#rdv` sur Form Capture | MCP:builder | 1.4 | id="rdv" sur section form |
| 1.6 | Update CTAs Avantages/Parcours -> `#rdv` | MCP:builder (set_link) | 1.5 | Tous CTAs internes pointent `#rdv` | P0 |
| 1.7 | Update CTAs Offres -> URLs pages produit | Manual:user + MCP:builder | — | 4 CTAs offres vers URLs reelles fournies | P0 |
| 1.8 | Creer page `/afterwork-test-mcp/remerciement-form` (component existant) | MCP:page + MCP:component | — | Page draft + component `Section Remerciement` insere | P0 |

**Wave 1 (parallele)** : 1.1, 1.2, 1.7, 1.8
**Wave 2 (parallele)** : 1.3, 1.4 (deps Wave 1)
**Wave 3 (sequentiel)** : 1.5 -> 1.6

### Phase P1 — Confiance

| ID | Tache | Executeur | Dependances | Livrable | Priorite |
|---|---|---|---|---|---|
| 2.1 | Creer composant Stats Bar (4 chiffres count-up) | MCP:whtml + MCP:style | 1.1 | Component `Stats Bar` insere sous Hero | P1 |
| 2.2 | Upload assets photos testimonials (3) | MCP:asset | — | 3 assets `avatar-jean`, `avatar-marie`, `avatar-paul` avec alt | P1 |
| 2.3 | Creer composant Testimonials (3 cards + schema) | MCP:whtml + MCP:style | 2.2 | Component avec markup `Review` schema.org | P1 |
| 2.4 | Creer composant FAQ accordion (8 Q/R, details/summary) | MCP:whtml | 1.1 | Component accessible + schema FAQPage embed | P1 |
| 2.5 | Generer JSON-LD (Event + Org + FAQPage + LocalBusiness) | Claude:direct | 2.4 | Bloc JSON-LD pret a injecter dans head | P1 |
| 2.6 | Injecter JSON-LD dans head (custom code page) | MCP:scripts | 2.5 | Custom code applique a la page | P1 |

**Wave 4 (parallele apres Wave 3)** : 2.1, 2.2, 2.4
**Wave 5 (sequentiel)** : 2.3 (dep 2.2) -> 2.5 -> 2.6

### Phase P2 — Performance & Accessibilite

| ID | Tache | Executeur | Dependances | Livrable | Priorite |
|---|---|---|---|---|---|
| 3.1 | Audit performance baseline (Lighthouse + WebPageTest) | sym-perf | post-1.3 | Rapport LCP/CLS/INP avant optim | P1 |
| 3.2 | Optimiser Hero image (preload + fetchpriority + srcset) | MCP:scripts + Claude:direct | 1.3 | LCP < 2.5s mobile | P1 |
| 3.3 | Lazy load images sub-fold | MCP:builder (attributes) | 1.3 | loading="lazy" + decoding="async" applique | P2 |
| 3.4 | Reserver dimensions images (CLS < 0.1) | MCP:builder + MCP:style | 1.3 | width/height explicites toutes images | P1 |
| 3.5 | Audit accessibilite WCAG AA (axe-core via Playwright) | sym-test-web | post-2.6 | Rapport zero erreur critique | P1 |
| 3.6 | Fix accessibilite (alt, aria, contrast, focus-visible) | MCP:builder + MCP:style | 3.5 | Score axe = 0 critical | P1 |
| 3.7 | Audit performance final + valider cibles | sym-perf | 3.2, 3.3, 3.4 | LCP<2.5s, CLS<0.1, INP<200ms confirme | P1 |

**Wave 6 (parallele)** : 3.1, 3.5
**Wave 7 (parallele)** : 3.2, 3.3, 3.4 (deps 3.1)
**Wave 8 (sequentiel)** : 3.6 (dep 3.5) -> 3.7 (dep 3.2/3/4)

### Phase P3 — Mesure & Tracking

| ID | Tache | Executeur | Dependances | Livrable | Priorite |
|---|---|---|---|---|---|
| 4.1 | Setup GA4 + GTM (code injection head) | MCP:scripts | post-1.4 | GTM operationnel + container GA4 | P1 |
| 4.2 | Setup Meta Pixel + LinkedIn Insight | MCP:scripts | 4.1 | Tags actifs verifies via Tag Assistant | P2 |
| 4.3 | Setup Microsoft Clarity (heatmaps gratuit) | MCP:scripts | 4.1 | Project Clarity actif, replays disponibles | P2 |
| 4.4 | Configurer events form_start/form_submit/cta_click | Claude:direct + MCP:scripts | 4.1, 1.4 | Tous events critiques traces dans GA4 | P1 |
| 4.5 | Dashboard Looker Studio + alertes | Manual:user | 4.1 | Dashboard partage + 3 alertes (CR drop, traffic spike, error rate) | P2 |

**Wave 9 (sequentiel)** : 4.1 -> 4.2/4.3/4.4 (parallele) -> 4.5

### Phase P4 — Production

| ID | Tache | Executeur | Dependances | Livrable | Priorite |
|---|---|---|---|---|---|
| 5.1 | QA cross-browser (Chrome, Firefox, Safari) | sym-test-web | toutes precedentes | 0 regression visuelle, 0 erreur console | P0 |
| 5.2 | QA RGPD + headers securite (CSP, HSTS) | sym-security | 4.4 | Cookies bannier + CSP strict + audit OK | P0 |
| 5.3 | Publish staging (validation utilisateur) | MCP:publish | 5.1, 5.2 | URL `webflow.io/afterwork-test-mcp` validee | P0 |
| 5.4 | Publish prod + soumission sitemap GSC | MCP:publish + Manual:user | 5.3 + go user | URL `lp.weinvest.fr/afterwork-test-mcp` live + indexee | P0 |

**Wave 10 (parallele)** : 5.1, 5.2
**Wave 11 (sequentiel)** : 5.3 -> 5.4

## Diagramme dependances (chemin critique)

```
[1.1 Body fix] ──┐
[1.2 Asset hero]─┴──>[1.3 Hero comp]──>[3.2 LCP]──>[3.7 Perf final]──>[5.1 QA]──>[5.3 Stage]──>[5.4 Prod]
                                          ↑
[1.4 Form]──>[1.5 #rdv]──>[1.6 CTAs internes]
                                          
[2.4 FAQ]──>[2.5 JSON-LD]──>[2.6 Inject head]──>[3.5 A11y]──>[3.6 Fix]
                                                                      
[4.1 GA4]──>[4.4 Events]
```

**Chemin critique** : 1.1 -> 1.3 -> 3.2 -> 3.7 -> 5.1 -> 5.3 -> 5.4 (**7 taches sequentielles**)

## Recap waves d'execution

| Wave | Taches | Type | Effort |
|---|---|---|---|
| 1 | 1.1, 1.2, 1.7, 1.8 | parallele | XS |
| 2 | 1.3, 1.4 | parallele | M |
| 3 | 1.5, 1.6 | sequentiel | XS |
| 4 | 2.1, 2.2, 2.4 | parallele | M |
| 5 | 2.3, 2.5, 2.6 | sequentiel | S |
| 6 | 3.1, 3.5 | parallele | S |
| 7 | 3.2, 3.3, 3.4 | parallele | M |
| 8 | 3.6, 3.7 | sequentiel | S |
| 9 | 4.1 -> 4.2/3/4 -> 4.5 | mixte | S |
| 10 | 5.1, 5.2 | parallele | XS |
| 11 | 5.3, 5.4 | sequentiel | XS |

## Repartition executeurs

| Type | Nombre |
|---|---|
| MCP Webflow tools | 22 taches |
| Agents SYM (sym-test-web, sym-perf, sym-security) | 4 taches |
| Claude Code direct (redactionnel/JSON) | 3 taches |
| Manuel utilisateur (decisions creatives, URLs reelles) | 3 taches (avec overlap) |

## Estimation effort total

| Phase | Effort agrege |
|---|---|
| P0 | M (8 taches, 3 waves) |
| P1 | M (6 taches, 2 waves) |
| P2 | S (7 taches, 3 waves) |
| P3 | S (5 taches, 1 wave mixte) |
| P4 | XS (4 taches, 2 waves) |

**Total** : ~30 taches, 11 waves, effort cumul : **L** (sur ~1-2 jours d'execution si parallelisee).

## Prochaine action immediate

Lancer **Wave 1** (4 taches en parallele) :

```
parallel:
  - MCP:style + MCP:builder       : 1.1 Style Body Landing + body
  - MCP:asset                     : 1.2 Upload hero image
  - Manual:user                   : 1.7 Fournir 4 URLs offres
  - MCP:page + MCP:component      : 1.8 Page remerciement-form
```

Apres Wave 1 -> Wave 2 (1.3 + 1.4 en parallele).
