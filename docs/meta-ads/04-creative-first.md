# 04 — Creative First : Vertical 9:16, Hook < 1.7s, Formats

## Table des Matieres

- [Vue d'Ensemble](#vue-densemble)
- [Concepts Cles](#concepts-cles)
- [Patterns Recommandes](#patterns-recommandes)
- [Anti-Patterns](#anti-patterns)
- [Sources](#sources)

## Vue d'Ensemble

En 2026, la creative est le premier levier de performance. Avec Andromeda et Advantage+, Meta automatise tout sauf la creative. La diversite et la qualite des assets determinent le ROAS plus que le ciblage. Standard : vertical 9:16, hook visuel ou claim choc dans les 3 premieres secondes (idealement < 1.7s), production UGC-style, captions, son optionnel.

## Concepts Cles

### Le Hook : la fenetre de 1.7s

> "Most Meta users scroll past an ad in under 1.7 seconds." — LeadSync 2026

Le hook = 1ere frame + 1ere ligne de copy + 1er son. Si echec, l'ad n'existe plus. Patterns hook qui marchent :
- **Pattern interrupt** : visuel inattendu, mouvement rapide, zoom face camera.
- **Claim specifique** : chiffre precis ("J'ai economise 743€ en 3 mois").
- **Question directe** : "Tu galeres avec X ?"
- **Before/after cut** : transformation visible immediate.

### Format Hierarchy 2026

| Format | Aspect | Length | Part top performers |
|--------|--------|--------|---------------------|
| Reels / Stories video | 9:16 | 15-30s | 60% |
| Feed image lifestyle | 4:5 | — | 30% |
| Carousel | 4:5 ou 3:4 | — | 10% |

- **9:16 vertical** = format prioritaire (Reels, Stories, Feed in-app sans crop).
- **4:5** = Feed alternative.
- **Carousel** = 1080x1440 (3:4) ou 1080x1350 (4:5).

### Safe Zones Unifiees Mars 2026

Canvas 1440x2560 pixels (9:16) :
- **Top : 14% (~358px)** — laisse place profile/sponsored label
- **Bottom : 20-35% (~512-896px)** — CTA buttons + engagement icons + captions
- **Sides : 6% chacun (~87px)** — variations device

Stories-only (plus serre) :
- Top 14% / Bottom 14% / pas de safe zones laterales

### Audio
- **85% des videos Facebook regardees sans son** -> captions OBLIGATOIRES (burned-in ou auto).
- Ads avec musique/voix/native sound : **+35% engagement**.
- Eviter musique auto-generee Meta : risque tonal mismatch.

### UGC > Production polie
- "UGC consistently beats polished production" : testimonials clients > $5,000 studio dans 9/10 comptes.
- Phone-shot, lumiere naturelle, son micro telephone : lit comme du contenu peer, pas comme une pub.

## Patterns Recommandes

### Formule Reels High-Converting (2026)

```
[0-3s]    HOOK native-style — pattern interrupt + claim
[4-10s]   PROBLEM AGITATION — pain point + emotion
[11-20s]  PRODUCT DEMO ou SOCIAL PROOF
[21-30s]  CTA direct
```

### Volume Creatives par Spend

| Budget journalier | Creatives actives min | Refresh hebdo |
|-------------------|----------------------|---------------|
| $100-300 | 10-15 | 3-5 |
| $300-1,000 | 20-30 | 5-8 |
| $1,000-5,000 | 30-50 | 8-12 |
| $5,000+ | 50-100+ | 15-20+ |

- Pour ASC : jusqu'a **150 assets** recommandes.
- Refresh general : **toutes les 2-4 semaines** au minimum.

### Diversification Creative
L'algorithme matche le right creative au right person. Diversifier :
- **UGC testimonials** (visage face camera)
- **Product shots** (statique propre)
- **Lifestyle** (produit en contexte)
- **Demo video** (how-to, before/after)
- **Carousel** (story narrative ou multi-features)
- **Catalog dynamic ads** (DPA pour ecommerce)

### Specs Techniques Rapides

| Placement | Aspect | Resolution | Length |
|-----------|--------|------------|--------|
| Reels | 9:16 | 1080x1920 | 0-90s, ideal 15-30s |
| Stories | 9:16 | 1080x1920 | 0-60s |
| Feed video | 9:16 ou 4:5 | 1080x1920 / 1080x1350 | 0-241min, ideal 30-60s |
| Feed image | 4:5 | 1080x1350 | — |
| Carousel | 4:5 ou 3:4 | 1080x1350 / 1080x1440 | 2-10 cards |

### Kill Threshold Creative
- Bas spend : **2x target CPA, 0 sale** -> kill.
- Haut spend : **1.5x target CPA, 0 sale** -> kill.

## Anti-Patterns

| Anti-pattern | Impact |
|--------------|--------|
| 1 creative unique en rotation | Creative fatigue en 1-2 semaines, CPM explose |
| Format 1:1 ou 16:9 sur Reels | Crop massif, perte du hook |
| Texte critique en bottom 20% | Cache par CTA/icones natives Meta |
| Production studio polie corporate | Read as ad -> scroll away |
| Pas de captions | -85% des viewers ne comprennent rien |
| Logo en intro 3s | Brule le hook |
| Refresh < 1 semaine sur learning phase | Reset de l'apprentissage |

## Workflow Creative pour Nopillo

1. **Brief** : 1 angle = 1 hook = 1 promesse landing-aligned.
2. **Production batch** : 10-20 variations / brief (UGC actor pool, prompts AI, B-roll).
3. **Naming convention** : `[brand]_[angle]_[hook-variant]_[format]_[date]`.
4. **Upload** : par batches de 5-10 par semaine, ne pas tout cramer en 1 fois.
5. **Reporting** : analyser hook rate (3-second video plays / impressions), hold rate, CTR.

## Sources

- [Meta Advantage+ Creative Best Practices 2026 — AdMove](https://www.admove.ai/blog/meta-advantage-creative-best-practices-for-2026)
- [Meta Ads Creative Best Practices 2026 — AdStellar](https://www.adstellar.ai/blog/meta-ads-creative-best-practices)
- [Meta Ads Safe Zones 2026 — Billo](https://billo.app/blog/meta-ads-safe-zones/)
- [Instagram Reels Ads 2026 — Digital Applied](https://www.digitalapplied.com/blog/instagram-reels-ads-2026-creative-strategy-guide)
- [Meta Ads Size Guide 2026 — AdsUploader](https://adsuploader.com/blog/meta-ads-size)
- [Meta Ads Best Practices — LeadSync](https://leadsync.me/blog/meta-ads-best-practices/)
