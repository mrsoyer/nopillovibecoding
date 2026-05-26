# 07 — Optimisation conversion + checklist de mise en production

## Sommaire

- [Metriques de reference 2026](#metriques-de-reference-2026)
- [Conversion : ce qui marche vraiment](#conversion--ce-qui-marche-vraiment)
- [Checklist pre-deploy](#checklist-pre-deploy)
- [Checklist deploy](#checklist-deploy)
- [Checklist post-deploy](#checklist-post-deploy)
- [Anti-patterns conversion](#anti-patterns-conversion)

## Metriques de reference 2026

Source : [almcorp.com/blog/landing-page-optimization](https://almcorp.com/blog/landing-page-optimization/).

| Metrique | Median industrie | Top 10 % | Cible Nopillo |
|----------|------------------|----------|---------------|
| Taux de conversion landing | 6.6 % | 11.45 %+ | viser 8 %+ |
| Bounce rate | 60-70 % | 30-40 % | viser < 50 % |
| Time on page | 30-45 s | 60-90 s | viser 60 s+ |
| LCP | 2.5-4 s | < 1.5 s | viser < 1.5 s |
| Mobile traffic share | 60-70 % | 70-80 % | optimiser mobile-first |

## Conversion : ce qui marche vraiment

### Faits etablis avec chiffres

| Levier | Impact mesure | Source |
|--------|---------------|--------|
| Form 4 champs vs 11 champs | **+120 % de conversion** | ALM Corp 2026 |
| CTA personnalises vs generiques | **+202 % de conversion** | ALM Corp 2026 |
| Page mobile-optimisee | **86 % des top performers** | ALM Corp 2026 |
| Video pertinente vs texte seul | **jusqu'a +86 % de conversion** | ALM Corp 2026 |
| Loading > 3s (mobile) | **53 % d'abandon** | ALM Corp 2026 |
| +1s de delai | **-7 % de conversion** | ALM Corp 2026 |
| Email comme canal de trafic | **19.3 % de conversion** (le plus haut) | ALM Corp 2026 |
| Testimonials avec photo + nom + titre | **36 % des top performers** | ALM Corp 2026 |

### Regles pratiques qui decoulent

1. **Form 4 champs max au-dessus de la fold.** Tout le reste va dans un step 2 ou est inutile.
2. **CTA personnalise par contexte** : "Reserver MA demo" > "Reserver une demo". "Voir le tarif pour 50 utilisateurs" > "Voir le tarif".
3. **Mobile-first design**. La maquette desktop ne sert qu'a verifier qu'elle scale, pas l'inverse.
4. **Self-host fonts + images optimisees** (Astro `<Image>` ou Vite + plugin). Cible LCP < 1.5s.
5. **Testimonials anonymes = zero impact**. Si tu n'as pas de nom + photo + titre, retire la section.

## Checklist pre-deploy

### Performance

- [ ] Lighthouse Performance >= 95 (desktop ET mobile)
- [ ] LCP < 1.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Bundle JS client < 50 KB
- [ ] Toutes les images optimisees (WebP/AVIF) avec dimensions explicites
- [ ] Fontes self-hosted, preload de la fonte critique uniquement
- [ ] Critical CSS inline (Astro le fait auto, Vite necessite plugin)

### SEO et meta

- [ ] `<title>` unique par page, 50-60 caracteres
- [ ] `<meta name="description">` 150-160 caracteres
- [ ] Open Graph image (1200x630) + tags `og:title`, `og:description`, `og:image`
- [ ] Twitter Card tags
- [ ] `<html lang="fr">` (ou autre selon cible)
- [ ] Sitemap.xml (Astro : `@astrojs/sitemap`)
- [ ] robots.txt avec sitemap reference
- [ ] Structured data (JSON-LD) si pertinent : Organization, FAQPage, Product

### Accessibilite

- [ ] Tous les `<img>` ont un `alt`
- [ ] Formulaires : labels associes, `aria-describedby` pour les erreurs
- [ ] Contraste WCAG AA minimum (4.5:1 pour le texte normal)
- [ ] Navigation clavier complete (tab order, focus visible)
- [ ] `aria-live="polite"` pour les feedback de soumission

### Tracking

- [ ] GA4 ou alternative (Plausible, Fathom) installe
- [ ] Conversion events configures (form_submit, cta_click)
- [ ] Meta Pixel + CAPI si Meta Ads (cf. skill `landing-meta-ads`)
- [ ] Google Ads conversion tag si Google Ads (cf. skill `landing-google-ads`)
- [ ] Consent management (Axeptio / Cookiebot / custom) si Europe

### Backend / Supabase

- [ ] Table `leads` cree, RLS active
- [ ] Aucune policy public read/write sur la table leads
- [ ] Edge Function `contact-form` deployee
- [ ] CORS de l'Edge Function restreint au domaine de prod
- [ ] Secret `SUPABASE_SERVICE_ROLE_KEY` JAMAIS dans le bundle client
- [ ] Anti-spam : honeypot + Turnstile/reCAPTCHA si volume > 100/jour
- [ ] Rate limiting au niveau de l'Edge Function ou Netlify

### Legal (FR/EU)

- [ ] Mentions legales accessibles (footer)
- [ ] Politique de confidentialite RGPD
- [ ] Cookies / consentement si tracking non essentiel
- [ ] Opt-in explicite pour la newsletter (case decochee par defaut)

## Checklist deploy

### Configuration Netlify

- [ ] Domaine personnalise configure + HTTPS auto (Let's Encrypt)
- [ ] Redirect `www → apex` ou inverse choisi explicitement
- [ ] Headers de securite dans `netlify.toml` (X-Frame-Options, CSP basique, Referrer-Policy)
- [ ] Build hooks configures si CMS externe (a brancher si besoin)
- [ ] Deploy notifications (Slack / email)
- [ ] Branch deploys actives pour les previews

### Configuration Supabase

- [ ] Projet en region EU si trafic Europe (cf. RGPD)
- [ ] Backups DB configures (gere par Supabase Pro+)
- [ ] Logs Edge Functions actifs et monitores

### Premier deploy

```bash
# Build local pour verifier
npm run build
npm run preview  # tester sur localhost:4321

# Deploy
netlify deploy --prod

# Verifier le site live
npx lighthouse https://ma-landing.com --view
```

## Checklist post-deploy

### J+0 : verification immediate

- [ ] Site accessible sur le domaine final
- [ ] HTTPS fonctionne (pas de warning navigateur)
- [ ] Lighthouse en prod : Performance >= 95
- [ ] Soumettre un test de form, verifier l'insert dans Supabase (table leads)
- [ ] Verifier que le tracking remonte dans GA4 (event de test)
- [ ] Verifier que le form ne plante pas avec un email invalide
- [ ] Verifier sur mobile (vrai mobile, pas DevTools)

### J+1 : monitoring

- [ ] Activer les uptime checks (UptimeRobot, Better Uptime, ou Netlify Analytics)
- [ ] Alerte si LCP degrade en prod (Netlify Analytics ou Vercel Speed Insights alternative)
- [ ] Verifier les logs Edge Functions (erreurs ?)
- [ ] Verifier les bounce rate / time on page premieres heures dans GA4

### J+7 : iteration

- [ ] Heatmap installee (Hotjar, Microsoft Clarity gratuit)
- [ ] Identifier le drop-off principal (scroll depth, abandon de form)
- [ ] A/B test du hero ou du CTA principal (Google Optimize alternatives : Vercel A/B, Statsig)
- [ ] Auditer les requetes Supabase (Slow queries dans le dashboard)

## Anti-patterns conversion

| Anti-pattern | Pourquoi c'est mauvais | Fix |
|--------------|------------------------|-----|
| Form 8+ champs au-dessus de la fold | -50 a -120 % conversion | 4 champs max, le reste en step 2 |
| CTA "Submit", "Send", "Envoyer" | Generique, pas oriente benefice | "Reserver ma demo gratuite", "Recevoir le PDF" |
| Testimonials sans nom/photo | Aucun impact mesure | Retirer ou completer (vraies personnes) |
| Hero qui charge en > 1s | -53 % de visiteurs (mobile) | Optimiser image hero + self-host fonts |
| Pas de section pricing claire | Friction sur la decision | Pricing visible meme en B2B (au moins "a partir de") |
| Pop-up immediate | -30 a -40 % time on page | Trigger sur exit-intent ou scroll 50 % |
| Animations heavy au scroll | Tue les Core Web Vitals | Animations CSS uniquement, pas de framer-motion partout |
| Chat widget en pop-out auto | Tue LCP + perception spam | Bouton discret, ouverture sur click uniquement |
| Cookie banner qui couvre la fold | Bounce instant | Bandeau bas de page, non bloquant |
| Lazy loading sur l'image hero | LCP catastrophique | `loading="eager"` + `fetchpriority="high"` sur le hero |

## Outils complementaires recommandes

| Categorie | Outil | Pourquoi |
|-----------|-------|----------|
| Heatmap | Microsoft Clarity | Gratuit, illimite, RGPD-friendly |
| A/B test | Vercel A/B Testing ou GrowthBook | Edge-based, pas de flash de contenu |
| Form anti-spam | Cloudflare Turnstile | Gratuit, alternative reCAPTCHA |
| Monitoring perf | Netlify Analytics | Inclus, server-side (pas de JS injecte) |
| Analytics | Plausible / Fathom | RGPD-friendly, plus rapide que GA4 |
| Uptime | UptimeRobot (free) | 5 monitors gratuits, alertes |

## Lien avec les autres docs du projet

- [Landing page best practices](../landing-page-best-practices/_index.md) — patterns de copywriting, hero, structure
- [Supabase Edge Landing](../supabase-edge-landing/_index.md) — patterns Edge Functions specifiques landings
- [Netlify Landing](../netlify-landing/_index.md) — focus Netlify (forms, edge, deploy workflow)
- [Landing Page Best Practices](../landing-page-best-practices/06-anti-patterns.md) — anti-patterns complementaires
- [HubSpot integration](../hubspot/_index.md) — si lead va dans HubSpot

## Sources

- [ALM Corp — Landing Page Optimization 2026](https://almcorp.com/blog/landing-page-optimization/)
- [Unicorn Platform — Landing Page Conversion 2026](https://unicornplatform.com/blog/landing-page-conversion-optimization-in-2026/)
