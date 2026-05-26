# 06 - Cout et latence des Edge Functions

> Donnees collectees en mai 2026. Sources : pricing officiel Supabase, retours communaute Hacker News, benchmarks UI Bakery / DesignRevision.

---

## Pricing Supabase Edge Functions

### Free tier
- **500 000 invocations / mois** incluses
- Pas d'overage : si vous depassez, la fonction renvoie 429 jusqu'au mois suivant (sauf si vous upgradez)
- Pas de carte bancaire requise
- **Limite cachee** : le projet est mis en pause apres 7 jours d'inactivite (incompatible avec un service prod)

### Plan Pro (25 USD / mois / projet)
- **2 millions** d'invocations incluses
- Au-dela : ~ 2 USD / 1M invocations supplementaires
- 100 000 utilisateurs auth (MAU)
- 8 GB Postgres
- Pas de pause automatique
- Compute time facture (cold starts inclus)

### Plan Team (599 USD / mois)
- 2M invocations incluses (idem Pro)
- SOC2, SAML SSO, support prioritaire
- Multi-projet, gouvernance equipe

### Enterprise
- Sur devis. Pour Nopillo, jamais necessaire en pratique sauf gros client B2B.

### Detail compute time

Au-dela des 2M invocations, Supabase facture egalement le **compute time** (en GB-secondes).
- Free : 100 000 GB-sec inclus
- Pro : 1 000 000 GB-sec inclus
- Au-dela : ~ 0,001 USD / 1000 GB-sec (verifier sur https://supabase.com/pricing)

**Important** : les **cold starts et les executions echouees sont facturees**. Si votre fonction crashe immediatement, vous payez quand meme l'invocation.

---

## Estimation pour landing Nopillo type

### Hypotheses (cas median)
- Landing avec 10 000 visiteurs / mois
- 1 fonction `context` appelee a chaque page view (10k invoc)
- 1 fonction `lead-capture` appelee 2% des visiteurs (200 invoc)
- 1 fonction cron Supabase (sync HubSpot 1x/heure = 720 invoc)

**Total : ~11 000 invocations / mois**. Largement dans le free tier.

### Hypotheses (cas gros trafic)
- 100 000 visiteurs / mois
- 5 fonctions appelees a chaque visite (personalize, geo, ab, lead, tracking)
- = 500 000 invocations / mois => limite free atteinte

Recommandation : passer en Pro a partir de ~80 000 visites/mois ou si le projet doit etre 24/7.

---

## Latence : benchmarks reels

D'apres les sources collectees (Hacker News, GitHub Discussions, benchmarks 2026) :

### Cold start
- **Supabase Edge** : 200-500 ms (mediane ~ 300 ms)
- **Cloudflare Workers (Vercel Edge)** : 5-50 ms (mediane ~ 15 ms)
- **Vercel serverless (lambda Node)** : 800-2000 ms

### Warm execution (P50)
- **Supabase Edge** : 20-80 ms (selon proximite)
- **Cloudflare Workers** : 5-20 ms
- **Vercel serverless** : 30-100 ms

### Note sur les cold starts Supabase

L'equipe Supabase a publie une discussion (`github.com/orgs/supabase/discussions/29301`) reconnaissant des cas de **cold starts plus longs** sur des regions eloignees. Ameliorations en cours via :
- Pre-warming pour les fonctions a fort trafic
- Multi-regions Edge Runtime
- Reduction de la taille du bundle ESZip

Pour des fonctions latency-sensitive (sub-50ms), preferer Cloudflare Workers ou colocaliser la fonction pres de la DB.

---

## Strategies pour reduire la latence

### 1. Combiner plusieurs endpoints en un

Au lieu de 3 fonctions separees, faire 1 fonction avec routing Hono. Reduit les cold starts cumules.

### 2. Cache cote CDN

Ajouter dans la reponse :

```ts
return new Response(JSON.stringify(data), {
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=60, s-maxage=300",
  },
})
```

Si la landing est derriere Netlify / Cloudflare / Vercel, la reponse sera cachee au CDN, evitant l'appel a la fonction.

### 3. Pre-fetch cote serveur

Si la landing est en SSR (Astro, Next), faire l'appel a la fonction **dans le getServerSideProps** plutot qu'au mount cote client. Le visiteur voit directement le contenu personnalise sans flash.

### 4. Region Supabase proche des users

Choisir la region du projet Supabase au plus pres :
- Audience FR/EU -> region `eu-central-1` (Frankfurt) ou `eu-west-2` (London)
- Audience US -> region `us-east-1` (Virginia)
- Reglable a la creation du projet, **non modifiable apres**

### 5. Eviter les imports lourds

Chaque import npm gonfle le bundle ESZip. Audit regulier :

```bash
$ deno info supabase/functions/<nom>/index.ts
```

Preferer `fetch` direct plutot que SDK npm si l'usage est simple.

---

## Tableau de couts simulees

| Profil client | Visites/mois | Invocations/mois | Plan | Cout |
|---------------|--------------|-----------------|------|------|
| Petite landing artisan | 1 000 | 1 000 | Free | 0 EUR |
| PME, 1 landing | 10 000 | 30 000 | Free | 0 EUR |
| Agence (multi-landing 1 projet) | 50 000 | 250 000 | Free / Pro | 0 ou 25 USD |
| E-commerce / B2B SaaS | 200 000 | 1 500 000 | Pro | 25 USD |
| Gros trafic (1M visites) | 1 000 000 | 8 000 000 | Pro + overage | 25 + (8-2) * 2 = 37 USD |
| Trafic enterprise | 10 000 000 | 50 000 000 | Pro + overage | 25 + 96 = 121 USD |

A comparer avec :
- **Vercel Pro** : 20 USD / mois / membre + overage similaire
- **Cloudflare Workers Paid** : 5 USD / mois pour 10M invocations (le moins cher)
- **AWS Lambda + API Gateway** : ~ 5-10 USD pour 1M invocations + complexite

---

## Cout cache Nopillo : facteur DB

Attention : si vos Edge Functions tapent intensivement Postgres, le **vrai gout** vient de :
- Compute Postgres (Pro inclut 8 GB RAM, dimensionne selon Compute Add-on)
- Egress (bande passante)

Une Edge Function qui fait 5 SELECT par invocation sur 100k requetes/mois consomme ~ 500k queries DB. Reste largement dans Pro standard.

---

## Limites a surveiller

| Resource | Free | Pro |
|----------|------|-----|
| Invocations / mois | 500 000 | 2 000 000 |
| Compute time / mois | 100 000 GB-sec | 1 000 000 GB-sec |
| Memoire par invoc | 256 MB | 256 MB |
| CPU time max / invoc | 50ms - 2sec selon plan | idem |
| Wall clock max / invoc | 60 sec | 150 sec |
| Taille bundle | 20 MB | 20 MB |
| Concurrent invocations | 1000 | 1000+ |

Pour Nopillo, ces limites sont quasi jamais touchees sur des landings classiques. Les depassements arrivent en cas de :
- Boucle infinie dans le code (timeout 60s)
- Bundle qui explose (oublier `deno cache --reload`)
- Trafic explosion non anticipe (stocker une cache CDN tampon)

---

## Conclusion

Pour 95% des landings Nopillo : **le free tier suffit**. Passer en Pro (25 USD/mois) des qu'un projet doit :
- Etre actif 24/7 (pas de pause apres 7j)
- Garantir une latence Pro
- Beneficier des SLA et du support

C'est une des offres les plus competitives du marche en 2026, en particulier pour la combo backend + DB + storage + edge.

---

## Sources

- [Pricing Edge Functions](https://supabase.com/docs/guides/functions/pricing) — invocations, compute time
- [Pricing global Supabase](https://supabase.com/pricing) — Free / Pro / Team
- [Performance Edge Functions (GitHub)](https://github.com/orgs/supabase/discussions/29301) — discussion cold starts
- [Metacto - Supabase pricing 2026](https://www.metacto.com/blogs/the-true-cost-of-supabase-a-comprehensive-guide-to-pricing-integration-and-maintenance) — analyse couts complets
- [Edge Functions vs Serverless cost shootout](https://www.codercops.com/blog/edge-functions-vs-serverless-vs-containers) — comparatifs reels
- [sources.md](./sources.md) — index complet des references
