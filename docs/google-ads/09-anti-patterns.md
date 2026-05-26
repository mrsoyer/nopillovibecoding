# Google Ads — Anti-Patterns & Erreurs Courantes 2026

## Table des Matieres

1. [Tracking & Conversion](#tracking--conversion)
2. [Strategy & Structure](#strategy--structure)
3. [Bidding & Budget](#bidding--budget)
4. [Creatives & Ads](#creatives--ads)
5. [Landing Pages](#landing-pages)
6. [Performance Max specifiques](#performance-max-specifiques)
7. [Recommendations Google](#recommendations-google)

## Tracking & Conversion

### Anti-Pattern 1 : Pas de Conversion Tracking

❌ **Probleme** : Beaucoup d'advertisers ne setup pas du tout, ou tracking les mauvais events.

**Consequences** :
- Decisions a l'aveugle
- Smart Bidding optimise pour metriques non-business (vanity)
- Budget brule sur low-value activities

✅ **Solution** : Setup GA4 + Google Ads link + auto-tagging + Enhanced Conversions des le jour 1. Voir [07-conversion-tracking.md](07-conversion-tracking.md).

### Anti-Pattern 2 : Double-Counting

❌ **Probleme** : Tracker meme conversion en native Google Ads ET en GA4 import.

**Consequences** :
- Chaque purchase counte 2x → CPA divise par 2 artificiellement
- Smart Bidding bid trop haut (croit que c'est rentable)
- Budget waste invisible

✅ **Solution** : Une source of truth. Si GA4 imports : set Google Ads native a "Secondary".

### Anti-Pattern 3 : Pas d'Enhanced Conversions

❌ **Probleme** : Cookie-only tracking → perdre 30-50% des conversions cross-device et logged-out.

✅ **Solution** : Enhanced Conversions = +5-15% conversions reportees. Implementation via GTM + dataLayer.push().

### Anti-Pattern 4 : Last-Click Attribution

❌ **Probleme** : Last-click sur-credite brand keywords et bottom-funnel, sous-credite discovery.

**Consequences** :
- Budget sur-alloue brand (auto-cannibalisme)
- Discovery campaigns paraissent non-rentables → cut
- Croissance bloquee

✅ **Solution** : **Data-Driven Attribution (DDA)**, default 2026.

## Strategy & Structure

### Anti-Pattern 5 : Sur-Segmentation

❌ **Probleme** : 15+ campagnes pour budget moyen, chaque campagne < 5 conv/mois.

**Consequences** :
- Smart Bidding ne peut pas apprendre (pas assez de data)
- CPA augmente 40-60%
- Maintenance impossible

✅ **Solution** : Consolide vers 2-4 core campaigns, prouve perf, puis expand.

### Anti-Pattern 6 : Strategies Outdated

❌ **Probleme** : Encore en 2026, certains advertisers utilisent :
- Single Keyword Ad Groups (SKAGs) → obsolete avec Broad Match + Smart Bidding
- Manual CPC bidding → casi jamais optimal
- Expanded Text Ads → format mort, RSA only
- DSA campaigns sans Smart Bidding → drift

✅ **Solution** : Stack 2026 :
- Broad Match + Smart Bidding (avec negatives discipline)
- Responsive Search Ads (RSA)
- Performance Max + Asset Groups
- AI Max Search (NA, depuis Jan 2026)

### Anti-Pattern 7 : Pas de Negative Keywords

❌ **Probleme** : Lance Broad Match sans negatives → drift vers queries irrelevantes.

**Consequences** :
- 30-50% du spend sur queries non-pertinentes
- Quality Score chute (mauvais match)
- ROI s'effondre

✅ **Solution** :
- **Audit hebdomadaire** Search Terms Report
- **Shared negatives list** au niveau compte
- **Negative keyword script** automated (voir Search Term Mining Script)

## Bidding & Budget

### Anti-Pattern 8 : Mauvaise Bid Strategy

❌ **Probleme** :
- Lancer tROAS sans 50+ conversions value-based
- Switcher entre tCPA et tROAS toutes les semaines (reset learning)
- Manual CPC sur compte avec data abundante

✅ **Solution** :
- Demarrer **Maximize Conversions**
- Apres 30+ conv stables → switch tCPA
- Si ecommerce avec values stables 50+ → tROAS
- **Patience** : 1-2 semaines learning par changement

### Anti-Pattern 9 : Budget Fragmente

❌ **Probleme** : Diviser 1 000€/mois sur 15 campagnes → chaque a < 70€ et < 5 conv.

✅ **Solution** :
- 80/20 : 80% du budget sur 2-3 campagnes core
- Chaque campagne >= 30 conv/mois pour Smart Bidding

### Anti-Pattern 10 : Budget Spike Brutal

❌ **Probleme** : Augmenter le budget de 100% du jour au lendemain → reset partial du learning Smart Bidding.

✅ **Solution** : **+20% / 7 jours maximum** pour preserver l'apprentissage.

## Creatives & Ads

### Anti-Pattern 11 : RSA Mal Setup

❌ **Probleme** :
- Moins de 10 headlines (Google requiert 15)
- Pas de pinning strategique
- Headlines tous en variations marketing speak (pas d'USP)

✅ **Solution** :
- 15 headlines varies (USP, features, social proof, CTA, urgency)
- Pin headline 1 sur USP principale, laisser flexibilite ailleurs
- 4 descriptions, 2 sitelinks min, 1 callout, 1 structured snippet

### Anti-Pattern 12 : Insufficient Ad Testing

❌ **Probleme** : 1 ad par ad group, jamais teste de variations.

**Consequences** :
- Pas d'apprentissage sur quelle copy convertit
- Stuck sur formulations mediocres
- CTR/CR plafonne

✅ **Solution** :
- 2-3 RSA par ad group au demarrage
- Review monthly : kill underperformers, add new variants
- Track headline/description performance separement

## Landing Pages

### Anti-Pattern 13 : Homepage en Landing

❌ **Probleme** : Ad cible "formation Webflow" mais pointe vers homepage generique.

**Consequences** :
- Quality Score "Below average" landing page
- CR chute 50%+ vs landing dediee
- CPC augmente

✅ **Solution** : Landing dediee par theme/produit, message-matched avec ad. Voir [03-landing-page-quality-score.md](03-landing-page-quality-score.md).

### Anti-Pattern 14 : Page Speed Catastrophique

❌ **Probleme** : LCP > 4s, page weight 5MB, CLS 0.5.

**Consequences** :
- Quality Score penalize
- Mobile conversion -20% par seconde de delai
- Bounce rate explose

✅ **Solution** :
- LCP < 2.5s
- Page weight < 1.5MB
- CLS < 0.1
- Mobile-first design

### Anti-Pattern 15 : DKI Mal Implementee

❌ **Problemes courants** :
- Leaked placeholders ({keyword} brut affiche)
- Keyword stuffing (8+ insertions)
- Pas de fallback statique
- Mobile overflow sur keywords longs
- DKI cote SEO

✅ **Solution** : Voir [05-personalization-dynamic-content.md](05-personalization-dynamic-content.md) pour bonnes pratiques DKI.

## Performance Max Specifiques

### Anti-Pattern 16 : Brand Cherry-Picking

❌ **Probleme** : PMax inclut tes brand keywords → ROAS gonfle artificiellement (PMax credit-grabs ces conversions easy).

**Consequences** :
- Tu crois PMax performe → augmente budget
- Realite : c'est juste de la captation brand
- Impact net positive marginal

✅ **Solution** : **Brand exclusions** dans PMax (feature disponible 2024+). Run Brand Search en campagne separee.

### Anti-Pattern 17 : Asset Group Pauvre

❌ **Probleme** :
- 3-5 headlines au lieu de 15+
- Pas de video (Google auto-genere → mediocre)
- Logos low-res
- Audience signals vides

✅ **Solution** : Asset group complet. Investir dans creatives qualite.

### Anti-Pattern 18 : Final URL Expansion ON Trop Tot

❌ **Probleme** : Final URL Expansion ON par defaut → PMax envoie traffic vers any page de ton site, parfois irrelevant.

✅ **Solution** : OFF au demarrage. ON apres avoir prouve perf et nettoye le site.

## Recommendations Google

### Anti-Pattern 19 : Auto-Apply Recommendations

❌ **Probleme** : Activer "Auto-apply Google recommendations" → Google augmente budgets, ajoute keywords, change bidding.

**Realite** (etudes industrie) :
- Auto-apply augmente le **spend de 30-40%**
- Mais conversions seulement **+5-10%**
- Le ROI net diminue

**Pourquoi** : Google recommendations beneficient Google d'abord, pas toi. Optimise pour leur revenu.

✅ **Solution** :
- Auto-apply OFF
- Review recommendations manuellement chaque semaine
- Cherry-pick celles qui ont sens stratégique
- Reject : suggestions de budget increase, broad match expansion non-justifie

### Anti-Pattern 20 : Suivre Aveuglement les Optimization Score

❌ **Probleme** : Optimization score (notation Google sur ton compte) pousse vers leurs recommandations. 100% optimization score != 100% perf business.

✅ **Solution** : Optimization score = guideline, pas dogme. Tes KPIs business (CPA, ROAS) sont la verite.

## Resume des Pertes Budget Typiques

D'apres les sources et agences PPC :

| Anti-Pattern | Spend wasted typique |
|--------------|---------------------|
| Pas de negatives + Broad Match | 30-50% |
| Auto-apply recommendations | 30-40% spend extra pour 5-10% conv |
| Sur-segmentation (Smart Bidding cant learn) | 40-60% CPA inflation |
| Brand cherry-picking PMax | 15-30% ROAS gonfle artificiellement |
| Last-click attribution | 20-40% mauvaise allocation budget |
| Pas Enhanced Conversions | -5 a -15% conversions invisibles |
| Pas Consent Mode V2 EU | -30 a -50% data sur consent denied |
| Page speed degradee (>4s LCP) | -20 a -40% CR mobile |

## Checklist Pre-Lancement

Avant de lancer une campagne, verifier :

### Strategy
- [ ] 2-4 campagnes core seulement au demarrage
- [ ] Brand campaign separee si applicable
- [ ] PMax avec brand exclusions active
- [ ] Final URL expansion OFF
- [ ] Auto-apply recommendations OFF

### Tracking
- [ ] GA4 installe et linked Google Ads
- [ ] Auto-tagging actif
- [ ] Conversions definies + DDA
- [ ] Enhanced Conversions setup
- [ ] Consent Mode V2 si EU users

### Bidding
- [ ] Maximize Conversions au depart
- [ ] Budget >= 30 conv/mois cible
- [ ] Negative keywords list (shared) prete

### Creatives
- [ ] 15 headlines varies dans RSA
- [ ] 4 descriptions
- [ ] 4-6 sitelinks
- [ ] Asset group complet pour PMax (videos, logos, images)

### Landing Pages
- [ ] Page dediee message-matched (pas homepage)
- [ ] LCP < 2.5s mobile
- [ ] CTA visible above-the-fold
- [ ] Form simplified
- [ ] DKI implemente avec fallback

### Privacy
- [ ] CMP installe (CookieScript, Cookiebot, etc.)
- [ ] Mentions legales linkees
- [ ] Privacy policy claire

## Sources

- [Common Google Ads Mistakes 2026 (Custom Digital Solutions)](https://customdigitalsolutions.co/common-google-ads-mistakes/) — Liste erreurs
- [5 Common Google Ads Mistakes (PPCROY)](https://ppcroy.com/5-common-google-ads-mistakes-to-avoid-in-2026/) — Top 5
- [7 Outdated Google Ads Mistakes 2026 (Web Informatics)](https://www.webinformatics.in/outdated-google-ads-mistakes-to-avoid/) — Strategies obsoletes
- [7 Costly Mistakes Killing ROI 2026 (Reboot IQ)](https://rebootiq.com/7-google-ads-mistakes-2026/) — ROI impact
- [Outdated Google Ads Strategies (Storycat Creative)](https://storycatcreative.com/outdated-google-ads-strategies-to-stop-using-in-2026/) — A eviter
- [Top 10 Google Ads mistakes to avoid 2026 (Search Engine Land)](https://searchengineland.com/google-ads-mistakes-avoid-449288) — Reference industrie
- [12 Costly Google Ads Mistakes (Swydo)](https://www.swydo.com/blog/google-ads-misakes/) — Detail couts
- [10 Google Ads Mistakes 2026 (Dial 911 for Design)](https://www.dial911fordesign.com/post/10-google-ads-mistakes-to-avoid-in-2026-a-marketer-s-guide-to-better-ppc-results) — Guide marketing
