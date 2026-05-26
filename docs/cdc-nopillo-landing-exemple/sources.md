# Sources référencées

## Documentation interne utilisée

| Source | Sections utilisées |
|--------|-------------------|
| [docs/design-system-extraction/nopillo-extracted/_index.md](../design-system-extraction/nopillo-extracted/_index.md) | Tokens couleurs, typo, radius, shadows, composants |
| [docs/design-system-extraction/nopillo-extracted/02-tokens-couleurs.md](../design-system-extraction/nopillo-extracted/02-tokens-couleurs.md) | Palette complète (88 variables CSS) |
| [docs/design-system-extraction/nopillo-extracted/03-tokens-typographie.md](../design-system-extraction/nopillo-extracted/03-tokens-typographie.md) | Futura PT + Splinesans |
| [docs/design-system-extraction/nopillo-extracted/04-tokens-spacing-radius.md](../design-system-extraction/nopillo-extracted/04-tokens-spacing-radius.md) | Container 1120px, shadow, radius |
| [docs/design-system-extraction/nopillo-extracted/05-composants-buttons.md](../design-system-extraction/nopillo-extracted/05-composants-buttons.md) | Pills, ghost, specs exactes |
| [docs/design-system-extraction/nopillo-extracted/07-composants-cards-sections.md](../design-system-extraction/nopillo-extracted/07-composants-cards-sections.md) | Cards translucides, sections |
| [docs/besoins-lp-paid-ia-nopillo/01-vision-objectifs.md](../besoins-lp-paid-ia-nopillo/01-vision-objectifs.md) | Vision Quality Score, objectifs business |
| [docs/besoins-lp-paid-ia-nopillo/03-structure-lp-sections.md](../besoins-lp-paid-ia-nopillo/03-structure-lp-sections.md) | Matrice sections obligatoires, hiérarchie fold |
| [docs/besoins-lp-paid-ia-nopillo/06-integrations.md](../besoins-lp-paid-ia-nopillo/06-integrations.md) | Google Ads ValueTrack, HubSpot, Trustpilot |
| [docs/besoins-lp-paid-ia-nopillo/07-tracking-analytics.md](../besoins-lp-paid-ia-nopillo/07-tracking-analytics.md) | GTM, GA4 events, Google Ads conversion, RGPD |
| [docs/landing-page-best-practices/02-structure-sections.md](../landing-page-best-practices/02-structure-sections.md) | Ordre sections, F/Z pattern |
| [docs/landing-page-best-practices/03-hero-above-the-fold.md](../landing-page-best-practices/03-hero-above-the-fold.md) | Hero : LCP, hiérarchie visuelle |
| [docs/landing-page-best-practices/04-cta-optimization.md](../landing-page-best-practices/04-cta-optimization.md) | Copy CTA, placement, pill buttons |
| [docs/landing-page-best-practices/05-social-proof-trust.md](../landing-page-best-practices/05-social-proof-trust.md) | 11 types social proof, placement |
| [docs/stack-landing-claude-code/04-setup-astro-netlify.md](../stack-landing-claude-code/04-setup-astro-netlify.md) | Setup Astro 6 recommandé |
| [docs/stack-landing-claude-code/05-supabase-integration.md](../stack-landing-claude-code/05-supabase-integration.md) | Schema leads, Edge Function contact-form |
| [docs/stack-landing-claude-code/07-conversion-checklist.md](../stack-landing-claude-code/07-conversion-checklist.md) | Checklist validation post-deploy |

## Skills référencés

| Skill | Usage |
|-------|-------|
| `.claude/skills/init-landing-stack/` | Phase 0 : bootstrap complet |
| `.claude/skills/connect-hubspot-form/` | Phase 4 : connexion HubSpot (optionnel) |
| `.claude/skills/apply-nopillo-ds/` | Phase 1 alternative : si skill disponible |
| `.claude/skills/context-guardian/` | Validation finale contexte |

## Décisions clés documentées

| # | Décision | Justification |
|---|----------|---------------|
| D1 | Inter vs Futura PT | Futura PT = licence Adobe payante. Inter géométrique libre |
| D2 | DKI client-side (JS) | Astro SSG statique — pas de runtime serveur. LCP non impacté |
| D3 | HubSpot via Edge Function | Contrôle CSS + données dans Supabase aussi + token secret côté serveur |
| D4 | TrustBox widget | API Trustpilot = plan B2B payant. Widget suffisant pour démo |
| D5 | GTM vs gtag direct | Tags ajoutables sans redeploy Netlify |
| D6 | Simulateur mocké | Moteur fiscal Nopillo hors périmètre démo |
| D7 | noindex | Paid only — pas de risque de référencement organique |
| D8 | 4 champs formulaire max | Au-delà = taux de complétion chute. Source : LP best practices |
