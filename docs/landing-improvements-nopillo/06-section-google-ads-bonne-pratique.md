# 06 - Section "Faites des landings que Google ADORE"

> Section a AJOUTER. Position : APRES section "Etude de cas" (refonte We Invest), AVANT section "FAQ" (donc en derniere section de contenu).

---

## Pourquoi cette section est P1

L'argument central de la formation est : "produire des landings haute conversion **plus vite**". Mais "haute conversion" est cite sans expliquer **comment** la formation y parvient cote technique.

Le decideur Nopillo qui paie pour ses landings via Google Ads sait que le **Quality Score** est le levier #1 pour reduire son CPC. Il a besoin de savoir que la formation transmettra ce savoir.

Cette section donne **3 leviers chiffres** que la formation enseigne — donc 3 raisons concretes de signer.

---

## Headline + sub propose

```
H2 : "Vous payez le keyword 'agence webflow paris' 4.20 EUR ?
       Avec un Quality Score 8+, ca tombe a 2.70 EUR."
Sub : "La formation vous apprend a faire des landings que Google note 8+/10 en Quality Score, automatiquement. Trois leviers concrets, deja mesurables sur vos prochaines campagnes."
```

---

## Format propose : 3 leviers chiffres + ROI

### Levier 1 — Quality Score 8+ (LCP, mobile-first, message-match)

```
[Card]

Levier 1. Quality Score 8+/10

3 composantes ponderees a 33% chacune :
- Expected CTR (probabilite que ton ad soit cliquee)
- Ad Relevance (adequation ad copy <-> intention)
- Landing Page Experience (pertinence + perf + UX)

La formation enseigne le levier landing page :
- LCP < 2s sur 4G mobile (sinon QS chute)
- Mobile-first 375px (83% du trafic ads)
- Message-match strict : H1 reprend le keyword de l'ad
- CTAs clairs, transparence, mentions legales

Impact mesure :
"Above average" sur tous les axes -> CPC -36% vs moyenne.
"Below average" sur landing -> Ad Rank chute, impressions baissent.
```

**Source citation** : `docs/google-ads/03-landing-page-quality-score.md` ligne 12-26 :

> "Le Quality Score est un diagnostic Google sur une echelle 1-10, calcule au niveau **keyword**. Il repose sur trois composantes :
>
> | Composante | Poids approx. |
> |---|---|
> | Expected CTR | ~33% |
> | Ad Relevance | ~33% |
> | Landing Page Experience | ~33% |
>
> Impact direct mesure :
> - **Ads 'Above average'** sur landing + ad relevance : **CPC -36%** vs moyenne"

Et ligne 30-35 (changement 2025-2026) :

