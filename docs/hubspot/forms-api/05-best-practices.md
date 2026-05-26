# 05 — Best practices : rate limits, errors, retries

## Table des matieres

- [Rate limits](#rate-limits)
- [Detection rate limit (error 1015)](#detection-rate-limit-error-1015)
- [Exponential backoff](#exponential-backoff)
- [Validation pre-submission](#validation-pre-submission)
- [Caching](#caching)
- [Monitoring](#monitoring)

---

## Rate limits

### Forms Submissions API

| Endpoint | Limit | Niveau |
|----------|-------|--------|
| Public submit (v3) | **50 req / 10s** | IP-based |
| Public submit (v2) | 50 req / 10s | IP-based |
| Auth secure submit (v3) Free/Starter | 100 req / 10s | Portal-based |
| Auth secure submit (v3) Pro/Enterprise | 150 req / 10s | Portal-based |
| Auth secure submit (v3) API Add-On | 200 req / 10s | Portal-based |

### Marketing Forms API (GET/POST/PATCH)

| Type d'app | Limit |
|------------|-------|
| Public app (OAuth, marketplace 2025.2+) | 110 req / 10s |
| Private app | 500 req / 10s |
| Daily cap | 250 000 a 1 000 000 req/jour (selon tier) |

### Different : IP-based vs Portal-based

> **Piege** : la limite public submit est **par IP**, pas par portail. Si tu submites depuis un serveur centralise (Edge Function, backend monolithe), toutes les submissions sortent de la meme IP → tu hits le rate limit beaucoup plus vite que prevu.

Solutions :
- Distribuer via plusieurs IPs (CDN, edge functions geo-distribuees)
- Passer a l'endpoint auth (portal-based, plus genereux)

---

## Detection rate limit (error 1015)

### Reponse standard 429

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 10

{
  "status": "error",
  "message": "You have reached your secondly limit.",
  "errorType": "RATE_LIMIT",
  "correlationId": "..."
}
```

### Reponse specifique Form Submissions

```http
HTTP/1.1 429 Too Many Requests
Content-Type: text/plain; charset=UTF-8

error code: 1015
```

Different content-type (`text/plain`) et message minimaliste. Toujours detecter sur le status code 429, pas sur le body.

### Headers de rate limit (sur certains endpoints)

```http
X-HubSpot-RateLimit-Daily: 250000
X-HubSpot-RateLimit-Daily-Remaining: 249987
X-HubSpot-RateLimit-Interval-Milliseconds: 10000
X-HubSpot-RateLimit-Max: 100
X-HubSpot-RateLimit-Remaining: 95
X-HubSpot-RateLimit-Secondly: 10
```

Lire ces headers pour anticiper et throttle cote client.

---

## Exponential backoff

Pattern recommande pour retry sur 429 ou 5xx :

```ts
async function submitWithRetry(payload, maxRetries = 5) {
  let delay = 1000  // 1s
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const res = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    // Succes : sortir
    if (res.ok) return res.json()

    // Erreur non-retriable : sortir
    if (res.status >= 400 && res.status < 500 && res.status !== 429) {
      throw new Error(`HubSpot ${res.status}: ${await res.text()}`)
    }

    // Retriable : attendre + doubler le delai
    const retryAfter = parseInt(res.headers.get('retry-after') ?? '0', 10) * 1000
    await sleep(Math.max(delay, retryAfter))
    delay *= 2  // exponential
  }
  throw new Error('Max retries exceeded')
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
```

### Parametres recommandes

| Param | Valeur | Justification |
|-------|--------|---------------|
| Initial delay | 1000 ms | Court enough pour user UX |
| Max retries | 5 | Au-dela : signal d'un probleme structurel |
| Multiplier | 2 | Exponential standard |
| Max delay cap | 32 000 ms | Eviter d'attendre indefiniment |
| Jitter | Optional | Eviter thundering herd si plusieurs clients retry en meme temps |

### Avec jitter (production)

```ts
const jitter = Math.random() * 0.3  // ±30%
const delayWithJitter = delay * (1 + jitter - 0.15)
await sleep(delayWithJitter)
```

---

## Validation pre-submission

Avant d'envoyer a HubSpot, valider cote client/serveur :

```ts
function validateSubmission(fields: Record<string, string>) {
  const errors: string[] = []

  // Email format
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.push('Email invalide')
  }

  // Champs requis (depuis le schema HubSpot)
  const required = ['email', 'firstname']
  for (const f of required) {
    if (!fields[f]?.trim()) errors.push(`${f} requis`)
  }

  // Longueurs
  if (fields.message && fields.message.length > 65535) {
    errors.push('Message trop long')
  }

  return errors
}
```

### Pourquoi pre-valider

- **UX** : retour immediat utilisateur (pas d'aller-retour API)
- **Rate limit** : eviter de bruler des req sur des donnees invalides
- **Logs** : moins de 4xx dans tes metrics HubSpot

---

## Caching

Eviter de re-fetch les definitions de forms (schema) a chaque submission :

```ts
const FORM_SCHEMA_CACHE = new Map<string, {data: any, fetchedAt: number}>()
const TTL_MS = 5 * 60 * 1000  // 5 min

async function getFormSchema(formId: string) {
  const cached = FORM_SCHEMA_CACHE.get(formId)
  if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
    return cached.data
  }
  const res = await fetch(`https://api.hubapi.com/marketing/v3/forms/${formId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const data = await res.json()
  FORM_SCHEMA_CACHE.set(formId, { data, fetchedAt: Date.now() })
  return data
}
```

> Sur un environnement serverless (Edge Function), le cache est par instance et n'est pas partage. Pour un cache vraiment partage, utiliser KV/Redis/Supabase.

---

## Monitoring

### Metrics a tracker

| Metric | Source | Alerte si... |
|--------|--------|--------------|
| Submission success rate | logs Edge Function | < 95% |
| Avg latency HubSpot API | logs Edge Function | > 2s |
| 429 count | logs / X-HubSpot-RateLimit | > 0 sur 10 min |
| 5xx count | logs / status | > 0 sur 10 min |
| `hutk: null` rate | logs payload | > 50% (tracking casse) |

### Logging recommande

```ts
console.log(JSON.stringify({
  event: 'hubspot_submit',
  formId,
  status: res.status,
  latencyMs: Date.now() - start,
  hutkPresent: Boolean(payload.context.hutk),
  correlationId: data.correlationId,
}))
```

### Anti-pattern logs

Ne JAMAIS logger :
- Le token Bearer (`HUBSPOT_API_KEY`)
- Le contenu PII complet (email, phone) en clair → utiliser hash
- Le payload entier (peut contenir des donnees sensibles)

---

## Resume des best practices

1. ✅ Valider les inputs avant submit (email regex, requis)
2. ✅ Capturer `hutk` toujours, accepter `null` en fallback
3. ✅ Retry avec exponential backoff sur 429/5xx
4. ✅ Cache les form schemas (5 min TTL)
5. ✅ Monitor le success rate + latency
6. ❌ Pas de token Bearer cote client
7. ❌ Pas de `skipValidation: true` en defaut
8. ❌ Pas de retry sans backoff
9. ❌ Pas de log de PII en clair

## Sources

- [HubSpot - API usage guidelines](https://developers.hubspot.com/docs/developer-tooling/platform/usage-guidelines) — rate limits officiels
- [HubSpot changelog - Form submissions rate limits](https://developers.hubspot.com/changelog/announcing-forms-submission-rate-limits) — limits par endpoint
- [HubSpot changelog - additional rate limit protection](https://developers.hubspot.com/changelog/additional-rate-limit-protection-being-added-to-form-submissions-api) — IP-based
- [Reform - Ultimate Guide to HubSpot API Error Handling](https://www.reform.app/blog/ultimate-guide-to-hubspot-api-error-handling) — patterns retry
- [Scopious Digital - HubSpot API rate limits in production](https://www.scopiousdigital.com/blog/hubspot-api-rate-limits-production) — monitoring
