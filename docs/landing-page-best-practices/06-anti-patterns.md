# Anti-Patterns — Erreurs Courantes & Corrections

## Vue d'Ensemble

Les anti-patterns sont des erreurs **frequentes et prouvees nuisibles**. Cette liste consolidee provient de Zoho, KlientBoost, Apexure et l'analyse des LP echouees. Chaque anti-pattern est associe a sa correction et au mecanisme de prevention. Eviter ces 13 erreurs garantit une LP au-dessus de la moyenne.

## Top 13 Anti-Patterns

### 1. Multiple Conversion Goals (le pire)

**Probleme** : 2 ou 3 objectifs sur la meme LP. "Telecharge la brochure OU fais une demo OU achete maintenant".

**Impact** : -266% de conversions documente (Zoho/Unbounce).

**Correction** : 1 LP = 1 objectif. Si 2 objectifs differents, 2 LPs differentes.

**Prevention** : Avant le design, definir LE seul KPI de la page.

```
MAUVAIS : [Buy now] [Try free] [See pricing] [Talk to sales]
BON     : [Start my free trial]  (le reste en footer minimaliste)
```

### 2. Cluttered Design / Information Overload

**Probleme** : Trop de boxes, navs multiples, texte dense au-dessus du fold.

**Correction** : Visual hierarchy stricte (headline > CTA > visual). White space genereux.

**Prevention** : Audit "essential only" — supprimer tout element non-actionnable.

### 3. Headline Vague ou Clever

**Probleme** : "Welcome to the future of work" / "L'art de coder en mode zen".

**Impact** : Le visiteur ne comprend pas le produit en 5s = bounce.

**Correction** : Benefit-driven, specifique, < 12 mots.

```
MAUVAIS : "Discover the magic of digital learning"
BON     : "Master Python in 30 days, with hands-on projects"
```

### 4. Critical Info Below the Fold

**Probleme** : Value prop, CTA primaire ou benefits caches sous le scroll.

**Impact** : Plupart des visiteurs ne scrollent jamais s'ils ne sont pas accroches.

**Correction** : Headline + sub + CTA + 1 trust signal **above-the-fold**.

**Prevention** : Tester en 1920x1080 ET 375x667 (iPhone SE) — tout visible ?

### 5. Page Speed > 3s

**Probleme** : Page lente, images lourdes, scripts bloquants.

**Impact** : 53% des visiteurs mobile abandonnent au-dela de 3s. -8 a -10% par 0.1s.

**Correction** :
- Images en WebP / AVIF
- Lazy loading sauf hero
- CDN pour les assets
- Minify CSS/JS
- LCP < 2.5s

**Prevention** : Lighthouse audit avant publication, score >= 90.

### 6. Mauvaise Mobile Optimization

**Probleme** : Layout casse, fonts trop petits, CTAs pas accessibles au pouce.

**Impact** : 55-83% du trafic est mobile. 52% des visiteurs disent eviter une marque apres mauvaise UX mobile.

**Correction** : Mobile-first design, touch targets >= 48px, full-width CTAs, sticky bottom CTA.

**Prevention** : Tester sur 3+ devices reels avant publication.

### 7. Stock Photos Generiques

**Probleme** : Photos polished detectables au premier coup d'oeil. "Femme casque sourit pres ordinateur".

**Impact** : Baisse de credibilite, sentiment d'inauthenticite.

**Correction** : Photos clients reels, screenshots produit reels, custom illustrations.

**Prevention** : Banque de photos brand-specific. Bannir Shutterstock par defaut.

### 8. Forms Trop Longs

**Probleme** : 8-15 champs au signup, demande de tel + entreprise + role + budget des le premier contact.

**Impact** : Drop massif. Forms reduits = +120% conversions documentees (VWO).

**Correction** :
- Demander uniquement nom + email au depart
- Multi-step form pour 5+ champs
- Inline validation, smart defaults, progress indicator
- Champs progressivement (apres lead chaud)

```
MAUVAIS : [Nom][Prenom][Email][Tel][Entreprise][Role][Budget][Comment][Source]
BON     : [Email]  -> step 2 apres engagement
```

### 9. CTA Faible / Generique

**Probleme** : "Submit", "Click Here", "Send".

**Impact** : -30 a -40% vs CTAs benefit-driven.

**Correction** :
- Action verb + benefit specifique
- First-person ("My", "Me")
- 2-5 mots
- Microcopy de reassurance dessous

```
MAUVAIS : [Submit]
BON     : [Get My Free SEO Audit]
          No credit card required - Takes 60 seconds
```

### 10. Ad-Landing Page Misalignment

**Probleme** : L'annonce promet "20% off Black Friday", la LP parle de "general pricing".

