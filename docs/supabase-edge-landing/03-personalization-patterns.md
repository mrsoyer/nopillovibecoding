# 03 - Patterns de personnalisation

> Cas d'usage Nopillo : comment exploiter une Edge Function pour personnaliser un contenu de landing page selon le visiteur.

Quatre dimensions de personnalisation :
1. **URL params** (UTM, slug, query)
2. **Geo-IP** (pays, ville, langue)
3. **A/B test** (split deterministe par cookie / hash)
4. **Audience CRM** (lookup HubSpot, segment)

---

## Pattern 1 : Personnalisation par URL params

Cas typique : email Sendinblue avec lien `?lead_id=xyz&campaign=relance-q2`.

```ts
// supabase/functions/personalize/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const leadId = url.searchParams.get("lead_id")
  const campaign = url.searchParams.get("campaign") ?? "default"

  const variants: Record<string, { hero: string; cta: string }> = {
    "relance-q2": {
      hero: "Vous avez laisse votre projet en suspens",
      cta: "Reprendre mon devis en 2 minutes",
    },
    "default": {
      hero: "Lancez votre projet avec Nopillo",
      cta: "Demander un devis",
    },
  }

  const variant = variants[campaign] ?? variants.default

  return Response.json({
    leadId,
    campaign,
    variant,
  })
})
```

La landing (Astro / Webflow custom code) appelle cette fonction et injecte le contenu cote client ou serveur.

---

## Pattern 2 : Geo-IP

Supabase populate automatiquement le header `x-forwarded-for` avec l'IP client. Pour la **geolocalisation**, deux options :

### Option A : utiliser un service tiers (ipapi.co, ipwhois)

```ts
Deno.serve(async (req) => {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? ""

  const geo = await fetch(`https://ipapi.co/${ip}/json/`).then((r) => r.json())
  // geo.country_code, geo.city, geo.region

  const content = pickContentForCountry(geo.country_code)
  return Response.json({ geo: geo.country_code, content })
})

function pickContentForCountry(cc: string) {
  if (cc === "FR") return { lang: "fr", price: "1990 EUR HT", contact: "Paris" }
  if (cc === "BE") return { lang: "fr", price: "1990 EUR HT", contact: "Bruxelles" }
  if (cc === "CH") return { lang: "fr", price: "2200 CHF", contact: "Geneve" }
  return { lang: "en", price: "USD 2200", contact: "global" }
}
```

### Option B : header Cloudflare / Netlify

Si la landing est derriere Cloudflare ou Netlify Edge, les headers `cf-ipcountry` ou `x-nf-geo` sont injectes en amont :

```ts
const country = req.headers.get("cf-ipcountry") ?? req.headers.get("x-country") ?? "FR"
```

Pas d'appel reseau supplementaire = latence quasi nulle.

### Cas Nopillo

Recommandation : si la landing est sur Webflow, utiliser **Option A** (ipapi). Si elle est sur Netlify, exploiter le header Netlify natif (`x-nf-geo`).

---

## Pattern 3 : A/B test deterministe

Probleme classique : assigner un visiteur a la variante A ou B de facon stable (memes resultats sur ses prochaines visites) sans cookies third-party.

### Approche : hash de l'IP + bucket

```ts
async function abVariant(visitorId: string, salt = "nopillo-test-1"): Promise<"A" | "B"> {
  const data = new TextEncoder().encode(visitorId + salt)
  const hashBuf = await crypto.subtle.digest("SHA-256", data)
  const hashArr = new Uint8Array(hashBuf)
  // bucket sur le premier byte (0-255)
  return hashArr[0] < 128 ? "A" : "B"
}

Deno.serve(async (req) => {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anon"

  // recuperer ou poser un cookie pour stabiliser
  const cookies = parseCookies(req.headers.get("cookie") ?? "")
  let visitorId = cookies["np_vid"]
  let setCookie: string | null = null
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    setCookie = `np_vid=${visitorId}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax`
  }

  const variant = await abVariant(visitorId)

  const content = variant === "A"
    ? { hero: "Construisez votre site en 7 jours", cta: "Reserver un creneau" }
    : { hero: "Demarrez votre projet web maintenant", cta: "Parler a un expert" }

  const headers = new Headers({ "Content-Type": "application/json" })
  if (setCookie) headers.set("Set-Cookie", setCookie)

  return new Response(JSON.stringify({ variant, content }), { headers })
})

