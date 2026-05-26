# Quality Score & Landing Page Best Practices 2026

## Table des Matieres

1. [Anatomie du Quality Score](#anatomie-du-quality-score)
2. [Landing Page Experience : composantes](#landing-page-experience--composantes)
3. [Best practices par section](#best-practices-par-section)
4. [Performance et page speed](#performance-et-page-speed)
5. [Mobile-first : non-negociable](#mobile-first--non-negociable)
6. [Checklist conformite](#checklist-conformite)

## Anatomie du Quality Score

Le Quality Score est un diagnostic Google sur une echelle 1-10, calcule au niveau **keyword**. Il repose sur trois composantes :

| Composante | Poids approx. | Definition |
|------------|---------------|------------|
| **Expected CTR** | ~33% | Probabilite que ton ad soit cliquee quand affichee |
| **Ad Relevance** | ~33% | Adequation entre ad copy et intention de recherche |
| **Landing Page Experience** | ~33% | Pertinence et utilite de la landing page |

Chaque composante recoit un statut : **Above average**, **Average**, ou **Below average**, base sur comparaison avec autres advertisers sur les memes searches sur 90 jours.

### Pourquoi le Quality Score Compte

Impact direct mesure :
- **Ads "Above average"** sur landing + ad relevance : **CPC -36%** vs moyenne
- **Above average** sur tous les axes : Quality Score 8-10, position de premier rang accessible avec budgets moindres
- **Below average** sur landing : penalite Ad Rank, augmentation CPC, baisse impressions

### Changement Majeur 2025-2026

Google a recalibre le scoring Quality Score en 2025 :
- Plus de poids sur **navigation experience** (architecture du site, clarte parcours)
- Penalisation des **destinations inattendues** (clic = page non liee a l'ad)
- Modele de prediction utilise pour evaluer transparence et UX

## Landing Page Experience : Composantes

Google mesure la landing page experience selon plusieurs criteres :

### 1. Pertinence du Contenu (Message Match)

**Regle critique** : ce que l'ad promet, la landing doit le delivrer immediatement.

Exemple :
- Ad : "Flannel shirts -30%"
- Landing : page dediee aux flannels EN PROMOTION (pas la homepage, pas la collection generale)

### 2. Clarte de la Proposition de Valeur

Le visiteur doit comprendre l'offre en **5 secondes** :
- Headline visible above-the-fold
- Subheadline qui contextualise
- CTA principal visible et action-oriente

### 3. Transparence & Trust

- Mentions legales accessibles
- Politique de confidentialite linkee
- Pas de "dark patterns" (CTA trompeurs, popup intrusifs)
- Coordonnees de contact visibles

### 4. Navigation & Architecture

- Pas de navigation excessive distrayante
- Pas de redirections multiples
- URL stable et lisible
- Pas de pop-ups bloquants intrusifs

### 5. Charge Utile (Substance)

- Contenu original et substantiel (eviter pages "thin")
- Reponse claire a la requete utilisateur
- Pas de bait-and-switch

## Best Practices par Section

### Above-the-fold (les 600 premiers pixels)

```
[LOGO]    [Trust badges si pertinent]    [PHONE / CTA secondaire]

   HEADLINE QUI MATCH L'AD (H1)
   Subheadline qui clarifie l'offre

   [CTA PRIMAIRE]    [Visuel produit / illustration]
   Trust signals : "X clients", "Note 4.8", etc.
```

### Body Content

- **3-5 sections** maximum sur landing page courte (vs site pleine)
- Chaque section : un benefice, un proof point (testimonial, donnee, screenshot)
- **Iconographie + texte** plutot que paragraphes denses
- **CTA repetes** tous les 2-3 ecrans

### Bottom of Page

- FAQ (resoudre objections finales)
- CTA final + alternative (telephone, chat)
- Footer leger : essentials seulement (mentions, privacy, contact)

## Performance et Page Speed

### Impact Direct sur Conversions

> "1 seconde de delai mobile peut reduire les conversions mobiles de 20%" — Google data

### Cibles 2026

| Metrique | Cible | Ideal |
|----------|-------|-------|
| **LCP (Largest Contentful Paint)** | < 2.5s | < 1.8s |
| **CLS (Cumulative Layout Shift)** | < 0.1 | < 0.05 |
| **INP (Interaction to Next Paint)** | < 200ms | < 100ms |
| **Time to First Byte** | < 800ms | < 400ms |
| **Total page weight** | < 1.5MB | < 1MB |

### Leviers d'Optimisation

1. **Images** : WebP/AVIF, lazy loading, dimensions explicites (anti-CLS)
2. **Fonts** : `font-display: swap`, subsetting, preload des fonts critiques
3. **JS** : minification, defer/async, tree-shaking
4. **CSS** : purge des classes inutilisees, critical CSS inline
5. **CDN** : Cloudflare, Fastly, ou solution Webflow native
6. **Cache** : aggressive cache statique, edge caching

### Webflow Specific

- Activer **Asset minification** dans Site Settings
- Utiliser **Webflow CDN** pour assets
- **Lazy load** images via attribut natif
- Eviter custom JS lourds : preferer interactions Webflow natives

## Mobile-First : Non-Negociable

### Stats Cles

- **83%** des visites landing page = mobile
- Quality Score **mobile** mesure separement du desktop depuis 2024
- Echec mobile = penalite Quality Score + perte conversions

### Tests Obligatoires

1. **Mobile-Friendly Test** Google : https://search.google.com/test/mobile-friendly
2. **PageSpeed Insights** mobile : score >= 80 cible
3. Test reel sur device : iPhone SE (petite resolution) + Android moyen de gamme
4. Viewport 375px : valider que rien ne deborde, headlines lisibles

### Patterns Mobile-First

- Sticky CTA en bas d'ecran (toujours visible)
- Click-to-call buttons natifs (`tel:` href)
- Forms reduits : email + 1-2 champs max
- Pas de hovers (n'existent pas sur mobile)
- Tap targets >= 48px (Google guideline)

## Checklist Conformite

Avant de lancer une campagne, valider :

### Pertinence
- [ ] Headline H1 reprend le keyword/theme principal de l'ad
- [ ] Subheadline reformule l'offre de l'ad
- [ ] CTA principal correspond a l'action attendue (l'ad parle de "demo" → CTA "Book demo")
- [ ] Visuel principal illustre l'offre

### Transparence
- [ ] Mentions legales accessibles depuis footer
- [ ] Politique de confidentialite linkee
- [ ] Pas de popup intrusif au load
- [ ] Coordonnees de contact visibles

### Performance
- [ ] LCP < 2.5s sur 4G mobile
- [ ] CLS < 0.1
- [ ] Score PageSpeed >= 80 mobile
- [ ] Images optimisees (WebP, lazy load)

### Mobile
- [ ] Test mobile passe (Google Mobile-Friendly Test)
- [ ] Viewport 375px sans debordement
- [ ] CTA principal accessible sans scroll
- [ ] Forms compactes, autocomplete actif

### Tracking
- [ ] GA4 installe + Google Ads link
- [ ] Conversions definies (voir [07-conversion-tracking.md](07-conversion-tracking.md))
- [ ] Enhanced Conversions actives
- [ ] Consent Mode V2 deploye

### Anti-Patterns Eviter
- [ ] Pas de homepage en landing si l'ad cible un produit
- [ ] Pas de CTA agressif type "10 popups d'exit"
- [ ] Pas de scroll infini sans valeur
- [ ] Pas de navigation site complete (distractions)

## Impact Mesurable

Ce que tu peux attendre apres optimisation Quality Score :

| Action | Impact typique |
|--------|----------------|
| Aligner ad → landing (message match) | +20-50% conversion rate |
| Score Quality 8+ vs 4-5 | -30 a -36% CPC |
| LCP de 4s a 2s | +10-25% conversions |
| Mobile optim → score 90+ | +15-30% conversions mobile |
| DKI sur landing (voir [05-personalization-dynamic-content.md](05-personalization-dynamic-content.md)) | +10-25% conversions |

## Sources

- [About Quality Score (Google Ads Help)](https://support.google.com/google-ads/answer/6167118?hl=en) — Doc officielle composantes
- [5 ways to use Quality Score (Google Ads Help)](https://support.google.com/google-ads/answer/6167130?hl=en) — Optimisation officielle
- [Google Ads Landing Page Optimization Guide 2026 (SaaS Hero)](https://www.saashero.net/google-ppc/google-ads-landing-page-optimization/) — Guide LP 2026
- [How to Improve Your Landing Page Experience (Nitropack)](https://nitropack.io/blog/landing-page-experience-optimization/) — Performance focus
- [Google Ads Quality Score: How To Use it in 2026 (Store Growers)](https://www.storegrowers.com/google-ads-quality-score/) — Pratique
- [Google Ads Updates Landing Page QS System (Digital Position)](https://www.digitalposition.com/resources/blog/ppc/google-ads-updates-landing-page-quality-score-system-what-it-means-for-you/) — Changements 2025
