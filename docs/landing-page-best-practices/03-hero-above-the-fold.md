# Hero Section & Above-the-Fold

## Vue d'Ensemble

Le hero est la section visible **sans scroll** au chargement. C'est la zone la plus critique : le visiteur decide en **50 millisecondes** s'il reste ou part. Le hero doit repondre a "What's in it for me ?" en 3-5 secondes maximum, avec une hierarchie visuelle stricte : **headline first, CTA second, visual third**.

## Composants Obligatoires

| Composant | Role | Regle |
|-----------|------|-------|
| **Headline** | Promesse / value prop | Court, benefit-driven, sans jargon |
| **Subheadline** | Contexte qui complete | Repond a "Pour qui ?" et "Comment ?" |
| **CTA primaire** | Action principale | 1 seul, contraste eleve |
| **Visual** | Reinforcement message | Demonstre le produit, pas decoratif |
| **Trust signal** | Reduction du risque | Logos, rating, "as seen in" |

## Headline — Regles d'Or

### Ce qui marche
- **Benefit > Feature** : "Build something beautiful" > "10 templates available"
- **Audience-centric** : "Get paid to play with pets" (DoorDash style)
- **Action verbs** : Build, Master, Discover, Transform, Achieve
- **Specificity** : "From zero to launch in 30 days" > "Learn online"

### Ce qui ne marche pas
- Wordplay / metaphores creatives ("L'art de coder en mode zen")
- Headlines vagues ("Welcome to our platform")
- Auto-centre marque ("We are the leader in...")
- Plus de 12 mots

### Exemples Top
| LP | Headline | Pourquoi ca marche |
|----|----------|-------------------|
| Calm | "Meet Calm" | 2 mots, branding fort, intriguant |
| Rover | "Get paid to play with pets" | Benefit ultra concret |
| Branch | "Office Furniture Made Easy" | Promesse + audience |
| Athabasca | "Open. Flexible. Everywhere." | 3 benefices en 3 mots |

## Subheadline — Pattern Recommande

```
[HEADLINE court et accrocheur]
[SUBHEADLINE : pour qui + ce qu'ils obtiennent + comment]
```

Exemple :
```
HEADLINE   : Master Python in 30 Days
SUBHEADLINE: For data analysts who want to automate reporting,
             with hands-on projects evaluated by mentors.
```

## CTA Hero — Regle Critique

**1 CTA primaire seulement**. Multiples CTAs en concurrence = chute conversion **jusqu'a -266%** (Zoho/Unbounce).

| Element CTA | Specification |
|-------------|---------------|
| Quantite | 1 primaire (1 secondaire OK si visuellement subtil) |
| Couleur | Contraste eleve avec background |
| Taille | 48-56px hauteur desktop, 56-64px mobile |
| Padding | >= 24px sur tous cotes |
| Copy | 2-5 mots, action-driven, first-person |
| Microcopy | "No credit card", "Takes 60 seconds" en dessous |

Voir [04-cta-optimization.md](04-cta-optimization.md) pour le detail.

## Visual / Hero Image

### Hierarchie obligatoire
```
1. Headline   (le plus visible)
2. CTA        (le plus actionnable)
3. Visual     (reinforce, ne distrait pas)
```

> "Le pattern qui kill l'above-fold conversion plus que tout : le headline et le visual qui se battent pour la meme attention." (Perfect Afternoon)

### Types de visuels qui convertissent
| Type | Usage | Exemple |
|------|-------|---------|
| Product screenshot | SaaS, dashboard | Cursor, Notion |
| Demo video (auto-play muted) | Process complexe | Zoom, Gusto |
| Photo authentique | Lifestyle, ecommerce | Wavehuggers, Goby |
| Animation legere | Tech, modernite | Krisp, Linear |
| Background video | Brand authority | Nissan, Tesla |

### A eviter
- Stock photos generiques (detectees, baisse de confiance)
- Photos professionnelles trop polished
- Carousels/sliders multiples (cognitive overload)
- Visuel plus prominent que le headline

## Specifications Techniques

| Critere | Cible |
|---------|-------|
| LCP (Largest Contentful Paint) | < 2.5s |
| Image format | WebP / AVIF |
| Image lazy loading | Non pour hero (above-fold), oui pour le reste |
| Background video | Compresse, auto-play muted, lazy-load |
| Touch target CTA mobile | >= 48x48px |
| Police hero | Large (40-72px desktop), expressive |

## Patterns de Hero qui Convertissent

### 1. Minimaliste (Medium)
```
3-word headline + 1 line sub + 1 CTA + ample white space
```
Reduit l'overload cognitif, convient produits content-first.

### 2. Input-capture (GitHub)
```
Headline + email input + signup CTA inline
```
Demarre le funnel avant le clic. Bon pour SaaS freemium.

### 3. Split-column (Sketch, Linear)
```
[Copy + CTA]  |  [Product visual / screenshot]
```
Equilibre messaging et demo. Best for B2B SaaS.

### 4. Product-preview (Cursor, Notion)
```
Headline + sub + CTA
[Real product screenshot avec annotations]
```
Manage les expectations avant signup, reduit le drop apres.

### 5. Video showcase (Zoom)
```
Headline + 3 sentences sub + CTA
[Auto-play demo video muted]
```
Best pour produits avec process complexe a montrer.

### 6. Pre/post hero strip (Krisp)
```
[Strip : "Compatible with Zoom, Meet, Teams"]
HERO classique
```
Communique la compatibilite / contexte avant le hero.

## Anti-Patterns Hero

| Anti-pattern | Correction |
|--------------|-----------|
| Headline + visual en competition | Hierarchie stricte : headline > CTA > visual |
| 2-3 CTAs primaires | 1 seul CTA primaire |
| Wordplay clever ("Coding zen") | Clarte beneficiale |
| Stock photos generiques | Photos produit / customers reels |
| Au-dessus-du-fold sature | White space strategique |
| Headline > 12 mots | Ramener a 6-8 mots max |
| Slider auto-rotatif | Statique ou interactif user-driven |

## Checklist Hero

- [ ] Headline benefit-driven < 12 mots
- [ ] Sub repond "pour qui + comment"
- [ ] 1 seul CTA primaire visible
- [ ] CTA contraste eleve, padding 24px+
- [ ] Visual demonstre la valeur (pas decoratif)
- [ ] Trust signals (logos / rating / "as seen in")
- [ ] LCP < 2.5s
- [ ] Mobile : touch target 48x48px min
- [ ] Tout visible sans scroll en 1920x1080 ET sur mobile 375x667
- [ ] Comprehensible en 3-5 secondes (test : montrer a quelqu'un)

## Sources

- [Hero Section Design — Perfect Afternoon](https://www.perfectafternoon.com/2025/hero-section-design/)
- [Website Hero Section — Prismic](https://prismic.io/blog/website-hero-section)
- [10 Hero Section Examples — LogRocket](https://blog.logrocket.com/ux-design/hero-section-examples-best-practices/)
- [Above the Fold Best Practices — LeadFlask](https://leadflask.com/blog/website-hero-design-best-practices)