**Impact** : Sentiment d'arnaque, bounce immediat, Quality Score Google Ads degrade.

**Correction** : LP dediee par campagne. Headline = promesse de l'ad. Visual = celui de l'ad. Offre = celle de l'ad.

**Prevention** : QA avant launch — l'annonce et la LP racontent EXACTEMENT la meme histoire ?

### 11. Pas de Social Proof

**Probleme** : Aucun testimonial, logo client, rating, stat. Marque inconnue qui demande qu'on lui fasse confiance.

**Impact** : Trust deficit massif. 90% des acheteurs influences par social proof.

**Correction** : Trust bar sous hero, 3+ testimonials avec photos, stats brand, FAQ.

**Prevention** : Collecter activement des temoignages clients en continu.

### 12. Popups Intrusifs

**Probleme** : Popup full-screen des l'arrivee, popup avant scroll, exit-intent dans les 5 premieres secondes.

**Impact** : Penalite Google sur mobile. UX deteree. Visiteur quitte avec frustration.

**Correction** :
- Pas de popup avant 30s ou 50% scroll
- Exit-intent uniquement (jamais sur entry)
- Offrir un vrai incentive (-20%, ebook utile)
- Format minimaliste sur mobile
- Bouton fermeture clairement visible

### 13. Pas de SEO

**Probleme** : Title generique, meta description vide, H1 absent, alt-text manquant.

**Impact** : 0 trafic organique, pages introuvables. Quality Score Google Ads degrade.

**Correction** :
- Title 50-60 chars avec keyword principal
- Meta description 150-160 chars accrocheuse
- 1 seul H1 par page
- Alt-text descriptif sur toutes images
- URL structure /[sujet]-[benefice]/
- Schema.org markup (Course, Product, etc.)

## Anti-Patterns Specifiques Formation

| Anti-pattern | Correction |
|--------------|-----------|
| "10 modules video" comme value prop | "Tu sauras X, Y, Z d'ici 30 jours" (outcomes) |
| Pas d'instructeur visible | Bio + photo + credentials |
| Pas de syllabus / curriculum | Liste detaillee modules + duree |
| Prix cache jusqu'au checkout | Pricing transparent et flexible |
| Pas de garantie remboursement | 30-day money-back explicite |
| Testimonials "great course!" | Quotes avec resultats chiffres |
| Pas de countdown / urgency | "Cohorte demarre le X" |
| Une seule option de paiement | Mensuel + annuel avec discount |

## Anti-Patterns Specifiques B2B SaaS

| Anti-pattern | Correction |
|--------------|-----------|
| Demo-only flow (pas de self-serve) | Free trial + demo en parallele |
| Pricing "Contact us" partout | Public pricing tier de base |
| Form "Talk to sales" 12 champs | Email seulement, qualif apres |
| Jargon corporate ("synergize") | Langage client direct |
| Aucune integration mentionnee | Logos integrations top |
| Pas de demo video | Demo video < 90s above the fold |

## Anti-Patterns Specifiques E-commerce

| Anti-pattern | Correction |
|--------------|-----------|
| Pas d'image produit en hero | Photo produit + use case |
| Pas de prix visible | Prix + devise + economies |
| Pas de "Add to cart" sticky | Sticky CTA mobile |
| Pas de reviews produit | Reviews avec photos clients |
| Frais livraison surprise | Clarte des le hero ("Free shipping") |
| Pas de retour / garantie | Politique retour visible |

## Checklist Anti-Patterns (audit rapide)

Pour chaque LP, valider :

- [ ] **1 seul** objectif de conversion
- [ ] Above-the-fold : headline + sub + CTA + trust signal
- [ ] Headline benefit-driven, pas clever, < 12 mots
- [ ] Page speed < 3s (Lighthouse > 90)
- [ ] Mobile : tout fonctionne au pouce
- [ ] Photos authentiques (pas stock generique)
- [ ] Form : 1-3 champs initiaux max
- [ ] CTA : action verb + benefit + microcopy
- [ ] Ad <-> LP : meme promesse, meme visuel
- [ ] Social proof : 3+ formats (testimonials, logos, stats)
- [ ] Pas de popup avant 30s
- [ ] SEO basique : title, meta, H1, alt-text
- [ ] Risk reversal pres du CTA principal

## Sources

- [13 Common Landing Page Mistakes — Zoho](https://www.zoho.com/landingpage/landing-page-mistakes.html)
- [17 Most Common Mistakes — Klientboost](https://www.klientboost.com/landing-pages/landing-page-mistakes/)
- [28 Mistakes That Lose Revenue — Apexure](https://www.apexure.com/blog/landing-page-mistakes-that-make-you-lose-revenue)
- [Top Mistakes — Unbounce](https://unbounce.com/landing-pages/top-landing-page-mistakes/)
