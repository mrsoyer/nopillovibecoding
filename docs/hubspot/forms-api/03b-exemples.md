# 03b — Exemples complets de submission

> Complement de [03-submit-form.md](03-submit-form.md). Code copy-paste ready dans 3 contextes : navigateur, curl, Edge Function Deno.

## JavaScript (navigateur, endpoint public)

```js
function getCookie(name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}

async function submitToHubSpot(formGuid, fields) {
  const portalId = '12345678'
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`

  const body = {
    submittedAt: Date.now(),
    fields: Object.entries(fields).map(([name, value]) => ({
      objectTypeId: '0-1',
      name,
      value,
    })),
    context: {
      hutk: getCookie('hubspotutk'),
      pageUri: window.location.href,
      pageName: document.title,
    },
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error(`HubSpot ${res.status}: ${await res.text()}`)
  return res.json()
}

// Usage
await submitToHubSpot('d9afc0c5-...', {
  email: 'jean@exemple.fr',
  firstname: 'Jean',
  utm_term: 'expert comptable LMNP',
})
```

## curl (endpoint auth)

```bash
curl -X POST "https://api.hsforms.com/submissions/v3/integration/secure/submit/12345678/d9afc0c5-..." \
  -H "Authorization: Bearer pat-na1-xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "submittedAt": 1779800000000,
    "fields": [
      {"objectTypeId": "0-1", "name": "email", "value": "jean@exemple.fr"},
      {"objectTypeId": "0-1", "name": "firstname", "value": "Jean"}
    ],
    "context": {
      "hutk": "abc123",
      "pageUri": "https://nopillo.fr/lp"
    }
  }'
```

## Deno (Supabase Edge Function)

```ts
async function submitHubSpotForm(formGuid: string, payload: Record<string, string>) {
  const portalId = Deno.env.get('HUBSPOT_PORTAL_ID')!
  const token = Deno.env.get('HUBSPOT_API_KEY')!

  const url = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`

  const body = {
    submittedAt: Date.now(),
    fields: Object.entries(payload).map(([name, value]) => ({
      objectTypeId: '0-1', name, value,
    })),
    context: {
      hutk: payload.hutk ?? null,
      pageUri: payload.landing_page_url,
      ipAddress: payload.ip,
    },
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`HubSpot ${res.status}: ${err.message ?? 'unknown'}`)
  }
  return res.json()
}
```

## React (hook reutilisable)

```tsx
import { useState } from 'react'

export function useHubSpotSubmit(portalId: string, formGuid: string) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(fields: Record<string, string>) {
    setStatus('sending')
    setError(null)
    try {
      const hutk = document.cookie
        .split('; ')
        .find((row) => row.startsWith('hubspotutk='))
        ?.split('=')[1] ?? null

      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`
      const body = {
        submittedAt: Date.now(),
        fields: Object.entries(fields).map(([name, value]) => ({ objectTypeId: '0-1', name, value })),
        context: { hutk, pageUri: window.location.href, pageName: document.title },
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(`HubSpot ${res.status}`)
      const data = await res.json()
      setStatus('sent')
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'unknown')
      setStatus('error')
      throw err
    }
  }

  return { status, error, submit }
}
```

## Sources

Voir [sources.md](sources.md).
