# CDC — Landing Page Exemple Nopillo (Paid IA)

> Landing page de démonstration pour la stack "LP auto par KW via IA". Astro 6 + Tailwind 4 + Supabase + Netlify, charte graphique Nopillo, optimisée Google Ads (Quality Score 9-10/10), connectée HubSpot. Keyword pilote : `expert comptable LMNP`.

## Stack détecté

**Frontend** : Astro 6 + Tailwind 4 (SSG, 0KB JS par défaut)
**Backend** : Supabase (Postgres leads + Edge Functions Deno)
**Infra** : Netlify (hébergement + CI/CD)
**DS** : Nopillo Design System (tokens CSS custom)
**Intégrations** : HubSpot (leads), GA4 + Google Ads (tracking), GTM (tag management)

## Phases

| Phase | Description | Tâches | Effort |
|-------|-------------|--------|--------|
| P0 | Bootstrap projet (init-landing-stack) | 6 | 10-12 min (automatisé) |
| P1 | Design System Nopillo → Tailwind | 4 | 30 min |
| P2 | Sections landing (9 blocs) | 9 | 2h |
| P3 | DKI — contenu dynamique par KW | 3 | 45 min |
| P4 | HubSpot + Supabase Edge Function | 3 | 30 min |
| P5 | Tracking GA4 + Google Ads + GTM | 4 | 45 min |
| P6 | Performance & validation finale | 3 | 30 min |

**Total estimé** : 4h30 dont 10 min bootstrap automatisé

## Index des fichiers

| Fichier | Contenu |
|---------|---------|
| [_index.md](_index.md) | Ce fichier — résumé exécutif |
| [01-specs.md](01-specs.md) | Specs fonctionnelles : périmètre, sections, DKI, DS, formulaire HubSpot |
| [01b-tracking-perf.md](01b-tracking-perf.md) | Tracking GTM/GA4/Google Ads, performance CWV, décisions techniques |
| [02-taches.md](02-taches.md) | Découpage tâches, dépendances, executeurs, waves |
| [sources.md](sources.md) | Docs référencées |

## Documentation référencée

| Doc | Usage |
|-----|-------|
| [docs/design-system-extraction/nopillo-extracted/_index.md](../design-system-extraction/nopillo-extracted/_index.md) | Tokens DS : couleurs, typo, spacing, composants |
| [docs/besoins-lp-paid-ia-nopillo/_index.md](../besoins-lp-paid-ia-nopillo/_index.md) | Besoins fonctionnels, métriques cibles, intégrations |
| [docs/besoins-lp-paid-ia-nopillo/03-structure-lp-sections.md](../besoins-lp-paid-ia-nopillo/03-structure-lp-sections.md) | 11 sections obligatoires |
| [docs/besoins-lp-paid-ia-nopillo/06-integrations.md](../besoins-lp-paid-ia-nopillo/06-integrations.md) | HubSpot + Google Ads + Trustpilot |
| [docs/besoins-lp-paid-ia-nopillo/07-tracking-analytics.md](../besoins-lp-paid-ia-nopillo/07-tracking-analytics.md) | GTM + GA4 + conversions |
| [docs/landing-page-best-practices/_index.md](../landing-page-best-practices/_index.md) | Best practices LP (structure, copy, CTA, social proof) |
| [docs/stack-landing-claude-code/04-setup-astro-netlify.md](../stack-landing-claude-code/04-setup-astro-netlify.md) | Référence setup Astro 6 |
| [docs/stack-landing-claude-code/07-conversion-checklist.md](../stack-landing-claude-code/07-conversion-checklist.md) | Checklist validation pre/post deploy |

## Métriques cibles

| Métrique | Cible |
|----------|-------|
| Quality Score Google Ads | 9-10/10 |
| Taux de conversion LP | > 8% |
| LCP mobile | < 2s |
| Lighthouse Performance | ≥ 95 |
| Lead → HubSpot | 100% automatique |
| CPC vs baseline | -20% à -30% |
