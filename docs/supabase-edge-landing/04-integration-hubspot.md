# 04 - Integration HubSpot CRM depuis une Edge Function

> Cas Nopillo : recevoir un formulaire de landing page (Webflow ou autre), enrichir, pousser dans HubSpot, retourner OK au front.

---

## Auth HubSpot : OAuth ou Private App

### Option recommandee : Private App Token

Pour un usage backend (server-to-server), la **Private App** est la plus simple :
1. Aller dans HubSpot > Settings > Integrations > Private Apps
2. Creer une app, lui donner les scopes `crm.objects.contacts.write`, `crm.objects.contacts.read`, etc.
3. Copier le token (commence par `pat-na1-...` ou `pat-eu1-...`)

Stocker dans Supabase :

```bash
$ supabase secrets set HUBSPOT_TOKEN=pat-na1-xxxxx
```

### OAuth 2.0

Pour une integration multi-tenants (ex : dashboard SaaS qui se connecte a plusieurs comptes HubSpot), passer par OAuth. Limites : 100 requetes / 10 sec / app installee. Pour la majorite des landings Nopillo, **Private App suffit**.

---

## Endpoints HubSpot utiles

API CRM v3, base URL `https://api.hubapi.com` :

| Endpoint | Methode | Usage |
|----------|---------|-------|
| `/crm/v3/objects/contacts` | POST | Creer un contact |
| `/crm/v3/objects/contacts/{id}` | GET | Lire un contact |
| `/crm/v3/objects/contacts/{id}` | PATCH | Mettre a jour |
| `/crm/v3/objects/contacts/search` | POST | Recherche par email, etc. |
| `/crm/v3/objects/deals` | POST | Creer un deal |
| `/marketing/v3/forms/{id}/submissions` | POST | Soumettre un form HubSpot |

Doc : https://developers.hubspot.com/docs/api/crm/contacts

---

## Implementation : reception formulaire landing

Cas : formulaire Webflow envoie `{ email, firstname, lastname, message, utm_source }`.

`supabase/functions/lead-capture/index.ts` :

```ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const HUBSPOT_TOKEN = Deno.env.get("HUBSPOT_TOKEN")
if (!HUBSPOT_TOKEN) throw new Error("HUBSPOT_TOKEN missing")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
}

Deno.serve(async (req) => {
  // Preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400, headers: corsHeaders })
  }

  const { email, firstname, lastname, message, utm_source } = body as {
    email?: string
    firstname?: string
    lastname?: string
    message?: string
    utm_source?: string
  }

  if (!email) {
    return Response.json({ error: "email required" }, { status: 400, headers: corsHeaders })
  }

  // 1. Upsert contact dans HubSpot
  const hsResp = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        email,
        firstname: firstname ?? "",
        lastname: lastname ?? "",
        message: message ?? "",
        utm_source: utm_source ?? "direct",
        lifecyclestage: "lead",
      },
    }),
  })

  if (!hsResp.ok) {
    const errBody = await hsResp.text()
    console.error("HubSpot error", hsResp.status, errBody)

    // Cas contact existant : on PATCH a la place
    if (hsResp.status === 409) {
      await updateExistingContact(email, body)
    } else {
      return Response.json({ error: "CRM error" }, { status: 502, headers: corsHeaders })
    }
  }

  return Response.json({ ok: true }, { headers: corsHeaders })
})

async function updateExistingContact(email: string, body: Record<string, unknown>) {
  const auth = { Authorization: `Bearer ${HUBSPOT_TOKEN}`, "Content-Type": "application/json" }
  // 1. Search by email
  const search = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/search", {
    method: "POST",
    headers: auth,
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
    }),
  }).then((r) => r.json())
  const contactId = search.results?.[0]?.id
  if (!contactId) return

  // 2. Patch
  await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
    method: "PATCH",
    headers: auth,
    body: JSON.stringify({
      properties: {
        message: body.message,
        utm_source: body.utm_source,
        last_touch_at: new Date().toISOString(),
      },
    }),
  })
}
```

---

## Variante : SDK officiel HubSpot

Le SDK npm `@hubspot/api-client` fonctionne sur Deno via `npm:` :

```ts
import { Client as HubSpotClient } from "npm:@hubspot/api-client@11"

const hubspot = new HubSpotClient({ accessToken: Deno.env.get("HUBSPOT_TOKEN") })

const created = await hubspot.crm.contacts.basicApi.create({
  properties: { email: "marie@example.com", firstname: "Marie", company: "Acme Corp" },
  associations: [],
})
```

