# 01b — Tracking, Performance et Décisions techniques

## Tracking

### Stack

1. **Google Tag Manager** (container unique) — tag manager
2. **GA4** via GTM — analytics
3. **Google Ads Conversion** via GTM — conversion `lp_form_submit`
4. **Google Consent Mode v2** — RGPD

### Implémentation Astro

```astro
<!-- front/src/layouts/Base.astro : dans <head> -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });
</script>
<!-- GTM -->
<script>
  (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXX');
</script>
```

### Événements GA4

| Événement | Déclencheur | Paramètres |
|-----------|-------------|------------|
| `page_view` | Auto GTM | `keyword`, `match_type` |
| `cta_click` | Click CTA | `cta_id`, `cta_position` |
| `simulator_start` | Focus simulateur | — |
| `simulator_complete` | Résultat affiché | `result_value` |
| `form_start` | Focus champ form | `form_id` |
| `form_submit` | Submit réussi | `keyword`, `match_type` |

Détail complet : [docs/besoins-lp-paid-ia-nopillo/07-tracking-analytics.md](../besoins-lp-paid-ia-nopillo/07-tracking-analytics.md)

### Conversion Google Ads

```js
// Après form_submit réussi (callback Edge Function success)
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXX/abcdef',
  'value': 50.0,
  'currency': 'EUR',
  'transaction_id': leadId
});
```

---

## Performance et SEO

### Cibles Core Web Vitals

| Métrique | Cible | Méthode |
|----------|-------|---------|
| LCP | < 2s mobile | Image hero WebP < 200KB, `fetchpriority="high"` |
| CLS | < 0.1 | Dimensions img explicites, pas de late-inject |
| INP | < 200ms | Pas de carrousel, JS minimal (Astro SSG) |
| Lighthouse Perf | ≥ 95 | 0KB JS par défaut Astro |
| Tailwind bundle | purge prod | Vite tree-shaking automatique |

### SEO / Paid

```html
<meta name="robots" content="noindex, nofollow" />
<link rel="canonical" href="https://[domain]/lp/lmnp-exact/expert-comptable-lmnp" />
```

Schema.org : `FAQPage` (section S9) + `LocalBusiness` (footer)

---

## Décisions techniques

| # | Décision | Justification |
|---|----------|---------------|
| D1 | Inter vs Futura PT | Futura PT = licence Adobe payante. Inter = libre, géométrique similaire |
| D2 | DKI client-side vs SSR | Astro SSG = pas de runtime serveur. DKI via JS léger = LCP non impacté |
| D3 | HubSpot via Edge Function vs embed | Embed = CSS non maîtrisé. Edge Function = contrôle + données Supabase aussi |
| D4 | TrustBox widget vs API | API Trustpilot = plan B2B payant. Widget suffisant pour démo |
| D5 | GTM vs gtag direct | GTM = tags ajoutables sans redeploy Netlify |
| D6 | Simulateur mocké | Moteur fiscal Nopillo hors périmètre démo |
| D7 | noindex | Paid only — pas de risque référencement organique |
| D8 | 4 champs formulaire max | Au-delà = taux complétion chute (source : LP best practices) |
