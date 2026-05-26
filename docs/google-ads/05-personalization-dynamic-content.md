# Personnalisation & Contenu Dynamique sur Landing Pages

## Table des Matieres

1. [Pourquoi personnaliser](#pourquoi-personnaliser)
2. [Dynamic Keyword Insertion (DKI)](#dynamic-keyword-insertion-dki)
3. [Implementation technique](#implementation-technique)
4. [Personnalisation par segment](#personnalisation-par-segment)
5. [Webflow et personnalisation](#webflow-et-personnalisation)
6. [Anti-patterns critiques](#anti-patterns-critiques)
7. [Mesure et A/B testing](#mesure-et-ab-testing)

## Pourquoi Personnaliser

### Impact Mesure

- **+10-25% conversions** typique avec DKI bien configure
- **Quality Score** ameliore (message match plus fort)
- **CPC reduit** via Quality Score plus eleve
- **CTR landing → CTA** booste de 30-50% selon segment

### Le Principe : Message Match Maximal

Quand un user cherche "agence webflow paris", il s'attend a voir cette phrase exacte dans le headline de la landing. La personnalisation dynamique fait ce match **automatiquement**, sans creer 50 landing pages distinctes.

## Dynamic Keyword Insertion (DKI)

### Comment ca Marche

1. Dans Google Ads, l'URL finale contient un parametre dynamique :
   ```
   https://monsite.com/?keyword={keyword:formation Webflow}
   ```
2. Quand un user clique, Google remplace `{keyword}` par le keyword qui a matche
3. La landing lit le parametre URL et l'injecte dans le contenu

### Element Priority par Impact Conversion

D'apres Apexure et autres etudes :

| Position | Impact estime | Priorite |
|----------|---------------|----------|
| **H1 Headline** | 60-70% du lift | CRITIQUE |
| **Subheadline (H2)** | 15-20% | Elevee |
| **CTA button text** | 5-10% | Moyenne |
| **Body copy (intro)** | 3-7% | Moyenne |
| **Hero image alt** | 1-2% | Faible |
| **Form pre-fill** | 1-3% | Faible |

**Regle** : insere le keyword **2-3 fois maximum** sur la page. Au-dela, ca sonne genere par bot.

## Implementation Technique

### Approche 1 : JavaScript Vanilla (le plus flexible)

```html
<h1 id="dynamic-headline">
  Agence Webflow Premium pour Startups
</h1>

<script>
(function() {
  const params = new URLSearchParams(window.location.search);
  const rawKeyword = params.get('keyword');

  if (!rawKeyword) return;

  // Sanitize: prevent XSS, normalize spaces
  const keyword = rawKeyword
    .replace(/[<>'"&]/g, '')
    .replace(/\+/g, ' ')
    .trim()
    .slice(0, 60); // limit length

  if (keyword.length < 3) return;

  const headline = document.getElementById('dynamic-headline');
  if (headline) {
    headline.textContent = `Agence ${keyword} Premium pour Startups`;
  }
})();
</script>
```

**Points cles** :
- Sanitization obligatoire (anti-XSS)
- Fallback fort : le headline statique fonctionne SANS DKI
- Limite de longueur (eviter overflow mobile)
- Fail silencieusement si pas de parametre

### Approche 2 : Server-Side (Edge Functions)

Pour une perf optimale et un SEO eventuel, faire le replacement cote serveur :

```javascript
// Cloudflare Worker / Vercel Edge / Webflow Cloud
export default async function handler(request) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword');

  let html = await fetchOriginalPage();

  if (keyword) {
    const safeKw = sanitize(keyword);
    html = html.replace(
      /<h1[^>]*>(.*?)<\/h1>/,
      `<h1>Agence ${safeKw} Premium pour Startups</h1>`
    );
  }

  return new Response(html, {
    headers: { 'content-type': 'text/html' }
  });
}
```

### Approche 3 : Plateformes No-Code

| Plateforme | Methode |
|------------|---------|
| **Unbounce** | Dynamic Text Replacement (UI native) |
| **Instapage** | Dynamic Text feature dans editor |
| **Leadpages** | Smart Text via {{params}} |
| **WordPress + If-So** | Plugin avec triggers conditionnels |
| **Webflow** | JS custom + attributs `data-dynamic` (voir section Webflow) |

### Pattern d'URL Recommande

```
URL ad : https://monsite.com/landing-formation
       ?keyword={keyword:formation par defaut}
       &utm_source=google
       &utm_campaign={campaignid}
       &utm_term={keyword}
       &utm_content={creative}
       &gclid={gclid}
```

Toujours fournir un **fallback** (`{keyword:default}`) au cas ou le parametre est absent.

## Personnalisation par Segment

DKI est juste UNE technique. Au-dela du keyword, tu peux personnaliser sur :

### Par Source / Campagne

```javascript
const utmSource = params.get('utm_source');
const utmCampaign = params.get('utm_campaign');

if (utmCampaign === 'enterprise-q2') {
  document.body.classList.add('variant-enterprise');
  // Affiche tarifs entreprise, hide self-serve
}
```

### Par Audience (Geo, Device, Time)

| Critere | Personnalisation |
|---------|------------------|
| **Pays / ville** | Devise, langue, references locales |
| **Device** | Layout, CTA tel: sur mobile |
| **Heure** | "Disponible maintenant" si en heures ouvrees |
| **Returning visitor** | "Welcome back" / dernier produit vu |
| **Referrer** | Si Google Ads vs organic vs social |

### Par Comportement (Adobe Target, Optimizely, etc.)

Pour aller plus loin : outils de personalization engine qui utilisent ML pour adapter le contenu en temps reel selon profil utilisateur.

## Webflow et Personnalisation

Webflow ne fournit pas DKI nativement, mais l'integration est triviale.

### Setup DKI sur Webflow

**Etape 1 — Identifier les elements dynamiques**

Dans le designer, ajouter un attribut custom sur les elements a personnaliser :

```html
<h1 data-dynamic="keyword-headline">
  Agence Webflow Premium pour Startups
</h1>
<p data-dynamic="keyword-subhead">
  Sites haute performance livres en 4 semaines
</p>
```

**Etape 2 — Ajouter Custom Code (Page Settings → Custom Code → Before </body>)**

```html
<script>
(function() {
  const params = new URLSearchParams(window.location.search);
  const keyword = (params.get('keyword') || '')
    .replace(/[<>'"&]/g, '')
    .replace(/\+/g, ' ')
    .trim()
    .slice(0, 50);

  if (!keyword || keyword.length < 3) return;

  // Capitalize first letter
  const kw = keyword.charAt(0).toUpperCase() + keyword.slice(1);

  // Replace headline
  const headline = document.querySelector('[data-dynamic="keyword-headline"]');
  if (headline) {
    headline.textContent = `Agence ${kw} Premium pour Startups`;
  }

  // Replace subhead
  const subhead = document.querySelector('[data-dynamic="keyword-subhead"]');
  if (subhead) {
    subhead.textContent = `Solution ${kw} haute performance livree en 4 semaines`;
  }
})();
</script>
```

**Etape 3 — Tester**

1. Publier la page
2. Visiter avec : `https://tonsite.com/landing?keyword=Webflow+Marketing`
3. Verifier que H1 affiche "Agence Webflow Marketing Premium pour Startups"
4. Visiter sans parametre : verifier que le H1 statique s'affiche normalement

### Webflow + Webflow Google Ads Integration (2026)

Voir [08-webflow-integration.md](08-webflow-integration.md). L'integration native Janvier 2026 simplifie le tracking conversion mais NE remplace PAS DKI custom — tu dois toujours implementer le replacement JS.

### Pattern Multi-Variants Webflow

Pour des landing variants par campagne (sans DKI) :

```
/landing-page                     → Generic
/landing-page?variant=enterprise  → Enterprise
/landing-page?variant=startup     → Startup
```

Avec custom JS qui hide/show des sections selon `variant`.

## Anti-Patterns Critiques

### 1. Leaked Placeholders

❌ User voit `{keyword}` brut dans le headline parce que le parametre URL est manquant ou mal nomme.

✅ Toujours :
- Fallback dans Google Ads : `{keyword:formation Webflow}`
- Fallback statique en HTML (le headline static converti SANS DKI)
- Test avec et sans parametre

### 2. Keyword Stuffing

❌ Injecter le keyword dans 8+ endroits sur la page :
> "Notre formation Webflow Webflow vous apprend Webflow avec un coach Webflow expert Webflow..."

✅ Maximum 2-3 occurrences, intelligemment placees.

### 3. Mismatched Ad Groups

❌ Ad group avec keywords contradictoires : `cheap accountant`, `premium tax advisory`. DKI insere n'importe lequel, le message landing devient incoherent.

✅ Tight ad groups : 3-10 keywords avec **meme intent et meme tonalite**.

### 4. DKI sur Pages SEO

❌ Mettre du DKI client-side sur une page que tu veux ranker en SEO. Google n'execute pas toujours JS de maniere fiable, et la personnalisation excessive peut etre vue comme cloaking.

✅ DKI = PPC ONLY. Pour le SEO : pages dediees statiques.

### 5. Page Speed Degradation

❌ Charger une lib JS de 50KB juste pour DKI.

✅ Vanilla JS inline (< 1KB), execute en fin de body, non-bloquant.

### 6. Pas de Tracking par Variante

❌ Tu ne sais pas si DKI ameliore vraiment les conversions.

✅ Toujours :
- UTM `term={keyword}` dans le URL
- Custom dimensions GA4 pour segmenter par keyword
- A/B test sur subset de campagnes

### 7. Mobile Overflow

❌ Keyword long ("formation accelerée Webflow expert") deborde sur mobile 375px.

✅ Limite la longueur (`.slice(0, 50)`), test sur viewport reel.

## Mesure et A/B Testing

### KPIs a Suivre

| KPI | Mesure DKI |
|-----|-----------|
| **Conversion rate** | % de visiteurs convertissant, par keyword |
| **Bounce rate** | Doit baisser avec DKI bien fait |
| **Time on page** | Doit augmenter (engagement) |
| **CTR sur CTA** | % cliquant le CTA principal |
| **Quality Score** | Niveau keyword |
| **CPC** | Doit baisser via QS ameliore |

### Setup A/B Test DKI vs Static

**Methode 1 — Google Optimize (deprecate, alternative recommandee)**

Plus disponible. Migrer vers GA4 + outils tiers.

**Methode 2 — VWO / Optimizely / Convert**

1. Creer experience : Variant A (static) vs Variant B (DKI active)
2. Run sur 2-4 semaines minimum
3. Mesurer conversion rate + Quality Score evolution

**Methode 3 — Split campagnes Google Ads**

1. Creer 2 ad groups identiques sur meme keywords
2. Group A : final URL static
3. Group B : final URL avec `{keyword}`
4. Comparer perf apres 30 jours

### Resultat Typique

D'apres Apexure/LanderMagic/Varify :

| Configuration | Conversion lift typique |
|--------------|------------------------|
| Static landing | Baseline |
| DKI sur H1 seulement | +8-15% |
| DKI sur H1 + subhead + CTA | +15-25% |
| DKI + segments par device/geo | +20-35% |
| DKI mal fait (anti-patterns) | -5 a -10% (peut nuire) |

## Sources

- [Dynamic Keyword Insertion for Landing Pages 2026 (Apexure)](https://www.apexure.com/blog/best-practices-for-creating-google-dynamic-ad-landing-pages) — Guide complet DKI
- [How to dynamically insert Google Ads keywords (ABMatic)](https://abmatic.ai/blog/how-to-dynamically-insert-google-ads-keywords-into-landing-pages) — Implementation
- [Dynamic Keyword Insertion (If-So)](https://www.if-so.com/dynamic-keyword-insertion-for-google-ads/) — Plugin WordPress
- [Dynamic Text Replacement (Unbounce Docs)](https://documentation.unbounce.com/hc/en-us/articles/203661004-Working-with-Dynamic-Text-Replacement-in-Classic-Builder) — Plateforme reference
- [DKI for Google Ads landing pages (Varify)](https://varify.io/en/blog/dynamic-keyword-insertion-2/) — Best practices
- [Dynamic Landing Pages: Examples 2026 (Landingrabbit)](https://landingrabbit.com/blog/dynamic-landing-page) — Exemples avances
