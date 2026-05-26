# Sources — CDC Landing Formation Nopillo

> Sources internes (documentation deja produite dans `docs/`) et outils utilises.
> Date : 2026-05-05

## Documentation interne referencee

### Contenu (quoi mettre dans la landing)

- [docs/formation-nopillo/_index.md](../formation-nopillo/_index.md) — vue d'ensemble formation
- [docs/formation-nopillo/04-format-1-jour.md](../formation-nopillo/04-format-1-jour.md) — format 1j (950 €)
- [docs/formation-nopillo/05-format-2-jours.md](../formation-nopillo/05-format-2-jours.md) — format 2j (1 900 €)
- [docs/formation-nopillo/06-format-3-jours.md](../formation-nopillo/06-format-3-jours.md) — format 3j (2 850 €)
- [docs/formation-nopillo/07-comparatif-recommandations.md](../formation-nopillo/07-comparatif-recommandations.md) — tableau comparatif + ROI
- [docs/methodologie-documentation-first/](../methodologie-documentation-first/) — pipeline 4 etapes
- [docs/cdc-landing-improvement/](../cdc-landing-improvement/) — etude de cas We Invest

### Best practices (comment structurer)

- [docs/landing-page-best-practices/01-overview.md](../landing-page-best-practices/01-overview.md) — principes & metrics
- [docs/landing-page-best-practices/02-structure-sections.md](../landing-page-best-practices/02-structure-sections.md) — structure type
- [docs/landing-page-best-practices/03-hero-above-the-fold.md](../landing-page-best-practices/03-hero-above-the-fold.md) — Hero
- [docs/landing-page-best-practices/04-cta-optimization.md](../landing-page-best-practices/04-cta-optimization.md) — CTA
- [docs/landing-page-best-practices/05-social-proof-trust.md](../landing-page-best-practices/05-social-proof-trust.md) — social proof
- [docs/landing-page-best-practices/06-anti-patterns.md](../landing-page-best-practices/06-anti-patterns.md) — anti-patterns
- [docs/landing-page-best-practices/07-formation-specifics.md](../landing-page-best-practices/07-formation-specifics.md) — specificites formation (CR moyen 13%)
- [docs/landing-page-best-practices/08-copywriting-framework.md](../landing-page-best-practices/08-copywriting-framework.md) — copywriting

### Design System (a quoi ca doit ressembler)

- [docs/design-system-extraction/nopillo-extracted/_index.md](../design-system-extraction/nopillo-extracted/_index.md) — vue d'ensemble DS
- [docs/design-system-extraction/nopillo-extracted/02-tokens-couleurs.md](../design-system-extraction/nopillo-extracted/02-tokens-couleurs.md) — 88 variables couleurs
- [docs/design-system-extraction/nopillo-extracted/03-tokens-typographie.md](../design-system-extraction/nopillo-extracted/03-tokens-typographie.md) — Futura PT + Splinesans
- [docs/design-system-extraction/nopillo-extracted/04-tokens-spacing-radius.md](../design-system-extraction/nopillo-extracted/04-tokens-spacing-radius.md) — spacing/radius
- [docs/design-system-extraction/nopillo-extracted/05-composants-buttons.md](../design-system-extraction/nopillo-extracted/05-composants-buttons.md) — boutons pill
- [docs/design-system-extraction/nopillo-extracted/06-composants-navbar-footer.md](../design-system-extraction/nopillo-extracted/06-composants-navbar-footer.md) — header/footer
- [docs/design-system-extraction/nopillo-extracted/07-composants-cards-sections.md](../design-system-extraction/nopillo-extracted/07-composants-cards-sections.md) — cards
- `docs/design-system-extraction/nopillo-extracted/tokens.css` — variables CSS pretes-a-coller
- `docs/design-system-extraction/nopillo-extracted/09-tokens-dtcg.json` — format DTCG pour import

### Tracking & conversion

- [docs/google-ads/03-landing-page-quality-score.md](../google-ads/03-landing-page-quality-score.md) — Quality Score
- [docs/google-ads/07-conversion-tracking.md](../google-ads/07-conversion-tracking.md) — GA4, CAPI, Consent V2
- [docs/meta-ads/06-pixel-capi-tracking.md](../meta-ads/06-pixel-capi-tracking.md) — Pixel + CAPI
- [docs/hubspot/04-api-crm.md](../hubspot/04-api-crm.md) — form HubSpot

### Outillage

- [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) — reference complete des 18 categories d'outils Webflow MCP
- [.claude/skills/apply-nopillo-ds/](../../.claude/skills/apply-nopillo-ds/) — skill application DS
- [.claude/skills/connect-hubspot-form/](../../.claude/skills/connect-hubspot-form/) — skill form HubSpot
- [.claude/skills/landing-google-ads/](../../.claude/skills/landing-google-ads/) — skill landing Google Ads (DKI, tracking)

## Methodologie de production

Ce CDC suit la methode Documentation-First :

1. **Enquete** (DEJA FAIT) : 16 docs produites dans `docs/`
2. **Cadrage** (CE FICHIER) : CDC structure avec waves et executeurs
3. **Capitalisation** (DEJA FAIT) : 6 skills custom dans `.claude/skills/`
4. **Execution** (PROCHAINE ETAPE) : Wave 1 → Wave 5 via Webflow MCP

Reference : [docs/methodologie-documentation-first/01-manifeste.md](../methodologie-documentation-first/01-manifeste.md)