> "Google a recalibre le scoring Quality Score en 2025 :
> - Plus de poids sur **navigation experience** (architecture du site, clarte parcours)
> - Penalisation des **destinations inattendues** (clic = page non liee a l'ad)
> - Modele de prediction utilise pour evaluer transparence et UX"

---

### Levier 2 — DKI (Dynamic Keyword Insertion)

```
[Card]

Levier 2. DKI : 1 landing, 50 keywords

Au lieu de creer 50 landings (1 par keyword), tu fais 1 landing
qui s'adapte au keyword via URL parameter.

Comment :
1. URL Google Ads : monsite.com/?keyword={keyword:formation Webflow}
2. JS lit ?keyword=... et l'injecte dans H1 + sub
3. Sanitization XSS + fallback statique fonctionnel

Exemple :
- User cherche "formation webflow lyon"
  -> Click -> H1 devient "Formation Webflow Lyon : 2 jours pour industrialiser"
- User cherche "formation webflow agence"
  -> Click -> H1 devient "Formation Webflow Agence : 2 jours pour industrialiser"

Impact mesure :
- +10-25% conversions typique
- +30-50% CTR landing -> CTA selon segment
- Quality Score ameliore (message-match plus fort)
```

**Source citation** : `docs/google-ads/05-personalization-dynamic-content.md` ligne 17-24 :

> "**Impact Mesure** :
> - **+10-25% conversions** typique avec DKI bien configure
> - **Quality Score** ameliore (message match plus fort)
> - **CPC reduit** via Quality Score plus eleve
> - **CTR landing → CTA** booste de 30-50% selon segment"

Et ligne 38-49 (priorite par element) :

> | Position | Impact estime | Priorite |
> |----------|---------------|----------|
> | **H1 Headline** | 60-70% du lift | CRITIQUE |
> | **Subheadline (H2)** | 15-20% | Elevee |
> | **CTA button text** | 5-10% | Moyenne |

Code JS citable (ligne 56-83) :

```js
const params = new URLSearchParams(window.location.search);
const rawKeyword = params.get('keyword');
if (!rawKeyword) return;

// Sanitize: prevent XSS
const keyword = rawKeyword
  .replace(/[<>'"&]/g, '')
  .replace(/\+/g, ' ')
  .trim()
  .slice(0, 60);

if (keyword.length < 3) return;
const headline = document.getElementById('dynamic-headline');
if (headline) {
  headline.textContent = `Agence ${keyword} Premium pour Startups`;
}
```

Avec point critique (ligne 84-89) :

> "**Points cles** :
> - Sanitization obligatoire (anti-XSS)
> - Fallback fort : le headline statique fonctionne SANS DKI
> - Limite de longueur (eviter overflow mobile)
> - Fail silencieusement si pas de parametre"

---

### Levier 3 — Personnalisation par audience UTM

```
[Card]

Levier 3. Hero adapte par audience

DKI = adapte au keyword. Personnalisation audience = adapte au persona.

Exemple Nopillo :
- utm_source=cgp&utm_campaign=q2-relance
  -> Hero : "Vous gerez 30+ clients LMNP ? Voici l'outil qui les rassure"
- utm_source=facebook&utm_medium=reels
  -> Hero : "Tu paies trop d'impots LMNP ? Diagnostic gratuit en 3 min"
- utm_source=google&utm_term=lmnp+declaration
  -> Hero : "Declaration LMNP 2026 : tout calcule pour toi en 5 min"

Comment :
- Webflow seul : JS client-side qui lit URLSearchParams + swap textContent
- Webflow + Edge Functions : SSR cote serveur (pas de flash)

Impact mesure :
- +20-40% conversions sur audience matching parfait
- Permet 1 seule landing pour 4-10 segments
```

**Source citation** : `docs/supabase-edge-landing/03-personalization-patterns.md` ligne 14-46 (URL params pattern, exemple campaign-based variants) + `docs/google-ads/05-personalization-dynamic-content.md` (DKI vs personalisation par segment).

---

### Bloc bonus — ROI estime + comparatif

A inclure sous les 3 cartes (impact business chiffre) :

```
[Tableau ROI]
```

| Action enseignee | Impact typique sur conversions/CPC |
|---|---|
| Aligner ad -> landing (message match) | +20-50% conversion rate |
| Quality Score 8+ vs 4-5 | -30 a -36% CPC |
| LCP de 4s a 2s | +10-25% conversions |
| Mobile optim (PageSpeed 90+) | +15-30% conversions mobile |
| DKI bien fait | +10-25% conversions |
| **Cumule** | **CPA souvent divise par 2** |

**Source citation** : `.claude/skills/landing-google-ads/SKILL.md` ligne 70-79 (ROI mesure).

Et `docs/methodologie-documentation-first/06-roi-mesure.md` ligne 39-46 (KPI 3 — Conversion landing client) :

> "Le KPI client final :
>
> | Metric | Avant | Apres |
> |--------|-------|-------|
> | Taux conversion form | 1-2% | 3-5% |
> | CPA Google Ads | 80-120€ | 40-60€ |
> | Lead qualifie ratio | 30% | 50%+ |
> | Time-to-MVP | 2 semaines | 1 semaine |"

---

### Bloc final — Lien skill /landing-google-ads

```
[Box CTA secondaire]

Tout cela est encapsule dans le skill /landing-google-ads.
1 invocation, 7 etapes auto, output Quality Score 8+ predit.

Vous le co-construisez ensemble en formation 2j ou 3j.
```

**Source citation** : `.claude/skills/landing-google-ads/SKILL.md` (livrable + workflow).

---

## Pourquoi cette section convertit

1. **Argument tarifaire concret** : "votre keyword qui coute 4.20 EUR peut tomber a 2.70 EUR"
2. **3 leviers techniques precis** : pas de wishful thinking, pas de "magic"
3. **Chiffres deja mesures** sourced (etudes Apexure, Google, Webflow)
4. **Code JS visible** (DKI) = preuve technique = trust pour les decideurs techniques
5. **Lien direct vers skill** = boucle avec section 03 (skills)
6. **ROI cumule "CPA divise par 2"** = punch line conversion

**Effet psychologique** : decideur Nopillo qui depense 5k-50k EUR/mois en Google Ads pour ses clients :
- "OK ces leviers, j'en utilise certains, mais pas tous"
- "Si la formation transmet ca a mon equipe, retour sur investissement < 1 mois sur les CPC clients"
- "Le ROI client se traduit en upsell + retention"

---

## CTA fin de section

```
"Apprendre les 3 leviers Quality Score 8+ en formation 1 ou 2 jours"
-> ancre vers section formats
```

---

## Specs Webflow MCP

```
Background section : #DEDAFF (indigo-100) ou alternance avec section precedente
Container 1120px

Headline : H2 Futura PT 600 64px (desktop) / 36px (mobile)
        Punch line en 2 ligne avec keyword "4.20 EUR" -> "2.70 EUR" en accent indigo

3 Cards leviers : grid 3 colonnes desktop / stack mobile
        Card translucide background rgba(255,255,255,0.7)
        Border 1px #DEDAFF, shadow 0 1px 10px rgba(0,0,0,0.06)
        Padding 32/24px, radius 16px
        Numero "01 / 02 / 03" en font Futura PT 800 80px color #4033DB
        Code JS : background #09090B color #DEDAFF font-family monospace radius 8px

Tableau ROI : grid 2 colonnes "Action / Impact"
        Header background #4033DB color white
        Rows alternance white / #F6F5FD
        Last row "Cumule" : background #0CC28C color white font-weight 700

Box CTA secondaire : border #4033DB, hover background #4033DB color white
```

---

## Sources

- `docs/google-ads/03-landing-page-quality-score.md` — Quality Score 3 composantes + impact CPC
- `docs/google-ads/05-personalization-dynamic-content.md` — DKI + impact + code JS sanitization
- `docs/supabase-edge-landing/03-personalization-patterns.md` — personnalisation par audience UTM
- `.claude/skills/landing-google-ads/SKILL.md` — livrable + ROI mesure
- `docs/methodologie-documentation-first/06-roi-mesure.md` — KPI 3 conversion landing client (CPA divise par 2)