function parseCookies(header: string): Record<string, string> {
  return Object.fromEntries(
    header.split(";").map((c) => c.trim().split("=")).filter((p) => p.length === 2),
  )
}
```

Resultat :
- 50/50 stable par visiteur (cookie + hash)
- Pas de service tiers
- Logs de la variante envoyes a Supabase Postgres pour analyse

### Logger les expositions

Ajouter une table Postgres :

```sql
create table ab_exposure (
  id bigserial primary key,
  visitor_id text not null,
  experiment text not null,
  variant text not null,
  exposed_at timestamptz default now()
);
```

Dans la fonction :

```ts
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
)
await supabase.from("ab_exposure").insert({
  visitor_id: visitorId,
  experiment: "nopillo-test-1",
  variant,
})
```

---

## Pattern 4 : Audience / Lookup CRM

Cas : email reception "salut Marie de l'agence X" qui pointe vers la landing avec `?lead=hubspot:12345`. La page doit afficher "Bonjour Marie, votre devis Nopillo".

```ts
import { createClient } from "npm:@supabase/supabase-js@2"

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const leadParam = url.searchParams.get("lead") // "hubspot:12345"
  if (!leadParam?.startsWith("hubspot:")) {
    return Response.json({ personalized: false })
  }
  const contactId = leadParam.split(":")[1]

  const r = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}?properties=firstname,company,industry`,
    {
      headers: {
        Authorization: `Bearer ${Deno.env.get("HUBSPOT_TOKEN")}`,
      },
    },
  )

  if (!r.ok) return Response.json({ personalized: false })
  const c = await r.json()

  return Response.json({
    personalized: true,
    firstname: c.properties.firstname,
    company: c.properties.company,
    industry: c.properties.industry,
  })
})
```

Voir [04-integration-hubspot.md](./04-integration-hubspot.md) pour le detail HubSpot.

---

## Pattern 5 : Combinaison (recommandee)

Une seule fonction "context" qui retourne TOUT le contexte de personnalisation en un appel :

```ts
Deno.serve(async (req) => {
  const url = new URL(req.url)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anon"
  const country = req.headers.get("x-nf-geo") ?? "FR"

  const visitorId = getOrSetVisitorCookie(req)
  const variant = await abVariant(visitorId)

  const utm = {
    source: url.searchParams.get("utm_source"),
    campaign: url.searchParams.get("utm_campaign"),
    medium: url.searchParams.get("utm_medium"),
  }

  const leadId = url.searchParams.get("lead_id")
  const lead = leadId ? await fetchLead(leadId) : null

  return Response.json({
    geo: { country },
    visitor: { id: visitorId },
    experiment: { name: "homepage-q2", variant },
    utm,
    lead,
  })
})
```

Cote landing (Astro / Webflow) :

```js
// 1 seul fetch au chargement
fetch("https://abc.supabase.co/functions/v1/context")
  .then((r) => r.json())
  .then((ctx) => renderPersonalized(ctx))
```

---

## Bonnes pratiques

| Sujet | Recommandation |
|-------|---------------|
| Cache | Ajouter `Cache-Control: private, max-age=60` pour les contextes peu changeants |
| Latence | Faire l'appel cote serveur (SSR Astro / Next) plutot que cote client si possible, pour eviter le flash de contenu non personnalise |
| Cookie | SameSite=Lax, Max-Age long (365j), pas de PII dans le cookie |
| Logs | Logger l'exposition variant + UTM dans Postgres pour ROI tracking |
| Fallback | Toujours prevoir un contenu par defaut si la fonction est down (timeout court 1-2 sec) |
| RGPD | Pas de PII en clair dans les logs Edge ; hasher les emails avant insertion en base |

---

## Anti-patterns a eviter

- Mettre tous les contenus en dur dans le code de la fonction. **Preferer Postgres** pour permettre au PM de modifier sans deploy.
- Bloquer le rendu de la page sur la fonction. **Toujours avoir un fallback**.
- Oublier le cookie : sans persistance, A/B test invalide (visiteur change de variante a chaque visite).
- Appeler 3 services tiers en serie. **Paralleliser** avec `Promise.all`.

---

## Sources

- [Edge Functions - vue generale](https://supabase.com/docs/guides/functions) — runtime, contexte execution
- [Routing (Hono multi-routes)](https://supabase.com/docs/guides/functions/routing) — pattern fonction "context" combinee
- [Client IP Address dans les Edge Functions](https://github.com/orgs/supabase/discussions/7884) — `x-forwarded-for` pour geo-IP
- [HubSpot Developer docs](https://developers.hubspot.com/docs) — lookup contact pour audience CRM
- [04-integration-hubspot.md](./04-integration-hubspot.md) — detail integration HubSpot
- [sources.md](./sources.md) — index complet des references