| Aspect | Verdict |
|--------|---------|
| Avantages | Autocompletion, erreurs typees |
| Inconvenient | +200 KB au bundle (cold start +50 ms) |
| Recommande | `fetch` direct pour cas simples ; SDK pour integrations riches (deals + companies + associations) |

---

## Webhook HubSpot (sens inverse)

HubSpot peut notifier votre Edge Function quand un contact change :

1. Dans HubSpot > Private App > Webhooks, abonner aux evenements (ex : `contact.creation`)
2. Pointer vers `https://<project>.supabase.co/functions/v1/hubspot-webhook`

`supabase/functions/hubspot-webhook/index.ts` :

```ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createHmac } from "node:crypto"

const HUBSPOT_SECRET = Deno.env.get("HUBSPOT_CLIENT_SECRET")!

Deno.serve(async (req) => {
  const rawBody = await req.text()
  const signature = req.headers.get("X-HubSpot-Signature-V3")
  const timestamp = req.headers.get("X-HubSpot-Request-Timestamp")

  // Verif HMAC SHA-256 de "METHOD + URL + body + timestamp"
  const sourceString = `${req.method}${req.url}${rawBody}${timestamp}`
  const expected = createHmac("sha256", HUBSPOT_SECRET)
    .update(sourceString)
    .digest("base64")

  if (expected !== signature) {
    return new Response("Invalid signature", { status: 401 })
  }

  const events = JSON.parse(rawBody)
  for (const event of events) {
    console.log("HubSpot event", event.subscriptionType, event.objectId)
    // process: store in Postgres, trigger email, etc.
  }

  return new Response("ok")
})
```

> Toujours **verifier la signature** sinon n'importe qui peut spammer votre endpoint.

---

## Rate limits HubSpot

| Type d'app | Limite |
|------------|--------|
| Private App | 100 req / 10 sec, 250 000 req / jour |
| OAuth public | 100 req / 10 sec / installation |
| Search API | 5 req / sec / portal |

En cas de 429, HubSpot renvoie le header `X-HubSpot-RateLimit-Secondly-Remaining`. Implementer un retry exponentiel :

```ts
async function hubspotFetch(url: string, init: RequestInit, attempt = 0): Promise<Response> {
  const r = await fetch(url, init)
  if (r.status === 429 && attempt < 3) {
    const wait = 2 ** attempt * 500
    await new Promise((res) => setTimeout(res, wait))
    return hubspotFetch(url, init, attempt + 1)
  }
  return r
}
```

---

## Architecture recommandee Nopillo

```
[Webflow form] -> [Edge Function lead-capture]
                        |
                        +-> HubSpot (POST /contacts)
                        |
                        +-> Postgres (table 'leads' pour audit)
                        |
                        +-> Resend (email confirmation au lead)
                        |
                        +-> Slack #leads (notification interne)
```

Tout en parallele avec `Promise.allSettled` pour ne jamais bloquer la reponse au visiteur :

```ts
await Promise.allSettled([
  pushToHubSpot(payload),
  insertInPostgres(payload),
  sendConfirmationEmail(payload.email),
  notifySlack(payload),
])
return Response.json({ ok: true })
```

Si HubSpot est down, le lead est quand meme en base + Slack averti. Resilience > perfection.

---

## Securite

- **CORS** : limiter `Access-Control-Allow-Origin` au domaine de la landing en prod (pas `*`)
- **Validation** : valider le payload (email format, taille champs) avant de pousser dans HubSpot
- **Anti-spam** : checker honeypot field, rate limit par IP (Upstash Redis recommande)
- **Logs** : ne pas logger les emails en clair (les hasher ou anonymiser)

---

## Sources

- [HubSpot API Node.js client (GitHub)](https://github.com/HubSpot/hubspot-api-nodejs) — SDK officiel, scopes Private App
- [HubSpot npm package](https://www.npmjs.com/package/@hubspot/api-client) — usage `npm:` avec Deno
- [HubSpot Developer docs](https://developers.hubspot.com/docs) — endpoints CRM v3, rate limits
- [HubSpot client libraries](https://developers.hubspot.com/docs/api/client-libraries) — alternatives au SDK officiel
- [Apideck HubSpot integration tips](https://www.apideck.com/blog/how-to-connect-with-the-hubspot-api) — auth, retry, gestion erreurs
- [sources.md](./sources.md) — index complet des references
