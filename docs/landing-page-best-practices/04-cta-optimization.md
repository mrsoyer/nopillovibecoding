# CTA Optimization — Copy, Design, Placement

## Vue d'Ensemble

Le CTA (Call-To-Action) est l'element le plus mesurable d'une LP. Un seul changement de copy peut produire **+104% de conversions** (cas Sign up vs Trial). Trois leviers : la **copy** (mots), le **design** (couleur, taille, contraste), le **placement** (where, how often).

## Levier 1 — Copy (le plus impactant)

### Regles fondamentales

| Regle | Impact | Exemple |
|-------|--------|---------|
| Action-oriented | +30-40% vs "Submit" | "Get My Free Audit" |
| First-person ("my", "me") | +10-25% CTR | "Get My Report" > "Get Your Report" |
| 2-5 mots max | Lisibilite | "Start My Free Trial" |
| Specifique > generique | +30-100% | "Download MBA Brochure" > "Download" |
| Power verbs en debut | Engagement | Get / Start / Join / Master / Discover |

### Power Verbs qui Convertissent

```
GET     -> Get started / Get my free trial / Get instant access
START   -> Start free / Start learning / Start my journey
JOIN    -> Join now / Join 10,000+ students
MASTER  -> Master Python / Master design
SEE     -> See how it works / See pricing / See in action
BOOK    -> Book a 15-min call / Book my demo
RESERVE -> Reserve my spot / Reserve early access
TRY     -> Try us free / Try for 14 days
```

### Cas d'A/B test documentes

| Avant | Apres | Lift | Source |
|-------|-------|------|--------|
| "Sign up for free" | "Trial for free" | **+104%** | Unbounce |
| "Download a Brochure" | "Download the MBA Brochure" | **+63%** (3.91% -> 6.38%) | IMD |
| "Request a Demo" | "See Flare in Action" | **+65%** demo bookings | Flare.io |
| "Submit" | "Get My Free Audit" | **+30-40%** | Apexure |
| Generic CTA | First-person variant | **+10-25%** CTR | Apexure |

### Microcopy de Reassurance

Sous le CTA, ajouter une ligne courte qui leve la derniere objection :

```
[ Start My Free Trial ]
No credit card required - Cancel anytime
```

Variantes qui marchent (+10-20% CTR) :
- "No credit card required"
- "Takes 60 seconds"
- "Free for 14 days"
- "Instant access"
- "256-bit SSL encryption. Your data is secure."
- "Join 10,000+ teams already using X"

### Anti-patterns Copy

| Anti-pattern | Correction |
|--------------|-----------|
| "Submit" / "Click Here" | "Get My Audit" |
| Texte different sur chaque CTA | Meme copy partout pour CTAs identiques |
| > 5 mots | Ramener a 2-5 |
| Mots > 5 syllabes | Verbes courts |
| "Sign up" sans qualificatif | "Sign up for my free workspace" |
| Auto-centre ("Send us your data") | "Get my report" |

## Levier 2 — Design

### Specifications Techniques

| Element | Desktop | Mobile |
|---------|---------|--------|
| Hauteur bouton | 48-56px | 56-64px |
| Touch target | >= 44x44px | >= 48x48px |
| Padding interne | >= 24px tous cotes | +20-30% vs desktop |
| Margin externe | 40-60px | Plus aere |
| Border radius | 4-8px | 4-8px |
| Largeur mobile | Auto / large | Full-width recommande |
| Font-size | 16-18px | 18-20px |

### Couleur & Contraste

> "Color influences up to 90% of snap purchasing judgments." (Apexure)

**Le contraste compte plus que la couleur exacte.**

Test du **squint test** : si vous plissez les yeux, le bouton doit etre l'element le plus prominent de la page.

| Pattern | Quand l'utiliser |
|---------|-------------------|
| Bouton orange / rouge sur fond blanc/sombre | E-commerce, urgence |
| Vert sur fond blanc | SaaS, sante, finance |
| Couleur de la brand sur fond neutre | Brand-first |
| Noir/blanc sur fond color | Minimalisme premium |

A eviter : couleur du bouton = couleur background voisin.

### Visual Affordance (montrer que c'est cliquable)

