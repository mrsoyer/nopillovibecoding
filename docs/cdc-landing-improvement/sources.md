# Sources & References

## Audit terrain (executes pendant la generation du CDC)

| Source | URL | Usage |
|---|---|---|
| Landing actuelle (cible) | https://we-invest-france-version-test.webflow.io/afterwork-test-mcp | Audit defauts, score 4.1/10 |
| Landing reference (prod) | https://lp.weinvest.fr/afterwork-cannes | Pattern gagnant, structure Hero + form |

## Best practices 2026 — B2B Conversion

| Source | URL | Apport au CDC |
|---|---|---|
| GenesysGrowth — B2B SaaS Landing 2026 | https://genesysgrowth.com/blog/designing-b2b-saas-landing-pages | Story-driven hero (3-5s), micro-animations |
| Leadfeeder — 12 LP Best Practices | https://www.leadfeeder.com/blog/conversion-optimization/landing-pages-convert/ | Single CTA = 13.5% vs multi 10.5% |
| GenesysGrowth — Conversion Rate Stats 2026 | https://genesysgrowth.com/blog/landing-page-conversion-stats-for-marketing-leaders | B2B avg 2-5%, top 8-15%, custom 11.6% vs template 3.8% |
| Salespanel — Top 7 B2B LP Practices | https://salespanel.io/blog/marketing/best-practices-for-landing-pages/ | Form < 5 fields = +120% conversion |
| GrowthSpree — Conversion Benchmarks 2026 | https://www.growthspreeofficial.com/blogs/b2b-saas-conversion-rate-benchmarks-2026-funnel-stage-vertical | Cibles MQL/SQL par vertical |
| Lovable — LP Best Practices 2026 | https://lovable.dev/guides/landing-page-best-practices-convert | H1 < 8 mots / 44 chars, chiffres dans headlines |

## Best practices 2026 — Performance & Core Web Vitals

| Source | URL | Apport au CDC |
|---|---|---|
| corewebvitals.io — Officiel | https://www.corewebvitals.io/core-web-vitals | Cibles : LCP < 2.5s / INP < 200ms / CLS < 0.1 |
| Broworks — Webflow CWV 2026 | https://www.broworks.net/blog/webflow-technical-seo-guide-for-fixing-core-web-vitals-in-2026 | Specifique Webflow : preload + AVIF + scripts defer |
| W3era — CWV Guide 2026 | https://www.w3era.com/blog/seo/core-web-vitals-guide/ | Mobile-first prio, INP = focus 2026 |
| Senorit — CWV 2026 | https://senorit.de/en/blog/core-web-vitals-2026 | Long tasks JS, optimisation INP |
| Juillet Marketing — Webflow CWV | https://www.juilletmarketing.com/en/blogue/core-web-vitals-webflow-lcp-cls-inp-2026 | Tutoriels editor Webflow |
| Web Almanac 2025 | (cite via search) | 48% mobile pages pass all CWV |

## Documentation framework

| Source | Chemin | Usage |
|---|---|---|
| Webflow MCP reference complete | [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) | Catalog des 18 categories outils MCP utilisables |
| Webflow Developer Docs | https://developers.webflow.com/mcp/reference/overview | Documentation officielle MCP |

## Decisions structurantes prises pendant la generation

| Decision | Justification |
|---|---|
| Scope = CDC Feature (5 sections) | 1 landing isolee, pas un projet complet |
| Pas de creation de skill Cowork | Toutes les taches s'executent via MCP existant ou agents SYM |
| Stats Bar avant Avantages | Pattern reference cannes : social proof tot dans le funnel |
| 5 champs form (vs 6 sur cannes) | Benchmark 2026 : sweet spot CR (-1 champ vs reference) |
| FAQ schema.org JSON-LD | Rich results Google = +30% CTR moyen serp |
| Microsoft Clarity inclus | Gratuit illimite, complementaire GA4 (heatmaps + replays) |
| Pas de A/B test en P0 | Valider d'abord baseline puis iterer (P3) |
| Body Landing display:block | Bug detecte sur la page MCP - solution durable |

## Limitations identifiees (a documenter pour futures landings MCP)

1. **Snapshot tool MCP buggy** : le `element_snapshot_tool` retourne un schema invalide. Verifier visuellement via Designer ou staging URL.
2. **Display:none sur body par defaut** : les pages creees via API ont `display:none` herite. Toujours appliquer style `Body Landing` ou equivalent.
3. **Bridge App veille** : se deconnecte si onglet en arriere-plan. Garder l'onglet Designer focus pendant les operations canvas.
4. **Pas de section Hero dans le DS** : a creer comme composant reutilisable pour les futures landings (reduira l'effort sur P0 a 1 wave).
