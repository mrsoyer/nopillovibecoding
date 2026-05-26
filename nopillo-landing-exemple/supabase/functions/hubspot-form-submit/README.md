# hubspot-form-submit

Edge Function Supabase qui forwarde une submission au form HubSpot Nopillo (portal `26173790`, form `107536bf-c2cb-44de-89ea-8c3101f83870`).

## Endpoint

```
POST https://kamazblxybkukpkvznkv.supabase.co/functions/v1/hubspot-form-submit
```

CORS autorise pour :
- `http://localhost:4321`, `http://localhost:5173`
- `https://nopillo-landing-exemple.netlify.app`

## Payload accepte

```json
{
  "email": "jean@exemple.fr",
  "maturite_du_projet": "Je débute ma réflexion",
  "date_du_projet_estime": "Moins de 3 mois",
  "type_de_projet_envisage": "LMNP / Meublé",
  "hutk": "abc123...",
  "pageUri": "https://nopillo-landing-exemple.netlify.app/?utm_term=...",
  "pageName": "Landing Nopillo",
  "honeypot": ""
}
```

### Champs

| Champ | Type | Obligatoire | Valeurs autorisees |
|-------|------|-------------|--------------------|
| `email` | string | Au moins 1 champ rempli | Format email valide (max 254 chars) |
| `maturite_du_projet` | string | Non | `Je débute ma réflexion` \| `J'ai un projet d'achat mais rien de signé` \| `J'ai une promesse de vente` \| `J'ai déjà un bien à louer ou déjà loué` |
| `date_du_projet_estime` | string | Non (cache si "deja un bien") | `Moins de 3 mois` \| `3 à 6 mois` \| `Plus de 6 mois` \| `Je ne sais pas` |
| `type_de_projet_envisage` | string | Non (cache si "deja un bien") | `LMNP / Meublé` \| `Location nue` \| `SCI` \| `Autre` \| `Je ne sais pas` |
| `hutk` | string | Non (recommande) | Cookie `hubspotutk` pour attribution |
| `pageUri` | string | Non (recommande) | URL de la page submit |
| `pageName` | string | Non | Titre de la page |
| `honeypot` | string | Non | Si rempli → trap anti-spam (silent ok) |

> **Note logique conditionnelle** : si `maturite_du_projet === "J'ai déjà un bien à louer ou déjà loué"`, les deux dropdowns suivants sont masques dans le form HubSpot. La fonction accepte quand meme les valeurs si fournies (HubSpot ignore).

## Reponses

### Succes (200)
```json
{
  "ok": true,
  "hubspotMessage": "Submission acceptee",
  "redirectUri": null
}
```

### Validation echouee (400)
```json
{ "ok": false, "error": "Email invalide" }
{ "ok": false, "error": "Valeur invalide pour maturite_du_projet. Attendu : ..." }
{ "ok": false, "error": "Aucun champ rempli" }
{ "ok": false, "error": "JSON invalide" }
```

### Erreur HubSpot (429 ou 502)
```json
{
  "ok": false,
  "error": "HubSpot a rejete la submission (429)",
  "details": "..."
}
```

## Exemples

### Curl

```bash
curl -X POST "https://kamazblxybkukpkvznkv.supabase.co/functions/v1/hubspot-form-submit" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean@exemple.fr",
    "maturite_du_projet": "J'\''ai une promesse de vente",
    "date_du_projet_estime": "Moins de 3 mois",
    "type_de_projet_envisage": "LMNP / Meublé"
  }'
```

### JavaScript (browser)

```js
function getCookie(name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

async function submitToHubSpot(data) {
  const res = await fetch(
    'https://kamazblxybkukpkvznkv.supabase.co/functions/v1/hubspot-form-submit',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        hutk: getCookie('hubspotutk'),
        pageUri: window.location.href,
        pageName: document.title,
      }),
    },
  )
  const result = await res.json()
  if (!result.ok) throw new Error(result.error)
  return result
}

// Usage
await submitToHubSpot({
  email: 'jean@exemple.fr',
  maturite_du_projet: 'Je débute ma réflexion',
  date_du_projet_estime: '3 à 6 mois',
  type_de_projet_envisage: 'LMNP / Meublé',
})
```

### React (avec validation)

```tsx
import { useState } from 'react'

const FN_URL = 'https://kamazblxybkukpkvznkv.supabase.co/functions/v1/hubspot-form-submit'

export function useHubspotSubmit() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(data: Record<string, string>) {
    setStatus('sending')
    setError(null)
    try {
      const res = await fetch(FN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          pageUri: window.location.href,
          pageName: document.title,
        }),
      })
      const result = await res.json()
      if (!result.ok) throw new Error(result.error)
      setStatus('sent')
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'unknown')
      setStatus('error')
      throw err
    }
  }

  return { status, error, submit }
}
```

## Fonctionnalites

- ✅ Validation cote serveur : email format + enums dropdowns
- ✅ Honeypot anti-spam (silent ok si rempli)
- ✅ CORS restreint aux 3 origines connues
- ✅ Retry exponential backoff sur 429/5xx (max 3 tentatives, delais 0.8s → 1.6s → 3.2s)
- ✅ Capture IP du visiteur (`x-forwarded-for`) pour HubSpot context
- ✅ Logs structures JSON (`event`, `status`, `latencyMs`, `hutkPresent`)
- ✅ Filtre les empty strings (pas envoye a HubSpot)
- ✅ Reponse detaillee (erreur HubSpot complete en `details`)

## Verifier dans HubSpot

1. https://app-eu1.hubspot.com/contacts/26173790/objects/0-1/views/all/list
2. Filtrer par email = `test+*@example.com` → voir les submissions test
3. Ou direct dans le form : https://app-eu1.hubspot.com/forms/26173790/107536bf-c2cb-44de-89ea-8c3101f83870/performance

## Deployment

```bash
cd /Users/thomas/webflowlanding/nopillo-landing-exemple
supabase functions deploy hubspot-form-submit \
  --no-verify-jwt --project-ref kamazblxybkukpkvznkv
```

## Logs production

```bash
supabase functions logs hubspot-form-submit \
  --project-ref kamazblxybkukpkvznkv --tail
```

## Modifier le form cible

Pour pointer vers un autre form HubSpot, editer en haut de `index.ts` :

```ts
const HUBSPOT_PORTAL_ID = '26173790'      // <-- changer ici
const HUBSPOT_FORM_ID = '107536bf-...'    // <-- et la
```

Puis mettre a jour les enums `ENUM_MATURITE`, `ENUM_DATE`, `ENUM_TYPE` selon le nouveau form.

Pour decouvrir le schema d'un form :

```bash
curl -s "https://api-eu1.hsforms.com/embed/v4/render-definition/{PORTAL}/{FORM}" | jq '.form.modules'
```