- Border radius 4-8px (pas plat, pas trop rond sauf pill design)
- Subtle box-shadow (elevation)
- Gradient leger optionnel
- **Hover state** obligatoire : changement couleur + elevation
- Arrow icon a la fin (-> ) : **+26% conversions** (UX studies)

```
[ Start My Free Trial -> ]
```

## Levier 3 — Placement

### Multi-touch CTA Strategy

Pages avec CTAs a chaque scroll-fold **+20-35% vs single CTA** (Apexure).

```
[1] HERO              -> CTA primaire 1   (visiteurs deja convaincus)
[2] PROBLEM/SOLUTION  -> CTA secondaire   (apres explication)
[3] SOCIAL PROOF      -> CTA tertiaire    (apres validation)
[4] FAQ / OBJECTIONS  -> CTA final        (apres reassurance)
[5] FOOTER            -> CTA dernier push
```

### Mobile-Specific

| Pattern | Bonne pratique |
|---------|---------------|
| Sticky bottom CTA | Pour LP longues, toujours visible |
| Full-width button | Plus facile a tapper au pouce |
| Position thumb zone | Bas du screen, dans le tiers inferieur |
| Simplification copy | Texte plus court qu'en desktop |

### Cohérence multi-CTA

**Regle** : Si plusieurs CTAs sur une LP, soit ils ont **tous la meme copy** (tous CTAs vers le meme objectif), soit ils sont visuellement differencies (primaire vs secondaire) et ne peuvent pas etre confondus.

## 5 Types de CTA par Stade du Funnel

| Type | Usage | Exemple |
|------|-------|---------|
| **Lead generation** | Construire liste email | "Download our 2026 industry report" |
| **Click-through** | Faire explorer | "See how it works" |
| **Sales / signup** | Closer la conversion | "Start your free trial" |
| **Click-to-call** | Conversation | "Book a call" |
| **Social engagement** | Communaute | "Join the conversation" |

## Triggers Psychologiques qui Marchent

### FOMO (Fear Of Missing Out)
- Vessi : "Reserve" pre-order (exclusivite percue)
- "Only 12 spots left" / "Limited seats"

### Personnalisation
- CloudSpot : "Get **YOUR** app" > "Get **OUR** app"
- Dynamic text replacement par campagne ad

### Pre-emption d'objection
- Honey : "Free to download" (objection budget)
- "No credit card required" (objection commitment)

### Two-step commitment
- Glo fitness : "Try us free" -> "Design your unique practice"
- Reduit le drop en escaladant l'investissement progressivement

### Soft language
- Athabasca : "Let's get you started" (non-pressant)
- Convient education, B2B premium

## Framework de Test EPIC CRO

Prioriser les tests selon :
- **E**xperiment value (impact estime)
- **P**riority (alignement strategie)
- **I**mpact potential (lift attendu)
- **C**ost (effort de mise en place)

**Top tests prioritaires** (ROI maximum) :
1. Headline (lift 27-104%)
2. CTA copy (lift jusqu'a 104%)
3. Form length (lift jusqu'a 120%)
4. Hero visual
5. Social proof placement

A/B tester **un seul changement a la fois**.

## Checklist CTA

- [ ] Copy : 2-5 mots, action-driven, first-person si possible
- [ ] Microcopy de reassurance sous le bouton
- [ ] Contraste eleve (test squint)
- [ ] Hauteur 48px+ desktop, 56px+ mobile
- [ ] Padding 24px+ tous cotes
- [ ] Hover state visible
- [ ] Arrow icon optionnel pour +26%
- [ ] Mobile : full-width ou sticky bottom
- [ ] CTA repete 3-5x sur la page (longue LP)
- [ ] Coherence : meme copy si meme objectif
- [ ] 1 seul CTA primaire above-the-fold

## Sources

- [Landing Page CTA Tips — Apexure](https://www.apexure.com/blog/landing-page-call-to-action-button-tips)
- [Call-to-Action Examples — Unbounce](https://unbounce.com/conversion-rate-optimization/call-to-action-examples/)
- [CTA Best Practices — Bitly](https://bitly.com/blog/cta-button-best-practices-for-landing-pages/)
- [CTA Tips & Examples — Zoho](https://www.zoho.com/landingpage/cta-button-tips.html)
